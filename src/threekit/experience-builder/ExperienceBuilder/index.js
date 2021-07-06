import React, { useState } from 'react';
import { Steps, Button } from 'antd';
import Credentials from './Credentials';
import ConfiguratorSelector from './ConfiguratorSelector';
import ExperienceSelector from './ExperienceSelector';
import ComponentSelector from './ComponentSelector';

const { Step } = Steps;

const steps = [
  {
    title: 'Credentials',
    content: 'Enter Environment, Auth Token and OrgId',
    Component: Credentials,
  },
  {
    title: 'Select a Configurator',
    content: 'Select the catalog item to use as the configurator',
    Component: ConfiguratorSelector,
  },
  {
    title: 'Exeperience Selector',
    content: 'Select a form type and experience',
    Component: ExperienceSelector,
  },
  {
    title: 'Customize your componentry',
    content: 'Choose the components for your attributes',
    Component: ComponentSelector,
  },
];

export const ExperienceBuilder = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [creds, setCreds] = useState({});
  const [item, setItem] = useState(null);
  const [experience, setExperience] = useState(null);

  const handleNext = () => setActiveStep(activeStep + 1);

  const handlePrevious = () => {
    setActiveStep(activeStep - 1);
  };

  const handleContinue = (data) => {
    if (activeStep === 0) setCreds(data);
    else if (activeStep === 1) setItem(data);
    else if (activeStep === 2) setExperience(data);
    handleNext();
  };

  const { Component } = steps[activeStep];

  return (
    <div>
      <Steps current={activeStep}>
        {steps.map((el, i) => (
          <Step key={i} title={el.title} />
        ))}
      </Steps>
      <div>
        <Component
          creds={creds}
          item={item}
          experience={experience}
          onContinue={handleContinue}
        />
      </div>
    </div>
  );
};

export default ExperienceBuilder;
