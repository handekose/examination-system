import React from 'react';
import { Form, Button, Card , Row} from 'react-bootstrap';
import { Call } from 'helpers/ApiCallHelper';
import { Open } from 'helpers/HistoryHelper';
import swal from 'sweetalert';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
    }

    checkUser = () => {
        let putModel = {
            userName: this.state.username,
            password: this.state.password,
        }
        let callProps = {
            endpoint: "user/login",
            method: "POST",
            data: putModel,
            success: (response) => {
                console.log(response);
                if (response.isSuccess) {
                    localStorage.setItem("accessToken", response.data.accessToken);
                    localStorage.setItem("userType", response.data.user.type);
                    localStorage.setItem("userId", response.data.user.id);
                    window.location.href = "/" + response.data.user.type + "/dashboard"
                }
                else {
                    swal("Failed!", response.errorMessage ? response.errorMessage : "Login is failed", "error");
                }
            },
            error: (error) => { console.log(error) }
        }
        Call(callProps);
    }

    render() {
        return <Row>
        <Card style={{ width: "40%", backgroundColor: "transparent", margin: "0", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Form style={{ padding: "2rem" }}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="username"
                        placeholder="Enter Username"
                        value={this.state.username}
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                </Form.Group>
                <Button variant="primary" onClick={this.checkUser}>
                    Login
            </Button>
            </Form>
        </Card>
        </Row>
    }
}

export default Login;