import React from "react";
import styled from "styled-components";

import { BLOCK_RESULT } from "constants/common";

type BlockResultKeyType = keyof typeof BLOCK_RESULT;
type BlockResultValueType = typeof BLOCK_RESULT[BlockResultKeyType];

interface WordBlockProps {
  value: string;
  isSelected: boolean;
  isMatched: boolean;
  isCorrect: boolean;
  status: BlockResultValueType;
}

const Block = styled.div<Pick<WordBlockProps, "isSelected" | "status">>(
  ({ isSelected, status }) => ({
    margin: "2px",
    border: "2px solid #eee",
    borderRadius: "5px",
    width: "56px",
    height: "56px",
    display: "inline-block",
    verticalAlign: "middle",
    lineHeight: "56px",
    textAlign: "center",
    fontSize: "25px",
    fontWeight: "700",

    ...(isSelected && {
      borderColor: "#231f20",
    }),
    ...(status && {
      color: "white",
    }),
    ...(status === BLOCK_RESULT.FAILED
      ? {
          backgroundColor: "#dbd7d7",
        }
      : status === BLOCK_RESULT.CORRECT
      ? {
          backgroundColor: "#14ae14",
        }
      : status === BLOCK_RESULT.MISMATCH
      ? {
          backgroundColor: "#ffd900",
        }
      : {}),
  })
);

function WordBlock(props) {
  const { value = "", isSelected, status } = props;

  return (
    <Block isSelected={isSelected} status={status}>
      {value}
    </Block>
  );
}

export default WordBlock;
