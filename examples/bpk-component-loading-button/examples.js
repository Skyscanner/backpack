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

import React, { Component } from 'react';

import { action } from '../../packages/bpk-storybook-utils';
import {
  withButtonAlignment,
  withLargeButtonAlignment,
  withRtlSupport,
} from '../../packages/bpk-component-icon';
import BaggageIconSm from '../../packages/bpk-component-icon/sm/baggage';
import BaggageIconLg from '../../packages/bpk-component-icon/lg/baggage';
import BpkLoadingButton, {
  ICON_POSITION,
} from '../../packages/bpk-component-loading-button';

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

const DocsPrimary = () => (
  <div>
    <InteractiveExample>Search</InteractiveExample>
    &nbsp;
    <InteractiveExample large>Search</InteractiveExample>
  </div>
);
const Primary = () => (
  <div>
    &nbsp;
    <BpkLoadingButton onClick={action('primary clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconPosition={ICON_POSITION.LEADING}
      onClick={action('primary leading clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton loading onClick={action('THIS SHOULD NOT HAPPEN')}>
      Loading
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      loading
      iconPosition={ICON_POSITION.LEADING}
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton large onClick={action('large primary clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconPosition={ICON_POSITION.LEADING}
      large
      onClick={action('large primary clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton large disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton large loading onClick={action('THIS SHOULD NOT HAPPEN')}>
      Loading
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      large
      iconPosition={ICON_POSITION.LEADING}
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
  </div>
);
const Secondary = () => (
  <div>
    &nbsp;
    <BpkLoadingButton secondary onClick={action('secondary clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      secondary
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      secondary
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton
      secondary
      large
      onClick={action('large secondary clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      secondary
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      secondary
      large
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
  </div>
);
const Destructive = () => (
  <div>
    <BpkLoadingButton destructive onClick={action('destructive clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      destructive
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      destructive
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton
      destructive
      large
      onClick={action('large destructive clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      destructive
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      destructive
      large
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
  </div>
);
const LinkButton = () => (
  <div>
    <BpkLoadingButton link onClick={action('link button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton link disabled onClick={action('THIS SHOULD NOT HAPPEN')}>
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton link loading onClick={action('THIS SHOULD NOT HAPPEN')}>
      Loading
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton link large onClick={action('large link button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      link
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      link
      large
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
  </div>
);
const Featured = () => (
  <div>
    <BpkLoadingButton featured onClick={action('featured button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      featured
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      featured
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton
      featured
      large
      onClick={action('featured button clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      featured
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Disabled
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      featured
      large
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      Loading
    </BpkLoadingButton>
  </div>
);
const IconOnly = () => (
  <div>
    <BpkLoadingButton iconOnly onClick={action('iconOnly button clicked')}>
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      secondary
      onClick={action('iconOnly button secondary clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      destructive
      onClick={action('iconOnly button destructive clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      featured
      onClick={action('iconOnly button featured clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      onClick={action('large iconOnly button clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      secondary
      onClick={action('large iconOnly button secondary clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      destructive
      onClick={action('large iconOnly button destructive clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      disabled
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      loading
      onClick={action('THIS SHOULD NOT HAPPEN')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      featured
      onClick={action('large iconOnly button featured clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp;
  </div>
);
const Mixture = () => (
  <div>
    <BpkLoadingButton onClick={action('primary button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton secondary onClick={action('secondary button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      destructive
      onClick={action('destructive button clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton link onClick={action('link button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton featured onClick={action('featured button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton iconOnly onClick={action('iconOnly button clicked')}>
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton large onClick={action('primary button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      large
      secondary
      onClick={action('secondary button clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      large
      destructive
      onClick={action('destructive button clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton large link onClick={action('link button clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      large
      featured
      onClick={action('featured button clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      iconOnly
      large
      onClick={action('large iconOnly button clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
  </div>
);
const AnchorTags = () => (
  <div>
    <BpkLoadingButton href="#" onClick={action('primary anchor clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      secondary
      onClick={action('secondary anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      destructive
      onClick={action('destructive anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton href="#" link onClick={action('link anchor clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      featured
      onClick={action('featured anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      iconOnly
      onClick={action('iconOnly anchor clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
    &nbsp; &nbsp;
    <BpkLoadingButton href="#" large onClick={action('primary anchor clicked')}>
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      large
      secondary
      onClick={action('secondary anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      large
      destructive
      onClick={action('destructive anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      large
      link
      onClick={action('link anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      large
      featured
      onClick={action('featured anchor clicked')}
    >
      Button
    </BpkLoadingButton>
    &nbsp;
    <BpkLoadingButton
      href="#"
      large
      iconOnly
      onClick={action('iconOnly anchor clicked')}
    >
      <span className="visually-hidden">Search</span>
    </BpkLoadingButton>
  </div>
);
const CustomIcon = () => {
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

export {
  DocsPrimary,
  Primary,
  Secondary,
  Destructive,
  LinkButton,
  Featured,
  IconOnly,
  Mixture,
  AnchorTags,
  CustomIcon,
};
