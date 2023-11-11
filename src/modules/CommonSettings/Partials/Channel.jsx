import { useEffect, useState } from "react";
import { ADD_CHANNEL, CHANNEL_LIST, DELETE_CHANNEL, EDIT_CHANNEL } from "../../../components/APIRoutes";
import Datatables, { reloadUrlDataTable } from "../../../components/Datatables";
import { createRoot } from "react-dom/client"
import * as Elements from "../../../components/Elements";
import { fetchData, initialFormState, validateForm } from "../../../components/Helper";
import { now } from "lodash";

const Channel = (props) => {
    const [initDataTable, setInitDataTable] = useState(false);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({ channel_name: "" });
    const [loader, setLoader] = useState(false)
    const [reload, setReload] = useState(false)
    const [deleteRecord, setDeleteRecord] = useState(false)

    const [dt] = useState({
        dt_url: CHANNEL_LIST,
        dt_name: 'channel-list',
        dt_export: true,
        dt_column: [
            { data: 'DT_RowIndex', name: 'id', title: '#' },
            { data: 'name', name: 'name', title: 'Channel Name', class: "text-nowrap minw-130px" },
            { data: 'action', name: 'action', title: 'Action', class: "text-truncate ", sortable: false, searchable: false, orderable: false }
        ],
        dt_column_defs: [
            {
                targets: 2,
                createdCell: (td, cellData, records, row, col) => {
                    createRoot(td).render(
                        <>
                            <div className="d-flex text-nowrap">
                                <button type="button" className="btn btn-sm btn-soft-success" data-bs-target="#addChannel" data-bs-toggle="modal" onClick={() => getEditData(records)} title="Edit Channel">
                                    <i className="ri-pencil-fill fs-5"></i>
                                </button>
                                <button type="button" className="btn btn-sm btn-soft-danger ms-2" data-bs-target="#channelConfirmationModal" data-bs-toggle="modal" onClick={() => setDeleteRecord(records)} title="Delete Channel">
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
        document.getElementById('addChannel').addEventListener('show.bs.modal', function () {
            initialFormState('channel-form', setFormData)
            setEdit(false);
        })
    }, [])


    useEffect(() => {
        if (props.activeTab === 'channel' && (!initDataTable || reload)) {
            setInitDataTable(true);
            reloadUrlDataTable(dt, CHANNEL_LIST);
        }

    }, [dt, props.activeTab, initDataTable, reload])


    const handleInputChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const submitForm = (e) => {
        e.preventDefault()

        if (validateForm(e, 'channel-form')) {
            setLoader(true)
            let api_url = ADD_CHANNEL;
            let formdata = formData;
            if (edit) {
                api_url = EDIT_CHANNEL;
                formdata = { ...formdata, id: edit };
            }
            fetchData(api_url, 'POST', formdata, true, false, (res) => {
                setLoader(false)
                if (res.status) {
                    initialFormState('channel-form', setFormData)
                    document.querySelector('#addChannel [data-bs-dismiss="modal"]').click()
                    setReload(now)
                }
            })
        }
    }

    const getEditData = (data) => {
        setEdit(data.id);
        setFormData(prev => ({ ...prev, channel_name: data.name }));
    }

    const deleteChannel = () => {
        setLoader(true)
        fetchData(`${DELETE_CHANNEL}/${deleteRecord.id}`, 'GET', '', true, false, (res) => {
            setLoader(false)
            if (res.status) {
                setDeleteRecord(false)
                document.querySelector('#channelConfirmationModal [data-bs-dismiss="modal"]').click()
                setReload(now)
            }
        })
    }


    return (

        <>
            <div className="col-12 d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-outline-success" style={{width: 'auto'}} data-bs-target="#addChannel" data-bs-toggle="modal" title="Add Channel">
                    <i className="ri-add-fill fs-5"></i>Add Channel
                </button>
            </div>
            <Datatables dt_name="channel-list" dataPageLength="15" />
            <Elements.ModalSection modalId="addChannel" title={`${edit ? 'Update Channel' : 'Add Channel'}`} btnTitle={`${edit ? 'Update' : 'Save'}`} action={submitForm} loading={loader} formId="channel-form">
                <form className="needs-validation" noValidate id="channel-form">
                    <div className="row gy-4">
                        <div className="col-md-12">
                            <label htmlFor="channel_name" className="form-label">Channel Name</label>
                            <input type="text" className="form-control" id="channel_name" name="channel_name" value={formData.channel_name} onChange={handleInputChange} required />
                            <div className="invalid-feedback">Please Enter Channel name.</div>
                        </div>
                    </div>
                </form>
            </Elements.ModalSection>
            <Elements.ConfirmationModal modalId="channelConfirmationModal" action={deleteChannel} />
        </>

    )

}
export default Channel;