import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import type { MenuListProps } from "../../types";
import { MenuListItem, StyledLink } from "./styles";

const MenuList = (props: MenuListProps) => {
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
};

function isEqual(prevProps: MenuListProps, nextProps: MenuListProps): boolean {
  return (
    prevProps.menuList === nextProps.menuList &&
    prevProps.selectedItem === nextProps.selectedItem &&
    prevProps.callbackAfterRendering === nextProps.callbackAfterRendering
  );
}

export default React.memo(MenuList, isEqual);
