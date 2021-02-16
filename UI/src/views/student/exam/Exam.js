import React from 'react';
import { GetPageId } from 'helpers/HistoryHelper';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { Form, Button, Row, Col, InputGroup, FormControl, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import swal from 'sweetalert';
const queryString = require('query-string');

class Exam extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            message: "Exam is loading...",
            studentId: localStorage.getItem("userId"),
            examId: GetPageId(),
            exam: null,
            answers: [],
        }
    }

    componentDidMount() {
        if (this.state.examId === undefined || this.state.examId === null) {
            console.log(window.location.search);
            const parsed = queryString.parse(window.location.search);
            if (parsed.id)
                this.state.examId = parsed.id;
            else
                this.state.message = "Exam id not found"
        }

        this.getExam();
    }

    getExam = () => {
        console.log(this.state.examId);
        let callProps = {
            endpoint: "exams/" + this.state.examId,
            method: "GET",
            success: (response) => {
                let currentTime = new Date();

                this.setState({ exam: response })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    returnToList = () => {
        swal({
            title: "Are you sure?",
            text: "If you quit exam before sav",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    swal("Poof! Your imaginary file has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your imaginary file is safe!");
                }
            });
        //Open(this.props.history, '/student/exams/list')
        //grade i sıfır yap
    }

    handleOptionChange = e => {
        var optionIndex = parseInt(e.target.id);
        var questionIndex = e.target.name;
        if (isNaN(optionIndex)) {
            optionIndex = 0;
        }
        let answersCopy = this.state.answers;
        answersCopy[questionIndex] = optionIndex;
        this.setState({ answers: answersCopy });
    }


    save = () => {

        let putModel = {
            examId: this.state.exam.id,
            studentId: this.state.studentId,
            answers: this.state.answers,
        }

        let callProps = {
            endpoint: "enrollments/uploadExam",
            method: "PUT",
            data: putModel,
            success: (response) => {
                console.log(response);
                Open(this.props.history, '/student/exam/result', this.state.examId)
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    prepareRemainTime() {
        let dateFuture=new Date(this.state.exam.endDate);
        let dateNow=new Date();
        let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;
    
        // calculate days
        const days = Math.floor(diffInMilliSeconds / 86400);
        diffInMilliSeconds -= days * 86400;
        console.log('calculated days', days);
    
        // calculate hours
        const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
        diffInMilliSeconds -= hours * 3600;
        console.log('calculated hours', hours);
    
        // calculate minutes
        const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
        diffInMilliSeconds -= minutes * 60;
        console.log('minutes', minutes);
    
        let difference = '';
        if (days > 0) {
          difference += (days === 1) ? `${days} day, ` : `${days} days, `;
        }
    
        difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;
    
        difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 
    
        return difference;
    }    

    prepareExamDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="9">
                        Exam ID : {this.state.exam.id}
                        <br></br>
                        Exam Name : {this.state.exam.name}
                        <br></br>
                        Remaining Time : {this.prepareRemainTime}
                    </Col>
                    <Col md="3">
                        <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to list</Button>
                    </Col>
                </Row>
            </Col>
            <Card style={{ margin: "auto", marginTop: "2rem", width: "800px" }}>
                <Row>
                    <Col md="12">
                        <Row>
                            <h4 className="col-sm-12 queDetail">Questions</h4>
                            {this.state.exam.questions.map((questionElement, questionIndex) => {

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
                                                                name={questionIndex}
                                                                aria-label="radio"
                                                                onChange={this.handleOptionChange} />
                                                        </InputGroup.Text>
                                                    </InputGroup.Prepend>
                                                    <Col md="11">
                                                        <ListGroup>
                                                            <ListGroup.Item>{element}</ListGroup.Item>
                                                        </ListGroup>
                                                    </Col>


                                                </InputGroup>
                                            </Col>
                                        </Row>
                                    })}
                                </Col>
                            })}
                        </Row>
                    </Col>
                </Row >
            </Card>
            <br></br>
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="info" size="sm" onClick={this.save} style={{ float: "right", marginTop: "2rem" }}>Finish The Exam</Button>
            </Col>
        </Row >
    }


    render() {
        return this.state.exam == null ? <div>{this.state.message}</div> : this.prepareExamDetail();
    }
}

export default Exam;