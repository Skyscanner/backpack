/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 - 2019 Skyscanner Ltd
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

import React from 'react';
import BpkMap, {
  withGoogleMapsScript,
  BpkMapMarker,
  MARKER_TYPES,
  type BpkMapLatLong,
} from 'bpk-component-map';
import { cssModules } from 'bpk-react-utils';
import LandmarkIconLg from 'bpk-component-icon/lg/landmark';
import BusIconLg from 'bpk-component-icon/lg/bus';
import FoodIconSm from 'bpk-component-icon/sm/food';
import { withRtlSupport } from 'bpk-component-icon';
import mapReadme from 'bpk-component-map/README.md';

import iosScreenshot from '../../../../../backpack-react-native/packages/react-native-bpk-component-map/screenshots/ios/default.png';
import androidScreenshot from '../../../../../backpack-react-native/packages/react-native-bpk-component-map/screenshots/android/default.png';
import nativeMapReadme from '../../../../../backpack-react-native/packages/react-native-bpk-component-map/README.md';
import DocsPageBuilder from '../../components/DocsPageBuilder';
import DocsPageWrapper from '../../components/DocsPageWrapper';
import IntroBlurb from '../../components/IntroBlurb';

import STYLES from './MapPage.scss';

const AlignedLandmarkIconLg = withRtlSupport(LandmarkIconLg);
const AlignedBusIconLg = withRtlSupport(BusIconLg);
const AlignedFoodIconSm = withRtlSupport(FoodIconSm);

const BpkMapWithScript = withGoogleMapsScript(BpkMap);
const API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
const MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${API_KEY}&libraries=geometry,drawing,places`;

const getClassName = cssModules(STYLES);

// Shibuya crossing, Tokyo.
const COORDINATES: BpkMapLatLong = {
  latitude: 35.661777,
  longitude: 139.704051,
};

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <div className={getClassName('bpkdocs-map-page__map')}>
        <BpkMapWithScript
          googleMapURL={MAP_URL}
          zoom={17}
          center={COORDINATES}
        />
      </div>,
    ],
  },
  {
    id: 'map-markers',
    title: 'Map markers',
    blurb:
      'Add custom markers to the map. You can customise the icon and the type to change the colour.',
    examples: [
      <div className={getClassName('bpkdocs-map-page__map')}>
        <BpkMapWithScript googleMapURL={MAP_URL} zoom={17} center={COORDINATES}>
          <BpkMapMarker
            large
            icon={<AlignedBusIconLg />}
            position={{
              latitude: 35.661777,
              longitude: 139.704051,
            }}
            onClick={() => {
              alert('Beep beep!');
            }}
          />
          <BpkMapMarker
            large
            icon={<AlignedLandmarkIconLg />}
            position={{
              latitude: 35.6625,
              longitude: 139.705051,
            }}
            onClick={() => {
              alert('Interesting!');
            }}
          />
          <BpkMapMarker
            type={MARKER_TYPES.secondary}
            icon={<AlignedFoodIconSm />}
            position={{
              latitude: 35.6615,
              longitude: 139.705051,
            }}
            onClick={() => {
              alert('Yum!');
            }}
          />
        </BpkMapWithScript>
      </div>,
    ],
  },
];

const nativeComponents = [
  {
    id: 'default',
    title: 'Default',
    screenshots: [
      {
        title: 'iOS',
        width: 750,
        height: 1334,
        src: `/${iosScreenshot}`,
        altText: 'iOS Map Component',
        subText: '(iPhone 8 simulator)',
      },
      {
        title: 'Android',
        width: 1080,
        height: 1920,
        src: `/${androidScreenshot}`,
        altText: 'Android Map Component',
        subText: '(Google Pixel emulator)',
      },
    ],
  },
];

const blurb = [
  <IntroBlurb>The map component is for embedding maps into pages.</IntroBlurb>,
];

const MapSubpage = () => (
  <DocsPageBuilder
    title="Map"
    components={components}
    readme={mapReadme}
    wrapped
  />
);

const NativeSubpage = () => (
  <DocsPageBuilder
    title="Map"
    components={nativeComponents}
    readme={nativeMapReadme}
    wrapped
  />
);

const MapPage = () => (
  <DocsPageWrapper
    title="Map"
    blurb={blurb}
    webSubpage={<MapSubpage />}
    nativeSubpage={<NativeSubpage />}
  />
);

export default MapPage;
