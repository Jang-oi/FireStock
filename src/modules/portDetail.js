/**
 * 액션 타입 정의
 * SET_PORTFOLIO_DETAIL_DATA 포트폴리오 상세 데이터 세팅
 */
const SET_PORTFOLIO_DETAIL_DATA = 'portDetail/SET_PORTFOLIO_DETAIL_DATA';

/**
 * 액션 생성 함수
 * @param portDetailData
 * @returns {{portDetailData, type: string}}
 */
export const setPortDetailData = portDetailData => ({type: SET_PORTFOLIO_DETAIL_DATA, portDetailData});

/**
 * 모듈 초기화
 * @type {{portDetailData: *[]}}
 */
const initialState = {
    portDetailData: []
};

/**
 * 리듀서 정의
 * @param state
 * @param action
 * @returns {{portData: *[]}|{portData: ([]|*[]|*)}}
 */
export default function portDetail(state = initialState, action) {
    switch (action.type) {
        case SET_PORTFOLIO_DETAIL_DATA:
            return {
                ...state,
                portDetailData: action.portDetailData,
            };
        default:
            return state;
    }
}