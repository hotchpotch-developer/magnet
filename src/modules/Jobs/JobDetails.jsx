import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";

const JobDetails = () => {
    const location = useLocation();
    const [data, setData] = useState(false)

    useEffect(() => {
        setData(location.state)
    }, [location])

    return (
        <>
            <Breadcrumbs title="Job Details" parentPage="Post Job" />
            {data && data.id && <>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <div className="card mt-n4 mx-n4 card-border-effect-none border-0">
                            <div className="bg-secondary-subtle">
                                <div className="card-body px-4 pb-4">
                                    <div className="row mb-3">
                                        <div className="col-md">
                                            <div className="row align-items-center g-3">
                                                <div className="col-md-auto">
                                                    <div className="avatar-md">
                                                        <div className="avatar-title bg-white rounded-circle">
                                                            <img src="assets/images/brands/slack.png" alt="" className="avatar-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md">
                                                    <div>
                                                        <h4 className="fw-bold">{data.hr_spoc}</h4>
                                                        <div className="hstack gap-3 flex-wrap">
                                                            <div><i className="ri-building-line align-bottom me-1"></i> {data.business_spoc}</div>
                                                            <div className="vr"></div>
                                                            <div><i className="ri-map-pin-2-line align-bottom me-1"></i>
                                                                {data.location_id && data.location_id.length > 0 && data.location_id.map(l => <span key={l.value}>{l.label}</span>)}
                                                            </div>
                                                            <div className="vr"></div>
                                                            <div className="badge rounded-pill bg-success fs-12">{data.position_no}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-auto">
                                            <div className="hstack gap-1 flex-wrap mt-4 mt-md-0">
                                                <button type="button" className="btn btn-icon btn-sm btn-ghost-warning fs-16">
                                                    <i className="ri-star-fill"></i>
                                                </button>
                                                <button type="button" className="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i className="ri-share-line"></i>
                                                </button>
                                                <button type="button" className="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i className="ri-flag-line"></i>
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
                    <div className="col-xxl-9">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="mb-3">Job Description</h5>
                                <div dangerouslySetInnerHTML={{__html: data.job_description}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="mb-0">Job Overview</h5>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive table-card">
                                    <table className="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td className="fw-medium">Product</td>
                                                <td>{data.product && data.product.lable}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Company Name</td>
                                                <td>{data.company && data.company.lable}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Job Application</td>
                                                <td>{data.openings}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Salary</td>
                                                <td>{data.ctc_from} - {data.ctc_to}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">State</td>
                                                <td>{data.state_name && data.state_name.lable}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4 pt-2 hstack gap-2">
                                    <a href="#!" className="btn btn-primary w-100">Apply Now</a>
                                    <a href="#!" className="btn btn-soft-danger btn-icon custom-toggle flex-shrink-0" data-bs-toggle="button">
                                        <span className="icon-on"><i className="ri-bookmark-line align-bottom"></i></span>
                                        <span className="icon-off"><i className="ri-bookmark-3-fill align-bottom"></i></span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>}
        </>
    )

}
export default JobDetails;