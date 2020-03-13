import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Layout from './hoc/Layout'
import Home from './components/Home'
import LoginRegister from './components/LoginRegister'


function Routes() {
  return (
    <Layout>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/register_login' exact component={LoginRegister}/>
      </Switch>
    </Layout>
  );
}

export default Routes;
