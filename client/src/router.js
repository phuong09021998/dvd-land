import React, {useEffect} from 'react';
import { Switch, Route } from 'react-router-dom'
import Layout from './hoc/Layout'
import Home from './components/Home'
import LoginRegister from './components/LoginRegister'
import PublicRoute from './components/AuthRoutes/PublicRoute'
import PrivateRoute from './components/AuthRoutes/PrivateRoute'
import AdminRoute from './components/AuthRoutes/AdminRoute'
import { connect } from 'react-redux'
import { getUser } from './actions/user_actions'
import UserDashBoard from './components/User/index'
import AdminProduct from './components/Admin/Product'
import Shop from './components/Shop'
import ProductDetail from './components/ProductDetail'
import { LastLocationProvider } from 'react-router-last-location'
import ScrollTop from './components/utils/ScrollTop'
import AdminGenre from './components/Admin/Genre'
import AdminCountry from './components/Admin/Country'
import AdminUser from './components/Admin/User'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import SuccessBuy from './components/Checkout/Success'
import UserHistory from './components/User/History'
import UserSetting from './components/User/Setting'

function Routes(props) {
  useEffect(() => {
    props.dispatch(getUser())
  }, [])


  return (
    <Layout {...props}>
      
      <Switch>
      <LastLocationProvider>
        <ScrollTop>
          <AdminRoute {...props} path="/admin/user" component={AdminUser}/>
          <AdminRoute {...props} path="/admin/country" component={AdminCountry}/>
          <AdminRoute {...props} path="/admin/genre" component={AdminGenre}/>
          <AdminRoute {...props} path="/admin/product" component={AdminProduct}/>
          <PrivateRoute {...props} path="/user/dashboard" component={UserDashBoard}/>
          <PrivateRoute {...props} path="/user/order" component={UserHistory}/>
          <PrivateRoute {...props} path='/checkout' exact component={Checkout}/>
          <PrivateRoute {...props} path='/user/setting' exact component={UserSetting}/>
          <PrivateRoute {...props} path='/checkout/success' exact component={SuccessBuy}/>
          <PublicRoute {...props} restricted={true} path='/register_login' exact component={LoginRegister}/>
          <PublicRoute path='/' exact component={Home} {...props}/>
          <PublicRoute {...props} exact component={Shop} path='/shop'/>
          <PublicRoute {...props} exact component={ProductDetail} path='/shop/:id'/>
          <PublicRoute {...props} exact component={Cart} path='/cart'/>
        </ScrollTop>
      </LastLocationProvider>
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
