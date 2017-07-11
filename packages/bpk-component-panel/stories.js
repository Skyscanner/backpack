import React from 'react';
import { storiesOf } from '@storybook/react';

import BpkPanel from './index';

storiesOf('bpk-component-panel', module)
  .add('Default', () => (
    <BpkPanel>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </BpkPanel>
  ))
  .add('Without padding', () => (
    <BpkPanel padded={false}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </BpkPanel >
  ))
  .add('Full width', () => (
    <BpkPanel fullWidth>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Pellentesque imperdiet lobortis tellus, non rhoncus erat tincidunt id.
      Pellentesque consectetur, dolor nec vulputate vehicula, ex metus mattis ante,
      non dictum mi ante eu arcu.
    </BpkPanel >
  ));
