import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client"
import Datatables, { reloadUrlDataTable } from "../../components/Datatables";
import { DELETE_TEAM, TEAM_LIST } from "../../components/APIRoutes";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import RoleFilter from "./RoleFilter";
import { fetchData } from "../../components/Helper";
import { now } from "lodash";
import * as Elements from "../../components/Elements";

const TeamList = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    // const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const viewProfile = () => {
        navigate('/team-profile');
    }

    const [dt] = useState({
        dt_url: TEAM_LIST,
        dt_name: 'team-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'first_name', name: 'first_name', title: 'First Name' },
            { data: 'last_name', name: 'last_name', title: 'Last Name' },
            { data: 'phone', name: 'phone', title: 'Phone' },
            { data: 'email', name: 'email', title: 'Email' },
            { data: 'roles_name', name: 'roles.name', title: 'Role' },
            { data: 'status', name: 'status', title: 'Status' },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 7,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-soft-success" title="Edit" onClick={() => editTeam(records)}>
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-soft-primary ms-2" title="View Profile" onClick={() => viewProfile(records)}>
                                    <i className="ri-eye-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-soft-danger ms-2" data-bs-target="#teamConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Team">
                                    <i className="ri-delete-bin-line fs-5"></i>
                                </button>
                            </div>
                        </>
                    )
                }
            }
        ],
        dt_filter: () => {
            createRoot(document.querySelector(`#wt_datatable_team-list_wrapper .dt-custom-filter`)).render(<>
                <RoleFilter setValue={setRole} />
            </>)
        }
    });

    const editTeam = (data) => {
        navigate('/edit-team', { state: { team: data } });
    }

    useEffect(() => {
        let url = role ? `${TEAM_LIST}?type=${role}` : TEAM_LIST;
        reloadUrlDataTable(dt, url);
    }, [dt, role, reload])

    const deleteTeam = () => {
        // setLoader(true)
        fetchData(`${DELETE_TEAM}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            // setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#teamConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }

    return (

        <>
            <Breadcrumbs title="Team List" parentPage="Teams" />
            <Datatables dt_name="team-list" dataPageLength="15" />
            <Elements.ConfirmationModal modalId="teamConfirmationModal" action={deleteTeam} />
        </>

    )

}
export default TeamList;