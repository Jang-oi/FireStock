/**
 * 액션 타입 정의
 * SET_PORTFOLIO_DATA 포트폴리오 세팅
 */
const SET_PORTFOLIO_DATA = 'portFolios/SET_PORTFOLIO_DATA';

/**
 * 액션 생성 함수
 * @param portData
 * @returns {{portData, type: string}}
 */
export const setPortFolioData = portData => ({type: SET_PORTFOLIO_DATA, portData});

/**
 * 모듈 초기화
 * @type {{portData: *[]}}
 */
const initialState = {
    portData: {}
};

/**
 * 리듀서 정의
 * @param state
 * @param action
 * @returns {{portData: *[]}|{portData: ([]|*[]|*)}}
 */
export default function portFolios(state = initialState, action) {
    switch (action.type) {
        case SET_PORTFOLIO_DATA:
            return {
                ...state,
                portData: action.portData,
            };
        default:
            return state;
    }
}