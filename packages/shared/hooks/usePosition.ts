import { DependencyList, useLayoutEffect, useState } from "react";
import isEqual from "react-fast-compare";
import { pick } from "../utils";
import useRerender from "./useRerender";

export type positionType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};
const posAttrs = ["left", "top", "right", "bottom", "width", "height"] as const;
/**
 * returns position of an element AFTER IT IS MOUNTED IN THE DOM
 * also - return the last remembered position of the element if it's not in the DOM
 */
const usePosition = (elementRef: HTMLElement | null, dependencies?: DependencyList | undefined): positionType | null => {
  // console.log("usePosition");
  const render = useRerender();
  const [position, setPosition] = useState<positionType | null>(null);

  useLayoutEffect(() => {
    render();
  }, [elementRef]);

  useLayoutEffect(() => {
    if (!elementRef || typeof elementRef != "object" || !("getBoundingClientRect" in elementRef)) return;
    const currentPos = pick(elementRef.getBoundingClientRect(), posAttrs);

    // console.log(currentPos);
    if (!isEqual(position, currentPos)) {
      setPosition(currentPos);
    }
  }, dependencies);

  const decoupledPosition = position && { ...position };
  return decoupledPosition;
};
export default usePosition;
