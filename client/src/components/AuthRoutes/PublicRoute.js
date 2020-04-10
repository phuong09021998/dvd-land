import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location'

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
    const lastLocation = useLastLocation()
    return <Route {...rest} component={(props)=>(
        rest.restricted ?
            ( user ?
                (lastLocation && lastLocation.pathname !== "/register_login" ? <Redirect to={lastLocation.pathname} /> : <Redirect to="/user/dashboard" />)
                :
                <Comp {...props} user={user}/>
            )
        :
        <Comp {...props} user={user}/>
    )}/>
};

export default PublicRoutes;