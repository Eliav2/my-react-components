import { useEffect, useLayoutEffect, useState } from "react";
import { pick } from "lodash";
import isEqual from "react-fast-compare";
export type positionType = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
} | null;
const posAttrs = ["left", "top", "right", "bottom", "width", "height"] as const;
/**
 * returns position of an element along with a reference to the element
 * also - return the last remembered position of the element if it's not in the DOM
 */
const usePosition = (elementRef: HTMLElement | null, dependencies?): positionType => {
  const [position, setPosition] = useState<positionType | null>(null);

  useLayoutEffect(() => {
    if (!elementRef || typeof elementRef != "object" || !("getBoundingClientRect" in elementRef)) return;
    const currentPos = pick(elementRef.getBoundingClientRect(), posAttrs);
    // console.log(currentPos);
    if (!isEqual(position, currentPos)) {
      setPosition(currentPos);
    }
  }, dependencies);
  // }, [elementRef, c.left, c.top, c.right, c.bottom, c.width, c.height]);
  return position;
};
export default usePosition;

// const usePosition = (elementRef: HTMLElement | null, dependencies?): positionType => {
//   const [position, setPosition] = useState<positionType | null>(null);
//   let c = position ?? {};
//   useEffect(() => {
//     if (!elementRef || typeof elementRef != "object" || !("getBoundingClientRect" in elementRef)) return;
//     const currentPos = pick(elementRef.getBoundingClientRect(), posAttrs);
//     if (!isEqual(position, currentPos)) {
//       setPosition(currentPos);
//     }
//   }, [c.left, c.top, c.right, c.bottom, c.width, c.height, ...(dependencies ?? [])]);
//   return position;
// };
