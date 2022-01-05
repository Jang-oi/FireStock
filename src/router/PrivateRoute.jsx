import React from 'react';
import {Outlet, Navigate} from 'react-router-dom';

function PrivateRoute() {
    const isToken = localStorage.getItem('token');
    return isToken ? <Outlet/> : <Navigate to="/sign-in"/>;
}

export default PrivateRoute;