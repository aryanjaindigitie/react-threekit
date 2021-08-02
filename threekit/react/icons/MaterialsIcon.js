import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg``;

export const MaterialsIcon = () => {
  return (
    <SVG
      width="27"
      height="27"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="2" y="2" width="24" height="24" fill="#A57D59" />
      <path
        d="M26.5 3V1.79289L25.6464 2.64645L2.64645 25.6464L1.79289 26.5H3H26H26.5V26V3Z"
        fill="url(#paint0_linear)"
        stroke="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="8.55172"
          y1="6.96552"
          x2="15.2931"
          y2="27.5862"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.150375" stopColor="#DCDCDC" />
          <stop offset="0.435118" stopColor="#EFEFEF" />
          <stop offset="0.63692" stopColor="#DEDEDE" />
          <stop offset="0.840778" stopColor="#C9C9C9" />
          <stop offset="1" stopColor="#EFEFEF" />
        </linearGradient>
      </defs>
    </SVG>
  );
};

export default MaterialsIcon;
