import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'
import Calendar from './Calendar'
import Tableuser from './Tableuser'
import { HomeCSS } from '../CSScomponents/Home'
import Remain from './Leaveremain'

export default function Home() {

    const logged = useSelector(getUser)

    
    return (
        <div>
            {logged ?
                <>
                    <HomeCSS>
                        <div className="container">
                            <div className="left-panel">
                                <div className="title">
                                    Personal
                                </div>
                                <div className="content">
                                    <div> Name : {logged.firstname} {logged.lastname}</div>
                                    <div> Email : {logged.email}</div>
                                    <div>Password : <button>Chenge password</button> </div>
                                    <div>Department : {logged.department.name} </div>
                                </div>
                            </div>
                            <div className="right-panel">
                                <div className="title">
                                    Remaining leave
                                </div>
                                <div className="content">
                                    <Remain />
                                </div>
                            </div>

                        </div>
                        <div className="calendar">
                            <Calendar />
                        </div>
                    </HomeCSS>

                    <Tableuser />

                </>
                : <Redirect to="/Login" />}
        </div>
    )
}
