type loopType<T> = (times: number, callback: (index: number) => T) => T[];

export const loop: loopType<any> = (times, callback) =>
  new Array(times).fill(0).map((_, index) => callback.call({}, index));

export default {};
