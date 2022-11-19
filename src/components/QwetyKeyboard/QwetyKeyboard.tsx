import React from "react";

import { KEY_BACKSPACE, KEY_ENTER } from "constants/common";

import type { QwetyKeyboardProps, onClickFnType, keycapType } from "./types";
import {
  BackSpaceKeycap,
  KeyboardContainer,
  Keycap,
  EnterKeycap,
} from "./styles";

const QWETY_ALPHABETS = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];

const QwetyKeyboard = (props: QwetyKeyboardProps) => {
  const { onKeyInputCallback, freeze, hideBackSpaceKey, hideEnterKey } = props;

  const handleClick: onClickFnType = (value) => {
    onKeyInputCallback(value);
  };

  return (
    <KeyboardContainer>
      {QWETY_ALPHABETS.map((alphabetList, index) => (
        <div key={index}>
          {!hideBackSpaceKey && index === 2 && (
            <BackSpaceKeycap
              type="button"
              tabIndex={0}
              onClick={() => handleClick(KEY_BACKSPACE)}
              disabled={freeze}
            ></BackSpaceKeycap>
          )}
          {alphabetList.map((alphabet: keycapType) => (
            <Keycap
              type="button"
              tabIndex={0}
              key={alphabet}
              onClick={() => handleClick(alphabet)}
              disabled={freeze}
            >
              {alphabet}
            </Keycap>
          ))}
          {!hideEnterKey && index === 2 && (
            <EnterKeycap
              type="button"
              tabIndex={0}
              onClick={() => handleClick(KEY_ENTER)}
              disabled={freeze}
            ></EnterKeycap>
          )}
        </div>
      ))}
    </KeyboardContainer>
  );
};

export default QwetyKeyboard;
