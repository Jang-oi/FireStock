/**
 * 액션 타입 정의
 * SET_HISTORY_DATA 히스토리 내역 세팅
 */
const SET_HISTORY_DATA = 'history/SET_HISTORY_DATA';

/**
 * 액션 생성 함수
 * @param historyData
 * @returns {{historyData, type: string}}
 */
export const setHistoryData = historyData => ({type: SET_HISTORY_DATA, historyData});

/**
 * 모듈 초기화
 * @type {{historyData: *[]}}
 */
const initialState = {
    historyData: []
};

/**
 * 리듀서 정의
 * @param state
 * @param action
 * @returns {{historyData: *[]}|{historyData: ([]|*[]|*)}}
 */
export default function history(state = initialState, action) {
    switch (action.type) {
        case SET_HISTORY_DATA:
            return {
                ...state,
                historyData: action.historyData,
            };
        default:
            return state;
    }
}