import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import React from 'react';
import { Col, Row, Card, Button } from 'react-bootstrap';

class TeacherExamList extends React.Component {
    constructor(props) {
        super(props)    

        this.state = {
            teacherId: localStorage.getItem("userId"),
            exams: null
        };
    }

    componentDidMount() {
        this.getExams();
    }

    getExams = () => {
        let callProps = {
            endpoint: "exams/getByTeacherId/" + this.state.teacherId,
            method: "GET",
            success: (response) => { 
                this.setState({ exams: response }); 
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onDetailClick = (id) => {
        Open(this.props.history, '/teacher/exams/edit', id)
    }

    onDeleteClick = (id) => {
        let callProps = {
            endpoint: "exams/" + id,
            method: "DELETE",
            success: (response) => { this.getExams() },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    onAddExamClick = () => {
        Open(this.props.history, '/teacher/exams/add')
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

    prepareExamList = () => {
        let content = [];

        this.state.exams.forEach(element => {
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
                                <Button variant="primary" size="sm" onClick={() => { this.onDetailClick(element.id) }}>Detail</Button>
                                <Button variant="danger" size="sm" onClick={() => { this.onDeleteClick(element.id) }} style={{ marginLeft: "5px" }}>Delete</Button>
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
                        List of exams
                    </Col>
                    <Col md="3">
                        <Button variant="primary" size="sm" onClick={() => { this.onAddExamClick() }} style={{ float: "right" }}>Add New Exam</Button>
                    </Col>
                </Row>
            </Col>
            <hr style={{ width: "100%" }} />
            {content}
        </Row>
    }

    render() {
        return this.state.exams == null ? <div>Exams is loading...</div> : this.prepareExamList();
    }
}

export default TeacherExamList;