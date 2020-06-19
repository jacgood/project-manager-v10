import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, isAuthenticated: true };
    case 'SIGN_OUT_SUCCESS':
      return { ...state, isAuthenticated: false };
    case 'REGISTER_SUCCESS':
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem('auth_token'),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error('useUserDispatch must be used within a UserProvider');
  }
  return context;
}

export {
  UserProvider,
  useUserState,
  useUserDispatch,
  loginUser,
  registerUser,
  signOut,
};

// ###########################################################

function loginUser(dispatch, email, password, history, setIsLoading, setError) {
  setError(false);
  setIsLoading(true);

  axios
    .post('http://localhost:5000/api/users/login', { email, password })
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('auth_token', token);
      setError(null);
      setIsLoading(false);
      dispatch({ type: 'LOGIN_SUCCESS', payload: jwt_decode(token) });
      history.push('/admin/dashboard');
    })
    .catch(err => {
      dispatch({ type: 'LOGIN_FAILURE' });
      setError(true);
      setIsLoading(false);
    });
}

function registerUser(
  dispatch,
  firstName,
  lastName,
  email,
  password,
  password2,
  history,
  setIsLoading,
  setError,
) {
  setError(false);
  setIsLoading(true);

  axios
    .post('http://localhost:5000/api/users/register', {
      firstName,
      lastName,
      email,
      password,
      password2,
    })
    .then(res => {
      setError(null);
      setIsLoading(false);
      history.push('/login');
    })
    .catch(err => {
      console.log(err);
      dispatch({ type: 'REGISTER_ERROR' });
      setError(true);
      setIsLoading(false);
    });
}

function signOut(dispatch, history) {
  localStorage.removeItem('auth_token');
  dispatch({ type: 'SIGN_OUT_SUCCESS' });
  history.push('/login');
}
