import React from 'react';
import { useAttributes } from '../../../hooks';

const steppedFormContainer = (WrappedComponent) => (props) => {
  const [attributes, setConfiguration] = useAttributes();

  const handleClickPrevious = () => setConfiguration({ _previous: 'previous' });

  const handleClickNext = () => setConfiguration({ _next: 'next' });

  return (
    <WrappedComponent
      {...props}
      title={props.title || attributes?._step?.value}
      hasPrevious={!!attributes?._previous}
      handleClickPrevious={handleClickPrevious}
      hasNext={!!attributes?._next}
      handleClickNext={handleClickNext}
      attributes={Object.values(attributes || {}).filter(
        (el) => el && el.name[0] !== '_'
      )}
    />
  );
};

export default steppedFormContainer;
