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

import { Component } from 'react';

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import { action, BpkDarkExampleWrapper } from '../../../examples/bpk-storybook-utils';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../bpk-component-icon';
import BaggageIconLg from '../../bpk-component-icon/lg/baggage';
import BaggageIconSm from '../../bpk-component-icon/sm/baggage';
import BpkVisuallyHidden from '../../bpk-component-visually-hidden';
import { cssModules } from '../../bpk-react-utils';

import BpkLoadingButton, { ICON_POSITION } from './BpkLoadingButton';

import type { Meta } from '@storybook/react';

import STYLES from './BpkLoadingButton.stories.module.scss';

const getClassName = cssModules(STYLES);

class InteractiveExample extends Component<any, { loading: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { loading: false };
  }

  render() {
    return (
      <BpkLoadingButton
        onClick={() => {
          this.setState({ loading: true });
          setTimeout(() => {
            this.setState({ loading: false });
          }, 2000);
        }}
        loading={this.state.loading}
        {...this.props}
      >
        {this.props.children}
      </BpkLoadingButton>
    );
  }
}

const LoadingButtonStory = ({
  className,
  wrapped,
  ...rest
}: {
  className?: string | null;
  wrapped: any;
  [key: string]: any;
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
      <Wrapped onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped
        iconPosition={ICON_POSITION.LEADING}
        onClick={action('Button leading icon clicked')}
        {...rest}
      >
        Button
      </Wrapped>
      &nbsp;
      <Wrapped loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Loading
      </Wrapped>
      &nbsp;
      <Wrapped iconOnly onClick={action('Button iconOnly clicked')} {...rest}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </Wrapped>
      &nbsp;
      <Wrapped iconOnly loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </Wrapped>
      &nbsp;
      <Wrapped large onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped iconPosition={ICON_POSITION.LEADING} large onClick={action('Button clicked')} {...rest}>
        Button
      </Wrapped>
      &nbsp;
      <Wrapped large loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        Loading
      </Wrapped>
      &nbsp;
      <Wrapped iconOnly large onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </Wrapped>
      &nbsp;
      <Wrapped iconOnly large loading onClick={action('THIS SHOULD NEVER HAPPEN')} {...rest}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </Wrapped>
    </div>
  );
};

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
    <LoadingButtonStory href="#" wrapped={BpkLoadingButton} />
    <LoadingButtonStory href="#" primaryOnLight wrapped={BpkLoadingButton} />
    <BpkDarkExampleWrapper>
      <LoadingButtonStory href="#" primaryOnDark wrapped={BpkLoadingButton} />
    </BpkDarkExampleWrapper>
    <LoadingButtonStory href="#" secondary wrapped={BpkLoadingButton} />
    <BpkDarkExampleWrapper>
      <LoadingButtonStory href="#" secondaryOnDark wrapped={BpkLoadingButton} />
    </BpkDarkExampleWrapper>
    <LoadingButtonStory href="#" destructive wrapped={BpkLoadingButton} />
    <LoadingButtonStory href="#" link wrapped={BpkLoadingButton} />
    <BpkDarkExampleWrapper>
      <LoadingButtonStory href="#" linkOnDark wrapped={BpkLoadingButton} />
    </BpkDarkExampleWrapper>
    <LoadingButtonStory href="#" featured wrapped={BpkLoadingButton} />
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
      <BpkLoadingButton disabled iconDisabled={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}>
        Disabled
      </BpkLoadingButton>
      <BpkLoadingButton loading iconLoading={iconSm} onClick={action('THIS SHOULD NOT HAPPEN')}>
        Loading
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton iconOnly icon={iconSm} onClick={action('iconOnly clicked')}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large icon={iconLg} onClick={action('large primary clicked')}>
        Button
      </BpkLoadingButton>
      <BpkLoadingButton large disabled iconDisabled={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}>
        Disabled
      </BpkLoadingButton>
      <BpkLoadingButton large loading iconLoading={iconLg} onClick={action('THIS SHOULD NOT HAPPEN')}>
        Loading
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large iconOnly icon={iconLg} onClick={action('large iconOnly clicked')}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
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
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton large iconOnly loading onClick={action('iconOnly clicked')}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>
    </div>
    <div>
      <BpkLoadingButton link loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link iconOnly loading onClick={action('iconOnly clicked')}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large loading onClick={action('button clicked')}>
        Search
      </BpkLoadingButton>
      &nbsp;
      <BpkLoadingButton link large iconOnly loading onClick={action('iconOnly clicked')}>
        <BpkVisuallyHidden>Search</BpkVisuallyHidden>
      </BpkLoadingButton>
    </div>
    <div>
      <BpkDarkExampleWrapper>
        <BpkLoadingButton linkOnDark loading onClick={action('button clicked')}>
          Search
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton linkOnDark iconOnly loading onClick={action('iconOnly clicked')}>
          <BpkVisuallyHidden>Search</BpkVisuallyHidden>
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton linkOnDark large loading onClick={action('button clicked')}>
          Search
        </BpkLoadingButton>
        &nbsp;
        <BpkLoadingButton linkOnDark large iconOnly loading onClick={action('iconOnly clicked')}>
          <BpkVisuallyHidden>Search</BpkVisuallyHidden>
        </BpkLoadingButton>
      </BpkDarkExampleWrapper>
    </div>
  </div>
);

const SubmitExample = () => (
  <LoadingButtonStory submit wrapped={BpkLoadingButton} />
);

const meta = {
  title: 'bpk-component-loading-button',
  component: BpkLoadingButton,
} satisfies Meta;

export default meta;

export const DocsPrimary = {
  render: () => <DocsPrimaryExample />,
};

export const Primary = {
  render: () => <PrimaryExample />,
};

export const PrimaryOnDark = {
  render: () => <PrimaryOnDarkExample />,
};

export const PrimaryOnLight = {
  render: () => <PrimaryOnLightExample />,
};

export const Secondary = {
  render: () => <SecondaryExample />,
};

export const SecondaryOnDark = {
  render: () => <SecondaryOnDarkExample />,
};

export const Destructive = {
  render: () => <DestructiveExample />,
};

export const LinkButton = {
  render: () => <LinkButtonExample />,
};

export const LinkOnDarkButton = {
  render: () => <LinkOnDarkButtonExample />,
};

export const Featured = {
  render: () => <FeaturedExample />,
};

export const Mixture = {
  render: () => <MixtureExample />,
};

export const AnchorTags = {
  render: () => <AnchorTagsExample />,
};

export const CustomIcon = {
  render: () => <CustomIconExample />,
};

export const Submit = {
  render: () => <SubmitExample />,
};

export const VisualTest = {
  render: () => <VisualExample />,
};

export const VisualTestWithZoom = {
  render: () => <VisualExample />,
  args: {
    zoomEnabled: true,
  },
};
