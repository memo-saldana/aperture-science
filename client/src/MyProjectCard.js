import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import React from "react";
import Row from "react-bootstrap/Row";
import { useHistory } from "react-router-dom";
import { getUserId } from "./TokenUtilities";

function MyProjectCard({_id, image, title, description, category, completed, days}) {

  let history = useHistory();

  const goToProject = e => {
    const { value } = e.target;
    history.push(`/edit-project?owner=${getUserId()}&&projectId=${value}`)
  }

  return (
    <Card className="m-4">
      <Row className="align-items-center p-3">
        <Col>
          <Image rounded src={image} className="w-100"/>
        </Col>

        <Col md={8} className="p-3">
          <h2 className="card-title">{title}</h2>
          <Card.Text>{description}</Card.Text>
          <Badge variant="dark">{category}</Badge>
        </Col>

        <Col>
          <Card.Text>
            <b>{completed}% backed</b>
          </Card.Text>
          <Card.Text>
            <b>{days} day(s) left</b>
          </Card.Text>
          <Button variant="main" block value={_id} onClick={goToProject}>
            Edit
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default MyProjectCard;
