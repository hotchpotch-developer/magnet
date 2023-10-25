import Breadcrumbs from "../../components/Breadcrumbs"
import { useEffect, useState } from "react";
import { CANDIDATE_LIST } from "../../components/APIRoutes";
import { fetchData } from "../../components/Helper";
import CandidateFilter from "./Partials/CandidateFilter";
import CandidateItem from "./Partials/CandidateItem";

const CandidateList = () => {
    const [candidates, setCandidates] = useState(false)
    const [query, setQuery] = useState("")

    useEffect(() => {
        fetchData(`${CANDIDATE_LIST}?${query}`, 'GET', '', true, false, (res) => {
            setCandidates(res)
        })
    }, [query])

    return (
        <>
            <Breadcrumbs title="Candidate List" parentPage="Candidate List" />
            <div className="row">
                <CandidateFilter setQuery={setQuery} />
                <div className="col-xl-9 col-lg-8">
                    {candidates && candidates.data && candidates.data.length > 0 && candidates.data.map((item, key) => {
                        return <CandidateItem item={item} key={key} />
                    })}
                </div>
            </div>
        </>
    )

}

export default CandidateList;