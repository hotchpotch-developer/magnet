import { Link, useNavigate } from "react-router-dom";
import { dateFormat } from "../../../components/Helper";
import { includes, pull, toInteger } from "lodash";

const CandidateItem = ({ item, ids, setIds }) => {
    const navigate = useNavigate()

    const handleInputChange = (e) => {
        let value = toInteger(e.target.value);
        let newIds = e.target.checked ? [...ids, value] : pull(ids, value);
        setIds(newIds);
    }

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
                                <h5 className="job-title">{item.name}</h5>
                                <div className="d-flex">
                                    {item?.candidate_experience[0] &&
                                        <p className="company-name text-muted mb-0 me-1">
                                            <i className="ri-user-2-line me-1"></i>
                                            {item?.candidate_experience[0]?.department_id?.label}
                                        </p>
                                    }
                                    <p className="company-name text-muted mb-0 me-1">
                                        <i className="ri-smartphone-line me-1"></i>
                                        {item?.primary_phone}
                                    </p>
                                    <p className="company-name text-muted mb-0">
                                        <i className="ri-mail-line me-1"></i>
                                        {item?.primary_email}
                                    </p>
                                </div>
                                {item?.candidate_experience[0] &&
                                    <p className="company-name my-2">
                                        <i className="ri-building-line me-1"></i>
                                        {item?.candidate_experience[0]?.company_id?.label}
                                    </p>
                                }
                            </div>
                            <div>
                                <input type="checkbox" name="candidate_id" value={item.id} onChange={handleInputChange} />
                                <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button" onClick={() => navigate('/edit-candidate', { state: item })}>
                                    <span className="icon-on"><i className="ri-pencil-fill fs-5"></i></span>
                                    <span className="icon-off"><i className="ri-pencil-fill fs-5"></i></span>
                                </button>
                            </div>
                        </div>
                        <div>
                            {item?.candidate_experience[0] &&
                                <span className="badge bg-primary-subtle text-primary me-1">{item?.candidate_experience[0]?.industry_id?.label}</span>
                            }
                            <span className="badge bg-primary-subtle text-primary me-1">{item?.high_qualification_id?.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item?.current_state?.label}</span>
                            <span className="badge bg-primary-subtle text-primary me-1">{item?.current_location?.label}</span>
                        </div>
                    </div>
                    {item?.candidate_experience[0] &&
                        <div className="card-footer border-top-dashed">
                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <i className="ri-briefcase-2-line align-bottom me-1"></i>
                                    <span className="job-type">{item?.candidate_experience[0]?.designation}</span>
                                </div>
                                <div>
                                    <i className=" ri-user-2-line align-bottom me-1"></i>
                                    <span className="job-experience">{item?.candidate_experience[0] ? `${item?.candidate_experience[0]?.total_experience} Year` : ''}</span>
                                </div>
                                <div>
                                    <i className="ri-map-pin-2-line align-bottom me-1"></i>
                                    <span className="fs-12 mx-1">{item?.preferred_location?.label}</span>
                                </div>
                                <div>
                                    <i className="ri-user-3-line align-bottom me-1"></i> {item?.candidate_experience[0]?.current_ctc}
                                </div>
                                <div className="d-none">
                                    <i className="ri-time-line align-bottom me-1"></i>
                                    <span className="job-postdate">{item.created_at ? dateFormat(item.created_at) : ''}</span>
                                </div>
                                <div>
                                    <Link to="/candidate-details" state={item} className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CandidateItem;