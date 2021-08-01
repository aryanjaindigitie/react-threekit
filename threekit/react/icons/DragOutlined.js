import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const DragOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="tk-icon"
        cx="12.75"
        cy="10"
        r="1.5"
        transform="rotate(90 12.75 10)"
      />
      <circle
        className="tk-icon"
        cx="7.25"
        cy="10"
        r="1.5"
        transform="rotate(90 7.25 10)"
      />
      <circle
        className="tk-icon"
        cx="12.75"
        cy="4.5"
        r="1.5"
        transform="rotate(90 12.75 4.5)"
      />
      <circle
        className="tk-icon"
        cx="7.25"
        cy="4.5"
        r="1.5"
        transform="rotate(90 7.25 4.5)"
      />
      <circle
        className="tk-icon"
        cx="12.75"
        cy="15.5"
        r="1.5"
        transform="rotate(90 12.75 15.5)"
      />
      <circle
        className="tk-icon"
        cx="7.25"
        cy="15.5"
        r="1.5"
        transform="rotate(90 7.25 15.5)"
      />
    </SVG>
  );
};

export default DragOutlined;
