import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";

const CandidateDetails = () => {
    const location = useLocation();
    const [data, setData] = useState(false)

    useEffect(() => {
        setData(location.state)
    }, [location])

    return (
        <>
            <Breadcrumbs title="Candidate Details" parentPage="Candidate List" />
            {data && data.id && <>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div className="card mt-n4 card-border-effect-none border-0">
                            <div className="bg-secondary-subtle">
                                <div className="card-body px-4 pb-4">
                                    <div className="row mb-3">
                                        <div className="col-md">
                                            <div className="row align-items-center g-3">
                                                <div className="col-md-auto">
                                                    <div className="avatar-md">
                                                        <div className="avatar-title bg-white rounded-circle">
                                                            <img src="/images/slack.png" alt="" className="avatar-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div>
                                                        <h4 className="fw-bold">{data.name}</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div className="company-name text-muted mb-0 me-1">
                                                                <i className="ri-smartphone-line me-1"></i>
                                                                {data.primary_phone}
                                                            </div>
                                                            <div className="vr"></div>
                                                            <div className="company-name text-muted mb-0">
                                                                <i className="ri-mail-line me-1"></i>
                                                                {data.primary_email}
                                                            </div>
                                                            <div>
                                                                <i className="ri-map-pin-2-line align-bottom me-1"></i>
                                                                <span className="badge rounded-pill bg-primary fs-12 mx-1">{data?.current_location?.label}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="hstack gap-1 flex-wrap mt-4 mt-md-0">
                                                {/* <button type="button" className="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i className="ri-share-line"></i>
                                                </button> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Candidate Overview</h5>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive table-card">
                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="fw-medium">CID</td>
                                            <td>{data.candidate_id}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Last Update</td>
                                            <td>{data.last_updated}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Name</td>
                                            <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Age/ Gender</td>
                                            <td>{data.dob}/{data.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Qualification</td>
                                            <td>{data.high_qualification_id?.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Contact No.</td>
                                            <td>{data.primary_phone}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Mail Id.</td>
                                            <td>{data.primary_email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Current State</td>
                                            <td>{data.current_state?.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Current Location</td>
                                            <td>{data.current_location?.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Preferred States</td>
                                            <td>{data.preferred_state?.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Preferred Locations</td>
                                            <td>{data.preferred_location?.label}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Additional Information</h5>
                            <div dangerouslySetInnerHTML={{ __html: data.additional_information }}></div>
                        </div>
                    </div>
                </div>

                {data.candidate_experience?.length > 0 && data.candidate_experience.map((exp, index) => {
                    return <div className="row" key={index}>
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">{index === 0 ? "Current Employment" : "Previous Employment"}</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive table-card">
                                    <table className="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="fw-medium">Industry</td>
                                                <td>{exp.industry_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Company</td>
                                                <td>{exp.company_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Sales/ Non-Sales</td>
                                                <td>{exp.sales_non_sales_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Department</td>
                                                <td>{exp.department_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Designation</td>
                                                <td>{exp.designation}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Channel</td>
                                                <td>{exp.channel_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Level</td>
                                                <td>{exp.level_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Experience</td>
                                                <td>{exp.total_experience}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Product</td>
                                                <td>{exp.product_id?.label}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">CTC</td>
                                                <td>{exp.current_ctc}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                })}

            </>}
        </>
    )

}
export default CandidateDetails;