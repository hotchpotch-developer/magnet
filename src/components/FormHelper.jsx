import _ from 'lodash';
import Select from 'react-select'
import { loadingButton } from './Elements';

export const showPassword = (e, id) => {
    let btn = e.target;
    let ele = document.getElementById(id);
    if (ele.getAttribute('type') === 'password') {
        ele.setAttribute('type', 'text');
        btn.innerHTML = '<i class="bi-eye-slash fs-5 pe-none"></i>'
    } else {
        ele.setAttribute('type', 'password');
        btn.innerHTML = '<i class="bi-eye fs-5 pe-none"></i>'
    }
}

export const removeError = (e) => {
    if (e.target.nextElementSibling && e.target.nextElementSibling.classList.contains('d-block')) e.target.nextElementSibling.remove()
    e.target.classList.remove('is-invalid')
    e.target.classList.add('is-valid')
}

export const removeReactSelectError = (id) => {
    let ele = document.querySelector(`#${id}`)
    if (ele.lastChild.classList.contains('d-block')) ele.lastChild.remove();
    ele.classList.remove('is-invalid')
    ele.classList.add('is-valid')
}

export const UnAuthPasswordField = (props) => {

    return (
        <div className="input-group password-control mb-2">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i className={props.icon}></i>
                </div>
            </div>
            <input type="password" id={props.id ?? props.name} className="form-control password-control" {...props} autoComplete="off" onChange={removeError} />
            <div className="invalid-feedback">The {props.label} field is required.</div>
            <div role="button" className="password-eye" onClick={(e) => showPassword(e, props.id ?? props.name)}>
                <i className="bi-eye fs-5 pe-none"></i>
            </div>
        </div>
    )
}

export const UnAuthInputField = (props) => {

    return (
        <div className="input-group mb-2">
            <div className="input-group-prepend">
                <div className="input-group-text">
                    <i className={props.icon}></i>
                </div>
            </div>
            <input type={props.type ?? 'text'} id={props.id ?? props.name} className="form-control" {...props} autoComplete="off" onChange={removeError} />
            <div className="invalid-feedback">The {props.label} field is required.</div>

        </div>
    )
}

export const InputField = (props) => {

    return (
        <div className={props.full ? "col-lg-12" : "col-xxl-3 col-md-6"}>
            <div>
                <label htmlFor={props.id ?? props.name} className="form-label">{_.startCase(props.name)}</label>
                <input type={props.type ?? 'text'} className="form-control" id={props.id ?? props.name} {...props} />
                <div className="invalid-feedback">Please Enter {_.startCase(props.name)}.</div>
            </div>
        </div>
    )
}

export const PasswordField = (props) => {

    const passwordAddedOn = () => {
        let id = props.id ?? props.name;
        let element = document.querySelector('#' + id);
        element.setAttribute('type', element.type === 'password' ? 'text' : 'password');
    }

    return (
        <div className="col-lg-4">
            <label className="form-label" htmlFor={props.id ?? props.name}>{_.startCase(props.name)}</label>
            <div className="position-relative auth-pass-inputgroup mb-3">
                <input type="password" name="password" className="form-control pe-5 password-input" id={props.id ?? props.name} {...props} />
                <div className="invalid-feedback">Please Enter {_.startCase(props.name)}.</div>
                <button className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" onClick={() => passwordAddedOn()}><i className="ri-eye-fill align-middle"></i></button>
            </div>
        </div>
    )
}

export const ModalInputField = (props) => {

    return (
        <div className="mb-4 row mx-0">
            <label htmlFor={props.name} className="col-sm-3 col-xxl-6 col-form-label">
                {props.label} {props.required && <sup className='text-danger fw-bold fs-15px'>*</sup>}
            </label>
            <div className="col-sm-9 col-lg-6 col-xxl-6">
                <input type={props.type ?? 'text'} className="form-control" id={props.name} {...props} autoComplete="off" onChange={removeError} />
                {props.suggestion && <span className="text-success fs-12px">{props.suggestion}</span>}
                <div className="invalid-feedback">The {props.label} field is required.</div>
            </div>
        </div>
    )
}

export const SelectField = (props) => {

    return (
        <div className="col-xxl-3 col-md-6">
            <div>
                <label htmlFor="employee_id" className="form-label">{_.startCase(props.name)}</label>
                {props.children}
                <div className="invalid-feedback">Please Enter {_.startCase(props.name)}.</div>
            </div>
        </div>
    )
}

export const ModalSelectField = (props) => {

    return (
        <div className="mb-4 row mx-0">
            <label htmlFor={props.name} className="col-sm-3 col-xxl-6 col-form-label">
                {props.label} {props.required && <sup className='text-danger fw-bold fs-15px'>*</sup>}
            </label>
            <div className="col-sm-9 col-lg-6 col-xxl-6">
                {props.children}
                <div className="invalid-feedback">The {props.label} field is required.</div>
            </div>
        </div>
    )
}

export const UnAuthSubmitButton = (props) => {

    return (
        <div className="mb-2">
            <button type={props.type ?? "button"} disabled={props.load} className={`btn dark`} title={props.title} onClick={props.action ?? null}>
                {props.load ? <div className="spinner-border spinner-border-sm mx-3" role="status"><span className="visually-hidden">Loading</span></div> : props.title}
            </button>
        </div>
    )
}

export const SubmitButton = (props) => {

    return (
        <div className="col-lg-12 mt-4">
            <div className="text-end">
                {props.loading ? loadingButton() : <button type={props.type ?? "button"} className="btn btn-primary" title={props.title} onClick={props.action}>{props.title}</button>}
            </div>
        </div>
    )
}


export const ModalSubmitButton = (props) => {

    return (
        <div className="row mx-0">
            <div className="col-6 offset-sm-3 offset-xxl-6">
                <button type={props.type ?? "button"} className={`btn btn-${props.bgColor ?? 'blue'} w-120px px-4 me-2`} title={props.title} onClick={props.action ?? null}>{props.load ? <div className="spinner-border spinner-border-sm mx-3" role="status"><span className="visually-hidden">Loading</span></div> : props.title}
                </button>
            </div>
        </div>
    )
}

export const ReactSelect = (props) => {
    return (
        <div className={props.size ? props.size : 'col-md-6 mb-3'}>
            <label htmlFor={props.name} className="form-label">
                {props.label} {props.required && <sup className='text-danger fw-bold fs-15px'>*</sup>}
            </label>
            <Select className="react-select customSelect" id={props.id ?? props.name} onInputChange={() => removeReactSelectError(props.id ?? props.name)} {...props} />
        </div>
    )
}