import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($password : String!,$username: String!){
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
  $typeleaveId : String!,
  $to: Date!,
  $from: Date!,
  $descriptionfrom: String!,
  $descriptionto: String!,
  $descriptionleave: String!
  ){
  requestleave(
    typeleaveId:$typeleaveId
    to:$to
  	from:$from
    descriptionfrom:$descriptionfrom
  	descriptionto:$descriptionto
  	descriptionleave:$descriptionleave){
    leader
    hr
    typeleave{
      name
    }
    user{
      username
      department{
        name
      }
    }
    id
    from
    descriptionfrom
    to
    descriptionto
  }
}`