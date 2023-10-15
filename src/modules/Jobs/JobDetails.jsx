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
                <div class="row mt-4">
                    <div class="col-lg-12">
                        <div class="card mt-n4 mx-n4 card-border-effect-none border-0">
                            <div class="bg-secondary-subtle">
                                <div class="card-body px-4 pb-4">
                                    <div class="row mb-3">
                                        <div class="col-md">
                                            <div class="row align-items-center g-3">
                                                <div class="col-md-auto">
                                                    <div class="avatar-md">
                                                        <div class="avatar-title bg-white rounded-circle">
                                                            <img src="assets/images/brands/slack.png" alt="" class="avatar-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-md">
                                                    <div>
                                                        <h4 class="fw-bold">{data.hr_spoc}</h4>
                                                        <div class="hstack gap-3 flex-wrap">
                                                            <div><i class="ri-building-line align-bottom me-1"></i> {data.business_spoc}</div>
                                                            <div class="vr"></div>
                                                            <div><i class="ri-map-pin-2-line align-bottom me-1"></i>
                                                                {data.location_id && data.location_id.length > 0 && data.location_id.map(l => <span key={l.value}>{l.label}</span>)}
                                                            </div>
                                                            <div class="vr"></div>
                                                            <div class="badge rounded-pill bg-success fs-12">{data.position_no}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-auto">
                                            <div class="hstack gap-1 flex-wrap mt-4 mt-md-0">
                                                <button type="button" class="btn btn-icon btn-sm btn-ghost-warning fs-16">
                                                    <i class="ri-star-fill"></i>
                                                </button>
                                                <button type="button" class="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i class="ri-share-line"></i>
                                                </button>
                                                <button type="button" class="btn btn-icon btn-sm btn-ghost-primary fs-16">
                                                    <i class="ri-flag-line"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-xxl-9">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="mb-3">Job Description</h5>
                                <div dangerouslySetInnerHTML={{__html: data.job_description}}></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xxl-3">
                        <div class="card">
                            <div class="card-header">
                                <h5 class="mb-0">Job Overview</h5>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive table-card">
                                    <table class="table mb-0">
                                        <tbody>
                                            <tr>
                                                <td class="fw-medium">Product</td>
                                                <td>{data.product && data.product.lable}</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Company Name</td>
                                                <td>{data.company && data.company.lable}</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Job Application</td>
                                                <td>{data.openings}</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">Salary</td>
                                                <td>{data.ctc_from} - {data.ctc_to}</td>
                                            </tr>
                                            <tr>
                                                <td class="fw-medium">State</td>
                                                <td>{data.state_name && data.state_name.lable}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="mt-4 pt-2 hstack gap-2">
                                    <a href="#!" class="btn btn-primary w-100">Apply Now</a>
                                    <a href="#!" class="btn btn-soft-danger btn-icon custom-toggle flex-shrink-0" data-bs-toggle="button">
                                        <span class="icon-on"><i class="ri-bookmark-line align-bottom"></i></span>
                                        <span class="icon-off"><i class="ri-bookmark-3-fill align-bottom"></i></span>
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