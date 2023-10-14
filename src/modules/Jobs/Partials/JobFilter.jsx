import { useEffect, useState } from "react"

const JobFilter = ({ setQuery }) => {
    const [textFilter, setTextFilter] = useState({
        search: "",
    })
    const [selectFilter, setSelectFilter] = useState({

    })
    console.log(selectFilter);

    useEffect(() => {
        setQuery(`search=${textFilter.search}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textFilter])

    const resetFilter = () => {
        setQuery("")
        setTextFilter({
            search: "",
        });
        setSelectFilter({

        })
    }

    const handleInputChange = (e, key = false) => {
        if (key) {
            setSelectFilter(prev => ({ ...prev, [key]: e }));
        } else {
            setTextFilter(prev => ({ ...prev, [e.target.name]: e.target.value }));
        }
    }

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
                                <button className="text-decoration-underline" id="clearall" onClick={resetFilter}>Clear All</button>
                            </div>
                        </div>

                        <div className="filter-choices-input">
                            <input className="form-control" type="text" id="filter-choices-input" name="search" placeholder="Search Job Name..." value={textFilter.search} onChange={handleInputChange} />
                        </div>
                    </div>

                    {/* <div className="accordion accordion-flush filter-accordion">
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
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default JobFilter;