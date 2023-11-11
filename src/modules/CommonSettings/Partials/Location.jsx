import { useEffect, useState } from "react";
import { ADD_LOCATION, DELETE_LOCATION, EDIT_LOCATION, LOCATION_LIST } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Location = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ location_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: LOCATION_LIST,
        dt_name: 'location-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Location Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addLocation" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Location">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#locationConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Location">
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
        document.getElementById('addLocation').addEventListener('show.bs.modal', function () {
            initialFormState('location-form', setFormData)
            setEdit(false);
        })
    }, [])

    useEffect(() => {
        if (props.activeTab === 'location' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, LOCATION_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])

    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'location-form')) {
            setLoader(true)
            let api_url = ADD_LOCATION;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_LOCATION;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('location-form', setFormData)
                    document.querySelector('#addLocation [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, location_name: data.name }));
    }

    const deleteLocation = () => {
        setLoader(true)
        fetchData(`${DELETE_LOCATION}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#locationConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }

    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addLocation" data-bs-toggle="modal" title="Add Location">
                    <i className="ri-add-fill fs-5"></i>Add Location
                </button>
            </div>
            <Datatables dt_name="location-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addLocation" title={`${edit ? 'Update Location' : 'Add Location'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="location-form">
                <form className="needs-validation" noValidate id="location-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="location_name" className="form-label">Location Name</label>
                            <input type="text" className="form-control" id="location_name" name="location_name" value={formData.location_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Location name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="locationConfirmationModal" action={deleteLocation} />
        </>

    )

}
export default Location;