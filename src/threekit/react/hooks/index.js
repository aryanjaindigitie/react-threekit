import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getState,
  setState,
  isPlayerLoaded,
  getLocale,
  getLocaleOptions,
  setLocale,
  stepHistory,
} from '../store/threekit';
import { controller } from '../../api';

export const useAttribute = (attribute) => {
  const dispatch = useDispatch();
  const attributeData = useSelector(getState(attribute));

  if (!attribute) return [undefined, undefined];
  if (!attributeData || !Object.keys(attributeData).length)
    return [undefined, undefined];

  const handleChange = (value) => {
    if (!value) return;
    let updated;
    switch (attributeData.type) {
      case 'Number':
        updated = value;
        break;
      case 'Asset':
        if (typeof value === 'number')
          updated = { assetId: attributeData.values[value].assetId };
        else updated = { assetId: value.assetId };
        break;
      case 'String':
        if (typeof value === 'number')
          updated = attributeData.values[value].value;
        else updated = value.value;
        break;
      case 'Color':
        if (typeof value === 'number') updated = attributeData.values[value];
        else updated = value;
        break;
      default:
        updated = value;
    }
    dispatch(setState({ [attribute]: updated }));
  };

  return [attributeData, handleChange];
};

export const useLocale = () => {
  const dispatch = useDispatch();
  const locale = useSelector(getLocale);
  const [localeOptions, setLocaleOptions] = useState(getLocaleOptions());

  useEffect(() => {
    const fetchLocaleOptions = () => {
      if (localeOptions) return;
      const options = getLocaleOptions();
      if (options) return setLocaleOptions(options);
      setTimeout(() => {
        fetchLocaleOptions();
      }, 0.1 * 1000);
    };

    fetchLocaleOptions();
    return;
  }, [locale, localeOptions]);

  const handleChange = (locale) => {
    if (locale?.length && localeOptions.includes(locale)) {
      dispatch(setLocale(locale));
    }
  };

  return [locale, localeOptions, handleChange];
};

export const hasLoaded = () => useSelector(isPlayerLoaded);

export const useZoom = () => {
  const zoomIn = (step) => controller.zoom(step || 1);
  const zoomOut = (step) => controller.zoom(step ? -1 * Math.abs(step) : -1);

  return [zoomIn, zoomOut];
};

export const useHistory = () => {
  const dispatch = useDispatch();
  return (step) => dispatch(stepHistory(step));
};
