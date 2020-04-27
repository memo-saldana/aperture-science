import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import React, { useReducer, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { getUserId, getToken } from "./TokenUtilities";
import bsCustomFileInput from "bs-custom-file-input";
import axios from "axios";
import { URI } from "./config";

const initialState = {
  title: "",
  subtitle: "",
  selectedCategory: {},
  dateError: "",
  goal: 0.0,
  description: "",
  fileURL: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function checkInputs(state, startDate, endDate, picture) {
  return !(
    state.title === "" ||
    state.subtitle === "" ||
    state.selectedCategory === categories[0] ||
    state.description === "" ||
    picture === null ||
    startDate === null ||
    endDate === null ||
    state.goal <= 0.0
  );
}

const dateParser = (dateStr) => {
  let data = dateStr.split("-");
  let date = {
    year: parseInt(data[0]),
    month: parseInt(data[1]),
    day: parseInt(data[2]),
  };

  let dateObj = new Date(date.year, date.month - 1, date.day);
  return dateObj;
};

const CreateProject = ({ history }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([]);
  const [picture, setPicture] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    let errorMsg = "";

    if (startDate < today && startDate !== null) {
      errorMsg = "Start date must be from today onwards";
    } else if (startDate >= endDate && endDate !== null) {
      errorMsg = "End date should be after start date";
    }

    return dispatch({ field: "dateError", value: errorMsg });
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await axios(`${URI}/api/categories`);

      bsCustomFileInput.init();
      const updatedCategories = [{ _id: 0, name: "-" }, ...data];
      dispatch({ field: "selectedCategory", value: updatedCategories[0] });
      setCategories(updatedCategories);
    };

    fetchCategories();
  }, []);

  const onChange = (e) => {
    const name = e.target.name;

    if (name === "picture" && typeof e.target.files[0] !== "undefined") {
      setPicture(e.target.files[0]);
      dispatch({
        field: "fileURL",
        value: URL.createObjectURL(e.target.files[0]),
      });
    } else if (name === "startDate" || name === "endDate") {
      let date = dateParser(e.target.value);
      name === "startDate" ? setStartDate(date) : setEndDate(date);
    } else if (name === "selectedCategory") {
      const selectedCat = categories.find((cat) => cat.name === e.target.value);
      return dispatch({ field: name, value: selectedCat });
    } else {
      dispatch({ field: name, value: e.target.value });
    }
  };

  const _postHandler = (_) => {
    if (
      checkInputs(state, startDate, endDate, picture) &&
      state.dateError === ""
    ) {
      /*  
      let fd = new FormData();
      fd.append("picture", picture, picture.name); 
      */

      const data = {
        title: state.title,
        subtitle: state.subtitle,
        description: state.description,
        category: state.selectedCategory,
        goal: state.goal,
        campaignStart: startDate,
        campaignEnd: endDate,
      };

      const userId = getUserId();

      return axios
        .post(URI + `/api/users/${userId}/projects`, data, {
          headers: {
            Authorization: `Bearer: ${getToken()}`,
          },
        })
        .then((response) => {;
          return response;
        })
        .catch((error) => {
          if (error.response) {
            return error.response.data.message;
          } else return error.message;
        });
    }
  };

  const _postProject = async (e) => {
    e.preventDefault();
    let respError = await _postHandler();
    if (respError) {
      return respError;
    } else {
      //history.push("/");
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
                        {categories.map((category) => {
                          return (
                            <option key={category._id}>{category.name}</option>
                          );
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
                        min={0.0}
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

                <Card className="mt-3">
                  <Card.Body>
                    <Jumbotron
                      style={{
                        position: `relative`,
                        backgroundImage: `url(${
                          state.fileURL === "" ? "" : state.fileURL
                        })`,
                      }}
                      className="title-preview mb-3"
                    >
                      <div className="preview-data">
                        <h1>
                          {state.title === "" ? "Your Title" : state.title}
                        </h1>
                        <p>
                          {state.subtitle === ""
                            ? "A short description of your project"
                            : state.subtitle}
                        </p>
                      </div>
                    </Jumbotron>
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
                    </div>
                  </Card.Body>
                </Card>
              </Form.Group>
            </Form.Row>
            <Button variant="main" onClick={_postProject}>
              {" "}
              Create Project{" "}
            </Button>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default CreateProject;
