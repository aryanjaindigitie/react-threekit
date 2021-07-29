import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './snapshot.styles';
import { FileImageOutlined } from '@ant-design/icons';
import container from './snapshotContainer';
import defaultClassName from '../classNames';
import { SNAPSHOT_OUTPUTS, SNAPSHOT_FORMATS } from '../../../../constants';

export const Snapshot = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-snapshot`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} onClick={handleClick}>
      <div>
        <FileImageOutlined />
      </div>
    </Wrapper>
  );
};

Snapshot.propTypes = {
  /**
   * The name you would like to give the file (Do not include the format).
   */
  filename: PropTypes.string,
  /**
   * Function to execute when user clicks 'Snapshot'.
   */
  format: PropTypes.string,
  /**
   * Format you would like the image to be saved in
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Snapshot.defaultProps = {
  handleClick: undefined,
  classname: '',
  filename: 'snapshot',
  output: SNAPSHOT_OUTPUTS.download,
  format: SNAPSHOT_FORMATS.png,
};

export default container(Snapshot);
