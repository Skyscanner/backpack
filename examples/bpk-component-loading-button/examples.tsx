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

import { Component } from 'react';

import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import BaggageIconLg from '../../packages/bpk-component-icon/lg/baggage';
import BaggageIconSm from '../../packages/bpk-component-icon/sm/baggage';
import BpkLoadingButton, {
  ICON_POSITION,
} from '../../packages/bpk-component-loading-button';
import { cssModules } from '../../packages/bpk-react-utils';
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

type Props = {};

type State = {
  loading: boolean,
};

class InteractiveExample extends Component<Props, State> {
  // @ts-expect-error TS(7006) FIXME: Parameter 'props' implicitly has an 'any' type.
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
      // @ts-expect-error TS(2741) FIXME: Property 'children' is missing in type '{ onClick:... Remove this comment to see the full error message
      <BpkLoadingButton
        onClick={() => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
        }}
        loading={this.state.loading}
        {...this.props}
      />
    );
  }
}

const LoadingButtonStory = ({
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
      className={[
        getClassName('bpk-loading-button-example-wrapper'),
        className,
      ].join(' ')}
    >
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        iconPosition={ICON_POSITION.LEADING}
        onClick={action('Button leading icon clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Loading
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped iconOnly onClick={action('Button iconOnly clicked')} {...rest}>
        <span className="visually-hidden">Search</span>
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        iconOnly
        loading
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        <span className="visually-hidden">Search</span>
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped large onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        iconPosition={ICON_POSITION.LEADING}
        large
        onClick={action('Button clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        large
        loading
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        Loading
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        iconOnly
        large
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        <span className="visually-hidden">Search</span>
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      // @ts-expect-error TS(2604): JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      // @ts-expect-error TS(2604) FIXME: JSX element type 'Wrapped' does not have any const... Remove this comment to see the full error message
      <Wrapped
        iconOnly
        large
        loading
        onClick={action('THIS SHOULD NEVER HAPPEN')}
        {...rest}
      >
        <span className="visually-hidden">Search</span>
      </Wrapped>
    </div>
  );
};

LoadingButtonStory.defaultProps = { className: null };

const DocsPrimaryExample = () => (
  <div>
    <InteractiveExample>Search</InteractiveExample>
    &nbsp;
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'children'.
    // @ts-expect-error TS(2322): Type '{ children: string; large: true; }' is not a... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ children: string; large: true; }' is not a... Remove this comment to see the full error message
    <InteractiveExample large>Search</InteractiveExample>
  </div>
);
const PrimaryExample = () => <LoadingButtonStory wrapped={BpkLoadingButton} />;
const PrimaryOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'primaryOnDark'.
    // @ts-expect-error TS(2322): Type '{ primaryOnDark: true; wrapped: (props: Load... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ primaryOnDark: true; wrapped: (props: Load... Remove this comment to see the full error message
    <LoadingButtonStory primaryOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ primaryOnLight: true; wrapped: (props: Loa... Remove this comment to see the full error message
  <LoadingButtonStory primaryOnLight wrapped={BpkLoadingButton} />
);
const SecondaryExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ secondary: true; wrapped: (props: LoadingP... Remove this comment to see the full error message
  <LoadingButtonStory secondary wrapped={BpkLoadingButton} />
);
const SecondaryOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'secondaryOnDark'.
    // @ts-expect-error TS(2322): Type '{ secondaryOnDark: true; wrapped: (props: Lo... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ secondaryOnDark: true; wrapped: (props: Lo... Remove this comment to see the full error message
    <LoadingButtonStory secondaryOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ destructive: true; wrapped: (props: Loadin... Remove this comment to see the full error message
  <LoadingButtonStory destructive wrapped={BpkLoadingButton} />
);
const LinkButtonExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ link: true; wrapped: (props: LoadingProps)... Remove this comment to see the full error message
  <LoadingButtonStory link wrapped={BpkLoadingButton} />
);
const LinkOnDarkButtonExample = () => (
  <BpkDarkExampleWrapper>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'linkOnDark'.
    // @ts-expect-error TS(2322): Type '{ linkOnDark: true; wrapped: (props: Loading... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ linkOnDark: true; wrapped: (props: Loading... Remove this comment to see the full error message
    <LoadingButtonStory linkOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const FeaturedExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ featured: true; wrapped: (props: LoadingPr... Remove this comment to see the full error message
  <LoadingButtonStory featured wrapped={BpkLoadingButton} />
);
const MixtureExample = () => (
  <div>
    <PrimaryExample />
    <PrimaryOnLightExample />
    <PrimaryOnDarkExample />
    <SecondaryExample />
    <SecondaryOnDarkExample />
    <DestructiveExample />
    <LinkButtonExample />
    <LinkOnDarkButtonExample />
    <FeaturedExample />
  </div>
);
const AnchorTagsExample = () => (
  <div>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <PrimaryExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <PrimaryOnLightExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <PrimaryOnDarkExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <SecondaryExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <SecondaryOnDarkExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <DestructiveExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <LinkButtonExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <LinkOnDarkButtonExample href="#" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'href'.
    // @ts-expect-error TS(2322): Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ href: string; }' is not assignable to type... Remove this comment to see the full error message
    <FeaturedExample href="#" />
  </div>
);
const CustomIconExample = () => {
  const AlignedIconSm = withButtonAlignment(withRtlSupport(BaggageIconSm));
  const iconSm = <AlignedIconSm />;
  const AlignedIconLg = withLargeButtonAlignment(withRtlSupport(BaggageIconLg));
  const iconLg = <AlignedIconLg />;
  return (
    <div>
      <BpkLoadingButton icon={iconSm} onClick={action('primary clicked')}>
        Button
      </BpkLoadingButton>
      <BpkLoadingButton
        disabled
        iconDisabled={iconSm}
        onClick={action('THIS SHOULD NOT HAPPEN')}
      >
        Disabled
      </BpkLoadingButton>
      <BpkLoadingButton
        loading
        iconLoading={iconSm}
        onClick={action('THIS SHOULD NOT HAPPEN')}
      >
        Loading
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        iconOnly
        icon={iconSm}
        onClick={action('iconOnly clicked')}
      >
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        large
        icon={iconLg}
        onClick={action('large primary clicked')}
      >
        Button
      </BpkLoadingButton>
      <BpkLoadingButton
        large
        disabled
        iconDisabled={iconLg}
        onClick={action('THIS SHOULD NOT HAPPEN')}
      >
        Disabled
      </BpkLoadingButton>
      <BpkLoadingButton
        large
        loading
        iconLoading={iconLg}
        onClick={action('THIS SHOULD NOT HAPPEN')}
      >
        Loading
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        large
        iconOnly
        icon={iconLg}
        onClick={action('large iconOnly clicked')}
      >
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>
  );
};
const VisualExample = () => (
  <div>
    <div>
      <BpkLoadingButton loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton iconOnly loading onClick={action('iconOnly clicked')}>
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        large
        iconOnly
        loading
        onClick={action('iconOnly clicked')}
      >
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>
    <div>
      <BpkLoadingButton link loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        link
        iconOnly
        loading
        onClick={action('iconOnly clicked')}
      >
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton
        link
        large
        iconOnly
        loading
        onClick={action('iconOnly clicked')}
      >
        <span className="visually-hidden">Search</span>
      </BpkLoadingButton>
    </div>
    <div>
      <BpkDarkExampleWrapper>
        <BpkLoadingButton linkOnDark loading onClick={action('button clicked')}>
          Search
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton
          linkOnDark
          iconOnly
          loading
          onClick={action('iconOnly clicked')}
        >
          <span className="visually-hidden">Search</span>
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton
          linkOnDark
          large
          loading
          onClick={action('button clicked')}
        >
          Search
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton
          linkOnDark
          large
          iconOnly
          loading
          onClick={action('iconOnly clicked')}
        >
          <span className="visually-hidden">Search</span>
        </BpkLoadingButton>
      </BpkDarkExampleWrapper>
    </div>
  </div>
);
const SubmitExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ submit: true; wrapped: (props: LoadingProp... Remove this comment to see the full error message
  <LoadingButtonStory submit wrapped={BpkLoadingButton} />
);

export {
  DocsPrimaryExample,
  PrimaryExample,
  PrimaryOnDarkExample,
  PrimaryOnLightExample,
  SecondaryExample,
  SecondaryOnDarkExample,
  DestructiveExample,
  LinkButtonExample,
  LinkOnDarkButtonExample,
  FeaturedExample,
  MixtureExample,
  AnchorTagsExample,
  CustomIconExample,
  VisualExample,
  SubmitExample,
};
