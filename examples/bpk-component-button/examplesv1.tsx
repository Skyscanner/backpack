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

import BpkButton from '../../packages/bpk-component-button';
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

import * as STYLES from './BpkButtonStory.module.scss';

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
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest} disabled>
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest} large>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest} large>
        Button <AlignedLargeLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
        large
        disabled
      >
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest} iconOnly>
        <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest} iconOnly large>
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
    <ButtonStory primaryOnDark wrapped={BpkButton} {...props} />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = (props: any) => (
  <ButtonStory primaryOnLight wrapped={BpkButton} {...props} />
);
const SecondaryExample = (props: any) => (
  <ButtonStory secondary wrapped={BpkButton} {...props} />
);
const SecondaryOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory secondaryOnDark wrapped={BpkButton} {...props} />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = (props: any) => (
  <ButtonStory destructive wrapped={BpkButton} {...props} />
);
const FeaturedExample = (props: any) => (
  <ButtonStory featured wrapped={BpkButton} {...props} />
);
const LinkExample = (props: any) => (
  <ButtonStory link wrapped={BpkButton} {...props} />
);
const LinkOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory linkOnDark wrapped={BpkButton} {...props} />
  </BpkDarkExampleWrapper>
);

// eslint-disable-next-line import/prefer-default-export
export const MixedExample = () => (
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
  </>
);
