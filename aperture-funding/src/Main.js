import axios from "axios";
import Button from "react-bootstrap/Button";
import CardDeck from "react-bootstrap/CardDeck";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import FormControl from "react-bootstrap/FormControl";
import { GoSearch } from "react-icons/go";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import ProjectCard from "./ProjectCard";
import React, { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";

function Main() {
  const [projects, setProjects] = useState([[{}]]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios("https://jsonplaceholder.typicode.com/posts");

      const dataChunks = [];
      while (data.length) {
        dataChunks.push(data.splice(0, 4));
      }

      setProjects(dataChunks);
    };

    fetchData();
  }, []);

  return (
    <div id="App-Container">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={require("./assets/aperture-logo.png")}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          &nbsp;<b>Aperture Funding</b>
        </Navbar.Brand>
      </Navbar>
      <Container fluid={true} id="main-container">
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
            {projects.map(deck => (
              <Row className="mb-4 mx-5">
                <CardDeck>
                  {deck.map(card => (
                    <ProjectCard
                      id={card.id}
                      title={card.title}
                      description={card.body}
                      progress={card.id}
                      image="https://unsplash.it/800/500"
                    />
                  ))}
                </CardDeck>
              </Row>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Main;
