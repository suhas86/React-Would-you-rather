import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import { createQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
class CreateQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: "",
    toHome: false
  };
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState(() => ({
      [name]: value
    }));
  }
  /**
   * @description Represents a submit question
   */
  handleSubmit = e => {
    e.preventDefault();
    const { authedUser } = this.props;
    const { optionOne, optionTwo } = this.state;
    this.props.dispatch(
      createQuestion({
        optionOneText: optionOne,
        optionTwoText: optionTwo,
        author: authedUser
      })
    );
    this.setState(() => ({
      optionOne: "",
      optionTwo: "",
      toHome: true
    }));
  };
  render() {
    const { toHome,optionOne,optionTwo } = this.state;
    if (toHome === true) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <NavBar />
        <div className="container">
          <h2>Would you rather</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label htmlFor="option1">Option 1</label>
              <input
                type="text"
                className="form-control"
                value={this.state.optionOne}
                onChange={this.handleInputChange.bind(this)}
                id="option1"
                placeholder="Enter Option 1"
                name="optionOne"
              />
            </div>
            <div className="form-group">
              <label htmlFor="option2">Option 2</label>
              <input
                type="text"
                className="form-control"
                id="option2"
                value={this.state.optionTwo}
                onChange={this.handleInputChange.bind(this)}
                placeholder="Enter Option 2"
                name="optionTwo"
              />
            </div>
            <button type="submit" disabled={optionOne === "" || optionTwo ===""} className="btn btn-default">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(CreateQuestion);
