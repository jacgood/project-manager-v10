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

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <AuthProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
