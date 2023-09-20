import { useEffect, useState } from "react";
import { INDUSTRY_LIST } from "../../../components/APIRoutes";
import Datatables, { redrawDataTable, reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"

const Industry = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);

    const [dt] = useState({
        dt_url: INDUSTRY_LIST,
        dt_name: 'industry-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Industry Name', class: "text-nowrap minw-130px" },
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
        if (props.activeTab === 'industry' && !initDataTable) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, INDUSTRY_LIST);
        }else{
            redrawDataTable(dt)
        }

    }, [dt, props.activeTab, initDataTable])

    return (

        <>
            <Datatables dt_name="industry-list" dataPageLength="15" />
        </>

    )

}
export default Industry;