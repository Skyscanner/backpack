import PropTypes from 'prop-types';
import React from 'react';
import { cssModules } from 'bpk-react-utils';
import { storiesOf } from '@kadira/storybook';

import BpkButton from 'bpk-component-button';
import ArrowRightIcon from 'bpk-component-icon/sm/long-arrow-right';
import { withButtonAlignment, withRtlSupport } from 'bpk-component-icon';
import BpkCard from './index';
import STYLES from './stories.scss';

const getClassName = cssModules(STYLES);

const AlignedArrowRightIcon = withButtonAlignment(withRtlSupport(ArrowRightIcon));

const flights = Array(100).fill({
  price: '143',
  from: 'LCY',
  to: 'EDI',
  departure: '20:50',
  arrival: '22:10',
  duration: '1h 20',
  logo: '//logos.skyscnr.com/images/airlines/small/BA.png',
});

const Flight = ({ flight }) => (
  <BpkCard
    className={getClassName('bpk-stories-flight')}
    stub={
      <div className={getClassName('bpk-stories-flight__stub')}>
        <div className={getClassName('bpk-stories-flight__small')}>8 deals from</div>
        <div className={getClassName('bpk-stories-flight__price')}>£{ flight.price }</div>
        <BpkButton>Select <AlignedArrowRightIcon fill="white" /></BpkButton>
      </div>
    }
  >
    <div className={getClassName('bpk-stories-flight__main')}>
      <img src={flight.logo} alt="BA Logo" />
      <div className={getClassName('bpk-stories-flight__from')}>
        <div className={getClassName('bpk-stories-flight__time')}>{ flight.departure }</div>
        <div>{ flight.from }</div>
      </div>
      <div>
        { flight.duration }
      </div>
      <div className={getClassName('bpk-stories-flight__to')}>
        <div className={getClassName('bpk-stories-flight__time')}>{ flight.arrival }</div>
        <div>{ flight.to }</div>
      </div>
    </div>
    <div className={getClassName('bpk-stories-flight__small')}>Operated by BA Cityflyer</div>
  </BpkCard>
);

Flight.propTypes = {
  flight: PropTypes.objectOf(PropTypes.string).isRequired,
};

storiesOf('bpk-component-ticket', module)
  .add('Default', () => (
    <BpkCard stub="Lorem ipsum dolor sit amet.">
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  .add('Vertical', () => (
    <BpkCard stub="Lorem ipsum dolor sit amet." vertical>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  .add('Without padding', () => (
    <BpkCard stub="Lorem ipsum dolor sit amet." padded={false}>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkCard>
  ))
  /* eslint-disable react/no-array-index-key */
  .add('Day view', () => (
    <div style={{ margin: '0 auto', maxWidth: '800px' }}>
      { flights.map((f, i) => <Flight flight={f} key={`f-${i}`} />)}
    </div>
  ))
  /* eslint-enable */
  ;
