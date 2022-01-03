import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

/**
 * axios 옵션 설정
 * @type {AxiosInstance}
 */
export const customAxios = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
    timeout: 3000,
});

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