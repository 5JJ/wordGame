import useClickOutside from "hooks/useClickOutside";
import React, { useState, useMemo, useCallback, useEffect } from "react";

import type { MenuProps } from "./types";

import MenuList from "./components/menuList";
import { MenuContainer, MenuListContainer, SelectedItem } from "./styles";

function Menu(props: MenuProps) {
  const { selectedItem, menuList } = props;

  const [toggled, setToggled] = useState<boolean>(false);
  const [listRendered, setListRendered] = useState<boolean>(false);

  const callbackMemo = useCallback(() => {
    setToggled(false);
  }, []);
  const ref = useClickOutside<HTMLDivElement>(callbackMemo);

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
