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

import BpkButton, {
  BUTTON_TYPES,
  SIZE_TYPES,
} from '../../packages/bpk-component-button';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import LargeLightningIcon from '../../packages/bpk-component-icon/lg/lightning';
import LargeLongArrowRightIcon from '../../packages/bpk-component-icon/lg/long-arrow-right';
import SmallLightningIcon from '../../packages/bpk-component-icon/sm/lightning';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import { cssModules } from '../../packages/bpk-react-utils';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import BpkThemeProvider from '../../packages/bpk-theming';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';

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

type StoryProps = Omit<Parameters<typeof BpkButton>[0], 'children'> & {
  className?: string;
  wrapped: typeof BpkButton;
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
      <Wrapped trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped leadingIcon={<SmallLightningIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Button
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
        loading
        size={SIZE_TYPES.large}
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        trailingIcon={<RtlLargeLongArrowRightIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        leadingIcon={<LargeLightningIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        size={SIZE_TYPES.large}
        leadingIcon={<LargeLightningIcon />}
        trailingIcon={<RtlLargeLongArrowRightIcon />}
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
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
        loading
        iconOnly
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        aria-label="Loading"
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
      <Wrapped
        loading
        iconOnly
        size={SIZE_TYPES.large}
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        aria-label="Loading"
        {...rest}
      >
        <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
    </div>
  );
};

ButtonStory.defaultProps = { className: null };


const PrimaryExample = (props: any) => (
  <ButtonStory wrapped={BpkButton} {...props} />
);
const PrimaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.primaryOnDark}
      wrapped={BpkButton}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.primaryOnLight}
    wrapped={BpkButton}
    {...props}
  />
);
const SecondaryExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.secondary} wrapped={BpkButton} {...props} />
);
const SecondaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.secondaryOnDark}
      wrapped={BpkButton}
      {...props}
    />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = (props: any) => (
  <ButtonStory
    type={BUTTON_TYPES.destructive}
    wrapped={BpkButton}
    {...props}
  />
);
const FeaturedExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.featured} wrapped={BpkButton} {...props} />
);
const LinkExample = (props: any) => (
  <div className={getClassName('bpk-button-story-wrapper')}>
    {/* Default Link */}
    <BpkButton type={BUTTON_TYPES.link} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Loading Link */}
    <BpkButton type={BUTTON_TYPES.link} loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link */}
    <BpkButton type={BUTTON_TYPES.link} implicit onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Implicit Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} implicit leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Disabled Link */}
    <BpkButton type={BUTTON_TYPES.link} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Disabled
    </BpkButton>
    &nbsp;
    {/* Large Link */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Loading Link */}
    <BpkButton type={BUTTON_TYPES.link} loading size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with leading icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* Large Link with leading and trailing icon */}
    <BpkButton type={BUTTON_TYPES.link} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
      Button
    </BpkButton>
    &nbsp;
    {/* iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
      <RtlSmallLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Loading iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} loading iconOnly onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Loading icon link" {...props}>
      <RtlSmallLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Large iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
      <RtlLargeLongArrowRightIcon />
    </BpkButton>
    &nbsp;
    {/* Large loading iconOnly Link */}
    <BpkButton type={BUTTON_TYPES.link} loading iconOnly size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Large loading icon link" {...props}>
      <RtlLargeLongArrowRightIcon />
    </BpkButton>
  </div>
);

const LinkOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <div className={getClassName('bpk-button-story-wrapper')}>
      {/* Default LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Loading LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit leadingIcon={<SmallLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Implicit LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} implicit leadingIcon={<SmallLightningIcon />} trailingIcon={<RtlSmallLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Disabled LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Disabled
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large Loading LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with leading icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* Large LinkOnDark with leading and trailing icon */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} size={SIZE_TYPES.large} leadingIcon={<LargeLightningIcon />} trailingIcon={<RtlLargeLongArrowRightIcon />} onClick={action('Link clicked')} {...props}>
        Button
      </BpkButton>
      &nbsp;
      {/* iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly onClick={action('Link clicked')} aria-label="Icon link" {...props}>
        <RtlSmallLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Loading iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading iconOnly onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Loading icon link" {...props}>
        <RtlSmallLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Large iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} iconOnly size={SIZE_TYPES.large} onClick={action('Link clicked')} aria-label="Large icon link" {...props}>
        <RtlLargeLongArrowRightIcon />
      </BpkButton>
      &nbsp;
      {/* Large loading iconOnly LinkOnDark */}
      <BpkButton type={BUTTON_TYPES.linkOnDark} loading iconOnly size={SIZE_TYPES.large} onClick={action('THIS SHOULD NEVER HAPPEN')} aria-label="Large loading icon link" {...props}>
        <RtlLargeLongArrowRightIcon />
      </BpkButton>
    </div>
  </BpkDarkExampleWrapper>
);

const FullWidthExample = (props: any) => (
  <BpkButton fullWidth {...props}>
    Full Width Button
  </BpkButton>
);

const SubmitButtonExample = (props: any) => (
  <BpkButton submit {...props}>
    Submit Button
  </BpkButton>
);

const ThemedBorderRadiusExample = () => (
  <BpkThemeProvider
    theme={{ buttonBorderRadius: '999px' }}
    themeAttributes={['buttonBorderRadius']}
  >
    <PrimaryExample />
  </BpkThemeProvider>
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
    <LinkExample />
    <LinkOnDarkExample />
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
  ThemedBorderRadiusExample,
};
