import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const DeleteOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon fill"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5V17C4 18.1046 4.89543 19 6 19H14C15.1046 19 16 18.1046 16 17V5H14V17H6L6 5H4Z"
      />
      <path
        className="tk-icon fill"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 1C8.44772 1 8 1.44772 8 2H3C2.44772 2 2 2.44772 2 3C2 3.55228 2.44772 4 3 4H17C17.5523 4 18 3.55228 18 3C18 2.44772 17.5523 2 17 2H12C12 1.44772 11.5523 1 11 1H9Z"
      />
      <rect
        className="tk-icon fill"
        x="8"
        y="6"
        width="1"
        height="9"
        rx="0.5"
      />
      <rect
        className="tk-icon fill"
        x="11"
        y="6"
        width="1"
        height="9"
        rx="0.5"
      />
    </SVG>
  );
};

export default DeleteOutlined;
