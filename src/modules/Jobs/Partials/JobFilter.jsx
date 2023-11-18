import { useEffect, useState } from "react"
import * as Elements from "../../../components/Elements";
import _ from "lodash";
import { COMMON_DROPDOWN } from "../../../components/APIRoutes";
import { fetchData } from "../../../components/Helper";

const JobFilter = ({ setQuery }) => {
    const commonDropdown = [
        { key: "state", value: "state" },
        { key: "location", value: "location" },
        { key: "industry", value: "industry" },
        { key: "company", value: "company" },
        { key: "sales_non_sales", value: "sales_no_sales" },
        { key: "department", value: "department" },
        { key: "channel", value: "channel" },
        { key: "level", value: "level" },
        { key: "product", value: "product" },
    ];

    const [dropDownData, setDropDownData] = useState({
        state: [],
        location: [],
        industry: [],
        company: [],
        sales_non_sales: [],
        department: [],
        channel: [],
        level: [],
        product: [],
    })

    const [selectedDropDownData, setSelectedDropDownData] = useState({
        state: null,
        location: null,
        industry: null,
        company: null,
        sales_non_sales: null,
        department: null,
        channel: null,
        level: null,
        product: null,
    })

    const [search, setSearch] = useState("")

    useEffect(() => {
        commonDropdown.forEach(element => {
            fetchData(`${COMMON_DROPDOWN}?type=${element.value}`, 'GET', '', true, false, (res) => {
                if (res.status) {
                    setDropDownData(prev => ({ ...prev, [element.key]: res.data }));
                }
            })
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const resetFilter = () => {
        setQuery("");
        setSearch("");
        setSelectedDropDownData({
            state: null,
            location: null,
            industry: null,
            company: null,
            sales_non_sales: null,
            department: null,
            channel: null,
            level: null,
            product: null,
        })
    }

    const handleSelectChange = (e, key) => {
        setSelectedDropDownData(prev => ({ ...prev, [key]: e }));
        filter()
    }

    const searchFilter = (e) => {
        setSearch(e.target.value);
    }

    const filter = (key, value) => {
        let query = ""
        for (let data in selectedDropDownData) {
            if (Array.isArray(selectedDropDownData[data])) {
                // query += `${selectedDropDownData}=${selectedDropDownData[data]}&`
            } else {
                query += `${selectedDropDownData}=${selectedDropDownData[data]}&`
            }
        }
        query = `${query}&search=${search}&${key}=${value}`
        setQuery(query)
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
                                <button className="btn btn-soft-danger mt-3" id="clearall" onClick={resetFilter}>Clear All</button>
                            </div>
                        </div>

                        <div className="filter-choices-input">
                            <input className="form-control" type="text" id="filter-choices-input" name="search" placeholder="Search Job Name..." value={search} onChange={searchFilter} />
                        </div>
                    </div>

                    <div className="accordion accordion-flush filter-accordion">
                        <div className="card-body border-bottom">
                            <ReactSelectField name="state" value={selectedDropDownData.state} options={dropDownData.state} onChange={(e) => handleSelectChange(e, 'state')} />
                            <ReactSelectField name="location[]" id="location" isMulti value={selectedDropDownData.location} options={dropDownData.location} onChange={(e) => handleSelectChange(e, 'location')} />
                            <ReactSelectField name="industry" value={selectedDropDownData.industry} options={dropDownData.industry} onChange={(e) => handleSelectChange(e, 'industry')} />
                            <ReactSelectField name="company" value={selectedDropDownData.company} options={dropDownData.company} onChange={(e) => handleSelectChange(e, 'company')} />
                            <ReactSelectField name="sales_non_sales" label="Sales/Non Sales" value={selectedDropDownData.sales_non_sales} options={dropDownData.sales_non_sales} onChange={(e) => handleSelectChange(e, 'sales_non_sales')} />
                            <ReactSelectField name="department" value={selectedDropDownData.department} options={dropDownData.department} onChange={(e) => handleSelectChange(e, 'department')} />
                            <ReactSelectField name="channel" value={selectedDropDownData.channel} options={dropDownData.channel} onChange={(e) => handleSelectChange(e, 'channel')} />
                            <ReactSelectField name="level" value={selectedDropDownData.level} options={dropDownData.level} onChange={(e) => handleSelectChange(e, 'level')} />
                            <ReactSelectField name="product" value={selectedDropDownData.product} options={dropDownData.product} onChange={(e) => handleSelectChange(e, 'product')} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobFilter;

const ReactSelectField = (props) => {

    return (<>
        <div className="formCost align-items-center mt-3">
            <label htmlFor={props.label ?? (props.id ?? props.name)} className="form-label">{props.label ?? _.startCase(props.name)}</label>
            <Elements.ReactSelect
                placeholder={`Select ${props.label ?? _.startCase(props.name)}`}
                name={props.name}
                id={props.id ?? props.name}
                className="react-select required"
                {...props}
            />
        </div>
    </>)
}