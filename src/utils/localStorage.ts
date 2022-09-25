const KEY_ANSWER = "answer";

const getItem = (key) => localStorage.getItem(key);
const setItem = (key, value) => localStorage.setItem(key, value);

export const saveAnswerData = () => {};

export const getAnswerData = () => getItem(KEY_ANSWER);

export default { getItem, setItem };
