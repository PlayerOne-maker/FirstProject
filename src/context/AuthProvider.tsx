import React, { createContext, useEffect, useState } from 'react'
import { User } from '../types'
import {useQuery} from '@apollo/client'
import {ME} from '../apollo/querys'

interface Props { }

interface AuthValues {
    loggedUser: User | null,
    setAuthUser: (user: User | null) => void
}

const initialState: AuthValues = {
    loggedUser: null,
    setAuthUser: () => { },
}

export const AuthContext = createContext<AuthValues>(initialState)

const AuthProvider: React.FC<Props> = ({ children }) => {

    const [loggedUser, setLoggedUser] = useState<User | null>(null)

    const {data} = useQuery(ME)

    useEffect(() => {
        try {
            const res = data
            if(res){
                setAuthUser(res)
            }
        } catch (error) {
            
        }

        
    }, [data])

    const setAuthUser = (user: User | null) => setLoggedUser(user)
    
    return (
        <AuthContext.Provider
            value={{
                setAuthUser,
                loggedUser
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider