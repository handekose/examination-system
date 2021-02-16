import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { GetPageId } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl, Card, Table } from 'react-bootstrap';

class TeacherCourseDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courseId: GetPageId(),
            teacherId: localStorage.getItem("userId"),
            course: null,
            teacher: null,
            exams: null,
            users: null,
        }
    }

    componentDidMount() {
        this.getCourse();
        this.getTeacher();
        this.getExams();
        this.getUsersForChoosenCourse();
    }

    getCourse = () => {
        let callProps = {
            endpoint: "courses/" + this.state.courseId,
            method: "GET",
            success: (response) => {
                this.setState({ course: response })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getTeacher = () => {
        let callProps = {
            endpoint: "users/" + this.state.teacherId,
            method: "GET",
            success: (response) => {
                this.setState({ teacher: response })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getExams = () => {
        let callProps = {
            endpoint: "exams/getByCourseId/" + this.state.courseId,
            method: "GET",
            success: (response) => {
                this.setState({ exams: response })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getUsersForChoosenCourse = () => {
        let callProps = {
            endpoint: "enrollments/getAllUsersOnEnrollmentsByCourseId/" + this.state.courseId,
            method: "GET",
            success: (response) => {
                this.setState({ users: response })
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    returnToList = () => {
        Open(this.props.history, '/teacher/courses')
    }

    showQuestionDetail = (examId) => {
        Open(this.props.history, '/teacher/courses/answerSheet', examId)
    }

    callExamState = (startDate, endDate) => {
        var varStartDate = new Date(startDate);
        var varEndDate = new Date(endDate);
        var today = new Date();

        var messageState = "";

        if (today > varEndDate)
            messageState = "Exam has finished"
        else if (varEndDate > today >= varStartDate)
            messageState = "Exam active now"
        else
            messageState = "Exam will be future"

        return messageState;
    }

    prepareCourseDetail = () => {
        return <>
            <Card>
                <Card.Header className="exam-detail-title">Course Details</Card.Header><hr></hr>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>Course id : {this.state.course.id}</p>
                        <p>Course name: {this.state.course.name}</p>
                        <p>Course description: {this.state.course.description}</p>
                        {this.state.teacher == null ? <p>Teacher Couldnt found</p> : <p>Course Teacher: {this.state.teacher.info.name} {this.state.teacher.info.surname}</p>}
                    </blockquote>
                </Card.Body>
            </Card>
            <Card>
                <Card.Header className="exam-detail-title">Course Exams</Card.Header><hr></hr>
                <div className="card-group">
                    {this.state.exams ? this.state.exams.map((element, index) => {
                        return <>
                            <Col lg="3" sm="4" key={index}>
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
                                            <Button variant="primary" size="sm" onClick={() => { this.showQuestionDetail(element.id) }}>Show Question Detail</Button>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        </>
                    }) : <p>This course don't have any exam...</p>}
                </div>
            </Card>
            <Card>
                <Card.Header className="exam-detail-title">List Of Students Enrolled In This Course</Card.Header><hr></hr>
                <Card.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Mail</th>
                                <th>School Number</th>
                                {this.state.exams ? this.state.exams.map((exam, index) => {
                                    return <th>{exam.name}</th>

                                }) : ""}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users ? this.state.users.map((user, index) => {
                                console.log(user);
                                return <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.info.name}</td>
                                    <td>{user.info.surname}</td>
                                    <td>{user.info.mail}</td>
                                    <td>{user.info.schoolNumber}</td>
                                    {user.exams ? this.state.exams.map((exam, index) => {
                                        let x = user.exams.find(el => el.examId == exam.id)
                                        if (x)
                                            return <td>{x.grade}</td>
                                        else
                                            return <td>-</td>
                                    }) : ""}
                                </tr>
                            }) : <tr>
                                    <td>1</td>
                                    <td colSpan="5">Couldn't found any student in this course</td>
                                </tr>

                            }

                        </tbody>

                    </Table>
                </Card.Body>
            </Card >
        </>
    }

    render() {
        return this.state.course == null ? <div>Course is loading...</div> : this.prepareCourseDetail();
    }
}

export default TeacherCourseDetail;