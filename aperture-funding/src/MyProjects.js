import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import React from 'react';
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

let dummyText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
let projects = [
    {
        title: "First Project",
        description: dummyText,
        category: "Mathematics",
        completed: 35,
        days: 27
    },
    {
        title: "Second Project",
        description: dummyText,
        category: "Physics",
        completed: 42,
        days: 12
    },
    {
        title: "Third Project",
        description: dummyText,
        category: "Chemistry",
        completed: 79,
        days: 1
    }
]

const MyProjects = () => {
    return (
        <Container fluid>
            <h1 className="display-4 pt-4 px-4">My Projects</h1>

            {projects.map(project => (
                <Card className="m-4">
                    <Row className="align-items-center p-3">
                        <Col>
                            <Image src="https://unsplash.it/200"/>
                        </Col>
        
                        <Col md={8} className="p-3">
                            <Card.Title>{project.title}</Card.Title>
                            <Card.Text>{project.description}</Card.Text>
                            <Badge variant="dark">{project.category}</Badge>
                        </Col>
        
                        <Col>
                            <Card.Text>{project.completed}% backed</Card.Text>
                            <Card.Text>{project.days} day(s) left</Card.Text>
                            <Button variant="main"> Edit </Button>
                        </Col>
        
                    </Row>
                </Card>
            ))}
        </Container>
    );
}

export default MyProjects; 