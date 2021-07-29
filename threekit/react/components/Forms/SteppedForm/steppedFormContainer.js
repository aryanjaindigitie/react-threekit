import React from 'react';
import { useAttributes } from '../../../hooks';
import { ATTRIBUTES_RESERVED } from '../../../../constants';

const steppedFormContainer = (WrappedComponent) => (props) => {
  const [attributes, setConfiguration] = useAttributes();

  const handleClickPrevious = () =>
    setConfiguration({ [ATTRIBUTES_RESERVED.stepTo]: 'previous' });

  const handleClickNext = () =>
    setConfiguration({ [ATTRIBUTES_RESERVED.stepTo]: 'next' });

  let hasPrevious;
  let hasNext;
  attributes?.[ATTRIBUTES_RESERVED.stepTo]?.values.forEach((el) => {
    if (el.value === 'next') hasNext = true;
    else if (el.value === 'previous') hasPrevious = true;
  });

  return (
    <WrappedComponent
      {...props}
      title={props.title}
      hasPrevious={hasPrevious}
      hasNext={hasNext}
      handleClickNext={handleClickNext}
      handleClickPrevious={handleClickPrevious}
      attributes={Object.values(attributes || {}).filter(
        (el) => el && el.name[0] !== '_'
      )}
    />
  );
};

export default steppedFormContainer;
