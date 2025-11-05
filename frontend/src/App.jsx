import React, { useState } from "react";
import HomePage from "./components/HomePage";
import UploadPage from "./components/UploadPage";
import ResultsPage from "./components/ResultsPage";
import CompareModels from "./components/CompareModels";
import Navbar from "./components/Navbar";

function App() {
  const [route, setRoute] = useState("home");

  return (
    <div className="App min-h-screen bg-gray-50">
      <Navbar setRoute={setRoute} />
      {route === "home" && <HomePage setRoute={setRoute} />}
      {route === "upload" && <UploadPage setRoute={setRoute} />}
      {route === "results" && <ResultsPage setRoute={setRoute} />}
      {route === "compare" && <CompareModels setRoute={setRoute} />}
    </div>
  );
}

export default App;
