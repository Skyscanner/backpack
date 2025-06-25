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

import PropTypes from 'prop-types';
import { Component } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkDrawer from '../../packages/bpk-component-drawer';
import { BpkButtonLink } from '../../packages/bpk-component-link';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import BpkTooltip from '../../packages/bpk-component-tooltip';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-drawer-paragraph'),
});

type Props = {
  buttonText: string,
};

type State = {
  isOpen: boolean,
};

class DrawerContainer extends Component<Props, State> {
  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      isOpen: false,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { buttonText, ...rest } = this.props;

    return (
      <div id="drawer-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>{buttonText}</BpkButton>
        </div>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See decisions/flowfixme.md  */}
        // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
        // @ts-expect-error TS(2739): Type '{ id: string; className: string; isOpen: boo... Remove this comment to see the full error message
        // @ts-expect-error TS(2739) FIXME: Type '{ id: string; className: string; isOpen: boo... Remove this comment to see the full error message
        <BpkDrawer
          id="my-drawer"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          renderTarget={() => document.getElementById('drawer-container')}
          {...rest}
        />
      </div>
    );
  }
}

// @ts-expect-error TS(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
DrawerContainer.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

const DefaultExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; title: string; closeLabe... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeLabel="Close drawer"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
  >
    This is a default drawer. You can put anything you want in here.
  </DrawerContainer>
);

const OverflowingExamples = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element[]; title: string; closeL... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeLabel="Close drawer"
    buttonText="Open overflowing drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
  >
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus nunc,
      tempor eget dapibus eget, ultrices sit amet nunc. Maecenas aliquet quam
      nec dui hendrerit, dictum fermentum turpis finibus. Proin ante purus,
      blandit id quam vitae, dignissim venenatis felis. Donec congue sem ac
      felis semper, at efficitur enim pulvinar. Nunc molestie in orci sit amet
      vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex finibus. Fusce
      condimentum dolor ac dignissim rutrum. Vivamus laoreet in lectus eu
      congue. Aliquam mollis, mauris in tincidunt gravida, orci urna porta
      sapien, ac facilisis leo eros et elit. Vivamus fermentum neque metus, et
      convallis lectus ultricies in. Phasellus eget erat in nibh pretium
      convallis. Fusce sed semper ante. Phasellus eget elementum lacus.
    </Paragraph>
    <Paragraph>
      Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus
      quis lorem consectetur sollicitudin. Mauris dapibus ac libero et bibendum.
      In malesuada eget nisl ac bibendum. Etiam ac nulla egestas, luctus eros
      quis, ornare libero. Fusce a lacinia dolor. Nullam auctor finibus dui, sit
      amet luctus nibh blandit in. Maecenas justo tortor, faucibus ut ante ac,
      eleifend ornare nisl. Quisque tempus, metus sit amet fringilla tristique,
      urna mi tincidunt nulla, et tristique eros mauris sed ex. Sed lorem odio,
      elementum congue tellus vitae, suscipit hendrerit ipsum.
    </Paragraph>
    <Paragraph>
      Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis
      tristique. Aliquam mollis lectus ac mi scelerisque condimentum. Sed id est
      ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia libero
      vitae, eleifend erat. Integer cursus, est vitae hendrerit eleifend, justo
      ipsum mattis neque, vitae consectetur arcu massa vitae orci. Sed rhoncus
      nisi id est tristique, finibus convallis ligula rutrum. Pellentesque
      volutpat, neque eget consequat commodo, diam orci aliquam ex, eget ornare
      nulla ipsum ac eros. Nunc quis tempus diam. Mauris congue fringilla ligula
      id lacinia. Donec vulputate eleifend pellentesque. Cras ut imperdiet
      metus, ut imperdiet nulla. Fusce a metus lacinia, ullamcorper ante eu,
      semper urna. Vestibulum eu velit eu ipsum dictum volutpat nec rutrum
      augue.
    </Paragraph>
    <Paragraph>
      Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu
      scelerisque bibendum. Curabitur vel metus elementum, laoreet erat in,
      pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra.
      Donec sed est ut nunc facilisis dictum. Praesent lacinia neque ante, in
      pellentesque ante tempus sit amet. Fusce vehicula tincidunt auctor.
      Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a
      volutpat tellus massa in sem. Etiam interdum nibh nec orci molestie
      pretium.
    </Paragraph>
    <Paragraph>
      Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin
      faucibus non mauris quis pharetra. Curabitur porttitor enim et
      sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus
      accumsan eu. Proin eget consequat turpis. Cras auctor magna id quam
      mattis, ac sollicitudin erat viverra. Aliquam sit amet blandit quam, vel
      facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam
      velit.
    </Paragraph>
    <Paragraph>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lacus nunc,
      tempor eget dapibus eget, ultrices sit amet nunc. Maecenas aliquet quam
      nec dui hendrerit, dictum fermentum turpis finibus. Proin ante purus,
      blandit id quam vitae, dignissim venenatis felis. Donec congue sem ac
      felis semper, at efficitur enim pulvinar. Nunc molestie in orci sit amet
      vestibulum. Ut mattis ante ac lacus ornare, nec sagittis ex finibus. Fusce
      condimentum dolor ac dignissim rutrum. Vivamus laoreet in lectus eu
      congue. Aliquam mollis, mauris in tincidunt gravida, orci urna porta
      sapien, ac facilisis leo eros et elit. Vivamus fermentum neque metus, et
      convallis lectus ultricies in. Phasellus eget erat in nibh pretium
      convallis. Fusce sed semper ante. Phasellus eget elementum lacus.
    </Paragraph>
    <Paragraph>
      Nunc pretium erat nec ante faucibus molestie. Vestibulum ultrices purus
      quis lorem consectetur sollicitudin. Mauris dapibus ac libero et bibendum.
      In malesuada eget nisl ac bibendum. Etiam ac nulla egestas, luctus eros
      quis, ornare libero. Fusce a lacinia dolor. Nullam auctor finibus dui, sit
      amet luctus nibh blandit in. Maecenas justo tortor, faucibus ut ante ac,
      eleifend ornare nisl. Quisque tempus, metus sit amet fringilla tristique,
      urna mi tincidunt nulla, et tristique eros mauris sed ex. Sed lorem odio,
      elementum congue tellus vitae, suscipit hendrerit ipsum.
    </Paragraph>
    <Paragraph>
      Curabitur a posuere dolor. Maecenas accumsan magna nec risus facilisis
      tristique. Aliquam mollis lectus ac mi scelerisque condimentum. Sed id est
      ut felis euismod maximus. Fusce sit amet erat imperdiet, lacinia libero
      vitae, eleifend erat. Integer cursus, est vitae hendrerit eleifend, justo
      ipsum mattis neque, vitae consectetur arcu massa vitae orci. Sed rhoncus
      nisi id est tristique, finibus convallis ligula rutrum. Pellentesque
      volutpat, neque eget consequat commodo, diam orci aliquam ex, eget ornare
      nulla ipsum ac eros. Nunc quis tempus diam. Mauris congue fringilla ligula
      id lacinia. Donec vulputate eleifend pellentesque. Cras ut imperdiet
      metus, ut imperdiet nulla. Fusce a metus lacinia, ullamcorper ante eu,
      semper urna. Vestibulum eu velit eu ipsum dictum volutpat nec rutrum
      augue.
    </Paragraph>
    <Paragraph>
      Vestibulum eu posuere erat. Ut id turpis nibh. Aenean congue mi eu
      scelerisque bibendum. Curabitur vel metus elementum, laoreet erat in,
      pellentesque magna. Morbi consectetur lectus eu quam bibendum viverra.
      Donec sed est ut nunc facilisis dictum. Praesent lacinia neque ante, in
      pellentesque ante tempus sit amet. Fusce vehicula tincidunt auctor.
      Quisque ornare, diam et ultricies blandit, augue ipsum congue eros, a
      volutpat tellus massa in sem. Etiam interdum nibh nec orci molestie
      pretium.
    </Paragraph>
    <Paragraph>
      Quisque eleifend ullamcorper metus, eget auctor eros varius ut. Proin
      faucibus non mauris quis pharetra. Curabitur porttitor enim et
      sollicitudin feugiat. Morbi suscipit molestie risus, eu sodales lacus
      accumsan eu. Proin eget consequat turpis. Cras auctor magna id quam
      mattis, ac sollicitudin erat viverra. Aliquam sit amet blandit quam, vel
      facilisis ipsum. Maecenas at risus semper, venenatis orci vitae, aliquam
      velit.
    </Paragraph>
  </DrawerContainer>
);

const CloseButtonTextExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; title: string; closeText... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeText="Done"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
  >
    This is a default drawer. You can put anything you want in here.
  </DrawerContainer>
);

const WithVisuallyHiddenTitleExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; title: string; hideTitle... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    hideTitle
    closeLabel="Close drawer"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
  >
    This is a default drawer. You can put anything you want in here.
  </DrawerContainer>
);

const WithFullHeightContentExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: (string | Element)[]; title: str... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeLabel="Close drawer"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
    contentClassName={getClassName('bpk-drawer-content-container')}
  >
    This is a flex drawer. You can put anything you want in here.
    <BpkButton secondary className={getClassName('bpk-drawer-button')}>
      I don&apos;t do anything.
    </BpkButton>
  </DrawerContainer>
);

const WithNonPaddedContentExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; title: string; closeLab... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeLabel="Close drawer"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
    padded={false}
  >
    <div className={getClassName('bpk-drawer-content-full-width')}>
      <p>
        This has default padding disabled to give full control of the layout
        e.g. full width background color.
      </p>
    </div>
  </DrawerContainer>
);

const WithMobileModalBehaviourExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: string; title: string; closeLabe... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer title"
    closeLabel="Close drawer"
    buttonText="Open drawer"
    getApplicationElement={() => document.getElementById('pagewrap')}
    mobileModalDisplay
  >
    This is a default drawer. You can put anything you want in here.
  </DrawerContainer>
);

const DrawerWithTooltipExampleNotAbleToBeShown = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; title: string; closeLab... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer with Tooltip"
    closeLabel="Close drawer"
    buttonText="Open drawer with tooltip"
    getApplicationElement={() => document.getElementById('pagewrap')}
  >

    <div style={{display: "flex", justifyContent: "space-between"}}>
      <BpkTooltip
        ariaLabel="Example Tooltip on the background"
        id="my-tooltip"
        target={
          <div>
            <BpkButtonLink onClick={() => null}>Hover me</BpkButtonLink>
          </div>
        }
      >
        Example Tooltip on the background
      </BpkTooltip>
    </div>

  </DrawerContainer>
);

const DrawerWithTooltipExampleAbleToBeShown = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; title: string; closeLab... Remove this comment to see the full error message
  <DrawerContainer
    title="Drawer with Tooltip"
    closeLabel="Close drawer"
    buttonText="Open drawer with tooltip"
    getApplicationElement={() => document.getElementById('pagewrap')}
    containerClassName={getClassName('bpk-drawer-with-tooltip-not-able-to-show')}
  >

    <div style={{display: "flex"}}>
      <BpkTooltip
        ariaLabel="Example Tooltip on the background"
        id="my-tooltip"
        target={
          <div>
            <BpkButtonLink onClick={() => null}>Hover me</BpkButtonLink>
          </div>
        }
      >
        Example Tooltip on the front
      </BpkTooltip>
    </div>

  </DrawerContainer>
);

export {
  DefaultExample,
  OverflowingExamples,
  CloseButtonTextExample,
  WithVisuallyHiddenTitleExample,
  WithFullHeightContentExample,
  WithNonPaddedContentExample,
  WithMobileModalBehaviourExample,
  DrawerWithTooltipExampleNotAbleToBeShown,
  DrawerWithTooltipExampleAbleToBeShown
};
