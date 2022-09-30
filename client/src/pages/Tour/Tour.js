import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Description from './Description';
import Pictures from './Pictures';
import Map from './Map';
import Reviews from './Reviews';
import CallToAction from './CallToAction';

import Svg from '../../components/Svg';

const Tour = () => {
  const { slug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [tour, setTour] = useState({});
  const [isError, setError] = useState();

  useEffect(() => {
    getTour(slug);
  }, [slug]);

  useEffect(() => {
    if (isError) {
      document.title = `Natours | Tour Not Found`;
    }
  }, [isError]);

  useEffect(() => {
    if (tour.name) {
      document.title = `Natours | ${tour.name}`;
    }
  }, [tour.name]);

  const getTour = async (slug) => {
    await axios
      .get(`/api/v1/tours/${slug}`)
      .then((response) => {
        const data = response.data.data;
        setTour(data.tour);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.log(error.response.data);
        setError(error.response.data.message);
      });
  };

  if (isError) {
    return (
      <main style={{ textAlign: 'center', padding: '10rem' }}>
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!{' '}
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
        </div>
        <h1>{isError}</h1>
      </main>
    );
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <section className="section-header">
        <div className="header__hero">
          <div className="header__hero-overlay">&nbsp;</div>
          <img
            className="header__hero-img"
            src={`${process.env.REACT_APP_BACKEND_URL_ENDPOINT}/img/tours/${tour.imageCover}`}
            alt={tour.name}
          />
        </div>
        <div className="heading-box">
          <h1 className="heading-primary">
            <span>{tour.name}</span>
          </h1>
          <div className="heading-box__group">
            <div className="heading-box__detail">
              <Svg className="heading-box__icon" spriteName="icon-clock" />
              <span className="heading-box__text">
                {`${tour.duration}`} days
              </span>
            </div>
            <div className="heading-box__detail">
              <Svg className="heading-box__icon" spriteName="icon-map-pin" />
              <span className="heading-box__text">
                {tour?.startLocation?.description}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Description tour={tour} />
      <Pictures images={tour.images} />
      <Map locations={tour} />
      <Reviews reviews={tour.reviews} />
      <CallToAction tour={tour} />
    </>
  );
};

export default Tour;
