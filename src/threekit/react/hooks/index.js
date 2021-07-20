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
  getMetadata,
  getNestedAttributesAddress,
  setNestedAttributeAddress,
  getNestedAttributes,
  setNestedConfiguration,
} from '../store/threekit';
import { selectionToConfiguration } from '../../utils';
import { ATTRIBUTES_RESERVED } from '../../constants';

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
    const preppedValue = selectionToConfiguration(value, attributeData.type);
    if (!preppedValue) return;
    dispatch(setConfiguration({ [attribute]: preppedValue }));
  };

  return [attributeData, handleChange];
};

export const useNestedConfigurator = () => {
  const dispatch = useDispatch();
  const attributes = useSelector(getNestedAttributes);
  const address = useSelector(getNestedAttributesAddress);

  const handleSelectAttribute = (address) =>
    dispatch(setNestedAttributeAddress(address));

  const handleSetConfiguration = (attribute, value) => {
    const preppedValue = selectionToConfiguration(value, attributeData.type);
    if (!preppedValue) return;
    dispatch(setNestedConfiguration({ [attribute]: preppedValue }));
  };

  return [attributes, address, handleSelectAttribute, handleSetConfiguration];
};

export const useNestedAttribute = (attributeName) => {
  const dispatch = useDispatch();
  const attributes = useSelector(getNestedAttributes);

  if (!attributes?.length) return [undefined, undefined];

  const attribute = attributes.find((el) => el.name === attributeName);
  if (!attribute) return [undefined, undefined];

  const handleChange = (value) => {
    const preppedValue = selectionToConfiguration(value, attribute.type);
    if (!preppedValue) return;
    dispatch(setNestedConfiguration({ [attributeName]: preppedValue }));
  };

  return [attribute, handleChange];
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

export const useCamera = (cameraAttribute = ATTRIBUTES_RESERVED.camera) =>
  useAttribute(cameraAttribute);

export const useCameraToggle = (
  cameraAttribute = ATTRIBUTES_RESERVED.camera
) => {
  const [camera, setCamera] = useAttribute(cameraAttribute);

  const handleToggle = (step = 1) => {
    const selectedIdx = camera.values.findIndex(
      (el) => el.assetId === camera.value.assetId
    );
    let nextIdx;
    if (selectedIdx === -1) nextIdx = 0;
    else if (selectedIdx === camera.values.length - 1 && !!step) nextIdx = 0;
    else if (selectedIdx === 0 && !step) nextIdx = camera.values.length - 1;
    else nextIdx = selectedIdx + step;

    setCamera(camera.values[nextIdx].assetId);
  };

  return [camera, handleToggle];
};
