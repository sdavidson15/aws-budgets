/* eslint-disable no-script-url */

import React from 'react';

import TextField from '@material-ui/core/TextField'

import Title from './../budget-page/Title'; // FIXME: pull this into somewhere more reusable

export default function Search() {
  return (
    <React.Fragment>
      <Title>Search</Title>
      <TextField></TextField>
    </React.Fragment>
  );
}
