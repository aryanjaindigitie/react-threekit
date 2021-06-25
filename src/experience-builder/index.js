import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Input, Tabs, Card } from 'antd';
import {
  Wrapper,
  DetailsWrapper,
  ExperiencesWrapper,
  ClickableSpan,
} from './experience-builder.styles';
import { ComponentSelector, Demo } from './components';
import { CONFIGURATION_EXPERIENCES } from './constants';

const { TabPane } = Tabs;

const creds = {
  authToken: 'c3d1959a-cb8d-4f4e-8e05-8c21fbd3f13e',
  orgId: '245332ee-b0bb-4421-9e31-8ad56ede6cd9',
  // assetId: '6193b86d-5e78-4936-9b3f-4e4f7165c5f7',  //  1MBU
  assetId: '953b1915-c274-4958-a9a7-a6520c7748ec', //  1MBU Stepped
  assetId: 'd502c356-df2f-4e6b-8377-3e49a3f59f4d', //  1MBU Interactive
};

const experiences = {
  [CONFIGURATION_EXPERIENCES['single-product']]: {
    title: 'Single Item',
    description: 'A simple look for a simple configurator.',
  },
  [CONFIGURATION_EXPERIENCES['single-product-stepped']]: {
    title: 'Single Item Stepped',
    description: 'A step by step configurator.',
  },
  [CONFIGURATION_EXPERIENCES['single-product-interactive']]: {
    title: 'Single Item + Interactive',
    description: 'A seamless and organic 3D and UI experience.',
  },
  [CONFIGURATION_EXPERIENCES['single-product-animated']]: {
    title: 'Single Item + Animated',
    description: 'Minimalist animations for a minimalist configurator.',
  },
  [CONFIGURATION_EXPERIENCES['ordinal-interactive']]: {
    title: 'Ordinal + Interactive',
    description: 'A drag-n-drop configurator for an Ordinal Configurator',
  },
};

export const ExperienceBuilder = (props) => {
  const [tab, setTab] = useState('details');
  const [assetId, setAssetId] = useState(creds.assetId);
  const [orgId, setOrgId] = useState(creds.orgId);
  const [authToken, setAuthToken] = useState(creds.authToken);
  const [threekitEnv, setThreekitEnv] = useState('preview.threekit.com');
  const [experience, setExperience] = useState(null);

  const handleSelectExperience = (val) => {
    setExperience(val);
    setTab('customize');
  };

  if (window.location.pathname === '/demo') {
    return <Demo />;
  }

  return (
    <Wrapper>
      <Tabs onChange={(key) => setTab(key)} activeKey={tab}>
        <TabPane key="details" tab="Details">
          <DetailsWrapper>
            Auth Token:
            <Input
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
            AssetId:
            <Input
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
            />
            OrgId:
            <Input value={orgId} onChange={(e) => setOrgId(e.target.value)} />
            Threekit Environment:
            <Input
              value={threekitEnv}
              onChange={(e) => setThreekitEnv(e.target.value)}
            />
          </DetailsWrapper>
        </TabPane>
        <TabPane key="experience" tab="Configuration Experiences">
          <div style={{ marginBottom: '20px' }}>
            Choose an experience for your Threekit configurator.
          </div>

          <ExperiencesWrapper>
            {Object.entries(experiences).map(([key, el]) => (
              <Card
                key={key}
                title={el.title}
                hoverable
                extra={
                  <ClickableSpan onClick={() => handleSelectExperience(key)}>
                    Select
                  </ClickableSpan>
                }
              >
                {el.description}
              </Card>
            ))}
          </ExperiencesWrapper>
        </TabPane>
        <TabPane key="customize" tab="Customization">
          <ComponentSelector
            authToken={authToken.trim()}
            assetId={assetId.trim()}
            orgId={orgId.trim()}
            threekitEnv={threekitEnv.trim()}
            experience={experience}
          />
        </TabPane>
      </Tabs>
    </Wrapper>
  );
};

export default ExperienceBuilder;
