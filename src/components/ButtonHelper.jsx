export const EditButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-secondary me-1 action-btn" onClick={props.action ?? null}>
            <i className="bi bi-pencil-fill"></i>
        </button>
    )
}

export const ViewButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-info me-1 action-btn" onClick={props.action ?? null}>
            <i className="bi bi-eye-fill"></i>
        </button>
    )
}

export const DeleteButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-danger me-1 action-btn" data-bs-toggle="modal" data-bs-target={props.modal_id} onClick={props.action ?? null}>
            <i className="bi bi-trash-fill"></i>
        </button>
    )
}

export const ActiveButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-success me-1 action-btn" onClick={props.action ?? null}>
            <i className="bi bi-check-circle-fill"></i>
        </button>
    )
}

export const DeactiveButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-warning me-1 action-btn" onClick={props.action ?? null}>
            <i className="bi bi-x-circle-fill"></i>
        </button>
    )
}

export const VerifyButton = (props) => {
    return (
        <button className="btn btn-sm btn-outline-success me-1 action-btn icon-white" onClick={props.action ?? null}>
            <img src="/images/user.svg" className="h-20px" alt="progress" />
        </button>
    )
}

export const AddButtonModal = (props) => {
    return (
        <button id={props.id ?? null} className="btn btn-sm btn-outline-secondary me-1 action-btn" data-bs-toggle="modal" data-bs-target={props.modal_id} onClick={props.action ?? null}>
            <i className="bi bi-plus-circle-fill"></i> {props.title ? props.title : ''}
        </button>
    )
}


export const EditButtonModal = (props) => {
    const { t } = useTranslation();
    return (
        <button className="btn btn-sm btn-outline-secondary me-1 action-btn" data-bs-toggle="modal" data-bs-target={props.modal_id} onClick={props.action ?? null}>
            <i className="bi bi-pencil-fill"></i>
        </button>
    )
}

export const ViewButtonModal = (props) => {
    return (
        <button className={`${props.className || "btn btn-sm btn-outline-info me-1 action-btn"}`} data-bs-toggle="modal" data-bs-target={props.modal_id} onClick={props.action ?? null}>
            {props.className ? "View" : <i className="bi bi-eye-fill"></i>}
        </button>
    )
}

