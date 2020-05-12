import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";

const ProjectCard = ({image, title, description, onClick, progress, projectId}) => {
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ProgressBar now={progress} />
        <Button variant="main" className="mt-2" block onClick={onClick} value={projectId}>
          Check Project
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default ProjectCard;
