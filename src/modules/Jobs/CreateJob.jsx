import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useState } from 'react';
import _ from 'lodash';

const CreateJob = () => {
    const [jobDescription, setJobDescription] = useState(false)

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
        openings: [],
        ctc_from: [],
        ctc_to: [],
        status: [],
        jd_type: [],
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

    const handleInputChange = (e) => {
        // setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
    return (
        <>
            <Breadcrumbs title="Create Job" parentPage="Post Job" />
            <div class="row">
                <div class="col-lg-12">
                    <div class="card">
                        <form className="needs-validation" noValidate id="job-form">
                            <div class="card-header">
                                <h5 class="card-title mb-0">Create Job</h5>
                            </div>
                            <div class="card-body">
                                <div class="row g-4">
                                    <InputField name="hr_spoc" value={formData.hr_spoc} required onChange={handleInputChange} />
                                    <InputField name="business_spoc" value={formData.business_spoc} required onChange={handleInputChange} />
                                    <InputField name="designation" value={formData.designation} required onChange={handleInputChange} />
                                    <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => { }} />
                                    <ReactSelectField name="location" value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => { }} />
                                    <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => { }} />
                                    <ReactSelectField name="company" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => { }} />
                                    <ReactSelectField name="sales_non_sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => { }} />
                                    <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => { }} />
                                    <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => { }} />
                                    <ReactSelectField name="level" value={selectedDropDownData.level} options={dropDownData.level} onChange={(e) => { }} />
                                    <ReactSelectField name="product" value={selectedDropDownData.product} options={dropDownData.product} onChange={(e) => { }} />
                                    <ReactSelectField name="openings" value={selectedDropDownData.openings} options={dropDownData.openings} onChange={(e) => { }} />
                                    <ReactSelectField name="ctc_from" value={selectedDropDownData.ctc_from} options={dropDownData.ctc_from} onChange={(e) => { }} />
                                    <ReactSelectField name="ctc_to" value={selectedDropDownData.ctc_to} options={dropDownData.ctc_to} onChange={(e) => { }} />
                                    <ReactSelectField name="status" value={selectedDropDownData.status} options={dropDownData.status} onChange={(e) => { }} />
                                    <ReactSelectField name="jd_type" value={selectedDropDownData.jd_type} options={dropDownData.jd_type} onChange={(e) => { }} />


                                    <div class="col-lg-12">
                                        <div>
                                            <label for="description-field" class="form-label">Description <span class="text-danger">*</span></label>
                                            <textarea class="form-control" id="description-field" rows="3" placeholder="Enter description" required></textarea>
                                        </div>
                                    </div>

                                    <InputField type="file" name="profile_image" />

                                    <div class="col-lg-12">
                                        <div class="hstack justify-content-end gap-2">
                                            <button type="button" class="btn btn-ghost-danger"><i class="ri-close-line align-bottom"></i> Cancel</button>
                                            <button type="submit" class="btn btn-primary">Add Job</button>
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
            />
            <div className="invalid-feedback">{props.error ?? `Please Enter ${_.startCase(props.name)}.`}</div>
        </div>
    </>)
}