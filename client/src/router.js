import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import Layout from './hoc/Layout'
import Home from './components/Home'
import LoginRegister from './components/LoginRegister'
import PublicRoute from './components/AuthRoutes/PublicRoute'
import PrivateRoute from './components/AuthRoutes/PrivateRoute'
import { connect } from 'react-redux'
import { getUser } from './actions/user_actions'
import UserDashBoard from './components/User/index'
import AdminDashboard from './components/Admin'

function Routes(props) {
  useEffect(() => {
    props.dispatch(getUser())
  }, [])


  return (
    <Layout {...props}>
      <Switch>
        <Route path='/' exact component={Home}/>
        <PrivateRoute {...props} path="/admin/dashboard" component={AdminDashboard} admin={true}/>
        <PrivateRoute {...props} path="/user/dashboard" component={UserDashBoard}/>
        <PublicRoute {...props} restricted={true} path='/register_login' exact component={LoginRegister}/>
      </Switch>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(mapStateToProps)(Routes);
