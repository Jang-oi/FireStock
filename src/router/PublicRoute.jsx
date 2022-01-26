import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

const PublicRoute = () => {
    const isToken = localStorage.getItem('token');
    return isToken ? <Navigate to="/"/> : <Outlet/>;
}

export default PublicRoute;