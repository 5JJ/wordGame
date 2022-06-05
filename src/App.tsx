import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "pages/Home";
import Kordle from "pages/Kordle";
import HangMan from "pages/Hangman";
import MyScore from "pages/MyScore";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kordle" element={<Kordle />} />
          <Route path="/hangman" element={<HangMan />} />
          <Route path="/myscore" element={<MyScore />} />
        </Routes>
      </Router>
    </>
  );
}
