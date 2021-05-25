import React, { useContext, useEffect } from 'react'
import { Link, Route, Switch, useLocation } from 'react-router-dom'
import AdminPage from './Admin'
import Login from './Login'
import Home from './Home'
import { AuthContext } from '../context/AuthProvider'

interface Props {
}

const Layout: React.FC<Props> = () => {

    const { loggedUser } = useContext(AuthContext)

    const location = useLocation()

    console.log()

    return (
        <>
            <head>
                <title>
                    {location.pathname === '/' ? document.title = 'HOME' : location.pathname.split('/')[1].toUpperCase()}
                </title>
            </head>
            {loggedUser &&
                <div>
                    <Link to='/Login'>
                        Login
                    </Link>
                    <Link to="/">
                        Home
                    </Link>
                    <Link to='/Admin'>
                        Admin
                    </Link>

                </div>
            }
            <div>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/Login"><Login /></Route>
                    <Route path="/Admin"><AdminPage /></Route>
                    <Route ><p>404</p></Route>
                </Switch>
            </div>

        </>
    )
}

export default Layout
