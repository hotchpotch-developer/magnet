import { useEffect, useState } from "react";
import { ADD_INDUSTRY, DELETE_INDUSTRY, EDIT_INDUSTRY, INDUSTRY_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Industry = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ industry_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: INDUSTRY_LIST,
        dt_name: 'industry-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Industry Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addIndustry" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Industry">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#industryConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Industry">
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
        document.getElementById('addIndustry').addEventListener('show.bs.modal', function () {
            initialFormState('industry-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'industry' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, INDUSTRY_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'industry-form')) {
            setLoader(true)
            let api_url = ADD_INDUSTRY;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_INDUSTRY;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('industry-form', setFormData)
                    document.querySelector('#addIndustry [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, industry_name: data.name }));
    }

    const deleteIndustry = () => {
        setLoader(true)
        fetchData(`${DELETE_INDUSTRY}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#industryConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addIndustry" data-bs-toggle="modal" title="Add Industry">
                    <i className="ri-add-fill fs-5"></i>Add Industry
                </button>
            </div>
            <Datatables dt_name="industry-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addIndustry" title={`${edit ? 'Update Industry' : 'Add Industry'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="industry-form">
                <form className="needs-validation" noValidate id="industry-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="industry_name" className="form-label">Industry Name</label>
                            <input type="text" className="form-control" id="industry_name" name="industry_name" value={formData.industry_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Industry name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="industryConfirmationModal" action={deleteIndustry} />
        </>

    )

}
export default Industry;