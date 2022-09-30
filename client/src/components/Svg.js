import React from 'react';

import sprites from '../img/icons.svg';

const Svg = (props) => {
  const { spriteName, className } = props;

  return (
    <>
      <svg className={className}>
        <use xlinkHref={`${sprites}#${spriteName}`}></use>
      </svg>
    </>
  );
};

export default Svg;
