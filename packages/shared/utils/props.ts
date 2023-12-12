import { Primitive } from "../types";

export type PossiblySpecific<Prop, Spec extends string> = Prop | { [key in Spec]?: Prop };
export type NonNullableProps<T> = { [P in keyof T]-?: NonNullable<T[P]> };
/**
 * will always return a more specific type than the default
 * used to spread a prop to a more specific type
 * @param prop - prop supplied by the used
 * @param fields
 * @param defaultValue
 *
 *
 * example:
 *  let's say we have a prop named 'grid' with type of `boolean|{horizontal?: boolean, vertical?: boolean}`, meaning
 *  that when 'grid' is a boolean both axes are set to the same value, but when it's an object, the horizontal and vertical
 *  axes are set to the values specified in the object.
 *  running parsePossiblySpecific(grid, ['horizontal', 'vertical'], false) will parse this prop return a parsed object
 *  of type `{horizontal?: boolean, vertical?: boolean}`.
 *
 * - parsePossiblySpecific(10, ["horizontal"]) => { horizontal: 10 }
 * - parsePossiblySpecific(10, ["horizontal", "vertical"]) => { horizontal: 10, vertical: 10 }
 * - parsePossiblySpecific(null, ["horizontal"],5) => { horizontal: 5 }
 * - parsePossiblySpecific(10, ["horizontal"],5) => { horizontal: 10 }
 */
export const parsePossiblySpecific = <
  Spec extends string[],
  Prop extends PossiblySpecific<Primitive, Spec[number]>,
  Default extends NonNullable<Primitive> | undefined = undefined
>(
  prop: Prop,
  fields: [...Spec],
  defaultValue?: Default
): {
  [key in Spec[number]]: Prop extends Primitive ? NonNullable<Prop> : Prop extends { [key in keyof Spec]: infer V } ? V : Default;
} => {
  // Prop extends Primitive
  //   ? { [key in Spec[number]]: Prop }
  //   : Prop extends { [key in keyof Spec]: infer V }
  //   ? { [key in Spec[number]]: V }
  //   : { [key in Spec[number]]: Default } => {
  if (typeof prop === "object") {
    // prop is an object, so we return an object with default values only for unspecified fields, and the prop's values for specified fields
    return fields.reduce((prev, field) => ({ ...prev, [field]: prop?.[field] ?? defaultValue }), {}) as any;
  } else {
    // prop is a primitive, so we return a default object with the prop as the value of all fields
    return fields.reduce((prev, field) => ({ ...prev, [field]: prop ?? defaultValue }), {}) as any;
  }
};
