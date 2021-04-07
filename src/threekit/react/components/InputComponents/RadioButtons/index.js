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
    <Wrapper className="tk-radio-buttons">
      {title && (
        <RadioButtonsHeader className="tk-radio-btn-header">
          {title}
        </RadioButtonsHeader>
      )}
      <Buttons className="tk-radio-btn-content">
        {options.map((option, i) => {
          if (option.disabled && hideDisabled) return null;
          return (
            <ButtonWrapper
              className="tk-radio-btn"
              key={i}
              disabled={option.disabled && !hideDisabled}
              selected={option.assetId === (selected?.assetId || selected)}
              onClick={() => handleClick(option.assetId)}
            >
              <div className="tk-radio-btn-label">{option.name}</div>
            </ButtonWrapper>
          );
        })}
      </Buttons>
    </Wrapper>
  );
};

export default RadioButtons;
