import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { BusContext } from '../../App';

const PrivateRoute = ({children}) => {
    const [loggedInUser] = useContext(BusContext);
    const navigate = useNavigate();
    const location = useLocation();
    return (
        loggedInUser.email ? 
            children : 
            navigate('/login', { state: { from: location} })        
    );
};

export default PrivateRoute;