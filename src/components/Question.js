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
    request.qid = id;
    request.authedUser = authedUser;
    request.answer = option;
    this.props.dispatch(saveQuestionAnswer(request));
  };
  render() {
    const { question, user, isAnswered, selectedAnswer } = this.props;
    const optionOneCount = question.optionOne.votes.length;
    const optionTwoCount = question.optionTwo.votes.length;
    const total = optionOneCount + optionTwoCount;
    return (
      <div>
        <NavBar />
        <div className="container">
          <div className="row">
            <div className="col-md-2">
            </div>
            <div className="col-md-10">
              <h2>Would you rather</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2">
              <img
                className="img-responsive img-circle"
                alt="Not found"
                src={user.avatarURL}
              />
            </div>
            <div className="col-md-4">
              <Well className={selectedAnswer === "optionOne"?"answerd":""}>
                <h4>{question.optionOne.text}</h4>
                {isAnswered === true ? (
                  <div>
                    <p>
                      Number of people voted {question.optionOne.votes.length}
                    </p>
                    <p>
                      Perencatge of votes{" "}
                      {total === 0
                        ? 0
                        : parseInt(optionOneCount / total * 100, 10)}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={e => this.saveVote("optionOne")}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /> Vote
                  </button>
                )}
              </Well>
            </div>
            <div className="col-md-1">
              <h4>OR</h4>
            </div>
            <div className="col-md-4">
              <Well className={selectedAnswer === "optionTwo"?"answerd":""}>
                <h4>{question.optionTwo.text}</h4>
                {isAnswered === true ? (
                  <div>
                    <p>
                      Number of people voted {question.optionOne.votes.length}
                    </p>
                    <p>
                      Perencatge of votes{" "}
                      {total === 0
                        ? 0
                        : parseInt(optionOneCount / total * 100, 10)}
                    </p>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={e => this.saveVote("optionTwo")}
                  >
                    <Glyphicon glyph="glyphicon glyphicon-thumbs-up" /> Vote
                  </button>
                )}
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
  let selectedAnswer;
  if (question.optionOne.votes.includes(authedUser)) {
    selectedAnswer = "optionOne";
  } else if (question.optionTwo.votes.includes(authedUser)) {
    selectedAnswer = "optionTwo";
  }
  return {
    question,
    authedUser,
    user,
    isAnswered,
    id,
    selectedAnswer
  };
}
export default connect(mapStateToProps)(Question);
