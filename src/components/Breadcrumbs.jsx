import { Link } from "react-router-dom";

const Breadcrumbs = (props) => {

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between bg-transparent mt-2">
                        <h4 className="mb-sm-0">{props && props.title}</h4>
                        <div className="page-title-right">
                            <ol className="breadcrumb m-0">
                                <li className="breadcrumb-item"><Link to="/">{props && props.parentPage}</Link></li>
                                <li className="breadcrumb-item active">{props && props.title}</li>
                            </ol>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )

}
export default Breadcrumbs;