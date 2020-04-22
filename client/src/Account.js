import './Account.css'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Image from 'react-bootstrap/Image'
import React, { useState } from "react";
import Row from "react-bootstrap/Row";

const Account = () => {
    return (
        <Container>
            <Form>
                <Row>
                    <Col md={3}>
                        <div className="account-image">
                            <Image src="https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg" alt="Account Image" />
                        </div>
                    </Col>
                    <Col md={9}>
                        <Form.Group controlId="formName">
                            <Form.Control type="text" placeholder="Name..." />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" rows="3" placeholder="About..." />
                        </Form.Group>
                    </Col>
                </Row>
                <h2>Payment info</h2>
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
                <Button variant="primary" type="submit">
                    Save
            </Button>
            </Form>
        </Container>
    );
}

export default Account;