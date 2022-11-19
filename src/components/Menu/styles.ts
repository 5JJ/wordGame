import styled from "styled-components";

export const MenuListContainer = styled.ul<{ isListRendered: boolean }>(
  ({ isListRendered }) => ({
    position: "absolute",
    top: 0,
    zIndex: 100,
    transition: "transform 0.2s ease-in-out",
    transform: isListRendered ? "scaleY(1)" : "scaleY(0)",
    width: "80%",
    boxShadow: "1px 2px 5px 0px #ddd",
    backgroundColor: "white",
  })
);

export const MenuContainer = styled.div(({}) => ({
  paddingBottom: 8,
  position: "relative",
  cursor: "pointer",
}));

export const SelectedItem = styled.span(({}) => ({
  paddingLeft: 8,
  paddingRight: 20,
  fontWeight: "bold",
  fontSize: "20px",
  backgroundImage: 'url("./icons/caret-down.png")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundSize: "10px",
}));
