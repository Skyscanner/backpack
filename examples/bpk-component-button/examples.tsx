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

import {
  BpkButtonV2,
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../packages/bpk-component-button';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import LargeLongArrowRightIcon from '../../packages/bpk-component-icon/lg/long-arrow-right';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import { cssModules } from '../../packages/bpk-react-utils';
import {
  action,
  BpkDarkExampleWrapper,
  // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from '../bpk-storybook-utils';

import STYLES from './BpkButtonStory.module.scss';

const RtlSmallLongArrowRightIcon = withRtlSupport(SmallLongArrowRightIcon);
const RtlLargeLongArrowRightIcon = withRtlSupport(LargeLongArrowRightIcon);

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);

const getClassName = cssModules(STYLES);

type StoryProps = Omit<Parameters<typeof BpkButtonV2>[0], 'children'> & {
  className?: string;
  wrapped: typeof BpkButtonV2;
};

const ButtonStory = ({ className, wrapped, ...rest }: StoryProps) => {
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
      <Wrapped
        iconOnly
        onClick={action('Button clicked')}
        aria-label="Button"
        {...rest}
      >
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        iconOnly
        size={SIZE_TYPES.large}
        onClick={action('Button clicked')}
        aria-label="Button"
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};
const PrimaryExample = (props: any) => (
  <ButtonStory wrapped={BpkButtonV2} {...props} />
);
const PrimaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.primaryOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.primaryOnLight}
    wrapped={BpkButtonV2}
    {...props}
  />
);
const SecondaryExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.secondary} wrapped={BpkButtonV2} {...props} />
);
const SecondaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.secondaryOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.destructive}
    wrapped={BpkButtonV2}
    {...props}
  />
);
const FeaturedExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.featured} wrapped={BpkButtonV2} {...props} />
);
const LinkExample = (props: any) => (
  <div className={getClassName('bpk-button-story-wrapper')}>
    {/* Default Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButtonV2>
    &nbsp;
    {/* Link with icon */}
    <BpkButtonV2 type={BUTTON_TYPES.link} onClick={action('Link clicked')} {...props}>
      Button <RtlSmallLongArrowRightIcon />
    </BpkButtonV2>
    &nbsp;
    {/* Implicit Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} implicit onClick={action('Link clicked')} {...props}>
      Button
    </BpkButtonV2>
    &nbsp;
    {/* Implicit Link with icon */}
    <BpkButtonV2 type={BUTTON_TYPES.link} implicit onClick={action('Link clicked')} {...props}>
      Button <RtlSmallLongArrowRightIcon />
    </BpkButtonV2>
    &nbsp;
    {/* Disabled Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Disabled
    </BpkButtonV2>
    &nbsp;
    {/* Large Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButtonV2>
    &nbsp;
    {/* Large Link with icon */}
    <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
      Button <RtlLargeLongArrowRightIcon />
    </BpkButtonV2>
    &nbsp;
    {/* The iconOnly Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
      <RtlSmallLongArrowRightIcon />
    </BpkButtonV2>
    &nbsp;
    {/* Large iconOnly Link */}
    <BpkButtonV2 type={BUTTON_TYPES.link} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
      <RtlLargeLongArrowRightIcon />
    </BpkButtonV2>
  </div>
);

const LinkOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <div className={getClassName('bpk-button-story-wrapper')}>
      {/* Default LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButtonV2>
      &nbsp;
      {/* LinkOnDark with icon */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} onClick={action('Link clicked')} {...props}>
        Button <RtlSmallLongArrowRightIcon />
      </BpkButtonV2>
      &nbsp;
      {/* Implicit LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit onClick={action('Link clicked')} {...props}>
        Button
      </BpkButtonV2>
      &nbsp;
      {/* Implicit LinkOnDark with icon */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit onClick={action('Link clicked')} {...props}>
        Button <RtlSmallLongArrowRightIcon />
      </BpkButtonV2>
      &nbsp;
      {/* Disabled LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Disabled
      </BpkButtonV2>
      &nbsp;
      {/* Large LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButtonV2>
      &nbsp;
      {/* Large LinkOnDark with icon */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
        Button <RtlLargeLongArrowRightIcon />
      </BpkButtonV2>
      &nbsp;
      {/* The iconOnly LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
        <RtlSmallLongArrowRightIcon />
      </BpkButtonV2>
      &nbsp;
      {/* Large iconOnly LinkOnDark */}
      <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
        <RtlLargeLongArrowRightIcon />
      </BpkButtonV2>
    </div>
  </BpkDarkExampleWrapper>
);

const FullWidthExample = (props: any) => (
  <BpkButtonV2 fullWidth {...props}>
    Full Width Button
  </BpkButtonV2>
);

const SubmitButtonExample = (props: any) => (
  <BpkButtonV2 submit {...props}>
    Submit Button
  </BpkButtonV2>
);

const LinksExamples = () => (
  <>
    <LinkExample />
    <LinkOnDarkExample />
  </>
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
    <SubmitButtonExample />
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
  LinksExamples,
  MixedExample,
  AnchorTagsExample,
  FullWidthExample,
  SubmitButtonExample,
};
