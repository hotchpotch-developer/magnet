import { useEffect, useState } from "react";
import { ADD_STATE, DELETE_STATE, EDIT_STATE, STATE_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const State = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ state_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: STATE_LIST,
        dt_name: 'state-list',
        dt_export: true,
        dt_order: 1,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'State Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addState" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit State">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#stateConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete State">
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
        document.getElementById('addState').addEventListener('show.bs.modal', function () {
            initialFormState('state-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'state' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, STATE_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'state-form')) {
            setLoader(true)
            let api_url = ADD_STATE;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_STATE;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('state-form', setFormData)
                    document.querySelector('#addState [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, state_name: data.name }));
    }

    const deleteState = () => {
        setLoader(true)
        fetchData(`${DELETE_STATE}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#stateConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addState" data-bs-toggle="modal" title="Add State">
                    <i className="ri-add-fill fs-5"></i>Add State
                </button>
            </div>
            <Datatables dt_name="state-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addState" title={`${edit ? 'Update State' : 'Add State'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="state-form">
                <form className="needs-validation" noValidate id="state-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="state_name" className="form-label">State Name</label>
                            <input type="text" className="form-control" id="state_name" name="state_name" value={formData.state_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter State name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="stateConfirmationModal" action={deleteState} />
        </>

    )

}
export default State;