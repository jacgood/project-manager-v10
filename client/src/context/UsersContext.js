import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersContext = React.createContext();

function UsersProvider() {
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
  console.log(users);
  return (
    <UsersContext.Provider
      value={{
        loading,
        users,
      }}
    ></UsersContext.Provider>
  );
}

export { UsersProvider, UsersContext };
