import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import React from "react";

const Funding = ({ onChange, goal }) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h1 className="display-6">Funding</h1>

        <Form.Group controlId="formProjectGoalAmount">
          <Form.Label>Goal amount</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="goal"
            onChange={onChange}
            min={10}
            value={goal.toString(10)}
          />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default Funding;
