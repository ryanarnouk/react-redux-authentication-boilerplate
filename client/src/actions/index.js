import axios from 'axios';

export const AUTHENTICATED = 'authenticated_user';
export const UNAUTHENTICATED = 'unauthenticaed_user';
export const AUTHENTICATION_ERROR = 'authentication_error';

export function signInAction({ email, password }, history){
  return (dispatch) => {
    axios.post('http://localhost:3000/auth/login', `email=${email}&password=${password}`, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    }).then((res) =>{
      console.log(email, password);
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      console.log(res);
      // do not know whether to use history.push or window.location
      //history.push('/dashboard');
      window.location.href = "/dashboard";
      console.log('worked!');
    }).catch((error) => {
      console.log(error);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: 'Invalid email or password'
      })
      console.log('didnt work');
    });
  }
}

export function SignUpAction({ name, email, password }, history) {
  return (dispatch) => {
    axios.post('http://localhost:3000/auth/signup', `name=${name}&email=${email}&password=${password}`, {
      'Content-Type': 'application/x-www-form-urlencoded'
    }).then((res) => {
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', res.data.token);
      //window.location.href="/dashboard";
    }).catch((err) => {
      console.log(err.response);
      dispatch({
        type: AUTHENTICATION_ERROR,
        payload: err.response.data.message
      })
    });
  }
}

// try to make this use history
export function signOutAction(history) {
  console.log('signOutFunction');
  localStorage.clear();
  window.location.href = '/';
  return {
    type: UNAUTHENTICATED
  };
}