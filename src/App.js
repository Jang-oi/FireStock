import {Route, Routes} from 'react-router-dom';
import * as React from 'react'
import {Fragment, useState} from 'react'
import {customAxios} from "./utils/commonUtil";
import {Reset} from 'styled-reset'
import './App.scss';

import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";

import Main from "./pages/Main/Main";
import Menubar from "./components/Menubar";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Portfolios from "./pages/Portfolios/Portfolios";
import NotFound from "./pages/NotFound/NotFound";
import PortDetail from "./pages/PortDetail/PortDetail";
import MyPage from "./pages/MyPage/MyPage";
import TradeHistory from "./pages/TradeHistory/TradeHistory";
import Loading from "./components/Loding";
import Footer from "./components/Footer";
import Manage from "./pages/Manage/Manage";


const App = () => {

    const [loading, setLoading] = useState(false);
    let managePopup;

    /**
     * axios then 이나 catch 처리되기 전의 요청 응답의 공통 기능 처리
     */
    customAxios.interceptors.request.use(
        config => {
            config.headers['X-AUTH-TOKEN'] = localStorage.getItem('token');
            setLoading(true);
            return config;
        },
        error => {
            setLoading(true);
            return Promise.reject(error);
        }
    )
    customAxios.interceptors.response.use(
        config => {
            setLoading(false);
            return config;
        },
        error => {
            setLoading(false);
            return Promise.reject(error);
        }
    )

    /**
     * 관리자 페이지로 이동.
     * @param e
     */
    window.onkeydown = (e) => {
        if (e.key === 'F9') {
            if(window.opener) return;
            const popupOption = 'width=850, height=1000, left=200';
            if(!managePopup || managePopup.closed) managePopup = window.open('https://firestock.site/manage',
                "manage", popupOption);
            else managePopup.focus();
        }
    }

    return (
        <Fragment>
            <Reset/>
            <Menubar/>
            {loading && <Loading/>}
            <Routes>
                <Route path="/" element={<PrivateRoute/>}>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/my-page" element={<MyPage/>}/>
                    <Route path="/trade-history" element={<TradeHistory/>}/>
                    <Route path="/portfolios" element={<Portfolios/>}/>
                    <Route path="/portfolios/:id" element={<PortDetail/>}/>
                    <Route path="/manage" element={<Manage/>}/>
                </Route>
                <Route path="/" element={<PublicRoute/>}>
                    <Route path="/sign-in" element={<SignIn/>}/>
                    <Route path="/sign-up" element={<SignUp/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
            <Footer/>
        </Fragment>
    );
}
export default App;
