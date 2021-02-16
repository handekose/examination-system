import React from 'react';
import { GetPageId } from 'helpers/HistoryHelper';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { Form, Button, Row, Col, InputGroup, FormControl, Card, ListGroup, ListGroupItem } from 'react-bootstrap';


class TeacherAnswerSheet extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            studentId: localStorage.getItem("userId"),
            examId: GetPageId(),
            enrollments:null,
            enrollment:null,
            exam:null,
        }
    }

    componentDidMount() {
        this.getExam();
        this.getEnrollments();
    }

    getExam = () => {
        let callProps = {
            endpoint: "exams/" + this.state.examId,
            method: "GET",
            success: (response) => {
                this.setState({ exam: response })
                console.log(this.state.exam);
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getEnrollments = () => {
        let callProps = {
            endpoint: "enrollments/getbyuserId/" + this.state.studentId,
            method: "GET",
            success: (response) => {
                this.setState({ enrollments: response })
                this.findEnrollment();
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    findEnrollment = () => {
        this.state.enrollments.forEach(element => {
            if(element.courseId==this.state.exam.courseId){
                this.setState({enrollment:element});
            }
        });
    }

    returnToDetail = () => {
        Open(this.props.history, '/teacher/courses/detail', this.state.exam.courseId)
    }
    
    prepareAnswerSheetDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="9">
                        Exam ID : {this.state.exam.id}
                        <br></br>
                        Exam Name : {this.state.exam.name}
                    </Col>
                    <Col md="3">
                    </Col>
                </Row>
            </Col>
            <Card style={{ margin: "auto", marginTop: "2rem" , width: "800px"}}>
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
                                        {
                                            console.log(optionsIndex);
                                            console.log(this.state.exam.answers[questionIndex]);
                                            }
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
                                                             />
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Col md="10">
                                                        <ListGroup>
                                                            <ListGroup.Item variant={
                                                                optionsIndex == this.state.exam.answers[questionIndex] ? 
                                                                "success" : "light"}>{element}</ListGroup.Item>
                                            
                                                        </ListGroup>
                                                    </Col>
                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    })}
                                </Col>
                            } ) : <p>Answer Sheet Loading...</p>}
                        </Row>
                    </Col>
                </Row >
            </Card>
            <br></br>
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="primary" size="sm" onClick={this.returnToDetail} style={{ float: "right", marginTop: "2rem" }}>Return to Course Detail</Button>
            </Col>
        </Row >
    }


    render() {
        return this.state.exam == null ? <div>Exam is loading...</div> : this.prepareAnswerSheetDetail();
    }
}

export default TeacherAnswerSheet;