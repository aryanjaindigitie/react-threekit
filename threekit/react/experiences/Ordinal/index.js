import React from 'react';
import { Wrapper, TitleWrapper, FormWrapper } from './ordinal.styles';
import {
  Player,
  TwoCol,
  ThreekitProvider,
  Title,
  Description,
  Buttons,
  Form,
} from '../../components';
import { ordinalAttributesToolkit } from '../../../tools';
import { ATTRIBUTE_TYPES } from '../../../constants';
import { componentOptions } from '../../components/InputComponents';

export const OrdinalComponent = (props) => {
  const {
    display,
    attributesArrayLabel,
    attributesArrayComponent,
  } = Object.assign(
    { display: 'modal', attributesArrayComponent: 'cards' },
    props
  );

  const Component =
    componentOptions[ATTRIBUTE_TYPES.asset][attributesArrayComponent] ||
    Buttons;

  return (
    <>
      <Wrapper>
        <TwoCol>
          <div>
            <Player />
          </div>
          <FormWrapper>
            <TitleWrapper>
              <Title />
              <Description />
            </TitleWrapper>
            <Component attributesArrayLabel={attributesArrayLabel} />
          </FormWrapper>
        </TwoCol>
      </Wrapper>
      <Form nestedConfigurator display={display} />
    </>
  );
};

export const Ordinal = (props) => {
  const { attributesArrayLabel } = props;
  if (!attributesArrayLabel) return null;
  const additionalTools = [ordinalAttributesToolkit(attributesArrayLabel)];
  const config = Object.assign({}, props.config, {
    additionalTools,
  });
  return (
    <ThreekitProvider config={config}>
      <OrdinalComponent {...props} />
    </ThreekitProvider>
  );
};

export default Ordinal;
