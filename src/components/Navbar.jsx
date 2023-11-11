import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Context } from "./Context";

const Navbar = () => {
    const [context] = useContext(Context)
    const location = useLocation()
    const [superAdmin, setSuperAdmin] = useState(false)

    useEffect(() => {
        if (context && context.auth && context.auth.role_id === "1") {
            setSuperAdmin(true);
        }
    }, [context])

    return (
        <>
            <div className="app-menu navbar-menu">

                <div className="navbar-brand-box">

                    <Link to="index.html" className="logo logo-dark">
                        <span className="logo-sm">
                            <img src="/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/images/logo-dark.png" alt="" height="17" />
                        </span>
                    </Link>
                    <Link to="index.html" className="logo logo-light">
                        <span className="logo-sm">
                            <img src="/images/logo-sm.png" alt="" height="22" />
                        </span>
                        <span className="logo-lg">
                            <img src="/images/logo-light.png" alt="" height="17" />
                        </span>
                    </Link>
                    <button type="button" className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover" id="vertical-hover">
                        <i className="ri-record-circle-line"></i>
                    </button>
                </div>

                <div id="scrollbar">
                    <div className="container-fluid">

                        <div id="two-column-menu">
                        </div>
                        {context && context.auth && (superAdmin || context.auth.permissions) && <>
                            <ul className="navbar-nav" id="navbar-nav">
                                <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                                <li className="nav-item">
                                    <Link className={`nav-link menu-link ${location.pathname.match("/dashboard") && "text-primary"}`} to="/">
                                        <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Dashboard</span>
                                    </Link>
                                </li>
                                {(superAdmin || context.auth.permissions.includes('Permission')) && <>
                                    {/* <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/manage-roles") || location.pathname.match("/manage-permission") || location.pathname.match("/user-permission")) && "text-primary"}`} to="#managerMenu" data-bs-toggle="collapse" role="button" aria-controls="managerMenu">
                                            <i className="ri-shield-user-line"></i> <span data-key="t-apps">Permission</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="managerMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/manage-roles" className={`nav-link ${location.pathname.match("/manage-roles") && "text-primary"}`} data-key="t-calendar"> Manage Roles </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/manage-permission" className={`nav-link ${location.pathname.match("/manage-permission") && "text-primary"}`} data-key="t-chat"> Manage Permission </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/user-permission" className={`nav-link ${location.pathname.match("/user-permission") && "text-primary"}`} data-key="t-chat"> User Permission </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li> */}
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Teams')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/add-team") || location.pathname.match("/team-list")) && "text-primary"}`} to="#managerMenu" data-bs-toggle="collapse" role="button" aria-controls="managerMenu">
                                            <i className="ri-team-line"></i> <span data-key="t-apps">Teams</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="managerMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/add-team" className={`nav-link ${location.pathname.match("/add-team") && "text-primary"}`} data-key="t-calendar"> Add Team </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/team-list" className={`nav-link ${location.pathname.match("/team-list") && "text-primary"}`} data-key="t-calendar"> Team List </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Post Job')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/manage-jobs") || location.pathname.match("/create-job")) && "text-primary"}`} to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-controls="recruiterMenu">
                                            <i className="ri-briefcase-2-line"></i> <span data-key="t-apps">Post Job</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="recruiterMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/create-job" className={`nav-link ${location.pathname.match("/create-job") && "text-primary"}`} data-key="t-calendar"> Create Job </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="/manage-jobs" className={`nav-link ${location.pathname.match("/manage-jobs") && "text-primary"}`} data-key="t-chat"> Manage Jobs </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Candidates')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/add-candidate") || location.pathname.match("/candidates-list") || location.pathname.match("/edit-candidate")) && "text-primary"}`} to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-controls="recruiterMenu">
                                            <i className="ri-account-box-line"></i> <span data-key="t-apps">Candidates</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="recruiterMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/add-candidate" className={`nav-link ${location.pathname.match("/add-candidate") && "text-primary"}`} data-key="t-calendar"> Add Candidate </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="candidates-list" className={`nav-link ${location.pathname.match("/candidates-list") && "text-primary"}`} data-key="t-chat"> Candidates List </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Contact')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/add-contact") || location.pathname.match("/contacts-list")) && "text-primary"}`} to="#contactsMenu" data-bs-toggle="collapse" role="button" aria-controls="recruiterMenu">
                                            <i className="ri-account-box-line"></i> <span data-key="t-apps">Business Contact</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="contactsMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/add-contact" className={`nav-link ${location.pathname.match("/add-contact") && "text-primary"}`} data-key="t-calendar"> Add Contact </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="contacts-list" className={`nav-link ${location.pathname.match("/contacts-list") && "text-primary"}`} data-key="t-chat"> Contacts List </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Note')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${(location.pathname.match("/add-note") || location.pathname.match("/notes-list")) && "text-primary"}`} to="#notesMenu" data-bs-toggle="collapse" role="button" aria-controls="recruiterMenu">
                                            <i className="ri-account-box-line"></i> <span data-key="t-apps">Note</span>
                                        </Link>
                                        <div className="collapse menu-dropdown" id="notesMenu">
                                            <ul className="nav nav-sm flex-column">
                                                <li className="nav-item">
                                                    <Link to="/add-note" className={`nav-link ${location.pathname.match("/add-note") && "text-primary"}`} data-key="t-calendar"> Add Note </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link to="notes-list" className={`nav-link ${location.pathname.match("/notes-list") && "text-primary"}`} data-key="t-chat"> Notes List </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </>}
                                {(superAdmin || context.auth.permissions.includes('Common Settings')) && <>
                                    <li className="nav-item">
                                        <Link className={`nav-link menu-link ${location.pathname.match("/common-setting") && "text-primary"}`} to="/common-setting">
                                            <i className="ri-list-settings-line"></i> <span data-key="t-apps">Common Settings</span>
                                        </Link>
                                    </li>
                                </>}
                                <li className="nav-item">
                                    <Link className={`nav-link menu-link ${location.pathname.match("/account-settings") && "text-primary"}`} to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-controls="recruiterMenu">
                                        <i className="ri-settings-line"></i> <span data-key="t-apps">Settings</span>
                                    </Link>
                                    <div className="collapse menu-dropdown" id="recruiterMenu">
                                        <ul className="nav nav-sm flex-column">
                                            <li className="nav-item">
                                                <Link to="/account-settings" className={`nav-link ${location.pathname.match("/account-settings") && "text-primary"}`} data-key="t-calendar"> Account Settings </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </>}
                    </div>
                </div>

                <div className="sidebar-background"></div>
            </div>
        </>
    )

}
export default Navbar;