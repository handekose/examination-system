import React from 'react';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { Col, Row, Card, Button } from 'react-bootstrap';

class StudentExams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studentId: localStorage.getItem("userId"),
            exams: null,
            examSituation: false,
            examFuture: false,
        };
    }

    componentDidMount() {
        this.getExams();
    }

    getExams = () => {
        let callProps = {
            endpoint: "exams/getByUserId/" + this.state.studentId,
            method: "GET",
            success: (response) => {
                this.setState({ exams: response });
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onDetailClick = (examId) => {
        if (this.state.examFuture) {
            alert("Exam have no detail...");
        }
        else {
            Open(this.props.history, '/student/exam/result', examId)
        }
    }

    takeExamClick = (examId) => {
        this.checkStudentGradeIsExist(examId);
    }

    checkStudentGradeIsExist = (examId) => {
        //get student answer inside enrollment
        let callProps = {
            endpoint: "enrollments/studentGrade/" + this.state.studentId + "/exam/" + examId,
            method: "GET",
            success: (response) => {
                console.log("response",response);
                if(response == null){
                    Open(this.props.history, '/student/exam/takeExam', examId);
                }
                else{
                    alert("This exam has been completed. Grade : " + response);
                }
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    callExamState = (startDate, endDate) => {
        var varStartDate = new Date(startDate);
        var varEndDate = new Date(endDate);
        var today = new Date();
        var messageState = "";

        if (today > varEndDate) {
            messageState = "Exam has finished";
        }
        else if (varEndDate > today && today >= varStartDate) {
            messageState = "Exam active now"
        }
        else {
            messageState = "Exam will be future"
        }

        return messageState;
    }

    getExamStatus = (element) => {
        var varStartDate = new Date(element.startDate);
        var varEndDate = new Date(element.endDate);
        var today = new Date();

        if (varEndDate > today && today >= varStartDate) {
            return true
        }
        else {
            return false
        }
    }
    getPassiveExamStatus = (element) => {
        var varEndDate = new Date(element.endDate);
        var today = new Date();

        if (varEndDate < today) {
            // exampast
            return true
        }
        else {
            return false
        }
    }

    prepareExamsList = () => {
        let content = [];

        this.state.exams ? this.state.exams.map((element) => {
            content.push(
                <Col lg="3" sm="4" key={element.id}>
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-paper-2 text-warning"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">{this.callExamState(element.startDate, element.endDate)}</p>
                                        <Card.Title as="h4">{element.name}</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                {   this.getExamStatus(element) ? <Button variant="danger" size="sm" onClick={() => { this.takeExamClick(element.id) }}>Take The Exam</Button> :
                                    this.getPassiveExamStatus(element) ? <Button variant="primary" size="sm" onClick={() => { this.onDetailClick(element.id) }}>Detail</Button> :
                                    <p></p>
                                }

                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            );
        }) : <p>Couldn't found and exam</p>

        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="9" style={{ fontStyle: "italic" }}>
                        List of my exams...
                    </Col>
                </Row>
            </Col>
            <hr style={{ width: "100%" }} />
            {content}
        </Row>
    }

    render() {
        return this.state.exams == null ? <div>Exams is loading...</div> : this.prepareExamsList();
    }
}

export default StudentExams;