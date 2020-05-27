import axios from "axios";
import { getUserId, getToken, deleteToken, deleteUserId } from "./TokenUtilities";
import ProjectForm from "./ProjectForm";
import React, { useReducer, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { URI } from "./config";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from "react-bootstrap/Container";

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

export function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

export function whiteSpaceOrEmpty(input) {
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

const CreateProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([{}]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let history = useHistory();

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    let errorMsg = "";
    console.log("today")
    console.log(today)
    console.log("start date")
    console.log(startDate)
    if (startDate < today && startDate !== "") {
      errorMsg = "Start date must be from today onwards";
    } else if (startDate >= endDate && endDate !== "") {
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
        goal: state.goal*100,
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
          return null;
        })
        .catch((error) => {
          if (error.response) {
            if (error.response.status === 401 || error.response.status === 405) {
              deleteToken();
              deleteUserId();               
              history.push("/login", {error: 'You need to be logged in to do that'});
            } 
            return error.response.data.message;
          } else {
            return error.message;
          }
        });
    } else {
      return "One or more of the fields is missing or invalid";
    }
  };

  const _postProject = async (e) => {
    e.preventDefault();
    let response = await _postHandler();
    if (response) {
      toast.error(response)
    } else {
      history.push("/");
    }
  };

  return (
    <Container>
      <ToastContainer 
          draggable={false}
          autoClose={4000}
        />
      <ProjectForm
          titleError = {state.titleError}
          subtitleError = {state.subtitleError}
          selectedCategoryError = {state.selectedCategoryError}
          categories = {categories}
          dateError = {state.dateError}
          goal = {state.goal}
          fileURL = {state.fileURL}
          title = {state.title}
          subtitle = {state.subtitle}
          onChange = {onChange}
          descriptionError = {state.descriptionError}
          description = {state.description}
          fileURLError = {state.fileURLError}
          method = {_postProject}
          startDate = {startDate}
          endDate = {endDate}
          action = "Create"
      />
    </Container>
  );
};

export default CreateProject;
