export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
export type AnyObj = { [key: string]: any };
export type PossiblyReadOnly<T> = T | Readonly<T>;

export const makeWriteable = <T extends AnyObj>(obj: T): Writeable<T> => {
  return obj;
};
export const makeWriteableDeep = <T extends AnyObj>(obj: T): DeepWriteable<T> => {
  return obj;
};
