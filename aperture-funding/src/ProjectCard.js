import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";


function ProjectCard(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.image} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ProgressBar now={props.progress} />
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
