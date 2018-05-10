import React, { Component } from "react";
import { connect } from "react-redux";
import { saveQuestionAnswer } from "../actions/users";
import NavBar from "./NavBar";
import Well from "react-bootstrap/lib/Well";
import Glyphicon from "react-bootstrap/lib/Glyphicon";
class Question extends Component {
  saveVote = option => {
    const { id, authedUser } = this.props;
    let request = {};
    request.qid=id;
    request.authedUser = authedUser;
    request.answer = option;
    this.props.dispatch(saveQuestionAnswer(request));
  };
  render() {
    const { question, user, isAnswered } = this.props;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-2">
              <button type="button" className="btn btn-default">
                Back
              </button>
            </div>
            <div className="col-md-10">
              <h2>Would you rather</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <img className="img-responsive img-circle" src={user.avatarURL} />
            </div>
            <div className="col-md-4">
              <Well>
                <h4>{question.optionOne.text}</h4>
                {isAnswered === true && (
                  <p>
                    Number of people voted {question.optionOne.votes.length}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={e => this.saveVote("optionOne")}
                >
                  <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /> Vote
                </button>
              </Well>
            </div>
            <div className="col-md-1">
              <h4>OR</h4>
            </div>
            <div className="col-md-4">
              <Well>
                <h4>{question.optionTwo.text}</h4>
                {isAnswered === true && (
                  <p>
                    Number of people voted {question.optionOne.votes.length}
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={e => this.saveVote("optionTwo")}
                >
                  <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /> Vote
                </button>
              </Well>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, questions, users }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const user = users[question.author];
  const isAnswered = users[authedUser].answers.hasOwnProperty(id);
  return {
    question,
    authedUser,
    user,
    isAnswered,
    id
  };
}
export default connect(mapStateToProps)(Question);
