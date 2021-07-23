import React from 'react';
import { SNAPSHOT_OUTPUTS } from '../../../../constants';

const snapshotContainer = (WrappedComponent) => (props) => {
  const handleClick = async () => {
    const config = Object.assign(
      {},
      props.config,
      { output: props.output || SNAPSHOT_OUTPUTS.download },
      props.filename ? { filename: props.filename } : {},
      props.format ? { format: props.format } : {}
    );
    const savedSnapshots = await window.threekit.controller.takeSnapshots(
      props.cameras,
      config
    );
    console.log(savedSnapshots);
  };

  return <WrappedComponent {...props} handleClick={handleClick} />;
};

export default snapshotContainer;
