import React from 'react';
import { SNAPSHOT_OUTPUTS } from '../../../../constants';

const snapshotContainer = (WrappedComponent) => (props) => {
  const handleClick = () => {
    const config = Object.assign(
      {},
      props.config,
      { output: props.output || SNAPSHOT_OUTPUTS.download },
      props.filename ? { filename: props.filename } : {}
    );
    window.threekit.controller.takeSnapshots(props.cameras, config);
  };

  return <WrappedComponent {...props} handleClick={handleClick} />;
};

export default snapshotContainer;
