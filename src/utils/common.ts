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

export default {};
