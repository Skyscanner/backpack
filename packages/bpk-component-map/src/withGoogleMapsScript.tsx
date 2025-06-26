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
import type { ComponentType } from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import DefaultLoadingElement from './DefaultLoadingElement';

export const LibraryShapeType = PropTypes.arrayOf(
  PropTypes.oneOf([
    'drawing',
    'geometry',
    'localContext',
    'places',
    'visualization',
  ]),
);

function withGoogleMapsScript(Component: ComponentType<any>) {
  const WithGoogleMapsScript = ({
    // @ts-expect-error TS(2339): Property 'googleMapsApiKey' does not exist on type... Remove this comment to see the full error message
    googleMapsApiKey,
    // @ts-expect-error TS(2339): Property 'libraries' does not exist on type '{}'.
    libraries,
    // @ts-expect-error TS(2339): Property 'loadingElement' does not exist on type '... Remove this comment to see the full error message
    loadingElement,
    // @ts-expect-error TS(2339): Property 'preventGoogleFontsLoading' does not exis... Remove this comment to see the full error message
    preventGoogleFontsLoading,
    ...rest
  }: {
    // @ts-expect-error TS(1170): A computed property name in a type literal must re... Remove this comment to see the full error message
    [string]: any,
  }) => {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey,
      libraries,
      preventGoogleFontsLoading,
      version: '3.46',
    });

    if (!isLoaded) {
      return loadingElement;
    }

    if (loadError) {
      throw new Error('Google maps cannot be loaded!');
    }

    return <Component {...rest} />;
  };

  WithGoogleMapsScript.propTypes = {
    loadingElement: PropTypes.node,
    googleMapsApiKey: PropTypes.string.isRequired,
    libraries: LibraryShapeType,
    preventGoogleFontsLoading: PropTypes.bool,
  };

  WithGoogleMapsScript.defaultProps = {
    loadingElement: <DefaultLoadingElement />,
    preventGoogleFontsLoading: false,
    libraries: ['geometry', 'drawing', 'places'],
  };

  return WithGoogleMapsScript;
}

export default withGoogleMapsScript;
