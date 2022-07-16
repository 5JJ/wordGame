export const GAME_KORDLE = "kordle";
export const GAME_HANGMAN = "hangman";

export const GAME_LIST_IN_KR = {
  [GAME_KORDLE]: "꼬들",
  [GAME_HANGMAN]: "행맨",
};

export const KEY_ENTER = "enter"; 
export const KEY_BACKSPACE = "backspace";

export const BLOCK_RESULT = {
  CORRECT: "c",
  MISMATCH: "m",
  FAILED: "f",
} as const;

export const KR_CONSONANTS = [
  "ㄱ",
  "ㄴ",
  "ㄷ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅅ",
  "ㅇ",
  "ㅈ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
] as const;
export const KR_VOWELS = [
  "ㅏ",
  "ㅑ",
  "ㅓ",
  "ㅕ",
  "ㅗ",
  "ㅛ",
  "ㅜ",
  "ㅠ",
  "ㅡ",
  "ㅣ",
] as const;

export default {};
