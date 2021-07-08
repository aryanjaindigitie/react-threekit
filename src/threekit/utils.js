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

export const isJsonString = (str) => {
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
    output[decodeURIComponent(key)] = isJsonString(preppedValue)
      ? JSON.parse(preppedValue)
      : preppedValue;
    return output;
  }, {});
};

export const configurationToParams = (configuration) =>
  Object.entries(configuration).reduce((output, [attribute, value], i) => {
    if (i) output += '&';
    if (value === undefined || value === null) return output;
    if (['string', 'number'].includes(typeof value))
      output += `${encodeURIComponent(attribute)}=${encodeURIComponent(value)}`;
    else if (assetId in value)
      output += `${encodeURIComponent(attribute)}=${encodeURIComponent(
        value.assetId
      )}`;
    else
      output += `${encodeURIComponent(attribute)}=${encodeURIComponent(
        JSON.stringify(value)
      )}`;
    return output;
  }, '');

export const configurationFromParams = (params = getParams()) =>
  Object.entries(params).reduce((output, [key, val]) => {
    let value = val;
    if (threekit.utils.isUuid(val)) value = { assetId: val };
    else if (isJsonString(val)) value = JSON.parse(val);
    return Object.assign(output, {
      [key]: value,
    });
  }, {});

export const regularToKebabCase = (str) =>
  !str?.length
    ? ''
    : str
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

export const hexToRgb = (hex) =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map((x) => parseInt(x, 16));

export const rgbToHex = (r, g, b) =>
  '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('');

export const inflateRgb = (rgbObj) =>
  Object.entries(rgbObj).reduce(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: Math.round(255 * value) })
        : output,
    {}
  );

export const deflateRgb = (rgbObj) =>
  Object.entries(rgbObj).reduce(
    (output, [key, value]) =>
      ['r', 'g', 'b'].includes(key)
        ? Object.assign(output, { [key]: value / 255 })
        : output,
    {}
  );
