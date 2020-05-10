import React from "react";

const Error = ({ error }) => {
  return (
    <div>
      <h1 className="display-4">Error</h1>
      <p> {error} </p>
    </div>
  );
};

export default Error;
