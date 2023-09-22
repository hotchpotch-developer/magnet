import { useEffect, useState } from "react";
import Datatables, { reloadUrlDataTable } from "../../components/Datatables";
import { TEAM_LIST } from "../../components/APIRoutes";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import { createRoot } from "react-dom/client";

const TeamList = () => {
    const location = useLocation();
    const role = location && location.state ? location.state.role : 'Admin';

    const [dt] = useState({
        dt_url: `${TEAM_LIST}?type=${role}`,
        dt_name: 'team-list',
        dt_export: false,
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
                                {/* <Link to="/add-team" state={{ team: records }} className="btn btn-soft-success" title="Edit"> Edit </Link> */}
                            </div>
                        </>
                    )
                }
            }
        ]
    });

    useEffect(() => {
        reloadUrlDataTable(dt, `${TEAM_LIST}?type=${role}`);
    }, [dt, role])

    return (

        <>
            <Breadcrumbs title={role} parentPage={role} />
            <Datatables dt_name="team-list" dataPageLength="15" />
        </>

    )

}
export default TeamList;