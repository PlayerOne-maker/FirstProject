import {getModelForClass,mongoose,prop, Ref} from '@typegoose/typegoose'
import {ObjectType,Field,ID} from 'type-graphql'
import {  LevelOptions, RoleOptions } from '../types'
import { Departments } from './department'

@ObjectType({description:'UserModel'})
export class User {

    @Field(() => ID)
    id:string

    @Field()
    @prop({required:true,trim:true,unique:true,lowercase:true})
    username: string

    @Field()
    @prop({required:true,trim:true,unique:true,lowercase:true})
    email : string

    @Field()
    @prop({required:true,trim:true})
    password : string

    @Field()
    @prop({required:true,trim:true})
    firstname : string

    @Field()
    @prop({required:true,trim:true})
    lastname : string

    @Field(() => Departments)
    @prop({ref: 'Departments',type: mongoose.Schema.Types.ObjectId })
    department : Ref<Departments>

    @prop({default:0})
    tokenversion : number

    @prop()
    resetpasswordtoken? : string

    @prop()
    resetpasswordtokenexpiry? : number

    @Field(() => [String])
    @prop({
        type:String,
        enum: RoleOptions,
        default: [RoleOptions.client]
    })
    role: RoleOptions[]

    @Field()
    @prop({
        type:String,
        enum: LevelOptions,
        default: LevelOptions.operationlevel
    })
    level: string

    @Field()
    @prop({default: Date.now() + 60 * 60 * 1000 * 7 })
    createAt: Date

    
}

export const UserModel = getModelForClass(User)