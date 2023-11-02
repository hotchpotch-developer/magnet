import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
import { useLocation } from 'react-router-dom';
import { CALENDER_LIST } from '../../components/APIRoutes';
import { fetchData } from '../../components/Helper';

const EmployeeCalendar = () => {
    const location = useLocation();
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
    }, [])

    const handleDateClick = (arg) => {
        alert('Date clicked: ' + arg.dateStr);
    };

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
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />
            <div id="calender-details" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="calender-details-label" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="calender-details-label">Calender Details</h5>
                        </div>
                        <div className="modal-body">
                            <p><b>Type</b>{details?.title}</p>
                            <p><b>Date and Time</b>{details?.date} {details?.time}</p>
                            <p><b>Description</b>{details?.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployeeCalendar