import React from 'react';

import Svg from '../../components/Svg';
import { v4 as uuidv4 } from 'uuid';

const Reviews = (props) => {
  return (
    <>
      <section className="section-reviews">
        <div className="reviews">
          {props.reviews.map((review) => {
            return (
              <div key={uuidv4()} className="reviews__card">
                <div className="reviews__avatar">
                  <img
                    className="reviews__avatar-img"
                    src={`${process.env.REACT_APP_BACKEND_URL_ENDPOINT}/img/users/${review.user.photo}`}
                    alt={review.user.name}
                  />
                  <h6 className="reviews__user">{review.user.name}</h6>
                </div>
                <p className="reviews__text">{review.review}</p>
                <div className="reviews__rating">
                  {[...Array(5)].map((e, i) => (
                    <Svg
                      key={uuidv4()}
                      className={`reviews__star reviews__star--${
                        review.rating >= i + 1 ? 'active' : 'inactive'
                      }`}
                      spriteName="icon-star"
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Reviews;
