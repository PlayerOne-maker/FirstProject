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

export type SigninArgs = Pick<User,'username'> & {password: string}