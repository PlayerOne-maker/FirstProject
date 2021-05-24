import { getModelForClass, mongoose,  Prop, Ref } from '@typegoose/typegoose'

import { Field, ID, ObjectType } from 'type-graphql'

import { User } from './User'

@ObjectType({description:'Leave'})
export class Leave{

    @Field(() => ID)
    id:string

    @Field()
    @Prop()
    personal_leave : number 

    @Field()
    @Prop()
    sick_leave : number

    @Field()
    @Prop()
    annual_leave : number

    @Field()
    @Prop()
    other_leave : number

    @Field(() => User)
    @Prop({ref: 'user',type: mongoose.Schema.Types.ObjectId})
    User : Ref<User>
}

export const LeaveModel = getModelForClass(Leave)