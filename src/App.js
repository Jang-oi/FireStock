import {Routes, Route} from 'react-router-dom';
import * as React from 'react'
import {axiosCall, customAxios} from "./utils/commonUtil";
import {Reset} from 'styled-reset'
import {Fragment, useEffect} from "react";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import Main from "./pages/Main/Main";
import Menubar from "./components/Menubar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Portfolios from "./pages/Portfolios/Portfolios";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./router/PrivateRoute";
import PortDetail from "./pages/PortDetail/PortDetail";

import {useDispatch} from "react-redux";
import {setCoinData} from "./modules/coinData";

const App = () => {

    const dispatch = useDispatch();
    /**
     * axios then 이나 catch 처리되기 전의 요청 응답의 공통 기능 처리
     */
    customAxios.interceptors.request.use(
        config => {
            config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )
    customAxios.interceptors.response.use(
        config => {
            return config;
        },
        error => {
            return Promise.reject(error);
        }
    )

    /**
     * 주식, 코인의 데이터를 가져와 사용하는 값만 새로운 배열로 꺼내서 store 에 저장하는 로직
     */
    useEffect(() => {
        axiosCall.get('/crypto/find/allinfo', '', function (returnData) {
            const stockArray = [];
            for (let i = 0; i < returnData.length; i++) {
                if (returnData[i].market.includes('KRW')) {
                    stockArray.push({
                        currentPrice: Number(returnData[i].trade_price),
                        stockName   : returnData[i].korean_name,
                        stockType   : 'coin',
                        stockInfo   : returnData[i].market
                    });
                }
            }
            dispatch(setCoinData(stockArray));
        });
    }, [dispatch])

    return (
        <Fragment>
            <Reset/>
            <Menubar/>
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/portfolios" element={<Portfolios/>}/>
                    <Route path="/portfolios/:id" element={<PortDetail/>}/>
                </Route>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Fragment>
    );
}
export default App;
