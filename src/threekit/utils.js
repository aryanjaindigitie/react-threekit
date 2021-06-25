const isObject = (object) => object != null && typeof object === 'object';

export const shallowCompare = (value1, value2) => {
  if (typeof value1 !== typeof value2) return false;

  if (Array.isArray(value1)) {
    if (value1.length !== value2.length) return false;
    for (let i = 0; i < value1.length; i++)
      if (value1[i] !== value2[i]) return false;
  }

  if (typeof value1 !== 'object') return value1 === value2;

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

export const deepCompare = (item1, item2) => {
  //  Are the items the same type
  if (typeof item1 !== typeof item2) return false;
  //  If that type is Array we deepCompare each item
  //  against its counter part
  //  The same arrays in different orders will fail this check
  else if (Array.isArray(item1)) {
    if (item1.length !== item2.length) return false;
    for (let i = 0; i < item1.length; i++)
      if (!deepCompare(item1[i], item2[i])) return false;
    //  If they're objects...
  } else if (isObject(item1)) {
    const keys1 = Object.keys(item1);
    const keys2 = Object.keys(item2);

    //  We makre sure they have the same keys...
    if (keys1.length !== keys2.length) {
      return false;
    }

    //  and then deep compare each value
    for (const key of keys1) {
      if (!deepCompare(item1[key], item2[key])) return false;
    }

    //  This leaves us with literals that can be
    //  compared directly
  } else if (item1 !== item2) return false;

  return true;
};

export const IsJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getParams = () => {
  let query = window.location.search.substr(1);
  return query.split('&').reduce((output, part) => {
    let [key, value] = part.split('=');
    const preppedValue = decodeURIComponent(value);
    output[decodeURIComponent(key)] = IsJsonString(preppedValue)
      ? JSON.parse(preppedValue)
      : preppedValue;
    return output;
  }, {});
};

export const regularToKebabCase = (str) =>
  str
    .split(' ')
    .filter((word) => word?.length)
    .map((word) => word.trim().toLowerCase())
    .join('-');

export const filterAttributesArray = (attributeName, attributes) => {
  const attributesRegExp =
    typeof attributeName === 'string'
      ? new RegExp(`/${attributeName}/`)
      : attributeName;

  return Array.isArray(attributes)
    ? attributes.filter((el) => attributesRegExp.test(el.name))
    : Object.entries(attributes).reduce(
        (output, [attrName, attr]) =>
          attributesRegExp.test(attrName)
            ? Object.assign(output, { [attrName]: attr })
            : output,
        {}
      );
};

export const attrNameToRegExp = (name) =>
  typeof name === 'string' ? new RegExp(`${name} [0-9]`) : name;
