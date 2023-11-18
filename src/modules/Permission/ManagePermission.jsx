import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable } from "../../components/Datatables";
import { Context } from "../../components/Context";
import { now } from "lodash";
import { createRoot } from "react-dom/client";
import { CREATE_PERMISSION, EDIT_PERMISSION, PERMISSION_LIST } from "../../components/APIRoutes";
import * as Elements from "../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";

const ManagePermission = () => {

    const [context] = useState(Context)
    const [reload, setReload] = useState(now)
    const [editData, setEditData] = useState(false)
    const [loader, setLoader] = useState(false)

    const [dt] = useState({
        dt_url: PERMISSION_LIST,
        dt_name: 'permission-List',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Permission Name', class: "text-nowrap minw-130px" },    
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                            <>
                                <div className="d-flex text-nowrap">
                                    <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addPermission" data-bs-toggle="modal" onClick={() => setEditData(records)}>
                                        <i className="ri-pencil-fill"></i>
                                    </button>
                                </div>
                            </>
                    ) 
                }
            }
        ]
    });

    useEffect(() => {
        document.getElementById('addPermission').addEventListener('show.bs.modal', function () {
            initialFormState('addUpdatePermission')
            setEditData(false)
        })
    }, [])
    
    const saveUpdatePermission = (e) => {
        e.preventDefault();

        if(validateForm(e, 'addUpdatePermission')){
            setLoader(true)
            let formData = new FormData(document.getElementById('addUpdatePermission'));

            editData && formData.append('id', editData.id)

            fetchData(editData ? EDIT_PERMISSION : CREATE_PERMISSION, 'POST', formData, true, true, (res) => {
                setLoader(false)
                if(res.status) {
                    initialFormState('addUpdatePermission')
                    setReload(now)
                    document.querySelector('#addPermission [data-bs-dismiss="modal"]').click()
                }
            })
        }
    }

    window.resetData = () => {
        setEditData(false)
    }

    useEffect(() => {
        if (dt) {
            redrawDataTable(dt);
        }
    }, [dt, reload, context])

    return (
        <>
            <Breadcrumbs title="Manage Permission" parentPage="Permission"  />
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addPermission" data-bs-toggle="modal" title="Add Permission">
                    <i className="ri-add-fill fs-5"></i>Add Permission
                </button>
            </div>
            <Datatables dt_name="permission-List" dataPageLength="15"  />
            <Elements.ModalSection modalId="addPermission" title={`${editData ? 'Update Permission' : 'Add Permission'}`} btnTitle={`${editData ? 'Update' : 'Save'}`} action={(e) => saveUpdatePermission(e)} loading={loader} formId="addUpdatePermission">
                <form className="needs-validation" noValidate id="addUpdatePermission">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="permission_name" className="form-label">Permission Name</label>
                            <input type="text" className="form-control" id="permission_name" name="permission_name" defaultValue={editData ? editData.name : ''}  required />
                            <div className="invalid-feedback">Please Enter Permission name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
        </>
    )

}

export default ManagePermission;