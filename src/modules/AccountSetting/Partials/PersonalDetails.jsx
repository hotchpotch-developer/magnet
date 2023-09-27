import { useContext, useEffect, useState } from "react";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { InputField, SubmitButton } from "../../../components/FormHelper";
import { Context } from "../../../components/Context";
import { UPDATE_ACCOUNT_SETTING } from "../../../components/APIRoutes";


const PersonalDetails = (props) => {
    const [context, setContext] = useContext(Context)
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (context && context.auth && props.activeTab === 'personalDetails') {
            initialFormState("personal-details-form");
            setFormData({
                role: context.auth.role_name,
                first_name: context.auth.first_name,
                last_name: context.auth.last_name,
                phone: context.auth.phone,
                email: context.auth.email,
            })
        }
    }, [context, props.activeTab])

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'personal-details-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('personal-details-form'));
            fetchData(UPDATE_ACCOUNT_SETTING, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if(res.status){
                    setContext(prev => ({...prev, auth: res.data}));
                }
            })
        }
    }

    return (

        <>
            <form action="#" id="personal-details-form">
                <div className="row g-2">
                    {formData && <>
                        <InputField name="first_name" defaultValue={formData.first_name} required />
                        <InputField name="last_name" defaultValue={formData.last_name} required />
                        <InputField name="phone" defaultValue={formData.phone} required />
                        <InputField name="email" defaultValue={formData.email} disabled />
                        <InputField full name="role" defaultValue={formData.role} disabled />
                        <SubmitButton title="Update" loading={loading} action={submitForm} />
                    </>}
                </div>
            </form>
        </>

    )

}
export default PersonalDetails;