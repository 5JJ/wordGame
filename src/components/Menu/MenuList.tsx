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
  const { menuList, selectedItem, callbackAfterRendering } = props;
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
    if (event.key === "ArrowDown") {
      focusNextItem();
    } else if (event.key === "ArrowUp") {
      focusPrevItem();
    } else if (event.key === "Enter") {
      goFocusedItemPage(link);
    }
  };

  const onMouseEnter: React.MouseEventHandler<HTMLLIElement> = (event) => {
    focusedItemRef.current = event.target as HTMLLIElement;
    focusedItemRef.current.focus();
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
            onMouseEnter={onMouseEnter}
            tabIndex={0}
          >
            <StyledLink to={`/${link}`}>{name}</StyledLink>
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
