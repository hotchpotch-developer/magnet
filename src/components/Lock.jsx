import React, { useState, useEffect, useContext } from 'react';
import { fetchData, validateForm } from './Helper';
import { LOGIN, LOGOUT } from './APIRoutes';
import { Context } from './Context';
import { initialFormState } from './Helper';
import { loadingButton } from './Elements';

function Lock() {
    const [context, setContext] = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [isLocked, setIsLocked] = useState(localStorage.getItem('screenLock') ?? false);
    const tabIdleThreshold = 15 * 60 * 1000; // time seconds in milliseconds

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
        e.preventDefault();

        if (validateForm(e, 'lock-form')) {
            setLoader(true)

            let formData = new FormData(document.getElementById('lock-form'));
            formData.append('email', context.auth.email)

            fetchData(LOGIN, 'POST', formData, false, true, (res) => {
                setLoader(false)
                if (res.status === 200 && res.data) {
                    fetchData(LOGOUT, 'GET', '', true, false, (res) => {}, false, false, '', true, false)
                    setTimeout(() => {
                        localStorage.setItem('accessToken', res.data.access_token)
                        setContext(prev => ({ ...prev, auth: res.data }));
                        initialFormState('lock-form')
                        unlockTab()
                        document.getElementById('openLockModal').click()
                        Array.from(document.querySelectorAll('.modal-backdrop')).forEach(modal => {
                            if(modal.classList.contains('show')){
                                modal.classList.remove('show')
                            }
                            if(!modal.innerHtml){
                                modal.remove();
                            }
                        });
                    }, 1000);
                }
            })
        }
    }

    return (<>
        <button type="button" id="openLockModal" className="btn btn-outline-success opacity-0" data-bs-target="#lockModal" data-bs-toggle="modal"></button>
        <div id="lockModal" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="lockModalLabel" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="lockModalLabel">Unlock</h5>
                        <h5>Are You Working?</h5>
                    </div>
                    <div className="modal-body">
                        <form className="needs-validation" noValidate id="lock-form">
                            <div className="row gy-4">
                                <div className="col-md-12">
                                    <label htmlFor="lock_password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="lock_password" name="password" required />
                                    <div className="invalid-feedback">Please Enter Password.</div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="mt-4">
                            {!loader ?
                                <button className="btn btn-primary w-100" type="button" onClick={(e) => submitForm(e)}>Submit</button>
                                : loadingButton(100)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Lock;