import React from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export default function FooterButtons() {
  return (
    <Box mt={2} display="flex" justifyContent="flex-end">
      <Button style={{ width: 200, textTransform: "none" }}>Cancel</Button>
      <Button variant="contained" color="primary" style={{ width: 200, textTransform: "none" }}>Confirm</Button>
    </Box>
  )
}