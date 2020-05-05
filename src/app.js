import React from "react";
import { render } from "react-dom";
import SearchParams from "./searchParams";

const App = () => {
  return (
    <div>
      <h1>Trying React</h1>
      <SearchParams></SearchParams>
    </div>
  );
};

// overwrites what is inside the div
render(<App />, document.getElementById("root"));
