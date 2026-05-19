import React, { useEffect } from "react";
import { Landing } from "./components/Landing/Landing";
import { Dashboard } from "./components/pages/dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
