import React, { useEffect } from "react";
import { Landing } from "./components/Landing/Landing";
import { Dashboard } from "./components/pages/dashboard";
import { StudyPlanner } from "./components/planner/StudyPlanner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/planner" element={<StudyPlanner/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
