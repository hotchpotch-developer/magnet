import { Link } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import ChangePassword from "./Partials/ChangePassword";
import PersonalDetails from "./Partials/PersonalDetails";
import { useState } from "react";

const AccountSetting = () => {
    const [activeTab, setActiveTab] = useState("personalDetails");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (
        <>
            <Breadcrumbs title="Account Settings" parentPage="Settings" />
            <div className="row">
                <div className="col-xxl-12">
                    <div className="card">
                        <div className="card-header">
                            <ul className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                                <li className="nav-item">
                                    <Link className="nav-link active" data-bs-toggle="tab" to="#personalDetails" role="tab" onClick={() => handleTabChange('personalDetails')}>
                                        <i className="fas fa-home"></i> Personal Details
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" data-bs-toggle="tab" to="#changePassword" role="tab" onClick={() => handleTabChange('changePassword')}>
                                        <i className="far fa-user"></i> Change Password
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body p-4">
                            <div className="tab-content">
                                <div className="tab-pane active" id="personalDetails" role="tabpanel">
                                    <PersonalDetails activeTab={activeTab} />
                                </div>
                                <div className="tab-pane" id="changePassword" role="tabpanel">
                                    <ChangePassword activeTab={activeTab} />
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