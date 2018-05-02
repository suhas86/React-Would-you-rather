import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../actions/users";
import { setAuthedUser } from "../actions/authedUser";
import DropdownButton from "react-bootstrap/lib/DropdownButton";
import MenuItem from "react-bootstrap/lib/MenuItem";
class Login extends Component {
  state = {
    selectedUser: "Select User to login"
  };
  handleChange(selectedUser) {
    this.setState(() => ({
      selectedUser
    }));
  }
  loginUser() {
    this.props.dispatch(setAuthedUser(this.state.selectedUser.id));
    this.props.history.push('/dashboard');
  }
  componentDidMount() {
    this.props.dispatch(getUsers());
  }
  render() {
    const { selectedUser } = this.state;
    const { users } = this.props;
    // ToThink : to move to actions or keep it in login itself
    const userArray = Object.keys(users).map(i => users[i]);
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-lg-offset-3 text-center">
            <h3>Please select a user to login</h3>
            <DropdownButton
              bsSize="large"
              bsStyle="default"
              title={
                selectedUser.name ? selectedUser.name : "Please select user"
              }
              id="user-select"
            >
              {userArray.map(user => (
                <MenuItem
                  key={user.id}
                  onSelect={this.handleChange.bind(this, user)}
                  eventKey={user.id}
                >
                  {user.name}
                </MenuItem>
              ))}
            </DropdownButton>
            <div>
              <button
                type="button"
                onClick={this.loginUser.bind(this)}
                className="btn btn-default btn-lg"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return { users };
}
export default connect(mapStateToProps)(Login);
