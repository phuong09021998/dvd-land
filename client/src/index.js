import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router';
import 'antd/dist/antd.css'
import './Resources/css/styles.css'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import promiseMiddleWare from 'redux-promise'
import ReduxThunk from 'redux-thunk'
import Reducer from './reducers'
import { BrowserRouter } from 'react-router-dom';




const createStoreWithMiddleWare = applyMiddleware(promiseMiddleWare, ReduxThunk)(createStore)



ReactDOM.render(
<Provider store={createStoreWithMiddleWare(Reducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <BrowserRouter>
        <Routes />
    </BrowserRouter>
</Provider>, document.getElementById('root'));