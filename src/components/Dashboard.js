import React, { Component } from "react";
import { connect } from "react-redux";
import { getQuestions } from "../actions/questions";
import NavBar from "./NavBar";
import Tabs from "react-bootstrap/lib/Tabs";
import Tab from "react-bootstrap/lib/Tab";
import ListGroup from "react-bootstrap/lib/ListGroup";
import ListGroupItem from "react-bootstrap/lib/ListGroupItem";
class Dashboard extends Component {
  componentDidMount() {
    this.props.dispatch(getQuestions());
  }

  state = {
    key: 1
  };
  handleSelect(key) {
    this.setState({ key });
  }
  navigateToQuestion(id) {
    console.log("Id ", id);
  }
  render() {
    const { answered, unAnswered } = this.props;

    return (
      <div>
        <NavBar />
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect.bind(this)}
          id="controlled-tab-example"
        >
          <Tab eventKey={1} title="Unanswered Questions">
            <ListGroup>
              {unAnswered.map(question => (
                <ListGroupItem
                  key={question.id}
                  onClick={e =>
                    this.props.history.push(`/question/${question.id}`)
                  }
                >
                  Would you rather {question.optionOne.text} or{" "}
                  {question.optionTwo.text}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Tab>
          <Tab eventKey={2} title="Answered Questions">
            <ListGroup>
              {answered.map(question => (
                <ListGroupItem
                  key={question.id}
                  onClick={e =>
                    this.props.history.push(`/question/${question.id}`)
                  }
                >
                  Would you rather {question.optionOne.text} or{" "}
                  {question.optionTwo.text}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Tab>
        </Tabs>
      </div>
    );
  }
}
function mapStateToProps({ questions, users, authedUser }) {
  let answered = [];
  let unAnswered = [];
  if (users[authedUser] && Object.keys(questions).length !== 0) {
    const answerId = Object.keys(users[authedUser].answers);
    const questionId = Object.keys(questions);
    answered = answerId.map(id => questions[id]);
    unAnswered = questionId
      .filter(questId => !answerId.includes(questId))
      .map(id => questions[id]);
  }
  return {
    /*  questions: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ) */
    answered,
    unAnswered
  };
}
export default connect(mapStateToProps)(Dashboard);
