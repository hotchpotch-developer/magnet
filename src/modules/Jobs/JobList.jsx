import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs"
import JobFilter from "./Partials/JobFilter";
const JobList = () => {

    return (
        <>
            <Breadcrumbs title="Manage Jobs" parentPage="Post Job" />
            <div className="row">
                <JobFilter />
                <div className="col-xl-9 col-lg-8">
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
                                        <Link to=""><h5 className="job-title">Product Designer</h5></Link>
                                        <p className="company-name text-muted mb-0">Themesbrand</p>
                                    </div>                    
                                    <div>                        
                                        <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">
                                            <span className="icon-on"><i className="ri-bookmark-line"></i></span>
                                            <span className="icon-off"><i className="ri-bookmark-fill"></i></span>
                                        </button>
                                    </div>
                                </div> 
                                <p className="text-muted job-description">A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical products. If you're passionate about the latest technology trends and devices, you'll find great fulfillment in being involved in the design process for the next hot gadget.</p>
                                <div>
                                    <span className="badge bg-primary-subtle text-primary me-1">Design</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Remote</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">UI/UX Designer</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Designer</span>
                                </div>            
                            </div>            
                            <div className="card-footer border-top-dashed">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div>
                                        <i className="ri-briefcase-2-line align-bottom me-1"></i> 
                                        <span className="job-type">Full Time</span>
                                    </div>
                                    <div className="d-none">
                                        <span className="job-experience">1 - 2 Year</span>
                                    </div>
                                    <div>
                                        <i className="ri-map-pin-2-line align-bottom me-1"></i>  
                                        <span className="job-location">United Kingdom</span>
                                    </div>
                                    <div>
                                        <i className="ri-user-3-line align-bottom me-1"></i> 74 Applied
                                    </div> 
                                    <div>
                                        <i className="ri-time-line align-bottom me-1"></i> 
                                        <span className="job-postdate">15 Sep, 2022</span>
                                    </div>
                                    <div>
                                        <Link to="" className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
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
                                        <Link to=""><h5 className="job-title">Product Designer</h5></Link>
                                        <p className="company-name text-muted mb-0">Themesbrand</p>
                                    </div>                    
                                    <div>                        
                                        <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">
                                            <span className="icon-on"><i className="ri-bookmark-line"></i></span>
                                            <span className="icon-off"><i className="ri-bookmark-fill"></i></span>
                                        </button>
                                    </div>
                                </div> 
                                <p className="text-muted job-description">A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical products. If you're passionate about the latest technology trends and devices, you'll find great fulfillment in being involved in the design process for the next hot gadget.</p>
                                <div>
                                    <span className="badge bg-primary-subtle text-primary me-1">Design</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Remote</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">UI/UX Designer</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Designer</span>
                                </div>            
                            </div>            
                            <div className="card-footer border-top-dashed">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div>
                                        <i className="ri-briefcase-2-line align-bottom me-1"></i> 
                                        <span className="job-type">Full Time</span>
                                    </div>
                                    <div className="d-none">
                                        <span className="job-experience">1 - 2 Year</span>
                                    </div>
                                    <div>
                                        <i className="ri-map-pin-2-line align-bottom me-1"></i>  
                                        <span className="job-location">United Kingdom</span>
                                    </div>
                                    <div>
                                        <i className="ri-user-3-line align-bottom me-1"></i> 74 Applied
                                    </div> 
                                    <div>
                                        <i className="ri-time-line align-bottom me-1"></i> 
                                        <span className="job-postdate">15 Sep, 2022</span>
                                    </div>
                                    <div>
                                        <Link to="" className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
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
                                        <Link to=""><h5 className="job-title">Product Designer</h5></Link>
                                        <p className="company-name text-muted mb-0">Themesbrand</p>
                                    </div>                    
                                    <div>                        
                                        <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">
                                            <span className="icon-on"><i className="ri-bookmark-line"></i></span>
                                            <span className="icon-off"><i className="ri-bookmark-fill"></i></span>
                                        </button>
                                    </div>
                                </div> 
                                <p className="text-muted job-description">A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical products. If you're passionate about the latest technology trends and devices, you'll find great fulfillment in being involved in the design process for the next hot gadget.</p>
                                <div>
                                    <span className="badge bg-primary-subtle text-primary me-1">Design</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Remote</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">UI/UX Designer</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Designer</span>
                                </div>            
                            </div>            
                            <div className="card-footer border-top-dashed">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div>
                                        <i className="ri-briefcase-2-line align-bottom me-1"></i> 
                                        <span className="job-type">Full Time</span>
                                    </div>
                                    <div className="d-none">
                                        <span className="job-experience">1 - 2 Year</span>
                                    </div>
                                    <div>
                                        <i className="ri-map-pin-2-line align-bottom me-1"></i>  
                                        <span className="job-location">United Kingdom</span>
                                    </div>
                                    <div>
                                        <i className="ri-user-3-line align-bottom me-1"></i> 74 Applied
                                    </div> 
                                    <div>
                                        <i className="ri-time-line align-bottom me-1"></i> 
                                        <span className="job-postdate">15 Sep, 2022</span>
                                    </div>
                                    <div>
                                        <Link to="" className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
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
                                        <Link to=""><h5 className="job-title">Product Designer</h5></Link>
                                        <p className="company-name text-muted mb-0">Themesbrand</p>
                                    </div>                    
                                    <div>                        
                                        <button type="button" className="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">
                                            <span className="icon-on"><i className="ri-bookmark-line"></i></span>
                                            <span className="icon-off"><i className="ri-bookmark-fill"></i></span>
                                        </button>
                                    </div>
                                </div> 
                                <p className="text-muted job-description">A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical products. If you're passionate about the latest technology trends and devices, you'll find great fulfillment in being involved in the design process for the next hot gadget.</p>
                                <div>
                                    <span className="badge bg-primary-subtle text-primary me-1">Design</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Remote</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">UI/UX Designer</span>
                                    <span className="badge bg-primary-subtle text-primary me-1">Designer</span>
                                </div>            
                            </div>            
                            <div className="card-footer border-top-dashed">
                                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                    <div>
                                        <i className="ri-briefcase-2-line align-bottom me-1"></i> 
                                        <span className="job-type">Full Time</span>
                                    </div>
                                    <div className="d-none">
                                        <span className="job-experience">1 - 2 Year</span>
                                    </div>
                                    <div>
                                        <i className="ri-map-pin-2-line align-bottom me-1"></i>  
                                        <span className="job-location">United Kingdom</span>
                                    </div>
                                    <div>
                                        <i className="ri-user-3-line align-bottom me-1"></i> 74 Applied
                                    </div> 
                                    <div>
                                        <i className="ri-time-line align-bottom me-1"></i> 
                                        <span className="job-postdate">15 Sep, 2022</span>
                                    </div>
                                    <div>
                                        <Link to="" className="btn btn-primary viewjob-list">View More <i className="ri-arrow-right-line align-bottom ms-1"></i></Link>
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default JobList;