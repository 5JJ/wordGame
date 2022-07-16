type loopType = <T>(times: number, callback: (index: number) => T) => T[];

export const loop: loopType = (times, callback) =>
  new Array(times).fill(0).map((_, index) => callback.call({}, index));

type findAllIndexesType = <T>(
  arr: T[],
  callback: (item: T, index?: number) => boolean
) => number[];

export const findAllIndexes: findAllIndexesType = (arr, callback) =>
  arr.reduce((acc, item, index) => {
    if (callback.call({}, item, index)) {
      acc.push(index);
    }
    return acc;
  }, []);

type padZeroType = (str: string, maxLength: number) => string;

export const padZero: padZeroType = (str, maxLength) => {
  const zeroCount = str.length - maxLength;

  if (zeroCount > 0) {
    return `${"0".repeat(zeroCount)}${str}`;
  }

  return str;
};

export default {};
