import {
  KR_CONSONANTS,
  KR_VOWELS,
  KEY_ENTER,
  KEY_BACKSPACE,
} from "constants/common";

interface QwetyKeyboardType {
  onKeyInputCallback: (value: keycapType) => void;
  freeze?: boolean;
}

export type onClickFnType = (value: keycapType) => void;
export type keycapType =
  | typeof KR_CONSONANTS[number]
  | typeof KR_VOWELS[number]
  | typeof KEY_ENTER
  | typeof KEY_BACKSPACE;

export default QwetyKeyboardType;
