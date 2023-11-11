import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../../../components/Helper";

const ContactItem = ({ item }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className="col-lg-12">
                <div className="card joblist-card">
                    <div className="card-body">
                        <div className="d-flex mb-4">
                            <div className="avatar-sm">
                                <div className="avatar-title bg-light rounded">
                                    <img src="/images/slack.png" alt="" className="avatar-xxs companyLogo-img" />
                                </div>
                            </div>
                            <div className="ms-3 flex-grow-1">
                                <img src="assets/images/small/img-8.jpg" alt="" className="d-none cover-img" />
                                <Link to=""><h5 className="job-title">{item.name}</h5></Link>
                                <p className="company-name text-muted mb-0">{item.email}</p>
                            </div>
                            <div>
                                <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button" onClick={() => navigate('/edit-contact', { state: item })}>
                                    <span className="icon-on"><i className="ri-pencil-fill fs-5"></i></span>
                                    <span className="icon-off"><i className="ri-pencil-fill fs-5"></i></span>
                                </button>
                            </div>
                        </div>
                        <p className="text-muted job-description">{item.company && item.company.label}</p>
                        <div>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.industry && item.industry.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.state_name && item.state_name.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item.sales_non && item.sales_non.label}</span>
                        </div>
                    </div>
                    <div className="card-footer border-top-dashed">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <i className="ri-map-pin-2-line align-bottom me-1"></i>{item.location && item.location.label}
                            </div>
                            <div>
                                <i className="ri-user-3-line align-bottom me-1"></i> {item.contact_no}
                            </div>
                            <div>
                                <i className="ri-time-line align-bottom me-1"></i>
                                <span className="job-postdate">{item.created_at ? dateFormat(item.created_at) : ''}</span>
                            </div>
                            <div>
                                <Link to="/contact-details" state={item} className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactItem;