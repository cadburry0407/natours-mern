import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import Svg from '../../components/Svg';

const Main = () => {
  useEffect(() => {
    document.title = `Natours`;
  }, []);

  const [tours, setTours] = useState([]);

  useEffect(() => {
    getTours();
  }, []);

  const getTours = async () => {
    axios
      .get(`/api/v1/tours`)
      .then((response) => {
        const data = response.data.data.data;
        setTours(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <main className="main">
        <div className="card-container">
          {tours.map((tour) => {
            return (
              <div className="card" key={uuidv4()}>
                <div className="card__header">
                  <div className="card__picture">
                    <div className="card__picture-overlay">&nbsp;</div>
                    <img
                      src={`/img/tours/${tour.imageCover}`}
                      alt={tour.name}
                      className="card__picture-img"
                    />
                  </div>

                  <h3 className="heading-tertirary">
                    <span>{tour.name}</span>
                  </h3>
                </div>

                <div className="card__details">
                  <h4 className="card__sub-heading">
                    {tour.difficulty} {tour.duration}-day tour
                  </h4>
                  <p className="card__text">{tour.summary}</p>
                  <div className="card__data">
                    <Svg className="card__icon" spriteName="icon-map-pin" />
                    <span>{tour.startLocation.description}</span>
                  </div>
                  <div className="card__data">
                    <Svg className="card__icon" spriteName="icon-calendar" />
                    <span>
                      {new Date(tour.startDates[0]).toLocaleString('en-us', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="card__data">
                    <Svg className="card__icon" spriteName="icon-flag" />
                    <span>{tour.locations.length} stops</span>
                  </div>
                  <div className="card__data">
                    <Svg className="card__icon" spriteName="icon-user" />
                    <span>{tour.maxGroupSize} people</span>
                  </div>
                </div>

                <div className="card__footer">
                  <p>
                    <span className="card__footer-value">${tour.price}</span>
                    <span className="card__footer-text">per person</span>
                  </p>
                  <p className="card__ratings">
                    <span className="card__footer-value">
                      {tour.ratingsAverage}
                    </span>
                    <span className="card__footer-text">
                      rating ({tour.ratingsQuantity})
                    </span>
                  </p>
                  <Link
                    to={`/tour/${tour.slug}`}
                    className="btn btn--green btn--small"
                  >
                    Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Main;
