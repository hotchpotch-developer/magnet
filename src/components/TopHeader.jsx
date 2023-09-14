import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "./Helper";
import { LOGOUT } from "./APIRoutes";
import { Context } from "./Context";

const TopHeader = () => {

    const [dropDown, setDropDown] = useState(false)
    const [notificationDD, setNotificationDD] = useState(false)
    const [context, setContext] = useContext(Context)
    const navigate = useNavigate()

    const openMenu = () => {
        const element = document.querySelector("body");
        element.classList.toggle('menu');
        
    }

    const profileDropDown = () => {
        setDropDown(!dropDown)
    }

    const bellDropDown = () => {
        setNotificationDD(!notificationDD);
    }

    const logout = () => {
        if(context && context.auth){
            fetchData(LOGOUT, 'GET', '', true, false, (res) => {
                if(res.status === 200 && res.success) {
                    localStorage.removeItem('accessToken');
                    setContext('')
                    navigate('/')
                }
            })
        }
    }

    return (
        <>
            <header id="page-topbar">
                <div className="layout-width">
                    <div className="navbar-header">
                        <div className="d-flex">
                            <div className="navbar-brand-box horizontal-logo">
                                <Link href="/" className="logo logo-dark">
                                    <span className="logo-sm">
                                        <img src="/images/logo-sm.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/images/logo-dark.png" alt="" height="17" />
                                    </span>
                                </Link>

                                <Link href="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src="/images/logo-sm.png" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/images/logo-light.png" alt="" height="17" />
                                    </span>
                                </Link>
                            </div>

                            <button type="button" className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger" id="topnav-hamburger-icon" onClick={() => openMenu()}>
                                <span className="hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                        </div>

                        <div className="d-flex align-items-center">

                            <div className="dropdown d-md-none topbar-head-dropdown header-item">
                                <button type="button" className="btn btn-icon btn-topbar btn-ghost-secondary rounded-circle" id="page-header-search-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                                    <i className="bx bx-search fs-22"></i>
                                </button>
                                <div className="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0" aria-labelledby="page-header-search-dropdown">
                                    <form className="p-3">
                                        <div className="form-group m-0">
                                            <div className="input-group">
                                                <input type="text" className="form-control" placeholder="Search ..." aria-label="Recipient's username" />
                                                    <button className="btn btn-primary" type="submit"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                                <button type="button" className={`btn btn-icon btn-topbar btn-ghost-secondary rounded-circle ${notificationDD ? 'show' : ''}`} id="page-header-notifications-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-haspopup="true" aria-expanded={`${notificationDD ? true : false}`} onClick={() => bellDropDown()}>
                                    <i className='bx bx-bell fs-22'></i>
                                    <span className="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger">3<span className="visually-hidden">unread messages</span></span>
                                </button>
                                <div className={`dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 ${notificationDD ? 'show notificationHeader' : ''}`} aria-labelledby="page-header-notifications-dropdown" data-popper-placement={`${notificationDD ? 'bottom-end' : ''}`}>

                                    <div className="dropdown-head bg-primary bg-pattern rounded-top">
                                        <div className="p-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <h6 className="m-0 fs-16 fw-semibold text-white"> Notifications </h6>
                                                </div>
                                                <div className="col-auto dropdown-tabs">
                                                    <span className="badge bg-light-subtle text-body fs-13"> 4 New</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-2 pt-2">
                                            <ul className="nav nav-tabs dropdown-tabs nav-tabs-custom" data-dropdown-tabs="true" id="notificationItemsTab" role="tablist">
                                                <li className="nav-item waves-effect waves-light">
                                                    <Link className="nav-link active" data-bs-toggle="tab" href="#all-noti-tab" role="tab" aria-selected="true">
                                                        All (4)
                                                    </Link>
                                                </li>
                                                <li className="nav-item waves-effect waves-light">
                                                    <Link className="nav-link" data-bs-toggle="tab" href="#messages-tab" role="tab" aria-selected="false">
                                                        Messages
                                                    </Link>
                                                </li>
                                                <li className="nav-item waves-effect waves-light">
                                                    <Link className="nav-link" data-bs-toggle="tab" href="#alerts-tab" role="tab" aria-selected="false">
                                                        Alerts
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>

                                    <div className="tab-content position-relative" id="notificationItemsTabContent">
                                        <div className="tab-pane fade show active py-2 ps-2" id="all-noti-tab" role="tabpanel">
                                            <div data-simplebar style={{ maxHeight: "300px"}} className="pe-2">
                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <div className="avatar-xs me-3 flex-shrink-0">
                                                            <span className="avatar-title bg-info-subtle text-info rounded-circle fs-16">
                                                                <i className="bx bx-badge-check"></i>
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Link href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-2 lh-base">Your <b>Elite</b> author Graphic
                                                                    Optimization <span className="text-secondary">reward</span> is
                                                                    ready!
                                                                </h6>
                                                            </Link>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> Just 30 sec ago</span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox" value="" id="all-notification-check01" />
                                                                    <label className="form-check-label" htmlFor="all-notification-check01"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs flex-shrink-0" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                                        graph 🔔.</p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check02" />
                                                                        <label className="form-check-label" htmlFor="all-notification-check02"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <div className="avatar-xs me-3 flex-shrink-0">
                                                            <span className="avatar-title bg-danger-subtle text-danger rounded-circle fs-16">
                                                                <i className='bx bx-message-square-dots'></i>
                                                            </span>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <Link href="#!" className="stretched-link">
                                                                <h6 className="mt-0 mb-2 fs-13 lh-base">You have received <b className="text-success">20</b> new messages in the conversation
                                                                </h6>
                                                            </Link>
                                                            <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                            </p>
                                                        </div>
                                                        <div className="px-2 fs-15">
                                                            <div className="form-check notification-check">
                                                                <input className="form-check-input" type="checkbox" value="" id="all-notification-check03" />
                                                                    <label className="form-check-label" htmlFor="all-notification-check03"></label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item position-relative">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs flex-shrink-0" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="all-notification-check04" />
                                                                        <label className="form-check-label" htmlFor="all-notification-check04"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="my-3 text-center view-all">
                                                    <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                        All Notifications <i className="ri-arrow-right-line align-middle"></i></button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="tab-pane fade py-2 ps-2" id="messages-tab" role="tabpanel" aria-labelledby="messages-tab">
                                            <div data-simplebar style={{ maxHeight: "300px"}} className="pe-2">
                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-3.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">James Lemire</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 30 min ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check01" />
                                                                        <label className="form-check-label" htmlFor="messages-notification-check01"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-2.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">Angela Bernier</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">Answered to your comment on the cash flow forecast's
                                                                        graph 🔔.</p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check02" />
                                                                        <label className="form-check-label" htmlFor="messages-notification-check02"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-6.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">Kenneth Brown</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">Mentionned you in his comment on 📃 invoice #12501.
                                                                    </p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 10 hrs ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check03" />
                                                                        <label className="form-check-label" htmlFor="messages-notification-check03"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="text-reset notification-item d-block dropdown-item">
                                                    <div className="d-flex">
                                                        <img src="/images/users/avatar-8.jpg" className="me-3 rounded-circle avatar-xs" alt="user-pic" />
                                                            <div className="flex-grow-1">
                                                                <Link href="#!" className="stretched-link">
                                                                    <h6 className="mt-0 mb-1 fs-13 fw-semibold">Maureen Gibson</h6>
                                                                </Link>
                                                                <div className="fs-13 text-muted">
                                                                    <p className="mb-1">We talked about a project on linkedin.</p>
                                                                </div>
                                                                <p className="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                                    <span><i className="mdi mdi-clock-outline"></i> 3 days ago</span>
                                                                </p>
                                                            </div>
                                                            <div className="px-2 fs-15">
                                                                <div className="form-check notification-check">
                                                                    <input className="form-check-input" type="checkbox" value="" id="messages-notification-check04" />
                                                                        <label className="form-check-label" htmlFor="messages-notification-check04"></label>
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>

                                                <div className="my-3 text-center view-all">
                                                    <button type="button" className="btn btn-soft-success waves-effect waves-light">View
                                                        All Messages <i className="ri-arrow-right-line align-middle"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tab-pane fade p-4" id="alerts-tab" role="tabpanel" aria-labelledby="alerts-tab"></div>

                                        <div className="notification-actions" id="notification-actions">
                                            <div className="d-flex text-muted justify-content-center">
                                                Select <div id="select-content" className="text-body fw-semibold px-1">0</div> Result <button type="button" className="btn btn-link link-danger p-0 ms-3" data-bs-toggle="modal" data-bs-target="#removeNotificationModal">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className={`btn ${dropDown ? 'show' : ''}`} id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded={`${dropDown ? true : false}`} onClick={() => profileDropDown()}>
                                    <span className="d-flex align-items-center">
                                        <img className="rounded-circle header-profile-user" src="/images/avatar-1.jpg" alt="Header Avatar" />
                                            <span className="text-start ms-xl-2">
                                                <span className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">Anna Adame</span>
                                                <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">Founder</span>
                                            </span>
                                    </span>
                                </button>
                                <div className={`dropdown-menu dropdown-menu-end ${dropDown ? 'show user-profile-dropdown-header' : ''}`} data-popper-placement={`${dropDown ? 'bottom-end' : ''}`}>
                                    <h6 className="dropdown-header">Welcome Anna!</h6>
                                    <Link className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></Link>
                                    <Link className="dropdown-item" href="apps-chat.html"><i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Messages</span></Link>
                                    <Link className="dropdown-item" href="apps-tasks-kanban.html"><i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Taskboard</span></Link>
                                    <Link className="dropdown-item" href="pages-faqs.html"><i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Help</span></Link>
                                    <div className="dropdown-divider"></div>
                                    <Link className="dropdown-item" href="pages-profile.html"><i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Balance : <b>$5971.67</b></span></Link>
                                    <Link className="dropdown-item" href="pages-profile-settings.html"><span className="badge bg-success-subtle text-success mt-1 float-end">New</span><i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Settings</span></Link>
                                    <Link className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></Link>
                                    <Link className="dropdown-item" onClick={() => logout()}><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

}
export default TopHeader;