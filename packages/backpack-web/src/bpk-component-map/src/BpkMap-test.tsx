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

import { render, act } from '@testing-library/react';

import BpkMap from './BpkMap';

let capturedOnDragEnd: (() => void) | undefined;
let capturedOnLoad: ((map: any) => void) | undefined;

jest.mock('@react-google-maps/api', () => ({
  GoogleMap: ({ children, mapContainerClassName, onDragEnd, onLoad, onTilesLoaded, onZoomChanged }: any) => {
    capturedOnDragEnd = onDragEnd;
    capturedOnLoad = onLoad;
    return <div className={mapContainerClassName}>{children}</div>;
  },
}));

describe('BpkMap', () => {
  const center = { latitude: 55.9533, longitude: -3.1883 };

  it('calls onRegionChange with a { latitude, longitude } center', () => {
    const mockGetBounds = jest.fn().mockReturnValue({
      south: 55.9,
      west: -3.2,
      north: 56.0,
      east: -3.1,
    });
    const mockGetCenter = jest.fn().mockReturnValue({
      lat: () => 55.9533,
      lng: () => -3.1883,
    });
    const mockMap = { getBounds: mockGetBounds, getCenter: mockGetCenter, getZoom: jest.fn(), fitBounds: jest.fn() };

    const onRegionChange = jest.fn();

    render(<BpkMap center={center} onRegionChange={onRegionChange} />);

    act(() => {
      capturedOnLoad!(mockMap);
    });

    act(() => {
      capturedOnDragEnd!();
    });

    expect(onRegionChange).toHaveBeenCalledTimes(1);
    const [, centerArg] = onRegionChange.mock.calls[0];
    expect(centerArg).toEqual({ latitude: 55.9533, longitude: -3.1883 });
  });
});
