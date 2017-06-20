import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { cssModules } from 'bpk-react-utils';

import STYLES from './stories.scss';

const getClassName = cssModules(STYLES);

storiesOf('bpk-mixins', module)
  .add('bpk-icon-sm mixin', () => (
    <span className={getClassName('bpk-icon-sm__chart')} />
  ))
  .add('bpk-icon-lg mixin', () => (
    <span className={getClassName('bpk-icon-lg__chart')} />
  ))
  .add('bpk-icon mixin (small)', () => (
    <span className={getClassName('bpk-icon__chart--small')} />
  ))
  .add('bpk-icon mixin (large)', () => (
    <span className={getClassName('bpk-icon__chart--large')} />
  ));
