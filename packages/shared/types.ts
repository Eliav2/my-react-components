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

export type RespectDefaultProps<Props, DefaultProps extends { [key in keyof Props]: any }> = {
  [p in keyof Required<Props>]: p extends keyof DefaultProps ? NonNullable<Props[p]> : Props[p];
};

// old version of respectDefaultProps
type RespectDefaultProps2<Props, DefaultProps extends { [rkey in keyof Props]: any }> = Props & {
  [Property in PickValidKeys<Props, DefaultProps>]-?: Exclude<Props[Property], undefined>;
};

export type Primitive = string | number | boolean | null | undefined;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;

// merges unions of same object to single object
// for example: {test:number}|{test:number} => {test:number}
export type MergeSame<U> = UnionToIntersection<U> extends infer O ? { [K in keyof O]: O[K] } : never;

// type Props = { name?: string; age?: number };
// type DefaultProps = { age: number };
// type t2 = RespectDefaultProps<Props, DefaultProps>;

// type tt = PickValidKeys<Props, DefaultProps>;

// type G<T1, T2 extends { [key in keyof T1]: any }> = {};
// type t10 = G<{ name?: string; age?: number }, { age:number,test:string }>;
