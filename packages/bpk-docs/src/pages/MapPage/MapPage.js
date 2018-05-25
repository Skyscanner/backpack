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

import React from 'react';
import BpkMap, { withScriptjs } from 'bpk-component-map';

import mapReadme from 'bpk-component-map/readme.md';

import DocsPageBuilder from './../../components/DocsPageBuilder';
import DocsPageWrapper from './../../components/neo/DocsPageWrapper';
import IntroBlurb from './../../components/neo/IntroBlurb';

const BpkMapWithScript = withScriptjs(BpkMap);
const API_KEY = '';
const MAP_URL = `https://maps.googleapis.com/maps/api/js?v=3.exp&key=${API_KEY}$libraries=geometry,drawing,places`;

// Shibuya crossing, Tokyo.
const COORDINATES = {
  lat: 35.661777,
  lng: 139.704051,
};

const components = [
  {
    id: 'default',
    title: 'Default',
    examples: [
      <BpkMapWithScript
        googleMapURL={MAP_URL}
        loadingElement={<div />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: `100%` }} />}
        defaultZoom={17}
        defaultCenter={COORDINATES}
      />,
    ],
  },
];

const isNeo = process.env.BPK_NEO;

const blurb = [
  <IntroBlurb>The map component is for embedding maps into pages.</IntroBlurb>,
];

const MapSubpage = ({ ...rest }) => (
  <DocsPageBuilder
    title="Map"
    components={components}
    readme={mapReadme}
    blurb={isNeo ? null : blurb}
    {...rest}
  />
);

const MapPage = () => (
  <DocsPageWrapper
    title="Map"
    blurb={blurb}
    webSubpage={<MapSubpage wrapped />}
  />
);

export default MapPage;
