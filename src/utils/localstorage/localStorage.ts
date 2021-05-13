import { useEffect, useState } from "react";

const PREFIX = "task-manager-app-";
const TOKEN = PREFIX + "TOKEN";
const LOGGED_IN = PREFIX + "LOGIN";
const CURRENT_USER = PREFIX + "CURRENT_USER";
const CURRENT_PROJECT = PREFIX + "CURRENT_PROJECT";

const useLocalStorage = (key: string, initialValue?: any) => {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);
    console.log("LOCAL STORAGE", jsonValue);
    try {
      if (jsonValue != null) return JSON.parse(jsonValue);
    } catch (err) {
      console.log("LOCAL STORAGE", err);
    }
    if (typeof initialValue === "function") return initialValue();
    else return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
export { TOKEN, LOGGED_IN, CURRENT_USER, CURRENT_PROJECT };
