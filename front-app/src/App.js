import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Astronauts from "./pages/astronauts";
import Spacecrafts from "./pages/spacecrafts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Spacecrafts />} />
        <Route path="/spacecrafts/:id/astronauts" element={<Astronauts />} />
      </Routes>
    </Router>
  );
}

export default App;
