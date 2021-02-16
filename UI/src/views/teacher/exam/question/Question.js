import React from 'react';
import { Row, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import QuestionOption from './QuestionOption';
import uuid from 'react-uuid'

class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questionValue: this.props.questionValue,
            answerIndex: this.props.answerValue
        }

        this.inputQuestion = React.createRef(this);
    }

    componentDidMount() {
        this.props.run[this.props.id] = this;
        this.inputQuestion.current.value = this.state.questionValue.question;
    }

    checkAnswer = (value) => {
        if (this.state.answerIndex !== undefined &&
            this.state.answerIndex !== null &&
            this.state.answerIndex === value)
            return true;

        return false;
    }

    getStyle = () => {
        if (this.props.order % 2 == 0) {
            return { backgroundColor: "#EEE", paddingTop: "1rem", border: "1px solid gray" }
        }
        else {
            return { backgroundColor: "papayawhip", paddingTop: "1rem", border: "1px solid gray" }
        }
    }

    getValue = () => {
        let questionValue = this.state.questionValue;
        questionValue.question = this.inputQuestion.current.value;

        return {
            question: questionValue,
            answer: this.state.answerIndex
        }
    }

    handleOptionChange = index => {
        this.setState({ answerIndex: index });
    }

    handleOptionTextChange = (e, optionIndex) => {
        const { value } = e.target;
        let questionValue = this.state.questionValue;
        questionValue.options[optionIndex] = value;

        this.setState({ questionValue: questionValue });
    }

    render() {
        return <Col md="12" className="question" style={this.getStyle()}>
            <Button variant="danger"
                className="button-question-delete"
                size="sm"
                onClick={() => { this.props.onDelete(this.props.index) }}>
                <i className="fa fa-times"></i>
            </Button>
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text> {this.props.order}. Soru</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    as="textarea"
                    rows={1}
                    placeholder="Question"
                    ref={this.inputQuestion}
                    className="form-control"
                />
            </InputGroup>
            <Row >
                {this.state.questionValue.options.map((element, optionsIndex) => {
                    return <Col md="12">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">
                                    <Form.Check
                                        id={this.props.key + "-option-" + optionsIndex}
                                        name={"question-" + this.props.order}
                                        type="radio"
                                        aria-label="radio"
                                        checked={this.checkAnswer(optionsIndex)}
                                        onChange={() => { this.handleOptionChange(optionsIndex) }}
                                    />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                                type="text"
                                name={this.props.key + "-option-" + optionsIndex}
                                defaultValue={element}
                                onChange={(e) => { this.handleOptionTextChange(e, optionsIndex) }}
                            />
                        </InputGroup>
                    </Col>
                })}
            </Row>
        </Col>

    }
}

export default Question;