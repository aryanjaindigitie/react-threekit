import React from 'react';
import PropTypes from 'prop-types';
import { Wrapper } from './undo.styles';
import { UndoOutlined } from '@ant-design/icons';
import container from './undoContainer';
import defaultClassName from '../classNames';

export const Undo = (props) => {
  const { handleClick, className: classNameRaw } = props;

  let className = `${defaultClassName}-undo`;
  if (classNameRaw?.length) className += ` ${classNameRaw}`;

  return (
    <Wrapper className={className} onClick={handleClick}>
      <div>
        <UndoOutlined />
      </div>
    </Wrapper>
  );
};

Undo.propTypes = {
  /**
   * Function to execute when user clicks 'Undo'.
   */
  handleClick: PropTypes.func,
  /**
   * Custom classNames applied to the HTML Element to apply custom CSS styling.
   */ className: PropTypes.string,
};

Undo.defaultProps = {
  handleClick: undefined,
  classname: '',
};

export default container(Undo);
