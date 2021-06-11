import React from 'react'
import {useQuery} from '@apollo/client'
import {Leaveremain} from '../types'
import {SHOWLEAVEREMAIN} from '../apollo/querys'

export default function Remain() {

    const { data } = useQuery<{ showleaveremain: Leaveremain[] }>(SHOWLEAVEREMAIN,{fetchPolicy:"network-only"})

    return (
        <div>
            {data &&
                data.showleaveremain.map((remain) => (
                    <div key={remain.id}>{remain.typeleave.name} : {remain.count}</div>
                ))
            }
        </div>
    )
}
