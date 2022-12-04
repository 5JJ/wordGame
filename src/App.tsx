import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "pages/Home";
import Kordle from "pages/Kordle";
import HangMan from "pages/hangman";
import MyScore from "pages/MyScore";

const Container = styled.div(({}) => ({
  padding: "10px",
  overflow: "hidden",
}));

const Wrapper = styled.div(({}) => ({
  margin: "30px auto 0",
  maxWidth: "400px",
  minWidth: "250px",
}));

export default function App() {
  return (
    <Container>
      <Wrapper>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/kordle" element={<Kordle />} />
            <Route path="/hangman" element={<HangMan />} />
            <Route path="/myscore" element={<MyScore />} />
          </Routes>
        </Router>
      </Wrapper>
    </Container>
  );
}
