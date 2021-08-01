import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    stroke: black;
    stroke-width: 2;
  }
`;

export const CameraOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon stroke"
        d="M14.1056 5.44721L14.382 6H15H18V17H2V6H5H5.61803L5.89443 5.44721L6.61803 4H13.382L14.1056 5.44721Z"
      />
      <circle className="tk-icon stroke" cx="10" cy="11" r="3" />
    </SVG>
  );
};

export default CameraOutlined;
