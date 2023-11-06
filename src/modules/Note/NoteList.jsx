import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import * as Elements from "../../components/Elements";
import { DELETE_NOTE, NOTE_LIST } from "../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../components/Datatables";
import { createRoot } from "react-dom/client";
import { fetchData } from "../../components/Helper";
import { now } from "lodash";


const NoteList = () => {
    const navigate = useNavigate();
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: NOTE_LIST,
        dt_name: 'note-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'subject', name: 'subject', title: 'Subject' },
            { data: 'company_name', name: 'company_name', title: 'Company Name' },
            { data: 'remark', name: 'remark', title: 'Remark' },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 3,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div dangerouslySetInnerHTML={{__html: records.remark}}></div>
                        </>
                    )
                }
            },
            {
                targets: 4,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" title="Edit Note" onClick={() => editNote(records)}>
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#noteConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Note">
                                    <i className="ri-delete-bin-line fs-5"></i>
                                </button>
                            </div>
                        </>
                    )
                }
            }
        ]
    });

    const editNote = (data) => {
        navigate('/edit-note', { state: { note: data } });
    }

    useEffect(() => {
        reloadUrlDataTable(dt, NOTE_LIST);
    }, [dt, reload])

    const deleteNote = () => {
        fetchData(`${DELETE_NOTE}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#noteConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now())
            }
        })
    }


    return (
        <>
            <Breadcrumbs title="Note List" parentPage="Notes" />
            <Datatables dt_name="note-list" dataPageLength="15" />
            <Elements.ConfirmationModal modalId="noteConfirmationModal" action={deleteNote} />
        </>
    )

}

export default NoteList;