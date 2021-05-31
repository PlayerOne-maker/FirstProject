import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'
import { HomeCSS } from '../CSScomponents/Home'
import Calendar from './Calendar'

export default function Home() {

    const loggedUser = useSelector(getUser)

    return (
        <div>
            {loggedUser ?
            <>
                <HomeCSS>
                    <div className="container">
                        <div className="left-panel">
                            <div className="title">
                                Personal
                            </div>
                            <div className="content">
                                <div> Name : {loggedUser.me.firstname} {loggedUser.me.lastname}</div>
                                <div> Email : {loggedUser.me.email}</div>
                                <div>Password : <button>Chenge password</button> </div>
                                <div>Department : {loggedUser.me.department.name} </div>
                            </div>
                        </div>
                        <div className="right-panel">
                            <div className="title">
                                Remaining leave
                            </div>
                            <div className="content">
                                <div> Sick Leave : 30 Day</div>
                                <div> Annual Leave : 30 Day</div>
                                <div> Presonal Leave : 30 Day</div>
                            </div>
                        </div>

                    </div>
                    <div className="calendar">
                        
                    </div>
                </HomeCSS>
                <Calendar />
                </>
                : <Redirect to="/Login" />}
        </div>
    )
}
