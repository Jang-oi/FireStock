import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';
import {getReturnCode, getReturnMessage} from "./stringUtil";

/**
 * axios 옵션 설정
 * @type {AxiosInstance}
 */
export const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 3000,
});

/**
 * Axios 가 정상적으로 호출 됐을 때의 로직
 * @param response
 * @param callBackFn
 * @param errorCallBackFn
 */
function defaultAxiosCall(response, callBackFn, errorCallBackFn) {
    const returnCode = getReturnCode(response);
    const returnMsg = getReturnMessage(response);
    switch (returnCode) {
        case 0 : {
            customAlert({
                icon : 'success',
                title: returnMsg
            }).then(() => {
                if (callBackFn) callBackFn()
            })
            break;
        }
        case -1 : {
            customAlert({
                icon : 'error',
                title: returnMsg
            }).then(() => {
                if (errorCallBackFn) errorCallBackFn()
            })
            break;
        }
        default :
            break;
    }
}

/**
 * Axios 가 정상적으로 호출 되지 않았을 때의 로직
 * @param response
 */
function defaultAxiosError(response) {
    customAlert({
        icon : 'error',
        title: '서버가 정상적이지 않습니다.'
    })
}

/**
 * Axios 호출 정의
 * @type {{post: axiosCall.post, get: axiosCall.get}}
 */
export const axiosCall = {
    post: (url, param, callBackFn, errorCallBackFn) => {
        customAxios.post(url, param)
            .then(response => defaultAxiosCall(response, callBackFn, errorCallBackFn))
            .catch(response => defaultAxiosError(response));
    },
    get : (url, callBackFn, errorCallBackFn) => {
        customAxios.get(url)
            .then(response => defaultAxiosCall(response, callBackFn, errorCallBackFn))
            .catch(response => defaultAxiosError(response));
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

