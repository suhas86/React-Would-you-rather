import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route,Redirect,Switch } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Question from "./Question";
import CreateQuestion from "./CreateQuestion";
import Leaderboard from "./Leaderboard";
import NotFound from "./NotFound"
class App extends Component {
  render() {
    const { authedUser } = this.props;
    return (
      <Router>
        <Fragment>
        <Switch>
          <Route path="/" exact component={Login} />
          <PrivateRoute path="/dashboard" component={Dashboard} auth={authedUser} />
          <PrivateRoute path="/question/:id" component={Question} auth={authedUser} />
          <PrivateRoute path="/create-question" component={CreateQuestion} auth={authedUser} />
          <PrivateRoute path="/leaderboard" component={Leaderboard} auth={authedUser} />
          <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}
const PrivateRoute = ({ component: Component, ...rest,auth }) => (
  <Route
    {...rest}
    render={props =>
      auth ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(App);
