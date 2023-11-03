
import * as Elements from "../../components/Elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_ATTENDANCE, EDIT_ATTENDANCE } from '../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../components/Helper';
import moment from 'moment';
import { useEffect, useState } from "react";
import { now } from "lodash";

function EditLeave(props) {
    const leaveTypes = [
        { value: 'short_leave', label: 'Short Leave' },
        { value: 'half_leave', label: 'Half Leave' },
        { value: 'leave', label: 'Leave' },
    ]
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState("");

    useEffect(() => {
        if(props.details){
            let type = leaveTypes.filter(f => f.label === props.details.type)
            console.log(type);
            setDescription(props.details.description)
            setType(type[0] ?? null)
            setDate(new Date(props.details.event_timing))
        }else{
            setDescription("")
            setType(null)
            setDate(null)
        }
    }, [props.details])

    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm(e, 'edit-leave-form')) {
            setLoading(true)
            let formdata = { type: type.value, date: moment(date).format("YYYY-MM-DD"), time: moment(date).format("H:mm:ss"), description: description }
            if(props.details){
                formdata = {...formdata, id: props.details.event_id}
            }
            fetchData(EDIT_ATTENDANCE, 'POST', formdata, true, false, (res) => {
                setLoading(false)
                if (res.status) {
                    if(props.edit){
                        props.setDetails(prev => ({ 
                            ...prev,
                            type: type.label,
                            event_timing: moment(date).format("YYYY-MM-DD"), 
                            description: description,

                        }));
                    }
                    document.querySelector('#editLeave [data-bs-dismiss="modal"]').click()
                    props.setReload(now())
                    document.getElementById('calender-details-btn').click()
                }
            })
        }
    }

    return (<>

        <Elements.ModalSection modalId="editLeave" title="Edit Leave" btnTitle={"Update"} action={submitForm} loading={loading} formId="edit-leave-form" closeAction={props.closeAction}>
            <form className="needs-validation" noValidate id="edit-leave-form">
                <div className="row gy-4">
                    <div className="col-md-12">
                        <label htmlFor="leave_type" className="form-label">Select Leave type</label>
                        <Elements.ReactSelect
                            placeholder={`Select Leave type`}
                            name="type"
                            id={"leave_type"}
                            className="react-select required"
                            required={true}
                            options={leaveTypes}
                            value={type}
                            onChange={(e) => { Elements.reactSelectValidation(e, 'leave_type'); setType(e) }}
                        />
                        <div className="invalid-feedback">Please Select Leave type</div>
                    </div>
                    <div className="col-md-12">
                        <div>
                            <label htmlFor="date" className="form-label">Date and Time</label>
                            <DatePicker showTimeSelect required className='form-control' name="date" id="date" dateFormat="MMMM d, yyyy H:mm:ss" selected={date} value={date} minDate={new Date()} onChange={(e) => setDate(e)} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" value={description} className="form-control" id="description" name="description" onChange={(e) => setDescription(e.target.value)} />
                        <div className="invalid-feedback">Please Enter description.</div>
                    </div>
                </div>
            </form>
        </Elements.ModalSection>
    </>
    );
}

export default EditLeave;