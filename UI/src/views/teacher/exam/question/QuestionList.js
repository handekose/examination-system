import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Question from './Question';
import uuid from 'react-uuid'

class QuestionList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: this.props.questions,
            answers: this.props.answers
        }
    }

    onAdd = () => {
        var questions = this.state.questions;
        questions.push({
            question: "Please enter questions here...",
            options: ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"],
            answerValue: 0
        });

        this.setState({ questions: questions });
    }

    onDelete = (itemIndex) => {
        var questions = this.state.questions;
        questions.splice(itemIndex, 1);

        var answers = this.state.answers;
        answers.splice(itemIndex, 1);

        this.setState({ answers: answers });
    }

    getQuestitons = () => {
        let ar = [];
        this.state.questions.forEach((el, index) => {
            var x = this["question-" + index].getValue();
            ar.push(x)
        });
        console.log(ar);
    }

    render() {
        return <>
            {this.state.questions.map((el, index) => {
                return <Question
                    id={"question-" + index}
                    run={this}
                    key={"question-" + index + "-" + uuid()}
                    order={index + 1}
                    index={index}
                    questionValue={el}
                    answerValue={this.state.answers[index]}
                    onDelete={this.onDelete}
                />
            })}
            <Row style={{ margin: "1rem 0" }}>
                <Col md={12}>
                    <Button variant="info" size="sm" style={{ width: "150px" }} onClick={this.getQuestitons} >Add Question</Button>
                </Col>
            </Row>
        </>
    }
}

export default QuestionList;