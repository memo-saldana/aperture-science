import React from "react";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <Row className="justify-content-center">
      <Spinner animation="grow" variant="info" />
    </Row>
  );
};

export default Loading;
