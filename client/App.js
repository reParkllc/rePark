import React from 'react';
import LogInComponent from './components/LogInComponent/LogInComponent';
import SignUpInitial from './containers/SignUp/SignUpInitial';
import SignUpSecondary from './containers/SignUp/SignUpSecondary';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
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
