import React, { Component } from "react";
import { connect } from "react-redux";
import NabBar from "./NavBar";
import Well from "react-bootstrap/lib/Well";
class Leaderboard extends Component {
  render() {
    const { users } = this.props;
    return (
      <div>
        <NabBar />
        <div className="container">
          {users.map(user => (
            <Well bsSize="large" key={user.id}>
              <div className="row">
                <div className="col-md-4">
                  <img
                    className="img-responsive img-circle"
                    alt="Not found"
                    style={{ height: 100 + "px" }}
                    src={user.avatarURL}
                  />
                </div>
                <div className="col-md-8">
                  <p>Name: {user.name}</p>
                  <p>Questions Asked: {user.questions.length}</p>
                  <p>Questions Answered: {Object.keys(user.answers).length}</p>
                </div>
              </div>
            </Well>
          ))}
        </div>
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users: Object.values(users)
  };
}
export default connect(mapStateToProps)(Leaderboard);
