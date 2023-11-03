import React, { useContext, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Breadcrumbs from '../../components/Breadcrumbs'
import interactionPlugin from "@fullcalendar/interaction"
import { useLocation } from 'react-router-dom';
import { CALENDER_LIST, DELETE_ATTENDANCE } from '../../components/APIRoutes';
import { fetchData } from '../../components/Helper';
import { Context } from  '../../components/Context'
import _, { now } from 'lodash';
import LeaveForm from '../Calender/Partials/LeaveForm';
import * as Elements from "../../components/Elements";
import EditLeave from './EditLeave';

const EmployeeCalendar = () => {
    const location = useLocation();
    const [context] = useContext(Context)
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(false);
    const [details, setDetails] = useState(null);
    const [prevModal, setPrevModal] = useState(null);
    const [deleteId, setDeleteId] = useState(null);
    const title = context && context.auth && context.auth.role_id === "1" ? `${_.upperFirst(location?.state?.team?.first_name)} ${_.upperFirst(location?.state?.team?.first_name)} (${location?.state?.team?.roles_name})` : "Calender Details"

    useEffect(() => {
        if (context && context.auth) {
            let id = location && location.state && location.state.team ? location.state.team.id : context.auth.id
            fetchData(`${CALENDER_LIST}/${id}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setData(res.data)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    // const handleDateClick = (arg) => {
    //     alert('Date clicked: ' + arg.dateStr);
    // };

    const handleEventClick = (arg) => {
        console.log(arg.event.extendedProps);
        setDetails(arg.event.extendedProps)
        document.getElementById('calender-details-btn').click()
    }

    const deleteEventAction = () => {
        setDeleteId(details.event_id)
        setPrevModal("calender-details-btn")
        document.getElementById('calender-details-btn').click()
    }
    
    const deleteEvent = () => {
        fetchData(`${DELETE_ATTENDANCE}/${deleteId}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                setPrevModal(null)
                setDetails(null)
                setReload(now())
                setTimeout(() => {
                    document.querySelector('#btn-delete-event-hidden').click()
                }, 1000);
            }
        })
    }

    console.log(prevModal);

    return (
        <>
            <Breadcrumbs title={title} parentPage="Attendance" />
            {context && context.auth && context.auth.role_id !== "1" && <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{ width: 'auto' }} data-bs-target="#applyLeave" data-bs-toggle="modal" title="Apply Leave">
                    <i className="ri-add-fill fs-5"></i>Apply Leave
                </button>
            </div>
            </>}
            <LeaveForm setReload={setReload} />
            <EditLeave setDetails={setDetails} details={details} setReload={setReload} />
            {/* <LeaveForm edit={edit} setPrevModal={setPrevModal} setDetails={setDetails} closeAction={() => {if(prevModal) document.getElementById('calender-details-btn').click()}} /> */}
            <button type="button" className="btn btn-soft-danger opacity-0" id="btn-delete-event-hidden" data-bs-target="#teamConfirmationModal" data-bs-toggle="modal"><i className="ri-close-line align-bottom"></i></button>
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
                                {context && context.auth && context.auth.id === details?.user_id && details?.type !== 'Attendance' &&
                                    <div class="text-end">
                                        <button type='button' class="btn btn-sm btn-soft-primary" data-bs-target="#editLeave" data-bs-toggle="modal" onClick={() => document.getElementById('calender-details-btn').click()}>Edit</button>
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
                            {context && context.auth && context.auth.id === details?.user_id && details?.type !== 'Attendance' &&
                                <div className="hstack gap-2 justify-content-end">
                                    <button type="button" className="btn btn-soft-danger" id="btn-delete-event" data-bs-target="#teamConfirmationModal" data-bs-toggle="modal" onClick={deleteEventAction}><i className="ri-close-line align-bottom"></i> Delete</button>
                                    {/* <button type="submit" className="btn btn-success" id="btn-save-event" data-bs-target="#applyLeave" data-bs-toggle="modal">Add Event</button> */}
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Elements.ConfirmationModal modalId="teamConfirmationModal" action={deleteEvent} closeAction={() => document.getElementById('calender-details-btn').click()} />
        </>
    )
}

export default EmployeeCalendar