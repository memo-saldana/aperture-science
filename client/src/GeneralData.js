import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { dateUnParser } from "./EditProject";
import Form from "react-bootstrap/Form";
import React from "react";

const GeneralData = ({
  title,
  titleError,
  onChange,
  subtitle,
  subtitleError,
  categories,
  selectedCategoryError,
  dateError,
  startDate,
  endDate
}) => {
  return (
    <Card className="mt-4">
      <Card.Body>
        <h1 className="display-6">General</h1>

        <Form.Group controlId="formProjectTitle">
          <Form.Label>
            Project title
            <span className="error">{titleError}</span>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder={title === "" ? "Title" : title}
            name="title"
            onChange={onChange}
          />
        </Form.Group>

        <Form.Group controlId="formProjectSubtitle">
          <Form.Label>
            Project Subtitle
            <span className="error">{subtitleError}</span>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            placeholder={subtitle === "" ? "Subtitle" : subtitle}
            name="subtitle"
            onChange={onChange}
          />
          <Form.Text className="text-muted">
            A very concise description of your project.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formProjectCategory">
          <Form.Label>
            Category
            <span className="error">{selectedCategoryError}</span>
          </Form.Label>
          <Form.Control as="select" name="selectedCategory" onChange={onChange}>
            {categories.map((category, index) => {
              return (
                <option key={category._id || index}>{category.name}</option>
              );
            })}
          </Form.Control>
        </Form.Group>

        <p className="error">{dateError}</p>
        <Form.Row>
          <Form.Group as={Col} controlId="formProjectDateStart">
            <Form.Label>Campaign Start</Form.Label>
            <Form.Control type="date" name="startDate" value={dateUnParser(startDate)} onChange={onChange} />
          </Form.Group>

          <Form.Group as={Col} controlId="formProjectDateEnd">
            <Form.Label>Campaign End</Form.Label>
            <Form.Control type="date" name="endDate" value={dateUnParser(endDate)} onChange={onChange} />
          </Form.Group>
        </Form.Row>
      </Card.Body>
    </Card>
  );
};

export default GeneralData;
