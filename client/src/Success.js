import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from 'react-bootstrap/Button';
import React from "react";

const Success = () => {
    let projectURL = 'project/?projectId=' + localStorage.getItem('lastDonatedProject');
    return (
        <Jumbotron>
            <Container>
                <Row>
                    <Col>
                        <h1>Congratulations!</h1>
                        <p>
                            The payment was submitted successfully. Thank you for your donation!
                        </p>
                        <Button href={projectURL} variant="success">Return to project</Button>
                    </Col>
                    <Col md={4}>
                        <Image src="https://cdn3.iconfinder.com/data/icons/flat-actions-icons-9/792/Tick_Mark_Dark-512.png"></Image>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
};

export default Success;