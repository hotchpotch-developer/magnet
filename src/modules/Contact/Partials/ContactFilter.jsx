import { useEffect, useState } from "react"

const ContactFilter = ({ setQuery }) => {
    const [textFilter, setTextFilter] = useState({
        search: "",
    })
    const [selectFilter, setSelectFilter] = useState({

    })

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
                </div>
            </div>
        </>
    )
}

export default ContactFilter;