import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

const RecoveryForm = ({
  setPassword,
  setConfirmation,
  _handleClick,
  _handleKeyDown,
}) => {
  return (
    <Form className="mb-2">
      <h1 className="display-4">Reset password</h1>
      <Form.Group controlId="formBasicPassword">
        <Form.Control
          className="mb-2"
          type="password"
          placeholder="New password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group controlId="formBasicPasswordConfirmation">
        <Form.Control
          className="mb-2"
          type="password"
          placeholder="Confirm password"
          onChange={(e) => {
            setConfirmation(e.target.value);
          }}
          onKeyDown={_handleKeyDown}
        />
      </Form.Group>
      <Button variant="main" size="lg" block onClick={_handleClick}>
        Log in
      </Button>
    </Form>
  );
};

export default RecoveryForm;
