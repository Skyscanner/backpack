import React from 'react';
import { storiesOf } from '@storybook/react';
import { colorGray700, spacingXxl } from 'bpk-tokens/tokens/base.es6';

import BpkBadge from './index';

const DockedContainer = props => <div
  {...props}
  style={{ backgroundColor: colorGray700, minHeight: spacingXxl, position: 'relative' }}
/>;

storiesOf('bpk-component-badge', module)
  .add('Default', () => (
    <div>
      This is a badge <BpkBadge>Promocionado</BpkBadge>
    </div>
  ))
  .add('Centered', () => (
    <div>
      This is a badge <BpkBadge centered>Promocionado</BpkBadge>
    </div>
  ))
  .add('Docked right', () => (
    <DockedContainer>
      <BpkBadge docked="right">Promocionado</BpkBadge>
    </DockedContainer>
  ))
  .add('Docked left', () => (
    <DockedContainer>
      <BpkBadge docked="left">Promocionado</BpkBadge>
    </DockedContainer>
  ));
