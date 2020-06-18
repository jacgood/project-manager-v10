import React, { useContext } from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import { UsersContext } from '../../context/UsersContext';

// data
import mock from '../dashboard/mock';
// components
import PageTitle from '../../components/PageTitle';
import Widget from '../../components/Widget';
import Table from '../dashboard/components/Table/Table';

export default function Tables() {
  const tableContext = useContext(UsersContext);
  const { users } = tableContext;
  return (
    <>
      <PageTitle title="Tables" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Employee List"
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
        <Grid item xs={12}>
          <Widget title="Material-UI Table" upperTitle noBodyPadding>
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
