import useAttribute from './useAttribute';
import { ATTRIBUTES_RESERVED } from '../../constants';

const useCameraToggle = (cameraAttribute = ATTRIBUTES_RESERVED.camera) => {
  const [camera, setCamera] = useAttribute(cameraAttribute);

  const handleToggle = (step = 1) => {
    const value = camera.value?.assetId || camera.value;
    const selectedIdx = camera.values.findIndex(
      (el) => el.assetId === value || el.value === value
    );
    let nextIdx;
    if (selectedIdx === -1) nextIdx = 0;
    else if (selectedIdx === camera.values.length - 1 && !!step) nextIdx = 0;
    else if (selectedIdx === 0 && !step) nextIdx = camera.values.length - 1;
    else nextIdx = selectedIdx + step;

    setCamera(camera.values[nextIdx]?.assetId || camera.values[nextIdx].value);
  };

  return [camera, handleToggle];
};

export default useCameraToggle;
