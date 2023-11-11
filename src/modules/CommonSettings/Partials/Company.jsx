import { useEffect, useState } from "react";
import { ADD_COMPANY, COMPANY_LIST, DELETE_COMPANY, EDIT_COMPANY } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Company = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ company_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: COMPANY_LIST,
        dt_name: 'company-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Company Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addCompany" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Company">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#companyConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Company">
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
        document.getElementById('addCompany').addEventListener('show.bs.modal', function () {
            initialFormState('company-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'company' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, COMPANY_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'company-form')) {
            setLoader(true)
            let api_url = ADD_COMPANY;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_COMPANY;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('company-form', setFormData)
                    document.querySelector('#addCompany [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, company_name: data.name }));
    }

    const deleteCompany = () => {
        setLoader(true)
        fetchData(`${DELETE_COMPANY}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#companyConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addCompany" data-bs-toggle="modal" title="Add Company">
                    <i className="ri-add-fill fs-5"></i>Add Company
                </button>
            </div>
            <Datatables dt_name="company-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addCompany" title={`${edit ? 'Update Company' : 'Add Company'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="company-form">
                <form className="needs-validation" noValidate id="company-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="company_name" className="form-label">Company Name</label>
                            <input type="text" className="form-control" id="company_name" name="company_name" value={formData.company_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Company name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="companyConfirmationModal" action={deleteCompany} />
        </>

    )

}
export default Company;