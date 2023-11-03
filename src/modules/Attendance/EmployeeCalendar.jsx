import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
import { useLocation } from 'react-router-dom';
import { CALENDER_LIST } from '../../components/APIRoutes';
import { fetchData } from '../../components/Helper';
import { Context } from  '../../components/Context'

const EmployeeCalendar = () => {
    const location = useLocation();
    const [context] = useContext(Context)
    const [data, setData] = useState([]);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if (location && location.state && location.state.team) {
            fetchData(`${CALENDER_LIST}/${location.state.team.id}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setData(res.data)
                }
            })

            const myModalEl = document.getElementById('calender-details')
            myModalEl.addEventListener('hidden.bs.modal', event => {
                setDetails(null);
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // const handleDateClick = (arg) => {
    //     alert('Date clicked: ' + arg.dateStr);
    // };

    const handleEventClick = (arg) => {
        setDetails(arg.event.extendedProps)
        document.getElementById('calender-details-btn').click()
    }

    return (
        <>
            <Breadcrumbs title="Attendance" parentPage="Attendance" />
            <button type="button" id="calender-details-btn" className="btn btn-outline-success opacity-0" data-bs-target="#calender-details" data-bs-toggle="modal"></button>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={data}
                eventClick={handleEventClick}
            />
            <div id="calender-details" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="calender-details-label" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header p-3 bg-info-subtle">
                            <h5 className="modal-title" id="modal-title">Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                        </div>
                        <div className="modal-body">
                            <div className="event-details">
                                {context && context.auth && context.auth.id === details?.user_id &&
                                    <div class="text-end">
                                        <button type='button' class="btn btn-sm btn-soft-primary">Edit</button>
                                    </div>
                                }
                                <div className="d-flex mb-2">
                                    <div className="flex-grow-1 d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                            <i className="ri-calendar-event-line text-muted fs-16"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="d-block fw-semibold mb-0">{details?.event_timing}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center mb-2">
                                    <div className="flex-shrink-0 me-3">
                                        <i className=" ri-stack-line text-muted fs-16"></i>
                                    </div>
                                    <div className="flex-grow-1">
                                        <h6 className="d-block fw-semibold mb-0">{details?.type}</h6>
                                    </div>
                                </div>
                                {details && details.type !== 'Attendance' &&
                                    <div className="d-flex align-items-center mb-2">
                                        <div className="flex-shrink-0 me-3">
                                            <i className="ri-discuss-line text-muted fs-16"></i>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="d-block fw-semibold mb-0">{details?.description}</h6>
                                        </div>
                                    </div>
                                }
                            </div>
                            {context && context.auth && context.auth.id === details?.user_id &&
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-soft-danger" id="btn-delete-event"><i className="ri-close-line align-bottom"></i> Delete</button>
                                    <button type="submit" className="btn btn-success" id="btn-save-event">Add Event</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeCalendar