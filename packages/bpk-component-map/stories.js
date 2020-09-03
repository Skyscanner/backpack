/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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
/* @flow strict */

import React, { type ElementProps, Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import BpkText from 'bpk-component-text';
import { withRtlSupport } from 'bpk-component-icon';
import LandmarkIconLg from 'bpk-component-icon/lg/landmark';
import BusIconLg from 'bpk-component-icon/lg/bus';
import FoodIconSm from 'bpk-component-icon/sm/food';

import BpkMap, {
  BpkOverlayView,
  BpkMapMarker,
  BpkPriceMarker,
  MARKER_TYPES,
  PRICE_MARKER_STATUSES,
  withGoogleMapsScript,
} from './index';

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const AlignedLandmarkIconLg = withRtlSupport(LandmarkIconLg);
const AlignedBusIconLg = withRtlSupport(BusIconLg);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);

const StoryMap = props => {
  const { children, language, ...rest } = props;
  return (
    <div style={{ height: '400px' }}>
      <BpkMapWithLoading
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&language=en&libraries=geometry,drawing,places"
        {...rest}
      >
        {children}
      </BpkMapWithLoading>
    </div>
  );
};

StoryMap.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
};

StoryMap.defaultProps = {
  children: null,
  language: '',
};

type Props = ElementProps<typeof BpkMapMarker>;

type State = {
  selected: boolean,
};

class StatefulBpkMapMarker extends Component<Props, State> {
  static defaultProps = {
    className: null,
    arrowClassName: null,
    large: false,
    onClick: null,
    selected: false,
    type: MARKER_TYPES.primary,
    buttonProps: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: false,
    };
  }

  onClick = () => {
    this.setState(prevState => ({
      selected: !prevState.selected,
    }));
  };

  render() {
    const { onClick, ...rest } = this.props;

    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      <BpkMapMarker
        selected={this.state.selected}
        onClick={() => {
          this.onClick();
        }}
        {...rest}
      />
    );
  }
}

const venues = [
  {
    id: '1',
    name: 'Hotel Monteverde',
    latitude: 35.68,
    longitude: 139.69,
    price: '£48',
    disabled: false,
  },
  {
    id: '2',
    name: 'Abisko Inn & Suites',
    latitude: 35.67,
    longitude: 139.7,
    price: '£151',
    disabled: false,
  },
  {
    id: '3',
    name: 'The Panjin Lounge',
    latitude: 35.65,
    longitude: 139.71,
    price: '£62',
    disabled: false,
  },
  {
    id: '4',
    name: 'Nara Bed & Breakfast',
    latitude: 35.63,
    longitude: 139.7,
    price: '£342',
    disabled: false,
  },
  {
    id: '5',
    name: 'Kolkata Springs Hotel',
    latitude: 35.635,
    longitude: 139.72,
    price: 'Sold out',
    disabled: true,
  },
];

type PriceMarkerState = {
  selectedId: string,
  viewedVenues: Array<string>,
};

class StatefulBpkPriceMarker extends Component<
  { action: () => mixed },
  PriceMarkerState,
> {
  static defaultProps = {
    action: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: '1',
      viewedVenues: ['1'],
    };
  }

  getStatus = id => {
    if (this.state.selectedId === id) {
      return PRICE_MARKER_STATUSES.focused;
    }
    if (this.state.viewedVenues.includes(id)) {
      return PRICE_MARKER_STATUSES.viewed;
    }
    return PRICE_MARKER_STATUSES.default;
  };

  selectVenue = id => {
    this.setState(prevState => ({
      selectedId: id,
      viewedVenues: [...prevState.viewedVenues, id],
    }));
  };

  render() {
    return (
      <StoryMap
        zoom={12}
        center={{ latitude: 35.661777, longitude: 139.704051 }}
      >
        {venues.map(venue => (
          <BpkPriceMarker
            id={venue.id}
            label={venue.price}
            position={{ latitude: venue.latitude, longitude: venue.longitude }}
            disabled={venue.disabled}
            onClick={() => {
              this.props.action();
              this.selectVenue(venue.id);
            }}
            status={this.getStatus(venue.id)}
          />
        ))}
      </StoryMap>
    );
  }
}

const onZoom = level => {
  action(`Zoom changed to ${level}`);
};

const onRegionChange = (bounds, center) => {
  action(
    `Dragged to bounds: ${bounds.toString()}, center: ${center.toString()}`,
  );
};

storiesOf('bpk-component-map', module)
  .add('Simple', () => (
    <StoryMap
      zoom={15}
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
    />
  ))
  .add('Drag disabled and controls hidden', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      panEnabled={false}
      showControls={false}
    />
  ))
  .add('Greedy gesture handling', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      greedyGestureHandling
    />
  ))
  .add('With onZoom and onRegionChange callbacks', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      onZoom={onZoom}
      onRegionChange={onRegionChange}
    />
  ))
  .add('With onTilesLoaded', () => (
    <StoryMap
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
      onTilesLoaded={() => console.log('Tiles loaded')} // eslint-disable-line no-console
    >
      <StatefulBpkMapMarker
        large
        position={{ latitude: 55.9441, longitude: -3.196 }}
        icon={<AlignedLandmarkIconLg />}
      />
      <StatefulBpkMapMarker
        large
        position={{ latitude: 55.9446, longitude: -3.197 }}
        icon={<AlignedBusIconLg />}
      />
    </StoryMap>
  ))
  .add('With a bounding box', () => (
    <StoryMap
      bounds={{
        south: 25.94129273544452,
        west: -3.2285547854247625,
        north: 20.952707392208396,
        east: -2.159632742578083,
      }}
    />
  ))
  .add('With a marker', () => (
    <StoryMap center={{ latitude: 55.944357, longitude: -3.1967116 }}>
      <BpkOverlayView position={{ latitude: 55.944, longitude: -3.1967116 }}>
        <BpkText>Backpack</BpkText>
      </BpkOverlayView>
    </StoryMap>
  ))
  .add('With BpkMapMarker', () => (
    <StoryMap center={{ latitude: 55.944357, longitude: -3.1967116 }}>
      <BpkMapMarker
        large
        position={{ latitude: 55.944, longitude: -3.1967116 }}
        icon={<AlignedLandmarkIconLg />}
      />
      <BpkMapMarker
        large
        position={{ latitude: 55.943, longitude: -3.1937116 }}
        onClick={() => {
          alert('Marker clicked'); // eslint-disable-line no-alert
        }}
        icon={<AlignedBusIconLg />}
      />
      <BpkMapMarker
        position={{ latitude: 55.942, longitude: -3.2018116 }}
        type={MARKER_TYPES.secondary}
        icon={<AlignedFoodIconSm />}
      />
    </StoryMap>
  ))
  .add('Overlapping markers', () => (
    <StoryMap center={{ latitude: 55.944357, longitude: -3.1967116 }}>
      <StatefulBpkMapMarker
        large
        position={{ latitude: 55.9441, longitude: -3.196 }}
        icon={<AlignedLandmarkIconLg />}
      />
      <StatefulBpkMapMarker
        large
        position={{ latitude: 55.9446, longitude: -3.197 }}
        icon={<AlignedBusIconLg />}
      />
    </StoryMap>
  ))
  .add('Price markers', () => (
    <StatefulBpkPriceMarker action={action('Price marker clicked')} />
  ));
