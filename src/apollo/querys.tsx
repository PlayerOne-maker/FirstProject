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
      department{
        id
        name
      }
      createAt
    }
  }
`