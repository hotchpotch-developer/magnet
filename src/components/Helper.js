import { Toast } from "bootstrap";
import $ from 'jquery'
import moment from "moment";
export const ENDPOINT = process.env.REACT_APP_API_URL

const bodyLoader = (active) => {
    if (active) {
        document.querySelector('body').classList.add('loading-data');
    } else {
        document.querySelector('body').classList.remove('loading-data');
    }
}

export const fetchData = async (url, method, data, token, process, res, abort_signal = false, process_type = false, form_id = '', loading = true) => {
    if (loading) {
        bodyLoader(true)
    }
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
        if (loading) {
            bodyLoader(false)
        }
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
    }).catch((error) => {
        if (loading) {
            bodyLoader(false)
        }
        console.log(error)
    });
}

export const validateForm = (e, form_id = false) => {
    let error = 0;
    let react_select_error = 0;
    if (form_id) {
        let form = document.getElementById(form_id)
        if (!form.checkValidity()) {
            error++;
            e.preventDefault();
            e.stopPropagation();
        }
        form.classList.add('was-validated')

        let react_select_selector = form_id === '' ? `.react-select input[required]` : `#${form_id} .react-select input[required]`;
        document.querySelectorAll(react_select_selector).forEach(ele => {
            if (ele.nextElementSibling && ele.nextElementSibling.classList.contains('invalid-feedback')) {
                ele.nextElementSibling.remove()
            }
            ele.parentElement.classList.remove('is-valid')
            ele.parentElement.classList.add('is-invalid')
            $(`${react_select_selector} input[name="${ele.name}"]`).after(`<div class="invalid-feedback invalid-custom-feedback d-block">This Field is required.</div>`)
            react_select_error++;
        })
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

    if (error || react_select_error) {
        return false
    } else {
        return true
    }
}

export const showAlertMsg = (data, form_id = false) => {
    if (data.error || data.success) {
        const idGenerate = Math.floor((Math.random() * 1000000000) + 1);

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

export const copyText = (id) => {
    let text = document.getElementById(id).value;
    let textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    showAlertMsg({success: "Text Copied."})
}

export const generateText = (length = 8, number = false, password = false) => {
    let charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    if (number) {
        charset = "0123456789012345678901234567890123456789012345678901234567890123456789";
    }
    if (password) {
        charset = "0123456789!@#$%^&*()_+=-abcdefghijklmnopqrst0123456789!@#$%^&*()_+=-uvwxyz0123456789!@#$%^&*()_+=-ABCDEFGHIJKLM0123456789!@#$%^&*()_+=-NOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-";
    }

    let retVal = '';
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const dateFormat = (date) => {
    return moment(date).format('YYYY-MM-DD H:mm a');
}