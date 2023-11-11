import { useEffect, useState } from "react";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, PRODUCT_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Product = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ product_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: PRODUCT_LIST,
        dt_name: 'product-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Product Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addProduct" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Product">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#productConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Product">
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
        document.getElementById('addProduct').addEventListener('show.bs.modal', function () {
            initialFormState('product-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'product' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, PRODUCT_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'product-form')) {
            setLoader(true)
            let api_url = ADD_PRODUCT;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_PRODUCT;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('product-form', setFormData)
                    document.querySelector('#addProduct [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, product_name: data.name }));
    }

    const deleteProduct = () => {
        setLoader(true)
        fetchData(`${DELETE_PRODUCT}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#productConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addProduct" data-bs-toggle="modal" title="Add Product">
                    <i className="ri-add-fill fs-5"></i>Add Product
                </button>
            </div>
            <Datatables dt_name="product-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addProduct" title={`${edit ? 'Update Product' : 'Add Product'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="product-form">
                <form className="needs-validation" noValidate id="product-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="product_name" className="form-label">Product Name</label>
                            <input type="text" className="form-control" id="product_name" name="product_name" value={formData.product_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Product name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="productConfirmationModal" action={deleteProduct} />
        </>

    )

}
export default Product;