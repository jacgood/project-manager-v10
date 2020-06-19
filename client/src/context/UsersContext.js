import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const UsersContext = React.createContext();

export function UsersProvider(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    axios
      .get('http://localhost:5000/api/users')
      .then(res => {
        const { data } = res;
        setUsers(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <UsersContext.Provider
      value={{
        loading,
        users,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
}
