import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ModalCSS } from '../CSScomponents/Modal'
import { useMutation, useQuery } from '@apollo/client'
import { CALENDARLEAVE, SHOWLEAVEREMAIN, SHOWREQUESTLEAVEME } from '../apollo/querys'
import { Leaveremain, showrequestleave } from '../types'
import { REQUESTLEAVE } from '../apollo/mututaion'
import { useForm } from 'react-hook-form'

type FormData = {
    typeleaveId: string
    descriptionfrom: string
    descriptionto: string
    descriptionleave: string
    to: string
    from: string
};


export default function Calendar() {

    type typeAction = 'leave' | 'desciption' | 'close'

    const [action, setAction] = useState<typeAction>('close')

    const [start, setStart] = useState<Date>(new Date())

    const [end, setEnd] = useState<Date>(new Date())

    const CtrlOut = () => {
        setAction('close')
    }

    function Ctrlwindows(e: any) {
        if (e.target.className === 'modal') {
            setAction('close')
        }
    }

    const { data } = useQuery<{ showleaveremain: Leaveremain[] }>(SHOWLEAVEREMAIN)

    const showleave = useQuery(CALENDARLEAVE)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [requestleave, { loading, error }] = useMutation(REQUESTLEAVE,{refetchQueries:[{query: SHOWREQUESTLEAVEME},{query:SHOWLEAVEREMAIN}]})

    const onSubmit = handleSubmit(async ({ typeleaveId, descriptionfrom, descriptionto, descriptionleave, from }) => {
        try {
            console.log(from)
            const res = await requestleave({
                variables: {
                    typeleaveId,
                    descriptionfrom,
                    descriptionto,
                    descriptionleave,
                    from: start.toString(),
                    to: end.toString()
                }
            })

            if (res) {
                setAction('close')
            }
        } catch (error) {
            console.log(error)
        }
    });

    return (
        <>

            <ModalCSS>
                <div onClick={Ctrlwindows} className={action === 'leave' ? 'modal' : 'modal-close'}>
                    <div className="modal-content">

                        <span className="close" onClick={CtrlOut}>&times;</span>
                        <div className="header">
                            Request Leave
                        </div>
                        <form onSubmit={onSubmit}>
                            <div className="content">
                                <div className="des">From</div>
                                <div className="des">
                                    <input {...register("from")} type="hidden" value={start.toString()} />
                                    {start.toLocaleDateString('en-GB')}
                                </div>
                                <div className="des">
                                    <select {...register("descriptionfrom")} >
                                        <option value='AllDAY'>All day</option>
                                        <option value='HALFDAY'>Half day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="content">
                                <div className="des">To</div>
                                <div className="des">{end?.toLocaleDateString('en-GB')}</div>
                                <div className="des">
                                    <select {...register("descriptionto")} >
                                        <option value='AllDAY'>All day</option>
                                        <option value='HALFDAY'>Half day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="content">
                                <div>Type Leave</div>
                                <select className="Selection"{...register("typeleaveId", { required: true })}>
                                    <option value="" hidden>Choose a Types</option>
                                    {data && data.showleaveremain.map((types) => (
                                        <option key={types.typeleave.id} value={types.typeleave.id}>{types.typeleave.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="content">
                                <div>Leave reason</div>
                                <input type="text" {...register("descriptionleave", { required: true })} className="input" placeholder="please input reason" />
                            </div>

                            <div className="content">
                                {loading ? <button disabled>Loading...</button> :
                                    <button>Summit</button>}

                            </div>

                            {errors.typeleaveId?.type === "required" ?
                                <div className="error">
                                    <p>Please select typeleave</p>
                                </div>
                                : errors.descriptionleave?.type === "required" &&
                                <div className="error">
                                    <p>Please input you reason</p>
                                </div>}
                            {error &&
                                <div className="error">
                                    {error.graphQLErrors[0].message}
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </ModalCSS>

            <FullCalendar
                plugins={[interactionPlugin, dayGridPlugin]}
                hiddenDays={[6, 0]}
                initialView='dayGridMonth'
                selectable={true}

                select={(info) => {
                    var endDay = info.end
                    endDay.setDate(endDay.getDate() - 1)

                    // var totelCount = 3

                    // var countLeave = new Date(info.start)
                    // while (countLeave <= endDay) {

                    //   if (countLeave.getDay() != 0 && countLeave.getDay() != 6) {
                    //     //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
                    //     totelCount = totelCount - 1
                    //   }
                    //   countLeave.setDate(countLeave.getDate() + 1)
                    // }



                    setStart(info.start)
                    setEnd(info.end)
                    setAction('leave')

                }}

                selectAllow={(selectInfo: any) => {
                    var beforeDay = formatDate(selectInfo.start, {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    });

                    var afterDay = formatDate(selectInfo.end, {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    });

                    var today = formatDate(new Date(), {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    });

                    var AddDays = new Date();
                    AddDays.setDate(AddDays.getDate() + 30);
                    var nextMouth = formatDate(AddDays, {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    })
                    if (beforeDay >= today && afterDay <= nextMouth) {
                        return true
                    }
                    return false
                }}

                selectOverlap={(event) => {
                    if (event.extendedProps.description === 'holiday') {
                        return false
                    }
                    return true
                }}

                events={showleave.data?.calendarLeave.map((show: showrequestleave) => (
                    {
                        title: show.typeleave.name,
                        start: new Date(show.from),
                        end: new Date(show.to),
                        description: 'Leave',
                        backgroundColor: show.typeleave.color,
                        borderColor: show.typeleave.color,
                        extendedProps: {

                            from: new Date(show.from).toLocaleDateString('en-GB') + ' ' + show.descriptionfrom,
                            to: new Date(show.to).toLocaleDateString('en-GB') + ' ' + show.descriptionto
                        }
                    }
                ))}
                eventClick={(info) => {
                    var eventObj = info.event;
                    if (eventObj.extendedProps.description === 'Leave') {
                        setStart(eventObj.extendedProps.from)
                        setEnd(eventObj.extendedProps.to)
                        setAction('desciption')
                    }
                }}
                height={600}
            />
        </>
    )
}

// title: 'Presonal Leave',
//                         start: '2021-06-10',
//                         end: '2021-06-11',
//                         description: 'Leave',
//                         backgroundColor: 'green',
//                         extendedProps: {
//                             from: '2021-06-01 Allday',
//                             to: '2021-06-02 13:00 - 17.30'
//                         }