import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import biolerplateApp from './reducers';
import thunkMiddleware from 'redux-thunk'
import api from './middleware/api';
import styles from './index.css';
import { AUTHENTICATED } from './actions/index';
import Home from './components/home';
import Login from './components/Login';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard'

import requireAuth from './components/RequireAuth';
import noRequireAuth from './components/NoRequireAuth';

import {
  BrowserRouter,
  Route,
  Link, 
  Switch, 
  Redirect
} from 'react-router-dom';


let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api)(createStore); 

let store = createStoreWithMiddleware(biolerplateApp);

const user = localStorage.getItem('user');

if(user) {
  store.dispatch({ type: AUTHENTICATED });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <div>
          <Route exact path="/" component={noRequireAuth(Home)}/>
          <Route path="/signup" component={noRequireAuth(SignUp)}/>
          <Route path="/login" component={noRequireAuth(Login)}/>
          <Route path="/dashboard" component={requireAuth(Dashboard)}/>
          <Route path="/profile" component={requireAuth(Profile)} />
        </div>
      </BrowserRouter> 
  </Provider>, 
  document.getElementById('app')
);
