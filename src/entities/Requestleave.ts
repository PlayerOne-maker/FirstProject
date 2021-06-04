import { getModelForClass, mongoose, prop, Ref } from '@typegoose/typegoose'
import { Field, ID, ObjectType } from 'type-graphql'
import { User } from  './User'
import { Typeleave } from './Typeleave'
import { StatusOption } from '../types'

@ObjectType({description:"RequsetLeave"})
export class RequsetLeave{
    @Field(() => ID)
    id: string

    @Field()
    @prop({require: true})
    from: Date

    @Field()
    @prop({require: true})
    descriptionfrom: String

    @Field()
    @prop({require: true})
    to: Date

    @Field()
    @prop({require: true})
    descriptionto: String

    @Field(() => String)
    @prop({
        type:String,
        enum: StatusOption,
        default: StatusOption.panding,
        require: true
    })
    leader: StatusOption

    @Field(() => User)
    @prop({ref: 'User',type: mongoose.Schema.Types.ObjectId})
    leaderBy : Ref<User>


    @Field(() => String)
    @prop({
        type:String,
        enum: StatusOption,
        default: StatusOption.panding
    })
    hr: StatusOption

    @Field(() => User)
    @prop({ref: 'User',type: mongoose.Schema.Types.ObjectId})
    hrBy : Ref<User>

    @Field(() => User)
    @prop({ref: 'User',type: mongoose.Schema.Types.ObjectId})
    user : Ref<User>

    @Field(() => Typeleave)
    @prop({ref: 'Typeleave',type: mongoose.Schema.Types.ObjectId})
    typeleave : Ref<Typeleave>

    @Field()
    @prop({default: Date.now() + 60 * 60 * 1000 * 7})
    createAt: Date
}

export const RequsetLeaveModel = getModelForClass(RequsetLeave)