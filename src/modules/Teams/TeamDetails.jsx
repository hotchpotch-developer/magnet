import { useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useEffect, useState } from "react";

const TeamDetails = () => {
    const ASSET_URL = process.env.REACT_APP_ASSET_URL
    const location = useLocation();
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(location.state)
    }, [location])

    console.log(data);
    return (
        <>
            <Breadcrumbs title="Team Profile" parentPage="Teams" />
            <div className="row">
                <div className="col-xxl-3">
                    <div className="card card-bg-fill">
                        <div className="card-body p-4">
                            {data && data.id && <>
                                <div className="text-center">
                                    <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                                        <img src={ASSET_URL + data.profile_image} className="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile" />
                                    </div>
                                    <h5 className="fs-16 mb-1">{data.first_name} {data.last_name}</h5>
                                    <p className="text-muted mb-0">{data.roles_name}</p>
                                </div>
                            </>}
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <div className="table-responsive table-card">
                                <table className="table mb-0">
                                    {data && data.id && <>
                                        <tbody>
                                            <tr>
                                                <td className="fw-medium">Employee Id</td>
                                                <td>{data.emp_id}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">First Name</td>
                                                <td>{data.first_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Last Name</td>
                                                <td>{data.last_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Phone</td>
                                                <td>{data.phone}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Alternate Phone</td>
                                                <td>{data.phone_1}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Email</td>
                                                <td>{data.email}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Alternate Email</td>
                                                <td>{data.email_1}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Role</td>
                                                <td>{data.roles_name}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Reporting User</td>
                                                <td>
                                                    {data.reporting_user_name && <>
                                                        {data.reporting_user_name.first_name} {data.reporting_user_name.last_name}
                                                    </>}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Status</td>
                                                <td>{data.status}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Aadhar/Pan</td>
                                                <td>{data.proof_document && <a href={ASSET_URL + data.proof_document} target="_blanks" className="btn btn-sm btn-soft-success"><i className="ri-file-line fs-5"></i></a>}</td>
                                            </tr>
                                            <tr>
                                                <td className="fw-medium">Additional Information</td>
                                                <td><div className="col-sm-9" dangerouslySetInnerHTML={{ __html: data.additional_information }}></div></td>
                                            </tr>
                                        </tbody>
                                    </>}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TeamDetails;