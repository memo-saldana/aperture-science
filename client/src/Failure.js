import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import React from "react";

const Failure = () => {
    let projectURL = 'project/?projectId=' + localStorage.getItem('lastDonatedProject');
    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <h1>Something went wrong</h1>
                        <p>
                            We couldn't process your payment. Please try again
                        </p>
                        <Button href={projectURL} variant="danger">Return to project</Button>
                    </Col>
                    <Col md={4}>
                        <Image src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Close_Icon_Dark-512.png"></Image>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Failure;