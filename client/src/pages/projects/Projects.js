import React, { useContext, useState } from 'react';
import { Grid } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';

import { ProjectsContext } from '../../context/ProjectsContext';

// components
import PageTitle from '../../components/PageTitle/PageTitle';
// import Table from '../../components/Table/Table';

export default function Users() {
  const projectsData = useContext(ProjectsContext);
  const { projects } = projectsData;
  return (
    <>
      <PageTitle title="Projects" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Projects"
            data={projects.map(project => [
              project.title,
              project.description,
              project.assignedUser,
              project.client,
              project.dueDate,
              project.modifiedDate,
              project.createdDate,
            ])}
            columns={[
              'Title',
              'Description',
              'Asssigned User',
              'Client',
              'Date Due',
              'Date Modified',
              'Date Created',
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
