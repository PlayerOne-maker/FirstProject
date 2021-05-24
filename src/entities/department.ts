import {getModelForClass,prop} from '@typegoose/typegoose'
import {ObjectType,Field,ID} from 'type-graphql'

@ObjectType({description:'DepartmentModel'})
export class Departments {

    @Field(() => ID)
    id:string

    @Field()
    @prop()
    name:string

    @Field()
    @prop({default: Date.now() + 60 * 60 * 1000 * 7 })
    createAt: Date
}

export const DepartmentModel = getModelForClass(Departments)