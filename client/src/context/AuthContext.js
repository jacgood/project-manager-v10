import React, { useState, useEffect, createContext, useReducer } from 'react';
import AuthReducer from './reducers/AuthReducer';
import axios from 'axios';

const initialState = {
  users: [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'password',
      date: '2020-01-01T16:49:05.364Z',
    },
  ],
};

export const AuthContext = createContext(initialState);
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        const { data } = res;
        const { users } = data;
        setUsers(users);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function removeUser(id) {
    dispatch({
      type: 'REMOVE_USER',
      payload: id,
    });
  }
  function addUser(users) {
    dispatch({
      type: 'ADD_USER',
      payload: users,
    });
  }
  function editUser(users) {
    dispatch({
      type: 'EDIT_USER',
      payload: users,
    });
  }

  useEffect(() => {
    fetchUsers();
    // return () => {
    //   fetchUsers();
    // };
  }, []);
  return (
    <AuthContext.Provider
      value={{
        users,
        removeUser,
        addUser,
        editUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
