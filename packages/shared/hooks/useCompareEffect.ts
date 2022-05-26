import { DependencyList, useLayoutEffect, useRef } from "react";
import isEqual from "react-fast-compare";

const deepCompareEquals = (curVal, refVal) => {
  return isEqual(curVal, refVal);
};

function useDeepCompareMemoize(value, condFunc) {
  const ref = useRef();
  if (!condFunc(value, ref.current)) ref.current = value;

  return ref.current;
}

export function useCompareEffect(
  callback,
  dependencies: undefined | DependencyList = undefined,
  effect = useLayoutEffect,
  condFunc = deepCompareEquals
) {
  effect(
    callback,
    dependencies?.map((dep) => useDeepCompareMemoize(dep, condFunc))
  );
}
