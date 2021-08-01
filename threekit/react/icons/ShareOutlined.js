import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const ShareOutlined = () => {
  return (
    <SVG
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="tk-icon fill"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 15V11C9.28741 11 8.62145 11.0829 8.00001 11.2318C5.32939 11.8719 3.48106 13.7313 2.28756 15.4704C1.03067 17.3019 0.500026 19 0.500026 19C0.500026 19 0.199547 17.1972 0.306941 14.8415C0.509324 10.4023 2.16017 4 10 4L10 0L20 7.5L10 15ZM16.6667 7.5L12 4L12 6H10C7.45535 6 5.88066 6.7777 4.84396 7.78095C3.76694 8.82323 3.09037 10.2861 2.70358 11.9293C4.43223 10.3299 6.82928 9 10 9H12V11L16.6667 7.5Z"
      />
    </SVG>
  );
};

export default ShareOutlined;
