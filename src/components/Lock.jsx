import React, { useState, useEffect } from 'react';
// import { initialFormState } from './Helper';

function Lock() {
    const [isLocked, setIsLocked] = useState(localStorage.getItem('screenLock') ?? false);
    const tabIdleThreshold = 2*60*1000; // time seconds in milliseconds

    let tabIdleTimer;

    const resetTabIdleTimer = () => {
        clearTimeout(tabIdleTimer);
        tabIdleTimer = setTimeout(lockTab, tabIdleThreshold);
    };

    const lockTab = () => {
        setIsLocked(true);
        localStorage.setItem('screenLock', 'yes')
    };

    const unlockTab = () => {
        setIsLocked(false);
        localStorage.removeItem('screenLock', 'yes')
        resetTabIdleTimer();
    };

    useEffect(() => {
        if (isLocked) {
            document.getElementById('openLockModal').click()
        }
    }, [isLocked])

    useEffect(() => {
        // Set up event listeners to track user activity within this tab
        window.addEventListener('mousemove', resetTabIdleTimer);
        window.addEventListener('keydown', resetTabIdleTimer);
        window.addEventListener('click', resetTabIdleTimer);

        // Initialize the tab idle timer
        resetTabIdleTimer();

        // Clean up event listeners when the component unmounts
        return () => {
            window.removeEventListener('mousemove', resetTabIdleTimer);
            window.removeEventListener('keydown', resetTabIdleTimer);
            window.removeEventListener('click', resetTabIdleTimer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const submitForm = (e) => {
        // initialFormState('lock-form')
        unlockTab()
        document.getElementById('openLockModal').click()
    }

    return (<>
        <button type="button" id="openLockModal" className="btn btn-outline-success opacity-0" data-bs-target="#lockModal" data-bs-toggle="modal"></button>
        <div id="lockModal" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="lockModalLabel" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="lockModalLabel">Unlock</h5>
                    </div>
                    <div className="modal-body">
                        {/* <form className="needs-validation" noValidate id="lock-form">
                            <div className="row gy-4">
                                <div className="col-md-12">
                                    <label htmlFor="lock_password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="lock_password" name="password" required />
                                    <div className="invalid-feedback">Please Enter Password.</div>
                                </div>
                            </div>
                        </form> */}
                        <h4>Are You Working?</h4>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={submitForm}>Yes</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Lock;