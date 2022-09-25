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
  paddingBottom: 8,
  position: "relative",
  cursor: "pointer",
}));

const SelectedItem = styled.span(({}) => ({
  paddingLeft: 8,
  paddingRight: 20,
  fontWeight: "bold",
  fontSize: "20px",
  backgroundImage: 'url("./icons/caret-down.png")',
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right",
  backgroundSize: "10px",
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

  const closeList = useCallback(() => {
    setToggled(false);
  }, []);

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
        <MenuListContainer isListRendered={listRendered} tabIndex={0}>
          <MenuList
            menuList={list}
            selectedItem={selectedItem}
            callbackAfterRendering={updateListRendered}
            closeList={closeList}
          />
        </MenuListContainer>
      )}
    </MenuContainer>
  );
}

export default Menu;
