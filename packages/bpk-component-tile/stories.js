import React from 'react';
import { storiesOf } from '@kadira/storybook';
import { colors } from '../bpk-tokens/tokens/base.es6';

import BpkTile from './index';

storiesOf('bpk-component-tile', module)
  .add('Using Icons in Code', () => (
    <BpkTile
      heading="Using icons in code."
      imageSource={'https://www.w3schools.com/css/trolltunga.jpg'}
      backgroundColor={colors.colorGreen500}
      dark
    />
  ))
  .add('Using icons in sketch.', () => (
    <BpkTile
      heading="Using icons in sketch."
      imageSource={'https://www.w3schools.com/css/trolltunga.jpg'}
      backgroundColor={colors.colorRed500}
    />
  ))
  .add('Illustration', () => (
    <BpkTile
      heading="Illustration guidelines and best practices."
      imageSource={'https://www.w3schools.com/css/trolltunga.jpg'}
      backgroundColor={colors.colorwhite}
    />
  ))
  .add('Illustration examples', () => (
    <BpkTile
      heading="Illustration examples"
      imageSource={'https://www.w3schools.com/css/trolltunga.jpg'}
      backgroundColor={colors.colorwhite}
    />
  ))
  .add('Copywriting', () => (
    <BpkTile
      heading="Illustration guidelines and best practices"
      imageSource={'https://www.w3schools.com/css/trolltunga.jpg'}
      backgroundColor={colors.colorYellow500}
    />
  ));
