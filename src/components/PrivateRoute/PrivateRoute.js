import React from 'react';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { BusContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser] = useContext(BusContext);
    return (
        loggedInUser.email ? <Outlet /> : <Navigate to='/login' />
    );
};

export default PrivateRoute;