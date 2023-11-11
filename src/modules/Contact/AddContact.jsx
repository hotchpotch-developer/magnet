import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import { COMMON_DROPDOWN, CREATE_CONTACT, DELETE_CONTACT, EDIT_CONTACT } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';

const AddContact = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [remark, setRemark] = useState("")

    const commonDropdown = [
        { key: "state", value: "state" },
        { key: "location", value: "location" },
        { key: "industry", value: "industry" },
        { key: "company", value: "company" },
        { key: "sales_non_sales", value: "sales_no_sales" },
        { key: "department", value: "department" },
        { key: "channel", value: "channel" },
    ];

    const [dropDownData, setDropDownData] = useState({
        state: [],
        location: [],
        industry: [],
        company: [],
        sales_non_sales: [],
        department: [],
        channel: [],
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        state: null,
        location: null,
        industry: null,
        company: null,
        sales_non_sales: null,
        department: null,
        channel: null,
    })

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact_no: '',
        alternate_contact_no: '',
        address: '',
        reporting_manager_name: '',
        reporting_contact_no: '',
        reporting_email: '',
        reporting_location: '',
    })

    useEffect(() => {
        if (location && location.state && location.state) {
            let contact = location.state;
            console.log(contact);
            setFormData({
                id: contact.id,
                name: contact.name,
                email: contact.email,
                contact_no: contact.contact_no,
                alternate_contact_no: contact.alternate_contact_no,
                address: contact.address,
                reporting_manager_name: contact.reporting_manager_name,
                reporting_contact_no: contact.reporting_contact_no,
                reporting_email: contact.reporting_email,
                reporting_location: contact.reporting_location,
            })
            setRemark(contact.remark ?? '')
        } else {
            setFormData({
                name: '',
                email: '',
                contact_no: '',
                alternate_contact_no: '',
                address: '',
                reporting_manager_name: '',
                reporting_contact_no: '',
                reporting_email: '',
                reporting_location: '',
            });
            setRemark('')
            initialFormState("contact-form");
        }
    }, [location])

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                    if (location && location.state) {
                        let contact = location.state;
                        setSelectedDropDownData({
                            state: contact.state_name ?? null,
                            location: contact.location ?? null,
                            industry: contact.industry ?? null,
                            company: contact.company ?? null,
                            sales_non_sales: contact.sales_non ?? null,
                            department: contact.department ?? null,
                            channel: contact.channel ?? null,
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
                        })
                    }
                }
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    const handleInputChange = (e, key = false) => {
        if (key) {
            Elements.reactSelectValidation(e, key)
            setSelectedDropDownData(prev => ({ ...prev, [key]: e }));
        } else {
            setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm(e, 'contact-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('contact-form'));
            formdata.append('id', formData.id);
            formdata.append('remark', remark);
            fetchData(formData.id ? EDIT_CONTACT : CREATE_CONTACT, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/contacts-list');
                }
            })
        }
    }

    const deleteContact = () => {
        fetchData(`${DELETE_CONTACT}/${location.state.id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                document.querySelector('#contactConfirmationModal [data-bs-dismiss="modal"]').click()
                navigate('/contacts-list');
            }
        })
    }

    return (
        <>
            <Breadcrumbs title={`${formData.id ? "Update" : "Add"} Contact`} parentPage="Business Contact" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <form className="needs-validation" noValidate id="contact-form">
                            <div className="card-header">
                                <h5 className="card-title mb-0">{`${formData.id ? "Update" : "Create"} Contact`}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    <InputField name="name" value={formData.name} required onChange={handleInputChange} />
                                    <InputField name="contact_no" label="Primary Contact No." type="number" value={formData.contact_no} required onChange={handleInputChange} error="Please enter a valid phone number" pattern="[6789][0-9]{9}" />
                                    <InputField name="alternate_contact_no" label="Alternate Contact No." type="number" value={formData.alternate_contact_no} onChange={handleInputChange} error="Please enter a valid phone number" pattern="[6789][0-9]{9}" />
                                    <InputField name="email" label="Official Mail Id." value={formData.email} required onChange={handleInputChange} />
                                    <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => handleInputChange(e, 'industry')} />
                                    <ReactSelectField name="company" label="Company Name" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => handleInputChange(e, 'company')} />
                                    <ReactSelectField name="sales_non_sales" label="Sales/Non Sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, 'sales_non_sales')} />
                                    <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => handleInputChange(e, 'department')} />
                                    <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => handleInputChange(e, 'channel')} />
                                    <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => handleInputChange(e, 'state')} />
                                    <ReactSelectField name="location" id="location" value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => handleInputChange(e, 'location')} />
                                    <InputField name="address" label="Branch Address" value={formData.address} required onChange={handleInputChange} />
                                    <InputField name="reporting_manager_name" label="Reporting Manager Name" value={formData.reporting_manager_name} onChange={handleInputChange} />
                                    <InputField name="reporting_contact_no" label="Reporting Contact No." value={formData.reporting_contact_no} onChange={handleInputChange} />
                                    <InputField name="reporting_email" label="Reporting Mail Id." value={formData.reporting_email} onChange={handleInputChange} />
                                    {/* <InputField name="reporting_location" value={formData.reporting_location} onChange={handleInputChange} /> */}
                                    <div className="col-lg-12">
                                            <label htmlFor="password" className="form-label">Remark</label>
                                            <CKEditor editor={ClassicEditor} data={remark} onChange={(event, editor) => setRemark(editor.getData())} />
                                        </div>
                                    <div className="col-lg-12">
                                        <div className="hstack justify-content-end gap-2">
                                            {location && location.state && location.state.id && <button type="button" className="btn btn-soft-danger mt-3" data-bs-target="#contactConfirmationModal" data-bs-toggle="modal" title="Delete Contact">Permanently Delete</button>}
                                            {loading ? Elements.loadingButton() : <button type="button" className="btn btn-primary mt-3" onClick={submitForm}>{formData.id ? 'Update' : 'Save'}</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Elements.ConfirmationModal modalId="contactConfirmationModal" action={deleteContact} />
        </>
    )

}

export default AddContact;


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