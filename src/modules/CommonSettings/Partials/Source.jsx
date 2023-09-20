import { useEffect, useState } from "react";
import { SOURCE_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"

const Source = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);

    const [dt] = useState({
        dt_url: SOURCE_LIST,
        dt_name: 'source-List',
        dt_export: false,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'source', name: 'source', title: 'Source', class: "text-nowrap minw-130px" },
            { data: 'source_name', name: 'source_name', title: 'Source Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 3,
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
        if (props.activeTab === 'source' && !initDataTable) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, SOURCE_LIST);
        }

    }, [dt, props.activeTab, initDataTable])

    return (

        <>
            <Datatables dt_name="source-List" dataPageLength="15" />
        </>

    )

}
export default Source;