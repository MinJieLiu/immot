import type KeyPath from "./KeyPath";
import type Resolve from "./Resolve";

export type NullableKeys<T> = {
  [K in keyof T]-?: undefined extends T[K] ? K : never;
}[keyof T];

export type Updater<T> = (prev: T) => T;

function shadowCopy<T>(state: T): T {
  if (Array.isArray(state)) {
    return [...state] as unknown as T;
  }
  return { ...state };
}

/**
 * 更新返回新对象
 */
function baseUpdate<S, KS extends keyof S>(
  state: S,
  keyPath: KS,
  updater: Updater<S[KS]>
): S {
  const value = updater(state[keyPath]);
  if (value === state[keyPath]) {
    return state;
  }
  const result = shadowCopy(state);
  result[keyPath] = value;
  return result;
}

/**
 * 根据路径初始化对应的值
 */
function initKeyPath(key: string | number) {
  return Number.isInteger(key) ? [] : {};
}

/**
 * 深层次更新返回新对象
 */
function baseUpdateIn<S, KS extends KeyPath<S>>(
  state: S,
  keyPath: KS,
  updater: Updater<Resolve<S, KS>>
): S {
  let index = -1;
  // 路径上的值
  const pathState = [state] as Resolve<S, KS>[];
  // 路径上最后一个值
  let lastItem;
  const pathLength = keyPath.length as number;

  while (++index < pathLength) {
    const currKeyPath = keyPath[index] as string;
    // 最近一次放入的值
    const last = pathState[index];
    // 当前
    const cursor = last?.[currKeyPath];

    // 获取末尾具体值
    if (index === pathLength - 1) {
      lastItem = cursor;
      break;
    }
    pathState.push(cursor);
  }

  // 更新结果
  const value = updater(lastItem);
  // 若值不发生改变，则不操作数据
  if (lastItem === value) {
    return state;
  }

  let result = value as S;
  let resultIndex = pathLength;
  // 组装结果（倒序）
  while (resultIndex-- > 0) {
    const origin = pathState[resultIndex];
    const currKeyPath = keyPath[resultIndex] as string;
    const current =
      origin !== undefined ? shadowCopy(origin) : initKeyPath(currKeyPath);
    current[currKeyPath] = result;
    result = current as S;
  }
  return result;
}

export const immet = {
  $set: <S, KS extends keyof S>(state: S, keyPath: KS, value: S[KS]): S => {
    return baseUpdate(state, keyPath, () => value);
  },
  $setIn: <S, KS extends KeyPath<S>>(
    state: S,
    keyPath: KS,
    value: Resolve<S, KS>
  ): S => {
    return baseUpdateIn(state, keyPath, () => value);
  },

  $merge: <S>(state: S, values: Partial<S>): S => {
    if (Array.isArray(state)) {
      return Object.assign([], state, values) as unknown as S;
    }
    return { ...state, ...values };
  },
  $mergeIn: <S, KS extends KeyPath<S>>(
    state: S,
    keyPath: KS,
    values: Partial<Resolve<S, KS>>
  ): S => {
    return baseUpdateIn(state, keyPath, (prev) => immet.$merge(prev, values));
  },

  $update: baseUpdate,
  $updateIn: <S, KS extends KeyPath<S>>(
    state: S,
    keyPath: KS,
    updater: Updater<Resolve<S, KS>>
  ): S => {
    return baseUpdateIn(state, keyPath, updater);
  },

  $delete: <S>(
    state: S,
    keyPath: S extends [] ? number : NullableKeys<S>
  ): S => {
    if (Array.isArray(state)) {
      return immet.$splice(state, keyPath as number, 1) as unknown as S;
    }
    const { [keyPath]: removed, ...result } = state;
    return result as S;
  },

  $push: <S>(state: S[], ...values: S[]): S[] => {
    return state.concat(values) as S[];
  },
  $pop: <S>(state: S[]): S[] => {
    return state.slice(0, -1);
  },
  $shift: <S>(state: S[]): S[] => {
    return state.slice(1);
  },
  $unshift: <S>(state: S[], ...values: S[]): S[] => {
    return values.concat(state);
  },
  $splice: <S>(
    state: S[],
    start: number,
    deleteCount: number,
    ...values: S[]
  ): S[] => {
    const next = [...state];
    next.splice(start, deleteCount, ...values);
    return next;
  },
};
