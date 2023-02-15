import isEqual from "react-fast-compare";
import { useLayoutEffect, useRef, useState } from "react";

/**
 * this hook is used to make sure that the value is stable between renders
 * it's useful when you want to use the value DOM properties in the next render, and you wanna make sure
 * that the component would render again with the new value
 *
 * using this hook usually adds another render cycle, and it should be used only on advanced cases
 */
const useStableUIValue = <T>(getValue: (() => () => T) | null, dependencies: any[] = [], equalityFunc = isEqual): T | undefined => {
  const [state, setState] = useState(getValue?.());
  const valueRef = useRef(state);

  useLayoutEffect(() => {
    if (!getValue) return;
    const value = getValue()();
    if (valueRef.current !== value) {
      valueRef.current = value;
      setState(value);
    }
    // if (!equalityFunc(state, value)) {
    //   setState(value);
    // }
  }, dependencies);
  return state;
};
export default useStableUIValue;
