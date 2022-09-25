import React, { useEffect, useMemo, useState } from "react";

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

const DEFAULT_BLOCK_ROW_COUNT = 6;
const DEFAULT_BLOCK_COLUMN_COUNT = 6;

type valueType = string[][];

const WordBlockList = styled.div(({}) => ({}));

export default function Kordle() {
  const gameList = useMemo(
    () =>
      Object.keys(GAME_LIST_IN_KR).map((gameName) => ({
        name: GAME_LIST_IN_KR[gameName],
        link: gameName,
      })),
    []
  );

  const { answer } = useAnswer("kordle");
  const answerArr = answer.split("");

  const [selectedRow, setSelectedRow] = useState(0);
  const [selectedCol, setSelectedCol] = useState(0);
  const [values, setValues] = useState<valueType>(setValuesState());
  const [valuesResult, setValuesResult] = useState<valueType>(setValuesState());

  const freeze = selectedCol < 0 || selectedRow < 0;

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

  function updateValuesResult() {
    const currentRow = values[selectedRow];

    const result = currentRow.map((value, index) => {
      if (answerArr[index] === value) {
        return BLOCK_RESULT.CORRECT;
      }
      const foundIndex = answerArr.findIndex((item) => item === value);

      return foundIndex >= 0 ? BLOCK_RESULT.MISMATCH : BLOCK_RESULT.FAILED;
    });

    const copiedValuesResult = getCopiedArr(valuesResult);
    copiedValuesResult[selectedRow] = result;

    setValuesResult(copiedValuesResult);
  }

  function setValuesState(): valueType {
    return loop<string[]>(DEFAULT_BLOCK_ROW_COUNT, () =>
      new Array(DEFAULT_BLOCK_COLUMN_COUNT).fill("")
    );
  }

  function getCopiedArr(targetArr: valueType): valueType {
    return targetArr.reduce((acc: valueType, row: string[]) => {
      acc.push([...row]);

      return acc;
    }, []);
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
    updateValuesResult();
    alert("SUCCESS");
    setSelectedCol(-1);
    setSelectedRow(-1);
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

  function onKeyClick(value: string) {
    if (value === KEY_ENTER) {
      // check result
      if (checkAllBlanksFilled()) {
        if (checkAnswer()) {
          handleSuccess();
        } else {
          updateValuesResult();
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
    if (selectedRow === DEFAULT_BLOCK_ROW_COUNT) {
      console.log("FAILED");
    }
  }, [selectedRow]);

  return (
    <>
      <Menu selectedItem={GAME_KORDLE} menuList={gameList} />
      <div>
        {loop(DEFAULT_BLOCK_ROW_COUNT, (rowIndex) => (
          <WordBlockList key={rowIndex}>
            {loop(DEFAULT_BLOCK_COLUMN_COUNT, (colIndex) => (
              <WordBlock
                key={`${rowIndex}-${colIndex}`}
                value={values[rowIndex][colIndex]}
                isSelected={
                  rowIndex === selectedRow && colIndex === selectedCol
                }
                status={valuesResult[rowIndex][colIndex]}
              />
            ))}
          </WordBlockList>
        ))}
      </div>

      <QwetyKeyboard onKeyInputCallback={onKeyClick} freeze={freeze} />
    </>
  );
}
