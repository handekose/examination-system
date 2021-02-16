import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl, Dropdown , Card} from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uuid from 'react-uuid'
import $ from 'jquery'

class TeacherExamAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            teacherId: localStorage.getItem("userId"),
            startDate: new Date(),
            endDate: new Date(),
            questions: [
                {
                    question: "",
                    options: ["", "", "", "", ""],
                },
            ],
            answers: [],
            courses: null,
            choosenCourseId: null,

        }
        this.inputCourseId = React.createRef(this);
        this.inputName = React.createRef(this);
    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses = () => {
        let callProps = {
            endpoint: "courses/getbyteactherid/" + this.state.teacherId,
            method: "GET",
            success: (response) => {
                this.setState({ courses: response });
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
            id: null,
            courseId: this.state.choosenCourseId,
            name: this.inputName.current.value,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            questions: this.state.questions,
            answers: this.state.answers,
        };
        // Add Exam
        let callProps = {
            endpoint: "exams/",
            method: "POST",
            data: putModel,
            success: (response) => { console.log(response); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
        this.returnToList();
        alert("Exam is added succefully!");
    }

    setEndDate = (date) => {
        this.setState({ endDate: date });
    }

    setStartDate = (date) => {
        this.setState({ startDate: date });
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

    handleOptionChange = (questionIndex) => e => {
        let arrayAnswers = this.state.answers;
        arrayAnswers[questionIndex] = e.target.value;
        this.setState({ answers: arrayAnswers });
    }

    handleOptionTextChange = (questionIndex) => e => {
        const { name, value } = e.target;
        let arrayQuestions = this.state.questions
        arrayQuestions[questionIndex].options[name] = value;
        this.setState({ questions: arrayQuestions });
    }

    handleChange = (questionIndex) => e => {
        const { name, value } = e.target;
        let arrayQuestions = this.state.questions
        arrayQuestions[questionIndex].question = value;
        this.setState({ questions: arrayQuestions },()=>{
            console.log("handle changed fired",e.target)
            e.target.focus();
        });
        console.log(this.state.questions);
    }

    deleteQuestion = (questionindex) => e => {
        console.log(questionindex);
        let arrayQuestions = this.state.questions
        arrayQuestions.splice(questionindex, 1);
        this.setState({ questions: arrayQuestions });
    }

    setCourseId = (id) => {
        this.setState({ choosenCourseId: id });
    }

    prepareExamDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>

                    <Col md="12">
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
                        placeholder="name"
                        aria-label="name"
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
                        onChange={date => this.setStartDate(date)} //only when value has changed
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
                        onChange={date => this.setEndDate(date)} //only when value has changed
                        dateFormat="MMMM d, yyyy h:mm aa"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <Dropdown className="mb-6">
                                <Dropdown.Toggle variant="Secondary" id="dropdown-basic">
                                    Choose Course
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {this.state.courses ? this.state.courses.map((el, index) => {
                                        return <Dropdown.Item
                                            eventKey={index} key={el.id} onClick={() => this.setCourseId(el.id)} >
                                            {el.name}
                                        </Dropdown.Item>
                                    }) : <Dropdown.Item >Loading</Dropdown.Item>}


                                </Dropdown.Menu>

                            </Dropdown>
                    </InputGroup.Prepend>
                    <FormControl  style={{paddingLeft:"20px"}}
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                        plaintext readOnly defaultValue="Please select the course of the exam"
                    />
                </InputGroup>
            </Col>  
            <Card style={{margin:"auto" , marginTop:"2rem" , width:"800px"}}>
            <Col md="12">
                <Row>
                    <h4 className="col-sm-12 queDetail" >Questions Details</h4>
                    {this.state.questions.map((questionElement, questionIndex) => {
                        return <Col md="12" >
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <Button className="btn btn-danger" onClick={this.deleteQuestion(questionIndex) } >Delete</Button>
                                    <InputGroup.Text key={"question-" + questionIndex + "-" + uuid()} id={questionIndex}> {questionIndex + 1}. Soru</InputGroup.Text>
                                </InputGroup.Prepend>
                                
                                <FormControl
                                    required
                                    type="text"
                                    placeholder="question"
                                    value={questionElement.question}
                                    onChange={this.handleChange(questionIndex)}
                                    className="form-control"
                                />
                            </InputGroup>
                            {questionElement.options.map((element, optionsIndex) => {
                                return <Row >
                                    <Col md="12">
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text key={"option-" + optionsIndex + "-" + uuid()} id={optionsIndex}>
                                                <Form.Check
                                                            type="radio"
                                                            name={questionIndex}
                                                            aria-label="radio"
                                                            onChange={this.handleOptionChange(questionIndex)} />
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                    
                                        <FormControl
                                            required
                                            type="text"
                                            name={optionsIndex}
                                            placeholder={optionsIndex + 1 + ". option"}
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
            </Card>
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="info" onClick={this.save} style={{ float: "right" }}>Add Exam</Button>
            </Col>
        </Row>
    }

    render() {
        return <div>{this.prepareExamDetail()}</div>
    }
}

export default TeacherExamAdd;