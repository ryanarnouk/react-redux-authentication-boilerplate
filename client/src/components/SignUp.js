import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { SignUpAction } from '../actions';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

class SignUp extends Component {
  submit = (values) => {
    console.log(values);
    this.props.SignUpAction(values, this.props.history);
  }

  render() { 
    const { handleSubmit } = this.props;
    return (
      <div>
        <Navbar />
        <div className="login-page">
          <div className="form">
          <form className="login-form" onSubmit={ handleSubmit(this.submit) }>
            <Field type="text" placeholder="name" name="name" component="input" />
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
      </div>
    ); 
  }
}       
 
function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const reduxFormSignup = reduxForm({
  form: 'signup'
})(SignUp);

export default connect(mapStateToProps, {SignUpAction})(reduxFormSignup);