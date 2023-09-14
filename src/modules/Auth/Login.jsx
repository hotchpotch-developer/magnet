import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData, validateForm } from "../../components/Helper";
import { LOGIN } from "../../components/APIRoutes";
import { Context } from "../../components/Context"

const Login = () => {

    const [context, setContext] = useContext(Context)
    const navigate = useNavigate()

    const passwordAddedOn = () => {
        let element = document.querySelector('#password-input');
        element.setAttribute('type', element.type === 'password' ? 'text' : 'password');
    }

    const signIn = (e) => {
        e.preventDefault();

        if(validateForm(e, 'loginForm')){

            let formData = new FormData(document.getElementById('loginForm'));

            fetchData(LOGIN, 'POST', formData, false, true, (res) => {
                if(res.status === 200 && res.data){
                    localStorage.setItem('accessToken', res.data.access_token)
                    setContext(prev => ({...prev, auth: res.data}));
                    navigate('/');
                }
            })

        }

    }

    useEffect(() => {
        context && context.auth && navigate('/')
    }, [context, navigate]);

    return (
        <>
            <div className="auth-page-wrapper pt-5">
                <div className="auth-page-content">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <Link to="/" className="d-inline-block auth-logo">
                                            <img src="/images/logo-light.png" alt="Login Logo" height="20" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6 col-xl-5">
                                <div className="card mt-4 card-bg-fill">

                                    <div className="card-body p-4">
                                        <div className="text-center mt-2">
                                            <h5 className="text-primary">Welcome Back !</h5>
                                            <p className="text-muted">Sign in to continue to Velzon.</p>
                                        </div>
                                        <div className="p-2 mt-4">
                                            <form className="need-validation" noValidate id="loginForm">
                                                <div className="mb-3">
                                                    <label htmlFor="email" className="form-label">Email</label>
                                                    <input type="text" name="email" className="form-control" id="email" placeholder="Email" required />
                                                </div>

                                                <div className="mb-3">
                                                    <div className="float-end">
                                                        <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                    </div>
                                                    <label className="form-label" htmlFor="password-input">Password</label>
                                                    <div className="position-relative auth-pass-inputgroup mb-3">
                                                        <input type="password" name="password" className="form-control pe-5 password-input" placeholder="Password" id="password-input" required />
                                                        <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => passwordAddedOn()}><i className="ri-eye-fill align-middle"></i></button>
                                                    </div>
                                                </div>

                                                <div className="mt-4">
                                                    <button className="btn btn-primary w-100" type="button" onClick={(e) => signIn(e)}>Sign In</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
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
export default Login;