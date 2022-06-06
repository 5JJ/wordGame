import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MenuProps from "./Menu.types";

import MenuList from "./MenuList";

const MenuListContainer = styled.ul<{ renderList: boolean }>`
  position: absolute;
  top: 0;
  transition: transform 0.4s ease-in-out;
  transform: scaleY(${(props) => (props.renderList ? "1" : "0")});
  width: 80%;
  box-shadow: 1px 2px 5px 0px grey;
  background-color: white;
`;

const MenuContainer = styled.div(({}) => ({
  position: "relative",
  cursor: "pointer",
}));

const SelectedItem = styled.span(({}) => ({
  fontSize: "16px",
}));

function Menu(props: MenuProps) {
  const [toggled, setToggled] = useState<boolean>(false);
  const [listRendered, setListRendered] = useState<boolean>(false);

  const { selectedItem, menuList } = props;

  function handleClick() {
    setToggled(!toggled);
  }

  const isRendered = useCallback((check) => {
    setListRendered(check);
  }, []);

  const list = useMemo(
    () =>
      menuList.sort((prev, next) => {
        if (next.link === selectedItem) {
          return 1;
        }
        if (prev.link === selectedItem) {
          return -1;
        }
        return prev.name < next.name ? -1 : 1;
      }),
    [menuList, selectedItem]
  );

  return (
    <MenuContainer>
      <SelectedItem onClick={handleClick}>{list[0]?.name}</SelectedItem>
      <MenuListContainer renderList={listRendered}>
        {toggled && (
          <MenuList
            menuList={list}
            selectedItem={selectedItem}
            isRendered={isRendered}
          />
        )}
      </MenuListContainer>
    </MenuContainer>
  );
}

export default Menu;
