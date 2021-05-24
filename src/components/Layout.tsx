import React from 'react'
import { Link, Route , Switch } from 'react-router-dom'
import AdminPage from './Admin'
import Login from './Login'
import Home from './Home'

interface Props {
}

const Layout: React.FC<Props> = () => {
    return (
        <>
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
            <div>
                <Switch>
                <Route exact path="/"><Home /></Route>
                <Route path="/Login"><Login /></Route>
                <Route path="/Admin"><AdminPage /></Route>
                <Route ><p>404</p></Route>
                </Switch>
            </div>
            <div>
                footer
            </div>
        </>
    )
}

export default Layout
