import { useRef } from "react";
import isEqual from "react-fast-compare";

export const useOneTimeWarn = (intro = "", logFunc = console.error) => {
  const warnsHistory = useRef<any[][]>([]);
  const warn = (...warns) => {
    // console.log("useOneTimeWarn", warns);
    if (!warnsHistory.current.find((w) => isEqual(w, warns))) {
      logFunc(intro, ...warns);
      warnsHistory.current.push(warns);
    }
  };
  return warn;
};
