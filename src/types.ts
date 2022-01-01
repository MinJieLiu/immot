type valueOf<T> = T[keyof T];

// prettier-ignore
type KeyName<D> =
  D extends [] ? number :
    D extends Map<infer MK, infer MV> ? MK :
      D extends object ? keyof D :
        never;

// prettier-ignore
type KeyPath<D> =
  D extends (infer L)[] ? readonly[number] | KeyPath2<number, L> :
    D extends Set<infer S> ? readonly[S] | KeyPath2<S, S> :
      D extends Map<infer MK, infer MV> ? readonly[MK] | KeyPath2<MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[Key] | KeyPath2<Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath2<K1, D> =
  D extends (infer L)[] ? readonly[K1, number] | KeyPath3<K1, number, L> :
    D extends Set<infer S> ? readonly[K1, S] | KeyPath3<K1, S, S> :
      D extends Map<infer MK, infer MV> ? readonly[K1, MK] | KeyPath3<K1, MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, Key] | KeyPath3<K1, Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath3<K1, K2, D> =
  D extends (infer L)[] ? readonly[K1, K2, number] | KeyPath4<K1, K2, number, L> :
    D extends Set<infer S> ? readonly[K1, K2, S] | KeyPath4<K1, K2, S, S> :
      D extends Map<infer MK, infer MV> ? readonly[K1, K2, MK] | KeyPath4<K1, K2, MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, Key] | KeyPath4<K1, K2, Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath4<K1, K2, K3, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, number] | KeyPath5<K1, K2, K3, number, L> :
    D extends Set<infer S> ? readonly[K1, K2, K3, S] | KeyPath5<K1, K2, K3, S, S> :
      D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, MK] | KeyPath5<K1, K2, K3, MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, Key] | KeyPath5<K1, K2, K3, Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath5<K1, K2, K3, K4, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, K4, number] | KeyPath6<K1, K2, K3, K4, number, L> :
    D extends Set<infer S> ? readonly[K1, K2, K3, K4, S] | KeyPath6<K1, K2, K3, K4, S, S> :
      D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, K4, MK] | KeyPath6<K1, K2, K3, K4, MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, Key] | KeyPath6<K1, K2, K3, K4, Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath6<K1, K2, K3, K4, K5, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, K4, K5, number] | KeyPath7<K1, K2, K3, K4, K5, number, L> :
    D extends Set<infer S> ? readonly[K1, K2, K3, K4, K5, S] | KeyPath7<K1, K2, K3, K4, K5, S, S> :
      D extends Map<infer MK, infer MV> ? readonly[K1, K2, K3, K4, K5, MK] | KeyPath7<K1, K2, K3, K4, K5, MK, MV> :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, K5, Key] | KeyPath7<K1, K2, K3, K4, K5, Key, D[Key]> }> :
          never

// prettier-ignore
type KeyPath7<K1, K2, K3, K4, K5, K6, D> =
  D extends any[] ? readonly[K1, K2, K3, K4, K5, K6, number] :
    D extends Set<infer S> ? readonly[K1, K2, K3, K4, K5, K6, S] :
      D extends Map<infer MK, any> ? readonly[K1, K2, K3, K4, K5, K6, MK] :
        D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, K5, K6, Key] }> :
          never

/* prettier-ignore */
type Resolve1<D, K1> =
  D extends (infer L)[] ? (K1 extends number ? L : never) :
    D extends Map<infer MK, infer MV> ? (K1 extends MK ? MV : never) :
      D extends object ? (K1 extends keyof D ? D[K1] : never) :
        never

// prettier-ignore
type Resolve2<D, K1, K2> = Resolve1<Resolve1<D, K1>, K2>;
// prettier-ignore
type Resolve3<D, K1, K2, K3> = Resolve1<Resolve2<D, K1, K2>, K3>;
// prettier-ignore
type Resolve4<D, K1, K2, K3, K4> = Resolve1<Resolve3<D, K1, K2, K3>, K4>;
// prettier-ignore
type Resolve5<D, K1, K2, K3, K4, K5> = Resolve1<Resolve4<D, K1, K2, K3, K4>, K5>
// prettier-ignore
type Resolve6<D, K1, K2, K3, K4, K5, K6> = Resolve1<Resolve5<D, K1, K2, K3, K4, K5>, K6>
// prettier-ignore
type Resolve7<D, K1, K2, K3, K4, K5, K6, K7> = Resolve1<Resolve6<D, K1, K2, K3, K4, K5, K6>, K7>

type Resolve<D, KS> = KS extends readonly [infer K1]
  ? Resolve1<D, K1>
  : KS extends readonly [infer K1, infer K2]
  ? Resolve2<D, K1, K2>
  : KS extends readonly [infer K1, infer K2, infer K3]
  ? Resolve3<D, K1, K2, K3>
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4]
  ? Resolve4<D, K1, K2, K3, K4>
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4, infer K5]
  ? Resolve5<D, K1, K2, K3, K4, K5>
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4, infer K5, infer K6]
  ? Resolve6<D, K1, K2, K3, K4, K5, K6>
  : KS extends readonly [infer K1, infer K2, infer K3, infer K4, infer K5, infer K6, infer K7]
  ? Resolve7<D, K1, K2, K3, K4, K5, K6, K7>
  : never;

type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T];

type DeleteFnPath<S> = S extends []
  ? number | number[]
  : S extends Map<infer MK, unknown>
  ? MK | MK[]
  : NullableKeys<S> | NullableKeys<S>[];

type Updater<T> = (prev: T) => T;

export type { KeyName, KeyPath, Resolve, Resolve1, DeleteFnPath, Updater };
