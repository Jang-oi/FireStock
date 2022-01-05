/**
 * 액션 타입 정의
 * SET_USERINFO 유저 정보 세팅
 * INIT_USER_INFO 유저 정보 초기화
 */
const SET_USER_INFO = 'userInfo/SET_USER_INFO';
const INIT_USER_INFO = 'userInfo/INIT_USER_INFO';

/**
 * 액션 생성 함수
 * @param userData
 * @returns {{userData, type: string}}
 */
export const setUserInfo = userData => ({type: SET_USER_INFO, userData});
export const initUserInfo = () => ({type: INIT_USER_INFO});

/**
 * 모듈 초기화
 * @type {{userInfo: {}}}
 */
const initialState = {
    userInfo: {}
};

/**
 * 리듀서 정의
 * @param state
 * @param action
 * @returns {{userInfo: {}}|{userInfo}}
 */
export default function userInfo(state = initialState, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.userData,
            };
        case INIT_USER_INFO:
            return {
                ...state,
                userInfo: {}
            }
        default:
            return state;
    }
}