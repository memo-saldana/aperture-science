import "./ProjectView.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { dateParser } from "./CreateProject";
import Image from "react-bootstrap/Image";
import Jumbotron from "react-bootstrap/Jumbotron";
import ProgressBar from "react-bootstrap/ProgressBar";
import React, { useEffect, useReducer } from "react";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { URI } from "./config";

const initialState = {
  title: "",
  subtitle: "",
  description: "",
  progress: "",
  picture: "",
  daysLeft: "",
  goal: "",
  userName: "",
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value,
  };
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

const ProjectView = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  let location = useLocation();
  const queryString = require("query-string");
  let parsed = queryString.parse(location.search);
  let { owner, projectId } = parsed;

  useEffect(() => {
    const fetchData = async () => {
      let { data } = await axios(`${URI}/api/projects/${projectId}`);

      data = data["project"];
      const {
        title,
        subtitle,
        picture,
        goal,
        description,
        campaignStart,
        campaignEnd,
        owner
      } = data;

      const oneDay = 24 * 60 * 60 * 1000;
      const daysLeft = Math.round(
        Math.abs((dateParser(campaignStart) - dateParser(campaignEnd)) / oneDay)
      );

      const descriptionParaph = description.split("\n");

      dispatch({ field: "title", value: title });
      dispatch({ field: "subtitle", value: subtitle });
      dispatch({ field: "picture", value: picture });
      dispatch({ field: "description", value: descriptionParaph });
      dispatch({ field: "daysLeft", value: daysLeft });
      dispatch({ field: "goal", value: formatter.format(goal) });
      dispatch({ field: "userName", value: owner.name });
    };

    fetchData();
  }, [owner, projectId]);

  return (
    <Container fluid>
      <Row id="App-Container" className="justify-content-center">
        <Container>
          <Row className="mt-3">
            <Container fluid>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={7} className="mb-3">
                      <Jumbotron
                        className="mb-0 title"
                        style={{
                          backgroundImage: `url(${state.picture})`,
                        }}
                      />
                    </Col>
                    <Col md={5} className="align-bottom">
                      <h1>{state.title}</h1>
                      <h6>{state.subtitle}</h6>
                      <div>
                        <span>
                          <ProgressBar now={18} className="mt-5" />
                          <p>
                            Goal: <b>{state.goal}</b>
                          </p>
                        </span>
                        <h3 className="card-title">Progress: 18%</h3>
                        <h5 className="card-text mb-5">
                          {state.daysLeft > 1
                            ? state.daysLeft + " days left!"
                            : state.daysLeft + " day left!"}
                        </h5>
                      </div>
                      <Button block variant="main mt-auto">
                        Back this project now!
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Container>
          </Row>
          <Row>
            <Col xs={12} md={9} className="project-description">
              <Card>
                <Card.Body className="card-text">
                  <div>{state.description}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} className="project-description">
              <Card>
                <Card.Body className="card-text p-3">
                  <Image
                    className="account-image rounded-circle mx-auto d-block mb-3"
                    src="https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg"
                  />
                  <h3 className="text-center card-title">{state.userName}</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    vitae ex at ante vulputate dignissim a imperdiet orci. Etiam
                    hendrerit consectetur neque sit amet sodales. Quisque elit
                    est, dictum et viverra nec, tempor ut velit.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  );
};

export default ProjectView;
