import { useEffect, useState } from "react";
import { PasswordField, SubmitButton } from "../../../components/FormHelper";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { CHANGE_PASSWORD } from "../../../components/APIRoutes";

const ChangePassword = (props) => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        initialFormState("change-password-form");
    }, [props.activeTab])


    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'change-password-form')) {
            setLoading(true)
            let formdata = new FormData(document.getElementById('change-password-form'));
            fetchData(CHANGE_PASSWORD, 'POST', formdata, true, true, (res) => {
                setLoading(false)
                if (res.status) {
                    initialFormState("change-password-form");
                }
            })
        }
    }

    return (
        <>
            <form action="#" id="change-password-form">
                <div className="row g-2">
                    <PasswordField required name="current_password" />
                    <PasswordField required name="new_password" />
                    <PasswordField eye={true} required name="confirm_password" />
                    <SubmitButton title="Change Password" loading={loading} action={submitForm} />
                </div>
            </form>
        </>

    )

}
export default ChangePassword;