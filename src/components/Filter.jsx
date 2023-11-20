import { useEffect, useRef, useState } from "react"
import { COMMON_DROPDOWN } from "./APIRoutes"
import { fetchData } from "./Helper"
import * as Elements from "./Elements";

function Filter({ setQuery, filterItem, selectFilter }) {
    const loaded = useRef(false)
    const [dropDownData, setDropDownData] = useState(null)
    const [selectFilterField, setSelectFilterField] = useState([])
    const [selectedDropDownData, setSelectedDropDownData] = useState(null)
    const [search, setSearch] = useState("")

    useEffect(() => {
        if (!loaded.current) {
            loaded.current = true;
            filterItem.forEach(element => {
                fetchData(`${COMMON_DROPDOWN}?type=${element}`, 'GET', '', true, false, (res) => {
                    if (res.status) {
                        setDropDownData(prev => ({ ...prev, [element]: res.data }));
                    }
                })
            });
            setSelectFilterField(selectFilter ?? [])
            setSearch("");
            setSelectedDropDownData(null)
        }
    }, [filterItem, selectFilter])

    const resetFilter = () => {
        setQuery("");
        setSearch("");
        setSelectedDropDownData(null)
    }

    useEffect(() => {
        if (loaded.current) {
            let query = ""
            for (let data in selectedDropDownData) {
                if (selectedDropDownData[data]) {
                    query += `${data}=${selectedDropDownData[data].value}&`
                }
            }
            query = `${query}search=${search}`
            setQuery(query)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, selectedDropDownData])

    return (<>
        <div className="col-xl-3 col-lg-4">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex mb-3">
                        <div className="flex-grow-1">
                            <h5 className="fs-16">Filters</h5>
                        </div>
                        <div className="flex-shrink-0">
                            <button className="btn btn-soft-danger mt-3" id="clearall" onClick={resetFilter}>Clear All</button>
                        </div>
                    </div>
                    <div className="filter-choices-input">
                        <input className="form-control" type="text" id="filter-choices-input" name="search" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="accordion accordion-flush filter-accordion">
                    <div className="card-body border-bottom">
                        {selectFilterField.map((item, key) => {
                            return <div key={key} className="formCost align-items-center mt-3">
                                <label htmlFor={item.key} className="form-label">{item.value}</label>
                                <Elements.ReactSelect
                                    placeholder={`Select ${item.value}`}
                                    id={item.key}
                                    isClearable
                                    className="react-select required"
                                    label={item.value}
                                    name={item.key}
                                    isMulti={item.multi ? true : false}
                                    value={selectedDropDownData && selectedDropDownData[item.key] ? selectedDropDownData[item.key] : null}
                                    options={dropDownData && dropDownData[item.key] ? dropDownData[item.key] : []}
                                    onChange={(e) => setSelectedDropDownData(prev => ({ ...prev, [item.key]: e }))} />
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}

export default Filter;
