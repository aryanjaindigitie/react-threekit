import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './snapshot.styles';
import { FileImageOutlined } from '@ant-design/icons';
import container from './snapshotContainer';
import defaultClassName from '../classNames';

export const Snapshot = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-undo`;
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
   * The required output for download
   */
  Output: PropTypes.string,
  /**
   * Function to execute when user clicks 'Snapshot'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Snapshot.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default container(Snapshot);
