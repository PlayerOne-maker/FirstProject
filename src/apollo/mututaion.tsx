import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($password : String!,$username: String!)
  {
    login(password:$password,username:$username){
      username
      firstname
      lastname
      email
      department{
        name
      }
    }
  }
`

export const LOGOUT = gql`
mutation{
  logout{
    message
  }
}
`

export const REQUESTLEAVE = gql`
mutation requestleave(
  $typeleaveId : String!
  $descriptionfrom: String!
  $descriptionto: String!
  $descriptionleave: String!
  $from:String!
  $to:String!
  )
  {
  requestleave(typeleaveId:$typeleaveId
    to:$to
  	from:$from
    descriptionfrom:$descriptionfrom
  	descriptionto:$descriptionto
  	descriptionleave:$descriptionleave){
    message
    }
  }`