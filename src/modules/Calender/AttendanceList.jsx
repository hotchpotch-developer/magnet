import { useEffect, useState } from "react";
import { ATTENDANCE_LIST } from "../../components/APIRoutes";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { reloadUrlDataTable } from "../../components/Datatables";
import { createRoot } from "react-dom/client";
import { startCase } from "lodash";

function AttendanceList() {

    const [dt] = useState({
        dt_url: ATTENDANCE_LIST,
        dt_name: 'attendance-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'user_data.first_name', name: 'first_name', title: 'Name', sortable: false, searchable: false, orderable: false },
            { data: 'type', name: 'type', title: 'Type' },
            { data: 'description', name: 'description', title: 'Description' },
        ],
        dt_column_defs: [
            {
                targets: 1,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(`${records.user_data.first_name} ${records.user_data.last_name}`)
                }
            },
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(startCase(records.type))
                }
            }
        ]
    });

    useEffect(() => {
        reloadUrlDataTable(dt, ATTENDANCE_LIST);
    }, [dt])

    return (<>
        <Breadcrumbs title="Attendance List" parentPage="" />
        <Datatables dt_name="attendance-list" dataPageLength="15" />
    </>
    );
}

export default AttendanceList;