import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Description from "./Description";
import Form from "react-bootstrap/Form";
import Funding from "./Funding";
import GeneralData from "./GeneralData";
import ProjectPicture from "./ProjectPicture";
import Row from "react-bootstrap/Row";
import React from "react";

const ProjectForm = ({
  titleError,
  subtitleError,
  selectedCategory,
  selectedCategoryError,
  categories,
  dateError,
  goal,
  fileURL,
  title,
  subtitle,
  onChange,
  descriptionError,
  description,
  fileURLError,
  method,
  startDate,
  endDate,
  action
}) => {
  return (
    <Container fluid>
      <Row id="App-Container" className="justify-content-center">
        <Container>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <GeneralData
                    title = {title}
                    titleError = {titleError}
                    onChange = {onChange}
                    subtitle = {subtitle}
                    subtitleError = {subtitleError}
                    categories = {categories}
                    selectedCategory = {selectedCategory}
                    selectedCategoryError = {selectedCategoryError}
                    dateError = {dateError}
                    startDate = {startDate}
                    endDate = {endDate}
                />
                <Funding
                    onChange = { onChange }
                    goal = { goal }
                />
              </Form.Group>

              <Form.Group as={Col}>
                <Description
                description = {description}
                descriptionError = {descriptionError}
                onChange = {onChange}
                />

                <ProjectPicture
                    fileURL = {fileURL}
                    fileURLError = {fileURLError}
                    title = {title}
                    subtitle = {subtitle}
                    onChange = {onChange}
                />
              </Form.Group>
            </Form.Row>
            <Button variant="main" onClick={method} className="mb-3">
              {action} Project
            </Button>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default ProjectForm;
