import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { GetPageId } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class AdminCourseAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: GetPageId(),
            course: null
        }
        this.inputCourseName = React.createRef(this);
        this.inputDescription = React.createRef(this);
        this.inputTeacherId = React.createRef(this); 
    }

    returnToList = () => {
        Open(this.props.history, '/admin/courses')
    }

    save = () => {
        let putModel = {
            id: null,
            name: this.inputCourseName.current.value,
            description: this.inputDescription.current.value,
            teacherId: this.inputTeacherId.current.value,
          
        };
        let callProps = {
            endpoint: "courses/",
            method: "POST",
            data: putModel,
            success: (response) => {
                console.log(response);
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
        this.returnToList();
    }

    prepareCourseDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>

                    <Col md="12">
                        <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to list</Button>
                    </Col>
                </Row>
            </Col>
            <Col md="8">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputCourseName}
                        placeholder="name"
                        aria-label="name"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="8">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Description</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputDescription}
                        placeholder="description"
                        aria-label="description"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="8">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Teacher Id</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputTeacherId}
                        placeholder="teacherId"
                        aria-label="teacherId"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="info" size="sm" onClick={this.save} style={{ float: "left" }}>Add New Course</Button>
            </Col>
        </Row>
    }

    render() {
        return <div>{this.prepareCourseDetail()}</div>
    }
}

export default AdminCourseAdd;