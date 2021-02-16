import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { GetPageId } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl, Card } from 'react-bootstrap';

class AdminEnrollmentAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            users:null,
            courses:null,
        }
        this.inputUser = React.createRef(this);
        this.inputCourse = React.createRef(this); 
    }

    returnToList = () => {
        Open(this.props.history, '/admin/enrollments')
    }
    componentDidMount() {
        this.getUsers();
        this.getCourses();
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
    /*save = () => {
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
    }*/

    prepareCourseDetail = () => {
        return <Row>
            <Col md="12">
                <Button variant="danger" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to List</Button>
            </Col>
            <Card style={{width: "800px" , margin: "auto"}}>
            <Col style={{marginTop:"2rem"}}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label style={{paddingTop: "13px"}} class="input-group-text" for="inputGroupSelect01">Students</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                {this.state.users ? this.state.users.map((user,index)=>{
                    <option value="3">Three</option>
                }) :  <option value="1">One</option>}
            </select>
            </div>
            </Col>

            <Col>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
                <label style={{paddingTop: "13px"}} class="input-group-text" for="inputGroupSelect01">Courses</label>
            </div>
            <select class="custom-select" id="inputGroupSelect01">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            </div>
            </Col>

            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="info" size="sm" onClick={this.save} style={{ float: "left" }}>Add New Enrollment</Button>
            </Col>
            </Card>

            </Row> 
    }

    render() {
        return <div>{this.prepareCourseDetail()}</div>
    }
}

export default AdminEnrollmentAdd;