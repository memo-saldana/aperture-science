import Jumbotron from "react-bootstrap/Jumbotron";
import React from "react";

const Preview = ({fileURL, title, subtitle}) => {
  return (
    <Jumbotron
      style={{
        position: `relative`,
        backgroundImage: `url(${fileURL === "" ? "" : fileURL})`,
      }}
      className="title-preview mb-3"
    >
      <div className="preview-data">
        <h1>{title === "" ? "Your Title" : title}</h1>
        <p>
          {subtitle === ""
            ? "A short description of your project"
            : subtitle}
        </p>
      </div>
    </Jumbotron>
  );
};

export default Preview;
