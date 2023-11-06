import Breadcrumbs from '../../components/Breadcrumbs'
import { InputField } from '../../components/FormHelper';
import * as Elements from "../../components/Elements";
import { useEffect, useState } from 'react';
import { COMMON_DROPDOWN, CREATE_NOTE, EDIT_NOTE } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import { useLocation, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import _ from 'lodash';

const AddNote = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [remark, setRemark] = useState("")

    const commonDropdown = [
        { key: "company", value: "company" },
    ];

    const [dropDownData, setDropDownData] = useState({
        company: [],
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        company_name: null,
    })

    const [formData, setFormData] = useState({
        subject: '',
    })

    useEffect(() => {
        if (location && location.state && location.state) {
            let note = location.state.note;
            
            setFormData({
                id: note.id,
                subject: note.subject,
            })
            setRemark(note.remark ?? '')
        } else {
            setFormData({
                subject: '',
            });
            setRemark('')
            initialFormState("note-form");
        }
    }, [location])

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                    if (location && location.state) {
                        let company_name = res.data.filter((item) => item.value === parseInt(location.state.note.company_name))

                        setSelectedDropDownData({
                            company_name: company_name[0] ?? null,
                        })
                    } else {
                        setSelectedDropDownData({
                            company_name: null,
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
        if (validateForm(e, 'note-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('note-form'));
            formdata.append('id', formData.id);
            formdata.append('remark', remark);
            fetchData(formData.id ? EDIT_NOTE : CREATE_NOTE, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    navigate('/notes-list');
                }
            })
        }
    }

    return (
        <>
            <Breadcrumbs title={`${formData.id ? "Update" : "Create"} Note`} parentPage="Post Note" />
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <form className="needs-validation" noValidate id="note-form">
                            <div className="card-header">
                                <h5 className="card-title mb-0">{`${formData.id ? "Update" : "Create"} Note`}</h5>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    <InputField name="subject" value={formData.subject} required onChange={handleInputChange} />
                                    <ReactSelectField name="company_name" value={selectedDropDownData.company_name} options={dropDownData.company} onChange={(e) => handleInputChange(e, 'company_name')} />
                                    <InputField type="file" name="document" required={formData.id ? false : true} />
                                    <div className="col-lg-12">
                                        <label htmlFor="password" className="form-label">Remark</label>
                                        <CKEditor editor={ClassicEditor} data={remark} onChange={(event, editor) => setRemark(editor.getData())} />
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

export default AddNote;


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