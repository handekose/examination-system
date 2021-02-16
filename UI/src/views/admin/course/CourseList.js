import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';

class AdminCouseList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            courses: null
        };

    }

    componentDidMount() {
        this.getCourses();
    }

    getCourses = () => {
        let callProps = {
            endpoint: "courses",
            method: "GET",
            success: (response) => { this.setState({ courses: response }); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onDetailClick = (id) => {
        Open(this.props.history, '/admin/courses/edit', id)
    }

    onDeleteClick = (id) => {
        let callProps = {
            endpoint: "courses/" + id,
            method: "DELETE",
            success: (response) => { this.getCourses() },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onAddUserClick = () => {
        Open(this.props.history, '/admin/courses/add')
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
                                {element.type != "admin" ?
                                    <Button variant="danger" size="sm" onClick={() => { this.onDeleteClick(element.id) }} style={{ marginLeft: "5px" }}>Delete</Button> :
                                    ""}
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
                        List of all examination system courses
                    </Col>
                    <Col md="3">
                        <Button variant="primary" size="sm"onClick={() => { this.onAddUserClick() }} style={{ float: "right" }}>Add New Course</Button>
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

export default AdminCouseList;