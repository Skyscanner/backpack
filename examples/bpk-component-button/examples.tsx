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
import LargeSortIcon from '../../packages/bpk-component-icon/lg/sort';
import SmallFilterIcon from '../../packages/bpk-component-icon/sm/filter';
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';
import SmallSortIcon from '../../packages/bpk-component-icon/sm/sort';
import { cssModules } from '../../packages/bpk-react-utils';
import {
  action,
  BpkDarkExampleWrapper,
  // @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
} from '../bpk-storybook-utils';

import STYLES from './BpkButtonStory.module.scss';

const AlignedSmallLongArrowRightIcon = withButtonAlignment(
  withRtlSupport(SmallLongArrowRightIcon),
);
const AlignedLargeLongArrowRightIcon = withLargeButtonAlignment(
  withRtlSupport(LargeLongArrowRightIcon),
);
const AlignedSmallSortIcon = withButtonAlignment(
  withRtlSupport(SmallSortIcon),
);
const AlignedLargeSortIcon = withButtonAlignment(
  withRtlSupport(LargeSortIcon),
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
        Find a flight <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped onClick={action('Button clicked')} {...rest}>
        <AlignedSmallLongArrowRightIcon /> Find here <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      &nbsp;
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Disabled
      </Wrapped>
      &nbsp;
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Disabled with icon <AlignedSmallLongArrowRightIcon />
      </Wrapped>
      <Wrapped disabled onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        <AlignedSmallLongArrowRightIcon />
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

ButtonStory.defaultProps = { className: null };

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
  <ButtonStory type={BUTTON_TYPES.link} wrapped={BpkButtonV2} {...props} />
);

const LinkImplicitExample = (props: any) => (
  <ButtonStory type={BUTTON_TYPES.link} wrapped={BpkButtonV2} implicit {...props} />
);

const LinkOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.linkOnDark}
      wrapped={BpkButtonV2}
      {...props}
    />
  </BpkDarkExampleWrapper>
);

const LinkImplicitOnDarkExample = (props: any) => (
  <BpkDarkExampleWrapper>
    <ButtonStory
      type={BUTTON_TYPES.linkOnDark}
      wrapped={BpkButtonV2}
      implicit
      {...props}
    />
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

const MixedExample = () => (
  <>
    <PrimaryExample />
    <PrimaryOnDarkExample />
    <PrimaryOnLightExample />
    <SecondaryExample />
    <SecondaryOnDarkExample />
    <DestructiveExample />
    <LinkExample />
    <LinkImplicitExample />
    <LinkOnDarkExample />
    <LinkImplicitOnDarkExample />
    <FeaturedExample />
    <FullWidthExample />
    <SubmitButtonExample />
  </>
);

const LinksExample = () => (
  <div className={getClassName('bpk-button-story-wrapper')}>
    {/* Link type - Standard underline */}
    <section className={getClassName('bpk-links-example-section')}>
      <h3 className={getClassName('bpk-links-example-title')}>
        Link (Standard underline)
      </h3>
      <div className={getClassName('bpk-links-example-row')}>
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Explore
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          Find a flight <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          <SmallFilterIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#">
          <AlignedSmallSortIcon /> Sort
        </BpkButtonV2>
      </div>
      <div className={getClassName('bpk-links-example-row')}>
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#" disabled>
          Disabled link
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#" disabled>
          Disabled with icon <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Have <AlignedSmallLongArrowRightIcon /> two <span><AlignedSmallLongArrowRightIcon /></span> icons
        </BpkButtonV2>
      </div>
      <div>
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Search
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link}>
          Search anywhere<AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} href="#" fullWidth>
          Full width<AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
      </div>
    </section>

    {/* Link type - Implicit underline (hover only) */}
    <section className={getClassName('bpk-links-example-section')}>
      <h3 className={getClassName('bpk-links-example-title')}>
        Link Implicit (Underline on hover)
      </h3>
      <div className={getClassName('bpk-links-example-row')}>
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#">
          Explore
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#">
          Find a flight <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#">
          <SmallFilterIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#">
          <AlignedSmallSortIcon /> Sort
        </BpkButtonV2>
      </div>
      <div className={getClassName('bpk-links-example-row')}>
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#" disabled>
          Disabled link
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="#" disabled>
          Disabled with icon <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
      </div>
      <div>
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit>
          Search
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit>
          Search anywhere <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
      </div>
    </section>

    {/* Link on dark - Standard underline */}
    <BpkDarkExampleWrapper>
      <section
        className={[
          getClassName('bpk-links-example-section'),
          getClassName('bpk-links-example-dark-section'),
        ].join(' ')}
      >
        <h3
          className={[
            getClassName('bpk-links-example-title'),
            getClassName('bpk-links-example-title--dark'),
          ].join(' ')}
        >
          Link on Dark (Standard underline)
        </h3>
        <div className={getClassName('bpk-links-example-row')}>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#">
            Explore
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#">
            Find a flight <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#">
          <SmallFilterIcon />
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#">
            <AlignedSmallSortIcon /> Sort
          </BpkButtonV2>
        </div>
        <div className={getClassName('bpk-links-example-row')}>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#" disabled>
            Disabled link
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} href="#" disabled>
            Disabled with icon <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
        </div>
        <div>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>
            Search
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark}>
            Search anywhere <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
        </div>
      </section>

      {/* Link on dark - Implicit underline (hover only) */}
      <section
        className={[
          getClassName('bpk-links-example-section'),
          getClassName('bpk-links-example-dark-section'),
        ].join(' ')}
      >
        <h3
          className={[
            getClassName('bpk-links-example-title'),
            getClassName('bpk-links-example-title--dark'),
          ].join(' ')}
        >
          Link on Dark Implicit (Underline on hover)
        </h3>
        <div className={getClassName('bpk-links-example-row')}>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#">
            Explore
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#">
            Find a flight <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#">
          <SmallFilterIcon />
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#">
            <AlignedSmallSortIcon /> Sort
          </BpkButtonV2>
        </div>
        <div className={getClassName('bpk-links-example-row')}>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#" disabled>
            Disabled link
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit href="#" disabled>
            Disabled with icon <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
        </div>
        <div>
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit>
            Search
          </BpkButtonV2>
          <span className={getClassName('bpk-links-example-spacer')} />
          <BpkButtonV2 type={BUTTON_TYPES.linkOnDark} implicit>
            Search anywhere <AlignedSmallLongArrowRightIcon />
          </BpkButtonV2>
        </div>
      </section>
    </BpkDarkExampleWrapper>

    {/* Large size variants */}
    <section className={getClassName('bpk-links-example-section')}>
      <h3 className={getClassName('bpk-links-example-title')}>
        Large Size Variants
      </h3>
      <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} href="#">
        Explore
      </BpkButtonV2>
      <span className={getClassName('bpk-links-example-spacer')} />
      <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} href="#">
        Find a flight <AlignedLargeLongArrowRightIcon />
      </BpkButtonV2>
      <span className={getClassName('bpk-links-example-spacer')} />
      <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} iconOnly href="#">
        <AlignedLargeSortIcon />
      </BpkButtonV2>
      <span className={getClassName('bpk-links-example-spacer')} />
      <BpkButtonV2 type={BUTTON_TYPES.link} size={SIZE_TYPES.large} href="#">
        <AlignedLargeLongArrowRightIcon /> Sort
      </BpkButtonV2>
    </section>

    {/* External link with target="_blank" */}
    <section className={getClassName('bpk-links-example-section')}>
      <h3 className={getClassName('bpk-links-example-title')}>
        External Links (target _blank)
      </h3>
      <div>
        <BpkButtonV2 type={BUTTON_TYPES.link} href="https://www.skyscanner.net" blank>
          External link <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
        <span className={getClassName('bpk-links-example-spacer')} />
        <BpkButtonV2 type={BUTTON_TYPES.link} implicit href="https://www.skyscanner.net" blank>
          External implicit <AlignedSmallLongArrowRightIcon />
        </BpkButtonV2>
      </div>
    </section>
  </div>
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
    <LinkImplicitExample href="#" />
    <LinkOnDarkExample href="#" />
    <LinkImplicitOnDarkExample href="#" />
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
  LinkImplicitExample,
  LinkOnDarkExample,
  LinkImplicitOnDarkExample,
  LinksExample,
  AnchorTagsExample,
  FullWidthExample,
  SubmitButtonExample,
  MixedExample,
};
