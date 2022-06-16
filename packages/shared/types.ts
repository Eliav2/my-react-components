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

// expands object types one level deep
export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

// expands object types recursively
export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

// make PS keys be subset of keys of P, with no extra props
export type PickValidKeys<P, PS> = Exclude<keyof P, Exclude<keyof P, keyof PS>>;

// utility that
export type RespectDefaultProps<Props, DefaultProps extends { [rkey in keyof Props]: any }> = Expand<
  Props & {
    [Property in PickValidKeys<Props, DefaultProps>]-?: Exclude<Props[Property], undefined>;
  }
>;
