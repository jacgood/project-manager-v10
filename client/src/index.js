import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/styles';
import { CssBaseline } from '@material-ui/core';

import Themes from './themes';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { LayoutProvider } from './context/LayoutContext';
import { UserProvider } from './context/UserContext';
import { UsersProvider } from './context/UsersContext';

ReactDOM.render(
  <LayoutProvider>
    <UserProvider>
      <UsersProvider>
        <ThemeProvider theme={Themes.default}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </UsersProvider>
    </UserProvider>
  </LayoutProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
