import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';

class AdminEnrollmentList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            enrollments: null,
            users:null,
            courses:null,
        };

        console.log(props);
    }

    componentDidMount() {
        this.getEnrollments();
        this.getUsers();
        this.getCourses();
    }

    getEnrollments = () => {
        let callProps = {
            endpoint: "enrollments/",
            method: "GET",
            success: (response) => { this.setState({ enrollments: response }); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    getUsers = () => {
        let callProps = {
            endpoint: "courses/" ,
            method: "GET",
            success: (response) => { this.setState({ courses: response }); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }
    getCourses = () => {
        let callProps = {
            endpoint: "users/" ,
            method: "GET",
            success: (response) => { this.setState({ users: response }); },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }


    onDeleteClick = (id) => {
        let callProps = {
            endpoint: "enrollments/" + id,
            method: "DELETE",
            success: (response) => { 
                alert("Enrollment Deletion Successfull!")},
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onAddEnrollmentClick = () => {
        Open(this.props.history, '/admin/enrollments/add')
    }

    prepareEnrollmentList = () => {
        let content = [];

        this.state.enrollments.forEach(element => {
            content.push(
                <Col md="6" key={element.id}>
                    <Card className="card-stats">
                        <Card.Body>
                            <Row>
                               
                                <Col xs="7">
                                    <div className="numbers">
                                        <p className="card-category" style={{textAlign:"left"}}>{element.id}</p>
                                        <Card.Title as="h4">
                                            {this.state.users ? this.state.users.map((user, index) => {
                                                if(user.id == element.userId){
                                                    return <><p style={{textAlign:"left" , fontWeight: "bold"}}>{"Name/Surname : " + user.info.name + " " + user.info.surname}</p>
                                                    {this.state.courses ? this.state.courses.map((course, index) => {
                                                        if(course.id == element.courseId){
                                                            return <p style={{textAlign:"left" , fontWeight: "bold"}} >{"The Course Enrolled In : " + course.name}</p>
                                                        }                                                                                         
                                                    }) : ""}</>
                                                }                                                                                         
                                            }) : ""}
                                        </Card.Title>
                                    </div>
                                </Col>
                                <Col xs="5">
                                    <div className="icon-big text-center icon-warning">
                                        <i className="nc-icon nc-lock-circle-open text-warning"></i>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                        <Card.Footer>
                            <hr></hr>
                            <div className="stats">
                                <Button variant="danger" size="sm" onClick={() => { this.onDeleteClick(element.id) }}>Delete</Button>
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
                        List of all examination system enrollments
                    </Col>
                    <Col md="3">
                        <Button variant="primary" size="sm"onClick={() => { this.onAddEnrollmentClick() }} style={{ float: "right" }}>Add New Enrollment</Button>
                    </Col>
                </Row>
            </Col>
            <hr style={{ width: "100%" }} />
            {content}
        </Row>
    }

    render() {
        return this.state.enrollments == null ? <div>Enrollments are loading...</div> : this.prepareEnrollmentList();
    }
}

export default AdminEnrollmentList;