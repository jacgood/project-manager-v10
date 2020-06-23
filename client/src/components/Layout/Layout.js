import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// components
import Header from '../Header';
import Sidebar from '../Sidebar';

// pages
import Dashboard from '../../pages/dashboard';
import Projects from '../../pages/projects';
import Notifications from '../../pages/notifications';
import Maps from '../../pages/maps';
import Users from '../../pages/users';
import Icons from '../../pages/icons';
import Charts from '../../pages/charts';

// context
import { useLayoutState } from '../../context/LayoutContext';

function Layout(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Header history={props.history} />
        <Sidebar />
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/admin/dashboard" component={Dashboard} />
            <Route path="/admin/projects" component={Projects} />
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/notifications" component={Notifications} />
            <Route
              exact
              path="/admin/ui"
              render={() => <Redirect to="/admin/ui/icons" />}
            />
            <Route path="/admin/ui/maps" component={Maps} />
            <Route path="/admin/ui/icons" component={Icons} />
            <Route path="/admin/ui/charts" component={Charts} />
          </Switch>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
