import React, { useCallback, useEffect, useMemo, useState } from "react";

import QwetyKeyboard from "components/QwetyKeyboard";
import Menu from "components/Menu";
import WordBlock from "components/WordBlock";

import { loop } from "utils/common";

import {
  GAME_LIST_IN_KR,
  GAME_KORDLE,
  KEY_ENTER,
  KEY_BACKSPACE,
  BLOCK_RESULT,
} from "constants/common";
import styled from "styled-components";
import useAnswer from "hooks/useAnswer";

type valueType = string[][];

const DEFAULT_BLOCK_ROW_COUNT = 6;
const DEFAULT_BLOCK_COLUMN_COUNT = 6;

const WordBlockList = styled.div(({}) => ({
  display: "flex",
  justifyContent: "center",
}));
const WordBlockContainer = styled.div(({}) => ({
  textAlign: "center",
}));

export default function Kordle() {
  const gameList = useMemo(
    () =>
      Object.keys(GAME_LIST_IN_KR).map((gameName) => ({
        name: GAME_LIST_IN_KR[gameName],
        link: gameName,
      })),
    []
  );

  const { answer, answerArr, log, result, saveLog, saveResult } =
    useAnswer<"kordle">("kordle");

  const [selectedRow, setSelectedRow] = useState(log.length);
  const [selectedCol, setSelectedCol] = useState(0);
  const [values, setValues] = useState<valueType>(() => setValuesState(log));
  const [finished, setFinished] = useState<boolean>(
    !!result || log.length >= DEFAULT_BLOCK_ROW_COUNT
  );

  function checkAnswer(): boolean {
    const inputStr = values[selectedRow].join("");

    return answer === inputStr;
  }

  function checkAllBlanksFilled(): boolean {
    if (selectedCol < DEFAULT_BLOCK_COLUMN_COUNT - 1) {
      return false;
    }

    return !values[selectedRow].some((value) => !value);
  }

  function setValuesState(initialValues?: valueType): valueType {
    return loop<string[]>(DEFAULT_BLOCK_ROW_COUNT, (index) =>
      initialValues && initialValues[index]
        ? [...initialValues[index]]
        : new Array(DEFAULT_BLOCK_COLUMN_COUNT).fill("")
    );
  }

  function getNewValuesState(
    newValue: string,
    targetColIndex?: number
  ): valueType {
    return loop<string[]>(DEFAULT_BLOCK_ROW_COUNT, (rowIndex) => {
      const tmp = [...values[rowIndex]];
      if (rowIndex === selectedRow) {
        tmp[targetColIndex ?? selectedCol] = newValue;
      }

      return tmp;
    });
  }

  function handleSuccess() {
    console.log("success");
    moveToNextRow();
    saveResult("success");
  }

  function handleFailed() {
    saveResult("failed");
  }

  function moveToNextCol() {
    if (selectedCol < DEFAULT_BLOCK_COLUMN_COUNT - 1) {
      setSelectedCol(selectedCol + 1);
    }
  }

  function moveToPrevCol() {
    if (selectedCol > 0) {
      setSelectedCol(selectedCol - 1);
    }
  }

  function moveToNextRow() {
    if (selectedRow < DEFAULT_BLOCK_ROW_COUNT) {
      setSelectedRow(selectedRow + 1);
      setSelectedCol(0);
    }
  }

  const getStatus = useCallback(
    (colIndex, value) => {
      if (answerArr[colIndex] === value) {
        return BLOCK_RESULT.CORRECT;
      }
      const foundIndex = answerArr.findIndex((item) => item === value);
      return foundIndex >= 0 ? BLOCK_RESULT.MISMATCH : BLOCK_RESULT.FAILED;
    },
    [answerArr]
  );

  function onKeyClick(value: string) {
    if (value === KEY_ENTER) {
      // check result
      if (checkAllBlanksFilled()) {
        saveLog(values[selectedRow]);

        if (checkAnswer()) {
          handleSuccess();
        } else {
          moveToNextRow();
        }
      } else {
        console.log("fill all blanks");
      }
    } else if (value === KEY_BACKSPACE) {
      if (values[selectedRow][selectedCol]) {
        setValues(getNewValuesState(""));
      } else if (selectedCol > 0) {
        setValues(getNewValuesState("", selectedCol - 1));
        moveToPrevCol();
      }
    } else {
      setValues(getNewValuesState(value));
      moveToNextCol();
    }
  }

  useEffect(() => {
    if (selectedRow >= DEFAULT_BLOCK_ROW_COUNT) {
      console.log("FAILED");
      handleFailed();
    }
  }, [selectedRow]);

  useEffect(() => {
    if (result) {
      console.log("Result", result);
      setFinished(true);
      // controll dialog
    }
  }, [result]);

  return (
    <>
      <Menu selectedItem={GAME_KORDLE} menuList={gameList} />
      <WordBlockContainer>
        {loop(DEFAULT_BLOCK_ROW_COUNT, (rowIndex) => (
          <WordBlockList key={rowIndex}>
            {loop(DEFAULT_BLOCK_COLUMN_COUNT, (colIndex) => (
              <WordBlock
                key={`${rowIndex}-${colIndex}`}
                value={values[rowIndex][colIndex]}
                isSelected={
                  !finished &&
                  rowIndex === selectedRow &&
                  colIndex === selectedCol
                }
                status={
                  rowIndex < selectedRow &&
                  getStatus(colIndex, values[rowIndex][colIndex])
                }
              />
            ))}
          </WordBlockList>
        ))}
      </WordBlockContainer>

      <QwetyKeyboard onKeyInputCallback={onKeyClick} freeze={finished} />
    </>
  );
}
