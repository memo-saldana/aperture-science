import "./Account.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import React, { useEffect, useReducer } from "react";
import { getToken, getUserId, deleteToken, deleteUserId } from "./TokenUtilities";
import Row from "react-bootstrap/Row";
import { URI } from "./config";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  name: "",
  about: "",
  email: "",
  stripeId: "",
  nameError: "",
  userState: "",
  finishedFetch: false,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const Account = ({ history, location }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const OAuthLink = 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=' + 'ca_H8sVQtZQ9URkeJKBgInu8Dck8gVKXcj7' + '&scope=read_write&state=' + state.userState;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ field: name, value: value });
  };

  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { owner, accountId } = parsed;

  useEffect(() => {
    const fetchData = async () => {
      let token;
      if (!getUserId()) {
        token = "";
      }
      else {
        token = getToken();
      }
      let { data } = await axios(`${URI}/api/users/${accountId}`, { headers: { Authorization: `Bearer ${token}` } });
      data = data["user"];
      const { name, about, email, stripeId } = data;
      dispatch({ field: "name", value: name });
      dispatch({ field: "email", value: email });
      dispatch({ field: "about", value: about});
      dispatch({ field: "stripeId", value: stripeId });

      let state = await axios(`${URI}/api/users/${accountId}/state`, { headers: { Authorization: `Bearer ${getToken()}` } });
      state = state.data.state
      dispatch({ field: "userState", value: state })
      dispatch({ field: "finishedFetch", value: true })
    };
    fetchData()
    .catch(error => {
      if (error.response) {
        if (error.response.status === 405) {
          deleteToken();
          deleteUserId();
          history.push("/login", {error: 'Your session expired, pleas log in again'});
        }
      } else {
        history.push("/login", {error: "There was an error with your session, please log in again"})
      }
    })
  }, [owner, accountId]);

  const _saveUser = _ => {
      let { name, about } = state;
      return axios
        .put(`${URI}/api/users/${accountId}`, { name, about }, { headers: { Authorization: `Bearer ${getToken()}` } })
        .then(response => {
          toast.success("Your account information was saved");
          return null;
        })
        .catch(error => {
          if (error.response) {
            if (error.response.statusCode === 401 || error.response.statusCode === 405) {
                deleteToken();
                deleteUserId();
                history.push("/login", {error: 'Your session expired, pleas log in again'});
            } 
            toast.error(error.response.data.message);
            return error.response.data.message;
          } else {
            toast.error("There was an error");
            return error.message;
          }
        });
    }

  const onClick = async _ => {
    if (state.name === "") {
      return dispatch({ field: "nameError", value: "Name cannot be empty" });
    }
    let ans = await _saveUser();
  };

  const _deleteStripe = _ => {
    let stripeId = "";
      return axios
        .put(`${URI}/api/users/${accountId}`, { stripeId }, { headers: { Authorization: `Bearer ${getToken()}` } })
        .then(response => {
          toast.success("Your stripe account was successfuly disconnected");
          return response;
        })
        .catch(error => {
          console.log(error);
          if (error.response) {
            if (error.response.statusCode === 401 || error.response.statusCode === 405) {
              deleteToken();
              deleteUserId();
              history.push("/login", {error: 'Your session expired, pleas log in again'});
            } 
            toast.error(error.response.data.message);
            return error.response.data.message;
          } else {
            toast.error("There was an error");
            return error.message;
          }
        });
    }

  const disconnectStripe = async _ => {
    let ans = await _deleteStripe();
    dispatch({ field: "stripeId", value: "" });
  }

  let stripeButton, saveButton, paymentInfo;
  if (getUserId() === accountId && state.finishedFetch) {
    paymentInfo = <h2>Payment info</h2>;
    saveButton = <Button variant="main" onClick={onClick}>Save</Button>;
    if (state.stripeId && state.stripeId !== "") {
      stripeButton = <Button className="btnS" onClick={disconnectStripe} variant="primary">Disconnect your stripe account</Button>
    }
    else {
      stripeButton = <Button className="btnS" href={OAuthLink} variant="primary">Connect with Stripe</Button>
    }
  }

  return (
    <Container fluid className="App">
      <>
      <ToastContainer 
        draggable={false}
        autoClose={4000}
      />
      </>
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
              {paymentInfo}
              {stripeButton}
              {saveButton}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Container>
  );
};

export default Account;