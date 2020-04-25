import "./Account.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import React, { useReducer } from "react";
import Row from "react-bootstrap/Row";

const initialState = {
  name: "Pancho Pantera",
  about: "El chocomilk está RIQUIIIIIIISMO",
  nameError: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const Account = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    dispatch({ field: name, value: value });
  };

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
              <Form.Row>
                <Form.Group as={Col} controlId="formCreditCard">
                  <Form.Label>Card</Form.Label>
                  <Form.Control type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
                </Form.Group>
                <Form.Group as={Col} controlId="formExpiration">
                  <Form.Label>Expiration</Form.Label>
                  <Form.Control type="month" placeholder="MM/YY" />
                </Form.Group>
                <Form.Group as={Col} controlId="formCVV">
                  <Form.Label>Card</Form.Label>
                  <Form.Control type="number" placeholder="CVV" />
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} controlId="formName">
                  <Form.Label>Cardholder name</Form.Label>
                  <Form.Control type="text" placeholder="Name..." />
                </Form.Group>
                <Form.Group as={Col} controlId="formName">
                  <Form.Label>Zip / Postal Code</Form.Label>
                  <Form.Control type="text" placeholder="#####" />
                </Form.Group>
              </Form.Row>
              <Button variant="main" onClick={onClick} block>
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
