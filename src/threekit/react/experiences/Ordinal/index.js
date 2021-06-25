import React from 'react';
import { Wrapper, TitleWrapper, FormWrapper } from './ordinal.styles';
import {
  Player,
  TwoCol,
  ThreekitProvider,
  Title,
  Description,
  Buttons,
  BasicForm,
} from '../../components';
import { ordinalAttributesToolkit } from '../../../tools';

export const OrdinalComponent = (props) => {
  const { display, attributesArrayLabel } = Object.assign(
    { display: 'modal' },
    props
  );

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
            <Buttons attributesArrayLabel={attributesArrayLabel} />
          </FormWrapper>
        </TwoCol>
      </Wrapper>
      <BasicForm activeAttribute={true} display={display} />
    </>
  );
};

export const Ordinal = (props) => {
  const { attributesArrayLabel } = props;
  if (!attributesArrayLabel) return null;
  const additionalTools = [
    ordinalAttributesToolkit(attributesArrayLabel, { active: true }),
  ];
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
