import React, { Component } from "react";
import { connect } from "react-redux";
import Navbar from "react-bootstrap/lib/Navbar";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { Link } from "react-router-dom";
import {setAuthedUser} from "../actions/authedUser"
class NavBar extends Component {
  logout = () => {
    this.props.dispatch(setAuthedUser(null))
  }
  render() {
    const { authedUser } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <Link className="logo-title" to="/dashboard">
              Would you rather
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem
              componentClass={Link}
              eventKey={1}
              href="/dashboard"
              to="/dashboard"
            >
              Dashboard
            </NavItem>
            <NavItem
              componentClass={Link}
              eventKey={2}
              href="/leaderboard"
              to="leaderboard"
            >
              Leaderboard
            </NavItem>
            <NavItem
              componentClass={Link}
              eventKey={3}
              href="/add"
              to="/add"
            >
              Ask a question
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Signed in as: {authedUser}
            </NavItem>
            <NavItem eventKey={2} href="#" onClick={this.logout}>
              <Glyphicon glyph="glyphicon glyphicon-log-out" /> Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(NavBar);
