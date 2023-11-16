import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { loadingButton } from "../../components/Elements";
import { fetchData, validateForm } from "../../components/Helper";
import { RESET_PASSWORD } from "../../components/APIRoutes";

const ResetPassword = () => {
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();

    useEffect(() => {
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }, []);

    const changeHandler = (e) => {
        if (e.keyCode === 13) {
            submitForm(e)
        }
    }

    const submitForm = (e) => {
        e.preventDefault();

        if (validateForm(e, 'forgotPasswordForm')) {
            setLoader(true)

            let formData = new FormData(document.getElementById('forgotPasswordForm'));
            formData.append('token', searchParams.get('token'))

            fetchData(RESET_PASSWORD, 'POST', formData, false, true, (res) => {
                setLoader(false)
                if (res.status) {
                    navigate('/login');
                }
            })
        }
    }

    return (
        <>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <a href="index.html" className="d-inline-block auth-logo">
                                            <img src="/images/logo-light.png" alt="" height="20" />
                                        </a>
                                    </div>
                                    <p className="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4 card-bg-fill">

                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Reset Password?</h5>
                                            <p className="text-muted">Reset password with The Magnet</p>
                                        </div>

                                        <div className="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                            {/* Enter your email and instructions will be sent to you! */}
                                        </div>
                                        <div className="p-2">
                                            <form className="need-validation" noValidate id="forgotPasswordForm">
                                                <div className="mb-4">
                                                    <label className="form-label">Password</label>
                                                    <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" required onKeyUp={(e) => changeHandler(e)} />
                                                </div>
                                                <div className="mb-4">
                                                    <label className="form-label">confirm_password</label>
                                                    <input type="password_confirmation" name="password_confirmation" className="form-control" id="password_confirmation" placeholder="Enter confirm password" required onKeyUp={(e) => changeHandler(e)} />
                                                </div>

                                                <div className="mt-4">
                                                    {!loader ?
                                                        <button className="btn btn-primary w-100" type="button" onClick={submitForm}>Reset Password In</button>
                                                        : loadingButton(100)}
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="mb-0">Wait, I remember my password... <Link to="/" className="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center">
                                    <p className="mb-0 text-muted">&copy; Copyright 2023. All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    )

}
export default ResetPassword;