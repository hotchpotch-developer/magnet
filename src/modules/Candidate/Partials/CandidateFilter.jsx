import { Link } from "react-router-dom";
import * as Elements from "../../../components/Elements";

const CandidateFilter = () => {
    return (
        <>
            <div className="col-xl-3 col-lg-4">
                <div className="card">
                    <div className="card-header">
                        <div className="d-flex mb-3">
                            <div className="flex-grow-1">
                                <h5 className="fs-16">Filters</h5>
                            </div>
                            <div className="flex-shrink-0">
                                <Link to="" className="text-decoration-underline" id="clearall">Clear All</Link>
                            </div>
                        </div>

                        <div className="filter-choices-input">
                            <input className="form-control"  type="text" id="filter-choices-input" placeholder="Search Job Name..." />
                        </div>
                    </div>

                    <div className="accordion accordion-flush filter-accordion">
                        <div className="card-body border-bottom">
                            <p className="text-muted text-uppercase fs-12 fw-medium mb-4">Designation</p>

                            <div id="product-price-range" data-slider-color="primary"></div>
                            <div className="formCost d-flex gap-2 align-items-center mt-3">
                                <Elements.ReactSelect 
                                placeholder="Select Designation"
                                options={[]} 
                                name="designation[]" 
                                id="designation"
                                value={[]}
                                isMulti={true}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isSearchable
                                className="react-select required"
                                required={true}
                                /> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CandidateFilter;