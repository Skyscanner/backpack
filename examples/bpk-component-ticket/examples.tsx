/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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


import PropTypes from 'prop-types';

import BpkButton from '../../packages/bpk-component-button';
import {
  withButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import ArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import BpkTicket from '../../packages/bpk-component-ticket';
import { cssModules } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

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

const DefaultExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet.">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
    massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus.
  </BpkTicket>
);

const VerticalExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet." vertical>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
    massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus.
  </BpkTicket>
);

const WithoutPaddingExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false}>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
    massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus.
  </BpkTicket>
);

const WithoutPaddingVerticalExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false} vertical>
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
    massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus.
  </BpkTicket>
);

const WithoutPaddingImageExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet." padded={false}>
    <img
      src="https://images.unsplash.com/44/MIbCzcvxQdahamZSNQ26_12082014-IMG_3526.jpg?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=22b674fb2c751f77f7d80d22c77da67a&auto=format&fit=crop&w=1650&q=80"
      alt="Thoughtful bear"
      width={300}
    />
  </BpkTicket>
);

const WithHrefExample = () => (
  <BpkTicket stub="Lorem ipsum dolor sit amet." href="#">
    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
    ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis
    parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
    massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus.
  </BpkTicket>
);

const DayViewExample = () => (
  <div style={{ margin: '0 auto', maxWidth: '800px' }}>
    {flights.map((f, i) => (
      <Flight flight={f} key={`f-${i.toString()}`} />
    ))}
  </div>
);

const MixedExample = () => (
  <div>
    <DefaultExample />
    <VerticalExample />
    <WithoutPaddingExample />
    <WithoutPaddingVerticalExample />
    <WithHrefExample />
  </div>
);

export {
  DefaultExample,
  VerticalExample,
  WithoutPaddingExample,
  WithoutPaddingVerticalExample,
  WithoutPaddingImageExample,
  WithHrefExample,
  DayViewExample,
  MixedExample,
};
