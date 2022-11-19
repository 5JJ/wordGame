import React from "react";
import styled from "styled-components";

const Container = styled.div(({}) => ({
  position: "relative",
}));

const HorizontalTopLine = styled.div(({}) => ({
  marginLeft: 120,
  width: 200,
  height: 10,
  backgroundColor: "black",
}));

const HorizontalBottomLine = styled.div(({}) => ({
  width: 250,
  height: 10,
  backgroundColor: "black",
}));

const VertialLine = styled.div(({}) => ({
  marginLeft: 120,
  width: 10,
  height: 400,
  backgroundColor: "black",
}));

const Rope = styled.div(({}) => ({
  position: "absolute",
  top: 0,
  left: 320, // 120 + 200
  width: 10,
  height: 50,
  backgroundColor: "black",
}));

const Head = styled.div(({}) => ({
  position: "absolute",
  top: 50,
  left: 300,
  borderRadius: "100%",
  border: "10px solid black",
  width: 50,
  height: 50,
}));

const Body = styled.div(({}) => ({
  position: "absolute",
  top: 100,
  left: 320,
  width: 10,
  height: 100,
  backgroundColor: "black",
}));

const RightArm = styled.div(({}) => ({
  position: "absolute",
  top: 140,
  left: 325,
  transform: "rotate(-30deg)",
  transformOrigin: "left bottom",
  width: 100,
  height: 10,
  backgroundColor: "black",
}));

const LeftArm = styled.div(({}) => ({
  position: "absolute",
  top: 140,
  left: 225,
  transform: "rotate(30deg)",
  transformOrigin: "right bottom",
  width: 100,
  height: 10,
  backgroundColor: "black",
}));

const RightLeg = styled.div(({}) => ({
  position: "absolute",
  top: 190,
  left: 320,
  transform: "rotate(60deg)",
  transformOrigin: "left bottom",
  width: 100,
  height: 10,
  backgroundColor: "black",
}));

const LeftLeg = styled.div(({}) => ({
  position: "absolute",
  top: 190,
  left: 230,
  transform: "rotate(-60deg)",
  transformOrigin: "right bottom",
  width: 100,
  height: 10,
  backgroundColor: "black",
}));

const End = styled.div(({}) => ({
  position: "absolute",
  top: 100,
  left: 275, // 120 + 200
  width: 100,
  height: 10,
  backgroundColor: "red",
}));

function HangmanDrawing(props: { tryCount?: number }) {
  const { tryCount = 0 } = props;

  return (
    <Container>
      {tryCount > 0 && <Head />}
      {tryCount > 1 && <Body />}
      {tryCount > 2 && <RightArm />}
      {tryCount > 3 && <LeftArm />}
      {tryCount > 4 && <RightLeg />}
      {tryCount > 5 && <LeftLeg />}
      {tryCount > 6 && <End />}
      <HorizontalTopLine />
      <VertialLine />
      <HorizontalBottomLine />
      <Rope />
    </Container>
  );
}

export default HangmanDrawing;
