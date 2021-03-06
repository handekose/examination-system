import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import { GetPageId } from 'helpers/HistoryHelper';
import React from 'react';
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';

class AdminUserAdd extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: GetPageId(),
            user: null
        }
        this.inputUsername = React.createRef(this);
        this.inputType = React.createRef(this);
        this.inputName = React.createRef(this);
        this.inputSurname = React.createRef(this);
        this.inputMail = React.createRef(this);
        this.inputSchoolNumber = React.createRef(this);
    }

    returnToList = () => {
        Open(this.props.history, '/admin/users')
    }

    save = () => {
        let putModel = {
            id: null,
            userName: this.inputUsername.current.value,
            type: this.inputType.current.value,
            info: {
                name: this.inputName.current.value,
                surname: this.inputSurname.current.value,
                mail: this.inputMail.current.value,
                schoolNumber: this.inputSchoolNumber.current.value,
            }
          
        };
        let callProps = {
            endpoint: "users/",
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

    prepareUserDetail = () => {
        return <Row>
            <Col md="12" style={{ marginBottom: "10px" }}>
                <Row>

                    <Col md="12">
                        <Button variant="primary" size="sm" onClick={this.returnToList} style={{ float: "right" }}>Return to list</Button>
                    </Col>
                </Row>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Username</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputUsername}
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputType}
                        placeholder="Type"
                        aria-label="Type"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Name</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputName}
                        placeholder="Name"
                        aria-label="Name"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Surname</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputSurname}
                        placeholder="Surname"
                        aria-label="Surname"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Mail</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputMail}
                        placeholder="Mail"
                        aria-label="Mail"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="6">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">School Number</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        ref={this.inputSchoolNumber}
                        placeholder="SchoolNumber"
                        aria-label="SchoolNumber"
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
            </Col>
            <Col md="12" style={{ marginTop: "10px" }}>
                <Button variant="info" size="sm" onClick={this.save} style={{ float: "left" }}>Add New User</Button>
            </Col>
        </Row>
    }

    render() {
        return <div>{this.prepareUserDetail()}</div>
    }
}

export default AdminUserAdd;