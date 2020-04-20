import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import React, { useReducer, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import { URI } from "./config";

const initialState = {
  title: "",
  subtitle: "",
  categories: ["", "Category 1", "Category 2"],
  selectedCategory: "",
  dateError: "",
  goal: 0.0,
  description: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function checkInputs(state, startDate, endDate, picture) {
  if (startDate == null && endDate && null) {
    return false;
  }
  if (
    state.title === "" &&
    state.subtitle === "" &&
    state.selectedCategory === "" &&
    state.description === "" &&
    picture === null &&
    startDate === null &&
    endDate === null &&
    state.goal <= 0.0
  ) {
    return false;
  } else return true;
}

const dateParser = (dateStr) => {
  let data = dateStr.split('-');
  let date = {
    year: parseInt(data[0]),
    month: parseInt(data[1]),
    day: parseInt(data[2])
  };

  let dateObj = new Date(date.year, date.month - 1, date.day);
  return dateObj;
}

const CreateProject = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [picture, setPicture] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    dispatch({ field: "selectedCategory", value: state.categories[0] });
    bsCustomFileInput.init();
  }, [state.categories]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    let msg = "";

    if (startDate < today && startDate !== null) {
      msg = "Date must be from today onwards";
    } if (startDate >= endDate && endDate !== null) {
      msg = "Start date should be after end date";
    }

    return dispatch({ field: "dateError", value: msg });

  }, [startDate, endDate]);

  const onChange = e => {
    const name = e.target.name;
    if (name === "picture" && typeof(e.target.files[0]) !== "undefined") {
      setPicture(e.target.files[0]);
    } if (e.target.name === "startDate" || e.target.name === "endDate"){
      let date = dateParser(e.target.value);
      name === "startDate" ? setStartDate(date) : setEndDate(date);
    }
    else {
      dispatch({ field:name, value: e.target.value });
    }
  };

  const _postHandler = _ => {
    if (checkInputs(state)) {
      let fd = new FormData();
      
      fd.append('title', state.title);
      fd.append('subtitle', state.subtitle);
      fd.append('category', startDate.selectedCategory);
      fd.append('campaignStart', startDate);
      fd.append('campaignEnd', endDate);
      fd.append('goal', state.goal);
      fd.append('description', state.description);
      fd.append('picture', picture, picture.name);
      
      return axios
        .post(URI + "/api/", fd)
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
      console.log(respError);
    } else {
      history.push("/");
    }
  };

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
                    
                    <p className="error">{state.dateError}</p>
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
                        min = {0.0}
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
                    accept="image/*"
                  />
                  <label
                    className="custom-file-label"
                    htmlFor="inputGroupFile01"
                  >
                    Select picture
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
