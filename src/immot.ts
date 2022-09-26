import type {
  DeleteFnPath,
  Generic,
  MergeInOperator,
  PathValue,
  SetInOperator,
  UpdateInOperator,
  Updater,
} from './types';

function isMap<T>(obj: T) {
  return obj instanceof Map;
}

const { isArray } = Array;

function shadowAssign<S, KS extends keyof Generic<S>>(state: S, keyPath: KS, value: PathValue<S, KS>) {
  if (isArray(state)) {
    const result = state.slice(0) as unknown as S;
    result[keyPath as number] = value;
    return result;
  }
  if (isMap(state)) {
    return new Map(state as unknown as Map<unknown, unknown>).set(keyPath, value);
  }
  return { ...state, [keyPath as string | symbol]: value };
}

function baseUpdate<S, KS extends keyof Generic<S>>(state: S, keyPath: KS, updater: Updater<PathValue<S, KS>>): S {
  const origin = isMap(state)
    ? ((state as unknown as Map<unknown, unknown>).get(keyPath) as PathValue<S, KS>)
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

function baseUpdateIn<S, K, U extends (arg: S) => any>(state: S, keyPath: K, updater: U) {
  let index = -1;
  let lastItem;
  const pathState = [state];
  const pathLength = (keyPath as unknown as []).length as number;
  if (!pathLength) {
    return updater(state);
  }

  while (++index < pathLength) {
    const currKeyPath = keyPath[index] as string;
    const parent = pathState[index];
    const cursor = isMap(parent)
      ? (parent as unknown as Map<unknown, unknown>).get(currKeyPath)
      : parent?.[currKeyPath];
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

  let result = value;
  let resultIndex = pathLength;
  // reverse order
  while (resultIndex-- > 0) {
    const origin = pathState[resultIndex];
    const currKeyPath = keyPath[resultIndex];
    result = origin !== undefined ? shadowAssign(origin, currKeyPath, result) : initKeyPath(currKeyPath, result);
  }
  return result;
}

export const $set = <S, KS extends keyof Generic<S>>(state: S, keyPath: KS, value: PathValue<S, KS>): S => {
  return baseUpdate(state, keyPath, () => value);
};

export const $setIn: SetInOperator = <S, KS>(state: S, keyPath: KS, value: PathValue<S, KS>): S => {
  return baseUpdateIn(state, keyPath, () => value);
};

export const $merge = <S>(state: S, values: Partial<S>): S => {
  if (isArray(state)) {
    return Object.assign([], state, values) as unknown as S;
  }
  return { ...state, ...values };
};

export const $mergeIn: MergeInOperator = <S, KS>(state: S, keyPath: KS, values: Partial<S>): S => {
  return baseUpdateIn(state, keyPath, (prev) => $merge(prev, values));
};

export const $update = baseUpdate;

export const $updateIn: UpdateInOperator = <S, KS>(state: S, keyPath: KS, updater: Updater<S>): S => {
  return baseUpdateIn(state, keyPath, updater);
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

export const $delete = <S>(state: S, keyList: DeleteFnPath<S>): S => {
  if (isArray(state)) {
    if (isArray(keyList)) {
      return state.filter((n, i) => !keyList.includes(i)) as unknown as S;
    }
    return $splice(state, keyList as number, 1) as unknown as S;
  }

  if (isMap(state)) {
    const result = new Map(state as unknown as Map<unknown, unknown>);
    if (isArray(keyList)) {
      keyList.forEach((key) => {
        result.delete(key);
      });
    } else {
      result.delete(keyList);
    }
    return result as unknown as S;
  }

  const result = {} as S;
  const keys = Object.keys(state);
  keys.forEach((key) => {
    if (isArray(keyList) ? !keyList.includes(key) : keyList !== key) {
      result[key] = state[key];
    }
  });
  return result;
};
