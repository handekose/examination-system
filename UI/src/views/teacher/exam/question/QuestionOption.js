import React from 'react';
import { Row, Col, Form, FormControl, InputGroup, Button } from 'react-bootstrap';

class QuestionOption extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            optionIndex: this.props.optionIndex,
            option: this.props.option,
            order: this.props.order,
            answerIndex: this.props.answerValue
        }

        this.inputOption = React.createRef(this);
    }

    componentDidMount() {
        this.inputOption.current.value = this.props.option;
    }

    checkAnswer = () => {
        console.log("answerValue", this.state.answerIndex, "optionIndex", this.state.optionIndex);
        if (this.state.answerIndex !== undefined &&
            this.state.answerIndex !== null &&
            this.state.answerIndex === this.state.optionIndex) {
            console.log("Return true");
            console.log("---------");
            return true;
        }

        console.log("Return false");
        console.log("---------");
        return false;
    }

    handleOptionChange = e => {
        var index = parseInt(e.target);
        var index = parseInt(e.target.id);
        console.log("handleOptionChange ", index);
        if (isNaN(index)) {
            index = 0;
        }
        this.setState({ answerIndex: index });
    }

    render() {
        return <Col md="12">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                        <Form.Check
                            id={this.props.key + "-option-" + this.state.optionIndex}
                            name={"question-" + this.state.order}
                            type="radio"
                            aria-label="radio"
                            checked={this.checkAnswer()}
                            onChange={this.handleOptionChange}
                        />
                    </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    type="text"
                    name={this.props.key + "-option-" + this.state.optionIndex}
                    placeholder={this.state.optionIndex}
                    ref={this.inputOption}
                />
            </InputGroup>
        </Col>
    }
}

export default QuestionOption;