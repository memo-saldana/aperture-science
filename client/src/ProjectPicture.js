import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Preview from "./Preview";
import React from "react";

const ProjectPicture = ({ fileURL, fileURLError, title, subtitle, onChange }) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h1 className="display-6">Project Picture</h1>
        <Preview fileURL={fileURL} subtitle={subtitle} title={title} />
        <span className="error">{fileURLError}</span>
        <Form.Control
          value={fileURL}
          type="text"
          placeholder={fileURL === "" ? "Image URL" : fileURL}
          name="fileURL"
          onChange={onChange}
        />
      </Card.Body>
    </Card>
  );
};

export default ProjectPicture;
