import React from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { initialFormState } from "./Helper"

const animatedComponents = makeAnimated();

export const reactSelectValidation = (e, field_id, multi = true) => {
    if (document.querySelector('#' + field_id).closest('form').classList.contains('was-validated')) {
        if ((multi === true && e.length) || (multi === false && e)) {
            document.querySelector('#' + field_id).classList.add("is-valid");
            document.querySelector('#' + field_id).classList.remove("is-invalid");
        } else {
            document.querySelector('#' + field_id).classList.add("is-invalid");
            document.querySelector('#' + field_id).classList.remove("is-valid");
        }
    }
}

export const ModalSection = (props) => {
    return (
        <div id={props.modalId} className="modal fade zoomIn" tabIndex="-1" aria-labelledby={`${props.modalId}Label`} aria-hidden="true" style={{display: 'none'}} data-bs-backdrop="static" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${props.modalId}Label`}>{props.title}</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => initialFormState(props.formId)}></button>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-light" data-bs-dismiss="modal" onClick={() => initialFormState(props.formId)}>Close</button>
                        {!props.loading ?
                            <button type="button" className="btn btn-primary" onClick={props.action}>{props.btnTitle}</button>
                        : 
                            loadingButton()
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export const loadingButton = () => {
    return (
        <button className="btn btn-outline-primary btn-load">
            <span className="d-flex align-items-center">
                <span className="spinner-border flex-shrink-0" role="status">
                    <span className="visually-hidden">Loading...</span>
                </span>
                <span className="flex-grow-1 ms-2">
                    Loading...
                </span>
            </span>
        </button>
    )
}

export const ConfirmationModal = (props) => {
    return (
        <div id="confirmationModal" className="modal fade zoomIn" tabIndex="-1" aria-labelledby="confirmationModalLabel" aria-hidden="true" style={{display: 'none'}} data-bs-backdrop="static" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center p-5">
                        <i className="ri-error-warning-line text-danger" style={{fontSize: '65px'}}></i>
                        <div className="mt-2">
                            <h4 className="mb-3">Are you sure want to delete?</h4>
                            <p className="text-muted mb-4"> This is a destructive action and cannot be reversed.</p>
                            <div className="hstack gap-2 justify-content-center">
                                <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" onClick={props.action}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const ReactSelect = (props) => {

    return(
        <Select 
            components={animatedComponents}
            {...props}
        />
    )

}