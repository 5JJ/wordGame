import styled from "styled-components";

export const KeyboardContainer = styled.div(({}) => ({
  textAlign: "center",
}));

export const KeyboardLineContainer = styled.div(({}) => ({
  display: "flex",
  justifyContent: "center",
}));

export const Keycap = styled.button(({}) => ({
  margin: "1px",
  display: "inline-block",
  width: "30px",
  height: "32px",
  verticalAlign: "middle",
  textAlign: "center",
  lineHeight: "32px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  backgroundColor: "lightgrey",

  "&:disabled": {
    color: "inherit",
  },
}));

export const backgroundCSS = {
  backgroundSize: "60%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

export const BackSpaceKeycap = styled(Keycap)(({}) => ({
  backgroundImage: 'url("./icons/backspace.png")',
  ...backgroundCSS,
}));

export const EnterKeycap = styled(Keycap)(({}) => ({
  backgroundImage: 'url("./icons/enter.png")',
  ...backgroundCSS,
}));
