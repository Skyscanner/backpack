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
// @ts-expect-error TS(2305) FIXME: Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';
import { Component, useRef, useState } from 'react';

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
import BpkPopover from '../../packages/bpk-component-popover';
import BpkText from '../../packages/bpk-component-text';
import { action } from '../bpk-storybook-utils';

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const AlignedHotelIconSm = withRtlSupport(HotelIconSm);
const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);
const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);

type Props = {
  children: any,
  language: string,
  zoom?: number,
  center?: { latitude: number; longitude: number },
  panEnabled?: boolean,
  showControls?: boolean,
  greedyGestureHandling?: boolean,
  onZoom?: (level: number) => void,
  onRegionChange?: (bounds: any, center: any) => void,
  onTilesLoaded?: () => void,
  bounds?: {
    south: number,
    west: number,
    north: number,
    east: number,
  },
};

const StoryMap = (props: Props) => {
  const { children, language, ...rest } = props;
  return (
    <div style={{ height: '400px' }}>
     {/*  @ts-expect-error TS(2322) FIXME: Type '{ children: any; googleMapsApiKey: string; }... Remove this comment to see the full error message */}
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
  viewedVenues: string[],
};

class StatefulBpkPriceMarker extends Component<
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
  { action: () => mixed },
  PriceMarkerState
> {
  static defaultProps = {
    action: () => null,
  };

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
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
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; label: string; position: { lat... Remove this comment to see the full error message
            id={venue.id}
            label={venue.price}
            position={{ latitude: venue.latitude, longitude: venue.longitude }}
            // @ts-expect-error TS(2339) FIXME: Property 'disabled' does not exist on type '{ id: ... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
  { action: () => mixed, airportsIconWithPrice: boolean },
  PriceMarkerState
> {
  static defaultProps = {
    action: () => null,
  };

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
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
            // @ts-expect-error TS(2322) FIXME: Type '{ id: string; label: string; icon: Element |... Remove this comment to see the full error message
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
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
  { action: () => mixed },
  { selectedId: string }
> {
  static defaultProps = {
    action: () => null,
  };

  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
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

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -height,
});

const StatefulBpkPriceMarkerButtonWithPopoverOnMap = ({
  action: inlineAction,
  airportsIconWithPrice,
}: {
  // @ts-expect-error TS(2304) FIXME: Cannot find name 'mixed'.
  action: () => mixed,
  airportsIconWithPrice: boolean,
}) => {
  const [selectedId, setSelectedId] = useState('2');
  const [viewedVenues, setViewedVenues] = useState(['1']);
  const ref = useRef(null);

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
    <StoryMap zoom={15} center={{ latitude: 55.944665, longitude: -3.1964903 }}>
      {venues.map((venue) => (
        <BpkOverlayView
          // @ts-expect-error TS(2322) FIXME: Type '{ children: any[]; getPixelPositionOffset: (... Remove this comment to see the full error message
          getPixelPositionOffset={getPixelPositionOffset}
          position={{
            latitude: venue.latitude,
            longitude: venue.longitude,
          }}
        >
          {/*  @ts-expect-error TS(2322) FIXME: Type '{ children: Element; hoverable: true; showAr... Remove this comment to see the full error message */}
          <BpkPopover
            hoverable
            showArrow
            id="map-marker-popover"
            padded
            label="Map marker popover"
            labelAsTitle
            target={
              <div ref={ref} style={{ width: 'fit-content' }}>
                <BpkPriceMarkerButton
                  // @ts-expect-error TS(2322) FIXME: Type '{ id: string; label: string; icon: Element |... Remove this comment to see the full error message
                  id={venue.id}
                  label={venue.price}
                  icon={airportsIconWithPrice ? venue.airportsIcon : null}
                  onClick={() => {
                    inlineAction();
                    selectVenue(venue.id);
                  }}
                  status={getStatus(venue.id)}
                  accessibilityLabel="Click the price marker button"
                />
              </div>
            }
          >
            <BpkText>Map marker popover content.</BpkText>
          </BpkPopover>
        </BpkOverlayView>
      ))}
    </StoryMap>
  );
};

// @ts-expect-error TS(7006) FIXME: Parameter 'level' implicitly has an 'any' type.
const onZoom = (level) => {
  action(`Zoom changed to ${level}`);
};

// @ts-expect-error TS(7006) FIXME: Parameter 'bounds' implicitly has an 'any' type.
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

const WithPriceMarkersV2ButtonWithPopoverOnMapExample = () => (
  <StatefulBpkPriceMarkerButtonWithPopoverOnMap
    action={action('Price marker button clicked')}
    airportsIconWithPrice={false}
  />
);

const WithIconPriceMarkersV2ButtonWithPopoverOnMapExample = () => (
  <StatefulBpkPriceMarkerButtonWithPopoverOnMap
    action={action('Price marker button clicked')}
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
  WithPriceMarkersV2ButtonWithPopoverOnMapExample,
  WithIconPriceMarkersV2ButtonWithPopoverOnMapExample,
  MultipleMapsExample,
  VisualTestExample,
};
