import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useReducer } from "react";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmation: ""
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  }

  console.log("state: ", state);
  return (
    <Container fluid>
      <Row
        id="App-Container"
        className="align-items-center justify-content-center"
      >
        <Col lg="8">
          <Card>
            <Card.Body className="p-4">
              <Form className="mb-2">
                <h1 className="display-4">Sign up</h1>
                <Form.Group controlId="formBasicEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    aria-label="Name"
                    onChange={onChange}
                    name="name"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formConfirmEmail">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    aria-label="Email"
                    onChange={onChange}
                    name="email"
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    aria-label="Password"
                    onChange={onChange}
                    name="password"
                  />
                </Form.Group>
                <Form.Group controlId="formConfirmPassword">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    aria-label="Password Confirmation"
                    onChange={onChange}
                    name="confirmation"
                  />
                </Form.Group>
                <Button variant="main" size="lg" block>
                  Sign up
                </Button>
              </Form>
              <div className="d-flex justify-content-center">
                <p>Have an account? &nbsp;</p>
                <Link to="/login">
                  <b>Log in!</b>
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
