/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow */

import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@storybook/react';

import BpkButton from 'bpk-component-button';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkTicket from './index';
import STYLES from './stories.css';

const getClassName = cssModules(STYLES);

const AlignedArrowRightIcon = withButtonAlignment(
  withRtlSupport(ArrowRightIcon),
);

const flights = Array(100).fill({
  price: '143',
  from: 'LCY',
  to: 'EDI',
  departure: '20:50',
  arrival: '22:10',
  duration: '1h 20',
  logo: '//logos.skyscnr.com/images/airlines/BA.png',
});

const Flight = ({ flight }) => (
  <BpkTicket
    className={getClassName('bpk-stories-flight')}
    stubClassName={getClassName('bpk-stories-flight__stub')}
    stub={
      <div className={getClassName('bpk-stories-flight__stub')}>
        <div className={getClassName('bpk-stories-flight__small')}>
          8 deals from
        </div>
        <div className={getClassName('bpk-stories-flight__price')}>
          £{flight.price}
        </div>
        <BpkButton>
          Select <AlignedArrowRightIcon fill="white" />
        </BpkButton>
      </div>
    }
  >
    <div className={getClassName('bpk-stories-flight__main')}>
      <div className={getClassName('bpk-stories-flight__flight-overview')}>
        <img
          className={getClassName('bpk-stories-flight__logo')}
          src={flight.logo}
          alt="BA Logo"
        />
        <div className={getClassName('bpk-stories-flight__from')}>
          <div className={getClassName('bpk-stories-flight__time')}>
            {flight.departure}
          </div>
          <div>{flight.from}</div>
        </div>
        <div>{flight.duration}</div>
        <div className={getClassName('bpk-stories-flight__to')}>
          <div className={getClassName('bpk-stories-flight__time')}>
            {flight.arrival}
          </div>
          <div>{flight.to}</div>
        </div>
      </div>
      <div className={getClassName('bpk-stories-flight__small')}>
        Operated by BA Cityflyer
      </div>
    </div>
  </BpkTicket>
);

Flight.propTypes = {
  flight: PropTypes.objectOf(PropTypes.string).isRequired,
};

storiesOf('bpk-component-ticket', module)
  .add('Default', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet.">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  .add('Vertical', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." vertical>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  .add('Without padding', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  .add('Without padding and with an image ', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false}>
      <img
        src="https://images.unsplash.com/44/MIbCzcvxQdahamZSNQ26_12082014-IMG_3526.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=22b674fb2c751f77f7d80d22c77da67a&auto=format&fit=crop&w=1650&q=80"
        alt="Thoughtful bear"
        width={300}
      />
    </BpkTicket>
  ))
  .add('Without notches', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." withNotches={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  .add('Without notches (vertical)', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." vertical withNotches={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  .add('With a "href" prop', () => (
    <BpkTicket stub="Lorem ipsum dolor sit amet." href="#">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
      ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
      dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
      consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
      massa. Cum sociis natoque penatibus et magnis dis parturient montes,
      nascetur ridiculus mus.
    </BpkTicket>
  ))
  /* eslint-disable react/no-array-index-key */
  .add('Day view', () => (
    <div style={{ margin: '0 auto', maxWidth: '800px' }}>
      {flights.map((f, i) => <Flight flight={f} key={`f-${i}`} />)}
    </div>
  ));
