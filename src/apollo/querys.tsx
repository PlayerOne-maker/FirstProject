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

export const SHOWLEAVEREMAIN = gql`
query{
  showleaveremain
  {
    typeleave{
      name
    }
    count
  }
}
`

export const TYPELEAVE = gql`
query{
  typeleave{
    id
    name
    createAt
    max
  }
}
`

export const SHOWREQUIEDLEAVE = gql`
{
  showrequiedleave{
    id
    from
    descriptionfrom
    to
    descriptionto
    leader
    leaderBy{
      username
    }
    hr
    hrBy{
      username
    }
    descriptionleave
    createAt
  }
}
`