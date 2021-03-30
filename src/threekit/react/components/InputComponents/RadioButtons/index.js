import React from 'react';
import {
  Wrapper,
  RadioButtonsHeader,
  Buttons,
  ButtonWrapper,
} from './radioButtons.styles';

export const RadioButtons = ({
  title,
  options,
  selected,
  hideDisabled,
  handleClick,
}) => {
  if (!options || !options.filter((el) => !el.disabled).length) return null;

  return (
    <Wrapper>
      {title && <RadioButtonsHeader>{title}</RadioButtonsHeader>}
      <Buttons>
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <ButtonWrapper
              key={i}
              disabled={option.disabled && !hideDisabled}
              selected={option.assetId === (selected?.assetId || selected)}
              onClick={() => handleClick(option.assetId)}
            >
              <div>{option.name}</div>
            </ButtonWrapper>
          );
        })}
      </Buttons>
    </Wrapper>
  );
};

export default RadioButtons;
