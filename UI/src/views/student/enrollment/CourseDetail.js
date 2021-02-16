import React from 'react';
import { GetPageId } from 'helpers/HistoryHelper';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { Col, Row, Card, Button } from 'react-bootstrap';


class StudentCourseDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            studentId: localStorage.getItem("userId"),
            courseId: GetPageId(),
            teacher: null,
            course: null,
        };
    }
    componentDidMount() {
        this.getCourse();
    }

    getCourse = () => {
        let callProps = {
            endpoint: "courses/" + this.state.courseId,
            method: "GET",
            success: (response) => {
                this.setState({ course: response });
                console.log(this.state.course);
                this.getTeacher();

            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getTeacher = () => {
        let callProps = {
            endpoint: "users/" + this.state.course.teacherId,
            method: "GET",
            success: (response) => {
                this.setState({ teacher: response });
                console.log(this.state.teacher);
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    returnToList = () => {
        Open(this.props.history, '/student/enrollments')
    }

    prepareDetail = () => {
        return <>
            <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to Courses</Button>
            <Card style={{width: "700px" , margin: "auto"}}>
                <Card.Header className="exam-detail-title">Course Details</Card.Header><hr></hr>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p>Course name: {this.state.course.name}</p>
                        <p>Course description: {this.state.course.description}</p>
                        {this.state.teacher == null ? <p>Teacher Couldnt found</p> : <p>Course Teacher: {this.state.teacher.info.name} {this.state.teacher.info.surname}</p>}
                        {this.state.teacher == null ? <p>Teacher Couldnt found</p> : <p>Teacher Email: {this.state.teacher.info.mail}</p>}
                    </blockquote>
                </Card.Body>
            </Card>
        </>
    }

    render() {
        return this.state.course == null ? <div>Course detail is loading...</div> : this.prepareDetail();
    }
}

export default StudentCourseDetail;