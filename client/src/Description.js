import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import React from "react";

const Description = ({ description, descriptionError, onChange }) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h1 className="display-6">Project Description</h1>
        <span className="error">{descriptionError}</span>
        <Form.Group controlId="formBasicDescription">
          <Form.Control
            as="textarea"
            rows="8"
            placeholder="Describe your project..."
            value={description}
            name="description"
            onChange={onChange}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default Description;
