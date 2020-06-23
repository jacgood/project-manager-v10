import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Themes from './themes';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { LayoutProvider } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
// import { UsersProvider } from './context/UsersContext';
import { AuthProvider } from './context/AuthContext';
import { ProjectsProvider } from './context/ProjectsContext';

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <AuthProvider>
        <ProjectsProvider>
          <ThemeProvider theme={Themes.default}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </ProjectsProvider>
      </AuthProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
