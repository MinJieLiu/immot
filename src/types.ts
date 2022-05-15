// @ts-ignore
type Generic<T> = T extends Map<infer K, infer V> ? { [P in K]: V } : T;

// @ts-ignore
type PathValue<V, K> = Generic<V>[K];

type KeyPath1<T, K1> = NonNullable<PathValue<NonNullable<T>, K1>>;

type KeyPath2<T, K1, K2> = NonNullable<PathValue<KeyPath1<T, K1>, K2>>;

type KeyPath3<T, K1, K2, K3> = NonNullable<PathValue<KeyPath2<T, K1, K2>, K3>>;

type KeyPath4<T, K1, K2, K3, K4> = NonNullable<PathValue<KeyPath3<T, K1, K2, K3>, K4>>;

type KeyPath5<T, K1, K2, K3, K4, K5> = NonNullable<PathValue<KeyPath4<T, K1, K2, K3, K4>, K5>>;

type KeyPath6<T, K1, K2, K3, K4, K5, K6> = NonNullable<PathValue<KeyPath5<T, K1, K2, K3, K4, K5>, K6>>;

type ValuePath1<T, K1> = PathValue<NonNullable<T>, K1>;

type ValuePath2<T, K1, K2> = PathValue<KeyPath1<T, K1>, K2>;

type ValuePath3<T, K1, K2, K3> = PathValue<KeyPath2<T, K1, K2>, K3>;

type ValuePath4<T, K1, K2, K3, K4> = PathValue<KeyPath3<T, K1, K2, K3>, K4>;

type ValuePath5<T, K1, K2, K3, K4, K5> = PathValue<KeyPath4<T, K1, K2, K3, K4>, K5>;

type ValuePath6<T, K1, K2, K3, K4, K5, K6> = PathValue<KeyPath5<T, K1, K2, K3, K4, K5>, K6>;

type ValuePath7<T, K1, K2, K3, K4, K5, K6, K7> = PathValue<KeyPath6<T, K1, K2, K3, K4, K5, K6>, K7>;

interface MergeInOperator {
  <T, K1 extends keyof Generic<NonNullable<T>>, V extends ValuePath1<T, K1>>(
    state: T,
    path: [K1],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    V extends ValuePath2<T, K1, K2>
  >(
    state: T,
    path: [K1, K2],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    V extends ValuePath3<T, K1, K2, K3>
  >(
    state: T,
    path: [K1, K2, K3],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    V extends ValuePath4<T, K1, K2, K3, K4>
  >(
    state: T,
    path: [K1, K2, K3, K4],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    V extends ValuePath5<T, K1, K2, K3, K4, K5>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    V extends ValuePath6<T, K1, K2, K3, K4, K5, K6>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6],
    value: Partial<V>
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    K7 extends keyof Generic<KeyPath6<T, K1, K2, K3, K4, K5, K6>>,
    V extends ValuePath7<T, K1, K2, K3, K4, K5, K6, K7>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6, K7],
    value: Partial<V>
  ): T;
}

interface SetInOperator {
  <T, K1 extends keyof Generic<NonNullable<T>>, V extends ValuePath1<T, K1>>(state: T, path: [K1], value: V): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    V extends ValuePath2<T, K1, K2>
  >(
    state: T,
    path: [K1, K2],
    value: V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    V extends ValuePath3<T, K1, K2, K3>
  >(
    state: T,
    path: [K1, K2, K3],
    value: V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    V extends ValuePath4<T, K1, K2, K3, K4>
  >(
    state: T,
    path: [K1, K2, K3, K4],
    value: V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    V extends ValuePath5<T, K1, K2, K3, K4, K5>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5],
    value: V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    V extends ValuePath6<T, K1, K2, K3, K4, K5, K6>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6],
    value: V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    K7 extends keyof Generic<KeyPath6<T, K1, K2, K3, K4, K5, K6>>,
    V extends ValuePath7<T, K1, K2, K3, K4, K5, K6, K7>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6, K7],
    value: V
  ): T;
}

interface UpdateInOperator {
  <T, K1 extends keyof Generic<NonNullable<T>>, V extends ValuePath1<T, K1>>(
    state: T,
    path: [K1],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    V extends ValuePath2<T, K1, K2>
  >(
    state: T,
    path: [K1, K2],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    V extends ValuePath3<T, K1, K2, K3>
  >(
    state: T,
    path: [K1, K2, K3],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    V extends ValuePath4<T, K1, K2, K3, K4>
  >(
    state: T,
    path: [K1, K2, K3, K4],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    V extends ValuePath5<T, K1, K2, K3, K4, K5>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    V extends ValuePath6<T, K1, K2, K3, K4, K5, K6>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6],
    value: (prev: V) => V
  ): T;

  <
    T,
    K1 extends keyof Generic<NonNullable<T>>,
    K2 extends keyof Generic<KeyPath1<T, K1>>,
    K3 extends keyof Generic<KeyPath2<T, K1, K2>>,
    K4 extends keyof Generic<KeyPath3<T, K1, K2, K3>>,
    K5 extends keyof Generic<KeyPath4<T, K1, K2, K3, K4>>,
    K6 extends keyof Generic<KeyPath5<T, K1, K2, K3, K4, K5>>,
    K7 extends keyof Generic<KeyPath6<T, K1, K2, K3, K4, K5, K6>>,
    V extends ValuePath7<T, K1, K2, K3, K4, K5, K6, K7>
  >(
    state: T,
    path: [K1, K2, K3, K4, K5, K6, K7],
    value: (prev: V) => V
  ): T;
}

type NullableKeys<T> = { [K in keyof T]-?: undefined extends T[K] ? K : never }[keyof T];

type DeleteFnPath<S> = S extends []
  ? number | number[]
  : S extends Map<infer MK, unknown>
  ? MK | MK[]
  : NullableKeys<S> | NullableKeys<S>[];

type Updater<T> = (prev: T) => T;

export type { DeleteFnPath, Generic, MergeInOperator, PathValue, SetInOperator, UpdateInOperator, Updater };
