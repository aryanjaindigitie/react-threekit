import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const DownloadOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon fill"
        d="M11 2H9V10.5355L6.46451 8L5.05029 9.41422L10 14.364L14.9498 9.41421L13.5356 8L11 10.5356V2Z"
      />
      <path className="tk-icon fill" d="M2 14H4V16L16 16V14H18V18H2V14Z" />
    </SVG>
  );
};

export default DownloadOutlined;
