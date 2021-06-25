import React from 'react';
import { Wrapper, TitleWrapper, FormWrapper } from './minimalist.styles';

import {
  Player,
  TwoCol,
  ThreekitProvider,
  Title,
  Description,
  BasicForm,
  SteppedForm,
} from '../../components';
import { selectAttribute, animateItem } from '../../../tools';

const FORMS = {
  basic: 'basic',
  stepped: 'stepped',
};

const formsComponents = {
  [FORMS.basic]: BasicForm,
  [FORMS.stepped]: SteppedForm,
};

export const MinimalistComponent = (props) => {
  const { form, attributeComponents } = Object.assign(
    { form: FORMS.basic, attributeComponents: {} },
    props
  );

  const FormComponent = formsComponents[form];

  return (
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
          <FormComponent attributeComponents={attributeComponents} />
        </FormWrapper>
      </TwoCol>
    </Wrapper>
  );
};

export const Minimalist = (props) => {
  const additionalTools = [];
  if (props.interactive) additionalTools.push(selectAttribute());
  else if (props.animated) additionalTools.push(animateItem());
  const config = Object.assign({}, props.config, {
    additionalTools,
  });
  return (
    <ThreekitProvider config={config}>
      <MinimalistComponent {...props} />
    </ThreekitProvider>
  );
};

export default Minimalist;
