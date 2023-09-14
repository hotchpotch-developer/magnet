import { useEffect } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    useEffect(() => {
        document.querySelector("html").setAttribute("data-bs-theme", "dark");
    }, []);

    return (
        <>
            <div class="auth-page-wrapper pt-5">
                <div class="auth-page-content">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-center mt-sm-5 mb-4 text-white-50">
                                    <div>
                                        <a href="index.html" class="d-inline-block auth-logo">
                                            <img src="/images/logo-light.png" alt="" height="20" />
                                        </a>
                                    </div>
                                    <p class="mt-3 fs-15 fw-medium">Premium Admin & Dashboard Template</p>
                                </div>
                            </div>
                        </div>

                        <div class="row justify-content-center">
                            <div class="col-md-8 col-lg-6 col-xl-5">
                                <div class="card mt-4 card-bg-fill">

                                    <div class="card-body p-4">
                                        <div class="text-center mt-2">
                                            <h5 class="text-primary">Forgot Password?</h5>
                                            <p class="text-muted">Reset password with velzon</p>
                                        </div>

                                        <div class="alert border-0 alert-warning text-center mb-2 mx-2" role="alert">
                                            Enter your email and instructions will be sent to you!
                                        </div>
                                        <div class="p-2">
                                            <form>
                                                <div class="mb-4">
                                                    <label class="form-label">Email</label>
                                                    <input type="email" class="form-control" id="email" placeholder="Enter Email" />
                                                </div>

                                                <div class="text-center mt-4">
                                                    <button class="btn btn-primary w-100" type="submit">Send Reset Link</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                <div class="mt-4 text-center">
                                    <p class="mb-0">Wait, I remember my password... <Link to="/" class="fw-semibold text-primary text-decoration-underline"> Click here </Link> </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <footer class="footer">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="text-center">
                                    <p class="mb-0 text-muted">&copy;
                                        <script>document.write(new Date().getFullYear())</script> Velzon. Crafted with <i class="mdi mdi-heart text-danger"></i> by Themesbrand
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>

        </>
    )

}
export default ForgotPassword;