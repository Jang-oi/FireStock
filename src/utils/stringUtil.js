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

/**
 * 메세지에 대한 코드 값 입력하면 메세지 리턴
 * @param msgCode
 * @returns message {string}
 */
export function getMsg(msgCode) {
    const message = {
        sessionTimeOut: '세션이 종료 되었습니다.',
        serverErrMsg  : '서버가 정상적이지 않습니다. 잠시 후 시도해주세요.',
        list          : '전체',
        domestic      : '국내',
        overseas      : '해외',
        coin          : '코인',
        nonCurrent    : '그외 자산',
        buy           : '종목 매수',
        sell          : '종목 매도',
        buyComplete   : '매수 성공',
        sellComplete  : '매도 성공'
    }
    return message[msgCode];
}