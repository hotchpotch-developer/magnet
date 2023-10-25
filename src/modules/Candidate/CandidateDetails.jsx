import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";
import { dateFormat } from "../../components/Helper";

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
                                                        <h4 className="fw-bold">{data.first_name} {" "} {data.last_name}</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div><i className="ri-building-line align-bottom me-1"></i> {data.company && data.company.label}</div>
                                                            <div className="vr"></div>
                                                            <div><i className="ri-map-pin-2-line align-bottom me-1"></i>
                                                                {data.location_id && data.location_id.length > 0 && data.location_id.map(l => <span key={l.value}><span className="badge rounded-pill bg-primary fs-12 mx-1">{l.label}</span></span>)}
                                                            </div>
                                                            <div className="vr"></div>
                                                            <div className="badge rounded-pill bg-success fs-12">{data.current_ctc}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="hstack gap-1 flex-wrap mt-4 mt-md-0">
                                                <button type="button" className="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i className="ri-share-line"></i>
                                                </button>
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
                                            <td className="fw-medium">Email</td>
                                            <td>{data.email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Pan Number</td>
                                            <td>{data.pan_no}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Business Name</td>
                                            <td>{data.company && data.company.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Industry</td>
                                            <td>{data.industry && data.industry.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Department</td>
                                            <td>{data.department && data.department.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Level</td>
                                            <td>{data.level && data.level.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Salary</td>
                                            <td>{data.current_ctc}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">State</td>
                                            <td>{data.state_name && data.state_name.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Sales/Non-Sales</td>
                                            <td>{data.sales_non && data.sales_non.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Channel</td>
                                            <td>{data.channel && data.channel.label}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Gender</td>
                                            <td>{data.gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Designation</td>
                                            <td>{data.designation}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium">Date Of Birth</td>
                                            <td>{dateFormat(data.dob)}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )

}
export default CandidateDetails;