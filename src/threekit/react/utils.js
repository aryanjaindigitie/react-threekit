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
