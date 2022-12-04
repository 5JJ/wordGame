import React from "react";

import { KEY_BACKSPACE, KEY_ENTER } from "constants/common";

import type { QwetyKeyboardProps, onClickFnType, keycapType } from "./types";
import {
  KeyboardLineContainer,
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
  const {
    onKeyInputCallback,
    freeze,
    hideBackSpaceKey,
    hideEnterKey,
    keyStatus = {},
  } = props;

  const handleClick: onClickFnType = (value) => {
    onKeyInputCallback(value);
  };

  return (
    <KeyboardContainer>
      {QWETY_ALPHABETS.map((alphabetList, index) => (
        <KeyboardLineContainer key={index}>
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
              status={keyStatus[alphabet]}
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
        </KeyboardLineContainer>
      ))}
    </KeyboardContainer>
  );
};

export default QwetyKeyboard;
