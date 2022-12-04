import React from "react";
import {
  Head,
  Body,
  RightArm,
  LeftArm,
  RightLeg,
  LeftLeg,
  HorizontalTopLine,
  VertialLine,
  HorizontalBottomLine,
  Rope,
  BodyContainer,
  Container,
  End,
} from "./styles";

function HangmanDrawing(props: { tryCount?: number }) {
  const { tryCount = 0 } = props;

  return (
    <Container>
      {tryCount > 0 && <Head />}
      <BodyContainer isEnd={tryCount > 6}>
        {tryCount > 1 && <Body />}
        {tryCount > 2 && <RightArm />}
        {tryCount > 3 && <LeftArm />}
        {tryCount > 4 && <RightLeg />}
        {tryCount > 5 && <LeftLeg />}
      </BodyContainer>

      {tryCount > 6 && <End />}
      <HorizontalTopLine />
      <VertialLine />
      <HorizontalBottomLine />
      <Rope />
    </Container>
  );
}

export default HangmanDrawing;
