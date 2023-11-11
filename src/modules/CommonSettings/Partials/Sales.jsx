import { useEffect, useState } from "react";
import { ADD_SALES, DELETE_SALES, EDIT_SALES, SALES_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Sales = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: SALES_LIST,
        dt_name: 'sales-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Sales Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addSales" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Sales">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#salesConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Sales">
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
        document.getElementById('addSales').addEventListener('show.bs.modal', function () {
            initialFormState('sales-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'sales' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, SALES_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'sales-form')) {
            setLoader(true)
            let api_url = ADD_SALES;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_SALES;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('sales-form', setFormData)
                    document.querySelector('#addSales [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, name: data.name }));
    }

    const deleteSales = () => {
        setLoader(true)
        fetchData(`${DELETE_SALES}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#salesConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addSales" data-bs-toggle="modal" title="Add Sales">
                    <i className="ri-add-fill fs-5"></i>Add Sales
                </button>
            </div>
            <Datatables dt_name="sales-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addSales" title={`${edit ? 'Update Sales' : 'Add Sales'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="sales-form">
                <form className="needs-validation" noValidate id="sales-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="name" className="form-label">Sales Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Sales name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="salesConfirmationModal" action={deleteSales} />
        </>

    )

}
export default Sales;