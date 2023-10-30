
import * as Elements from "../../../components/Elements";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_ATTENDANCE } from '../../../components/APIRoutes';
import { fetchData, initialFormState, validateForm } from '../../../components/Helper';
import moment from 'moment';
import { useState } from "react";

function LeaveForm() {
    const leaveTypes = [
        { value: 'short_leave', label: 'Short Leave' },
        { value: 'half_leave', label: 'Half Leave' },
        { value: 'leave', label: 'Leave' },
    ]
    const [loading, setLoading] = useState(false)
    const [type, setType] = useState(null);
    const [date, setDate] = useState(null);
    const [description, setDescription] = useState("");

    const submitForm = (e) => {
        e.preventDefault()
        if (validateForm(e, 'apply-leave-form')) {
            setLoading(true)
            let formdata = { type: type.value, date: moment(date).format("YYYY-MM-DD"), time: moment(date).format("H:mm:ss"), description: description }
            fetchData(ADD_ATTENDANCE, 'POST', formdata, true, false, (res) => {
                setLoading(false)
                if (res.status) {
                    setDescription("")
                    setType(null)
                    setDate(null)
                    document.querySelector('#applyLeave [data-bs-dismiss="modal"]').click()
                    initialFormState("apply-leave-form");
                }
            })
        }
    }

    return (<>

        <Elements.ModalSection modalId="applyLeave" title="Apply Leave" btnTitle="Add" action={submitForm} loading={loading} formId="apply-leave-form">
            <form className="needs-validation" noValidate id="apply-leave-form">
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
                            <DatePicker showTimeSelect required className='form-control' name="date" id="date" dateFormat="MMMM d, yyyy H:mm:ss" selected={date} onChange={(e) => setDate(e)} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={(e) => setDescription(e.target.value)} />
                        <div className="invalid-feedback">Please Enter description.</div>
                    </div>
                </div>
            </form>
        </Elements.ModalSection>
    </>
    );
}

export default LeaveForm;