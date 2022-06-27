import { RelativeSize } from "../types";

export type RelativePos = { abs: number; percent: number };

/**
 * parse a string that have may have absolute value and\or percent value
 */
export const parseRelativeSize = (str: RelativeSize): RelativePos => {
  if (typeof str === "number") return { abs: str, percent: 0 };
  if (typeof str !== "string") return { abs: 0, percent: 0.5 };
  let sp = str.split("%");
  let absLen = 0,
    percentLen = 0;
  if (sp.length == 1) {
    let p = parseFloat(sp[0]);
    if (!isNaN(p)) {
      absLen = p;
      return { abs: absLen, percent: 0 };
    }
  } else if (sp.length == 2) {
    let [p1, p2] = [parseFloat(sp[0]), parseFloat(sp[1])];
    if (!isNaN(p1)) percentLen = p1 / 100;
    if (!isNaN(p2)) absLen = p2;
    if (!isNaN(p1) || !isNaN(p2)) return { abs: absLen, percent: percentLen };
  }
  return { abs: 0, percent: 0 };
};

export const getRelativeSizeValue = (val: RelativeSize, size: number): number => {
  const { abs, percent } = parseRelativeSize(val);
  return percent * size + abs;
};
