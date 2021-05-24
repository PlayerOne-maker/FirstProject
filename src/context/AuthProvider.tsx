import React, { createContext } from 'react'
import {User} from '../types'

interface Props { }

interface AuthValues {
    loggedUser: User | null,
    setAuthUser: (user: User | null) => void
}

const initialState : AuthValues = {
    loggedUser: null,
    setAuthUser: () => {},
}

const AuthContext = createContext<AuthValues>(initialState)

const AuthProvider: React.FC<Props> = ({ children }) => {
    return (
        <div>
            
        </div>
    )
}
