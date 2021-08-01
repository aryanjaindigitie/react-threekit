import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    stroke: black;
    stroke-width: 1;
  }

  .thin-stroke {
    stroke-width: 1;
  }
`;

export const ImageOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect className="tk-icon stroke" x="3" y="3" width="14" height="14" />
      <path
        className="tk-icon stroke thin-stroke"
        d="M3 14.5L8.5 9L12.5 13L14.5 11L17 13.5"
      />
      <circle className="tk-icon stroke thin-stroke" cx="13" cy="7" r="1.5" />
    </SVG>
  );
};

export default ImageOutlined;
