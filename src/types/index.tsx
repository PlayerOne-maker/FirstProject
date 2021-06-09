export type Role = 'CLIENT' |  'ADMIN' | 'SUPERADMIN'

export type Level = 'TOPLEVEL' |  'MIDLEVEL' | 'OPERATIONLEVEL'

interface department {
    id: string
    name: string
}

export interface User {
    id: string
    username: string
    email: string
    role: Role[]
    department: department
    firstname: string
    lastname: string
    level: Level
    createAt: string
}

export interface typeleave {
    id: string
    name: string
    max: number
    color: string
}

export interface Leaveremain {
    id: string
    typeleave : typeleave
    count: number
}

export interface showrequestleave {
    id: string
    from : Date
    to: Date
    descriptionfrom: string
    descriptionto: string
    descriptionleave: string
    leader: string
    leaderBy: User
    hr: string
    hrBy: User
    createAt: Date
    typeleave : typeleave
}

export type SigninArgs = Pick<User,'username'> & {password: string}