import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React from 'react';

const CreateProject = () => {
    return (
        <Container>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Card className="mt-4">
                            <Card.Body>
                                <h1 className="display-6">General</h1>

                                <Form.Group controlId="formProjectTitle">
                                    <Form.Label>Project title</Form.Label>
                                    <Form.Control type="text" placeholder="Title" />
                                </Form.Group>

                                <Form.Group controlId="formProjectSubtitle">
                                    <Form.Label>Project Subtitle</Form.Label>
                                    <Form.Control as="textarea" rows="2" placeholder="Subtitle" />
                                    <Form.Text className="text-muted">
                                        A very concise description of your project.
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group controlId="formProjectCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" >
                                        <option>Category 1</option>
                                        <option>Category 2</option>
                                        <option>Category 3</option>
                                        <option>Category 4</option>
                                    </Form.Control>
                                </Form.Group>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formProjectDateStart">
                                        <Form.Label>Campaign Start</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formProjectDateEnd">
                                        <Form.Label>Campaign End</Form.Label>
                                        <Form.Control type="date" />
                                    </Form.Group>
                                </Form.Row>

                            </Card.Body>
                        </Card>

                        <Card className="mt-4">
                            <Card.Body>
                                <h1 className="display-6">Funding</h1>

                                <Form.Group controlId="formProjectGoalAmount">
                                    <Form.Label>Goal amount</Form.Label>
                                    <Form.Control type="number" placeholder="0.00" step="0.01" />
                                </Form.Group>
                            </Card.Body>
                        </Card>
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Card className="mt-4">
                            <Card.Body>
                                <h1 className="display-6">Project Description</h1>
                                <Form.Group controlId="formBasicDescription">
                                    <Form.Control as="textarea" rows="10" placeholder="Describe your project..." />
                                </Form.Group>
                            </Card.Body>
                        </Card>

                        <Button className="mt-2" variant="secondary" type="submit"> Upload an image </Button>

                    </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit"> Create Project </Button>
            </Form>
        </Container>
    );
}

export default CreateProject;