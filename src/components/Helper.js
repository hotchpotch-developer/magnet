import { Toast } from "bootstrap";
import $ from 'jquery'
export const ENDPOINT = process.env.REACT_APP_API_URL

export const fetchData = async (url, method, data, token, process, res, abort_signal = false, process_type = false, form_id = '', loading = true) => {
    let headers = {
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    }

    if (process) {
        headers = { ...headers, 'contentType': false, 'processData': false }
    } else {
        headers = { ...headers, 'Content-Type': 'application/json' }
    }

    if (token) {
        let TOKEN = localStorage.getItem('accessToken')
        headers = { ...headers, 'Authorization': 'Bearer ' + TOKEN }
    }

    let request = {
        'method': method,
        'headers': headers,
    }

    if (abort_signal) {
        request = { ...request, 'signal': abort_signal }
    }

    if (data) {
        request = { ...request, 'body': process ? data : JSON.stringify(data) }
    }

    await fetch(`${ENDPOINT}${url}`, request).then((response) => process_type === "text" ? response.text() : (process_type === "blob" ? response.blob() : response.json())).then((json) => {
        
        if (json.message === "Unauthenticated.") {
            localStorage.removeItem("accessToken");
            window.location.href = '/'
        } else if (!json.data) {
            showAlertMsg(json, form_id)
            res(json)
        } else if (json.data && json.data.length > 0) {
            res(json)
        } else {
            showAlertMsg(json, form_id)
            res(json)
        }
    }).catch((error) => { console.log(error) });
}

export const validateForm = (e, form_id = false) => {
    let error = 0;
    if (form_id) {
        let form = document.getElementById(form_id)
        if (!form.checkValidity()) {
            error++;
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated')
    } else {
        let forms = document.querySelectorAll('.needs-validation')
        Array.prototype.slice.call(forms)
            .forEach(function (form) {
                if (!form.checkValidity()) {
                    error++;
                    e.preventDefault();
                    e.stopPropagation();
                }
                form.classList.add('was-validated')
            })
    }

    if (error) {
        return false
    } else {
        return true
    }
}

export const showAlertMsg = (data, form_id = false) => {
    if (data.error || data.success) {
        const idGenerate = Math.floor((Math.random() * 1000000000) + 1);
        var seticon = data.success ? 'squarecheck' : data.error ? 'cancelcircle' : 'bellfill';

        const htmlToast = `<div id="${idGenerate}" class="toast fade toast-${data.success ? 'success' : 'danger'}" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay=${form_id === 'studentForm' ? 8000 : 4000}>
            <div class="toast-body first-text-uppercase">
                <i class="ri-${data.success ? 'checkbox-circle' : 'close-circle'}-line"></i>
                <span>${data.error ? data.error : data.success}</span>
            </div>
            <button type="button" class="btn-close ms-auto me-3" data-bs-dismiss="toast" aria-label="Close" title="Close"></button>
        </div>`;

        document.getElementById('toastContainer').insertAdjacentHTML("afterbegin", htmlToast);
        var getIdToast = document.getElementById(idGenerate);

        var toast = new Toast(getIdToast);
        toast.show();
        
        getIdToast.addEventListener('hidden.bs.toast', function () {
            setTimeout(() => {
                this.remove();
            }, 500);
        });

    } else if (data.errors) {
        $(`${form_id && `#${form_id} `}.form-control`).removeClass('is-invalid');
        $(`${form_id && `#${form_id} `}.invalid-feedback`).remove();

        for (let key in data.errors) {
            $(`${form_id && `#${form_id} `}#${key}`).addClass('is-invalid')
            $(`${form_id && `#${form_id} `}#${key}`).after(`<div class="invalid-feedback">${data.errors[key][0]}</div>`)
        }
    }
}

export const initialFormState = (formId, setData = false) => {
    [...document.querySelectorAll(`#${formId} .form-control, #${formId} .form-select`)].forEach((ele) => {
        ele.classList.remove('is-invalid');
    });
    [...document.querySelectorAll(`#${formId} .invalid-custom-feedback`)].forEach((ele) => {
        ele.classList.add('d-none');
    });
    document.getElementById(formId).classList.remove('was-validated')
    document.getElementById(formId).reset()
    if (setData) {
        setData(prevState => ({ ...prevState = '' }))
    }
    return setData;
}