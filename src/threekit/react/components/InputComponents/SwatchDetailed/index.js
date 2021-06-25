import React from 'react';
import {
  Wrapper,
  Header,
  Content,
  ItemWrapper,
  ItemContent,
  Main,
  Price,
  AddButton,
} from './swatchDetailed.styles';
import { regularToKebabCase } from '../../../../utils';
import { ATTRIBUTE_TYPES } from '../../../../constants';

export const SwatchDetailed = ({ title, options, handleClick }) => {
  return (
    <Wrapper>
      {title ? <Header>{title}</Header> : null}
      <Content>
        {options.map(
          ({ name, description, value, Icon, imageUrl, price }, i) => (
            <ItemWrapper key={i}>
              <ItemContent>
                <div>
                  {Icon ? (
                    Icon
                  ) : imageUrl ? (
                    <img alt={name} src={imageUrl} />
                  ) : null}
                </div>

                <Main>
                  <div>{name}</div>
                  <div>{description}</div>
                </Main>

                <Price>${price}</Price>
              </ItemContent>

              <AddButton onClick={() => handleClick(value)}>
                <span>Add</span>+
              </AddButton>
            </ItemWrapper>
          )
        )}
      </Content>
    </Wrapper>
  );
};

SwatchDetailed.compatibleAttributes = new Set([
  ATTRIBUTE_TYPES.asset,
  ATTRIBUTE_TYPES.arraySelector,
]);

export default SwatchDetailed;
