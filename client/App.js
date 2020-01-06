import React from 'react';
import LogInComponent from './components/LogInComponent/LogInComponent';
import SignUpInitial from './containers/SignUp/SignUpInitial';
import SignUpSecondary from './containers/SignUp/SignUpSecondary';
import MapComponent from './components/MapComponent/MapComponent';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

//TODO: Add "/" route and corresponding component as a splash page for users who are not logged in
//TODO: Add a route for the actual app once a user has logged in
//TODO: Add a route for the users profile page

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          component={MapComponent}
        />
        <Route
          path="/login"
          exact
          component={LogInComponent}
        />
        <Route
          path="/signup"
          exact
          component={SignUpInitial}
        />
        <Route
          path="/signup2"
          exact
          component={SignUpSecondary}
        />
      </Switch>
    </Router>
  )
};

export default App;
