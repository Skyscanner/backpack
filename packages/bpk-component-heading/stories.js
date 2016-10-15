import React from 'react';
import { storiesOf } from '@kadira/storybook';

import BpkHeading from './index';

storiesOf('bpk-component-heading', module)
  .add('Examples', () => (
    <div>
      <BpkHeading level="h1">Heading 1</BpkHeading>
      <BpkHeading level="h2">Heading 2</BpkHeading>
      <BpkHeading level="h3">Heading 3</BpkHeading>
      <BpkHeading level="h4">Heading 4</BpkHeading>
      <BpkHeading level="h5">Heading 5</BpkHeading>
      <BpkHeading level="h6">Heading 6</BpkHeading>
    </div>
  ));
