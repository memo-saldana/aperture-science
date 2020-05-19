import "./Account.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import React, { useEffect, useReducer } from "react";
import { getToken } from "./TokenUtilities";
import Row from "react-bootstrap/Row";
import { URI } from "./config";

const initialState = {
  name: "",
  about: "El chocomilk está RIQUIIIIIIISMO",
  nameError: "",
  userState: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const Account = ({ location }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const OAuthLink = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=' + 'ca_H8sVQtZQ9URkeJKBgInu8Dck8gVKXcj7' + '&scope=read_write&state=' + state.userState;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ field: name, value: value });
  };

  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let {owner, accountId } = parsed;

  console.log(parsed);

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios(`${URI}/api/users/${accountId}`, {headers: {Authorization: `Bearer ${getToken()}`}});
      data = data["user"];
      const { name } = data;
      dispatch({field: "name", value: name});

      let state = await axios(`${URI}/api/users/${accountId}/state`, {headers: {Authorization: `Bearer ${getToken()}`}});
      state = state.data.state
      dispatch({field: "userState", value: state})
    };
    fetchData();
  }, [owner, accountId]);

  const onClick = (_) => {
    if (state.name === "") {
      return dispatch({ field: "nameError", value: "Name cannot be empty" });
    }

    console.log("post here");
  };

  console.log(state);
  return (
    <Container fluid className="App">
      <Container>
        <h1 className="display-4 pt-4 mb-4">Account Details</h1>
        <Card>
          <Card.Body>
            <Form>
              <Row className="align-items-center mb-3">
                <Col md={3}>
                  <div className="account-image">
                    <Image
                      className="mb-3"
                      roundedCircle
                      src="https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg"
                      alt="Account Image"
                    />
                  </div>
                </Col>
                <Col md={9}>
                  <Form.Group controlId="formName">
                    <Form.Label className="d-inline-block">
                      Name: <span className="error">{state.nameError}</span>
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Name..."
                      name="name"
                      onChange={onChange}
                      value={state.name}
                    />
                  </Form.Group>

                  <Form.Group controlId="formAbout">
                    <Form.Label>About:</Form.Label>
                    <Form.Control
                      name="about"
                      as="textarea"
                      rows="3"
                      placeholder="About..."
                      onChange={onChange}
                      value={state.about}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <h2>Payment info</h2>
              {/* will change for stripe button */}
              <Button href={OAuthLink} variant="primary">Connect with Stripe</Button>
              <Button variant="main" onClick={onClick}>
                Save
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default Account;