import React from 'react';
import styled from 'styled-components';

const SVG = styled.svg`
  .tk-icon {
    fill: black;
  }
`;

export const ZoomInOutlined = () => {
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
        d="M19 8C19 11.866 15.866 15 12 15C10.4244 15 8.97043 14.4794 7.8006 13.6009L7.1307 14.2708C7.21979 14.6045 7.13347 14.9752 6.87174 15.2369L3.33621 18.7724C2.94569 19.163 2.31252 19.163 1.922 18.7724L1.21489 18.0653C0.824366 17.6748 0.824366 17.0416 1.21489 16.6511L4.75042 13.1156C5.01215 12.8539 5.38287 12.7675 5.71649 12.8566L6.38821 12.1849C5.51629 11.0176 5.00003 9.56908 5.00003 8C5.00003 4.13401 8.13404 1 12 1C15.866 1 19 4.13401 19 8ZM17 8C17 10.7614 14.7615 13 12 13C9.23861 13 7.00003 10.7614 7.00003 8C7.00003 5.23858 9.23861 3 12 3C14.7615 3 17 5.23858 17 8Z"
      />
      <path className="tk-icon fill" d="M13 7V4H11V7H8V9H11V12H13V9H16V7H13Z" />
    </SVG>
  );
};

export default ZoomInOutlined;
