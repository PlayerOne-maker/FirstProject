import { getModelForClass,  Prop } from '@typegoose/typegoose'

import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType({description:'TypeLeave'})
export class Typeleave{
    @Field(() => ID)
    id: string

    @Field()
    @Prop({required:true,trim:true})
    name: string

    @Field()
    @Prop({required:true})
    max: number

    @Field()
    @Prop({required:true})
    color: string

    @Field()
    @Prop({default: Date.now() + 60 * 60 * 1000 * 7 })
    createAt: Date
}

export const TypeleaveModel = getModelForClass(Typeleave)