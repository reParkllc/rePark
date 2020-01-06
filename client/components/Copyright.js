import React from 'react';
import { Link, Typography } from '@material-ui/core';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {', '}
      <Link color="inherit" href="www.repark.io">
        reParkLLC
      </Link>{' '}
    </Typography>
  );
}

export default Copyright;