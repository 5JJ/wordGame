import styled from "styled-components";
import { AlphabetStatusType } from "./types";

export const WordBlockList = styled.div(({}) => ({
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
}));

export const Alphabets = styled.ul(({}) => ({
  textAlign: "center",
}));

export const Alphabet = styled.li<{ status: AlphabetStatusType }>(
  ({ status }) => ({
    display: "inline-block",
    fontSize: 14,
    ...(status === "correct"
      ? {
          color: "green",
        }
      : status === "miscorrect"
      ? {
          color: "red",
        }
      : {}),
  })
);

export const LeftCount = styled.div(({}) => ({
  fontSize: 14,
  color: "red",
  textAlign: "center",
}));
