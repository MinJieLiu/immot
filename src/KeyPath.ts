type valueOf<T> = T[keyof T];

// prettier-ignore
type KeyPath<D> =
  D extends (infer L)[] ? readonly[number] | KeyPath2<number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[Key] | KeyPath2<Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath2<K1, D> =
  D extends (infer L)[] ? readonly[K1, number] | KeyPath3<K1, number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, Key] | KeyPath3<K1, Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath3<K1, K2, D> =
  D extends (infer L)[] ? readonly[K1, K2, number] | KeyPath4<K1, K2, number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, Key] | KeyPath4<K1, K2, Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath4<K1, K2, K3, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, number] | KeyPath5<K1, K2, K3, number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, Key] | KeyPath5<K1, K2, K3, Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath5<K1, K2, K3, K4, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, K4, number] | KeyPath6<K1, K2, K3, K4, number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, Key] | KeyPath6<K1, K2, K3, K4, Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath6<K1, K2, K3, K4, K5, D> =
  D extends (infer L)[] ? readonly[K1, K2, K3, K4, K5, number] | KeyPath7<K1, K2, K3, K4, K5, number, L> :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, K5, Key] | KeyPath7<K1, K2, K3, K4, K5, Key, D[Key]> }> :
      never

// prettier-ignore
type KeyPath7<K1, K2, K3, K4, K5, K6, D> =
  D extends any[] ? readonly[K1, K2, K3, K4, K5, K6, number] :
    D extends object ? valueOf<{ [Key in keyof D]: readonly[K1, K2, K3, K4, K5, K6, Key] }> :
      never

export default KeyPath;
