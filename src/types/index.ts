import { Request, Response } from 'express'

export enum RoleOptions{
    client = 'CLIENT',
    admin = 'ADMIN',
    superadmin = 'SUPERADMIN'
}

export enum LevelOptions{
    toplevel = 'TOPLEVEL',
    midlevel = 'MIDLEVEL',
    operationlevel = 'OPERATIONLEVEL'
}


export enum StatusOption{
    appove = 'APPOVE',
    reject = 'REJECT',
    panding = 'PANDING'
}


export interface AppRequest extends Request {
    userId? : string
    tokenVersion? : number
}

export interface AppContext {
    req: AppRequest
    res: Response
}