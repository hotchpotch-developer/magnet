import { useEffect, useState } from "react";
import { COMMON_DROPDOWN, CREATE_TEAM, EDIT_TEAM } from "../../components/APIRoutes";
import Breadcrumbs from "../../components/Breadcrumbs";
import { loadingButton } from "../../components/Elements";
import { useLocation, useNavigate } from "react-router-dom";
import { copyText, fetchData, generateText, initialFormState, validateForm } from "../../components/Helper";
import { InputField, SelectField } from "../../components/FormHelper";
import * as Elements from "../../components/Elements";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Popover } from "bootstrap";

const CreateTeam = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([])
    const [reportingUsers, setReportingUsers] = useState([])
    const [role, setRole] = useState(null)
    const [reportingUser, setReportingUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState("")
    const [formData, setFormData] = useState({ employee_id: "", reporting_user_id: "", name: "", phone: "", alternet_phone: "", email: "", alternet_email: "", role: "", password: "", status: "", status_reason: "" });

    useEffect(() => {
        fetchData(COMMON_DROPDOWN + '?type=roles', 'GET', '', true, false, (res) => {
            if (res.status) {
                setRoles(res.data)
                if (location && location.state && location.state.team) {
                    let role = res.data.filter((item) => item.value === location.state.team.roles_id)
                    setRole(role[0] ?? null)
                } else {
                    setRole(null)
                }
            }
        })

        fetchData(COMMON_DROPDOWN + '?type=reporting_user', 'GET', '', true, false, (res) => {
            if (res.status) {
                setReportingUsers(res.data)
                if (location && location.state && location.state.team) {
                    let reporting_user = res.data.filter((item) => item.value === location.state.team.reporting_user_id)
                    setReportingUser(reporting_user[0] ?? null)
                } else {
                    setReportingUser(null)
                }
            }
        })

        Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode));
    }, [location])


    useEffect(() => {
        if (location && location.state && location.state.team) {
            let team = location.state.team;
            setFormData({
                id: team.id,
                roles_name: team.roles_name,
                employee_id: team.emp_id,
                name: team.name,
                phone: team.phone,
                alternet_phone: team.phone_1 ?? '',
                email: team.email,
                alternet_email: team.email_1 ?? '',
                role: team.role_id,
                reporting_user_id: team.reporting_user_id,
                status: team.status,
                status_reason: team.status_reason
            })
            setAdditionalInfo(team.additional_information ?? '')
        } else {
            setAdditionalInfo("")
            setFormData({ employee_id: "", reporting_user_id: "", name: "", phone: "", alternet_phone: "", email: "", alternet_email: "", role: "", password: "", status: "", status_reason: "" });
            initialFormState("team-form");
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
            formdata.append('additional_information', additionalInfo);
            fetchData(formData.id ? EDIT_TEAM : CREATE_TEAM, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/team-list');
                }
            })
        }
    }

    return (

        <>
            <Breadcrumbs title={`${formData.id ? 'Edit' : 'Add'}  Team Member`} parentPage="Teams" />
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
                                        {formData.id && <InputField name="employee_id" value={formData.employee_id} disabled />}
                                        <InputField name="name" value={formData.name} required onChange={handleInputChange} />
                                        <InputField label="Primary Phone No." name="phone" error="Please enter a valid phone number" pattern="[6789][0-9]{9}" value={formData.phone} required onChange={handleInputChange} />
                                        <InputField label="Alternate Phone No." error="Please enter a valid phone number" pattern="[6789][0-9]{9}" name="alternet_phone" value={formData.alternet_phone} onChange={handleInputChange} />
                                        <InputField label="Primary E-Mail" name="email" value={formData.email} disabled={formData.id ? true : false} required onChange={handleInputChange} />
                                        <InputField label="Alternate E-Mail" name="alternet_email" value={formData.alternet_email} onChange={handleInputChange} />
                                        <div className="col-xxl-3 col-md-6">
                                            <label htmlFor="employee_id" className="form-label">Role</label>
                                            <Elements.ReactSelect
                                                placeholder="Select Role"
                                                options={roles}
                                                name="role"
                                                value={role}
                                                id="role"
                                                className="react-select required"
                                                onChange={(e) => { Elements.reactSelectValidation(e, "role"); setRole(e) }}
                                                required={true}
                                            />
                                            <div className="invalid-feedback">Please Enter Role.</div>
                                        </div>
                                        <div className="col-xxl-3 col-md-6">
                                            <label htmlFor="reporting_user_id" className="form-label">Reporting Manager</label>
                                            <Elements.ReactSelect
                                                placeholder="Select Team Member"
                                                options={reportingUsers}
                                                name="reporting_user_id"
                                                value={reportingUser}
                                                id="reporting_user_id"
                                                className="react-select required"
                                                onChange={(e) => { Elements.reactSelectValidation(e, "role"); setReportingUser(e) }}
                                                required={!(role && role.label === 'Admin')}
                                            />
                                            <div className="invalid-feedback">Please select Team Member.</div>
                                        </div>
                                        {formData.status &&
                                            <SelectField name="Status">
                                                <select name="status" className="form-select" value={formData.status} required onChange={handleInputChange}>
                                                    <option value="">Select Status</option>
                                                    <option value="active">Active</option>
                                                    <option value="inactive">In Active</option>
                                                </select>
                                            </SelectField>
                                        }
                                        {formData.status === "inactive" && 
                                            <InputField label="Inactive Reason" name="status_reason" value={formData.status_reason} />
                                        }
                                        <InputField label="Photo Upload" type="file" name="profile_image" />
                                        <InputField type="file" name="proof_document" label="Aadhar/Pan Upload" />
                                        <InputField type="file" name="resume" label="Resume" />
                                        <div className="col-xxl-3 col-md-6">
                                            <div>
                                                <label htmlFor="password" className="form-label">Password</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" id="password" name="password" required={!formData.id} onChange={handleInputChange} />
                                                    <span className="input-group-text" role="button" title="Copy Password" onClick={() => copyText('password')}><i className=" ri-file-copy-line"></i></span>
                                                    <span className="input-group-text" role="button" title="Generate Password" onClick={() => document.getElementById('password').value = generateText(16, false, true)}><i className="ri-refresh-line"></i></span>
                                                    <div className="invalid-feedback">Please Enter Password.</div>

                                                </div>
                                                <div className="text-muted">
                                                    <span className="text-muted ms-1 ri-information-line"  data-bs-content="Create a strong password with a combination of uppercase and lowercase letters, numbers, and symbols for enhanced security. Aim for at least 8 characters, and avoid easily guessable information." data-bs-toggle="popover" data-bs-trigger="focus hover"
                                                    data-bs-template={`<div class='popover shadow' role='popover'><div class='popover-arrow'></div><div class='popover-inner p-2 '>Create a strong password with a combination of uppercase and lowercase letters, numbers, and symbols for enhanced security. Aim for at least 8 characters, and avoid easily guessable information.</div></div>`}
                                                    >Password information</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <label htmlFor="password" className="form-label">Additional Information</label>
                                            <CKEditor editor={ClassicEditor} data={additionalInfo} onChange={(event, editor) => setAdditionalInfo(editor.getData())} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 mt-4">
                                        <div className="text-end">
                                            {loading ? loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
                                        </div>
                                    </div>
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