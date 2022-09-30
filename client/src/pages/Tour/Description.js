import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import OverviewBoxDetal from '../../components/OverviewBoxDetal';

const Description = (props) => {
  return (
    <>
      <section className="section-description">
        <div className="overview-box">
          <div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

              <OverviewBoxDetal
                data={{
                  img: {
                    src: '',
                  },
                  svg: {
                    className: 'overview-box__icon',
                    spriteName: 'icon-calendar',
                  },
                  label: 'Next Date',
                  value: new Date(props.tour.startDates[0]).toLocaleString(
                    'en-us',
                    {
                      month: 'long',
                      year: 'numeric',
                    }
                  ),
                }}
              />

              <OverviewBoxDetal
                data={{
                  img: {
                    src: '',
                  },
                  svg: {
                    className: 'overview-box__icon',
                    spriteName: 'icon-trending-up',
                  },
                  label: 'Difficulty',
                  value: props.tour.difficulty,
                }}
              />

              <OverviewBoxDetal
                data={{
                  img: {
                    src: '',
                  },
                  svg: {
                    className: 'overview-box__icon',
                    spriteName: 'icon-user',
                  },
                  label: 'Participants',
                  value: props.tour.maxGroupSize,
                }}
              />

              <OverviewBoxDetal
                data={{
                  img: {
                    src: '',
                  },
                  svg: {
                    className: 'overview-box__icon',
                    spriteName: 'icon-star',
                  },
                  label: 'Rating',
                  value: props.tour.ratingsAverage,
                }}
              />
            </div>
            <div className="overview-box__group">
              <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
              {props.tour.guides.map((guide) => {
                return (
                  <OverviewBoxDetal
                    key={uuidv4()}
                    data={{
                      img: {
                        src: guide.photo,
                      },
                      svg: {
                        className: '',
                        spriteName: '',
                      },
                      label: guide.role.split('-').join(' '),
                      value: guide.name,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="description-box">
          <h2 className="heading-secondary ma-bt-lg">
            About {props.tour.name} tour
          </h2>
          {props.tour.description.split('\n').map((p) => {
            return (
              <p key={uuidv4()} className="description__text">
                {p}
              </p>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Description;
