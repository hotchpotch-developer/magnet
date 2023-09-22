import { useEffect, useState } from "react";
import { CREATE_TEAM, EDIT_TEAM, TEAM_LIST } from "../../components/APIRoutes";
import Breadcrumbs from "../../components/Breadcrumbs";
import { loadingButton } from "../../components/Elements";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";

const CreateTeam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ employee_id: "", first_name: "", last_name: "", phone: "", email: "", role: "", password: "", status: "" });

    useEffect(() => {
        if (location && location.state && location.state.team) {
            let team = location.state.team;
            setFormData({
                id: team.id,
                roles_name: team.roles_name,
                employee_id: team.employee_id,
                first_name: team.first_name,
                last_name: team.last_name,
                phone: team.phone,
                email: team.email,
                role: team.role,
                status: team.status,
            })
        }
    }, [location])

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'team-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('team-form'));
            fetchData(formData.id ? EDIT_TEAM : CREATE_TEAM, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    if (formData.id) {
                        navigate('/team-list', { state: { role: formData.roles_name } });
                    } else {
                        initialFormState('team-form', setFormData)
                    }
                }
            })
        }
    }

    return (

        <>
            <Breadcrumbs title="Add Team" parentPage="Add Team" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Team Information</h4>
                        </div>
                        <div className="card-body">
                            <div className="live-preview">
                                <form className="needs-validation" noValidate id="team-form">
                                    <div className="row gy-4">
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="employee_id" className="form-label">Employee Id</label>
                                                <input type="text" className="form-control" id="employee_id" name="employee_id" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Employee Id.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="first_name" className="form-label">First Name</label>
                                                <input type="text" className="form-control" id="first_name" name="first_name" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter First Name.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="last_name" className="form-label">Last Name</label>
                                                <input type="text" className="form-control" id="last_name" name="last_name" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Last Name.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="phone" className="form-label">Phone</label>
                                                <input type="text" className="form-control" id="phone" name="phone" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Phone.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="email" className="form-label">Email</label>
                                                <input type="text" className="form-control" id="email" name="email" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Email.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="role" className="form-label">Role</label>
                                                <input type="text" className="form-control" id="role" name="role" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Role.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <input type="password" className="form-control" id="password" name="password" required={!formData.id} onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Password.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="team_status" className="form-label">Status</label>
                                                <input type="text" className="form-control" id="team_status" name="status" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Status.</div>
                                            </div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="profile_image" className="form-label">Profile Image</label>
                                                <input type="file" className="form-control" id="profile_image" name="profile_image" required onChange={handleInputChange} />
                                                <div className="invalid-feedback">Please Enter Status.</div>
                                            </div>
                                        </div>
                                    </div>
                                    {loading ? loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>Save</button>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default CreateTeam;