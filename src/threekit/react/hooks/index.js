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
  getAttributesArray,
  addItemToArray,
  deleteItemFromArray,
  moveItemWithinArray,
  getActiveAttribute,
  setActiveAttribute,
  getMetadata,
} from '../store/threekit';
import { ATTRIBUTE_TYPES } from '../../constants';

export const useAttributes = () => {
  const dispatch = useDispatch();
  const attributesData = useSelector(getAttributes());

  if (!attributesData) return [undefined, undefined];

  const handleChange = (configuration) =>
    dispatch(setConfiguration(configuration));

  return [attributesData, handleChange];
};

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
        updated = value;
        break;
      default:
        updated = value;
    }
    dispatch(setConfiguration({ [attribute]: updated }));
  };

  return [attributeData, handleChange];
};

export const useAttributesArray = (arrayLabel) => {
  const attributes = useSelector(getAttributesArray(arrayLabel));
  const dispatch = useDispatch();

  if (!arrayLabel || !attributes || !Object.keys(attributes).length)
    return [undefined, undefined, undefined, undefined, undefined];

  const options = (Object.values(attributes)[0].values || []).reduce(
    (output, el) => Object.assign(output, { [el.assetId]: el }),
    {}
  );
  const state = attributes;

  const addItemDispatcher = addItemToArray(arrayLabel);
  const deleteItemDispatcher = deleteItemFromArray(arrayLabel);
  const moveItemDispatcher = moveItemWithinArray(arrayLabel);

  const addItem = (assetId, addToIdx) =>
    dispatch(addItemDispatcher(assetId, addToIdx));

  const deleteItem = (idx) => dispatch(deleteItemDispatcher(idx));

  const moveItem = (fromIdx, toIdx, config) =>
    dispatch(moveItemDispatcher(fromIdx, toIdx, config));

  return [options, state, addItem, deleteItem, moveItem];
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

export const useActiveAttribute = () => {
  const dispatch = useDispatch();
  const attributesData = useSelector(getAttributes());
  const activeAttribute = useSelector(getActiveAttribute);

  const handleSetActiveAttribute = (val) =>
    dispatch(setActiveAttribute(val) || undefined);

  return [
    activeAttribute,
    attributesData?.[activeAttribute] || undefined,
    handleSetActiveAttribute,
  ];
};

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

export const useMetadata = () => {
  const metadata = useSelector(getMetadata);
  return metadata;
};

export const useCamera = () => {
  const dispatch = useDispatch();
  const cameraData = useSelector(getAttributes('_camera'));
};
