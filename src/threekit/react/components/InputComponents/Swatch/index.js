import React from 'react';
import {
  Wrapper,
  ItemWrapper,
  SwatchWrapper,
  SwatchHeader,
  SwatchBody,
} from './swatch.styles';

const Item = (props) => {
  const { selected, onClick: handleClick } = props;
  return (
    <ItemWrapper
      onClick={handleClick}
      color={props.type !== 'Asset' ? props.color : undefined}
      selected={selected}
    >
      <div>
        <div>{props.imgUrl && <img src={props.imgUrl} alt={props.name} />}</div>
        {props.name && <div>{props.name}</div>}
      </div>
    </ItemWrapper>
  );
};

export const Swatch = ({
  title,
  options,
  handleClick,
  selected,
  imgFromMetadata,
  colorFromMetadata,
  imgBaseUrl,
  hideDisabled,
}) => {
  if (!options || !options.filter((el) => !el.disabled).length) return null;
  return (
    <SwatchWrapper>
      {title && <SwatchHeader>{title}</SwatchHeader>}
      <SwatchBody>
        <Wrapper>
          {options.map((option, i) => {
            if (option.disabled && hideDisabled) return null;

            const propsFromMetadata = Object.assign(
              {},
              imgFromMetadata
                ? {
                    imgUrl:
                      (imgBaseUrl || '') + option.metadata[imgFromMetadata],
                  }
                : {},
              colorFromMetadata
                ? { color: option.metadata[colorFromMetadata] }
                : {}
            );
            return (
              <Item
                key={i}
                {...option}
                {...propsFromMetadata}
                selected={option.assetId === (selected?.assetId || selected)}
                onClick={() => handleClick(option.assetId)}
              />
            );
          })}
        </Wrapper>
      </SwatchBody>
    </SwatchWrapper>
  );
};

export default Swatch;
