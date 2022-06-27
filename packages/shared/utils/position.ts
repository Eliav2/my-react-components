import { parseRelativeSize } from "./parse";
import { positionType } from "../hooks/usePosition";
import { RelativeSize } from "../types";

export const getAnchor = (pos: positionType, wantedPos: { left: RelativeSize; top: RelativeSize }) => {
  if (!pos) return null;
  const leftParsed = parseRelativeSize(wantedPos.left);
  const left = leftParsed.percent * pos.width + leftParsed.abs;
  const topParsed = parseRelativeSize(wantedPos.top);
  const top = topParsed.percent * pos.width + topParsed.abs;
  return { left, top };
};
