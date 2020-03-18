import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AdminRoutes = ({ user, component: Comp, ...rest }) => {
    return <Route {...rest} component={(props)=>(
        user ?
            (
                user.role === 1 ? (
                    <Comp {...props} user={user}/>
                ) : <Redirect to="/user/dashboard"/>
            )
            :
        <Redirect to="/register_login"/>
    )}/>
};

export default AdminRoutes;