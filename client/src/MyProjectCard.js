import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import React from "react";
import Row from "react-bootstrap/Row";

function MyProjectCard(props) {
  return (
    <Card className="m-4">
      <Row className="align-items-center p-3">
        <Col>
          <Image rounded src={props.image} className="w-100"/>
        </Col>

        <Col md={8} className="p-3">
          <h2 className="card-title">{props.title}</h2>
          <Card.Text>{props.description}</Card.Text>
          <Badge variant="dark">{props.category}</Badge>
        </Col>

        <Col>
          <Card.Text>
            <b>{props.completed}% backed</b>
          </Card.Text>
          <Card.Text>
            <b>{props.days} day(s) left</b>
          </Card.Text>
          <Button variant="main" block>
            Edit
          </Button>
        </Col>
      </Row>
    </Card>
  );
}

export default MyProjectCard;
