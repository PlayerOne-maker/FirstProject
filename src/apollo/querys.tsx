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
    id
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
    color
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

export const SHOWREQUESTLEAVEME = gql`
{
  showrequiedleaveMe{
    from
    to
    descriptionto
    descriptionfrom
    descriptionleave
    id
    leader
    leaderBy{
      username
    }
    hr
    hrBy{
      username
    }
    createAt
  }
}`

export const CALENDARLEAVE = gql`
query{
  calendarLeave{
    id
    to
    from
    descriptionto
    descriptionfrom
    typeleave{
      name
      color
    }
    leaderBy{
      username
    }
    hrBy{
      username
    }
  }
}
`