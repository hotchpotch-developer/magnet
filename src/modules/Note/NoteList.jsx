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
    const ASSET_URL = process.env.REACT_APP_API_URL
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [details, setDetails] = useState(null)

    const [dt] = useState({
        dt_url: NOTE_LIST,
        dt_name: 'note-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'companies.label', name: 'companies.label', title: 'Company Name' },
            { data: 'subject', name: 'subject', title: 'Subject' },
            { data: 'remark', name: 'remark', title: 'Remark', class: "w-300px" },
            { data: 'document', name: 'document', title: 'Document', class: "w-100px", sortable: false, searchable: false, orderable: false },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 1,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <span>
                                    {records?.companies?.label}
                                </span>
                            </div>
                        </>
                    )
                }
            },
            {
                targets: 3,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-truncate" dangerouslySetInnerHTML={{ __html: records.remark }}></div>
                        </>
                    )
                }
            },
            {
                targets: 4,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <a href={ASSET_URL+records.document} target="_blanks"><i className="mdi mdi-file-document"></i></a>
                        </>
                    )
                }
            },
            {
                targets: 5,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-primary me-2" title="View Details" data-bs-target="#noteDetailsModal" data-bs-toggle="modal" onClick={() => setDetails(records)}>
                                    <i className="ri-eye-fill fs-5"></i>
                                </button>
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
            <div id="noteDetailsModal" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="noteDetailsModal" aria-hidden="true" style={{ display: 'none' }} data-bs-backdrop="static" >
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="noteDetailsModal">Note Details</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {details && <>
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <b className="text-black me-4">Company Name:</b><span>{details?.companies?.label}</span>
                                    </div>
                                    <div className="col-sm-6">
                                        <b className="text-black me-4">Subject:</b><span>{details?.subject}</span>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-sm-12">
                                        <b className="text-black me-4">Document:</b>
                                        <span><a href={ASSET_URL+details.document} target="_blanks"><i className="mdi mdi-file-document"></i> click here for view</a></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12"><b className="text-black me-4">Remark:</b></div>
                                    <div className="" dangerouslySetInnerHTML={{ __html: details.remark }}></div>
                                </div>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default NoteList;