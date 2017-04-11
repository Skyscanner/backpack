import React from 'react';
import { storiesOf } from '@kadira/storybook';

import './stories.scss';

storiesOf('bpk-mixins', module)
  .add('bpk-icon-sm mixin', () => (
    <span className="bpk-icon-sm__chart" />
  ))
  .add('bpk-icon-lg mixin', () => (
    <span className="bpk-icon-lg__chart" />
  ))
  .add('bpk-icon mixin (small)', () => (
    <span className="bpk-icon__chart--small" />
  ))
  .add('bpk-icon mixin (large)', () => (
    <span className="bpk-icon__chart--large" />
  ));
