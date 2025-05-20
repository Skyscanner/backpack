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

import PropTypes from 'prop-types';
import type { Node } from 'react';
import { Component, useState } from 'react';

import { withRtlSupport } from '../../packages/bpk-component-icon';
import AirportsIconSm from '../../packages/bpk-component-icon/sm/airports';
import FoodIconSm from '../../packages/bpk-component-icon/sm/food';
import HotelIconSm from '../../packages/bpk-component-icon/sm/hotels';
import LandmarkIconSm from '../../packages/bpk-component-icon/sm/landmark';
import BpkMap, {
  BpkOverlayView,
  BpkIconMarker,
  BpkPriceMarker,
  BpkPriceMarkerV2,
  PRICE_MARKER_STATUSES,
  MARKER_STATUSES,
  withGoogleMapsScript,
  BpkPriceMarkerButton,
} from '../../packages/bpk-component-map';
import BpkText from '../../packages/bpk-component-text';
import { action } from '../bpk-storybook-utils';

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const AlignedHotelIconSm = withRtlSupport(HotelIconSm);
const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);
const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);

type Props = { children: ?Node, language: string };

const StoryMap = (props: Props) => {
  const { children, language, ...rest } = props;
  return (
    <div style={{ height: '400px' }}>
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <BpkMapWithLoading googleMapsApiKey="" {...rest}>
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
    icon: <AlignedLandmarkIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
  },
  {
    id: '2',
    name: 'Abisko Inn & Suites',
    latitude: 55.9439643,
    longitude: -3.1938768,
    price: '£151',
    icon: <AlignedFoodIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
  },
  {
    id: '3',
    name: 'The Panjin Lounge',
    latitude: 55.9432205,
    longitude: -3.1955874,
    price: '£62',
    icon: <AlignedHotelIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
  },
  {
    id: '4',
    name: 'Nara Bed & Breakfast',
    latitude: 55.9450573,
    longitude: -3.1996687,
    price: '£342',
    icon: <AlignedHotelIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
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

class StatefulBpkPriceMarkerV2 extends Component<
  { action: () => mixed, airportsIconWithPrice: boolean },
  PriceMarkerState,
> {
  static defaultProps = {
    action: () => null,
  };

  constructor(props: { action: () => mixed, airportsIconWithPrice: boolean }) {
    super(props);
    this.state = {
      selectedId: '2',
      viewedVenues: ['1'],
    };
  }

  getStatus = (id: string) => {
    if (this.state.selectedId === id) {
      return MARKER_STATUSES.selected;
    }
    if (this.state.viewedVenues.includes(id)) {
      return MARKER_STATUSES.previous_selected;
    }
    return MARKER_STATUSES.unselected;
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
          <BpkPriceMarkerV2
            id={venue.id}
            label={venue.price}
            icon={this.props.airportsIconWithPrice ? venue.airportsIcon : null}
            position={{
              latitude: venue.latitude,
              longitude: venue.longitude,
            }}
            onClick={() => {
              this.props.action();
              this.selectVenue(venue.id);
            }}
            status={this.getStatus(venue.id)}
            accessibilityLabel="Click the price marker"
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
            key={venue.id}
            position={{ latitude: venue.latitude, longitude: venue.longitude }}
            onClick={() => {
              this.props.action();
              this.selectVenue(venue.id);
            }}
            icon={venue.icon}
            selected={this.state.selectedId === venue.id}
          />
        ))}
      </StoryMap>
    );
  }
}

const StatefulBpkPriceMarkerButton = ({
  action: inlineAction,
  airportsIconWithPrice,
}: {
  action: () => mixed,
  airportsIconWithPrice: boolean,
}) => {
  const [selectedId, setSelectedId] = useState('2');
  const [viewedVenues, setViewedVenues] = useState(['1']);

  const getStatus = (id: string) => {
    if (selectedId === id) {
      return MARKER_STATUSES.selected;
    }
    if (viewedVenues.includes(id)) {
      return MARKER_STATUSES.previous_selected;
    }
    return MARKER_STATUSES.unselected;
  };

  const selectVenue = (id: string) => {
    setSelectedId(id);
    setViewedVenues((prevState) => [...prevState, id]);
  };

  return (
    <div>
      {venues.map((venue) => (
        <BpkPriceMarkerButton
          id={venue.id}
          label={venue.price}
          icon={airportsIconWithPrice ? venue.airportsIcon : null}
          position={{
            latitude: venue.latitude,
            longitude: venue.longitude,
          }}
          onClick={() => {
            inlineAction();
            selectVenue(venue.id);
          }}
          status={getStatus(venue.id)}
          accessibilityLabel="Click the price marker"
        />
      ))}
    </div>
  );
};

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

const WithPriceMarkersV2Example = () => (
  <StatefulBpkPriceMarkerV2
    action={action('Price marker clicked')}
    airportsIconWithPrice={false}
  />
);

const WithIconPriceMarkersV2Example = () => (
  <StatefulBpkPriceMarkerV2
    action={action('Price marker clicked')}
    airportsIconWithPrice
  />
);

const WithPriceMarkersV2ButtonExample = () => (
  <StatefulBpkPriceMarkerButton
    action={action('Price marker clicked')}
    airportsIconWithPrice={false}
  />
);

const WithIconPriceMarkersV2ButtonExample = () => (
  <StatefulBpkPriceMarkerButton
    action={action('Price marker clicked')}
    airportsIconWithPrice
  />
);

const MultipleMapsExample = () => (
  <>
    <span>first map:</span>
    <StoryMap
      zoom={15}
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
    />
    <span>second map:</span>
    <StoryMap
      zoom={15}
      center={{ latitude: 55.944357, longitude: -3.1967116 }}
    />
  </>
);

const VisualTestExample = () => (
  <>
    <WithPriceMarkersV2Example />
    <WithIconPriceMarkersV2Example />
  </>
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
  WithPriceMarkersV2Example,
  WithIconPriceMarkersV2Example,
  WithPriceMarkersV2ButtonExample,
  WithIconPriceMarkersV2ButtonExample,
  MultipleMapsExample,
  VisualTestExample,
};
