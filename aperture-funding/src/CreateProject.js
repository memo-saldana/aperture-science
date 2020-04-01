import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useReducer, useEffect } from "react";
import Row from "react-bootstrap/Row";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import { URI } from "./config";

const initialState = {
  title: "",
  subtitle: "",
  categories: ["", "Category 1", "Category 2"],
  selectedCategory: "",
  startDate: "",
  endDate: "",
  dateError: "",
  goal: 0.0,
  description: "",
  picture: "",
  picError: ""
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function checkInputs(state) {
  if (state.startDate > state.endDate) {
    return false;
  }
  if (
    state.title === "" &&
    state.subtitle === "" &&
    state.selectedCategory === "" &&
    state.description === "" &&
    state.picture === ""
  ) {
    return false;
  }
  if (state.goal <= 0.0) {
    return false;
  } else return true;
}

const CreateProject = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ field: "selectedCategory", value: state.categories[0] });
    bsCustomFileInput.init();
  }, [state.categories]);

  const onChange = e => {
    if (e.target.name === "image") {
      const fileObj = e.target.files[0];
      const fileType = fileObj.type.split("/")[0];
      if (fileType !== "image") {
        return dispatch({ field: "picError", value: "File must be an image" });
      }
      dispatch({ field: "picError", value: "" });
      dispatch({ field: "picture", value: e.target.files[0] });
    }
    if (e.target.name === "goal" && e.target.value < 0) {
      dispatch({ field: e.target.name, value: 0 });
    } else {
      dispatch({ field: e.target.name, value: e.target.value });
    }
  };

  const _postHandler = _ => {
    if (checkInputs(state)) {
      let projectData = {
        title: state.title,
        subtitle: state.subtitle,
        description: state.description,
        picture: state.picture,
        category: state.selectedCategory,
        campaingStart: state.startDate,
        campaingEnd: state.endDate,
        goal: state.goal
      };
      return axios
        .post(URI + "/api/", projectData)
        .then(response => {
          console.log(response);
          return null;
        })
        .catch(error => {
          if (error.response) {
            return error.response.data.message;
          } else return error.message;
        });
    }
  };

  const _postProject = async e => {
    e.preventDefault();
    let respError = await _postHandler();
    if (respError) {
      dispatch({ field: "dateError", value: respError });
    } else {
      history.push("/");
    }
  };

  console.log(state);
  return (
    <Container fluid>
      <Row id="App-Container" className="justify-content-center">
        <Container>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Card className="mt-4">
                  <Card.Body>
                    <h1 className="display-6">General</h1>

                    <Form.Group controlId="formProjectTitle">
                      <Form.Label>Project title</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formProjectSubtitle">
                      <Form.Label>Project Subtitle</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows="2"
                        placeholder="Subtitle"
                        name="subtitle"
                        onChange={onChange}
                      />
                      <Form.Text className="text-muted">
                        A very concise description of your project.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formProjectCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        as="select"
                        name="selectedCategory"
                        onChange={onChange}
                      >
                        {state.categories.map(category => {
                          return <option key={category}>{category}</option>;
                        })}
                      </Form.Control>
                    </Form.Group>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formProjectDateStart">
                        <Form.Label>Campaign Start</Form.Label>
                        <Form.Control
                          type="date"
                          name="startDate"
                          onChange={onChange}
                        />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formProjectDateEnd">
                        <Form.Label>Campaign End</Form.Label>
                        <Form.Control
                          type="date"
                          name="endDate"
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Form.Row>
                    <p className="error">{state.dateError}</p>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Body>
                    <h1 className="display-6">Funding</h1>

                    <Form.Group controlId="formProjectGoalAmount">
                      <Form.Label>Goal amount</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                        name="goal"
                        onChange={onChange}
                        value={state.goal}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Form.Group>

              <Form.Group as={Col}>
                <Card className="mt-4">
                  <Card.Body>
                    <h1 className="display-6">Project Description</h1>
                    <Form.Group controlId="formBasicDescription">
                      <Form.Control
                        as="textarea"
                        rows="10"
                        placeholder="Describe your project..."
                        name="description"
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
                <div className="custom-file mt-3">
                  <input
                    id="inputGroupFile01"
                    type="file"
                    className="custom-file-input"
                    name="picture"
                    onChange={onChange}
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Choose file
                  </label>
                  <p className="error">{state.picError}</p>
                </div>
              </Form.Group>
            </Form.Row>
            <Button variant="main" onClick={_postProject}> Create Project </Button>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default CreateProject;
