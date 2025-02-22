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
                                    <img src="/images/mcap.svg" alt="" className="avatar-xxs companyLogo-img" />
                                </div>
                            </div>
                            <div className="ms-3 flex-grow-1">
                                <img src="/images/mcap.svg" alt="" className="d-none cover-img" />
                                <h5 className="job-title">{item.name}</h5>
                                <div className="d-flex">
                                    <p className="company-name mb-0 me-2">
                                        <i className="ri-mail-line me-1"></i>
                                        {item.email}
                                    </p>
                                    <p className="company-name mb-0 me-2">
                                        <i className="ri-smartphone-line me-1"></i>
                                        {item.contact_no}
                                    </p>
                                </div>
                                <p className="company-name my-2">
                                    <i className=" ri-building-line me-1"></i>
                                    {item.company}
                                </p>
                                
                            </div>
                            <div>
                                <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button" onClick={() => navigate('/edit-contact', { state: item })}>
                                    <span className="icon-on"><i className="ri-pencil-fill fs-5"></i></span>
                                    <span className="icon-off"><i className="ri-pencil-fill fs-5"></i></span>
                                </button>
                            </div>
                        </div>
                        <div>
                            <div className="d-flex text-truncate" dangerouslySetInnerHTML={{ __html: item.remark }}></div>
                        </div>
                    </div>
                    <div className="card-footer border-top-dashed">
                        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                            <div>
                                <i className="ri-map-pin-2-line align-bottom me-1"></i>{item.address}, {item.location}, {item.state_name && item.state_name.label}
                            </div>
                            <div>
                                <i className="ri-building-4-line align-bottom me-1"></i>
                                <span className="job-postdate">{item.industry && item.industry.label}</span>
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