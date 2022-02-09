/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
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
import { action, BpkDarkExampleWrapper } from 'bpk-storybook-utils';

import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../bpk-component-icon';
import SmallLongArrowRightIcon from '../bpk-component-icon/sm/long-arrow-right';
import LargeLongArrowRightIcon from '../bpk-component-icon/lg/long-arrow-right';

import STYLES from './BpkButtonStory.module.scss';

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

const cssModules =
  (styles = {}) =>
  (className) =>
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
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped large onClick={action('Button clicked')} {...rest}>
        Button <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped
        large
        disabled
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Disabled
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly onClick={action('Button clicked')} {...rest}>
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly large onClick={action('Button clicked')} {...rest}>
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
  <BpkDarkExampleWrapper>
    <ButtonStory
      outline
      wrapped={BpkButton}
      className={getClassName('bpk-outline-layout')}
    />
  </BpkDarkExampleWrapper>
);

const ComponentButtonPrimaryExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory wrapped={BpkButtonPrimary} {...props} />
);
const ComponentButtonSecondaryExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory wrapped={BpkButtonSecondary} {...props} />
);
const ComponentButtonDestructiveExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory wrapped={BpkButtonDestructive} {...props} />
);
const ComponentButtonLinkExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory wrapped={BpkButtonLink} {...props} />
);
const ComponentButtonLinkWithPaddingExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory
    wrapped={(wrappedProps) => <BpkButtonLink padded {...wrappedProps} />}
    {...props}
  />
);
const ComponentButtonFeaturedExample = (props: {}) => (
  /* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */
  <ButtonStory wrapped={BpkButtonFeatured} {...props} />
);
const ComponentButtonOutlineExample = (props: {}) => (
  <BpkDarkExampleWrapper>
    {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
    <ButtonStory wrapped={BpkButtonOutline} {...props} />
  </BpkDarkExampleWrapper>
);

const MixedExample = () => (
  <>
    <ComponentButtonPrimaryExample />
    <ComponentButtonSecondaryExample />
    <ComponentButtonDestructiveExample />
    <ComponentButtonLinkExample />
    <ComponentButtonFeaturedExample />
    <ComponentButtonOutlineExample />
  </>
);

const AnchorTagsExample = () => (
  <>
    <ComponentButtonPrimaryExample href="#" />
    <ComponentButtonSecondaryExample href="#" />
    <ComponentButtonDestructiveExample href="#" />
    <ComponentButtonLinkExample href="#" />
    <ComponentButtonFeaturedExample href="#" />
    <ComponentButtonOutlineExample href="#" />
  </>
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
