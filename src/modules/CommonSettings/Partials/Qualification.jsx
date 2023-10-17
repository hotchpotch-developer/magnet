import { useEffect, useState } from "react";
import { ADD_QUALIFICATION, QUALIFICATION_LIST, DELETE_QUALIFICATION, EDIT_QUALIFICATION } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Qualification = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: QUALIFICATION_LIST,
        dt_name: 'qualification-list',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Qualification Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addQualification" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Qualification">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#qualificationConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Qualification">
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
        document.getElementById('addQualification').addEventListener('show.bs.modal', function () {
            initialFormState('qualification-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'qualification' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, QUALIFICATION_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'qualification-form')) {
            setLoader(true)
            let api_url = ADD_QUALIFICATION;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_QUALIFICATION;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('qualification-form', setFormData)
                    document.querySelector('#addQualification [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, name: data.name }));
    }

    const deleteQualification = () => {
        setLoader(true)
        fetchData(`${DELETE_QUALIFICATION}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#qualificationConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addQualification" data-bs-toggle="modal" title="Add Qualification">
                    <i className="ri-add-fill fs-5"></i>Add Qualification
                </button>
            </div>
            <Datatables dt_name="qualification-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addQualification" title={`${edit ? 'Update Qualification' : 'Add Qualification'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="qualification-form">
                <form className="needs-validation" noValidate id="qualification-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">Qualification Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Qualification name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="qualificationConfirmationModal" action={deleteQualification} />
        </>

    )

}
export default Qualification;