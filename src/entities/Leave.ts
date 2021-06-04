import { getModelForClass, mongoose,  Prop, Ref } from '@typegoose/typegoose'

import { Field, ID, ObjectType } from 'type-graphql'

import { User } from './User'

import {Typeleave} from './Typeleave'

@ObjectType({description:'Leave'})
export class Leave{

    @Field(() => ID)
    id:string

    @Field(() => Typeleave)
    @Prop({ref: 'Typeleave',type: mongoose.Schema.Types.ObjectId})
    typeleave : Ref<Typeleave>

    @Field()
    @Prop({require: true})
    count : number

    @Field(() => User)
    @Prop({ref: 'User',type: mongoose.Schema.Types.ObjectId})
    user : Ref<User>

    @Field()
    @Prop({default: Date.now() + 60 * 60 * 1000 * 7 })
    createAt: Date
}

export const LeaveModel = getModelForClass(Leave)