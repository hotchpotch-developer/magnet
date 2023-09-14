import { Link } from "react-router-dom";

const Navbar = () => {

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
                        <ul className="navbar-nav" id="navbar-nav">
                            <li className="menu-title"><span data-key="t-menu">Menu</span></li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="/">
                                    <i className="ri-dashboard-2-line"></i> <span data-key="t-dashboards">Dashboard</span>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="#managerMenu" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="managerMenu">
                                    <i className="ri-admin-line"></i> <span data-key="t-apps">Permission</span>
                                </Link>
                                <div className="collapse menu-dropdown" id="managerMenu">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/manage-roles" className="nav-link" data-key="t-calendar"> Manage Roles </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/manage-permission" className="nav-link" data-key="t-chat"> Manage Permission </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/user-permission" className="nav-link" data-key="t-chat"> User Permission </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li> 
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="#managerMenu" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="managerMenu">
                                    <i className="ri-team-line"></i> <span data-key="t-apps">Teams</span>
                                </Link>
                                <div className="collapse menu-dropdown" id="managerMenu">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/add-manager" className="nav-link" data-key="t-calendar"> Admin </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/add-manager" className="nav-link" data-key="t-calendar"> Manager </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="apps-chat.html" className="nav-link" data-key="t-chat"> Team Leader </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="apps-chat.html" className="nav-link" data-key="t-chat"> HR Recruiter </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="recruiterMenu">
                                    <i className="ri-briefcase-2-line"></i> <span data-key="t-apps">Post Job</span>
                                </Link>
                                <div className="collapse menu-dropdown" id="recruiterMenu">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="apps-calendar.html" className="nav-link" data-key="t-calendar"> Add Job </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="apps-chat.html" className="nav-link" data-key="t-chat"> Job List </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="recruiterMenu">
                                    <i className="ri-user-2-line"></i> <span data-key="t-apps">Candidates</span>
                                </Link>
                                <div className="collapse menu-dropdown" id="recruiterMenu">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="apps-calendar.html" className="nav-link" data-key="t-calendar"> Add Candidates </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="apps-chat.html" className="nav-link" data-key="t-chat"> Candidates List </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="#recruiterMenu" data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="recruiterMenu">
                                    <i className="ri-list-settings-line"></i> <span data-key="t-apps">Common Settings</span>
                                </Link>
                                <div className="collapse menu-dropdown" id="recruiterMenu">
                                    <ul className="nav nav-sm flex-column">
                                        <li className="nav-item">
                                            <Link to="/manage-states" className="nav-link" data-key="t-calendar"> Manage States </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/manage-locations" className="nav-link" data-key="t-chat"> Manage Locations </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link menu-link" to="/">
                                    <i className="ri-settings-line"></i> <span data-key="t-dashboards">Settings</span>
                                </Link>
                            </li> 
                        </ul>
                    </div>
                </div>

                <div className="sidebar-background"></div>
            </div>
        </>
    )

}
export default Navbar;