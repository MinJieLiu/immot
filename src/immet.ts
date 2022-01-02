import type { DeleteFnPath, KeyName, KeyPath, Resolve, Resolve1, Updater } from "./types";

function isMap<T>(obj: T) {
  return obj instanceof Map;
}

const isArray = Array.isArray;

function shadowAssign<S, KS extends KeyName<S>>(state: S, keyPath: KS, value: Resolve1<S, KS>) {
  if (isArray(state)) {
    const result = [...state] as unknown as S;
    result[keyPath as number] = value;
    return result;
  }
  if (isMap(state)) {
    return new Map(state as unknown as Map<unknown, unknown>).set(keyPath, value);
  }
  return { ...state, [keyPath as string | symbol]: value };
}

function baseUpdate<S, KS extends KeyName<S>>(state: S, keyPath: KS, updater: Updater<Resolve1<S, KS>>): S {
  const origin = isMap(state)
    ? ((state as unknown as Map<unknown, unknown>).get(keyPath) as Resolve1<S, KS>)
    : state[keyPath as string];

  const value = updater(origin);
  if (value === origin) {
    return state;
  }
  return shadowAssign(state, keyPath, value) as S;
}

function initKeyPath(key: string | number | symbol, value: unknown) {
  if (Number.isInteger(key)) {
    const result = [] as unknown[];
    result[key] = value;
    return result;
  }
  return {
    [key]: value,
  };
}

function baseUpdateIn<S, KS extends KeyPath<S>>(state: S, keyPath: KS, updater: Updater<Resolve<S, KS>>): S {
  let index = -1;
  let lastItem;
  const pathState = [state] as Resolve<S, KS>[];
  const pathLength = (keyPath as unknown as []).length as number;

  while (++index < pathLength) {
    const currKeyPath = keyPath[index] as string;
    const parent = pathState[index];
    const cursor = parent?.[currKeyPath];
    if (index === pathLength - 1) {
      lastItem = cursor;
      break;
    }
    pathState.push(cursor);
  }
  const value = updater(lastItem);
  if (lastItem === value) {
    return state;
  }

  let result = value as S;
  let resultIndex = pathLength;
  // reverse order
  while (resultIndex-- > 0) {
    const origin = pathState[resultIndex] as S;
    const currKeyPath = keyPath[resultIndex] as KeyName<S>;
    const current =
      origin !== undefined
        ? shadowAssign(origin, currKeyPath, result as Resolve1<S, KeyName<S>>)
        : initKeyPath(currKeyPath as string, result);
    result = current as S;
  }
  return result;
}

export const $set = <S, KS extends KeyName<S>>(state: S, keyPath: KS, value: Resolve1<S, KS>): S => {
  return baseUpdate(state, keyPath, () => value);
};

export const $setIn = <S, KS extends KeyPath<S>>(state: S, keyPath: KS, value: Resolve<S, KS>): S => {
  return baseUpdateIn(state, keyPath, () => value);
};

export const $merge = <S>(state: S, values: Partial<S>): S => {
  if (isArray(state)) {
    return Object.assign([], state, values) as unknown as S;
  }
  return { ...state, ...values };
};

export const $mergeIn = <S, KS extends KeyPath<S>>(state: S, keyPath: KS, values: Partial<Resolve<S, KS>>): S => {
  return baseUpdateIn(state, keyPath, (prev) => $merge(prev, values));
};

export const $update = baseUpdate;

export const $updateIn = <S, KS extends KeyPath<S>>(state: S, keyPath: KS, updater: Updater<Resolve<S, KS>>): S => {
  return baseUpdateIn(state, keyPath, updater);
};

export const $delete = <S>(state: S, keyPath: DeleteFnPath<S>): S => {
  if (isArray(state)) {
    if (isArray(keyPath)) {
      return state.filter((n, i) => !keyPath.includes(i)) as unknown as S;
    }
    return $splice(state, keyPath as number, 1) as unknown as S;
  }

  if (isMap(state)) {
    const result = new Map(state as unknown as Map<unknown, unknown>);
    if (isArray(keyPath)) {
      keyPath.forEach((key) => {
        result.delete(key);
      });
    } else {
      result.delete(keyPath);
    }
    return result as unknown as S;
  }

  const result = {} as S;
  const keys = Object.keys(state);
  keys.forEach((key) => {
    if (isArray(keyPath) ? !keyPath.includes(key) : keyPath !== key) {
      result[key] = state[key];
    }
  });
  return result;
};

export const $push = <S>(state: S[], ...values: S[]): S[] => {
  return state.concat(values) as S[];
};

export const $pop = <S>(state: S[]): S[] => {
  return state.slice(0, -1);
};

export const $shift = <S>(state: S[]): S[] => {
  return state.slice(1);
};

export const $unshift = <S>(state: S[], ...values: S[]): S[] => {
  return values.concat(state);
};

export const $splice = <S>(state: S[], start: number, deleteCount: number, ...values: S[]): S[] => {
  const next = [...state];
  next.splice(start, deleteCount, ...values);
  return next;
};
