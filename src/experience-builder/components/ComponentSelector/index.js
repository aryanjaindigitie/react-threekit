import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, Button, Input } from 'antd';
import {
  Wrapper,
  Title,
  AttributeRow,
  SelectedExperienceWrapper,
  OrdinalCustomizerWrapper,
} from './componentSelector.styles';
import componentOptions from '../../../threekit/react/components/InputComponents/componentOptions';
import { message } from 'antd';
import { CONFIGURATION_EXPERIENCES, DISPLAY_OPTIONS } from '../../constants';

export const ComponentSelector = (props) => {
  const { authToken, threekitEnv, assetId, orgId, experience } = props;
  // const []
  const [attributes, setAttributes] = useState([]);
  const [arrayAttributeLabel, setArrayAttributeLabel] = useState('');
  const [display, setDisplay] = useState(DISPLAY_OPTIONS.modal);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `https://${threekitEnv}/api/products/export/json?orgId=${orgId}&bearer_token=${authToken}`
      );
      if (!response?.data) return;

      const data = response.data
        .find((el) => el.query.id === assetId)
        .product.attributes.map((el) => ({
          name: el.name,
          type: el.type,
          component: 0,
        }));
      setAttributes(data);
    })();
  }, []);

  const componentsMap = Object.entries(componentOptions).reduce(
    (output, [attrType, componentsObj]) =>
      Object.assign(output, { [attrType]: Object.keys(componentsObj) }),

    {}
  );

  const handleChange = (attrIdx, componentIdx) => {
    const updatedAttributes = [...attributes];
    updatedAttributes[attrIdx].component = componentIdx;
    setAttributes(updatedAttributes);
  };

  const generateUrl = () => {
    if (!experience?.length)
      return message.warning('Please select an experience');

    let data = {
      assetId,
      authToken,
      orgId,
      env: threekitEnv,
      experience,
    };

    const attributesPrepped = attributes.reduce((output, el, i) => {
      if (!el.component) return output;
      output += `${i ? ',' : ''}${el.name}::${el.component}`;
      return output;
    }, '');

    if ([CONFIGURATION_EXPERIENCES['ordinal-interactive']])
      data = Object.assign(data, {
        arrayAttribute: arrayAttributeLabel,
        display,
      });
    else
      data = Object.assign(data, {
        attributes: btoa(attributesPrepped),
      });

    const baseUrl = `${window.location.origin}/demo`;
    const dataParams = Object.entries(data).reduce((output, [key, val], i) => {
      output += `${i ? '&' : ''}${key}=${val}`;
      return output;
    }, '?');

    window.location.href = baseUrl + dataParams;
  };

  if (!experience) return <div>Please choose an experience first.</div>;

  return (
    <Wrapper>
      <SelectedExperienceWrapper>
        Selected Experience: <span>{experience}</span>
      </SelectedExperienceWrapper>
      <hr />
      <Title>Attributes</Title>
      {experience === CONFIGURATION_EXPERIENCES['ordinal-interactive'] ? (
        <OrdinalCustomizerWrapper>
          <div>
            Array Attribute Label:
            <Input
              value={arrayAttributeLabel}
              onChange={(e) => setArrayAttributeLabel(e.target.value)}
            />
          </div>
          <div>
            Display:
            <Select value={display} onChange={setDisplay}>
              {Object.keys(DISPLAY_OPTIONS).map((el, i) => (
                <Select.Option key={i} value={el}>
                  {el}
                </Select.Option>
              ))}
            </Select>
          </div>
        </OrdinalCustomizerWrapper>
      ) : (
        attributes.map((el, i) => (
          <AttributeRow key={i}>
            <div>{el.name}</div>
            <div>
              <Select
                style={{ width: 220 }}
                value={el.component}
                onChange={(value) => handleChange(i, value)}
              >
                {(componentsMap[el.type] || []).map((el, j) => (
                  <Select.Option key={j} value={j}>
                    {el.replace(/-/g, ' ')}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </AttributeRow>
        ))
      )}
      <Button type="primary" onClick={generateUrl}>
        Launch
      </Button>
    </Wrapper>
  );
};

export default ComponentSelector;
