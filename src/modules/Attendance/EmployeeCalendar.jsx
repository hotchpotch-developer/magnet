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

    useEffect(() => {
        if (location && location.state && location.state.team) {
            fetchData(`${CALENDER_LIST}/${location.state.team.id}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setData(res.data)
                }
            })
        }
    }, [])

    const handleDateClick = (arg) => {
        alert('Date clicked: ' + arg.dateStr);
    };

    const handleEventClick = (arg) => {
        console.log(arg.event.id)
    }

    return (
        <>
            <Breadcrumbs title="Attendance" parentPage="Attendance" />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={data}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />
        </>
    )
}

export default EmployeeCalendar