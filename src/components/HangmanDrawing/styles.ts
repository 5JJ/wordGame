import styled, { keyframes, css } from "styled-components";

const NOMRAL_SCREEN_SIZE = {
  BORDER_WIDTH: 10,
  MARGIN_LEFT: 100,
  TOP_LINE_WIDTH: 150,
  BOTTOM_LINE_WIDTH: 210,
  ROPE_LEFT: 100 + 150,
};

const SMALLER_SCREEN_SIZE = {
  BORDER_WIDTH: 8,
  MARGIN_LEFT: 80,
  TOP_LINE_WIDTH: 100,
  BOTTOM_LINE_WIDTH: 160,
  ROPE_LEFT: 80 + 100,
};

const BORDER_WIDTH = 10;
const ARM_LENGTH = 70;
const LEG_LENGTH = 80;

const getProperty = (
  smallScreen: boolean,
  property: keyof typeof SMALLER_SCREEN_SIZE
) => (smallScreen ? SMALLER_SCREEN_SIZE : NOMRAL_SCREEN_SIZE)[property];

const mediaQuery = "@media(max-width: 400px)";

export const Container = styled.div(({}) => ({
  position: "relative",
}));

export const HorizontalTopLine = styled.div(({}) => ({
  marginLeft: getProperty(false, "MARGIN_LEFT"),
  width: getProperty(false, "TOP_LINE_WIDTH"),
  height: getProperty(false, "BORDER_WIDTH"),
  backgroundColor: "black",
  [mediaQuery]: {
    marginLeft: getProperty(true, "MARGIN_LEFT"),
    width: getProperty(true, "TOP_LINE_WIDTH"),
    height: getProperty(true, "BORDER_WIDTH"),
  },
}));

export const HorizontalBottomLine = styled.div(({}) => ({
  width: getProperty(false, "BOTTOM_LINE_WIDTH"),
  height: getProperty(false, "BORDER_WIDTH"),
  backgroundColor: "black",
  [mediaQuery]: {
    width: getProperty(true, "BOTTOM_LINE_WIDTH"),
    height: getProperty(true, "BORDER_WIDTH"),
  },
}));

export const VertialLine = styled.div(({}) => ({
  marginLeft: getProperty(false, "MARGIN_LEFT"),
  width: getProperty(false, "BORDER_WIDTH"),
  height: 300,
  backgroundColor: "black",
  [mediaQuery]: {
    marginLeft: getProperty(true, "MARGIN_LEFT"),
    width: getProperty(true, "BORDER_WIDTH"),
  },
}));

export const Rope = styled.div(({}) => ({
  position: "absolute",
  top: 0,
  left: getProperty(false, "ROPE_LEFT"), // 120 + 200
  width: getProperty(false, "BORDER_WIDTH"),
  height: 50,
  backgroundColor: "black",
  [mediaQuery]: {
    left: getProperty(true, "ROPE_LEFT"), // 120 + 200
    width: getProperty(true, "BORDER_WIDTH"),
  },
}));

export const Head = styled.div(({}) => ({
  position: "absolute",
  top: 50,
  left: getProperty(false, "ROPE_LEFT") - 20,
  borderRadius: "100%",
  border: "10px solid black",
  borderWidth: BORDER_WIDTH,
  width: 50,
  height: 50,
  [mediaQuery]: {
    left: getProperty(true, "ROPE_LEFT") - 20,
  },
}));

export const Body = styled.div(({}) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: BORDER_WIDTH,
  height: 100,
  backgroundColor: "black",
}));

export const RightArm = styled.div(({}) => ({
  position: "absolute",
  top: 10,
  left: 10,
  transform: "rotate(-30deg)",
  transformOrigin: "left bottom",
  width: ARM_LENGTH,
  height: BORDER_WIDTH,
  backgroundColor: "black",
}));

export const LeftArm = styled.div(({}) => ({
  position: "absolute",
  top: 10,
  left: 0,
  transform: "scaleX(-1) rotate(-30deg)",
  transformOrigin: "left bottom",
  width: ARM_LENGTH,
  height: BORDER_WIDTH,
  backgroundColor: "black",
}));

export const RightLeg = styled.div(({}) => ({
  position: "absolute",
  top: 90,
  left: 0,
  transform: "rotate(60deg)",
  transformOrigin: "left bottom",
  width: LEG_LENGTH,
  height: BORDER_WIDTH,
  backgroundColor: "black",
}));

export const LeftLeg = styled.div(({}) => ({
  position: "absolute",
  top: 90,
  left: 0,
  transform: "scaleX(-1) rotate(60deg) translate(-5px, 10px)",
  transformOrigin: "left bottom",
  width: LEG_LENGTH,
  height: BORDER_WIDTH,
  backgroundColor: "black",
}));

const Fall = keyframes`
10% {
  transform: translate(0, 10px) rotate(-10deg);
}

100% {
  transform: translate(0, 210px) rotate(-120deg);
}
`;

const Bouncing = keyframes`

20%{
  transform: translate(30px, 130px) rotate(-100deg);
}

100%{
  transform: translate(70px, 200px) rotate(-90deg);
}
`;

const Shaking = keyframes`
0% { transform: translate(70px, 200px) rotate(-90deg); }
  10% { transform: translate(70px, 200px) rotate(-91deg); }
  20% { transform: translate(70px, 200px) rotate(-89deg); }
  30% { transform: translate(70px, 200px) rotate(-90deg); }
  40% { transform: translate(70px, 200px) rotate(-91deg); }
  50% { transform: translate(70px, 200px) rotate(-89deg); }
  60% { transform: translate(70px, 200px) rotate(-90deg); }
  70% { transform: translate(70px, 200px) rotate(-91deg); }
  80% { transform: translate(70px, 200px) rotate(-89deg); }
  90% { transform: translate(70px, 200px) rotate(-90deg); }
  100% { transform: translate(70px, 200px) rotate(-91deg); }
`;

export const BodyContainer = styled.div<{ isEnd: boolean }>`
  ${(props) =>
    props.isEnd &&
    css`
      animation: ${Fall} 2s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.4s forwards,
        ${Bouncing} 1s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards 2s,
        ${Shaking} 0.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) 3s 10;
    `}
  position: absolute;
  top: 100px;
  left: ${getProperty(false, "ROPE_LEFT")}px;
  transform-origin: top;
  ${css`
    ${mediaQuery} {
      left: ${getProperty(true, "ROPE_LEFT")}px}
    }
  `}
`;

const Line = keyframes`
    0%{
      transform: scaleX(0);
    }
    100%{
      transform: scaleX(1);
    }
`;

export const End = styled.div`
  position: absolute;
  top: 100px;
  left: ${getProperty(false, "ROPE_LEFT") - 45}px;
  width: 100px;
  height: ${BORDER_WIDTH}px;
  background-color: red;
  animation: ${Line} 0.5s ease-in-out forwards;
  transform-origin: left;
  ${css`
    ${mediaQuery} {
      left: ${getProperty(true, "ROPE_LEFT") - 45}px}
    }
  `}
`;
