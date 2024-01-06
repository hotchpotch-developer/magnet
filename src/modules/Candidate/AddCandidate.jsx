import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import { COMMON_DROPDOWN, CREATE_CANDIDATE, DELETE_CANDIDATE, EDIT_CANDIDATE } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import _, { lowerCase, startCase } from 'lodash';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AddExperience from './Partials/AddExperience';

const AddCandidate = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [loading1, setLoading1] = useState(false)
    const [additionalInfo, setAdditionalInfo] = useState("")
    const [addExperienceOne, setAddExperienceOne] = useState(false)
    const [addExperienceTwo, setAddExperienceTwo] = useState(false)

    const commonDropdown = [
        { key: "state", value: "state" },
        { key: "location", value: "location" },
        { key: "industry", value: "industry" },
        { key: "company", value: "company" },
        { key: "sales_non_sales", value: "sales_no_sales" },
        { key: "department", value: "department" },
        { key: "channel", value: "channel" },
        { key: "level", value: "level" },
        { key: "product", value: "product" },
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
            { value: '0', label: '0' },
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
        employment_status: [
            { value: 'working', label: 'Working' },
            { value: 'not-working', label: 'Not Working' },
        ]
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        gender: null,
        date_of_birth: null,
        industry: null,
        company: null,
        sales_non_sales: null,
        department: null,
        channel: null,
        level: null,
        experience: null,
        high_qualification: null,
        resume_status: null,
        current_state: null,
        current_location: null,
        preferred_state: null,
        preferred_location: null,
        status: null,
        employment_status: null
    })

    const [formData, setFormData] = useState({
        name: '',
        primary_mobile_no: '',
        alternate_mobile: '',
        primary_email: '',
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
            setFormData({
                id: candidate.id,
                candidate_id: candidate.candidate_id,
                name: candidate.name,
                primary_mobile_no: candidate.primary_phone,
                alternate_mobile: candidate.alternate_mobile,
                primary_email: candidate.primary_email,
                alternate_email: candidate.alternate_email,
                current_ctc: candidate.current_ctc,
                pan_no: candidate.pan_no,
                designation: candidate.designation,
                employment_status: (candidate.status === 'working' ? { value: 'working', label: 'Working' } : { value: 'not-working', label: 'Not Working' }),
                experience: candidate.experience,
                last_updated: candidate.last_updated
            })
            if (candidate && candidate.candidate_experience) {
                setAddExperienceOne(location.state.candidate_experience[0] ? true : false)
                setAddExperienceTwo(location.state.candidate_experience[1] ? true : false)
            }
            setAdditionalInfo(candidate.additional_information ?? "")
        } else {
            setFormData({
                name: '',
                primary_mobile_no: '',
                alternate_mobile: '',
                primary_email: '',
                alternate_email: '',
                current_ctc: '',
                pan_no: '',
                designation: '',
                employment_status: '',
                experience: '',
            });
            setAdditionalInfo("")
            setAddExperienceOne(false)
            setAddExperienceTwo(false)
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
                            high_qualification: candidate.high_qualification_id ?? null,
                            resume_status: candidate.resume_status ? { value: candidate.resume_status, label: startCase(candidate.resume_status) } : null,
                            gender: candidate.gender ? { value: lowerCase(candidate.gender), label: startCase(candidate.gender) } : null,
                            status: candidate.status ? { value: lowerCase(candidate.status), label: startCase(candidate.status) } : null,
                            current_state: candidate.current_state ?? null,
                            current_location: candidate.current_location ?? null,
                            preferred_state: candidate.preferred_state ?? null,
                            preferred_location: candidate.preferred_location ?? null,
                            employment_status: candidate.status === 'working' ? { value: 'working', label: 'Working' } : { value: 'not-working', label: 'Not Working' },
                        })
                    } else {
                        setSelectedDropDownData({
                            gender: null,
                            date_of_birth: null,
                            industry: null,
                            company: null,
                            sales_non_sales: null,
                            department: null,
                            channel: null,
                            level: null,
                            experience: null,
                            high_qualification: null,
                            resume_status: null,
                            current_state: null,
                            current_location: null,
                            preferred_state: null,
                            preferred_location: null,
                            status: null,
                            employment_status: null
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

    const submitForm = (e, popup = false) => {
        e.preventDefault()
        if (document.getElementById(`current_ctc_0`)) document.getElementById(`current_ctc_0`).setAttribute('required', 'true')
        if (document.getElementById(`current_ctc_1`)) document.getElementById(`current_ctc_1`).setAttribute('required', 'true')
        if (document.getElementById(`designation_0`)) document.getElementById(`designation_0`).setAttribute('required', 'true')
        if (document.getElementById(`designation_1`)) document.getElementById(`designation_1`).setAttribute('required', 'true')

        if (validateForm(e, 'candidate-form')) {
            if (popup) setLoading1(true)
            else setLoading(true)
            let formdata = new FormData(document.getElementById('candidate-form'));
            formdata.append('id', formData.id);

            fetchData(formData.id ? EDIT_CANDIDATE : CREATE_CANDIDATE, 'POST', formdata, true, true, (res) => {
                if (popup) setLoading1(false)
                else setLoading(false)
                if (res.status) {
                    if (popup) {
                        document.querySelector('#vacancyModalOpenBtn').click()
                    } else {
                        navigate('/candidates-list');
                    }
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
                    <form className="needs-validation" noValidate id="candidate-form">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Document</h5>
                                <div className="row g-4">
                                    {formData.candidate_id &&
                                        <InputField label="Candidate ID" value={formData.candidate_id} readOnly />
                                    }
                                    <InputField name="pan_no" label="PAN No." value={formData.pan_no} required onChange={handleInputChange} className="form-control text-uppercase" />
                                    <ReactSelectField name="employment_status" value={selectedDropDownData.employment_status} options={dropDownData.employment_status} onChange={(e) => handleInputChange(e, 'employment_status')} />
                                    {formData.last_updated &&
                                        <InputField label="Last Updated" value={formData.last_updated} readOnly />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Personal Information</h5>
                                <div className="row g-4">
                                    <InputField name="name" value={formData.name} required onChange={handleInputChange} error="Please enter name." className="form-control text-uppercase" />
                                    <div className="col-xxl-3 col-xl-6 col-lg-6 col-md-6">
                                        <div>
                                            <label htmlFor="date_of_birth" className="form-label">Date of Birth</label>
                                            <DatePicker required className='form-control' name="date_of_birth" id="date_of_birth" selected={selectedDropDownData.date_of_birth} onChange={(date) => setSelectedDropDownData(prev => ({ ...prev, date_of_birth: date }))} showMonthDropdown showYearDropdown dropdownMode="select" />
                                        </div>
                                    </div>
                                    <ReactSelectField name="gender" value={selectedDropDownData.gender} options={dropDownData.gender} onChange={(e) => handleInputChange(e, 'gender')} />
                                    <ReactSelectField name="high_qualification" label="Highest Qualification" value={selectedDropDownData.high_qualification} options={dropDownData.qualification} onChange={(e) => handleInputChange(e, 'high_qualification')} />
                                    <InputField name="primary_mobile_no" label="Primary Mobile No." value={formData.primary_mobile_no} required onChange={handleInputChange} error="Please enter a valid primary mobile number" pattern="[6789][0-9]{9}" />
                                    <InputField name="alternate_mobile" label="Alternate Mobile No." value={formData.alternate_mobile} onChange={handleInputChange} error="Please enter a valid alternate mobile number" pattern="[6789][0-9]{9}" />
                                    <InputField name="primary_email" label="Primary E-Mail" value={formData.primary_email} required onChange={handleInputChange} />
                                    <InputField name="alternate_email" label="Alternate E-Mail" value={formData.alternate_email} onChange={handleInputChange} />
                                    <ReactSelectField name="current_state" value={selectedDropDownData.current_state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'current_state')} />
                                    <ReactSelectField name="current_location" id="current_location" value={selectedDropDownData.current_location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'current_location')} />
                                    <ReactSelectField name="preferred_state[]" id="preferred_state" isMulti label="Preferred States" value={selectedDropDownData.preferred_state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'preferred_state')} />
                                    <ReactSelectField name="preferred_location[]" id="preferred_location" label="Preferred Locations" isMulti value={selectedDropDownData.preferred_location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'preferred_location')} />

                                </div>
                            </div>
                        </div>


                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-5">Experience</h5>
                                <div className="row g-4">
                                    {addExperienceOne && <AddExperience remove={() => setAddExperienceOne(false)} disabled={!(addExperienceOne && !addExperienceTwo)} index={0} dropDownData={dropDownData} formdata={location && location.state && location.state.candidate_experience ? location.state.candidate_experience[0] : null} />}
                                    {addExperienceTwo && <AddExperience remove={() => setAddExperienceTwo(false)} index={1} dropDownData={dropDownData} formdata={location && location.state && location.state.candidate_experience ? location.state.candidate_experience[1] : null} />}
                                    <div className="col-lg-12">
                                        <div className="hstack justify-content-end gap-2">
                                            {!addExperienceTwo && <button type="button" className="btn btn-primary mt-3" onClick={() => addExperienceOne ? setAddExperienceTwo(true) : setAddExperienceOne(true)}>Add Experience</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title mb-3">Other Information</h5>
                                <div className="row g-4">
                                    <InputField type="file" name="resume_file" />
                                    <div className="col-lg-12">
                                        <label htmlFor="password" className="form-label">Additional Information</label>
                                        <CKEditor editor={ClassicEditor} data={additionalInfo} onChange={(event, editor) => setAdditionalInfo(editor.getData())} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col-lg-12">
                            <div className="hstack justify-content-end gap-2">
                                {location && location.state && location.state.id && <button type="button" className="btn btn-soft-danger mt-3" data-bs-target="#candidateConfirmationModal" data-bs-toggle="modal" title="Delete Candidate">Permanently Delete</button>}
                                {loading ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update to Database' : 'Save to Database'}</button>}
                                {loading1 ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={(e) => submitForm(e, true)}>{formData.id ? 'Update and Assign to a Vacancy' : 'Save and Assign to a Vacancy'}</button>}
                                <button type="button" id="vacancyModalOpenBtn" className="btn btn-primary opacity-0" data-bs-target="#vacancyModal" data-bs-toggle="modal" ></button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            <Elements.ConfirmationModal modalId="candidateConfirmationModal" action={deleteCandidate} />
            <Elements.ModalSection modalId="vacancyModal" title={'Vacancy'} btnTitle="Save Changes" loading={false} action={null} formId="vacanyForm">
                <form className="needs-validation" noValidate id="vacanyForm">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            Hello
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
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