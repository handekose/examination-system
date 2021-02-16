import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';

class TeacherCourseList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            teacherId: localStorage.getItem("userId"),
            courses: null
        };

    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses = () => {
        let callProps = {
            endpoint: "courses/getbyteactherid/" +this.state.teacherId,
            method: "GET",
            success: (response) => { this.setState({ courses: response }); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onDetailClick = (id) => {
        Open(this.props.history, '/teacher/courses/detail', id)
    }

    prepareCoursesList = () => {
        let content = [];

        this.state.courses.forEach(element => {
            content.push(
                <Col lg="3" sm="4" key={element.id}>
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-atom text-warning"></i>
                                    </div>
                                </Col>
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category">{element.description}</p>
                                        <Card.Title as="h4">{element.name}</Card.Title>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <Button variant="primary" size="sm" onClick={() => { this.onDetailClick(element.id) }}>Detail</Button>
                            </div>
                        </Card.Footer>
                    </Card>
                </Col>
            );
        });

        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>
                    <Col md="9" style={{ fontStyle: "italic" }}>
                        List of courses assigned to you...
                    </Col>
                </Row>
            </Col>
            <hr style={{ width: "100%" }} />
            {content}
        </Row>
    }

    render() {
        return this.state.courses == null ? <div>Courses is loading...</div> : this.prepareCoursesList();
    }
}

export default TeacherCourseList;