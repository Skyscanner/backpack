import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';

import BpkText, { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { cssModules } from '../../bpk-react-utils';

import type { MarkerType } from './common-types';

import STYLES from './BpkPriceMarker.module.scss';

const getClassName = cssModules(STYLES);

type Props = {
  priceLabel: string;
  type: MarkerType;
};

const BpkPriceMarker = (
  { priceLabel, type }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) => (
  <div className={getClassName('bpk-price-marker')} ref={ref}>
    <div
      className={getClassName(
        'bpk-price-marker__marker',
        `bpk-price-marker--${type}`,
      )}
    >
      <BpkText textStyle={TEXT_STYLES.label2}>{priceLabel}</BpkText>
    </div>
    <div
      className={getClassName(
        'bpk-price-marker__arrow',
        `bpk-price-marker--${type}`,
      )}
    />
  </div>
);

export default forwardRef(BpkPriceMarker);
