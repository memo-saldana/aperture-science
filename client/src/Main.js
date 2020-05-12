import axios from "axios";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import { GoSearch } from "react-icons/go";
import InputGroup from "react-bootstrap/InputGroup";
import React, { useState, useEffect } from "react";
import RowDeck from "./RowDeck";
import Row from "react-bootstrap/Row";
import { URI } from "./config";
import PageFooter from "./PageFooter";

function Main({ history }) {
  const [projects, setProjects] = useState([[{ owner:{_id:""}}]]);
  const [current, setCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(
        `${URI}/api/projects/?pageSize=12&&page=${current}`
      );

      const { projects, totalPages, page } = data;

      let dataChunks = [];

      while (projects.length) {
        dataChunks.push(projects.splice(0, 4));
      }

      setProjects(dataChunks);
      setCurrent(page);
      setTotalPages(totalPages);
    };

    fetchData();
  }, [current]);

  const goToProject = (e) => {
    const { value } = e.target;
    history.push(`/project/?projectId=${value}`);
  };

  return (
    <div id="App-Container">
      <Container fluid={true} className="justify-content-center">
        <Row>
          <InputGroup className="my-3 mx-4">
            <FormControl
              placeholder="Search"
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="main">
                <GoSearch />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row>
          <Col className="mt-2">
            {projects.map((deck, index) => (
              <RowDeck deck={deck} goToProject={goToProject} key={index} />
            ))}
          </Col>
        </Row>
        <Row className="justify-content-center">
          <PageFooter
            current={current}
            setCurrent={setCurrent}
            numPages={totalPages}
          />
        </Row>
      </Container>
    </div>
  );
}

export default Main;
