import { Link } from "react-router-dom";
import { pull, toInteger } from "lodash";

const CandidateItem = ({ item, ids, setIds }) => {
    // const navigate = useNavigate()

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
                            <div className="avatar-sm" style={{ width: "1.25rem" }}>
                                <input type="checkbox" className="form-check-input" name="candidate_id" value={item.id} onChange={handleInputChange} />
                            </div>
                            {/* <div className="avatar-sm">
                                <div className="avatar-title bg-light rounded">
                                    <img src="/images/slack.png" alt="" className="avatar-xxs companyLogo-img" />
                                </div>
                            </div> */}
                            <div className="ms-3 flex-grow-1">
                                <img src="assets/images/small/img-8.jpg" alt="" className="d-none cover-img" />
                                <h5 className="job-title">
                                    <Link to="/candidate-details" state={item} className="viewjob-list">{item.name}</Link>
                                </h5>
                                <div className="row mt-5">
                                    <div className="col-12 col-md-5 border-end mt-4">
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-profile-line me-1"></i>
                                            {item?.candidate_id}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-edit-line me-1"></i>
                                            {item?.last_updated}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-user-4-line me-1"></i>
                                            {`${item?.dob} / ${item?.gender}`}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-article-line me-1"></i>
                                            {item?.high_qualification_id?.label}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-smartphone-line me-1"></i>
                                            {item?.primary_phone}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-mail-line me-1"></i>
                                            {item?.primary_email}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-map-pin-user-line me-1"></i>
                                            {item?.current_location?.label}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-map-pin-range-line me-1"></i>
                                            {item?.current_state?.label}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-pin-distance-line me-1"></i>
                                            {item.preferred_location && item.preferred_location.map((value, key) => {
                                                return (
                                                    <span className="badge border badge-primary text-info rounded mx-1" key={key}>
                                                        {value.label}
                                                    </span>
                                                )
                                            })}
                                        </p>
                                        <p className="company-name text-muted mb-1">
                                            <i className="ri-road-map-line me-1"></i>
                                            {item.preferred_state && item.preferred_state.map((value, key) => {
                                                return (
                                                    <span className="badge border badge-info text-primary rounded mx-1" key={key}>
                                                        {value.label}
                                                    </span>
                                                )
                                            })}
                                        </p>
                                    </div>
                                    {item?.candidate_experience &&  item.candidate_experience.length > 0 &&
                                        item.candidate_experience.map((value, key) => {
                                            return (
                                                value.experience_type === 'current' ? 
                                                    <div className="col-12 col-md-4 border-end mt-4" key={key}>
                                                        <h5 className="mb-3">Current Employment</h5>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-building-line me-1"></i>
                                                            {value?.industry_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-hotel-line me-1"></i>
                                                            {value?.company_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-user-6-line me-1"></i>
                                                            {value?.sales_non_sales_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-suitcase-line me-1"></i>
                                                            {value?.department_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-robot-line me-1"></i>
                                                            {value?.channel_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-asterisk me-1"></i>
                                                            {value?.level_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-user-2-line me-1"></i>
                                                            {`${value?.total_experience} years`}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-dropbox-line me-1"></i>
                                                            {value?.product_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-dropbox-line me-1"></i>
                                                            {value?.product_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-hand-coin-line me-1"></i>
                                                            {value?.current_ctc}
                                                        </p>
                                                    </div>
                                                : 
                                                    <div className="col-12 col-md-3 mt-4" key={key}>
                                                        <h5>Previous Employment</h5>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-building-line me-1"></i>
                                                            {value?.industry_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-hotel-line me-1"></i>
                                                            {value?.company_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-user-6-line me-1"></i>
                                                            {value?.sales_non_sales_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-suitcase-line me-1"></i>
                                                            {value?.department_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-robot-line me-1"></i>
                                                            {value?.channel_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-asterisk me-1"></i>
                                                            {value?.level_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-user-2-line me-1"></i>
                                                            {`${value?.total_experience} years`}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-dropbox-line me-1"></i>
                                                            {value?.product_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-dropbox-line me-1"></i>
                                                            {value?.product_id?.label}
                                                        </p>
                                                        <p className="text-muted mb-1">
                                                            <i className="ri-hand-coin-line me-1"></i>
                                                            {value?.current_ctc}
                                                        </p>
                                                    </div>

                                                
                                            )
                                        })
                                    }
                                </div>
                                {item?.additional_information &&
                                    <div className="row border-top">
                                        <p className="text-truncate mt-3 mb-0">
                                        <div dangerouslySetInnerHTML={{ __html: item.additional_information }}></div>
                                        </p>
                                    </div>
                                }
                            </div>
                            <div>
                                {/* <button type="button" className="btn btn-outline-primary btn-icon custom-toggle" data-bs-toggle="button" onClick={() => navigate('/edit-candidate', { state: item })}>
                                    <span className="icon-on"><i className="ri-pencil-fill fs-5"></i></span>
                                </button> */}
                            </div>
                        </div>
                    </div>
                        <div className="card-footer border-top-dashed">
                            <div className="d-flex justify-content-end align-items-center flex-wrap gap-3">
                                
                                <div>
                                    <Link to="/candidate-details" state={item} className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}

export default CandidateItem;