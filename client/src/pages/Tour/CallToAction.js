import React from 'react';
const CallToAction = (props) => {
  return (
    <>
      <section className="section-cta">
        <div className="cta">
          <div className="cta__img cta__img--logo">
            <img src={`/img/logo-white.png`} alt="Natours logo" />
          </div>
          <img
            className="cta__img cta__img--1"
            src={`/img/tours/${props.tour.images[1]}`}
            alt="Tour "
          />
          <img
            className="cta__img cta__img--2"
            src={`/img/tours/${props.tour.images[2]}`}
            alt="Tour"
          />
          <div className="cta__content">
            <h2 className="heading-secondary">What are you waiting for?</h2>
            <p className="cta__text">
              {props.tour.duration} days. 1 adventure. Infinite memories. Make
              it yours today!
            </p>
            <button className="btn btn--green span-all-rows">
              Book tour now!
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default CallToAction;
