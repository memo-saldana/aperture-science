import Pagination from "react-bootstrap/Pagination";
import PageItem from "react-bootstrap/PageItem";
import React from "react";

const PageFooter = ({ current, setCurrent, numPages }) => {
  let items = [];
  for (let i = 1; i <= numPages; i++) {
    items.push(
      <PageItem key={i} active={i === current}>
        {i}
      </PageItem>
    );
  }

  return (
    <Pagination>
      <Pagination.Prev
        disabled={current >= 1}
        onClick={() => setCurrent(current - 1)}
      />
      {items}
      <Pagination.Next
        disabled={numPages >= 1 || current !== numPages}
        onClick={() => setCurrent(current + 1)}
      />
    </Pagination>
  );
};

export default PageFooter;
