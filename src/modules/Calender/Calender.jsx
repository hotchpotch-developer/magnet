import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
import LeaveForm from './Partials/LeaveForm';

const Calender = () => {

    const handleDateClick = (arg) => {
        alert('Date clicked: ' + arg.dateStr);
    };

    const handleEventClick = (arg) => {
        console.log(arg.event.id)
    }

    return (
        <>
            <Breadcrumbs title="Attendance" parentPage="Attendance" />
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{ width: 'auto' }} data-bs-target="#applyLeave" data-bs-toggle="modal" title="Apply Leave">
                    <i className="ri-add-fill fs-5"></i>Apply Leave
                </button>
            </div>
            <LeaveForm />
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
                }}
                initialView="dayGridMonth"
                events={[
                    // Add your events here
                    {
                        id: 2,
                        title: 'Event 1',
                        date: '2023-10-10 00:35:00',
                    },
                    {
                        id: 3,
                        title: 'Event 2',
                        date: '2023-10-10 00:30:00',
                        backgroundColor: '#f00'
                    }
                ]}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
            />
        </>
    )
}

export default Calender