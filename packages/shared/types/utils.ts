// remove readonly modifiers
export type Writeable<T> = { -readonly [P in keyof T]: T[P] };
// remove readonly modifiers recursively
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
export type AnyObj = { [key: string]: any };
export type PossiblyReadOnly<T> = T | Readonly<T>;
export type PossiblyArray<T> = T | Array<T>;

// remove readonly modifier from object
export const makeWriteable = <T extends AnyObj>(obj: T): Writeable<T> => {
  return obj;
};
// remove readonly modifier from object recursively
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

export type RespectDefaultProps<Props, DefaultProps extends { [key in keyof Props]?: any }> = {
  [p in keyof Required<Props>]: p extends keyof DefaultProps ? NonNullable<Props[p]> : Props[p];
};

export type Primitive = string | number | boolean | null | undefined;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// merges unions of same object to single object
// for example: {test:number}|{test:number} => {test:number}
export type MergeSame<U> = UnionToIntersection<U> extends infer O ? { [K in keyof O]: O[K] } : never;

/** mimics the spread operator for typescript types */
type Spread<T1, T2> = Expand<
  {
    [Property in keyof T2]: T2[Property];
  } & T1
>;

export type MapNonNullable<T extends {}> = { [key in keyof T]: NonNullable<T[key]> };

// type Props = { name?: string; age?: number };
// type DefaultProps = { age: number };
// type t2 = RespectDefaultProps<Props, DefaultProps>;

// type tt = PickValidKeys<Props, DefaultProps>;

// type G<T1, T2 extends { [key in keyof T1]: any }> = {};
// type t10 = G<{ name?: string; age?: number }, { age:number,test:string }>;
