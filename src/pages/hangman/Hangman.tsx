import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Menu from "components/Menu";

import {
  GAME_LIST_IN_KR,
  GAME_HANGMAN,
  KEY_ENTER,
  KEY_BACKSPACE,
  BLOCK_RESULT,
} from "constants/common";
import WordBlock from "components/WordBlock";
import useAnswer from "hooks/useAnswer";
import { findAllIndexes } from "utils/common";

import QwetyKeyboard from "components/QwetyKeyboard";
import type { keycapType, KeyStatus } from "components/QwetyKeyboard/types";
import HangmanDrawing from "components/HangmanDrawing";
import { WordBlockList, LeftCount } from "./styles";

const MAX_TRY_COUNT = 7;

export default function HangMan() {
  const { answerArr, log, result, saveResult, saveLog } =
    useAnswer<"hangman">("hangman");
  const [values, setValues] = useState<string[]>(() =>
    setValuesWithAlphabetStatus()
  );
  const [alphabetStatus, setAlphabetStatus] = useState<KeyStatus>(log);
  const tryCount = useRef<number>(
    Object.values(log).filter((status) => status === "miscorrect").length
  );

  function setValuesWithAlphabetStatus() {
    const correctValues = Object.keys(log).filter(
      (key) => log[key] === "correct"
    );
    return answerArr.map((arrValue) => {
      if (correctValues.includes(arrValue)) {
        return arrValue;
      }
      return "";
    });
  }

  const gameList = useMemo(
    () =>
      Object.keys(GAME_LIST_IN_KR).map((gameName) => ({
        name: GAME_LIST_IN_KR[gameName],
        link: gameName,
      })),
    []
  );

  const onKeyClick = useCallback(
    (value: keycapType) => {
      if (value === KEY_ENTER || value === KEY_BACKSPACE) {
        return;
      }

      if (alphabetStatus[value]) {
        return;
      }

      const indexes = findAllIndexes(answerArr, (item) => item === value);

      setAlphabetStatus((prevAlphabetStatus) => ({
        ...prevAlphabetStatus,
        [value]: indexes.length ? "correct" : "miscorrect",
      }));

      if (indexes.length > 0) {
        setValues((prevValues) => {
          const newValues = [...prevValues];

          indexes.forEach((index) => {
            newValues[index] = value;
          });

          if (!newValues.some((value) => value === "")) {
            saveResult("success");
          }

          return newValues;
        });
      } else {
        tryCount.current = tryCount.current + 1;

        if (tryCount.current === MAX_TRY_COUNT) {
          saveResult("failed");
        }
      }
    },
    [answerArr]
  );

  useEffect(() => {
    saveLog(alphabetStatus);
    // if (
    //   Object.values(alphabetStatus).filter((status) => status === "miscorrect")
    //     .length === MAX_TRY_COUNT
    // ) {
    //   saveResult("failed");
    // }
  }, [alphabetStatus]);

  useEffect(() => {
    if (result) {
      console.log("result ==>", result);
      // popup dialog
    }
  }, [result]);

  return (
    <>
      <Menu selectedItem={GAME_HANGMAN} menuList={gameList} />
      <HangmanDrawing tryCount={tryCount.current} />
      <WordBlockList>
        {values.map((value, index) => (
          <WordBlock
            key={index}
            value={value}
            isSelected={false}
            status={
              result &&
              (result === "success"
                ? BLOCK_RESULT.CORRECT
                : BLOCK_RESULT.FAILED)
            }
          />
        ))}
      </WordBlockList>
      <LeftCount>{`(Left Count : ${
        MAX_TRY_COUNT - tryCount.current
      })`}</LeftCount>
      <QwetyKeyboard
        freeze={!!result}
        onKeyInputCallback={onKeyClick}
        keyStatus={alphabetStatus}
        hideBackSpaceKey
        hideEnterKey
      />
    </>
  );
}
