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

import type { ComponentType, ReactNode } from 'react';

import { useJsApiLoader } from '@react-google-maps/api';

import DefaultLoadingElement from './DefaultLoadingElement';

export const LIBRARIES = [
  'drawing',
  'geometry',
  'localContext',
  'places',
  'visualization',
] as const;

export type Library = (typeof LIBRARIES)[number];

const DEFAULT_LIBRARIES: Library[] = ['geometry', 'drawing', 'places'];

type WithGoogleMapsScriptProps = {
  googleMapsApiKey: string;
  libraries?: Library[];
  loadingElement?: ReactNode;
  preventGoogleFontsLoading?: boolean;
};

function withGoogleMapsScript<P extends object>(
  Component: ComponentType<P>,
): ComponentType<Omit<P, keyof WithGoogleMapsScriptProps> & WithGoogleMapsScriptProps> {
  const WithGoogleMapsScript = ({
    googleMapsApiKey,
    libraries = DEFAULT_LIBRARIES,
    loadingElement = <DefaultLoadingElement />,
    preventGoogleFontsLoading = false,
    ...rest
  }: WithGoogleMapsScriptProps & Omit<P, keyof WithGoogleMapsScriptProps>) => {
    const { isLoaded, loadError } = useJsApiLoader({
      googleMapsApiKey,
      libraries: libraries as any,
      preventGoogleFontsLoading,
      version: '3.46',
    });

    if (!isLoaded) {
      return loadingElement;
    }

    if (loadError) {
      throw new Error('Google maps cannot be loaded!');
    }

    return <Component {...(rest as P)} />;
  };

  return WithGoogleMapsScript;
}

export default withGoogleMapsScript;
