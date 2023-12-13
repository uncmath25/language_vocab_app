import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';

import { PRACTICE_CARDS } from '../views/catalog';
import { getPaddingStyle } from '../utils/style';
import { login } from '../utils/user';

const ALERT_TIMEOUT_MS = 3000;

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failedLogin, setFailedLogin] = useState(false);
  const loginCallback = () => {
    login(username, password).then(d => {
      if (!d.isValid) {
        setFailedLogin(true);
        setTimeout(() => setFailedLogin(false), ALERT_TIMEOUT_MS);
      } else {
        props.setUserSecret(d.userSecret);
        props.setViewPage(PRACTICE_CARDS);
      }
    });
  };
  return (
    <Container>
      <Row>
        <Col xs={12} style={getPaddingStyle(20)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control placeholder="Username" onChange={(event) => setUsername(event.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Form.Control placeholder="Password" type="password" onChange={(event) => setPassword(event.target.value)} />
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Button variant="primary" onClick={loginCallback}>
             Login
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12} style={getPaddingStyle(10)} />
      </Row>
      <Row>
        <Col xs={12} md={3}>
          <Alert variant="danger" show={failedLogin} dismissible={true} onClose={() => setFailedLogin(false)}>
             Invalid username or password!
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}
