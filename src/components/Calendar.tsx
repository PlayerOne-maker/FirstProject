import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ModalCSS } from '../CSScomponents/Modal'
import { useQuery } from '@apollo/client'
import { TYPELEAVE } from '../apollo/querys'
import { typeleave } from '../types'

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

    return (
        <>

            <ModalCSS>
                <div onClick={Ctrlwindows} className={action === 'leave' ? 'modal' : 'modal-close'}>
                    <div className="modal-content">

                        <span className="close" onClick={CtrlOut}>&times;</span>

                        <div className="content">
                            <div>From</div>
                            <div>{start}</div>
                        </div>
                        <div className="content">
                            <div>To</div>
                            <div>{end}</div>
                        </div>
                        <div className="content">
                            <div>Type Leave</div>
                            <select className="Selection" name="type-leave" id="cars">
                                {data && data.typeleave.map((types) => (
                                    <option value={types.id}>{types.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="content">
                            <button>Summit</button>
                        </div>
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
                    setStart(start)
                    setEnd(end)
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

                events={[

                    {
                        title: 'Sick Leave',
                        start: '2021-05-21',
                        end: '2021-05-21',
                        description: 'Leave',
                        backgroundColor: 'blue',
                        extendedProps: {
                            from: '2021-05-21 Allday',
                            to: '2021-05-21 Allday'
                        }
                    },
                    {
                        title: 'Presonal Leave',
                        start: '2021-06-01',
                        end: '2021-06-05',
                        description: 'Leave',
                        backgroundColor: 'green',
                        extendedProps: {
                            from: '2021-06-01 Allday',
                            to: '2021-06-02 13:00 - 17.30'
                        }
                    },
                ]}
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
