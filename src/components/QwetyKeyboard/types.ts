import {
  KR_CONSONANTS,
  KR_VOWELS,
  KEY_ENTER,
  KEY_BACKSPACE,
} from "constants/common";

export type Status = "miscorrect" | "correct" | "unused";
export type KeyStatus = {
  [key in typeof KR_CONSONANTS[number] | typeof KR_VOWELS[number]]?: Status;
};

export interface QwetyKeyboardProps {
  onKeyInputCallback: (value: keycapType) => void;
  freeze?: boolean;
  hideEnterKey?: boolean;
  hideBackSpaceKey?: boolean;
  keyStatus?: KeyStatus;
}

export type onClickFnType = (value: keycapType) => void;
export type keycapType =
  | typeof KR_CONSONANTS[number]
  | typeof KR_VOWELS[number]
  | typeof KEY_ENTER
  | typeof KEY_BACKSPACE;
