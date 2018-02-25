import React, { Component } from 'react';

import { signOutAction } from '../actions';
import { Link } from 'react-router-dom';
class Dashboard extends Component {
  render() { 
    return ( 
      <div>
        <p> User successfully signed in. Put all stuff that user can access when logged in here (dashboard, account, etc)</p>
        <button onClick={() => signOutAction()}>Logout</button>
        <Link to="/profile">Profile</Link>
      </div>
    );
  }
}
 
export default Dashboard;