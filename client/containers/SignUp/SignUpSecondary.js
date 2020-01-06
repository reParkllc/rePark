import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import {
  Avatar,
  Button, CssBaseline, Link as LinkMatui,
  Grid, Box,
  Typography, Container
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import Copyright from '../../components/Copyright';
import CarMake from '../../components/SignUpDropDowns/CarMake';
import CarModel from '../../components/SignUpDropDowns/CarModel';
import CarColor from '../../components/SignUpDropDowns/CarColor';
import { Link } from 'react-router-dom';

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
  const { isLoggedIn, setIsLoggedIn,
    SetCarColor,
    SetCarMake,
    SetCarModel, } = useContext(UserContext);
  const [carColor, setCarColor] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    SetCarMake(carMake)
    SetCarModel(carModel)
    SetCarColor(carColor)
  }

  const handleCarMakeChange = (e) => {
    setCarModel('');
    setCarColor('');
    setCarMake(e.target.value);
  }
  const handleCarModelChange = (e) => {
    setCarColor('');
    setCarModel(e.target.value)
  }
  const handleCarColorChange = (e) => {
    setCarColor(e.target.value);
  }

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
            <CarMake fullWidth handleChange={handleCarMakeChange} carMake={carMake} />
          </Grid>
          <Grid item xs={12}>
            <CarModel fullWidth handleChange={handleCarModelChange} carModel={carModel} carMake={carMake} />
          </Grid>
          <Grid item xs={12}>
            <CarColor fullWidth handleChange={handleCarColorChange} carColor={carColor} />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Let's Park!
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link to={`/login`}>
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
