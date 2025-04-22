import React from "react";
import {GitHubSearch} from "./components/GitHubSearch.jsx"

const App = () => {

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-center mb-8">GitHub User Search</h1>
    <GitHubSearch />
  </div>
  );
};

export default App;
