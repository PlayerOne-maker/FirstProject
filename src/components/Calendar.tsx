import React, { useState } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { ModalCSS } from '../CSScomponents/Modal'

export default function Calendar() {

    type typeAction = 'leave' | 'desciption' | 'close'

    const [action, setAction] = useState<typeAction>('close')

    const [start, setStart] = useState("")

    const [end, setEnd] = useState("")

    const CtrlOut = () => {
        setAction('close')
    }

    return (
        <>

            <ModalCSS>
                <div className={action === 'leave' ? 'modal' : 'modal-close'}>
                    <div className="modal-content">
                        <span className="close" onClick={CtrlOut}>&times;</span>
                        <p>ตั้งแต่</p>
                        <p>{start}</p>
                        <p>ถึง</p>
                        <p>{end}</p>
                        <select name="type-leave" id="cars">
                            <option value="sick">sick leave</option>
                            <option value="annual">annual leave</option>
                            <option value="presonal">presonal leave</option>
                        </select>
                        <button></button>
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
                    var end = formatDate(endDay, {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    })

                    var start = formatDate(info.start, {
                        month: '2-digit',
                        year: 'numeric',
                        day: '2-digit'
                    })

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
                        end: '2021-06-03',
                        description: 'Leave',
                        backgroundColor: 'green',
                        extendedProps: {
                            from: '2021-06-01 13:00 - 17.30',
                            to: '2021-06-02 Allday'
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
