import React, { useEffect, useContext, useState } from 'react';
import { Context } from './Context';
import moment from 'moment';
import { ADD_ATTENDANCE, GET_AUTH_INFO } from './APIRoutes';
import { fetchData } from './Helper';

function Attendance() {
    const [context, setContext] = useContext(Context)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (context && context.auth) {
            if (!context.auth.attendance) {
                document.getElementById('openAttendanceModal').click()
            }
        }
    }, [context])

    const submitForm = (e) => {
        let formdata = { type: 'attendance', date: moment().format("YYYY-MM-DD"), time: moment().format("H:mm:ss") }

        setLoading(true)
        fetchData(ADD_ATTENDANCE, 'POST', formdata, true, false, (res) => {
            if (res.status) {
                fetchData(GET_AUTH_INFO, 'GET', '', true, false, (res) => {
                    setLoading(false)
                    if (res.status === 200 && res.data) {
                        document.getElementById('openAttendanceModal').click()
                        document.getElementById('openLockModal').click()
                        setContext(prev => ({ ...prev, auth: res.data }));
                    }
                })
            }
        })
    }

    return (<>
        <button type="button" id="openAttendanceModal" className="btn btn-outline-success opacity-0" data-bs-target="#attendanceModal" data-bs-toggle="modal"></button>
        <div id="attendanceModal" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="attendanceModalLabel" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="attendanceModalLabel">Attendance</h5>
                    </div>
                    <div className="modal-body">
                        <h4>Are You Want to give Attendance?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" disabled={loading} onClick={submitForm}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Attendance;