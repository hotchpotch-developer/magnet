import { useEffect, useState } from "react";
import { REMARK_LIST } from "../../../components/APIRoutes";
import Datatables, { redrawDataTable, reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"

const Remark = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);

    const [dt] = useState({
        dt_url: REMARK_LIST,
        dt_name: 'remark-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'remark', name: 'remark', title: 'Remark', class: "text-nowrap minw-130px" },
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
        if (props.activeTab === 'remark' && !initDataTable) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, REMARK_LIST);
        }else{
            redrawDataTable(dt)
        }

    }, [dt, props.activeTab, initDataTable])

    return (

        <>
            <Datatables dt_name="remark-list" dataPageLength="15" />
        </>

    )

}
export default Remark;