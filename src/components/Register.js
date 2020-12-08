import React, { useState } from 'react';
import { Col, Container, Row, ListGroup, Card, Button, Alert, Form } from 'react-bootstrap';
import facade from '../apiFacade';
import googol from "../img/googol.png"
import { useHistory } from 'react-router-dom';
import Header from './Header';

function Register(props) {
    const history = useHistory();
    const init = { username: '', password: '' };
    const [user, setUser] = useState(init);
    const [error, setError] = useState(null);

    function onChange(evt) {
        setUser({
            ...user,
            [evt.target.id]: evt.target.value,
        });
    }

    function performRegister(evt) {
        evt.preventDefault();
        setError(null);
        if (user.username === "" && user.password === "") {
            setError('Missing username or password');
        } else {
            facade.putData("/user/create", "POST", user).then(a => {
                facade.setToken(a.token);
                props.setLoggedIn(true);
                history.push('/');
            }).catch((err) => {
                if (err.status == 403) {
                    setError('Wrong username or password!');
                } else {
                    setError('Something went wrong while logging in');
                }
            });
        }
    }

    return (
        <>
            <Container>
                <Col className="d-flex justify-content-center mt-5">
                    <div>
                        <img className="img-fluid" src={googol}></img>
                        <div>
                        <Card style={{ width: '35rem' }} className="mt-3">
                            <Card.Header>
                                <h4>Register</h4>
                            </Card.Header>
                            <Card.Body>
                                <Form onChange={onChange}>
                                    <Form.Group>
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter username"
                                            id="username"
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" id="password" />
                                    </Form.Group>
                                    {error && <Alert variant="danger">{error}</Alert>}
                                    <div style={{'text-align': 'center'}}>
                                    <Button variant="primary" type="submit" onClick={performRegister} >
                                        Create User
                                    </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                        </div>
                    </div>
                </Col>
            </Container>
        </>
    );
}
export default Register;