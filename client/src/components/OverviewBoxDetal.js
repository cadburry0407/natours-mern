import React from 'react';

import Svg from './Svg';

const OverviewBoxDetal = (props) => {
  const {
    svg: { className, spriteName },
    img: { src },
    label,
    value,
  } = props.data;

  if (src) {
    return (
      <>
        <div className="overview-box__detail">
          <img
            className="overview-box__img"
            src={`/img/users/${src}`}
            alt={label}
          />
          <span className="overview-box__label">{label}</span>
          <span className="overview-box__text">{value}</span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="overview-box__detail">
        <Svg className={className} spriteName={spriteName} />
        <span className="overview-box__label">{label}</span>
        <span className="overview-box__text">{value}</span>
      </div>
    </>
  );
};

export default OverviewBoxDetal;
