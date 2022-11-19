type LoopType = <T>(times: number, callback: (index: number) => T) => T[];

export const loop: LoopType = (times, callback) =>
  new Array(times).fill(0).map((_, index) => callback.call({}, index));

type FindAllIndexesType = <T>(
  arr: T[],
  callback: (item: T, index?: number) => boolean
) => number[];

export const findAllIndexes: FindAllIndexesType = (arr, callback) =>
  arr.reduce((acc, item, index) => {
    if (callback.call({}, item, index)) {
      acc.push(index);
    }
    return acc;
  }, []);

type PadZeroType = (str: string, maxLength: number) => string;

export const padZero: PadZeroType = (str, maxLength) => {
  const zeroCount = str.length - maxLength;

  if (zeroCount > 0) {
    return `${"0".repeat(zeroCount)}${str}`;
  }

  return str;
};

export default {};
