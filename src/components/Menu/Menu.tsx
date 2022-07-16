import useClickOutside from "hooks/useClickOutside";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";

import MenuProps from "./Menu.types";

import MenuList from "./MenuList";

const MenuListContainer = styled.ul<{ isListRendered: boolean }>`
  position: absolute;
  top: 0;
  transition: transform 0.4s ease-in-out;
  transform: scaleY(${(props) => (props.isListRendered ? "1" : "0")});
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

  const callbackMemo = useCallback(() => {
    setToggled(false);
  }, []);
  const ref = useClickOutside<HTMLDivElement>(callbackMemo);

  const { selectedItem, menuList } = props;

  function toggleList() {
    setToggled(!toggled);
  }

  const updateListRendered = useCallback((check: boolean) => {
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

  useEffect(() => {
    if (!toggled) {
      setListRendered(false);
    }
  }, [toggled]);

  return (
    <MenuContainer ref={ref}>
      <SelectedItem
        onClick={toggleList}
        tabIndex={0}
        onKeyUp={(event) => {
          if (event.key === "ArrowDown") {
            toggleList();
          }
        }}
      >
        {list[0]?.name}
      </SelectedItem>

      {toggled && (
        <MenuListContainer isListRendered={listRendered}>
          <MenuList
            menuList={list}
            selectedItem={selectedItem}
            callbackAfterRendering={updateListRendered}
          />
        </MenuListContainer>
      )}
    </MenuContainer>
  );
}

export default Menu;
