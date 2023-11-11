import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import { COMMON_DROPDOWN, CREATE_CANDIDATE, DELETE_CANDIDATE, EDIT_CANDIDATE } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import _, { lowerCase, startCase } from 'lodash';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddCandidate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const commonDropdown = [
        { key: "state", value: "state" },
        { key: "location", value: "location" },
        { key: "industry", value: "industry" },
        { key: "company", value: "company" },
        { key: "sales_non_sales", value: "sales_no_sales" },
        { key: "department", value: "department" },
        { key: "channel", value: "channel" },
        { key: "level", value: "level" },
        { key: "qualification", value: "qualification" },
    ];

    const [dropDownData, setDropDownData] = useState({
        date_of_birth: [],
        state: [],
        location: [],
        industry: [],
        company: [],
        sales_non_sales: [],
        department: [],
        channel: [],
        level: [],
        experience: [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' },
            { value: '5', label: '5' },
        ],
        qualification: [],
        gender: [
            { value: 'male', label: 'Male' },
            { value: 'female', label: 'Female' },
        ],
        resume_status: [
            { value: 'available', label: 'Available' },
            { value: 'attached', label: 'attached' },
        ],
        status: [
            { value: 'open', label: 'Open' },
            { value: 'close', label: 'Close' },
        ],
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        gender: null,
        date_of_birth: null,
        state: null,
        location: null,
        industry: null,
        company: null,
        sales_non_sales: null,
        department: null,
        channel: null,
        level: null,
        experience: null,
        high_qualification: null,
        resume_status: null,
        status: null,
    })

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        mobile: '',
        alternate_mobile: '',
        email: '',
        alternate_email: '',
        current_ctc: '',
        pan_no: '',
        designation: '',
        employment_status: '',
        experience: '',
    })

    useEffect(() => {
        if (location && location.state && location.state) {
            let candidate = location.state;
            console.log(candidate);
            setFormData({
                id: candidate.id,
                first_name: candidate.first_name,
                last_name: candidate.last_name,
                mobile: candidate.mobile,
                alternate_mobile: candidate.alternate_mobile,
                email: candidate.email,
                alternate_email: candidate.alternate_email,
                current_ctc: candidate.current_ctc,
                pan_no: candidate.pan_no,
                designation: candidate.designation,
                employment_status: candidate.employment_status,
                experience: candidate.experience,
            })
        } else {
            setFormData({
                first_name: '',
                last_name: '',
                mobile: '',
                alternate_mobile: '',
                email: '',
                alternate_email: '',
                current_ctc: '',
                pan_no: '',
                designation: '',
                employment_status: '',
                experience: '',
            });
            initialFormState("candidate-form");
        }
    }, [location])

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                    if (location && location.state) {
                        let candidate = location.state;
                        setSelectedDropDownData({
                            date_of_birth: candidate.dob ? new Date(candidate.dob) : null,
                            state: candidate.state_name ?? null,
                            location: candidate.location ?? null,
                            industry: candidate.industry ?? null,
                            company: candidate.company ?? null,
                            sales_non_sales: candidate.sales_non ?? null,
                            department: candidate.department ?? null,
                            channel: candidate.channel ?? null,
                            level: candidate.level ?? null,
                            experience: candidate.experience ? { value: candidate.experience, label: candidate.experience } : null,
                            high_qualification: candidate.qualification ?? null,
                            resume_status: candidate.resume_status ? { value: candidate.resume_status, label: startCase(candidate.resume_status) } : null,
                            gender: candidate.gender ? { value: lowerCase(candidate.gender), label: startCase(candidate.gender) } : null,
                            status: candidate.status ? { value: lowerCase(candidate.status), label: startCase(candidate.status) } : null,
                        })
                    } else {
                        setSelectedDropDownData({
                            gender: null,
                            date_of_birth: null,
                            state: null,
                            location: null,
                            industry: null,
                            company: null,
                            sales_non_sales: null,
                            department: null,
                            channel: null,
                            level: null,
                            experience: null,
                            high_qualification: null,
                            resume_status: null,
                        })
                    }
                }
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const handleInputChange = (e, key = false) => {
        if (key) {
            Elements.reactSelectValidation(e, key === 'status' ? 'candidate_status' : key, key === 'location' ? true : false)
            setSelectedDropDownData(prev => ({ ...prev, [key]: e }));
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm(e, 'candidate-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('candidate-form'));
            formdata.append('id', formData.id);
            fetchData(formData.id ? EDIT_CANDIDATE : CREATE_CANDIDATE, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/candidates-list');
                }
            })
        }
    }

    const deleteCandidate = () => {
        fetchData(`${DELETE_CANDIDATE}/${location.state.id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                document.querySelector('#candidateConfirmationModal [data-bs-dismiss="modal"]').click()
                navigate('/candidates-list');
            }
        })
    }

    return (
        <>
            <Breadcrumbs title={`${formData.id ? "Update" : "Add"} Candidate`} parentPage="Post Candidate" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <form className="needs-validation" noValidate id="candidate-form">
                            <div className="card-header">
                                <h5 className="card-title mb-0">{`${formData.id ? "Update" : "Create"} Candidate`}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    <InputField name="first_name" pattern="[a-zA-Z]+" value={formData.first_name} required onChange={handleInputChange} error="Please enter a only first name"  />
                                    <InputField name="last_name" value={formData.last_name} required onChange={handleInputChange} />
                                    <InputField name="mobile" label="Primary Mobile" value={formData.mobile} required onChange={handleInputChange} error="Please enter a valid phone number" pattern="[6789][0-9]{9}" />
                                    <InputField name="alternate_mobile" value={formData.alternate_mobile} onChange={handleInputChange} error="Please enter a valid phone number" pattern="[6789][0-9]{9}" />
                                    <InputField name="current_ctc" value={formData.current_ctc} required onChange={handleInputChange} />
                                    <InputField name="email" value={formData.email} required onChange={handleInputChange} />
                                    <InputField name="alternate_email" value={formData.alternate_email} onChange={handleInputChange} />
                                    <InputField name="pan_no" value={formData.pan_no} required onChange={handleInputChange} />
                                    <InputField name="designation" value={formData.designation} required onChange={handleInputChange} />
                                    <InputField name="employment_status" value={formData.employment_status} required onChange={handleInputChange} />
                                    <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                                        <div>
                                            <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                            <DatePicker required className='form-control' name="date_of_birth" id="date_of_birth" selected={selectedDropDownData.date_of_birth} onChange={(date) => setSelectedDropDownData(prev => ({ ...prev, date_of_birth: date }))} />
                                        </div>
                                    </div>
                                    <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'state')} />
                                    <ReactSelectField name="location" id="location" isMulti value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'location')} />
                                    <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => handleInputChange(e, 'industry')} />
                                    <ReactSelectField name="company" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => handleInputChange(e, 'company')} />
                                    <ReactSelectField name="sales_non_sales" label="Sales/Non Sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, 'sales_non_sales')} />
                                    <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => handleInputChange(e, 'department')} />
                                    <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => handleInputChange(e, 'channel')} />
                                    <ReactSelectField name="level" value={selectedDropDownData.level} options={dropDownData.level} onChange={(e) => handleInputChange(e, 'level')} />
                                    <ReactSelectField name="high_qualification" value={selectedDropDownData.high_qualification} options={dropDownData.qualification} onChange={(e) => handleInputChange(e, 'high_qualification')} />
                                    <ReactSelectField name="gender" value={selectedDropDownData.gender} options={dropDownData.gender} onChange={(e) => handleInputChange(e, 'gender')} />
                                    <ReactSelectField name="experience" value={selectedDropDownData.experience} options={dropDownData.experience} onChange={(e) => handleInputChange(e, 'experience')} />
                                    <ReactSelectField name="resume_status" value={selectedDropDownData.resume_status} options={dropDownData.resume_status} onChange={(e) => handleInputChange(e, 'resume_status')} />
                                    <ReactSelectField name="status" id="candidate_status" value={selectedDropDownData.status} options={dropDownData.status} onChange={(e) => handleInputChange(e, 'status')} />
                                    <InputField type="file" name="resume_file" />
                                    <div className="col-lg-12">
                                        <div className="hstack justify-content-end gap-2">
                                            {location && location.state && location.state.id && <button type="button" className="btn btn-soft-danger mt-3" data-bs-target="#candidateConfirmationModal" data-bs-toggle="modal" title="Delete Candidate">Permanently Delete</button>}
                                            {loading ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Elements.ConfirmationModal modalId="candidateConfirmationModal" action={deleteCandidate} />
        </>
    )

}

export default AddCandidate;


const ReactSelectField = (props) => {

    return (<>
        <div className="col-xxl-3 col-md-6">
            <label htmlFor={props.label ?? (props.id ?? props.name)} className="form-label">{props.label ?? _.startCase(props.name)}</label>
            <Elements.ReactSelect
                placeholder={`Select ${props.label ?? _.startCase(props.name)}`}
                name={props.name}
                id={props.id ?? props.name}
                className="react-select required"
                required={true}
                {...props}
            />
            <div className="invalid-feedback">{props.error ?? `Please Enter ${_.startCase(props.name)}.`}</div>
        </div>
    </>)
}