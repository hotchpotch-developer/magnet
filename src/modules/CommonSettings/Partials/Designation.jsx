import { useEffect, useState } from "react";
import { ADD_DESIGNATION, DELETE_DESIGNATION, DESIGNATION_LIST, EDIT_DESIGNATION } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Designation = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ designation_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: DESIGNATION_LIST,
        dt_name: 'designation-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Designation Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addDesignation" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Designation">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#designationConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Designation">
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
        document.getElementById('addDesignation').addEventListener('show.bs.modal', function () {
            initialFormState('designation-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'designation' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, DESIGNATION_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'designation-form')) {
            setLoader(true)
            let api_url = ADD_DESIGNATION;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_DESIGNATION;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('designation-form', setFormData)
                    document.querySelector('#addDesignation [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, designation_name: data.name }));
    }

    const deleteDesignation = () => {
        setLoader(true)
        fetchData(`${DELETE_DESIGNATION}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#designationConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addDesignation" data-bs-toggle="modal" title="Add Designation">
                    <i className="ri-add-fill fs-5"></i>Add Designation
                </button>
            </div>
            <Datatables dt_name="designation-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addDesignation" title={`${edit ? 'Update Designation' : 'Add Designation'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="designation-form">
                <form className="needs-validation" noValidate id="designation-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="designation_name" className="form-label">Designation Name</label>
                            <input type="text" className="form-control" id="designation_name" name="designation_name" value={formData.designation_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Designation name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="designationConfirmationModal" action={deleteDesignation} />
        </>

    )

}
export default Designation;