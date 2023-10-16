import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
const EmployeeCalendar = () => {

    const handleDateClick = (arg) => {
        alert('Date clicked: '+ arg.dateStr);
    };

    const handleEventClick = (arg) => {
        console.log(arg.event.id)
    }

    return (
        <>
            <Breadcrumbs title="Attendance" parentPage="Attendance" />
            <FullCalendar 
            plugins={[ dayGridPlugin, interactionPlugin ]}
            initialView="dayGridMonth"
            events={[
                // Add your events here
                {
                  id:2,
                  title: 'Event 1',
                  date: '2023-10-10 00:35:00',
                },
                {
                  id:3,
                  title: 'Event 2',
                  date: '2023-10-10 00:30:00',
                  backgroundColor:'#f00'
                }
            ]}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            />
        </>
    )
}

export default EmployeeCalendar