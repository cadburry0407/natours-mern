import React from 'react';

import { v4 as uuidv4 } from 'uuid';

const Pictures = (props) => {
  return (
    <>
      <section className="section-pictures">
        {props.images.map((image, i) => {
          return (
            <div key={uuidv4()} className="picture-box">
              <img
                className={`picture-box__img picture-box__img--${i + 1}`}
                src={`${process.env.REACT_APP_BACKEND_URL_ENDPOINT}/img/tours/${image}`}
                alt="The Park Camper Tour 1"
              />
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Pictures;
