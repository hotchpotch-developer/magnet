import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";
import { dateFormat } from "../../components/Helper";
import _ from "lodash";

const CandidateDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const ASSET_URL = process.env.REACT_APP_ASSET_URL
    const [data, setData] = useState(false)

    useEffect(() => {
        setData(location.state)
    }, [location])

    return (
        <>
            <Breadcrumbs title="Candidate Details" parentPage="Candidate List" />
            {data && data.id && <>
                <div className="row mt-4">
                    <div className="card mt-n4 card-border-effect-none border-0 px-0 ">
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
                                                        <div className="company-name mb-0 me-1">
                                                            <i className="ri-smartphone-line me-1"></i>
                                                            {data.primary_phone}
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div className="company-name mb-0">
                                                            <i className="ri-mail-line me-1"></i>
                                                            {data.primary_email}
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            <i className="ri-map-pin-2-line align-bottom me-1"></i>
                                                            {data?.current_location?.label}
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            <i className="ri-map-2-line align-bottom me-1"></i>
                                                            {data?.current_state?.label}
                                                        </div>
                                                        <div className="vr"></div>
                                                        <div>
                                                            <i className="ri-user-3-line align-bottom me-1"></i>
                                                            {data?.status && _.startCase(data.status)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-auto">
                                        <div className="hstack gap-1 flex-wrap mt-4 mt-md-0">
                                            <span className="badge bg-primary fs-5" title="Last Updated">
                                                <i className="ri-calendar-2-line align-bottom me-1"></i>
                                                {data?.last_updated && dateFormat(data.last_updated, true)}
                                            </span>
                                            {data?.resume_file &&
                                                <a href={ASSET_URL + data?.resume_file} target="_blanks" className="badge bg-primary" title="Resume File"><i className="ri-file-line fs-3"></i></a>
                                            }
                                            <button type="button" className="btn btn-primary btn-icon custom-toggle ms-auto" data-bs-toggle="button" onClick={() => navigate('/edit-candidate', { state: data })}>
                                                <span className="icon-on"><i className="ri-pencil-fill fs-5"></i></span>
                                                <span className="icon-off"><i className="ri-pencil-fill fs-5"></i></span>
                                            </button>
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
                            <h3 className="mb-0 fw-bold">Personal Information</h3>
                        </div>
                        <div className="card-body">
                            <div className="table-responsive table-card">
                                <table className="table mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="fw-medium">Candidate ID</td>
                                            <td>{data.candidate_id}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">PAN No</td>
                                            <td>{data.pan_no}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Name</td>
                                            <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Gender</td>
                                            <td>{data.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Qualification</td>
                                            <td>{data.high_qualification_id?.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Primary Mobile No.</td>
                                            <td>{data.primary_phone}</td>
                                        </tr>
                                        {data?.alternate_mobile &&
                                            <tr>
                                                <td className="fw-medium">Alternate Mobile No.</td>
                                                <td>{data.alternate_mobile}</td>
                                            </tr>
                                        }
                                        <tr>
                                            <td className="fw-medium">Primary E-Mail</td>
                                            <td>{data.primary_email}</td>
                                        </tr>
                                        {data?.alternate_email &&
                                            <tr>
                                                <td className="fw-medium">Alternate E-Mail</td>
                                                <td>{data.alternate_email}</td>
                                            </tr>
                                        }
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
                                            <td>
                                                {data.preferred_state && data.preferred_state.map((value, key) => {
                                                    return (
                                                        <span className="badge bg-primary rounded mx-1" key={key}>
                                                            {value.label}
                                                        </span>
                                                    )
                                                })}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Preferred Locations</td>
                                            <td>
                                                {data.preferred_location && data.preferred_location.map((value, key) => {
                                                    return (
                                                        <span className="badge bg-primary rounded mx-1" key={key}>
                                                            {value.label}
                                                        </span>
                                                    )
                                                })}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                
                {data.candidate_experience?.length > 0 &&
                    <div className="row">
                        <div className="card" >
                            <div className="card-header mt-3">
                                <h3 className="mb-0 fw-bold">Experience</h3>
                            </div>
                            {data.candidate_experience?.length > 0 && data.candidate_experience.map((exp, index) => {
                                return (
                                    <div key={index}>
                                        <div className="card-header mt-3">
                                            <h5 className="mb-0 fw-bold">{exp?.experience_type === 'current' ? "Current Employment" : "Previous Employment"}</h5>
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
                                                            <td>{`${exp.total_experience} year`}</td>
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
                                )
                            })}
                        </div>
                    </div>
                }
                {data?.additional_information &&
                    <div className="row">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="mb-0 fw-bold">Additional Information</h3>
                            </div>
                            <div className="card-body">
                                <div dangerouslySetInnerHTML={{ __html: data.additional_information }}></div>
                            </div>
                        </div>
                    </div>
                }
            </>}
        </>
    )

}
export default CandidateDetails;