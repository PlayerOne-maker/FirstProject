import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'

export default function Home() {

    const { loggedUser } = useContext(AuthContext)

    return (
        <div>
            {loggedUser ?
                <div>
                    Home
                </div>
                : <Redirect to="/Login" />}
        </div>
    )
}
