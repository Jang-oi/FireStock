/**
 * Object 형식의 데이터로 url 파라미터 생성
 * @param url /api/v1 이하 경로
 * @param params
 * @returns String url 주소
 */
export function makeUrlParameter(url, params) {
    Object.keys(params).forEach((key, index) => {
        url = url + (index === 0 ? "?" : "&") + key + '=' + params[key];
    });
    return url;
}

/**
 * 응답받은 값의 Msg 리턴
 * @param response
 * @returns {any}
 */
export function getReturnMessage(response) {
    return response.data.returnMsg;
}

/**
 * 응답받은 값의 Code 리턴
 * @param response
 * @returns {any}
 */
export function getReturnCode(response) {
    return response.data.returnCode;
}

/**
 * 응답받은 값의 Data 리턴
 * @param response
 * @returns {*}
 */
export function getReturnData(response) {
    return response.data.data;
}