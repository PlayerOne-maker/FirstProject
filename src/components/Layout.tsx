import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Switch, useHistory, useLocation, Redirect } from 'react-router-dom'
import AdminPage from './Admin'
import Login from './Login'
import Home from './Home'
import { AuthContext } from '../context/AuthProvider'
import { useMutation, useQuery } from '@apollo/client'
import { LOGOUT } from '../apollo/mututaion'
import { Navbar } from '../CSScomponents/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import { ME } from '../apollo/querys'
import { useSelector, useDispatch } from 'react-redux'
import { loggeduser, getUser } from '../reducers/userReducer'

interface Props {
}

const Layout: React.FC<Props> = () => {

    const [bar, setBar] = useState(false)

    // const { loggedUser, setAuthUser } = useContext(AuthContext)

    const location = useLocation()

    const history = useHistory()

    const [logout] = useMutation<{ logout: { message: string } }>(LOGOUT)

    const {data} = useQuery(ME)
    
    const user = useSelector(getUser)

    const dispatch = useDispatch()

    // useEffect(() => {
    //     try {
    //         const res = data
    //         if(res){
    //              dispatch(loggeduser({res}))
                 
    //         }
    //     } catch (error) {
            
    //     }
    // }, [data])

    // const Logout = async () => {
    //     try {
    //         const res = await logout()

    //         if (res) {
    //             setAuthUser(null)
    //             history.push('/Login')
    //         }

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    location.pathname === '/' ? document.title = 'HOME' : document.title = location.pathname.split('/')[1].toUpperCase()

    return (
        <>

            {user ?
                <Navbar>
                    <nav>
                        <ul className="menu">
                            <li className="logo">
                                <a href="!#">
                                    Sinotrans
                                </a>
                            </li>
                            <li className={!bar ? "item" : "item active"}>
                                <a href="!#">
                                    <Link to="/">
                                        Home
                                    </Link>
                                </a>
                            </li>
                            <li className={!bar ? "item" : "item active"}>
                                <a href="!#">
                                    <Link to="/Admin">
                                        Admin
                                    </Link>
                                </a>
                            </li>
                            <li className={!bar ? "item" : "item active"}>
                                <a href="!#"  >
                                    Logout
                                </a>
                            </li>
                            <li className="toggle">
                                <a href="!#" onClick={() => setBar(!bar)} >
                                    {!bar ? <FontAwesomeIcon icon={faBars} /> :
                                        <FontAwesomeIcon icon={faTimes} />}
                                </a>
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
