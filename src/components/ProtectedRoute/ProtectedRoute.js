import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { BusContext } from '../../App';

const ProtectedRoute = ({children}) => {
    const [loggedInUser] = useContext(BusContext);
    const location = useLocation();

    if(!loggedInUser.email){
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }

    return children;
};

export default ProtectedRoute;