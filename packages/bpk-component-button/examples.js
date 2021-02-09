/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
      <Wrapped {...rest}>Button</Wrapped>
      &nbsp;
      <Wrapped {...rest}>
        Button <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped disabled {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large {...rest}>
        Button <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large disabled {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly {...rest}>
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly large {...rest}>
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};

ButtonStory.defaultProps = { className: null };

const PrimaryExample = () => <ButtonStory primary wrapped={BpkButton} />;
const SecondaryExample = () => <ButtonStory secondary wrapped={BpkButton} />;
const DestructiveExample = () => (
  <ButtonStory destructive wrapped={BpkButton} />
);
const LinkExample = () => <ButtonStory link wrapped={BpkButton} />;
const FeaturedExample = () => <ButtonStory featured wrapped={BpkButton} />;
const OutlineExample = () => (
  <ButtonStory
    outline
    wrapped={BpkButton}
    className={getClassName('bpk-outline-layout')}
  />
);

const ComponentButtonPrimaryExample = () => (
  <ButtonStory wrapped={BpkButtonPrimary} />
);
const ComponentButtonSecondaryExample = () => (
  <ButtonStory wrapped={BpkButtonSecondary} />
);
const ComponentButtonDestructiveExample = () => (
  <ButtonStory wrapped={BpkButtonDestructive} />
);
const ComponentButtonLinkExample = () => (
  <ButtonStory wrapped={BpkButtonLink} />
);
const ComponentButtonLinkWithPaddingExample = () => (
  <ButtonStory wrapped={props => <BpkButtonLink padded {...props} />} />
);
const ComponentButtonFeaturedExample = () => (
  <ButtonStory wrapped={BpkButtonFeatured} />
);
const ComponentButtonOutlineExample = () => (
  <ButtonStory
    wrapped={BpkButtonOutline}
    className={getClassName('bpk-outline-layout')}
  />
);

const MixedExample = () => (
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
);

const AnchorTagsExample = () => (
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
);

export {
  PrimaryExample,
  SecondaryExample,
  DestructiveExample,
  LinkExample,
  FeaturedExample,
  OutlineExample,
  ComponentButtonPrimaryExample,
  ComponentButtonSecondaryExample,
  ComponentButtonDestructiveExample,
  ComponentButtonLinkExample,
  ComponentButtonLinkWithPaddingExample,
  ComponentButtonFeaturedExample,
  ComponentButtonOutlineExample,
  MixedExample,
  AnchorTagsExample,
};
