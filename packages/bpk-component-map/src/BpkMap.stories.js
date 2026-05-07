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
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';
import { Component, useRef, useState } from 'react';

import BpkMap, {
  BpkOverlayView,
  BpkIconMarker,
  BpkPriceMarker,
  MARKER_STATUSES,
  withGoogleMapsScript,
  BpkPriceMarkerButton,
} from "..";
import { action } from '../../../.storybook/bpk-storybook-utils';
import { withRtlSupport } from '../../bpk-component-icon';
import AirportsIconSm from '../../bpk-component-icon/sm/airports';
import FoodIconSm from '../../bpk-component-icon/sm/food';
import HeartIconSm from '../../bpk-component-icon/sm/heart';
import HotelIconSm from '../../bpk-component-icon/sm/hotels';
import LandmarkIconSm from '../../bpk-component-icon/sm/landmark';
import BpkPopover from '../../bpk-component-popover';
import BpkText from '../../bpk-component-text';

import BpkIconMarkerComp from './BpkIconMarker';
import BpkMapComp from './BpkMap';
import BpkOverlayViewComp from './BpkOverlayView';
import BpkPriceMarkerComp from './BpkPriceMarker';
import BpkPriceMarkerButtonComp from './BpkPriceMarkerButton';
import DefaultLoadingElement from './DefaultLoadingElement';

/**
 * This file is a workaround for Storybook not supporting HOCs API table generation in v7 by creating mock components that can be used to generate the API table
 * They plan on adding support in v8
 * https://github.com/storybookjs/storybook/issues/12558#issuecomment-1288834879
 * @todo remove this file once we upgrade to Storybook v8
 */

/**
 * Temporarily re-defining the map props due to a bug in react docgen which doesn't allow us to import the prop types from another file
 * https://github.com/storybookjs/storybook/issues/9266
 * This does work in TS, so we can remove this once we migrate the map component to TS
 * @todo remove this once we migrate the map component to TS
 */
const WithGoogleMapsScriptPropTypes = {
    loadingElement: PropTypes.node,
    googleMapsApiKey: PropTypes.string.isRequired,
    libraries: PropTypes.arrayOf(
        PropTypes.oneOf([
          'drawing',
          'geometry',
          'localContext',
          'places',
          'visualization',
        ]),
      ),
    preventGoogleFontsLoading: PropTypes.bool,
  };

const WithGoogleMapsScriptDefaultProps = {
    loadingElement: <DefaultLoadingElement />,
    preventGoogleFontsLoading: false,
    libraries: ['geometry', 'drawing', 'places'],
  };

const WithGoogleMapsScriptMock = () => <div />;

WithGoogleMapsScriptMock.propTypes = {
    ...WithGoogleMapsScriptPropTypes,
};

WithGoogleMapsScriptMock.defaultProps = {
    ...WithGoogleMapsScriptDefaultProps,
};

const BpkMapWithLoading = withGoogleMapsScript(BpkMap);

const AlignedHotelIconSm = withRtlSupport(HotelIconSm);
const AlignedLandmarkIconSm = withRtlSupport(LandmarkIconSm);
const AlignedAirportsIconSm = withRtlSupport(AirportsIconSm);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);
const AlignedHeartIconSm = withRtlSupport(HeartIconSm);

const StoryMap = (props) => {
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
    heartIcon: <AlignedHeartIconSm />,
  },
  {
    id: '2',
    name: 'Abisko Inn & Suites',
    latitude: 55.9439643,
    longitude: -3.1938768,
    price: '£151',
    icon: <AlignedFoodIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
    heartIcon: <AlignedHeartIconSm />,
  },
  {
    id: '3',
    name: 'The Panjin Lounge',
    latitude: 55.9432205,
    longitude: -3.1955874,
    price: '£62',
    icon: <AlignedHotelIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
    heartIcon: <AlignedHeartIconSm />,
  },
  {
    id: '4',
    name: 'Nara Bed & Breakfast',
    latitude: 55.9450573,
    longitude: -3.1996687,
    price: '£342',
    icon: <AlignedHotelIconSm />,
    airportsIcon: <AlignedAirportsIconSm />,
    heartIcon: <AlignedHeartIconSm />,
  },
];

class StatefulBpkPriceMarker extends Component {
  static defaultProps = {
    action: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: '2',
      viewedVenues: ['1'],
    };
  }

  getStatus = (id) => {
    if (this.state.selectedId === id) {
      return MARKER_STATUSES.selected;
    }
    if (this.state.viewedVenues.includes(id)) {
      return MARKER_STATUSES.previous_selected;
    }
    return MARKER_STATUSES.unselected;
  };

  selectVenue = (id) => {
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
        {venues.map((venue) => {
          let icon = null;
          if (this.props.airportsIconWithPrice) {
            icon = venue.airportsIcon;
          }
          if (this.props.heartIconWithPrice) {
            icon = venue.heartIcon
          }

          return (
            <BpkPriceMarker
              id={venue.id}
              label={venue.price}
              icon={icon}
              position={{
                latitude: venue.latitude,
                longitude: venue.longitude,
              }}
              onClick={() => {
                this.props.action();
                this.selectVenue(venue.id);
              }}
              status={this.getStatus(venue.id)}
              accessibilityLabel='Click the price marker'
            />
          );
        })}
      </StoryMap>
    );
  }
}

class StatefulBpkIconMarker extends Component {
  static defaultProps = {
    action: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedId: '3',
    };
  }

  selectVenue = (id) => {
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

const getPixelPositionOffset = (width, height) => ({
  x: -(width / 2),
  y: -height,
});

const StatefulBpkPriceMarkerButtonWithPopoverOnMap = ({
  action: inlineAction,
  airportsIconWithPrice,
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
          getPixelPositionOffset={getPixelPositionOffset}
          position={{
            latitude: venue.latitude,
            longitude: venue.longitude,
          }}
        >
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
  <StatefulBpkPriceMarker
    action={action('Price marker clicked')}
    airportsIconWithPrice={false}
  />
);

const WithIconPriceMarkersExample = () => (
  <StatefulBpkPriceMarker
    action={action('Price marker clicked')}
    airportsIconWithPrice
  />
);

const WithHeartIconPriceMarkerExample = () => (
  <StatefulBpkPriceMarker
    action={action('Price marker clicked')}
    heartIconWithPrice
  />
);

const WithPriceMarkersButtonWithPopoverOnMapExample = () => (
  <StatefulBpkPriceMarkerButtonWithPopoverOnMap
    action={action('Price marker button clicked')}
    airportsIconWithPrice={false}
  />
);

const WithIconPriceMarkersButtonWithPopoverOnMapExample = () => (
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

export default {
  title: 'bpk-component-map',
  component: BpkMapComp,
  subcomponents: {
    BpkIconMarker: BpkIconMarkerComp,
    BpkPriceMarker: BpkPriceMarkerComp,
    BpkPriceMarkerButton: BpkPriceMarkerButtonComp,
    BpkOverlayView: BpkOverlayViewComp,
    withGoogleMapsScript: WithGoogleMapsScriptMock,
  },
};

export const Simple = { render: () => <SimpleExample /> };
export const DragDisabledAndControlsHidden = { render: () => <DragDisabledAndHiddenControlsExample /> };

export const GreedyGestureHandling = { render: () => <GreddyGestureHandlingExample /> };

export const WithOnZoomAndOnRegionChangeCallbacks = { render: () => <WithOnZoomAndOnRegionChangeExample /> };

export const WithOnTilesLoaded = { render: () => <WithOnTilesLoadedExample /> };

export const WithABoundingBox = { render: () => <WithBoundingBoxExample /> };

export const WithAMarker = { render: () => <WithAMarkerExample /> };

export const IconMarkers = { render: () => <WithIconMarkersExample /> };

export const PriceMarkers = { render: () => <WithPriceMarkersExample /> };

export const WithIconPriceMarkers = { render: () => <WithIconPriceMarkersExample /> };

export const WithHeartIconPriceMarker = { render: () => <WithHeartIconPriceMarkerExample /> };

export const PriceMarkersButtonWithPopoverOnMap = { render: () => <WithPriceMarkersButtonWithPopoverOnMapExample /> };

export const WithIconPriceMarkersButtonWithPopoverOnMap = { render: () => <WithIconPriceMarkersButtonWithPopoverOnMapExample /> };

export const MultiMaps = { render: () => <MultipleMapsExample /> };
