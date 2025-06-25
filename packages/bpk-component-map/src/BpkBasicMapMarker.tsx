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
import type { ReactNode } from 'react';

import BpkOverlayView from './BpkOverlayView';
import { LatLongPropType, type LatLong } from './common-types';

type Props = {
  children: ReactNode,
  position: LatLong,
};

const getPixelPositionOffset = (width: number, height: number) => ({
  x: -(width / 2),
  y: -height,
});

const BpkBasicMapMarker = (props: Props) => {
  const { children, position, ...rest } = props;

  return (
    <BpkOverlayView
      position={position}
      // @ts-expect-error TS(2322) FIXME: Type '{ children: ReactNode[]; position: LatLong; ... Remove this comment to see the full error message
      getPixelPositionOffset={getPixelPositionOffset}
      {...rest}
    >
      // @ts-expect-error TS(2322): Type 'ReactNode' is not assignable to type 'string... Remove this comment to see the full error message
      {children}
    </BpkOverlayView>
  );
};

BpkBasicMapMarker.propTypes = {
  children: PropTypes.node.isRequired,
  position: LatLongPropType.isRequired,
};

export default BpkBasicMapMarker;
