import { gql } from "@apollo/client"

export const ME = gql`
query{
    me{
      id
      username
      firstname
      lastname
      role
      level
      email
      department{
        id
        name
      }
      createAt
    }
  }
`