import { useEffect, useState } from "react";
import { ADD_SOURCE, DELETE_SOURCE, EDIT_SOURCE, SOURCE_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Source = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ source: "", source_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: SOURCE_LIST,
        dt_name: 'source-List',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
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
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addSource" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Source">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#sourceConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Source">
                                    <i className="ri-delete-bin-line fs-5"></i>
                                </button>
                            </div>
                        </>
                    )
                }
            }
        ]
    });

    useEffect(() => {
        document.getElementById('addSource').addEventListener('show.bs.modal', function () {
            initialFormState('source-form', setFormData)
            setEdit(false);
        })
    }, [])

    useEffect(() => {
        if (props.activeTab === 'source' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, SOURCE_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'source-form')) {
            setLoader(true)
            let api_url = ADD_SOURCE;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_SOURCE;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('source-form', setFormData)
                    document.querySelector('#addSource [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, source: data.source, source_name: data.source_name }));
    }

    const deleteSource = () => {
        setLoader(true)
        fetchData(`${DELETE_SOURCE}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#sourceConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addSource" data-bs-toggle="modal" title="Add Source">
                    <i className="ri-add-fill fs-5"></i>Add Source
                </button>
            </div>
            <Datatables dt_name="source-List" dataPageLength="15" />
            <Elements.ModalSection modalId="addSource" title={`${edit ? 'Update Source' : 'Add Source'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="source-form">
                <form className="needs-validation" noValidate id="source-form">
                    <div className="row gy-4">
                    <div className="col-md-12">
                            <label htmlFor="source" className="form-label">Source</label>
                            <input type="text" className="form-control" id="source" name="source" value={formData.source} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Source.</div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="source_name" className="form-label">Source Name</label>
                            <input type="text" className="form-control" id="source_name" name="source_name" value={formData.source_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Source name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="sourceConfirmationModal" action={deleteSource} />
        </>

    )

}
export default Source;