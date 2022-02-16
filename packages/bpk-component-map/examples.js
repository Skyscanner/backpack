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
/* @flow strict */

import React, { Component, type Node } from 'react';
import PropTypes from 'prop-types';
import { action } from 'bpk-storybook-utils';
import BpkText from 'bpk-component-text';
import { withRtlSupport } from 'bpk-component-icon';
import LandmarkIconSm from 'bpk-component-icon/sm/landmark';
import FoodIconSm from 'bpk-component-icon/sm/food';
import ParkingIconSm from 'bpk-component-icon/sm/parking';
import HotelIconSm from 'bpk-component-icon/sm/hotels';

import BpkMap, {
  BpkOverlayView,
  BpkIconMarker,
  BpkPriceMarker,
  PRICE_MARKER_STATUSES,
  withGoogleMapsScript,
} from './index';

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const AlignedHotelIconSm = withRtlSupport(HotelIconSm);
const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);
const AlignedParkingIconSm = withRtlSupport(ParkingIconSm);

type Props = { children: ?Node, language: string };

const StoryMap = (props: Props) => {
  const { children, language, ...rest } = props;
  return (
    <div style={{ height: '400px' }}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
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

const venues = [
  {
    id: '1',
    name: 'Hotel Monteverde',
    latitude: 55.9469995,
    longitude: -3.1905666,
    price: '£48',
    disabled: false,
    icon: <AlignedLandmarkIconSm />,
  },
  {
    id: '2',
    name: 'Abisko Inn & Suites',
    latitude: 55.9439643,
    longitude: -3.1938768,
    price: '£151',
    disabled: false,
    icon: <AlignedFoodIconSm />,
  },
  {
    id: '3',
    name: 'The Panjin Lounge',
    latitude: 55.9432205,
    longitude: -3.1955874,
    price: '£62',
    disabled: false,
    icon: <AlignedHotelIconSm />,
  },
  {
    id: '4',
    name: 'Nara Bed & Breakfast',
    latitude: 55.9450573,
    longitude: -3.1996687,
    price: '£342',
    disabled: false,
    icon: <AlignedHotelIconSm />,
  },
  {
    id: '5',
    name: 'Kolkata Springs Hotel',
    latitude: 55.943621,
    longitude: -3.192098,
    price: 'Sold out',
    disabled: true,
    icon: <AlignedParkingIconSm />,
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

  constructor(props: { action: () => mixed }) {
    super(props);
    this.state = {
      selectedId: '2',
      viewedVenues: ['1'],
    };
  }

  getStatus = (id: string) => {
    if (this.state.selectedId === id) {
      return PRICE_MARKER_STATUSES.focused;
    }
    if (this.state.viewedVenues.includes(id)) {
      return PRICE_MARKER_STATUSES.viewed;
    }
    return PRICE_MARKER_STATUSES.default;
  };

  selectVenue = (id: string) => {
    this.setState((prevState) => ({
      selectedId: id,
      viewedVenues: [...prevState.viewedVenues, id],
    }));
  };

  render() {
    return (
      <StoryMap
        zoom={15}
        center={{ latitude: 55.944665, longitude: -3.1964903 }}
      >
        {venues.map((venue) => (
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

class StatefulBpkIconMarker extends Component<
  { action: () => mixed },
  { selectedId: string },
> {
  static defaultProps = {
    action: () => null,
  };

  constructor(props: { action: () => mixed }) {
    super(props);
    this.state = {
      selectedId: '3',
    };
  }

  selectVenue = (id: string) => {
    this.setState({ selectedId: id });
  };

  render() {
    return (
      <StoryMap
        zoom={15}
        center={{ latitude: 55.944665, longitude: -3.1964903 }}
      >
        {venues.map((venue) => (
          <BpkIconMarker
            position={{ latitude: venue.latitude, longitude: venue.longitude }}
            onClick={() => {
              this.props.action();
              this.selectVenue(venue.id);
            }}
            icon={venue.icon}
            disabled={venue.disabled}
            selected={this.state.selectedId === venue.id}
          />
        ))}
      </StoryMap>
    );
  }
}

const onZoom = (level) => {
  action(`Zoom changed to ${level}`);
};

const onRegionChange = (bounds, center) => {
  action(
    `Dragged to bounds: ${bounds.toString()}, center: ${center.toString()}`,
  );
};

const SimpleExample = () => (
  <StoryMap zoom={15} center={{ latitude: 55.944357, longitude: -3.1967116 }} />
);

const DragDisabledAndHiddenControlsExample = () => (
  <StoryMap
    center={{ latitude: 55.944357, longitude: -3.1967116 }}
    panEnabled={false}
    showControls={false}
  />
);

const GreddyGestureHandlingExample = () => (
  <StoryMap
    center={{ latitude: 55.944357, longitude: -3.1967116 }}
    greedyGestureHandling
  />
);

const WithOnZoomAndOnRegionChangeExample = () => (
  <StoryMap
    center={{ latitude: 55.944357, longitude: -3.1967116 }}
    onZoom={onZoom}
    onRegionChange={onRegionChange}
  />
);

const WithOnTilesLoadedExample = () => (
  <StoryMap
    center={{ latitude: 55.944357, longitude: -3.1967116 }}
    onTilesLoaded={() => console.log('Tiles loaded')} // eslint-disable-line no-console
  />
);

const WithBoundingBoxExample = () => (
  <StoryMap
    bounds={{
      south: 25.94129273544452,
      west: -3.2285547854247625,
      north: 20.952707392208396,
      east: -2.159632742578083,
    }}
  />
);

const WithAMarkerExample = () => (
  <StoryMap center={{ latitude: 55.944357, longitude: -3.1967116 }}>
    <BpkOverlayView position={{ latitude: 55.944, longitude: -3.1967116 }}>
      <BpkText>Backpack</BpkText>
    </BpkOverlayView>
  </StoryMap>
);

const WithIconMarkersExample = () => (
  <StatefulBpkIconMarker action={action('Price marker clicked')} />
);

const WithPriceMarkersExample = () => (
  <StatefulBpkPriceMarker action={action('Price marker clicked')} />
);

export {
  SimpleExample,
  DragDisabledAndHiddenControlsExample,
  GreddyGestureHandlingExample,
  WithOnZoomAndOnRegionChangeExample,
  WithOnTilesLoadedExample,
  WithBoundingBoxExample,
  WithAMarkerExample,
  WithIconMarkersExample,
  WithPriceMarkersExample,
};
