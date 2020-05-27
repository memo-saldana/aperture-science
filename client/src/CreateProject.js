import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { getUserId, getToken } from "./TokenUtilities";
import Jumbotron from "react-bootstrap/Jumbotron";
import React, { useReducer, useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { URI } from "./config";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  title: "",
  titleError: "",
  subtitle: "",
  subtitleError: "",
  selectedCategory: {},
  selectedCategoryError: "",
  dateError: "",
  goal: 10.0,
  description: "",
  descriptionError: "",
  fileURL: "",
  fileURLError: "",
  disabled: true,
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

function whiteSpaceOrEmpty(input) {
  return !/^\s*$/i.test(input);
}

function checkInputs(state, startDate, endDate, categories) {
  let data = [state.title, state.subtitle, state.description, state.fileURL];
  const isvalid = data.every((elem) => whiteSpaceOrEmpty(elem));

  return (
    isvalid &&
    state.selectedCategory !== categories[0] &&
    startDate !== null &&
    endDate !== null &&
    state.dateError === ""
  );
}

 export const dateParser = (dateStr) => {
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
  const [categories, setCategories] = useState([{}]);
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

      const updatedCategories = [{ _id: 0, name: "-" }, ...data];
      dispatch({ field: "selectedCategory", value: updatedCategories[0] });
      setCategories(updatedCategories);
    };

    fetchCategories();
  }, []);

  const onChange = (e) => {
    let { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      let date = dateParser(value);
      name === "startDate" ? setStartDate(date) : setEndDate(date);
    } else if (name === "selectedCategory") {
      const selectedCat = categories.find((cat) => cat.name === value);
      selectedCat === categories[0]
        ? dispatch({
            field: name + "Error",
            value: " Please select a category with value",
          })
        : dispatch({ field: name + "Error", value: "" });
      dispatch({ field: name, value: selectedCat });
    } else {
      if (name === "goal") {
        value = parseFloat(value);
      } else {
        let emptyorws = !whiteSpaceOrEmpty(value);
        emptyorws
          ? dispatch({
              field: name + "Error",
              value: " This field cannot be empty or whitespace",
            })
          : dispatch({ field: name + "Error", value: "" });
      }
      dispatch({ field: name, value: value });
    }
  };

  const _postHandler = (_) => {
    if (
      checkInputs(state, startDate, endDate, categories) &&
      state.dateError === ""
    ) {
      const data = {
        title: state.title,
        subtitle: state.subtitle,
        description: state.description,
        category: state.selectedCategory,
        goal: state.goal,
        campaignStart: startDate,
        campaignEnd: endDate,
        picture: state.fileURL,
      };

      const userId = getUserId();

      return axios
        .post(URI + `/api/users/${userId}/projects`, data, {
          headers: {
            Authorization: `Bearer: ${getToken()}`,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.statusCode === 401 || error.response.statusCode === 405) {
                history.push("/login");
            } 
            toast.error(error.response.data.message);
            return error.response.data.message;
          } else {
            toast.error("There was an error");
            return error.message;
          }
        });
    }
  };

  const _postProject = async (e) => {
    e.preventDefault();
    let respError = await _postHandler();
    if (respError) {
      return respError;
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
                      <Form.Label>
                        Project title
                        <span className="error">{state.titleError}</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Title"
                        name="title"
                        onChange={onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId="formProjectSubtitle">
                      <Form.Label>
                        Project Subtitle
                        <span className="error">{state.subtitleError}</span>
                      </Form.Label>
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
                      <Form.Label>
                        Category
                        <span className="error">
                          {state.selectedCategoryError}
                        </span>
                      </Form.Label>
                      <Form.Control
                        as="select"
                        name="selectedCategory"
                        onChange={onChange}
                      >
                        {categories.map((category, index) => {
                          return (
                            <option key={category._id || index}>
                              {category.name}
                            </option>
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
                        step="0.01"
                        name="goal"
                        onChange={onChange}
                        min={state.goal}
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
                    <span className="error">{state.descriptionError}</span>
                    <Form.Group controlId="formBasicDescription">
                      <Form.Control
                        as="textarea"
                        rows="8"
                        placeholder="Describe your project..."
                        name="description"
                        onChange={onChange}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Body>
                    <h1 className="display-6">Project Picture</h1>
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
                    <span className="error">{state.fileURLError}</span>
                    <Form.Control
                      type="text"
                      placeholder="Image URL"
                      name="fileURL"
                      onChange={onChange}
                    />
                  </Card.Body>
                </Card>
              </Form.Group>
            </Form.Row>
            <Button variant="main" onClick={_postProject}>
              Create Project
            </Button>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default CreateProject;
