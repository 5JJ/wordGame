import React from "react";
import styled from "styled-components";

import { KEY_BACKSPACE, KEY_ENTER } from "constants/common";

import QwetyKeyboardType, {
  onClickFnType,
  keycapType,
} from "./QwetyKeyboard.types";

const QWETY_ALPHABETS = [
  ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ"],
  ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"],
  ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"],
];

const Keycap = styled.button(({}) => ({
  margin: "1px",
  display: "inline-block",
  width: "30px",
  height: "32px",
  verticalAlign: "middle",
  textAlign: "center",
  lineHeight: "32px",
  fontSize: "13px",
  fontWeight: "600",
  cursor: "pointer",
  backgroundColor: "lightgrey",
}));

const backgroundCSS = {
  backgroundSize: "60%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const BackSpaceKeycap = styled(Keycap)(({}) => ({
  backgroundImage: 'url("./icons/backspace.png")',
  ...backgroundCSS,
}));

const EnterKeycap = styled(Keycap)(({}) => ({
  backgroundImage: 'url("./icons/enter.png")',
  ...backgroundCSS,
}));

const KeyboardContainer = styled.div(({}) => ({
  textAlign: "center",
}));

function QwetyKeyboard(props: QwetyKeyboardType) {
  const { onKeyInputCallback } = props;

  const handleClick: onClickFnType = (value) => {
    onKeyInputCallback(value);
  };

  return (
    <KeyboardContainer>
      {QWETY_ALPHABETS.map((alphabetList, index) => (
        <div key={index}>
          {index === 2 && (
            <BackSpaceKeycap
              type="button"
              tabIndex={0}
              onClick={() => handleClick(KEY_BACKSPACE)}
            ></BackSpaceKeycap>
          )}
          {alphabetList.map((alphabet: keycapType) => (
            <Keycap
              type="button"
              tabIndex={0}
              key={alphabet}
              onClick={() => handleClick(alphabet)}
            >
              {alphabet}
            </Keycap>
          ))}
          {index === 2 && (
            <EnterKeycap
              type="button"
              tabIndex={0}
              onClick={() => handleClick(KEY_ENTER)}
            ></EnterKeycap>
          )}
        </div>
      ))}
    </KeyboardContainer>
  );
}

export default QwetyKeyboard;
