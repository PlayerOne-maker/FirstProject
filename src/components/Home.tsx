import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUser } from '../reducers/userReducer'
import Calendar from './Calendar'
import { useQuery } from '@apollo/client'
import { SHOWLEAVEREMAIN } from '../apollo/querys'
import Tableuser from './Tableuser'

// type
import { Leaveremain } from '../types'

// CSS
import { HomeCSS } from '../CSScomponents/Home'


export default function Home() {

    const logged = useSelector(getUser)

    const { data } = useQuery<{ showleaveremain: Leaveremain[] }>(SHOWLEAVEREMAIN, { fetchPolicy: "no-cache" })

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
                                    {data &&
                                        data.showleaveremain.map((remain) => (
                                            <div>{remain.typeleave.name} : {remain.count}</div>
                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div className="calendar">
                            <Calendar />
                        </div>

                        <div className="table">
                            <Tableuser />
                        </div>
                    </HomeCSS>

                </>
                : <Redirect to="/Login" />}
        </div>
    )
}
