import { useSelector, useDispatch } from 'react-redux';
import {
  getAttributes,
  setConfiguration,
  isThreekitLoaded,
  isPlayerLoading,
  getLanguage,
  getLanguageOptions,
  setLanguage,
  stepHistory,
} from '../store/threekit';
import { ATTRIBUTE_TYPES } from '../../constants';

export const useAttribute = (attribute) => {
  const dispatch = useDispatch();
  const attributeData = useSelector(getAttributes(attribute));

  if (!attribute) return [undefined, undefined];
  if (!attributeData || !Object.keys(attributeData).length)
    return [undefined, undefined];

  const handleChange = (value) => {
    if (!value) return;
    let updated;
    switch (attributeData.type) {
      case ATTRIBUTE_TYPES.number:
        updated = value;
        break;
      case ATTRIBUTE_TYPES.asset:
        if (!isNaN(value))
          updated = { assetId: attributeData.values[value].assetId };
        else updated = { assetId: value };
        break;
      case ATTRIBUTE_TYPES.string:
        if (!isNaN(value)) updated = attributeData.values[value].value;
        else updated = value;
        break;
      case ATTRIBUTE_TYPES.color:
        if (!isNaN(value)) updated = attributeData.values[value];
        else updated = value;
        break;
      default:
        updated = value;
    }
    dispatch(setConfiguration({ [attribute]: updated }));
  };

  return [attributeData, handleChange];
};

export const useLanguages = () => {
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const languages = useSelector(getLanguageOptions);

  const handleChange = (language) => {
    if (language?.length && languages.includes(language)) {
      dispatch(setLanguage(language));
    }
  };

  return [language, languages, handleChange];
};

export const useThreekitInitStatus = () => useSelector(isThreekitLoaded);

export const usePlayerLoadingStatus = () => useSelector(isPlayerLoading);

export const useZoom = () => {
  const zoomIn = (step) =>
    window.threekit.player.camera.zoom(Math.abs(step) || 1);
  const zoomOut = (step) =>
    window.threekit.player.camera.zoom(step ? -1 * Math.abs(step) : -1);

  return [zoomIn, zoomOut];
};

export const useHistory = () => {
  const dispatch = useDispatch();
  return (step) => dispatch(stepHistory(step));
};
