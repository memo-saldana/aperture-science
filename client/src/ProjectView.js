import "./ProjectView.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import ProgressBar from "react-bootstrap/ProgressBar";
import React from "react";
import Row from "react-bootstrap/Row";
import Jumbotron from "react-bootstrap/Jumbotron";

const ProjectView = () => {
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
                          backgroundImage: `url(https://unsplash.it/640/300)`,
                        }}
                      />
                    </Col>
                    <Col md={5} className="align-bottom">
                      <h1>Project Title</h1>
                      <h6>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </h6>
                      <div>
                        <ProgressBar now={18} className="mt-5" />
                        <h3 className="card-title">Progress: 18%</h3>
                        <h5 className="card-text mb-5">21 days left!</h5>
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
                <Card.Body class="card-text">
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </div>
                  <div>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                    from 45 BC, making it over 2000 years old. Richard
                    McClintock, a Latin professor at Hampden-Sydney College in
                    Virginia, looked up one of the more obscure Latin words,
                    consectetur, from a Lorem Ipsum passage, and going through
                    the cites of the word in classical literature, discovered
                    the undoubtable source. Lorem Ipsum comes from sections
                    1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The
                    Extremes of Good and Evil) by Cicero, written in 45 BC. This
                    book is a treatise on the theory of ethics, very popular
                    during the Renaissance. The first line of Lorem Ipsum,
                    "Lorem ipsum dolor sit amet..", comes from a line in section
                    1.10.32.
                  </div>
                  <div>
                    The standard chunk of Lorem Ipsum used since the 1500s is
                    reproduced below for those interested. Sections 1.10.32 and
                    1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                    also reproduced in their exact original form, accompanied by
                    English versions from the 1914 translation by H. Rackham.
                  </div>
                  <div>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout. The point of using Lorem Ipsum is that it has a
                    more-or-less normal distribution of letters, as opposed to
                    using 'Content here, content here', making it look like
                    readable English. Many desktop publishing packages and web
                    page editors now use Lorem Ipsum as their default model
                    text, and a search for 'lorem ipsum' will uncover many web
                    sites still in their infancy. Various versions have evolved
                    over the years, sometimes by accident, sometimes on purpose
                    (injected humour and the like).
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={12} md={3} className="project-description">
              <Card>
                <Card.Body class="card-text p-3">
                  <Image
                    className="account-image rounded-circle mx-auto d-block mb-3"
                    src="https://cdn2.f-cdn.com/contestentries/1316431/24595406/5ae8a3f2e4e98_thumb900.jpg"
                  />
                  <h3 className="text-center card-title">Account Name</h3>
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
