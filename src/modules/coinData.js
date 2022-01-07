/**
 * 액션 타입 정의
 * SET_COIN_DATA 코인데이터 세팅
 */
const SET_COIN_DATA = 'coinData/SET_COIN_DATA';

/**
 * 액셩 생성 함수
 * @param coinData
 * @returns {{coinData, type: string}}
 */
export const setCoinData = coinData => ({type: SET_COIN_DATA, coinData});

/**
 * 모듈 초기화
 * @type {{coinData: *[]}}
 */
const initialState = {
    coinData: []
};

/**
 * 리듀서 정의
 * @param state
 * @param action
 * @returns {{coinData: ([]|*[]|*)}|{coinData: *[]}}
 */
export default function coinData(state = initialState, action) {
    switch (action.type) {
        case SET_COIN_DATA:
            return {
                ...state,
                coinData: action.coinData,
            };
        default:
            return state;
    }
}