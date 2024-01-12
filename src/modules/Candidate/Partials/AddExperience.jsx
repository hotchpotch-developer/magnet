import _ from "lodash";
import { useEffect, useState } from "react";
import * as Elements from "../../../components/Elements";
import { InputField } from "../../../components/FormHelper";


const AddExperience = ({ index, dropDownData, formdata, remove, disabled }) => {
    const [designation, setDesignation] = useState("")
    const [current_ctc, setCurrent_ctc] = useState("")
    const [experienceType, setExperienceType] = useState("current")

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
                [`experience[${index}]total_experience`]: {value: formdata.total_experience, label: formdata.total_experience +' year'} ?? null,
            })
            setDesignation(formdata.designation)
            setCurrent_ctc(formdata.current_ctc)
            setExperienceType(formdata.experience_type)
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
            setDesignation("")
            setCurrent_ctc("")
            setExperienceType("current")
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
                    <div className="col-xxl-3 col-md-6 my-3">
                        <div className="">
                            <span className="form-label">Experience Type</span>
                            <div className="row mt-3">
                                <div className="col-6">
                                    <label className="form-label" htmlFor={`previous_${index}`}>Previous</label>
                                    <input type="radio" className="ms-2 mt-2" name={`experience[${index}][experience_type]`} value="previous" id={`previous_${index}`} checked={experienceType === "previous"} onChange={(e) => setExperienceType(e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <label className="form-label" htmlFor={`current_${index}`}>Current</label>
                                    <input type="radio" className="ms-2 mt-2" name={`experience[${index}][experience_type]`} value="current" id={`current_${index}`} checked={experienceType === "current"} onChange={(e) => setExperienceType(e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    {selectedDropDownData && <>
                        <ReactSelectField index={index} name={`industry`} value={selectedDropDownData[`experience[${index}]industry`]} options={dropDownData.industry} onChange={(e) => handleInputChange(e, `experience[${index}]industry`)} />
                        <ReactSelectField index={index} name={`company`} isMulti value={selectedDropDownData[`experience[${index}]company`]} options={dropDownData.company} onChange={(e) => handleInputChange(e, `experience[${index}]company`)} />
                        <ReactSelectField index={index} name={`sales_non_sales`} label="Sales/Non-Sales" value={selectedDropDownData[`experience[${index}]sales_non_sales`]} options={dropDownData.sales_non_sales} onChange={(e) => handleInputChange(e, `experience[${index}]sales_non_sales`)} />
                        <ReactSelectField index={index} name={`department`} value={selectedDropDownData[`experience[${index}]department`]} options={dropDownData.department} onChange={(e) => handleInputChange(e, `experience[${index}]department`)} />
                        <ReactSelectField index={index} name={`channel`} value={selectedDropDownData[`experience[${index}]channel`]} options={dropDownData.channel} onChange={(e) => handleInputChange(e, `experience[${index}]channel`)} />
                        <InputField align="mt-3" name={`experience[${index}][designation]`} id={`designation_${index}`} label="Designation" value={designation} onChange={(e) => setDesignation(e.target.value)} error="Please enter designation." className="form-control text-uppercase" />
                        <ReactSelectField index={index} name={`level`} value={selectedDropDownData[`experience[${index}]level`]} options={dropDownData.level} onChange={(e) => handleInputChange(e, `experience[${index}]level`)} />
                        <ReactSelectField index={index} name={`product`} value={selectedDropDownData[`experience[${index}]product`]} options={dropDownData.product} onChange={(e) => handleInputChange(e, `experience[${index}]product`)} />
                        <ReactSelectField index={index} name={`total_experience`} value={selectedDropDownData[`experience[${index}]total_experience`]} options={dropDownData.experience} onChange={(e) => handleInputChange(e, `experience[${index}]total_experience`)} />
                        <InputField align="mt-3" type="number" name={`experience[${index}][current_ctc]`} id={`current_ctc_${index}`} label="CTC" value={current_ctc} onChange={(e) => setCurrent_ctc(e.target.value)} error="Please enter current ctc." />
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
        <div className="col-xxl-3 col-md-6 my-3">
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