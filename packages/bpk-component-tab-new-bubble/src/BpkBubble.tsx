import React from 'react';
import BpkText from '../../bpk-component-text';
import { cssModules } from '../../bpk-react-utils';

import STYLES from './BpkBubble.module.scss';

const getClassName = cssModules(STYLES);

export type Props = {
  label: string;
};

const BpkBubble = ({ label }: Props) => (
  <span className={getClassName('bpk-bubble')}>
    <BpkText textStyle="label-3" tagName="span">
      {label}
    </BpkText>
    <span className={getClassName('bpk-bubble-arrow')} />
  </span>
);

export default BpkBubble;
