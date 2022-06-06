import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { MenuListProps, MenuListItemProps } from "./Menu.types";

const MenuListItem = styled.li<MenuListItemProps>(({ isSelected }) => ({
  textAlign: "center",
  padding: "5px",
  fontSize: "16px",
  fontWeight: "600",

  ...(isSelected && {
    color: "grey",
    backgroundColor: "rgba(0,0, 0,0.1)",
  }),
}));

const StyledLink = styled(Link)(({}) => ({
  display: "inline-block",
  width: "100%",
}));

function MenuList(props: MenuListProps) {
  const { menuList, selectedItem, isRendered } = props;

  useEffect(() => {
    isRendered(true);
  }, []);

  return (
    <>
      {menuList.map(({ name, link }) => (
        <MenuListItem key={link} isSelected={selectedItem === link}>
          <StyledLink to={`/${link}`}>{name}</StyledLink>
        </MenuListItem>
      ))}
    </>
  );
}

function areEqual(prevProps: MenuListProps, nextProps: MenuListProps): boolean {
  return (
    prevProps.menuList === nextProps.menuList &&
    prevProps.selectedItem === nextProps.selectedItem &&
    prevProps.isRendered === nextProps.isRendered
  );
}

export default React.memo(MenuList, areEqual);
