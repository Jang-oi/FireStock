import {Routes, Route} from 'react-router-dom';
import * as React from 'react'
import {customAxios} from "./utils/commonUtil";
import {Reset} from 'styled-reset'
import {Fragment} from "react";
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from "./pages/Main/Main";
import Menubar from "./components/Menubar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Portfolios from "./pages/Portfolios/Portfolios";
import NotFound from "./pages/NotFound/NotFound";
import PrivateRoute from "./router/PrivateRoute";

const App = () => {

    // customAxios.defaults.headers['X-AUTH-TOKEN'] = isToken;

    /**
     * axios then 이나 catch 처리되기 전의 요청 응답의 공통 기능 처리
     */
    customAxios.interceptors.request.use(
        config => {
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

    return (
        <Fragment>
            <Reset/>
            <Menubar/>
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/portfolios" element={<Portfolios/>}/>
                </Route>
                <Route path="/sign-in" element={<SignIn/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Fragment>
    );
}
export default App;
