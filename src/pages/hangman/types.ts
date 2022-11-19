import { KR_CONSONANTS, KR_VOWELS } from "constants/common";

export type AlphabetStatusType = "miscorrect" | "correct" | "unused";

export type AlphabetStatusList = {
  [key in
    | typeof KR_CONSONANTS[number]
    | typeof KR_VOWELS[number]]?: AlphabetStatusType;
};
