import React from 'react';
import { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { BusContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser, setLoggedInUser] = useContext(BusContext);
    return (
        <Route
            {...rest}
            render={({ location }) =>
            loggedInUser.email ? (
                children
            ) : (
                <Navigate
                    to={{
                        pathname: "/login",
                        state: { from: location }
                    }}
                />
            )
            }
      />
    );
};

export default PrivateRoute;