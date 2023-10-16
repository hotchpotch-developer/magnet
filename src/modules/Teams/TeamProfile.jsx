import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const TeamProfile = () => {
    return (
        <>
            <Breadcrumbs title="Team Profile" parentPage="Teams"  />
            <div className="row">
                <div className="col-xxl-3">
                    <div className="card card-bg-fill">
                        <div className="card-body p-4">
                            <div className="text-center">
                                <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                    <img src="/images/users/avatar-1.jpg" className="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile" />
                                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                                        <input id="profile-img-file-input" type="file" className="profile-img-file-input" />
                                        <label for="profile-img-file-input" className="profile-photo-edit avatar-xs">
                                            <span className="avatar-title rounded-circle bg-light text-body">
                                                <i className="ri-camera-fill"></i>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <h5 className="fs-16 mb-1">Anna Adame</h5>
                                <p className="text-muted mb-0">Lead Designer / Developer</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-5">
                                <div className="flex-grow-1">
                                    <h5 className="card-title mb-0">Complete Your Profile</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="#" className="badge bg-light text-primary fs-12"><i className="ri-edit-box-line align-bottom me-1"></i> Edit</Link>
                                </div>
                            </div>
                            <div className="progress animated-progress custom-progress progress-label">
                                <div className="progress-bar bg-danger" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
                                    <div className="label">30%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex align-items-center mb-4">
                                <div className="flex-grow-1">
                                    <h5 className="card-title mb-0">Portfolio</h5>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="#" className="badge bg-light text-primary fs-12"><i className="ri-add-fill align-bottom me-1"></i> Add</Link>
                                </div>
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-body text-body">
                                        <i className="ri-github-fill"></i>
                                    </span>
                                </div>
                                <input type="email" className="form-control" id="gitUsername" placeholder="Username" value="@daveadame" />
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-primary">
                                        <i className="ri-global-fill"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="websiteInput" placeholder="www.example.com" value="www.velzon.com" />
                            </div>
                            <div className="mb-3 d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-success">
                                        <i className="ri-dribbble-fill"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="dribbleName" placeholder="Username" value="@dave_adame" />
                            </div>
                            <div className="d-flex">
                                <div className="avatar-xs d-block flex-shrink-0 me-3">
                                    <span className="avatar-title rounded-circle fs-16 bg-danger">
                                        <i className="ri-pinterest-fill"></i>
                                    </span>
                                </div>
                                <input type="text" className="form-control" id="pinterestName" placeholder="Username" value="Advance Dave" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-9">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link active" data-bs-toggle="tab" to="#personalDetails" role="tab">
                                        <i className="fas fa-home"></i> Personal Details
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" data-bs-toggle="tab" to="#changePassword" role="tab">
                                        <i className="far fa-user"></i> Change Password
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body p-4">
                            <div className="tab-content">
                                <div className="tab-pane active" id="personalDetails" role="tabpanel">
                                    <form action="#">
                                        <div className="row">
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="firstnameInput" className="form-label">First Name</label>
                                                    <input type="text" className="form-control" id="firstnameInput" placeholder="Enter your firstname" value="Dave" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="lastnameInput" className="form-label">Last Name</label>
                                                    <input type="text" className="form-control" id="lastnameInput" placeholder="Enter your lastname" value="Adame" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="phonenumberInput" className="form-label">Phone Number</label>
                                                    <input type="text" className="form-control" id="phonenumberInput" placeholder="Enter your phone number" value="+(1) 987 6543" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="emailInput" className="form-label">Email Address</label>
                                                    <input type="email" className="form-control" id="emailInput" placeholder="Enter your email" value="daveadame@velzon.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label for="JoiningdatInput" className="form-label">Joining Date</label>
                                                    <input type="text" className="form-control" data-provider="flatpickr" id="JoiningdatInput" data-date-format="d M, Y" data-deafult-date="24 Nov, 2021" placeholder="Select date" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label for="designationInput" className="form-label">Role</label>
                                                    <input type="text" className="form-control" id="designationInput" placeholder="Designation" value="Lead Designer / Developer" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="hstack gap-2 justify-content-end">
                                                    <button type="submit" className="btn btn-primary">Updates</button>
                                                    <button type="button" className="btn btn-soft-danger">Cancel</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="tab-pane" id="changePassword" role="tabpanel">
                                    <form action="#">
                                        <div className="row g-2">
                                            <div className="col-lg-4">
                                                <div>
                                                    <label for="oldpasswordInput" className="form-label">Old Password*</label>
                                                    <input type="password" className="form-control" id="oldpasswordInput" placeholder="Enter current password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                    <label for="newpasswordInput" className="form-label">New Password*</label>
                                                    <input type="password" className="form-control" id="newpasswordInput" placeholder="Enter new password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                    <label for="confirmpasswordInput" className="form-label">Confirm Password*</label>
                                                    <input type="password" className="form-control" id="confirmpasswordInput" placeholder="Confirm password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12 mt-4">
                                                <div className="text-end">
                                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}

export default TeamProfile;