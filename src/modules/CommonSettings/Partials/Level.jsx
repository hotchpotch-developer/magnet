import { useEffect, useState } from "react";
import { ADD_LEVEL, DELETE_LEVEL, EDIT_LEVEL, LEVEL_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Level = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ level_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: LEVEL_LIST,
        dt_name: 'level-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Level Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addLevel" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Level">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#levelConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Level">
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
        document.getElementById('addLevel').addEventListener('show.bs.modal', function () {
            initialFormState('level-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'level' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, LEVEL_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'level-form')) {
            setLoader(true)
            let api_url = ADD_LEVEL;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_LEVEL;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('level-form', setFormData)
                    document.querySelector('#addLevel [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, level_name: data.name }));
    }

    const deleteLevel = () => {
        setLoader(true)
        fetchData(`${DELETE_LEVEL}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#levelConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addLevel" data-bs-toggle="modal" title="Add Level">
                    <i className="ri-add-fill fs-5"></i>Add Level
                </button>
            </div>
            <Datatables dt_name="level-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addLevel" title={`${edit ? 'Update Level' : 'Add Level'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="level-form">
                <form className="needs-validation" noValidate id="level-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="level_name" className="form-label">Level Name</label>
                            <input type="text" className="form-control" id="level_name" name="level_name" value={formData.level_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Level name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="levelConfirmationModal" action={deleteLevel} />
        </>

    )

}
export default Level;