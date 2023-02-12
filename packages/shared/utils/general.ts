/**
 * General purpose utility functions
 */

/** clones deep object that DOES NOT CONTAIN FUNCTION VALUES IN IT */
import type { AnyObj, Expand, PossiblyReadOnly, Writeable } from "../types";
import React from "react";

/** fast deep clone on json-serializable object (functions inside this object not suppoerted,classes would become objects with no methods) */
export const cloneDeepNoFunction = <T extends AnyObj>(obj: T): T => {
  if (obj === undefined) return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Recursively merge properties of two objects
 */
export function mergeRecursive<T extends AnyObj, T2 extends AnyObj>(obj1: T, obj2: T2): T & T2 {
  // console.log("mergeRecursive");
  for (const p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor == Object) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else {
        // @ts-ignore
        obj1[p] = obj2[p];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      // @ts-ignore
      obj1[p] = obj2[p];
    }
  }

  // @ts-ignore
  return obj1;
}

/** picks specified properties from object */
export const pick = <T extends AnyObj, K extends keyof T>(
  obj: PossiblyReadOnly<T>,
  props: PossiblyReadOnly<K[]>
): Expand<
  Writeable<{
    [key in K]: T[key];
  }>
> => {
  const newObj: T = {} as T;
  props.forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj as any;
};

export function range(start: number, stop: number, step) {
  if (typeof stop == "undefined") {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == "undefined") {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  let result: Array<number> = [];
  for (let i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export const isReactForwardRef = (obj: unknown): obj is React.ForwardRefExoticComponent<any> => {
  return (typeof obj === "object" && obj && "$$typeof" in obj && obj?.$$typeof === Symbol.for("react.forward_ref")) ?? false;
};

// creates a deep frozen object
export function deepFreeze<T extends AnyObj>(o: T) {
  Object.values(o).forEach((v) => Object.isFrozen(v) || deepFreeze(v));
  return Object.freeze(o);
}

export function omit<T extends AnyObj, P extends keyof T>(o: T, property: P): Omit<T, P> {
  const { [property]: _, ...rest } = o;
  return rest;
}

export const assignDefaults = <T extends AnyObj, T2 extends AnyObj>(obj: T, defaults: T2): T & T2 => {
  const newObj = { ...obj };
  for (const key in defaults) {
    newObj[key] ??= defaults[key] as any;
  }
  return newObj as any;
  // return Object.assign({}, obj, defaults);
};
