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

import React, { type ComponentType } from 'react';
import PropTypes from 'prop-types';
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
    googleMapsApiKey,
    libraries,
    loadingElement,
    preventGoogleFontsLoading,
    ...rest
  }: {
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
