import axios from "axios";
import Container from "react-bootstrap/Container";
import MyProjectCard from "./MyProjectCard";
import React, { useEffect, useState } from "react";

let dummyText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
let mockProjects = [
  {
    title: "First Project",
    description: dummyText,
    category: "Mathematics",
    completed: 35,
    days: 27,
  },
  {
    title: "Second Project",
    description: dummyText,
    category: "Physics",
    completed: 42,
    days: 12,
  },
  {
    title: "Third Project",
    description: dummyText,
    category: "Chemistry",
    completed: 79,
    days: 1,
  },
];

const MyProjects = () => {

  const [projects, setProjects] = useState([{}]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { projectData } = await axios(
        "https://jsonplaceholder.typicode.com/posts"
      );

      setProjects(projectData);
    };

    fetchProjects();
  }, []);

  console.log(projects);

  return (
    <Container fluid className="App">
      <h1 className="display-4 pt-4 px-4">My Projects</h1>

      {mockProjects.map((project, it) => (
        <MyProjectCard
          image={"https://unsplash.it/200"}
          title={project.title}
          description={project.description}
          category={project.category}
          completed={project.completed}
          days={project.days}
          key={it}
        />
      ))}
    </Container>
  );
};

export default MyProjects;
