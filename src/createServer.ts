import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import { UserModel } from './entities/User'
import { AuthResolvers } from './resolvers/authresolvers'
import { AppContext } from './types'
import { createToken, sendToken, verifyToken } from './utils/token'


export default async () => {
    const schema = await buildSchema({
        resolvers: [AuthResolvers],
        emitSchemaFile: { path: './src/schema.graphql' },
        validate: false,
    })
    return new ApolloServer({
        schema,
        context: async ({ req, res }: AppContext) => {
            const token = req.cookies[process.env.COOKIE_NAME!]

            if (token) {
                // varify token
                try {
                    const decodeToken = verifyToken(token) as {
                        userId: string,
                        tokenversion: number,
                        iat: number,
                        exp: number
                    } | null

                    console.log(token)

                    if (decodeToken) {
                        req.userId = decodeToken.userId
                        req.tokenVersion = decodeToken.tokenversion
                        if (Date.now() / 1000 - decodeToken.iat > 6 * 60 * 60) {
                            const user = await UserModel.findById(req.userId)
                            if (user) {
                                if (user.tokenversion === req.tokenVersion) {
                                    user.tokenversion = user.tokenversion + 1
                                    const update = await user.save()
                                    if (update) {
                                        const token = createToken(
                                                update.id,
                                                update.tokenversion
                                            )
                                        sendToken(res, token)
                                    }
                                }
                            }
                        }
                    }


                } catch (error) {
                    req.userId = undefined
                    req.tokenVersion = undefined
                }

            }

            return { req, res }
        }
    })
}

