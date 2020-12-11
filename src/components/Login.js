import React, { useState } from 'react';
import { Form, Button, Alert, Card, Col, Container } from 'react-bootstrap';
import facade from '../apiFacade';
import { useHistory } from 'react-router-dom';
import googol from "../img/googol.png"

function Login(props) {
  const history = useHistory();
  const init = { username: '', password: '' };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState(null);

  const performLogin = (evt) => {
    evt.preventDefault();
    setError(null);
    if (loginCredentials.username !== '' && loginCredentials.password !== '') {
      facade
        .login(loginCredentials.username, loginCredentials.password)
        .then(() => {
          props.setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => {
          if (err.status == 403) {
            console.log(err);
            setError('Wrong username or password!');
          } else {
            setError('Something went wrong while logging in');
          }
        });
    } else {
      setError('Missing username or password');
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <Container>
      <Col className="d-flex justify-content-center mt-5">
        <div>
          <img className="img-fluid" src={googol}></img>
          <div>
            <Card style={{ width: '35rem' }} className="mt-3">
              <Card.Header>
                <h4>Login</h4>
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
                  <Button variant="primary" type="submit" onClick={performLogin}>
                    Login
                  </Button>
                  </div>
                </Form>
                {console.log(props.loggedIn)}
              </Card.Body>
            </Card>
          </div>
        </div>
      </Col>
    </Container>

  );
}
export default Login;
