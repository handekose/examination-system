import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { GetPageId } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl, Card } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class TeacherExamEdit extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            examId: GetPageId(),
            exam: null,
            startDate: null,
            endDate: null,
        }

        this.inputName = React.createRef(this);
    }

    componentDidMount() {
        this.getExam();
    }

    getExam = () => {
        let callProps = {
            endpoint: "exams/" + this.state.examId,
            method: "GET",
            success: (response) => {
                this.setState({
                    exam: response,
                    courseId: response.courseId,
                    startDate: new Date(response.startDate),
                    endDate: new Date(response.endDate),
                    questions: response.questions,
                    answers: response.answers
                }, () => {
                    this.inputName.current.value = response.name;
                })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    returnToList = () => {
        Open(this.props.history, '/teacher/exams')
    }

    save = () => {
        let putModel = {
            id: this.state.exam.id,
            courseId: this.state.courseId,
            name: this.inputName.current.value,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            questions: this.state.questions,
            answers: this.state.answers,
        };

        let callProps = {
            endpoint: "exams/",
            method: "PUT",
            data: putModel,
            success: (response) => { console.log(response) },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
        this.returnToList();
        alert("Exam is updated succefully!");
    }

    handleStartDateChange = (date) => {
        console.log(date);
        this.setState({ startDate: date });
    }

    handleEndDateChange = (date) => {
        console.log(date);
        this.setState({ endDate: date });
    }

    handleOptionChange = e => {
        var index = parseInt(e.target.id);
        if (isNaN(index)) {
            index = 0;
        }
        this.state.answers[e.target.name] = index;
    }

    handleOptionTextChange = (questionIndex) => e => {
        const { name, value } = e.target;
        let arrayQuestions = this.state.questions
        arrayQuestions[questionIndex].options[name] = value;
        this.setState({ questions: arrayQuestions });
    }

    handleChange = (questionIndex) => e => {
        const {value } = e.target;
        let arrayQuestions = this.state.questions
        arrayQuestions[questionIndex].question = value;
        this.setState({ questions: arrayQuestions });
    }

    addQuestion = () => {
        const questionObj = {
            question: "",
            options: ["", "", "", "", ""],
        };
        let answer;

        let arrayQuestions = this.state.questions
        arrayQuestions.push(questionObj);
        this.setState({ questions: arrayQuestions });

        let arrayAnswers = this.state.answers;
        arrayAnswers.push(answer);
        this.setState({ answers: arrayAnswers });
    }

    deleteQuestion = (questionindex) => e => {
        console.log("QuestionIndex delete", questionindex);
        console.log(questionindex);
        let arrayQuestions = this.state.questions
        arrayQuestions.splice(questionindex, 1);
        this.setState({ questions: arrayQuestions });
        console.log(this.state.questions);

    }

    setQuestionState = (question) => {
        console.log("questionElement", question);
        this.setState({ inputQuestion: question });
        console.log("questionstate", this.state.inputQuestion);

    }

    prepareExamDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="12">
                        <h4 id="examDetail" className="col-sm-12" >Exam Details</h4>
                    </Col>
                    <Col md="9">
                        Exam ID : {this.state.exam.id}
                    </Col>
                    <Col md="3">
                        <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to list</Button>
                    </Col>
                </Row>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Exam Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputName}
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="12">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>

                    </InputGroup.Prepend>
                    <DatePicker
                        showTimeSelect
                        selected={new Date(this.state.startDate)}
                        onChange={this.handleStartDateChange} //only when value has changed
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </InputGroup>
            </Col>
            <Col md="12">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <DatePicker
                        showTimeSelect
                        selected={new Date(this.state.endDate)}
                        onChange={this.handleEndDateChange} //only when value has changed
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </InputGroup>
            </Col>
            <Col md="12"><hr /></Col>
            <Card style={{margin:"auto" , marginTop:"2rem" , width:"800px"}}>
            <Row>
                <Col md="12">
                    <Row>
                        <h4 className="col-sm-12" id="queDetail">Questions Details</h4>
                        {this.state.questions.map((questionElement, questionIndex) => {

                            return <Col md="12" key={questionIndex}>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <Button className="btn btn-danger">Delete</Button>
                                        <InputGroup.Text id={questionIndex}> {questionIndex + 1}. Soru</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        //required
                                        type="text"
                                        placeholder="question"
                                        //ref={this.state.inputQuestion}
                                        defaultValue={questionElement.question}
                                        onChange={this.handleChange(questionIndex)}
                                        className="form-control"
                                    />
                                </InputGroup>
                                {questionElement.options.map((element, optionsIndex) => {
                                    return <Row key={optionsIndex}>
                                        <Col md="12">
                                            <InputGroup className="mb-3">
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="basic-addon1">
                                                        <Form.Check
                                                            id={optionsIndex}
                                                            type="radio"
                                                            name={questionIndex}
                                                            aria-label="radio"
                                                            defaultChecked={this.state.answers[questionIndex] == optionsIndex}
                                                            onChange={this.handleOptionChange} />
                                                    </InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <FormControl
                                                    required
                                                    type="text"
                                                    name={optionsIndex}
                                                    placeholder={optionsIndex}
                                                    defaultValue={element}
                                                    onChange={this.handleOptionTextChange(questionIndex)}
                                                />
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                })}
                            </Col>
                        })}
                    </Row>
                    <Button variant="warning" size="sm" type="button" onClick={this.addQuestion} >Add Question</Button>
                </Col>
            </Row >
            </Card>
            <Col md="12" style={{ marginTop: "10px)" }}>
                <Button variant="info" size="md" onClick={this.save} style={{ float: "right" }}>Save Changes</Button>
            </Col>
        </Row >
    }


    render() {
        return this.state.exam == null ? <div>Exam is loading...</div> : this.prepareExamDetail();
    }
}

export default TeacherExamEdit;