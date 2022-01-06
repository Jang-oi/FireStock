import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";

/**
 * 리덕스 적용
 */
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {logger} from "redux-logger/src";
import rootReducer from './modules';
import {persistStore} from "redux-persist";
import {PersistGate} from "redux-persist/integration/react";

const store = createStore(rootReducer, applyMiddleware(logger));
const persistor = persistStore(store);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
            </PersistGate>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
