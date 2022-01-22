import axios from "axios";
import Swal from 'sweetalert2/src/sweetalert2.js'
import withReactContent from 'sweetalert2-react-content';
import {getMsg, getReturnCode, getReturnData, getReturnMessage, makeUrlParameter} from "utils/stringUtil";

/**
 * axios 옵션 설정
 * @type {Axios}
 */
export const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 3000
});

/**
 * Axios 가 정상적으로 호출 됐을 때의 로직
 * @param response
 * @param callBackFn
 * @param errorCallBackFn
 */
export function defaultAxiosCall(response, callBackFn, errorCallBackFn) {
    const returnCode = getReturnCode(response);
    const returnMsg = getReturnMessage(response);
    const returnData = getReturnData(response);
    switch (returnCode) {
        case 0 :
            customAlert({
                icon : 'success',
                title: 'Good job!',
                text : returnMsg
            }).then(() => {
                if (callBackFn) callBackFn(returnData)
            })
            break;
        case 1 :
            if (callBackFn) callBackFn(returnData)
            break;
        case -1 :
            customAlert({
                icon : 'error',
                title: 'Oops...',
                text : returnMsg
            }).then(() => {
                if (errorCallBackFn) errorCallBackFn()
            })
            break;
        default :
            break;
    }
}

/**
 * Axios 가 정상적으로 호출 되지 않았을 때의 로직
 * status 403 토큰이 정상적이지 않은 값을 서버에 전달할 때
 * @param error
 */
export function defaultAxiosError(error) {
    try {
        const errorStatus = error.response.status;
        switch (errorStatus) {
            case 403 :
                customAlert({
                    icon : 'error',
                    title: 'Oops...',
                    text : getMsg('sessionTimeOut')
                }).then(() => {
                    localStorage.removeItem('token');
                    window.location.replace("/");
                });
                break;
            case 500 :
                customAlert({
                    icon : 'error',
                    title: 'Oops...',
                    text : getMsg('serverErrMsg')
                })
                break;
            default :
                customAlert({
                    icon : 'error',
                    title: 'Oops...',
                    text : errorStatus
                });
                break;
        }
    } catch (e) {
        customAlert({
            icon : 'error',
            title: 'Oops...',
            text : getMsg('serverErrMsg')
        })
    }


}

/**
 * Axios 호출 정의
 * @type {{post: axiosCall.post, get: axiosCall.get}}
 */
export const axiosCall = {
    post: (url, param, callBackFn, errorCallBackFn) => {
        customAxios.post(url, param)
            .then(response => defaultAxiosCall(response, callBackFn, errorCallBackFn))
            .catch(error => defaultAxiosError(error));
    },
    get : (url, param, callBackFn, errorCallBackFn) => {
        if (param) url = makeUrlParameter(url, param);
        customAxios.get(url)
            .then(response => defaultAxiosCall(response, callBackFn, errorCallBackFn))
            .catch(error => defaultAxiosError(error));
    }
}

/**
 * options 정의
 title : String
 text  : String
 footer : String
 icon : String
 didOpen : function
 didClose : function
 showCancelButton: true,
 confirmButtonColor: '#color',
 cancelButtonColor: '#color',
 confirmButtonText: String,
 cancelButtonText: String
 * Alert 창 정의
 * @param options
 * @returns {Promise<SweetAlertResult>}
 */
export function customAlert(options) {
    const MySwal = withReactContent(Swal);
    return MySwal.fire(options);
}

