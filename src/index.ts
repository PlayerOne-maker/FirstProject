import express from 'express'
import createServer from './createServer'
import mongoose from 'mongoose'
import {config} from 'dotenv'
import cookieParser from 'cookie-parser'
config()

const {DB_NAME,DB_USERNAME,DB_PASSWORD,DB_ENDPOINT,PORT,FRONTEND_URI} = process.env

const startServer = async () => {

    await mongoose.connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_ENDPOINT}/${DB_NAME}?
    retryWrites=true&w=majority`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    const app = express()

    app.use(cookieParser())

    const server = await createServer()

    server.applyMiddleware({ app  , cors:{origin: FRONTEND_URI, credentials: true}})

    app.listen({ port: PORT }, () =>
        console.log(`Server is ready at http://localhost:${PORT}${server.graphqlPath}`)
    )
}

startServer()