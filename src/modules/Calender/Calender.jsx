import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
import * as Elements from "../../components/Elements";

const Calender = () => {

    const handleDateClick = (arg) => {
        alert('Date clicked: ' + arg.dateStr);
    };

    const handleEventClick = (arg) => {
        console.log(arg.event.id)
    }

    const submitForm = (e) => {

    }

    return (
        <>
            <Breadcrumbs title="Attendance" parentPage="Attendance" />
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{ width: 'auto' }} data-bs-target="#applyLeave" data-bs-toggle="modal" title="Apply Leave">
                    <i className="ri-add-fill fs-5"></i>Apply Leave
                </button>
            </div>
            <Elements.ModalSection modalId="applyLeave" title="Apply Leave" btnTitle="Save" action={submitForm} loading={false} formId="apply-leave-form">
                <form className="needs-validation" noValidate id="apply-leave-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <h6>Date</h6>
                            <h6>Reason</h6>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
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