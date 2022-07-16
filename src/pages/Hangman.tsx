import React, { useMemo } from "react";
import Menu from "components/Menu";

import { GAME_LIST_IN_KR, GAME_HANGMAN } from "constants/common";

export default function HangMan() {
  const gameList = useMemo(
    () =>
      Object.keys(GAME_LIST_IN_KR).map((gameName) => ({
        name: GAME_LIST_IN_KR[gameName],
        link: gameName,
      })),
    []
  );

  return (
    <>
      <Menu selectedItem={GAME_HANGMAN} menuList={gameList} />
    </>
  );
}
