import axios from "axios";
import React, { useState, useEffect } from "react";
import { URI } from "./config";
import Home from "./Home";
import Loading from "./Loading";

function Main({ history }) {
  const [projects, setProjects] = useState([[{ owner: { _id: "" } }]]);
  const [current, setCurrent] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios(
        `${URI}/api/projects/?pageSize=12&&page=${current}`
      );

      const { projects, totalPages, page } = data;
      console.log('projects :>> ', projects);
      let dataChunks = [];

      while (projects.length) {
        dataChunks.push(projects.splice(0, 4));
      }

      setProjects(dataChunks);
      setCurrent(page);
      setTotalPages(totalPages);
      setLoading(false);
    };
    console.log("quepedo");
    
    fetchData();
  }, [current]);

  const goToProject = (e) => {
    const { value } = e.target;
    history.push(`/project/?projectId=${value}`);
  };

  return loading ? (
    <Loading />
  ) : (
    <Home
      projects={projects}
      goToProject={goToProject}
      current={current}
      setCurrent={setCurrent}
      totalPages={totalPages}
    />
  );
}

export default Main;
