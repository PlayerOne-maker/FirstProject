import { UserModel } from "../entities/User"
import { AppRequest } from "../types"

export const isAuth = async (req: AppRequest) => {

    if (!req.userId) throw Error("Please Login to process.")
    
    const user = await UserModel.findById(req.userId).populate({path: 'department'})

    if(!user) throw Error ("you don't permission")

    if(req.tokenVersion !== user.tokenversion) throw Error ("you don't permission")

    return user
} 

