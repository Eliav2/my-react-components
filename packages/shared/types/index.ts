import { Writeable } from "./utils";

export type PercentStr = `${number}%`;

/**
 * a string that have may have absolute value and\or percent value
 * Examples:
 * '100' => { abs: 100, relative: 0 };
 * 100 => { abs: 100, relative: 0 };
 * '100%' => { abs: 0, relative: 1 };
 * '100%100' => { abs: 100, relative: 1 };
 */
export type RelativeSize = number | `${number | PercentStr}${number | ""}`;

export * from "./utils";
