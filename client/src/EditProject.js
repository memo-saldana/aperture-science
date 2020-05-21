import axios from "axios";
import {
  dateParser,
  whiteSpaceOrEmpty,
  reducer,
  checkInputs,
} from "./CreateProject";
import { getToken } from "./TokenUtilities";
import React, { useReducer, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { URI } from "./config";
import ProjectForm from "./ProjectForm";

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
};

export const dateUnParser = (date) => {
  if (date !== undefined && date !== null) {
    const dateObj = typeof date === "string" ? dateParser(date) : date;
    let year = dateObj.getFullYear();
    let month =
      dateObj.getMonth() < 10 ? `0${dateObj.getMonth()}` : dateObj.getMonth();
    let day =
      dateObj.getDate() < 10 ? `0${dateObj.getDate()}` : dateObj.getDate();
    return date === "" ? "" : `${year}-${month}-${day}`;
  }

  return "";
};

const EditProject = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [categories, setCategories] = useState([{}]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  let history = useHistory();
  let location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { owner, projectId } = parsed;

  useEffect(() => {
    const fetchProjectData = async () => {
      const { data } = await axios(`${URI}/api/projects/${projectId}`);
      const { project } = data;

      dispatch({ field: "title", value: project.title });
      dispatch({ field: "subtitle", value: project.subtitle });
      dispatch({ field: "description", value: project.description });
      dispatch({ field: "selectedCategory", value: project.category });
      dispatch({ field: "goal", value: project.goal });
      dispatch({ field: "fileURL", value: project.picture });

      let stDate = project.campaignStart;
      let eDate = project.campaignEnd;
      setStartDate(dateParser(stDate));
      setEndDate(dateParser(eDate));

      let categoryData = await axios(`${URI}/api/categories`);
      const cats = categoryData.data;
      const updatedCategories = [{ _id: 0, name: "-" }, ...cats];
      const selectedCat = cats.find((cat) => cat._id === cats[0]._id);

      dispatch({ field: "selectedCategory", value: selectedCat });
      setCategories(updatedCategories);
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    let errorMsg = "";

    if (startDate < today && startDate !== "") {
      errorMsg = "Start date must be from today onwards";
    } else if (startDate >= endDate && endDate !== "") {
      errorMsg = "End date should be after start date";
    }

    return dispatch({ field: "dateError", value: errorMsg });
  }, [startDate, endDate]);

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

  const _editHandler = (_) => {
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

      console.log(data);

      return axios
        .put(URI + `/api/users/${owner}/projects/${projectId}`, data, {
          headers: {
            Authorization: `Bearer: ${getToken()}`,
          },
        })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          if (error.response) {
            return error.response.data.message;
          } else return error.message;
        });
    }
  };

  const _editProject = async (e) => {
    e.preventDefault();
    let respError = await _editHandler();
    if (respError) {
      return respError;
    } else {
      history.push("/");
    }
  };

  return (
    <ProjectForm
      titleError={state.titleError}
      subtitleError={state.subtitleError}
      selectedCategory={state.selectedCategory.name}
      selectedCategoryError={state.selectedCategoryError}
      categories={categories}
      dateError={state.dateError}
      goal={state.goal}
      fileURL={state.fileURL}
      title={state.title}
      subtitle={state.subtitle}
      onChange={onChange}
      descriptionError={state.descriptionError}
      description={state.description}
      fileURLError={state.fileURLError}
      method={_editProject}
      startDate={startDate}
      endDate={endDate}
      action="Edit"
    />
  );
};

export default EditProject;
