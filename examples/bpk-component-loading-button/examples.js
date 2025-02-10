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

import * as STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

type Props = {};

type State = {
  loading: boolean,
};

class InteractiveExample extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    return (
      // $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'.
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
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped
        iconPosition={ICON_POSITION.LEADING}
        onClick={action('Button leading icon clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Loading
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
      <Wrapped iconOnly onClick={action('Button iconOnly clicked')} {...rest}>
        <span className="visually-hidden">Search</span>
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
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
      <Wrapped large onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
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
    <InteractiveExample large>Search</InteractiveExample>
  </div>
);
const PrimaryExample = () => <LoadingButtonStory wrapped={BpkLoadingButton} />;
const PrimaryOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <LoadingButtonStory primaryOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const PrimaryOnLightExample = () => (
  <LoadingButtonStory primaryOnLight wrapped={BpkLoadingButton} />
);
const SecondaryExample = () => (
  <LoadingButtonStory secondary wrapped={BpkLoadingButton} />
);
const SecondaryOnDarkExample = () => (
  <BpkDarkExampleWrapper>
    <LoadingButtonStory secondaryOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const DestructiveExample = () => (
  <LoadingButtonStory destructive wrapped={BpkLoadingButton} />
);
const LinkButtonExample = () => (
  <LoadingButtonStory link wrapped={BpkLoadingButton} />
);
const LinkOnDarkButtonExample = () => (
  <BpkDarkExampleWrapper>
    <LoadingButtonStory linkOnDark wrapped={BpkLoadingButton} />
  </BpkDarkExampleWrapper>
);
const FeaturedExample = () => (
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
    <PrimaryExample href="#" />
    <PrimaryOnLightExample href="#" />
    <PrimaryOnDarkExample href="#" />
    <SecondaryExample href="#" />
    <SecondaryOnDarkExample href="#" />
    <DestructiveExample href="#" />
    <LinkButtonExample href="#" />
    <LinkOnDarkButtonExample href="#" />
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
