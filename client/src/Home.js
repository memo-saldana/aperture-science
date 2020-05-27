import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import PageFooter from "./PageFooter";
import React, {useEffect} from "react";
import Row from "react-bootstrap/Row";
import RowDeck from "./RowDeck";
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from "react-router-dom";


const Home = ({ projects, goToProject, current, setCurrent, totalPages }) => {
  let location = useLocation();
  
  useEffect(() => {
    if(location && location.state && location.state.error != "") {
      toast.error(location.state.error)
    }
  }, []);

  return (
    <div id="App-Container">
      <ToastContainer 
        draggable={false}
        autoClose={4000}
      />
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
