import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import PageFooter from "./PageFooter";
import React from "react";
import Row from "react-bootstrap/Row";
import RowDeck from "./RowDeck";

const Home = ({ projects, goToProject, current, setCurrent, totalPages }) => {
  return (
    <div id="App-Container">
      <Container fluid={true} className="justify-content-center">
        <Row className="mt-5">
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
};

export default Home;
