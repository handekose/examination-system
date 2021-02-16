import React from 'react';
import { GetPageId } from 'helpers/HistoryHelper';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { Form, Button, Row, Col, InputGroup, FormControl, Card, ListGroup, ListGroupItem } from 'react-bootstrap';


class StudentAnswerSheet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            studentId: localStorage.getItem("userId"),
            examId: GetPageId(),
            exam: null,
            answers: [],
            grade:null,
        }
    }

    componentDidMount() {
        this.getExam();
        this.getStudentAnswer();
        this.getStudentGrade();
    }

    getExam = () => {
        let callProps = {
            endpoint: "exams/" + this.state.examId,
            method: "GET",
            success: (response) => {
                this.setState({ exam: response },()=>{
                    console.log("exam",this.state.exam)
                });
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getStudentAnswer = () => {
        //get student answer inside enrollment
        let callProps = {
            endpoint: "enrollments/studentAnswers/" + this.state.studentId + "/exam/" + this.state.examId,
            method: "GET",
            success: (response) => {
                this.setState({answers:response},()=>{
                    console.log("answers",this.state.answers);
                });
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }
    getStudentGrade = () => {
        //get student answer inside enrollment
        let callProps = {
            endpoint: "enrollments/studentGrade/" + this.state.studentId + "/exam/" + this.state.examId,
            method: "GET",
            success: (response) => {
                if(response==null){
                    this.setState({grade:"0"},()=>{
                    
                        console.log("grade",this.state.grade);
                    });
                }
                else{
                    this.setState({grade:response},()=>{
                    
                        console.log("grade",this.state.grade);
                    });
                }
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    returnToList = () => {
        Open(this.props.history, '/student/exams/list')
    }

    prepareAnswerSheetDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="10">
                        Exam Name : {this.state.exam.name}
                    </Col>
                    <Col md="2">
                    <Card>
                        <Col >
                            <Row>
                                <Col style={{height: "4rem" , textAlign: "center" , lineHeight: "4"}}>
                                    Exam Grade : {this.state.grade}
                                </Col>
                            </Row>
                        </Col>
                    </Card>
                    </Col>
                </Row>
            </Col>
            
            <Card style={{ margin: "auto", marginTop: "2rem", width: "800px" }}>
                <Row>
                    <Col md="12">
                        <Row>
                            <h4 className="col-sm-12 queDetail">Questions</h4>
                            {this.state.exam.questions ? this.state.exam.questions.map((questionElement, questionIndex) => {
                                return <Col md="12" key={questionIndex}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id={questionIndex}> {questionIndex + 1}. Soru</InputGroup.Text>
                                        </InputGroup.Prepend>

                                        <FormControl
                                            readOnly
                                            type="text"
                                            placeholder="question"
                                            value={questionElement.question}
                                            className="form-control"
                                        />
                                    </InputGroup>
                                    {questionElement.options.map((element, optionsIndex) => {
                                        return <Row key={optionsIndex}>
                                            <Col md="12">
                                                <InputGroup style={{ marginLeft: "1rem" }} className="mb-3">
                                                    <InputGroup.Prepend>
                                                        <InputGroup.Text id="basic-addon1">

                                                            <Form.Check
                                                                id={optionsIndex}
                                                                type="radio"
                                                                aria-label="radio"
                                                                readOnly
                                                                checked={optionsIndex==this.state.answers[questionIndex]}
                                                            />
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Col md="10">
                                                        <ListGroup>
                                                            <ListGroup.Item variant={
                                                                optionsIndex == this.state.exam.answers[questionIndex] ?
                                                                    "success" :
                                                                    optionsIndex == this.state.answers[questionIndex] ?
                                                                        "danger" : "light"}>{element}</ListGroup.Item>

                                                        </ListGroup>
                                                    </Col>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    })}
                                </Col>
                            }) : <p>Answer Sheet Loading...</p>}
                        </Row>
                    </Col>
                </Row >
            </Card>
            <br></br>
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right", marginTop: "2rem" }}>Return to list</Button>
            </Col>
        </Row >
    }


    render() {
        return this.state.exam == null ? <div>Exam is loading...</div> : this.prepareAnswerSheetDetail();
    }
}

export default StudentAnswerSheet;