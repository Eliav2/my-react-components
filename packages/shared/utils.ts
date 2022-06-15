/** clones deep object that DOES NOT CONTAIN FUNCTION VALUES IN IT */
import { AnyObj, PossiblyReadOnly } from "./types";

export const cloneDeepNoFunction = <T extends AnyObj>(obj: T): T => {
  if (obj === undefined) return obj;
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Recursively merge properties of two objects
 */
export function mergeRecursive(obj1: AnyObj, obj2: AnyObj) {
  for (const p in obj2) {
    try {
      // Property in destination object set; update its value.
      if (obj2[p].constructor == Object) {
        obj1[p] = mergeRecursive(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      // Property in destination object not set; create it and set its value.
      obj1[p] = obj2[p];
    }
  }

  return obj1;
}

/** picks specified properties from object */
export const pick = <T extends AnyObj, K extends keyof T>(
  obj: PossiblyReadOnly<T>,
  props: PossiblyReadOnly<K[]>
): {
  [key in K]: T[key];
} => {
  const newObj: T = {} as T;
  props.forEach((prop) => {
    newObj[prop] = obj[prop];
  });
  return newObj;
};
