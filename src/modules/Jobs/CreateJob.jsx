import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import _, { startCase } from 'lodash';
import { COMMON_DROPDOWN, CREATE_JOB, EDIT_JOB } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateJob = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [jobDescription, setJobDescription] = useState(false)

    console.log(location);

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
        openings: [
            { value: 10, label: 10 },
            { value: 20, label: 20 },
            { value: 30, label: 30 },
            { value: 40, label: 40 },
            { value: 50, label: 50 },
        ],
        ctc_from: [
            { value: 1000, label: 1000 },
            { value: 2000, label: 2000 },
            { value: 3000, label: 3000 },
            { value: 4000, label: 4000 },
            { value: 5000, label: 5000 },
        ],
        ctc_to: [
            { value: 10000, label: 10000 },
            { value: 20000, label: 20000 },
            { value: 30000, label: 30000 },
            { value: 40000, label: 40000 },
            { value: 50000, label: 50000 },
        ],
        status: [
            { value: 'open', label: 'Open' },
            { value: 'close', label: 'Close' },
        ],
        jd_type: [
            { value: 'attached', label: 'Attached' },
            { value: 'mannual', label: 'Mannual' },
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
        openings: null,
        ctc_from: null,
        ctc_to: null,
        status: null,
        jd_type: null,
    })

    const [formData, setFormData] = useState({
        hr_spoc: '',
        business_spoc: '',
        designation: '',
    })

    useEffect(() => {
        if (location && location.state && location.state) {
            let job = location.state;
            setFormData({
                id: job.id,
                hr_spoc: job.hr_spoc,
                business_spoc: job.business_spoc,
                designation: job.designation,
            })
        } else {
            setFormData({
                hr_spoc: '',
                business_spoc: '',
                designation: '',
            });
            initialFormState("job-form");
        }
    }, [])

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                    if (location && location.state) {
                        let job = location.state;
                        setSelectedDropDownData({
                            state: job.state_name ?? null,
                            location: job.location ?? null,
                            industry: job.industry ?? null,
                            company: job.company ?? null,
                            sales_non_sales: job.sales_non ?? null,
                            department: job.department ?? null,
                            channel: job.channel ?? null,
                            level: job.level ?? null,
                            product: job.product ?? null,
                            openings: job.openings ? { value: job.openings, label: job.openings } : null,
                            ctc_from: job.ctc_from ? { value: job.ctc_from, label: job.ctc_from } : null,
                            ctc_to: job.ctc_to ? { value: job.ctc_to, label: job.ctc_to } : null,
                            status: job.status ? { value: job.status, label: startCase(job.status) } : null,
                            jd_type: job.jd_type ? { value: job.jd_type, label: startCase(job.jd_type) } : null,
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
                            openings: null,
                            ctc_from: null,
                            ctc_to: null,
                            status: null,
                            jd_type: null,
                        })
                    }
                }
            })
        });

    }, [])

    const handleInputChange = (e, key = false) => {
        if (key) {
            Elements.reactSelectValidation(e, key === 'status' ? 'job_status' : key)
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
            formdata.append('sales_non_sales', 1);
            fetchData(formData.id ? EDIT_JOB : CREATE_JOB, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/manage-jobs');
                }
            })
        }
    }

    return (
        <>
            <Breadcrumbs title="Create Job" parentPage="Post Job" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <form className="needs-validation" noValidate id="job-form">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Create Job</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    <InputField name="hr_spoc" value={formData.hr_spoc} required onChange={handleInputChange} />
                                    <InputField name="business_spoc" value={formData.business_spoc} required onChange={handleInputChange} />
                                    <InputField name="designation" value={formData.designation} required onChange={handleInputChange} />
                                    <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'state')} />
                                    <ReactSelectField name="location" value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'location')} />
                                    <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => handleInputChange(e, 'industry')} />
                                    <ReactSelectField name="company" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => handleInputChange(e, 'company')} />
                                    <ReactSelectField name="sales_non_sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, 'sales_non_sales')} />
                                    <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => handleInputChange(e, 'department')} />
                                    <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => handleInputChange(e, 'channel')} />
                                    <ReactSelectField name="level" value={selectedDropDownData.level} options={dropDownData.level} onChange={(e) => handleInputChange(e, 'level')} />
                                    <ReactSelectField name="product" value={selectedDropDownData.product} options={dropDownData.product} onChange={(e) => handleInputChange(e, 'product')} />
                                    <ReactSelectField name="openings" value={selectedDropDownData.openings} options={dropDownData.openings} onChange={(e) => handleInputChange(e, 'openings')} />
                                    <ReactSelectField name="ctc_from" value={selectedDropDownData.ctc_from} options={dropDownData.ctc_from} onChange={(e) => handleInputChange(e, 'ctc_from')} />
                                    <ReactSelectField name="ctc_to" value={selectedDropDownData.ctc_to} options={dropDownData.ctc_to} onChange={(e) => handleInputChange(e, 'ctc_to')} />
                                    <ReactSelectField name="status" id="job_status" value={selectedDropDownData.status} options={dropDownData.status} onChange={(e) => handleInputChange(e, 'status')} />
                                    <ReactSelectField name="jd_type" value={selectedDropDownData.jd_type} options={dropDownData.jd_type} onChange={(e) => handleInputChange(e, 'jd_type')} />
                                    <InputField type="file" name="attach_job_description" required />
                                    <div className="col-lg-12">
                                        <div>
                                            <label for="description-field" className="form-label">Description <span className="text-danger">*</span></label>
                                            <textarea className="form-control" id="description-field" rows="3" placeholder="Enter description" required value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="hstack justify-content-end gap-2">
                                            {loading ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
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