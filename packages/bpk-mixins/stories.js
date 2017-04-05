import React from 'react';
import { storiesOf } from '@kadira/storybook';

import './stories.scss';

storiesOf('bpk-mixins', module)
  .add('bpk-icon mixn', () => (
    <span className="example" />
  ));
