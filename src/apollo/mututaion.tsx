import { gql } from '@apollo/client'

export const LOGIN = gql`
mutation login($password : String!,$username: String!){
    login(password:$password,username:$username){
      username
      firstname
      lastname
        email
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