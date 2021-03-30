export const isObject = (object) =>
  object != null && typeof object === 'object';

export const shallowCompare = (value1, value2) => {
  const keys1 = Object.keys(value1);
  const keys2 = Object.keys(value2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (value1[key] !== value2[key]) {
      return false;
    }
  }

  return true;
};

export const deepCompare = (object1, object2) => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    if (typeof val1 !== typeof val2) return false;

    if (isObject(val1) && isObject(val2)) {
      if (!deepCompare(val1, val2)) return false;
    }

    if (val1 !== val2) return false;
  }

  return true;
};
