import React from "react";

function ThemeSetter() {
  return (
    <style type="text/css">
      {`
        :root {
            --background-color: #fcfaf9; /*snow*/
            --progress-color: #5bc0be;   /*sea serpent*/
            --main-color: #4b5f78;       /*payne's gray*/
            --hover-main: #45576e;
            --bold-main: #454c63;        /*independence*/
            --dark-bg: #333;             /*jet*/
            --error: #B5072A;
        }

        .btn-main {
          background-color: var(--main-color);
          color: white;
        }

        .btn-main:hover {
          color: white;
          background-color: var(--hover-main);
        }

        a {
            color: var(--main-color);
        }

        a:hover {
          color: var(--hover-main);
        }

        .App, #App-Container {
            min-height: 100vh;
            background-color: var(--background-color);
        }

        #search-bar {
            margin-top: 1%;
        }
        
        #deck-container {
            padding: 1% 5% 5% 5%;
        }

        #basic-addon1 {
            background-color: white;
        }

        .progress-bar {
            background-color: var(--progress-color);
        }

        .card-title {
            color: var(--bold-main);
        }

        .card-text {
            color: var(--main-color);
        }

        .nav-main {
            background-color: var(--dark-bg) !important;
        }

        .error {
          color: var(--error);
        }
      `}
    </style>
  );
}

export default ThemeSetter;
