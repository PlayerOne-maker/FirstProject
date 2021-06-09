import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ModalCSS } from '../CSScomponents/Modal'
import { useMutation, useQuery } from '@apollo/client'
import { CALENDARLEAVE, SHOWREQUESTLEAVEME, TYPELEAVE } from '../apollo/querys'
import { showrequestleave, typeleave } from '../types'
import { REQUESTLEAVE } from '../apollo/mututaion'
import { useForm } from 'react-hook-form'

type FormData = {
    typeleaveId: string
    to: Date
    from: Date
    descriptionfrom: string
    descriptionto: string
    descriptionleave: string
};

export default function Calendar() {

    type typeAction = 'leave' | 'desciption' | 'close'

    const [action, setAction] = useState<typeAction>('close')

    const [start, setStart] = useState("")

    const [end, setEnd] = useState("")

    const CtrlOut = () => {
        setAction('close')
    }

    function Ctrlwindows(e: any) {
        if (e.target.className === 'modal') {
            setAction('close')
        }
    }

    const { data } = useQuery<{ typeleave: typeleave[] }>(TYPELEAVE)

    const showleave = useQuery(CALENDARLEAVE)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [requsetleave, { loading, error }] = useMutation(REQUESTLEAVE, { refetchQueries: [{ query: CALENDARLEAVE }, { query: SHOWREQUESTLEAVEME }] })
 
    const onSubmit = handleSubmit(async ({ typeleaveId, descriptionfrom, descriptionto, descriptionleave }) => {
        try {

            const res = await requsetleave({
                variables: {
                    typeleaveId,
                    to: end,
                    from: start,
                    descriptionfrom,
                    descriptionto,
                    descriptionleave
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
                                <div className="des">{start}</div>
                                <div className="des">
                                    <select {...register("descriptionfrom")} >
                                        <option value='AllDAY'>All day</option>
                                        <option value='HALFDAY'>Half day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="content">
                                <div className="des">To</div>
                                <div className="des">{end}</div>
                                <div className="des">
                                    <select {...register("descriptionto")} >
                                        <option value='AllDAY'>All day</option>
                                        <option value='HALFDAY'>Half day</option>
                                    </select>
                                </div>
                            </div>
                            <div className="content">
                                <div>Type Leave</div>
                                <select className="Selection" {...register("typeleaveId")}>
                                    {data && data.typeleave.map((types) => (
                                        <option key={types.id} value={types.id}>{types.name}</option>
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
                            {errors.descriptionleave?.type === 'required' &&
                                <div className="error">
                                    <p>Please input your reason</p>
                                </div>
                            }
                            {error &&
                                <div className="error">
                                    <p>{error.graphQLErrors[0].message}</p>
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

                    var start = new Intl.DateTimeFormat('en-GB').format(info.start);

                    var end = new Intl.DateTimeFormat('en-GB').format(endDay);

                    // var totelCount = 3

                    // var countLeave = new Date(info.start)
                    // while (countLeave <= endDay) {

                    //   if (countLeave.getDay() != 0 && countLeave.getDay() != 6) {
                    //     //Date.getDay() gives weekday starting from 0(Sunday) to 6(Saturday)
                    //     totelCount = totelCount - 1
                    //   }
                    //   countLeave.setDate(countLeave.getDate() + 1)
                    // }
                    setStart(info.startStr)
                    setEnd(info.endStr)
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