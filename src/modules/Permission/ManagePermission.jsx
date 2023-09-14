import { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable } from "../../components/Datatables";
import { Context } from "../../components/Context";
import { now } from "lodash";
import { createRoot } from "react-dom/client";
import { CREATE_PERMISSION, DELETE_PERMISSION, EDIT_PERMISSION, PERMISSION_LIST } from "../../components/APIRoutes";
import $ from 'jquery'
import * as Elements from "../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";

const ManagePermission = () => {

    const [context] = useState(Context)
    const [reload, setReload] = useState(now)
    const [editData, setEditData] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [loader, setLoader] = useState(false)

    const [dt] = useState({
        dt_url: PERMISSION_LIST,
        dt_name: 'permission-List',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
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
                                    <button type="button" className="btn btn-soft-success" data-bs-target="#addPermission" data-bs-toggle="modal" onClick={() => setEditData(records)}>
                                        <i className="ri-pencil-fill"></i>
                                    </button>

                                    <button type="button" className="btn btn-soft-danger ms-2" data-bs-target="#confirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)}>
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </>
                    ) 
                }
            }
        ]
    });

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

    const deletePermission = () => {
        if(deleteRecord) {
            setLoader(true)
            fetchData(`${DELETE_PERMISSION}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
                setLoader(false)
                if(res.status){
                    setDeleteRecord(false)
                    document.querySelector('#confirmationModal [data-bs-dismiss="modal"]').click()
                    setReload(now)
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

        {(!$('.dt-custom-filter button').hasClass('add-new')) &&
            $('.dt-custom-filter').append(`<button type="button" class="btn btn-sm btn-info add-btn add-new me-3" onclick="resetData()" data-bs-toggle="modal" data-bs-target="#addPermission" >
                <i class="ri-user-add-line"></i> Add New
            </button>`)
        }
    }, [dt, reload, context])

    return (
        <>
            <Breadcrumbs title="Manage Permission" parentPage="Permission"  />
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
            <Elements.ConfirmationModal action={() => deletePermission()} />
        </>
    )

}

export default ManagePermission;