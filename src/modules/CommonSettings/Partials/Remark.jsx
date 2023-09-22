import { useEffect, useState } from "react";
import { ADD_REMARK, DELETE_REMARK, EDIT_REMARK, REMARK_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Remark = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ remark: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: REMARK_LIST,
        dt_name: 'remark-list',
        dt_export: false,
        dt_column: [
            { data: 'id', name: 'id', title: '#' },
            { data: 'remark', name: 'remark', title: 'Remark', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-soft-success" data-bs-target="#addRemark" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Remark">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-soft-danger ms-2" data-bs-target="#remarkConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Remark">
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
        document.getElementById('addRemark').addEventListener('show.bs.modal', function () {
            initialFormState('remark-form', setFormData)
        })
    }, [])

    useEffect(() => {
        if (props.activeTab === 'remark' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, REMARK_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'remark-form')) {
            setLoader(true)
            let api_url = ADD_REMARK;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_REMARK;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('remark-form', setFormData)
                    document.querySelector('#addRemark [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, remark: data.remark }));
    }

    const deleteRemark = () => {
        setLoader(true)
        fetchData(`${DELETE_REMARK}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#remarkConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }

    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addRemark" data-bs-toggle="modal" title="Add Remark">
                    <i className="ri-add-fill fs-5"></i>Add Remark
                </button>
            </div>
            <Datatables dt_name="remark-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addRemark" title={`${edit ? 'Update Remark' : 'Add Remark'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="remark-form">
                <form className="needs-validation" noValidate id="remark-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="remark" className="form-label">Remark Name</label>
                            <input type="text" className="form-control" id="remark" name="remark" value={formData.remark} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Remark name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="remarkConfirmationModal" action={deleteRemark} />
        </>

    )

}
export default Remark;