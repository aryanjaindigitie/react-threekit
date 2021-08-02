import React, { useState, useEffect, useRef } from 'react';
import {
  PopOutFormWrapper,
  ToggleWrapper,
  FormWrapper,
} from './popOutForm.styles';
import { MaterialsIcon } from '../../../icons';

export const positions = {
  'top-right': 'top-right',
  'top-left': 'top-left',
  'left-top': 'left-top',
  'left-bottom': 'left-bottom',
  'right-top': 'right-top',
  'right-bottom': 'right-bottom',
  'bottom-right': 'bottom-right',
  'bottom-left': 'bottom-left',
};

export const PopOutForm = (props) => {
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const toggleRef = useRef(null);
  const { label, position, children } = Object.assign(
    { label: 'Form', position: positions['top-right'] },
    props
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !formRef.current?.contains(e.target) &&
        !toggleRef.current?.contains(e.target)
      )
        setShowForm(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showForm, formRef, toggleRef]);

  const handleTogglePopOut = () => {
    setShowForm(!showForm);
  };

  return (
    <PopOutFormWrapper>
      <ToggleWrapper ref={toggleRef} onClick={handleTogglePopOut}>
        <div>
          <MaterialsIcon />
        </div>
        <div>{label}</div>
      </ToggleWrapper>
      {showForm ? (
        <FormWrapper ref={formRef} position={position}>
          {children}
        </FormWrapper>
      ) : null}
    </PopOutFormWrapper>
  );
};

export default PopOutForm;
