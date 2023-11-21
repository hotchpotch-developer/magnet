import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "./Helper";
import { LOGOUT } from "./APIRoutes";
import { Context } from "./Context";

const TopHeader = () => {

    const [dropDown, setDropDown] = useState(false)
    const [context, setContext] = useContext(Context)
    const [adminToken] = useState(localStorage.getItem('admin-accessToken') ?? false)
    const navigate = useNavigate()

    const openMenu = () => {
        const element = document.querySelector("body");
        element.classList.toggle('menu');
        
    }

    const profileDropDown = () => {
        setDropDown(!dropDown)
    }

    const logout = () => {
        if(context && context.auth){
            fetchData(LOGOUT, 'GET', '', true, false, (res) => {
                if(res.status === 200 && res.success) {
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('admin-accessToken')
                    setContext('')
                    navigate('/')
                }
            })
        }
    }

    const goToAdmin = () => {
        localStorage.removeItem('admin-accessToken')
        localStorage.setItem('accessToken', adminToken)
        window.location.replace('/')
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
                                        <img src="/logo.jpeg" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/logo.jpeg" alt="" height="30" />
                                    </span>
                                </Link>

                                <Link href="/" className="logo logo-light">
                                    <span className="logo-sm">
                                        <img src="/logo.jpeg" alt="" height="22" />
                                    </span>
                                    <span className="logo-lg">
                                        <img src="/logo.jpeg" alt="" height="30" />
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
                            
                            {context && context.auth && <>
                                <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button type="button" className={`btn ${dropDown ? 'show' : ''}`} id="page-header-user-dropdown" data-bs-toggle="dropdown" aria-haspopup="true" onClick={() => profileDropDown()}>
                                    <span className="d-flex align-items-center">
                                        <img className="rounded-circle header-profile-user" src="/images/avatar-1.jpg" alt="Header Avatar" />
                                            <span className="text-start ms-xl-2">
                                                <span className="d-none d-xl-inline-block ms-1 fw-semibold user-name-text">{context.auth.name}</span>
                                                <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">{context.auth.role_name}</span>
                                            </span>
                                    </span>
                                </button>
                                <div className={`dropdown-menu dropdown-menu-end ${dropDown ? 'show user-profile-dropdown-header' : ''}`} data-popper-placement={`${dropDown ? 'bottom-end' : ''}`}>
                                    <h6 className="dropdown-header">Welcome {context.auth.name} !</h6>
                                    {adminToken && <button onClick={goToAdmin} className="dropdown-item"><i className="mdi mdi-account-reactivate text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Go To Admin</span></button>}
                                    <Link className="dropdown-item" to="/account-settings"><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Profile</span></Link>
                                    <Link className="dropdown-item" to={context.auth.role_id === "1" ? "/attendance-list" : "/calender"}><i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i> <span className="align-middle">{context.auth.role_id === "1" ? "Attendance List" : "Calender"}</span></Link>
                                    <Link className="dropdown-item" href="auth-lockscreen-basic.html"><i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i> <span className="align-middle">Lock screen</span></Link>
                                    <Link className="dropdown-item" onClick={() => logout()}><i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i> <span className="align-middle" data-key="t-logout">Logout</span></Link>
                                </div>
                            </div>
                            </>}
                        </div>
                    </div>
                </div>
            </header>
        </>
    )

}
export default TopHeader;