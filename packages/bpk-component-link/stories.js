import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { colorGray700, spacingBase } from 'bpk-tokens/tokens/base.es6';

import BpkLink, { BpkButtonLink } from './index';

storiesOf('bpk-component-link', module)
  .add('Example', () => (
    <div>
      <BpkLink href="#" onClick={action('#1 clicked')}>Link #1</BpkLink><br />
      <BpkLink href="#" onClick={action('#2 clicked')}>Link #2</BpkLink>
    </div>
  ))
  .add('Example (buttons)', () => (
    <div>
      <BpkButtonLink onClick={action('#1 clicked')}>Link #1</BpkButtonLink><br />
      <BpkButtonLink onClick={action('#2 clicked')}>Link #2</BpkButtonLink>
    </div>
  ))
  .add('Example (white)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkLink href="#" onClick={action('#1 clicked')} white>Link #1</BpkLink><br />
      <BpkLink href="#" onClick={action('#2 clicked')} white>Link #2</BpkLink>
    </div>
  ))
  .add('Example (white + buttons)', () => (
    <div style={{ backgroundColor: colorGray700, padding: spacingBase }}>
      <BpkButtonLink onClick={action('#1 clicked')} white>Link #1</BpkButtonLink><br />
      <BpkButtonLink onClick={action('#2 clicked')} white>Link #2</BpkButtonLink>
    </div>
  ));
