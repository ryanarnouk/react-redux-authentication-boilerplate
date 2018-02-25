import React, { Component } from 'react';

import { Link } from 'react-router-dom';

class Home extends Component {
  render() { 
    return ( 
      <div>
        <p>Home page, this is where you will have your landing page advertising your app</p>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}
 
export default Home;