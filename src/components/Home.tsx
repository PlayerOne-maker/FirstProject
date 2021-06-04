import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'
import { HomeCSS } from '../CSScomponents/Home'
import Calendar from './Calendar'

export default function Home() {

    const logged = useSelector(getUser)

    console.log(logged)

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
                                    <div> Sick Leave : 30 Day</div>
                                    <div> Annual Leave : 7 Day</div>
                                    <div> Presonal Leave : 30 Day</div>
                                </div>
                            </div>

                        </div>
                        <div className="calendar">
                            <Calendar />
                        </div>
                    </HomeCSS>

                </>
                : <Redirect to="/Login" />}
        </div>
    )
}
