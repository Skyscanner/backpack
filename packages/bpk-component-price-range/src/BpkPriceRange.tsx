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
import { cssModules } from '../../bpk-react-utils';

import BpkPriceMarker from './BpkPriceMarker';
import { MARKER_TYPES } from './common-types';

import type { MarkerType } from './common-types';

import STYLES from './BpkPriceRange.module.scss';

const getClassName = cssModules(STYLES);

type Marker = {
  price: string;
  percentage: number;
};

export type Props = {
  min?: number;
  max?: number;
  showPriceIndicator?: boolean;
  marker: Marker;
  segments: {
    low: Marker;
    high: Marker;
  };
};

const BpkPriceRange = ({
  marker,
  max = 100,
  min = 0,
  segments,
  showPriceIndicator = true,
}: Props) => {
  const linesRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [linesWidth, setLinesWidth] = useState(0);
  const [prefilledWidth, setPrefilledWidth] = useState(0);
  const calcPercentage = (current: number) =>
    (clamp(current, min, max) - min) / (max - min);
  const indicatorPercent = calcPercentage(marker.percentage);

  let type: MarkerType;
  if (marker.percentage < segments.low.percentage) {
    type = MARKER_TYPES.LOW;
  } else if (marker.percentage > segments.high.percentage) {
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
    if (indicatorRef.current && linesWidth) {
      const estimatedWidth =
        indicatorPercent * linesWidth - indicatorRef.current.scrollWidth / 2;
      const maxPrefilledWidth = linesWidth - indicatorRef.current.scrollWidth;
      const actualPrefilledWidth = clamp(estimatedWidth, 0, maxPrefilledWidth);

      setPrefilledWidth(actualPrefilledWidth);
    }
  }, [indicatorPercent, linesWidth]);

  const linesClassName = getClassName(
    'bpk-price-range__lines',
    showPriceIndicator && 'bpk-price-range__lines--large',
  );
  const lowClassName = getClassName(
    'bpk-price-range__line--low',
    showPriceIndicator && 'bpk-price-range__line--lowLarge',
  );
  const highClassName = getClassName(
    'bpk-price-range__line--high',
    showPriceIndicator && 'bpk-price-range__line--highLarge',
  );
  const mediumClassName = getClassName('bpk-price-range__line--medium');
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
        showPriceIndicator && 'bpk-price-range--large',
      )}
      ref={linesRef}
    >
      {showPriceIndicator && (
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
        {!showPriceIndicator && (
          <div className={dotClassName} ref={indicatorRef} />
        )}
      </div>
      {showPriceIndicator && (
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
