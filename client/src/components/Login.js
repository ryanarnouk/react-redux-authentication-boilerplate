import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signInAction } from '../actions';

import { Link } from 'react-router-dom';

// fix handle submit is not a function
class Login extends Component {
  submit = (values) => {
    console.log(values);
    this.props.signInAction(values, this.props.history);
  }
  
  render() { 
    const { handleSubmit } = this.props;
    return ( 
      <div className="login-page">
        <div className="form"> 
          <form className="login-form" onSubmit={ handleSubmit(this.submit) }>
            <Field type="text" placeholder="email" name="email" component="input"/>
            <Field type="password" placeholder="password" name="password" component="input"/>
            <button type="submit">login</button>
            <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>
            {this.props.errorMessage ?
              <p>{this.props.errorMessage}</p> : false
            }
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
  form: 'signin'
})(Login);


export default connect(mapStateToProps, {signInAction})(reduxFormSignin);