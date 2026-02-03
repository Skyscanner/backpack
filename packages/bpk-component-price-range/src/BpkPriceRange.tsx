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
import { useEffect, useRef, useState } from 'react';

import clamp from 'lodash/clamp';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules, getDataComponentAttribute } from '../../bpk-react-utils';

import BpkPriceMarker from './BpkPriceMarker';
import { MARKER_DISPLAY_TYPES, MARKER_TYPES } from './common-types';

import type { MarkerDisplayType, MarkerType } from './common-types';

import STYLES from './BpkPriceRange.module.scss';

const getClassName = cssModules(STYLES);

type PriceRangePosition = {
  price: string;
  percentage: number;
};

type MarkerPriceRangePosition = PriceRangePosition & {
  type?: MarkerDisplayType;
};

export type BpkPriceRangeProps = {
  min?: number;
  max?: number;
  /**
   * @deprecated Use `marker.type` with `MARKER_DISPLAY_TYPES.DOT` instead to hide boundary prices.
   * This prop will be removed in a future major release.
   */
  showPriceIndicator?: boolean;
  marker?: MarkerPriceRangePosition;
  segments: {
    low: PriceRangePosition;
    high: PriceRangePosition;
  };
};

const getShouldShowPriceOnBoundaries = (
  markerType: MarkerDisplayType | undefined,
  showPriceIndicator: boolean | undefined,
): boolean => {
  switch (markerType) {
    case MARKER_DISPLAY_TYPES.DOT:
      return false;
    case MARKER_DISPLAY_TYPES.BUBBLE:
      return true;
    case undefined:
    default:
      // TODO: LUNA-3184 return `true` when deprecating `showPriceIndicator`
      return showPriceIndicator ?? true;
  }
};

const BpkPriceRange = ({
  marker,
  max = 100,
  min = 0,
  segments,
  showPriceIndicator,
}: BpkPriceRangeProps) => {
  const shouldShowPriceOnBoundaries = getShouldShowPriceOnBoundaries(
    marker?.type,
    showPriceIndicator,
  );
  const linesRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [linesWidth, setLinesWidth] = useState(0);
  const [prefilledWidth, setPrefilledWidth] = useState(0);
  const calcPercentage = (current: number) =>
    (clamp(current, min, max) - min) / (max - min);

  let type: MarkerType;
  if (marker && marker.percentage < segments.low.percentage) {
    type = MARKER_TYPES.LOW;
  } else if (marker && marker.percentage > segments.high.percentage) {
    type = MARKER_TYPES.HIGH;
  } else {
    type = MARKER_TYPES.MEDIUM;
  }

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0].contentRect) {
        // listen to the width of the lines
        setLinesWidth(entries[0].contentRect.width);
      }
    });

    if (linesRef.current) {
      resizeObserver.observe(linesRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    // to calculate the spacing ahead of the price indicator
    if (marker && indicatorRef.current && linesWidth) {
      const indicatorPercent = calcPercentage(marker.percentage);
      const estimatedWidth =
        indicatorPercent * linesWidth - indicatorRef.current.scrollWidth / 2;
      const maxPrefilledWidth = linesWidth - indicatorRef.current.scrollWidth;
      const actualPrefilledWidth = clamp(estimatedWidth, 0, maxPrefilledWidth);

      setPrefilledWidth(actualPrefilledWidth);
    }
  }, [marker?.percentage, linesWidth]);

  const linesClassName = getClassName(
    'bpk-price-range__lines',
    shouldShowPriceOnBoundaries && 'bpk-price-range__lines--large',
  );
  const lowClassName = getClassName(
    'bpk-price-range__line--low',
    shouldShowPriceOnBoundaries && 'bpk-price-range__line--lowLarge',
  );
  const highClassName = getClassName(
    'bpk-price-range__line--high',
    shouldShowPriceOnBoundaries && 'bpk-price-range__line--highLarge',
  );
  const mediumClassName = getClassName('bpk-price-range__line--medium');

  // TODO: LUNA-3184 set default to BUBBLE when deprecating `showPriceIndicator`
  const defaultMarkerType = showPriceIndicator ?? true ? MARKER_DISPLAY_TYPES.BUBBLE : MARKER_DISPLAY_TYPES.DOT;
  const markerType = marker?.type || defaultMarkerType;
  const shouldShowMarker = !!marker;
  const shouldShowBubble = shouldShowMarker && markerType === MARKER_DISPLAY_TYPES.BUBBLE;
  const shouldShowDot = shouldShowMarker && markerType === MARKER_DISPLAY_TYPES.DOT;
  const dotClassName = getClassName(
    `bpk-price-range__line--${type}`,
    'bpk-price-range__line--dot',
  );

  return (
    <div
      style={
        {
          '--low': calcPercentage(segments.low.percentage),
          '--high': calcPercentage(segments.high.percentage),
          '--prefilled-width': `${prefilledWidth}px`,
        } as React.CSSProperties
      }
      className={getClassName(
        'bpk-price-range',
        shouldShowPriceOnBoundaries && 'bpk-price-range--large',
      )}
      ref={linesRef}
      {...getDataComponentAttribute('PriceRange')}
    >
      {shouldShowBubble && (
        <div className={getClassName('bpk-price-range__marker')}>
          <BpkPriceMarker
            ref={indicatorRef}
            priceLabel={marker.price}
            type={type}
          />
        </div>
      )}
      <div className={linesClassName}>
        <div className={lowClassName} />
        <div className={mediumClassName} />
        <div className={highClassName} />
        {shouldShowDot && <div className={dotClassName} ref={indicatorRef} />}
      </div>
      {shouldShowPriceOnBoundaries && (
        <div className={getClassName('bpk-price-range__ranges')}>
          <BpkText textStyle={TEXT_STYLES.footnote}>
            {segments.low.price}
          </BpkText>
          <BpkText textStyle={TEXT_STYLES.footnote}>
            {segments.high.price}
          </BpkText>
        </div>
      )}
    </div>
  );
};

export default BpkPriceRange;