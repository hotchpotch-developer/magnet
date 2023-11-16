import { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client"
import Datatables, { reloadUrlDataTable } from "../../components/Datatables";
import { ASSIGN_PERMISSION, COMMON_DROPDOWN, DELETE_TEAM, DIRECT_LOGIN, TEAM_LIST } from "../../components/APIRoutes";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../../components/Breadcrumbs";
import RoleFilter from "./RoleFilter";
import { fetchData, initialFormState, validateForm } from "../../components/Helper";
import { now } from "lodash";
import * as Elements from "../../components/Elements";
import { Context } from "../../components/Context";

const TeamList = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState('all');
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)
    const [context] = useContext(Context)
    const [selectPermission, setSelectPermission] = useState([])
    const [permissionList, setPermissionList] = useState([])
    const [loader, setLoader] = useState(false)
    const [teamId, setTeamId] = useState(false)

    const viewProfile = (data) => {
        navigate('/team-profile', { state: data })
    }

    const [dt] = useState({
        dt_url: role ? `${TEAM_LIST}?type=${role}` : `${TEAM_LIST}`,
        dt_name: 'team-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'first_name', name: 'first_name', title: 'First Name' },
            { data: 'last_name', name: 'last_name', title: 'Last Name' },
            { data: 'phone', name: 'phone', title: 'Phone' },
            { data: 'email', name: 'email', title: 'Email' },
            { data: 'reporting_user_name.first_name', name: 'reporting_user_name', title: 'Reporting Manager' },
            { data: 'roles_name', name: 'roles.name', title: 'Role' },
            { data: 'status', name: 'status', title: 'Status' },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 5,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render (
                        <>
                            <div className="d-flex text-nowrap">
                                <span>
                                    {records && records.reporting_user_name && records.reporting_user_name.first_name+' '+records.reporting_user_name.last_name}
                                </span>
                            </div>
                        </>
                    )
                }
            },
            {
                targets: 8,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-warning" data-bs-target="#assignPermission" data-bs-toggle="modal" onClick={() => editAssignPermission(records)} title="Assign Permission">
                                    <i className="ri-user-star-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-success ms-2" title="Edit" onClick={() => editTeam(records)}>
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-primary ms-2" title="View Profile" onClick={() => viewProfile(records)}>
                                    <i className="ri-eye-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-info ms-2" title="View Attendance" onClick={() => viewCalender(records)}>
                                    <i className="ri-calendar-event-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#teamConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Team">
                                    <i className="ri-delete-bin-line fs-5"></i>
                                </button>
                                {context && context.auth && context.auth.role_id === "1" && <>
                                    <button type="button" className="btn btn-sm btn-soft-info ms-2" onClick={() => directLogin(records.id)} title="Direct Login">
                                        <i className="ri-login-circle-line fs-5"></i>
                                    </button>
                                </>}
                            </div>
                        </>
                    )
                }
            }
        ],
        dt_filter: () => {
            createRoot(document.querySelector(`#wt_datatable_team-list_wrapper .dt-custom-filter`)).render(<>
                <RoleFilter setValue={setRole} />
            </>)
        }
    });

    const editTeam = (data) => {
        navigate('/edit-team', { state: { team: data } });
    }

    const viewCalender = (data) => {
        navigate('/view-calender', { state: { team: data } });
    }

    useEffect(() => {
        let url = role ? `${TEAM_LIST}?type=${role}` : `${TEAM_LIST}`;
        reloadUrlDataTable(dt, url);
    }, [dt, role, reload])

    const deleteTeam = () => {
        fetchData(`${DELETE_TEAM}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#teamConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }

    const directLogin = (id) => {
        fetchData(`${DIRECT_LOGIN}?id=${id}`, 'GET', '', true, false, (res) => {
            if (res.status) {
                let token = localStorage.getItem('accessToken')
                localStorage.setItem('admin-accessToken', token)
                localStorage.setItem('accessToken', res.data.accessToken)
                window.location.replace('/')
            }
        })
    }

    const editAssignPermission = (data) => {
        fetchData(`${COMMON_DROPDOWN}?type=permission`, 'GET', '', true, false, (res) => {
            if (res.status) {
                if (res.data && res.data.length > 0) {
                    setPermissionList(res.data)
                    setTeamId(data.id);
                    setSelectPermission(data.permissions);
                }
            }
        })
    }
    console.log(permissionList, selectPermission);

    const updatePermission = (e) => {
        e.preventDefault();

        if (validateForm(e, 'assignUpdatePermission')) {
            setLoader(true)

            let formData = new FormData(document.getElementById('assignUpdatePermission'));
            formData.append('user_id', teamId)

            fetchData(ASSIGN_PERMISSION, 'POST', formData, true, true, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('assignUpdatePermission')
                    setSelectPermission([])
                    setTeamId(false)
                    setReload(now)
                    document.querySelector('#assignPermission [data-bs-dismiss="modal"]').click()
                }
            })
        }
    }

    return (

        <>
            <Breadcrumbs title="THEMAGNETS - TEAM" parentPage="Teams" />
            <Datatables dt_name="team-list" dataPageLength="15" />
            <Elements.ConfirmationModal modalId="teamConfirmationModal" action={deleteTeam} />

            <Elements.ModalSection modalId="assignPermission" title={'Assign Permission'} btnTitle="Save Changes" loading={loader} action={(e) => updatePermission(e)} formId="assignUpdatePermission">
                <form className="needs-validation" noValidate id="assignUpdatePermission">
                    <div className="row gy-4">
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

    )

}
export default TeamList;