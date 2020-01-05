import React from 'react';

import {
  Avatar,
  Button, CssBaseline,
  TextField, Link,
  Grid, Box,
  Typography, Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Copyright from '../../components/Copyright';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.info.dark,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    padding: '15px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  text: {
    marginTop: '10px'
  }
}));

export default function SignUpSecondary() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <DriveEtaIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Car Details
        </Typography>
        <form className={classes.form} noValidate>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              className={classes.text}
              id="carMake"
              label="Make"
              name="carMake"
              autoComplete="car-make"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              className={classes.text}
              id="carModel"
              label="Model"
              name="carModel"
              autoComplete="car-model"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              className={classes.text}
              id="carColor"
              label="Color"
              name="carColor"
              autoComplete="car-color"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => e.preventDefault()}
          >
            Let's Park!
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container >
  );
}
