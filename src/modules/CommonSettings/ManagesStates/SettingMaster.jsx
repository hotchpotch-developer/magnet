import { useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import Department from "../Partials/Department";
import Industry from "../Partials/Industry";
import Source from "../Partials/Source";
import Remark from "../Partials/Remark";
import Location from "../Partials/Location";

const SettingMaster = () => {
    const [activeTab, setActiveTab] = useState("department");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }

    return (

        <>
            <Breadcrumbs title="Common Setting" parentPage="Common Setting" />

            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">

                            <ul className="nav nav-pills animation-nav nav-justified gap-2 mb-3 pb-3 border-bottom" role="tablist">
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link active" data-bs-toggle="tab" href="#department-home" role="tab" onClick={() => handleTabChange('department')}>
                                        Department
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" data-bs-toggle="tab" href="#industry-home" role="tab" onClick={() => handleTabChange('industry')}>
                                        Industry
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" data-bs-toggle="tab" href="#location-home" role="tab" onClick={() => handleTabChange('location')}>
                                        Location
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" data-bs-toggle="tab" href="#remark-home" role="tab" onClick={() => handleTabChange('remark')}>
                                        Remark
                                    </a>
                                </li>
                                <li className="nav-item waves-effect waves-light">
                                    <a className="nav-link" data-bs-toggle="tab" href="#source-home" role="tab" onClick={() => handleTabChange('source')}>
                                        Source
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content text-muted">
                                <div className="tab-pane active" id="department-home" role="tabpanel">
                                    <Department activeTab={activeTab} />
                                </div>
                                <div className="tab-pane" id="industry-home" role="tabpanel">
                                    <Industry activeTab={activeTab} />
                                </div>
                                <div className="tab-pane" id="location-home" role="tabpanel">
                                    <Location activeTab={activeTab} />
                                </div>
                                <div className="tab-pane" id="remark-home" role="tabpanel">
                                    <Remark activeTab={activeTab} />
                                </div>
                                <div className="tab-pane" id="source-home" role="tabpanel">
                                    <Source activeTab={activeTab} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default SettingMaster;