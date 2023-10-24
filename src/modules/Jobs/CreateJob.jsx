import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import _, { startCase } from 'lodash';
import { COMMON_DROPDOWN, CREATE_JOB, DELETE_JOB, EDIT_JOB } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [jobDescription, setJobDescription] = useState(false)

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
    ];

    const [dropDownData, setDropDownData] = useState({
        state: [],
        location: [],
        industry: [],
        company: [],
        sales_non_sales: [],
        department: [],
        channel: [],
        level: [],
        product: [],
        status: [
            { value: 'open', label: 'Open' },
            { value: 'close', label: 'Close' },
        ],
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        state: null,
        location: null,
        industry: null,
        company: null,
        sales_non_sales: null,
        department: null,
        channel: null,
        level: null,
        product: null,
        status: null,
    })

    const [formData, setFormData] = useState({
        hr_spoc: '',
        business_spoc: '',
        designation: '',
        openings: '',
        ctc_from: '',
        ctc_to: '',
        status: '',
    })

    useEffect(() => {
        if (location && location.state && location.state) {
            let job = location.state;
            setFormData({
                id: job.id,
                hr_spoc: job.hr_spoc,
                business_spoc: job.business_spoc,
                designation: job.designation_id,
                openings: job.openings,
                ctc_from: job.ctc_from,
                ctc_to: job.ctc_to,
            })
            setJobDescription(job.job_description ?? '')
        } else {
            setFormData({
                hr_spoc: '',
                business_spoc: '',
                designation: '',
                openings: '',
                ctc_from: '',
                ctc_to: '',
            });
            setJobDescription('')
            initialFormState("job-form");
        }
    }, [location])

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                    if (location && location.state) {
                        let job = location.state;
                        setSelectedDropDownData({
                            state: job.state_name ?? null,
                            location: job.location_id ?? null,
                            industry: job.industry ?? null,
                            company: job.company ?? null,
                            sales_non_sales: job.sales_non ?? null,
                            department: job.department ?? null,
                            channel: job.channel ?? null,
                            level: job.level ?? null,
                            product: job.product ?? null,
                            status: job.status ? { value: job.status, label: startCase(job.status) } : null,
                        })
                    } else {
                        setSelectedDropDownData({
                            state: null,
                            location: null,
                            industry: null,
                            company: null,
                            sales_non_sales: null,
                            department: null,
                            channel: null,
                            level: null,
                            product: null,
                            status: null,
                        })
                    }
                }
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const handleInputChange = (e, key = false) => {
        if (key) {
            Elements.reactSelectValidation(e, key === 'status' ? 'job_status' : key, key === 'location' ? true : false)
            setSelectedDropDownData(prev => ({ ...prev, [key]: e }));
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm(e, 'job-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('job-form'));
            formdata.append('id', formData.id);
            formdata.append('job_description', jobDescription);
            fetchData(formData.id ? EDIT_JOB : CREATE_JOB, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/manage-jobs');
                }
            })
        }
    }

    const deleteJob = () => {
        fetchData(`${DELETE_JOB}/${location.state.id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                document.querySelector('#jobConfirmationModal [data-bs-dismiss="modal"]').click()
                navigate('/manage-jobs');
            }
        })
    }

    return (
        <>
            <Breadcrumbs title={`${formData.id ? "Update" : "Create"} Job`} parentPage="Post Job" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <form className="needs-validation" noValidate id="job-form">
                            <div className="card-header">
                                <h5 className="card-title mb-0">{`${formData.id ? "Update" : "Create"} Job`}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    <InputField name="hr_spoc" value={formData.hr_spoc} required onChange={handleInputChange} />
                                    <InputField name="business_spoc" value={formData.business_spoc} required onChange={handleInputChange} />
                                    <InputField name="designation" value={formData.designation} required onChange={handleInputChange} />
                                    <InputField name="openings" value={formData.openings} required onChange={handleInputChange} />
                                    <div className="col-xxl-3 col-md-6">
                                        <div className="row">
                                        <InputField half={true} name="ctc_from" type="number" min={0} value={formData.ctc_from} required onChange={handleInputChange} />
                                        <InputField half={true} name="ctc_to" type="number" min={1} value={formData.ctc_to} required onChange={handleInputChange} />
                                        </div>
                                    </div>
                                    <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'state')} />
                                    <ReactSelectField name="location[]" id="location" isMulti value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'location')} />
                                    <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => handleInputChange(e, 'industry')} />
                                    <ReactSelectField name="company" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => handleInputChange(e, 'company')} />
                                    <ReactSelectField name="sales_non_sales" label="Sales/Non Sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, 'sales_non_sales')} />
                                    <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => handleInputChange(e, 'department')} />
                                    <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => handleInputChange(e, 'channel')} />
                                    <ReactSelectField name="level" value={selectedDropDownData.level} options={dropDownData.level} onChange={(e) => handleInputChange(e, 'level')} />
                                    <ReactSelectField name="product" value={selectedDropDownData.product} options={dropDownData.product} onChange={(e) => handleInputChange(e, 'product')} />
                                    <ReactSelectField name="status" id="job_status" value={selectedDropDownData.status} options={dropDownData.status} onChange={(e) => handleInputChange(e, 'status')} />
                                    <InputField type="file" name="attach_job_description" />
                                    <div className="col-lg-12">
                                        <label htmlFor="password" className="form-label">Job Description</label>
                                        <CKEditor editor={ClassicEditor} data={jobDescription} onChange={(event, editor) => setJobDescription(editor.getData())} />
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="hstack justify-content-end gap-2">
                                            {location && location.state && location.state.id && <button type="button" className="btn btn-soft-danger mt-3" data-bs-target="#jobConfirmationModal" data-bs-toggle="modal" title="Delete Job">Delete</button>}
                                            {loading ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Elements.ConfirmationModal modalId="jobConfirmationModal" action={deleteJob} />
        </>
    )

}

export default CreateJob;


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