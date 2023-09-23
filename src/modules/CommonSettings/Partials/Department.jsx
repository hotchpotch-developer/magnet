import { useEffect, useState } from "react";
import { ADD_DEPARTMENT, DELETE_DEPARTMENT, DEPARTMENT_LIST, EDIT_DEPARTMENT } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Department = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ department_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: DEPARTMENT_LIST,
        dt_name: 'department-list',
        dt_export: false,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Department Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-soft-success" data-bs-target="#addDepartment" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Department">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-soft-danger ms-2" data-bs-target="#departmentConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Department">
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
        document.getElementById('addDepartment').addEventListener('show.bs.modal', function () {
            initialFormState('department-form', setFormData)
        })
    }, [])

    useEffect(() => {
        if (props.activeTab === 'department' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, DEPARTMENT_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'department-form')) {
            setLoader(true)
            let api_url = ADD_DEPARTMENT;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_DEPARTMENT;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('department-form', setFormData)
                    document.querySelector('#addDepartment [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, department_name: data.name }));
    }

    const deleteDepartment = () => {
        setLoader(true)
        fetchData(`${DELETE_DEPARTMENT}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#departmentConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }

    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addDepartment" data-bs-toggle="modal" title="Add Department">
                    <i className="ri-add-fill fs-5"></i>Add Department
                </button>
            </div>
            <Datatables dt_name="department-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addDepartment" title={`${edit ? 'Update Department' : 'Add Department'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="department-form">
                <form className="needs-validation" noValidate id="department-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="department_name" className="form-label">Department Name</label>
                            <input type="text" className="form-control" id="department_name" name="department_name" value={formData.department_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Department name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="departmentConfirmationModal" action={deleteDepartment} />
        </>

    )

}
export default Department;