import Breadcrumbs from "../../components/Breadcrumbs"
import { useEffect, useState } from "react";
import { JOB_EXPORT, JOB_LIST } from "../../components/APIRoutes";
import { downloadFile, fetchData } from "../../components/Helper";
import JobItem from "./Partials/JobItem";
import Filter from "../../components/Filter";
const JobList = () => {
    const [jobs, setJobs] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData(`${JOB_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setJobs(res)
        })
    }, [query])

    const exportJob = () => {
        fetchData(JOB_EXPORT, "GET", "", true, false, (file) => {
            downloadFile(file, `team`)
        }, false, 'blob')
    }

    return (
        <>
            <Breadcrumbs title="Manage Jobs" parentPage="Post Job" />
            <div className="row mb-2">
                <div className="text-end">
                    <button type="button" className="btn btn-sm btn-primary me-2" onClick={exportJob} title="Job Export">
                        Job Export
                    </button>
                </div>
            </div>
            <div className="row">
                <Filter setQuery={setQuery}
                    filterItem={['state', 'location', 'industry', 'company', 'sales_non_sales', 'department', 'channel', 'level', 'product']}
                    selectFilter={[
                        { key: "state", value: "State" },
                        { key: "location", value: "Location" },
                        { key: "industry", value: "Industry" },
                        { key: "company", value: "Company" },
                        { key: "sales_non_sales", value: "Sales/Non Sales" },
                        { key: "department", value: "Department" },
                        { key: "channel", value: "Channel" },
                        { key: "level", value: "Level" },
                        { key: "product", value: "Product" },
                    ]}
                />
                <div className="col-xl-9 col-lg-8">
                    {jobs && jobs.data && jobs.data.length > 0 && jobs.data.map((item, key) => {
                        return <JobItem item={item} key={key} />
                    })}
                </div>
            </div>
        </>
    )

}

export default JobList;