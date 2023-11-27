import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";
import { dateFormat } from "../../components/Helper";
import _ from "lodash";

const TeamDetails = () => {
    const ASSET_URL = process.env.REACT_APP_ASSET_URL
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(location.state)
    }, [location])

    return (
        <>
            <Breadcrumbs title={data?.name} parentPage="Our Team" />
            <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                <div className="row g-4">
                    <div className="col-auto">
                        <div className="avatar-lg">
                            <img src={data?.profile_image ? ASSET_URL + data?.profile_image : 'images/user-default.jpg'} alt="user-img" className="img-thumbnail rounded-circle h-100" />
                        </div>
                    </div>

                    <div className="col">
                        <div className="p-2">
                            <h3 className="mb-1">{data?.name}</h3>
                            <p className="text-muted">{data?.roles_name}</p>
                            <div className="hstack text-muted gap-1">
                                <div className="me-2"><i className="ri-account-box-line me-1 fs-16 align-bottom text-primary"></i>{data?.emp_id}</div>
                                <div>
                                    <i className="ri-mail-line me-1 fs-16 align-bottom text-primary"></i>{data?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    <div>
                        <div className="d-flex profile-wrapper">
                            <ul className="nav nav-pills animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link fs-14 active" data-bs-toggle="tab" to="#overview-tab" role="tab">
                                        <i className="ri-airplay-fill d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Overview</span>
                                    </Link>
                                </li>
                                {/* <li className="nav-item">
                                    <Link className="nav-link fs-14" data-bs-toggle="tab" to="#activities" role="tab">
                                        <i className="ri-list-unordered d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Activities</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-14" data-bs-toggle="tab" to="#projects" role="tab">
                                        <i className="ri-price-tag-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Projects</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link fs-14" data-bs-toggle="tab" to="#documents" role="tab">
                                        <i className="ri-folder-4-line d-inline-block d-md-none"></i> <span className="d-none d-md-inline-block">Documents</span>
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                        <div className="tab-content pt-4 text-muted">
                            <div className="tab-pane active" id="overview-tab" role="tabpanel">
                                <div className="row">
                                    <div className="col-xxl-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title mb-3">Info</h5>
                                                <div className="table-responsive">
                                                    <table className="table table-borderless mb-0">
                                                        <tbody>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Full Name :</th>
                                                                <td className="text-muted">{data?.name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Role :</th>
                                                                <td className="text-muted">{data?.roles_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Primary Phone No. :</th>
                                                                <td className="text-muted">{data?.phone}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Alternate Phone No. :</th>
                                                                <td className="text-muted">{data && data.phone_1 ? data.phone_1 : 'N/A'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Primary E-Mail :</th>
                                                                <td className="text-muted">{data?.email}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Alternate E-Mail :</th>
                                                                <td className="text-muted">{data && data.email_1 ? data.email_1 : 'N/A'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Reporting Manager :</th>
                                                                <td className="text-muted">{data && data.reporting_user_name ? data.reporting_user_name.name : 'N/A'}</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Status :</th>
                                                                <td className="text-muted">{data && _.capitalize(data.status)} {data && data.status_reason &&  '(' + data.status_reason + ', ' + data.status_update + ')' }</td>
                                                            </tr>
                                                            <tr>
                                                                <th className="ps-0" scope="row">Joining Date</th>
                                                                <td className="text-muted">{data && data.created_at ? dateFormat(data.created_at) : 'N/A'}</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-xxl-9">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="d-flex align-items-center mb-4">
                                                    <h5 className="card-title flex-grow-1 mb-0">Document</h5>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12 mb-2">
                                                        <div className="table-responsive">
                                                            <table className="table table-borderless align-middle mb-0">
                                                                <thead className="table-light">
                                                                    <tr>
                                                                        <th scope="col">Document</th>
                                                                        <th scope="col">Download</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="avatar-sm">
                                                                                    <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                                        <i className="ri-file-list-2-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ms-3 flex-grow-1">
                                                                                    <h6 className="fs-15 mb-0">Aadhar/Pan Card</h6>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {data && data.proof_document ?

                                                                                <a href={data && data.proof_document ? ASSET_URL + data.proof_document : ''} className="btn btn-sm btn-outline-primary" target="_blank" rel="noreferrer"><i className="ri-file-list-2-line align-middle"></i></a>

                                                                                :
                                                                                <span>N/A</span>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <div className="d-flex align-items-center">
                                                                                <div className="avatar-sm">
                                                                                    <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                                        <i className="ri-file-list-2-line"></i>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="ms-3 flex-grow-1">
                                                                                    <h6 className="fs-15 mb-0">Resume</h6>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td>
                                                                            {data && data.resume ?

                                                                                <a href={data && data.resume ? ASSET_URL + data.resume : ''} className="btn btn-sm btn-outline-primary" target="_blank" rel="noreferrer"><i className="ri-file-list-2-line align-middle"></i></a>

                                                                                :
                                                                                <span>N/A</span>
                                                                            }
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title mb-3">Additional Information</h5>
                                                <div dangerouslySetInnerHTML={{ __html: data?.additional_information }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="tab-pane fade" id="activities" role="tabpanel">
                                <div className="card">
                                    <div className="card-body">
                                        <h5 className="card-title mb-3">Activities</h5>
                                        <div className="acitivity-timeline">
                                            <div className="acitivity-item d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src="assets/images/users/avatar-1.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Oliver Phillips <span className="badge bg-primary-subtle text-primary align-middle">New</span></h6>
                                                    <p className="text-muted mb-2">We talked about a project on linkedin.</p>
                                                    <small className="mb-0 text-muted">Today</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                                                    <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                                        N
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Nancy Martino <span className="badge bg-secondary-subtle text-secondary align-middle">In Progress</span></h6>
                                                    <p className="text-muted mb-2"><i className="ri-file-text-line align-middle ms-2"></i> Create new project Buildng product</p>
                                                    <div className="avatar-group mb-2">
                                                        <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Christi">
                                                            <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle avatar-xs" />
                                                        </Link>
                                                        <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="Frank Hook">
                                                            <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle avatar-xs" />
                                                        </Link>
                                                        <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title=" Ruby">
                                                            <div className="avatar-xs">
                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                    R
                                                                </div>
                                                            </div>
                                                        </Link>
                                                        <Link to="#" className="avatar-group-item" data-bs-toggle="tooltip" data-bs-placement="top" title="" data-bs-original-title="more">
                                                            <div className="avatar-xs">
                                                                <div className="avatar-title rounded-circle">
                                                                    2+
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <small className="mb-0 text-muted">Yesterday</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src="assets/images/users/avatar-2.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Natasha Carey <span className="badge bg-success-subtle text-success align-middle">Completed</span>
                                                    </h6>
                                                    <p className="text-muted mb-2">Adding a new event with attachments</p>
                                                    <div className="row">
                                                        <div className="col-xxl-4">
                                                            <div className="row border border-dashed gx-2 p-2 mb-2">
                                                                <div className="col-4">
                                                                    <img src="assets/images/small/img-2.jpg" alt="" className="img-fluid rounded" />
                                                                </div>

                                                                <div className="col-4">
                                                                    <img src="assets/images/small/img-3.jpg" alt="" className="img-fluid rounded" />
                                                                </div>

                                                                <div className="col-4">
                                                                    <img src="assets/images/small/img-4.jpg" alt="" className="img-fluid rounded" />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <small className="mb-0 text-muted">25 Nov</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src="assets/images/users/avatar-6.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Bethany Johnson</h6>
                                                    <p className="text-muted mb-2">added a new member to velzon dashboard</p>
                                                    <small className="mb-0 text-muted">19 Nov</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0">
                                                    <div className="avatar-xs acitivity-avatar">
                                                        <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                                            <i className="ri-shopping-bag-line"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Your order is placed <span className="badge bg-danger-subtle text-danger align-middle ms-1">Out of Delivery</span></h6>
                                                    <p className="text-muted mb-2">These customers can rest assured their order has been placed.</p>
                                                    <small className="mb-0 text-muted">16 Nov</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src="assets/images/users/avatar-7.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Lewis Pratt</h6>
                                                    <p className="text-muted mb-2">They all have something to say
                                                        beyond the words on the page. They can come across as
                                                        casual or neutral, exotic or graphic. </p>
                                                    <small className="mb-0 text-muted">22 Oct</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item py-3 d-flex">
                                                <div className="flex-shrink-0">
                                                    <div className="avatar-xs acitivity-avatar">
                                                        <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                                            <i className="ri-line-chart-line"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">Monthly sales report</h6>
                                                    <p className="text-muted mb-2">
                                                        <span className="text-danger">2 days left</span> notification to submit the monthly sales report. <Link to="#" className="link-warning text-decoration-underline">Reports Builder</Link>
                                                    </p>
                                                    <small className="mb-0 text-muted">15 Oct</small>
                                                </div>
                                            </div>
                                            <div className="acitivity-item d-flex">
                                                <div className="flex-shrink-0">
                                                    <img src="assets/images/users/avatar-8.jpg" alt="" className="avatar-xs rounded-circle acitivity-avatar" />
                                                </div>
                                                <div className="flex-grow-1 ms-3">
                                                    <h6 className="mb-1">New ticket received <span className="badge bg-success-subtle text-success align-middle">Completed</span></h6>
                                                    <p className="text-muted mb-2">User <span className="text-secondary">Erica245</span> submitted a ticket.</p>
                                                    <small className="mb-0 text-muted">26 Aug</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                            <div className="tab-pane fade" id="projects" role="tabpanel">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-warning">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Chat App Update</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">2 year Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    J
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-success">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">ABC Project Customization</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">2 month Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-primary-subtle text-primary fs-10"> Progress</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-8.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-primary">
                                                                                    2+
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-info">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Client - Frank Hook</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">1 hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    M
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-primary">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Velzon Project</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">11 hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-danger">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Brand Logo Design</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">10 min Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    E
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-primary">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Chat App</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">8 hr Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    R
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-8.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-warning">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Project Update</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">48 min Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-warning-subtle text-warning fs-10">Inprogress</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none profile-project-success">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Client - Jennifer</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">30 min Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-primary-subtle text-primary fs-10">Process</div>
                                                            </div>
                                                        </div>

                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0"> Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-1.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none mb-xxl-0 profile-project-info">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Bsuiness Template - UI/UX design</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">7 month Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-2.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-3.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-4.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-primary">
                                                                                    2+
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none mb-xxl-0  profile-project-success">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Update Project</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">1 month Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-light text-primary">
                                                                                    A
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none mb-sm-0  profile-project-danger">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">Bank Management System</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">10 month Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-success-subtle text-success fs-10">Completed</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-6.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-5.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <div className="avatar-title rounded-circle bg-primary">
                                                                                    2+
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-sm-6">
                                                <div className="card profile-project-card shadow-none mb-0  profile-project-primary">
                                                    <div className="card-body p-4">
                                                        <div className="d-flex">
                                                            <div className="flex-grow-1 text-muted overflow-hidden">
                                                                <h5 className="fs-14 text-truncate"><Link to="#" className="text-body">PSD to HTML Convert</Link></h5>
                                                                <p className="text-muted text-truncate mb-0">Last Update : <span className="fw-semibold text-body">29 min Ago</span></p>
                                                            </div>
                                                            <div className="flex-shrink-0 ms-2">
                                                                <div className="badge bg-info-subtle text-info fs-10">New</div>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-4">
                                                            <div className="flex-grow-1">
                                                                <div className="d-flex align-items-center gap-2">
                                                                    <div>
                                                                        <h5 className="fs-12 text-muted mb-0">Members :</h5>
                                                                    </div>
                                                                    <div className="avatar-group">
                                                                        <div className="avatar-group-item">
                                                                            <div className="avatar-xs">
                                                                                <img src="assets/images/users/avatar-7.jpg" alt="" className="rounded-circle img-fluid" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mt-4">
                                                    <ul className="pagination pagination-separated justify-content-center mb-0">
                                                        <li className="page-item disabled">
                                                            <Link to="#" className="page-link"><i className="mdi mdi-chevron-left"></i></Link>
                                                        </li>
                                                        <li className="page-item active">
                                                            <Link to="#" className="page-link">1</Link>
                                                        </li>
                                                        <li className="page-item">
                                                            <Link to="#" className="page-link">2</Link>
                                                        </li>
                                                        <li className="page-item">
                                                            <Link to="#" className="page-link">3</Link>
                                                        </li>
                                                        <li className="page-item">
                                                            <Link to="#" className="page-link">4</Link>
                                                        </li>
                                                        <li className="page-item">
                                                            <Link to="#" className="page-link">5</Link>
                                                        </li>
                                                        <li className="page-item">
                                                            <Link to="#" className="page-link"><i className="mdi mdi-chevron-right"></i></Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="documents" role="tabpanel">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center mb-4">
                                            <h5 className="card-title flex-grow-1 mb-0">Documents</h5>
                                            <div className="flex-shrink-0">
                                                <input className="form-control d-none" type="file" id="formFile" />
                                                <label for="formFile" className="btn btn-danger"><i className="ri-upload-2-fill me-1 align-bottom"></i> Upload File</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="table-responsive">
                                                    <table className="table table-borderless align-middle mb-0">
                                                        <thead className="table-light">
                                                            <tr>
                                                                <th scope="col">File Name</th>
                                                                <th scope="col">Type</th>
                                                                <th scope="col">Size</th>
                                                                <th scope="col">Upload Date</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-primary-subtle text-primary rounded fs-20">
                                                                                <i className="ri-file-zip-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0"><Link to="#">Artboard-documents.zip</Link>
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Zip File</td>
                                                                <td>4.57 MB</td>
                                                                <td>12 Dec 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink15" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink15">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Link></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Link></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                <i className="ri-file-pdf-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0"><Link to="#">Bank Management System</Link></h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>PDF File</td>
                                                                <td>8.89 MB</td>
                                                                <td>24 Nov 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink3" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink3">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Link></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Link></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-secondary-subtle text-secondary rounded fs-20">
                                                                                <i className="ri-video-line"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0"><Link to="#">Tour-video.mp4</Link></h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>MP4 File</td>
                                                                <td>14.62 MB</td>
                                                                <td>19 Nov 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink4" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink4">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Link></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Link></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-success-subtle text-success rounded fs-20">
                                                                                <i className="ri-file-excel-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0"><Link to="#">Account-statement.xsl</Link></h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>XSL File</td>
                                                                <td>2.38 KB</td>
                                                                <td>14 Nov 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink5" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink5">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle text-muted"></i>View</Link></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle text-muted"></i>Download</Link></li>
                                                                            <li className="dropdown-divider"></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle text-muted"></i>Delete</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-info-subtle text-info rounded fs-20">
                                                                                <i className="ri-folder-line"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0"><Link to="#">Project Screenshots Collection</Link></h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>Floder File</td>
                                                                <td>87.24 MB</td>
                                                                <td>08 Nov 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink6" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink6">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle"></i>View</Link></li>
                                                                            <li>
                                                                                <Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle"></i>Download</Link>
                                                                            </li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle"></i>Delete</Link></li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar-sm">
                                                                            <div className="avatar-title bg-danger-subtle text-danger rounded fs-20">
                                                                                <i className="ri-image-2-fill"></i>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ms-3 flex-grow-1">
                                                                            <h6 className="fs-15 mb-0">
                                                                                <Link to="#">Velzon-logo.png</Link>
                                                                            </h6>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>PNG File</td>
                                                                <td>879 KB</td>
                                                                <td>02 Nov 2021</td>
                                                                <td>
                                                                    <div className="dropdown">
                                                                        <Link to="#" className="btn btn-light btn-icon" id="dropdownMenuLink7" data-bs-toggle="dropdown" aria-expanded="true">
                                                                            <i className="ri-equalizer-fill"></i>
                                                                        </Link>
                                                                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink7">
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-eye-fill me-2 align-middle"></i>View</Link></li>
                                                                            <li><Link className="dropdown-item" to="#"><i className="ri-download-2-fill me-2 align-middle"></i>Download</Link></li>
                                                                            <li>
                                                                                <Link className="dropdown-item" to="#"><i className="ri-delete-bin-5-line me-2 align-middle"></i>Delete</Link>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <Link to="#" className="text-success"><i className="mdi mdi-loading mdi-spin fs-20 align-middle me-2"></i> Load more </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamDetails;