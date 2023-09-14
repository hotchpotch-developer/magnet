import Breadcrumbs from "../../components/Breadcrumbs";

const CreateManager = () => {

    return (
        <>
            <Breadcrumbs title="Add Manager" parentPage="Manager" />

            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header align-items-center d-flex">
                            <h4 className="card-title mb-0 flex-grow-1">Manager Information</h4>
                        </div>
                        <div className="card-body">
                            <div className="live-preview">
                                <div className="row gy-4">
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="firstName" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="firstName" name="first_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="lastName" className="form-label">Last Name</label>
                                            <input type="password" className="form-control" id="lastName" name="last_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="basiInput" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="basiInput" name="first_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="basiInput" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="basiInput" name="first_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="basiInput" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="basiInput" name="first_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="basiInput" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="basiInput" name="first_name"  required />
                                        </div>
                                    </div>
                                    <div className="col-xxl-3 col-md-6">
                                        <div>
                                            <label htmlFor="basiInput" className="form-label">First Name</label>
                                            <input type="password" className="form-control" id="basiInput" name="first_name"  required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default CreateManager;