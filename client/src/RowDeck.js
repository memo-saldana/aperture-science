import CardDeck from "react-bootstrap/CardDeck";
import ProjectCard from "../../client/src/ProjectCard";
import Row from "react-bootstrap/Row";
import React from "react";

const RowDeck = ({ deck, goToProject }) => {
  return (
    <Row className="mb-4 mx-5">
      <CardDeck>
        {deck.map((card, index) => (
          <ProjectCard
            description={card.subtitle}
            projectId = {card._id}
            owner = {card.owner}
            image={card.picture}
            key={index}
            onClick={goToProject}
            progress={card.percentage}
            title={card.title}
          />
        ))}
      </CardDeck>
    </Row>
  );
};

export default RowDeck;
