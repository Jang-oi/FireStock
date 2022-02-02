import {combineReducers} from "redux";
import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userInfo from "./userInfo";
import portFolios from "./portFolios";
import coinData from "./coinData";
import portDetail from "./portDetail";

const persistConfig = {
    key : 'root',
    storage,
    // 특정 리듀서 로컬스토리지에 저장
    whitelist: ['userInfo']
}

const rootReducer = combineReducers({
    userInfo,
    portFolios,
    coinData,
    portDetail,
})

export default persistReducer(persistConfig, rootReducer);