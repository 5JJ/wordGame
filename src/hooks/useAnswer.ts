import {
  GAME_HANGMAN,
  GAME_KORDLE,
  KR_CONSONANTS,
  KR_VOWELS,
} from "constants/common";
import { useMemo, useState } from "react";

import KordleAnswers from "data/kordle_answers.json";
import HangmanAnswers from "data/hangman_answer.json";

import type { AlphabetStatusList } from "pages/hangman/types";

const KEY_ANSWER = "answer";
const START_DATE = "2022/06/18";
const START_DATE_TIME = new Date(START_DATE).getTime();

type KordleLogType = string[][];
type HangmanLogType = AlphabetStatusList;
type ResultType = "success" | "failed";

type LogType<T extends AnswerType> = T extends "kordle"
  ? KordleLogType
  : HangmanLogType;

type AnswerDataType<T extends AnswerType> = {
  answer: string;
  date: Date;
  log: LogType<T>;
  result?: ResultType;
};

type AnswerType = typeof GAME_HANGMAN | typeof GAME_KORDLE;

export default function useAnswer<T extends AnswerType>(type: T) {
  const [answerData, setAnswerData] = useState<AnswerDataType<T>>(() =>
    setData(type)
  );

  function saveItemToLocalStorage(value: AnswerDataType<T>) {
    localStorage.setItem(`${type}_${KEY_ANSWER}`, JSON.stringify(value));
  }

  function getTodayAnswer(type: T) {
    const answersLength =
      type === "kordle" ? KordleAnswers.length : HangmanAnswers.length;

    // start date를 기준으로 현재날짜까지의 + 일수를 계산해서 index로 사용.
    let index = Math.floor((Date.now() - START_DATE_TIME) / 3600 / 1000 / 24);

    if (index >= answersLength) {
      index = Math.floor(Math.random() * (answersLength - 1));
    }
    return type === "kordle" ? KordleAnswers[index] : HangmanAnswers[index];
  }

  function setData(type: T) {
    const storedData = _getItem(type);
    const today = new Date(Date.now());

    if (storedData && _compareDate(today, storedData.date)) {
      return storedData;
    } else {
      const newAnswer = getTodayAnswer(type);
      const newAnswerData = {
        answer: newAnswer,
        date: today,
        log: type === "kordle" ? [] : {},
      } as AnswerDataType<T>;
      saveItemToLocalStorage(newAnswerData);
      return newAnswerData;
    }
  }

  function _checkValidDate(date: Date) {
    return !isNaN(date.getTime());
  }

  function _getItem(type: AnswerType): AnswerDataType<T> | null {
    const data = localStorage.getItem(`${type}_${KEY_ANSWER}`);

    if (!data) {
      return null;
    }

    const parsedData: AnswerDataType<T> = JSON.parse(data);

    if (parsedData && parsedData.date && parsedData.answer && parsedData.log) {
      const date = new Date(parsedData.date);

      if (!_checkValidDate(date)) {
        return null;
      }

      return {
        ...parsedData,
        date,
      };
    }

    return null;
  }

  function _compareDate(date1: Date, date2: Date): boolean {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  function isKordleLog(
    log: HangmanLogType | KordleLogType
  ): log is KordleLogType {
    return Array.isArray(log);
  }

  const values = useMemo(
    () => ({
      ...answerData,
      answerArr: answerData.answer.split(""),
      saveLog: (newLog: T extends "kordle" ? string[] : LogType<T>) => {
        setAnswerData((prevData) => {
          const newData = {
            ...prevData,
            log: (isKordleLog(prevData.log)
              ? [...prevData.log, newLog]
              : { ...prevData.log, ...newLog }) as LogType<T>,
          };
          saveItemToLocalStorage(newData);
          return newData;
        });
      },
      saveResult: (result: ResultType) => {
        setAnswerData((prevData) => {
          const newData = {
            ...prevData,
            result,
          };
          saveItemToLocalStorage(newData);
          return newData;
        });
      },
    }),
    [answerData, type]
  );

  return values;
}
