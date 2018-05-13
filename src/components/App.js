import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Question from "./Question";
import CreateQuestion from "./CreateQuestion";
import Leaderboard from "./Leaderboard"
class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/question/:id" component={Question} />
          <Route path="/create-question" component={CreateQuestion} />
          <Route path="/leaderboard" component={Leaderboard} />
        </div>
      </Router>
    );
  }
}

export default App;
