import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BpkBlockquote from './index';

storiesOf('bpk-component-blockquote', module)
  .add('Example', () => (
    <BpkBlockquote>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum
      sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </BpkBlockquote>
  ));
