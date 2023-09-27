import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";

const AccountSetting = () => {


    const passwordAddedOn = () => {
        let element = document.querySelector('#password-input');
        element.setAttribute('type', element.type === 'password' ? 'text' : 'password');
    }

    return (
        <>
            <Breadcrumbs title="Account Settings" parentPage="Settings"  />
            <div className="row">
                <div className="col-xxl-12">
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
                                                    <input type="text"  className="form-control" id="phonenumberInput" placeholder="Enter your phone number" value="+(1) 987 6543" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="mb-3">
                                                    <label for="emailInput" className="form-label">Email Address</label>
                                                    <input type="email" readOnly className="form-control" id="emailInput" placeholder="Enter your email" value="daveadame@velzon.com" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="mb-3">
                                                    <label for="designationInput" className="form-label">Role</label>
                                                    <input type="text" readOnly className="form-control" id="designationInput" placeholder="Designation" value="Lead Designer / Developer" />
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
                                                    <label for="currentpasswordInput" className="form-label">Current Password*</label>
                                                    <input type="password" className="form-control" id="currentpasswordInput" placeholder="Enter current password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div>
                                                    <label for="newpasswordInput" className="form-label">New Password*</label>
                                                    <input type="password" className="form-control" id="newpasswordInput" placeholder="Enter new password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <label className="form-label" htmlFor="password-input">Confirm Password*</label>
                                                <div className="position-relative auth-pass-inputgroup mb-3">
                                                    <input type="password" name="password" className="form-control pe-5 password-input" placeholder="Enter confirm Password" id="password-input" required />
                                                    <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => passwordAddedOn()}><i className="ri-eye-fill align-middle"></i></button>
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

export default AccountSetting;