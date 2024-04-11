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

import { BpkButtonV2 } from '../../packages/bpk-component-button';
import {
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../packages/bpk-component-button/src/BpkButtonV2/common-types';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import LargeLongArrowRightIcon from '../../packages/bpk-component-icon/lg/long-arrow-right';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

import STYLES from './BpkButtonStory.module.scss';

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
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        disabled
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped iconOnly onClick={action('Button clicked')} {...rest}>
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        iconOnly
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};

ButtonStory.defaultProps = { className: null };

const PrimaryExample = (props: {}) => (
  <ButtonStory wrapped={BpkButtonV2} {...props} />
);
const PrimaryOnDarkExample = (props: {}) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.primaryOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = (props: {}) => (
  <ButtonStory
    type={BUTTON_TYPES.primaryOnLight}
    wrapped={BpkButtonV2}
    {...props}
  />
);
const SecondaryExample = (props: {}) => (
  <ButtonStory type={BUTTON_TYPES.secondary} wrapped={BpkButtonV2} {...props} />
);
const SecondaryOnDarkExample = (props: {}) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.secondaryOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = (props: {}) => (
  <ButtonStory
    type={BUTTON_TYPES.destructive}
    wrapped={BpkButtonV2}
    {...props}
  />
);
const FeaturedExample = (props: {}) => (
  <ButtonStory type={BUTTON_TYPES.featured} wrapped={BpkButtonV2} {...props} />
);
const LinkExample = (props: {}) => (
  <ButtonStory type={BUTTON_TYPES.link} wrapped={BpkButtonV2} {...props} />
);
const LinkOnDarkExample = (props: {}) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.linkOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);

const FullWidthExample = (props: {}) => (
  <BpkButtonV2 fullWidth {...props}>Full Width Button</BpkButtonV2>
);

const MixedExample = () => (
  <>
    <PrimaryExample />
    <PrimaryOnDarkExample />
    <PrimaryOnLightExample />
    <SecondaryExample />
    <SecondaryOnDarkExample />
    <DestructiveExample />
    <LinkExample />
    <LinkOnDarkExample />
    <FeaturedExample />
    <FullWidthExample />
  </>
);

const AnchorTagsExample = () => (
  <>
    <PrimaryExample href="#" />
    <PrimaryOnDarkExample href="#" />
    <PrimaryOnLightExample href="#" />
    <SecondaryExample href="#" />
    <SecondaryOnDarkExample href="#" />
    <DestructiveExample href="#" />
    <FeaturedExample href="#" />
    <LinkExample href="#" />
    <LinkOnDarkExample href="#" />
  </>
);

export {
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  FeaturedExample,
  LinkExample,
  LinkOnDarkExample,
  MixedExample,
  AnchorTagsExample,
  FullWidthExample,
};
