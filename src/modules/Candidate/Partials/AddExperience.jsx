import _ from "lodash";
import { useEffect, useState } from "react";
import * as Elements from "../../../components/Elements";
import { InputField } from "../../../components/FormHelper";


const AddExperience = ({ index, dropDownData, formdata, remove, disabled }) => {
    const [designation, setDesignation] = useState("")
    const [current_ctc, setCurrent_ctc] = useState("")

    const [selectedDropDownData, setSelectedDropDownData] = useState(null)

    useEffect(() => {
        if (formdata) {
            setSelectedDropDownData({
                [`experience[${index}]industry`]: formdata.industry_id ?? null,
                [`experience[${index}]company`]: formdata.company_id ?? null,
                [`experience[${index}]sales_non_sales`]: formdata.sales_non_sales_id ?? null,
                [`experience[${index}]department`]: formdata.department_id ?? null,
                [`experience[${index}]channel`]: formdata.channel_id ?? null,
                [`experience[${index}]level`]: formdata.level_id ?? null,
                [`experience[${index}]product`]: formdata.product_id ?? null,
                [`experience[${index}]total_experience`]: {value: formdata.total_experience, label: formdata.total_experience} ?? null,
            })
            setDesignation(formdata.designation)
            setCurrent_ctc(formdata.current_ctc)
        } else {
            setSelectedDropDownData({
                [`experience[${index}]industry`]: null,
                [`experience[${index}]company`]: null,
                [`experience[${index}]sales_non_sales`]: null,
                [`experience[${index}]department`]: null,
                [`experience[${index}]channel`]: null,
                [`experience[${index}]level`]: null,
                [`experience[${index}]product`]: null,
                [`experience[${index}]total_experience`]: null,
            })
        }
        // eslint-disable-next-line
    }, [formdata])

    const handleInputChange = (e, key = false) => {
        if (key) {
            // Elements.reactSelectValidation(e, key, false)
            setSelectedDropDownData(prev => ({ ...prev, [key]: e }));
        }
    }

    return (
        <div className="card mt-2">
            <div className="card-body">
                <div className="row">
                    {selectedDropDownData && <>
                        <ReactSelectField index={index} name={`industry`} value={selectedDropDownData[`experience[${index}]industry`]} options={dropDownData.industry} onChange={(e) => handleInputChange(e, `experience[${index}]industry`)} />
                        <ReactSelectField index={index} name={`company`} isMulti value={selectedDropDownData[`experience[${index}]company`]} options={dropDownData.company} onChange={(e) => handleInputChange(e, `experience[${index}]company`)} />
                        <ReactSelectField index={index} name={`sales_non_sales`} value={selectedDropDownData[`experience[${index}]sales_non_sales`]} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, `experience[${index}]sales_non_sales`)} />
                        <ReactSelectField index={index} name={`department`} value={selectedDropDownData[`experience[${index}]department`]} options={dropDownData.department} onChange={(e) => handleInputChange(e, `experience[${index}]department`)} />
                        <ReactSelectField index={index} name={`channel`} value={selectedDropDownData[`experience[${index}]channel`]} options={dropDownData.channel} onChange={(e) => handleInputChange(e, `experience[${index}]channel`)} />
                        <InputField name={`experience[${index}][designation]`} id={`designation_${index}`} label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} error="Please enter designation." />
                        <ReactSelectField index={index} name={`level`} value={selectedDropDownData[`experience[${index}]level`]} options={dropDownData.level} onChange={(e) => handleInputChange(e, `experience[${index}]level`)} />
                        <ReactSelectField index={index} name={`product`} value={selectedDropDownData[`experience[${index}]product`]} options={dropDownData.product} onChange={(e) => handleInputChange(e, `experience[${index}]product`)} />
                        <ReactSelectField index={index} name={`total_experience`} value={selectedDropDownData[`experience[${index}]total_experience`]} options={dropDownData.experience} onChange={(e) => handleInputChange(e, `experience[${index}]total_experience`)} />
                        <InputField name={`experience[${index}][current_ctc]`} id={`current_ctc_${index}`} label="Current ctc" value={current_ctc} onChange={(e) => setCurrent_ctc(e.target.value)} error="Please enter current ctc." />
                    </>}
                    <div className="col-lg-12">
                        <div className="hstack justify-content-end gap-2">
                            <button type="button mt-5" className="btn btn-primary mt-3" disabled={disabled} onClick={() => remove()}>Remove Experience</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddExperience;


const ReactSelectField = (props) => {

    return (<>
        <div className="col-xxl-3 col-md-6 mt-2">
            <label htmlFor={props.label ?? (props.id ?? props.name)} className="form-label">{props.label ?? _.startCase(props.name)}</label>
            <Elements.ReactSelect
                placeholder={`Select ${props.label ?? _.startCase(props.name)}`}
                className="react-select required"
                required={true}
                {...props}
                id={props.id ?? `${props.name}_${props.index}`}
                name={`experience[${props.index}][${props.name}]`}
            />
            <div className="invalid-feedback">{props.error ?? `Please Enter ${_.startCase(props.name)}.`}</div>
        </div>
    </>)
}