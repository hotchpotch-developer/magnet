import { Link, useNavigate } from "react-router-dom";

const JobItem = ({ item }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="col-lg-12">
                <div className="card joblist-card">
                    <div className="card-body">
                        <div className="d-flex mb-4">
                            <div className="avatar-sm">
                                <div className="avatar-title bg-light rounded">
                                    <img src="assets/images/companies/img-7.png" alt="" className="avatar-xxs companyLogo-img" />
                                </div>
                            </div>
                            <div className="ms-3 flex-grow-1">
                                <img src="assets/images/small/img-8.jpg" alt="" className="d-none cover-img" />
                                <Link to=""><h5 className="job-title">{item.hr_spoc}</h5></Link>
                                <p className="company-name text-muted mb-0">{item.business_spoc}</p>
                            </div>
                            <div>
                                <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">
                                    <span className="icon-on"><i className="ri-bookmark-line"></i></span>
                                    <span className="icon-off"><i className="ri-bookmark-fill"></i></span>
                                </button>
                                <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button" onClick={() => navigate('/edit-job', { state: item })}>
                                    <span className="icon-on"><i className="ri-edit-line"></i></span>
                                    <span className="icon-off"><i className="ri-edit-fill"></i></span>
                                </button>
                            </div>
                        </div>
                        <p className="text-muted job-description">{item.job_description}</p>
                        <div>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.product && item.product.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.industry && item.industry.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.department && item.department.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.level && item.level.label}</span>
                        </div>
                    </div>
                    <div className="card-footer border-top-dashed">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <i className="ri-briefcase-2-line align-bottom me-1"></i>
                                <span className="job-type">{item.state_name && item.state_name.label}</span>
                            </div>
                            <div className="d-none">
                                <span className="job-experience">{item.sales_non && item.sales_non.label}</span>
                            </div>
                            <div>
                                <i className="ri-map-pin-2-line align-bottom me-1"></i>
                                <span className="job-location">{item.location && item.location.label}</span>
                            </div>
                            <div>
                                <i className="ri-user-3-line align-bottom me-1"></i> {item.openings} Applied
                            </div>
                            <div>
                                <i className="ri-time-line align-bottom me-1"></i>
                                <span className="job-postdate">15 Sep, 2022</span>
                            </div>
                            <div>
                                <Link to="/jobs-details" state={item} className="btn btn-primary viewjob-list">Job Details <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobItem;