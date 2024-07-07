import React from "react";
//components
import RoomPage from "./components/Pages/RoomPage";
import HomePage from "./components/Pages/HomePage";
//library
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RoomPage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
