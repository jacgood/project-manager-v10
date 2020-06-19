import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import { AuthContext } from '../../context/AuthContext';

// components
import PageTitle from '../../components/PageTitle/PageTitle';

export default function Users() {
  const userData = useContext(AuthContext);
  const { users } = userData;

  return (
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users"
            data={users.map(user => [
              user.firstName,
              user.lastName,
              user.email,
              user.password,
              user.date,
            ])}
            columns={[
              'First Name',
              'Last Name',
              'Email',
              'Password Hash',
              'Date Joined',
            ]}
            options={{
              filterType: 'checkbox',
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
