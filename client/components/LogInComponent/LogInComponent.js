import React, { useContext, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link as LinkMatui } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
//TODO: Don't have an account? Should route to LogIn.
//TODO: Not handled Forgot Password?
//TODO: After deciding on the design pattern change the avatar for Sign In.
//TODO: Endpoints are not provided Post Request is not being made.
//TODO: Add 10px marginTop to TextFields
//TODO: Add route handler for forgot password

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    padding: '15px'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// let login = () => {
//   fakeAuth.authenticate(() => {
//     history.replace(from);
//   });
// };

const LogInComponent = props => {
  const classes = useStyles();
  const { user, updateUser } = useContext(UserContext);
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');

  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const handlePassChange = e => {
    setPass(e.target.value);
  }
  const handlePhoneNumberChange = e => {
    setPhone(e.target.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        phone: phone,
        pass: pass
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        if (res.auth === true) {
          updateUser({
            id: res.id,
            isLoggedIn: true
          })
          history.push("/main");
        }
        else {
          history.push("/signup");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  // const Auth = {
  //   authenticate() {
  //     user.isLoggedIn === false ?
  //       history.replace(from);
  //   },
  //   signout(cb) {
  //     fakeAuth.isAuthenticated = false;
  //     setTimeout(cb, 100);
  //   }
  // };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
                </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phoneNumber"
            label="Phone Number"
            name="phoneNumber"
            autoComplete="phone-number"
            autoFocus
            value={phone}
            onChange={handlePhoneNumberChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={pass}
            onChange={handlePassChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
                    </Button>
          <Grid container>
            <Grid item xs>
              <LinkMatui href="#" variant="body2">
                Forgot password?
                            </LinkMatui>
            </Grid>
            <Grid item>
              <Link to={`/signup`}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default LogInComponent;
