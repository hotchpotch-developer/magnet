import { useContext, useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import Datatables, { redrawDataTable } from "../../components/Datatables";
import { now } from 'lodash';
import { ASSIGN_PERMISSION, COMMON_DROPDOWN, CREATE_ROLE, EDIT_ROLE, ROLE_LIST } from "../../components/APIRoutes";
import { Context } from '../../components/Context'
import { createRoot } from "react-dom/client"
import * as Elements from "../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";

const ManageRoles = () => {
    
    const [context] = useContext(Context)
    const [reload, setReload] = useState(now);
    const [loader, setLoader] = useState(false)
    const [editData, setEditData] = useState(false)
    const [selectPermission, setSelectPermission] = useState([])
    const [permissionList, setPermissionList] = useState([])

    const [dt] = useState({
        dt_url: ROLE_LIST,
        dt_name: 'role-List',
        dt_export: true,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Role Name', class: "text-nowrap minw-130px" },    
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate minw-100px", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                            <>
                                <div className="d-flex text-nowrap">
                                    <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addRole" data-bs-toggle="modal" onClick={() => setEditData(records)} title="Edit Role">
                                        <i className="ri-pencil-fill fs-5"></i>
                                    </button>
                                    <button type="button" className="btn btn-sm btn-soft-warning ms-2" data-bs-target="#assignPermission" data-bs-toggle="modal" onClick={() => editAssignPermission(records)} title="Assign Permission">
                                        <i className="ri-user-star-fill fs-5"></i>
                                    </button>
                                </div>
                            </>
                    ) 
                }
            }
        ]
    });



    const saveUpdateRole = (e) => {
        e.preventDefault()

        if(validateForm(e, 'addUpdateRole')){
            setLoader(true)
            let formData = new FormData(document.getElementById('addUpdateRole'));
        
            editData && formData.append('id', editData.id)

            fetchData(editData ? EDIT_ROLE : CREATE_ROLE, 'POST', formData, true, true, (res) => {
                setLoader(false)
                if(res.status){
                    initialFormState('addUpdateRole')
                    document.querySelector('#addRole [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const editAssignPermission = (data) => {
        setEditData(data)
        fetchData(`${COMMON_DROPDOWN}?type=permission`, 'GET', '', true, false, (res) => {
            if(res.status){
                if(res.data && res.data.length > 0){
                    setPermissionList(res.data)
                    setSelectPermission(data.permissions);
                }
            }
        })
    }

    const updatePermission = (e) => {
        e.preventDefault();

        if (validateForm(e, 'assignUpdatePermission')) {
            setLoader(true)

            let formData = new FormData(document.getElementById('assignUpdatePermission'));

            fetchData(ASSIGN_PERMISSION, 'POST', formData, true, true, (res) => {
                setLoader(false)
                if(res.status) {
                    initialFormState('assignUpdatePermission')
                    setSelectPermission([])
                    setReload(now)
                    document.querySelector('#assignPermission [data-bs-dismiss="modal"]').click()                    
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
            <Breadcrumbs title="Manage Roles" parentPage="Permission" />
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addRole" data-bs-toggle="modal" title="Add Role">
                    <i className="ri-add-fill fs-5"></i>Add Role
                </button>
            </div>
            <Datatables dt_name="role-List" dataPageLength="15"  />
            <Elements.ModalSection modalId="addRole" title={`${editData ? 'Update Role' : 'Add Role'}`} btnTitle={`${editData ? 'Update' : 'Save'}`} action={(e) => saveUpdateRole(e)} loading={loader} formId="addUpdateRole">
                <form className="needs-validation" noValidate id="addUpdateRole">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="role_name" className="form-label">Role Name</label>
                            <input type="text" className="form-control" id="role_name" name="role_name" defaultValue={editData ? editData.name : ''}  required />
                            <div className="invalid-feedback">Please Enter Role name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ModalSection modalId="assignPermission" title={'Assign Permission'} btnTitle="Save Changes" loading={loader} action={(e) => updatePermission(e)} formId="assignUpdatePermission">
                <form className="needs-validation" noValidate id="assignUpdatePermission">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="role_name" className="form-label">Role</label>
                            <input type="text" className="form-control" readOnly id="role_name" name="role_name" defaultValue={editData ? editData.name : ''}  required />
                            <input type="hidden" name="role_id" value={editData && editData.id} />
                            <div className="invalid-feedback">Please Enter Role name.</div>
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="role_name" className="form-label">Permission</label>
                            <Elements.ReactSelect 
                                placeholder="Select Permission"
                                options={permissionList} 
                                name="permission_name[]" 
                                id="permission_name"
                                value={selectPermission}
                                isMulti={true}
                                isClearable={true}
                                closeMenuOnSelect={false}
                                isSearchable
                                className="react-select required"
                                onChange={(e) => { Elements.reactSelectValidation(e, "permission_name"); setSelectPermission(e ?? []) }}
                                required={true}
                            />
                            <div className="invalid-feedback">Please choose permission.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
        </>
    );

}
export default ManageRoles;