import axios from "axios";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import { dateParser } from "./CreateProject";
import Loading from "./Loading";
import MyProjectCard from "./MyProjectCard";
import PageFooter from "./PageFooter";
import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import { getUserId, getToken } from "./TokenUtilities";
import { URI } from "./config.js";

const oneDay = 24 * 60 * 60 * 1000;
const daysLeft = (campaignStart, campaignEnd) => {
  return Math.round(
    Math.abs((dateParser(campaignStart) - dateParser(campaignEnd)) / oneDay)
  );
};

const processProject = (project) => {
  let today = new Date();
  today.setDate(today.getDate() - 1);

  let left =
    dateParser(project.campaignEnd) < today
      ? 0
      : daysLeft(project.campaignStart, project.campaignEnd);

  return {
    ...project,
    daysLeft: left,
  };
};

const MyProjects = () => {
  const [projects, setProjects] = useState(null);
  const [current, setCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProjects = async () => {
      let { data } = await axios(
        `${URI}/api/users/${getUserId()}/projects/?page=${current}`,
        {
          headers: {
            Authorization: `Bearer: ${getToken()}`,
          },
        }
      );

      let { projects, totalPages, page } = data;
      projects = projects.map((project) => processProject(project));

      setProjects(projects);
      setCurrent(page);
      setTotalPages(totalPages);
    };

    fetchProjects();
  }, [current]);

  return (
    <Container fluid className="App">
      <Col>
        <h1 className="display-4 pt-4 px-4">My Projects</h1>
        {projects === null ? (
          <Loading />
        ) : (
          projects.map((project, index) => {
            return (
              <MyProjectCard
                key={index}
                image={project.picture}
                title={project.title}
                description={project.subtitle}
                category={project.category.name}
                completed={project.percentage}
                days={project.daysLeft}
              />
            );
          })
        )}
      </Col>
      <Row className="justify-content-center">
        <PageFooter
          current={current}
          setCurrent={setCurrent}
          numPages={totalPages}
        />
      </Row>
    </Container>
  );
};

export default MyProjects;
