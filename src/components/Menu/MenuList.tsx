import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { MenuListProps, MenuListItemProps } from "./Menu.types";

const MenuListItem = styled.li<MenuListItemProps>(({ isSelected }) => ({
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
    backgroundColor: "#ddd",
  },
}));

const StyledLink = styled(Link)(({}) => ({
  display: "inline-block",
  width: "100%",
}));

function MenuList(props: MenuListProps) {
  const { menuList, selectedItem, callbackAfterRendering, closeList } = props;
  const focusedItemRef = useRef<HTMLLIElement>(null);
  const navigate = useNavigate();

  const focusNextItem = () => {
    if (focusedItemRef.current && focusedItemRef.current.nextElementSibling) {
      focusedItemRef.current = focusedItemRef.current
        .nextElementSibling as HTMLLIElement;
      focusedItemRef.current.focus();
    }
  };

  const focusPrevItem = () => {
    if (
      focusedItemRef.current &&
      focusedItemRef.current.previousElementSibling
    ) {
      focusedItemRef.current = focusedItemRef.current
        .previousElementSibling as HTMLLIElement;
      focusedItemRef.current.focus();
    }
  };

  const goFocusedItemPage = (link: string) => {
    navigate(`/${link}`);
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLLIElement>, link: string) => {
    switch (event.key) {
      case "ArrowDown":
        focusNextItem();
        break;
      case "ArrowUp":
        focusPrevItem();
        break;
      case "Enter":
        goFocusedItemPage(link);
        break;
      case "Escape":
        closeList();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    callbackAfterRendering(true);
    focusedItemRef.current.focus();
  }, []);

  return (
    <>
      {menuList.map(({ name, link }) => {
        const isSelected = selectedItem === link;

        return (
          <MenuListItem
            key={link}
            isSelected={isSelected}
            ref={isSelected ? focusedItemRef : undefined}
            onKeyUp={(event) => onKeyUp(event, link)}
            tabIndex={0}
          >
            <StyledLink to={`/${link}`} tabIndex={-1}>
              {name}
            </StyledLink>
          </MenuListItem>
        );
      })}
    </>
  );
}

function areEqual(prevProps: MenuListProps, nextProps: MenuListProps): boolean {
  return (
    prevProps.menuList === nextProps.menuList &&
    prevProps.selectedItem === nextProps.selectedItem &&
    prevProps.callbackAfterRendering === nextProps.callbackAfterRendering
  );
}

export default React.memo(MenuList, areEqual);
