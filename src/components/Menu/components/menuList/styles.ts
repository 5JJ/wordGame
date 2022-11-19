import { Link } from "react-router-dom";
import styled from "styled-components";

import type { MenuListItemProps } from "../../types";

export const MenuListItem = styled.li<MenuListItemProps>(({ isSelected }) => ({
  textAlign: "center",
  padding: "5px",
  fontSize: "16px",
  fontWeight: "600",

  ...(isSelected && {
    color: "grey",
    backgroundImage: 'url("./icons/caret-left.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "12px",
    backgroundPosition: "calc(50% + 24px)",
  }),
  "&:focus": {
    backgroundColor: "#eee",
  },
}));

export const StyledLink = styled(Link)(({}) => ({
  display: "inline-block",
  width: "100%",
}));
