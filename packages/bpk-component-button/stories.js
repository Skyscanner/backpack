/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* @flow strict */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import LargeLongArrowRightIcon from '../bpk-component-icon/lg/long-arrow-right';

import STYLES from './BpkButtonStory.scss';

import BpkButton, {
  BpkButtonPrimary,
  BpkButtonSecondary,
  BpkButtonDestructive,
  BpkButtonLink,
  BpkButtonFeatured,
  BpkButtonOutline,
} from './index';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);

const cssModules = (styles = {}) => className =>
  styles[className] ? styles[className] : className;

const getClassName = cssModules(STYLES);

const ButtonStory = ({
  className,
  wrapped,
  ...rest
}: {
  className: ?string,
  wrapped: Object,
}) => {
  const Wrapped = wrapped;
  return (
    <div
      className={[getClassName('bpk-button-story-wrapper'), className].join(
        ' ',
      )}
    >
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped onClick={action('button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped disabled onClick={action('THIS SHOULD NOT HAPPEN')} {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large onClick={action('large button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped
        large
        disabled
        onClick={action('THIS SHOULD NOT HAPPEN')}
        {...rest}
      >
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly onClick={action('iconOnly button clicked')} {...rest}>
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped
        iconOnly
        large
        onClick={action('large iconOnly button clicked')}
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};

ButtonStory.defaultProps = { className: null };

storiesOf('bpk-component-button', module)
  .add('BpkButton (Primary)', () => <ButtonStory primary wrapped={BpkButton} />)
  .add('BpkButton (Secondary)', () => (
    <ButtonStory secondary wrapped={BpkButton} />
  ))
  .add('BpkButton (Destructive)', () => (
    <ButtonStory destructive wrapped={BpkButton} />
  ))
  .add('BpkButton (Link button)', () => (
    <ButtonStory link wrapped={BpkButton} />
  ))
  .add('BpkButton (Featured)', () => (
    <ButtonStory featured wrapped={BpkButton} />
  ))
  .add('BpkButton (Outline)', () => (
    <ButtonStory
      outline
      wrapped={BpkButton}
      className={getClassName('bpk-outline-layout')}
    />
  ))
  .add('Primary', () => <ButtonStory wrapped={BpkButtonPrimary} />)
  .add('Secondary', () => <ButtonStory wrapped={BpkButtonSecondary} />)
  .add('Destructive', () => <ButtonStory wrapped={BpkButtonDestructive} />)
  .add('Link button', () => <ButtonStory wrapped={BpkButtonLink} />)
  .add('Link button with padding', () => (
    <ButtonStory wrapped={props => <BpkButtonLink padded {...props} />} />
  ))
  .add('Featured', () => <ButtonStory wrapped={BpkButtonFeatured} />)
  .add('Outline', () => (
    <ButtonStory
      wrapped={BpkButtonOutline}
      className={getClassName('bpk-outline-layout')}
    />
  ))
  .add('Mixture', () => (
    <div>
      <ButtonStory wrapped={BpkButtonPrimary} />
      <ButtonStory wrapped={BpkButtonSecondary} />
      <ButtonStory wrapped={BpkButtonDestructive} />
      <ButtonStory wrapped={BpkButtonLink} />
      <ButtonStory wrapped={BpkButtonFeatured} />
      <ButtonStory
        wrapped={BpkButtonOutline}
        className={getClassName('bpk-outline-layout')}
      />
    </div>
  ))
  .add('Anchor tags', () => (
    <div>
      <ButtonStory wrapped={BpkButtonPrimary} href="#" />
      <ButtonStory wrapped={BpkButtonSecondary} href="#" />
      <ButtonStory wrapped={BpkButtonDestructive} href="#" />
      <ButtonStory wrapped={BpkButtonLink} href="#" />
      <ButtonStory wrapped={BpkButtonFeatured} href="#" />
      <ButtonStory
        wrapped={BpkButtonOutline}
        className={getClassName('bpk-outline-layout')}
        href="#"
      />
    </div>
  ));
