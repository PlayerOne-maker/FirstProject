import React, { useState, useEffect } from 'react'
import { Link, Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom'
import AdminPage from './Admin'
import Login from './Login'
import Home from './Home'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT } from '../apollo/mututaion'
import { ME } from '../apollo/querys'
import { Navbar } from '../CSScomponents/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { loggeduser, getUser } from '../reducers/userReducer'
import { User } from '../types'

interface Props {
}

const Layout: React.FC<Props> = () => {

    const [bar, setBar] = useState(false)

    const location = useLocation()

    const history = useHistory()

    const [logout] = useMutation<{ logout: { message: string } }>(LOGOUT)

    const { data } = useQuery<{me : User}>(ME)

    const user = useSelector(getUser)

    const dispatch = useDispatch()

    useEffect(() => {
        try {
                dispatch(loggeduser(data?.me))
        } catch (error) {
            console.log(error)
        }
    }, [data,dispatch])
    
    const Logout = async () => {
        try {
            const res = await logout()

            if (res) {
                dispatch(loggeduser(null))
                history.push('/Login')
            }

        } catch (err) {
            console.log(err)
        }
    }

    location.pathname === '/' ? document.title = 'HOME' : document.title = location.pathname.split('/')[1].toUpperCase()

    return (
        <>

            {user ?
                <Navbar>
                    <nav>
                        <ul className="menu">
                            <li className="logo">
                                <Link to="!#">
                                    Sinotrans
                                </Link>
                            </li>
                            <li className={!bar ? "item" : "item active"}>

                                <Link to="/">
                                    Home
                                </Link>

                            </li>
                            <li className={!bar ? "item" : "item active"}>

                                <Link to="/Admin">
                                    Admin
                                </Link>

                            </li>
                            <li className={!bar ? "item" : "item active"}>
                                <Link to="#" onClick={Logout} >
                                    Logout
                                </Link>
                            </li>
                            <li className="toggle">
                                <Link to="#" onClick={() => setBar(!bar)} >
                                    {!bar ? <FontAwesomeIcon icon={faBars} /> :
                                        <FontAwesomeIcon icon={faTimes} />}
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Navbar>
                : <Redirect to="/Login" />}
            <div>
                <Switch>
                    <Route exact path="/"><Home /></Route>
                    <Route path="/Admin"><AdminPage /></Route>
                    <Route path="/Login"><Login /></Route>
                    <Route ><p>404</p></Route>
                </Switch>
            </div>

        </>
    )
}

export default Layout
