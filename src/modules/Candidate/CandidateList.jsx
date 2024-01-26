import Breadcrumbs from "../../components/Breadcrumbs"
import { useEffect, useState } from "react";
import { CANDIDATE_EXPORT, CANDIDATE_LIST } from "../../components/APIRoutes";
import { downloadFile, fetchData } from "../../components/Helper";
import CandidateItem from "./Partials/CandidateItem";
import Filter from "../../components/Filter";
import NoRecord from "../../components/NoRecord";
import moment from "moment";

const CandidateList = () => {
    const [candidates, setCandidates] = useState(false)
    const [query, setQuery] = useState("")
    const [ids, setIds] = useState([])

    useEffect(() => {
        fetchData(`${CANDIDATE_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setCandidates(res)
        })
    }, [query])

    const exportCandidate = () => {
        let date = moment().format('DDMMYYYY');
        fetchData(`${CANDIDATE_EXPORT}?candidate_id=${ids}`, "GET", "", true, false, (file) => {
            downloadFile(file, `CandidateList-${date}`)
        }, false, 'blob')
    }

    return (
        <>
            <Breadcrumbs title="Candidate List" parentPage="Candidates" />
            <div className="row mb-2">
                <div className="text-end">
                    <button type="button" className="btn btn-sm btn-primary me-2" onClick={exportCandidate} title="Candidate Export">
                        Candidate Export
                    </button>
                </div>
            </div>
            <div className="row">
                <Filter setQuery={setQuery}
                    filterItem={['state', 'location', 'industry', 'company', 'sales_no_sales', 'department', 'channel', 'level', 'product', 'experience', 'qualification']}
                    selectFilter={[
                        { key: "state", value: "State" },
                        { key: "location", value: "Location" },
                        { key: "industry", value: "Industry" },
                        { key: "company", value: "Company" },
                        { key: "sales_no_sales", value: "Sales/Non Sales" },
                        { key: "department", value: "Department" },
                        { key: "channel", value: "Channel" },
                        { key: "level", value: "Level" },
                        { key: "experience", value: "Experience" },
                        { key: "qualification", value: "Qualification" },
                    ]}
                />
                <div className="col-xl-9 col-lg-8">
                    {candidates && candidates.data && candidates.data.length > 0 ? candidates.data.map((item, key) => {
                        return <CandidateItem item={item} key={key} ids={ids} setIds={setIds} />
                        })
                    :

                        <NoRecord />
                    }
                </div>
            </div>
        </>
    )

}

export default CandidateList;