import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../components/Context";
import Breadcrumbs from "../../components/Breadcrumbs";


const Dashboard = () => {

    const [greeting, setGreeting] = useState('');
    const [userName, setUserName] = useState('');
    const [context] = useContext(Context)

    useEffect(() =>  {
        const date = new Date();
        const greeting_hours = date.getHours();
        if(greeting_hours < 12) {
            setGreeting('Good Morning')
        }else if(greeting_hours <= 17){ 
            setGreeting('Good Noon')
        }else{ 
            setGreeting('Good Evening')
        }
        if(context && context.auth){ 
            setUserName(context.auth.name)
        }
    }, [context])

    return (
        <>
            <Breadcrumbs title="Dashboard" parentPage="Home" />

            <div className="row">
                <div className="col">
                    <div className="h-100">
                        <div className="row mb-3 pb-1">
                            <div className="col-12">
                                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                                    <div className="flex-grow-1">
                                        <h4 className="fs-16 mb-1">{greeting && greeting}, {userName && userName}!</h4>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-xl-3 col-md-6">
                                <div className="card card-animate">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 overflow-hidden">
                                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0"> Total Candidates</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="0">0</span> </h4>
                                                <Link to="/candidates-list" className="text-decoration-underline">View Candidates</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-primary-subtle rounded fs-3">
                                                    <i className="bx bx-group text-primary"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-3 col-md-6">
                                
                                <div className="card card-animate">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 overflow-hidden">
                                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Jobs</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="0">0</span></h4>
                                                <Link to="/manage-jobs" className="text-decoration-underline">View Jobs</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-primary-subtle rounded fs-3">
                                                    <i className="bx bx-shopping-bag text-primary"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                
                                <div className="card card-animate">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 overflow-hidden">
                                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Total Teams</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="0">0</span></h4>
                                                <Link to="/team-list" className="text-decoration-underline">View Teams</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-primary-subtle rounded fs-3">
                                                    <i className="bx bx-user text-primary"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-3 col-md-6">
                                
                                <div className="card card-animate">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="flex-grow-1 overflow-hidden">
                                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">Hired Candidates</p>
                                            </div>
                                        </div>
                                        <div className="d-flex align-items-end justify-content-between mt-4">
                                            <div>
                                                <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="0">0</span></h4>
                                                <Link to="/candidates-list" className="text-decoration-underline">View Candidates</Link>
                                            </div>
                                            <div className="avatar-sm flex-shrink-0">
                                                <span className="avatar-title bg-primary-subtle rounded fs-3">
                                                    <i className="bx bx-user-pin text-primary"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-header align-items-center d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">New Candidates</h4>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive table-card">
                                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="avatar-sm bg-light rounded p-1 me-2">
                                                                    <img src="/images/user-default.jpg" alt="" className="img-fluid d-block" />
                                                                </div>
                                                                <div>
                                                                    <h5 className="fs-14 my-1"><Link to="apps-ecommerce-product-details.html" className="text-reset">Surendra Shrivastava</Link></h5>
                                                                    <span className="text-muted">24 Apr 2021</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <h5 className="fs-14 my-1 fw-normal">surendra@gmail.com</h5>
                                                            <span className="text-muted">Email</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="fs-14 my-1 fw-normal">+91 8967452312</h5>
                                                            <span className="text-muted">Phone No.</span>
                                                        </td>
                                                        <td>
                                                            <h5 className="fs-14 my-1 fw-normal">Lucknow</h5>
                                                            <span className="text-muted">Location</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-6">
                                <div className="card">
                                    <div className="card-header align-items-center d-flex">
                                        <h4 className="card-title mb-0 flex-grow-1">Top New Jobs</h4>
                                    </div>

                                    <div className="card-body">
                                        <div className="table-responsive table-card">
                                            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="d-flex align-items-center">
                                                                <div className="flex-shrink-0 me-2">
                                                                    <img src="/images/slack.png" alt="" className="avatar-sm p-2" />
                                                                </div>
                                                                <div>
                                                                    <h5 className="fs-14 my-1 fw-medium">
                                                                        <Link to="#" className="text-reset">ABC Pvt Ltd</Link>
                                                                    </h5>
                                                                    <span className="text-muted">Suneel</span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted">1000000-20000000</span>
                                                        </td>
                                                        <td>
                                                            <p className="mb-0">12</p>
                                                            <span className="text-muted">Openings</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-muted">HR Manager</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div> 
                                </div> 
                            </div> 
                        </div> 
                    </div> 
                </div> 
            </div> 
        </>
    )

}
export default Dashboard;