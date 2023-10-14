import Breadcrumbs from "../../components/Breadcrumbs"
import JobFilter from "./Partials/JobFilter";
import { useEffect, useState } from "react";
import { JOB_LIST } from "../../components/APIRoutes";
import { fetchData } from "../../components/Helper";
import JobItem from "./Partials/JobItem";
const JobList = () => {
    const [jobs, setJobs] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData(`${JOB_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setJobs(res)
        })
    }, [query])

    return (
        <>
            <Breadcrumbs title="Manage Jobs" parentPage="Post Job" />
            <div className="row">
                <JobFilter setQuery={setQuery} />
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