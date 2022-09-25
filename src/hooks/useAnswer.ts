import { GAME_HANGMAN, GAME_KORDLE } from "constants/common";
import { useEffect, useState } from "react";

import KordleAnswers from "data/kordle_answers.json";
import HangmanAnswers from "data/hangman_answer.json";

const KEY_ANSWER = "answer";
const START_DATE = "2022/06/18";
const START_DATE_TIME = new Date(START_DATE).getTime();

type AnswerDataType = {
  answer: string;
  date: Date;
};
const DEFAULT_ANSWER_DATA: AnswerDataType = {
  answer: "",
  date: new Date(),
};

type AnswerType = typeof GAME_HANGMAN | typeof GAME_KORDLE;

export default function useAnswer(type: AnswerType) {
  const [answerData, setAnswerData] =
    useState<AnswerDataType>(DEFAULT_ANSWER_DATA);

  const _getTodayAnswer = (type: AnswerType) => {
    const answersLength =
      type === "kordle" ? KordleAnswers.length : HangmanAnswers.length;

    // start date를 기준으로 현재날짜까지의 + 일수를 계산해서 index로 사용.
    let index = Math.floor((Date.now() - START_DATE_TIME) / 3600 / 1000 / 24);

    if (index >= answersLength) {
      index = Math.floor(Math.random() * (answersLength - 1));
    }
    return type === "kordle" ? KordleAnswers[index] : HangmanAnswers[index];
  };

  function _setItem(value: string) {
    localStorage.setItem(`${type}_${KEY_ANSWER}`, value);
  }

  function _getTodayDate() {
    const now = new Date(Date.now());
    return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
  }

  function _getItem(type: AnswerType): AnswerDataType | null {
    const data = localStorage.getItem(`${type}_${KEY_ANSWER}`);

    if (!data) {
      return null;
    }

    const parsedData: AnswerDataType = JSON.parse(data);

    if (parsedData && parsedData.date && parsedData.answer) {
      const date = new Date(parsedData.date);

      if (!_checkValidDate(date)) {
        return null;
      }

      return {
        answer: parsedData.answer,
        date,
      };
    }

    return null;
  }

  const _compareDate = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const _checkValidDate = (date: Date) => !isNaN(date.getTime());

  const updateData = (type: AnswerType) => {
    const storedData = _getItem(type);
    const today = new Date(Date.now());

    console.log("storedData", storedData);
    if (storedData && _compareDate(today, storedData.date)) {
      setAnswerData(storedData);
    } else {
      console.log("=== update stored Data =====");
      const newAnswerData = {
        answer: _getTodayAnswer(type),
        date: today,
      };

      setAnswerData(newAnswerData);
      _setItem(JSON.stringify(newAnswerData));
    }
  };

  useEffect(() => {
    updateData(type);
  }, [type]);

  return answerData;
}
