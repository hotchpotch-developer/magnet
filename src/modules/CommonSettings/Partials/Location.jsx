import { useEffect, useState } from "react";
import { LOCATION_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"

const Location = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);

    const [dt] = useState({
        dt_url: LOCATION_LIST,
        dt_name: 'location-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Location Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                            </div>
                        </>
                    )
                }
            }
        ]
    });

    useEffect(() => {
        if (props.activeTab === 'location' && !initDataTable) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, LOCATION_LIST);
        }

    }, [dt, props.activeTab, initDataTable])

    return (

        <>
            <Datatables dt_name="location-list" dataPageLength="15" />
        </>

    )

}
export default Location;