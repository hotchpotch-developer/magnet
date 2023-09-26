import { useEffect, useState } from "react";
import { CREATE_TEAM, EDIT_TEAM, ROLE_SELECT } from "../../components/APIRoutes";
import Breadcrumbs from "../../components/Breadcrumbs";
import { loadingButton } from "../../components/Elements";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";
import { InputField, SelectField } from "../../components/FormHelper";

const CreateTeam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([])
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({ employee_id: "", first_name: "", last_name: "", phone: "", email: "", role: "", password: "", status: "" });

    useEffect(() => {
        fetchData(ROLE_SELECT, 'GET', '', true, false, (res) => {
            if (res.status) {
                setRoles(res.data)
            }
        })
    }, [])


    useEffect(() => {
        if (location && location.state && location.state.team) {
            let team = location.state.team;
            setFormData({
                id: team.id,
                roles_name: team.roles_name,
                employee_id: team.emp_id,
                first_name: team.first_name,
                last_name: team.last_name,
                phone: team.phone,
                email: team.email,
                role: team.role_id,
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
            formdata.append('id', formData.id);
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
                                        <InputField name="employee_id" value={formData.employee_id} required onChange={handleInputChange} />
                                        <InputField name="first_name" value={formData.first_name} required onChange={handleInputChange} />
                                        <InputField name="last_name" value={formData.last_name} required onChange={handleInputChange} />
                                        <InputField name="phone" value={formData.phone} required onChange={handleInputChange} />
                                        <InputField name="email" value={formData.email} required onChange={handleInputChange} />
                                        <InputField name="role" value={formData.role} required onChange={handleInputChange} />
                                        <SelectField name="Status">
                                            <select name="status" className="form-select" value={formData.role} required onChange={handleInputChange}>
                                                {roles.map((role, key) => {
                                                    return <option key={key} value={role.id}>{role.name}</option>
                                                })}
                                            </select>
                                        </SelectField>
                                        <InputField name="password" required={!formData.id} onChange={handleInputChange} />
                                        <SelectField name="Status">
                                            <select name="status" className="form-select" value={formData.status} required onChange={handleInputChange}>
                                                <option value="active">Active</option>
                                                <option value="inactive">In Active</option>
                                            </select>
                                        </SelectField>
                                        <InputField type="file" name="profile_image" />
                                    </div>
                                    {loading ? loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
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