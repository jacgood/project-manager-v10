import React, { useEffect, useState, createContext, dispatch } from 'react';
import axios from 'axios';

export const ProjectsContext = createContext([]);
export const ProjectsProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = () => {
    axios
      .get('http://localhost:5000/api/projects')
      .then(res => {
        const { data } = res;
        const { projects } = data;
        setProjects(projects);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  };

  function removeProject(id) {
    dispatch({
      type: 'REMOVE_PROJECT',
      payload: id,
    });
  }
  function addProject(projects) {
    dispatch({
      type: 'ADD_PROJECT',
      payload: projects,
    });
  }
  function editProject(projects) {
    dispatch({
      type: 'EDIT_PROJECT',
      payload: projects,
    });
  }

  useEffect(() => {
    fetchProjects();
    // return () => {
    //   fetchUsers();
    // };
  }, []);
  return (
    <ProjectsContext.Provider
      value={{
        projects,
        removeProject,
        addProject,
        editProject,
        loading,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
};
