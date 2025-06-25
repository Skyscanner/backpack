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
import { Component, createRef } from 'react';
// @ts-expect-error TS(2305) FIXME: Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkInput, { withOpenEvents } from '../../packages/bpk-component-input';
import BpkPopover from '../../packages/bpk-component-popover';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const EnhancedInput = withOpenEvents(BpkInput);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-popover-paragraph'),
});

type Props = {
  id: string,
  inputTrigger: boolean,
  displayArrow: boolean,
};

type State = {
  isOpen: boolean,
};

class PopoverContainer extends Component<Props, State> {
  static propTypes = {
    id: PropTypes.string.isRequired,
    inputTrigger: PropTypes.bool,
    displayArrow: PropTypes.bool,
  };

  static defaultProps = {
    inputTrigger: false,
    displayArrow: true,
  };

  ref: any;

  constructor() {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.ref = createRef();
    this.state = {
      isOpen: false,
    };
  }

  openPopover = () => {
    this.setState({
      isOpen: true,
    });
  };

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const { displayArrow, id, inputTrigger, ...rest } =
      this.props;
    let target = null;

    const openButton = (
      <div className={getClassName('bpk-popover-target')} ref={this.ref}>
        <BpkButton onClick={this.openPopover}>Open</BpkButton>
      </div>
    );

    const inputField = (
      <div className={getClassName('bpk-popover-target')} ref={this.ref}>
        <EnhancedInput
          id="input"
          name="input"
          value="John Smith"
          isOpen={this.state.isOpen}
          onOpen={this.openPopover}
          onChange={() => null}
        />
      </div>
    );

    if (inputTrigger) {
      target = inputField;
    } else {
      target = openButton;
    }

    return (
      <div id="popover-container">
        <BpkPopover
          closeButtonLabel="Close"
          id={`my-popover-${id}`}
          isOpen={this.state.isOpen}
          label="My popover"
          labelAsTitle
          onClose={this.closePopover}
          target={target}
          showArrow={displayArrow}
          {...rest}
        >
          <Paragraph>My popover content.</Paragraph>
          <Paragraph>Some more popover content.</Paragraph>
        </BpkPopover>
      </div>
    );
  }
}

const Spacer = (props: { children: Node }) => (
  <div className={getClassName('bpk-popover-spacer')}>{props.children}</div>
);

const DefaultExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover-1" />
  </Spacer>
);

const WithCustomRenderTargetExample = () => (
  <Spacer>
    <div id="my-target" />
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; renderTarget: () => HTMLElemen... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; renderTarget: () => HTMLElemen... Remove this comment to see the full error message
    <PopoverContainer id="my-popover-1" renderTarget={() => document.getElementById('my-target')} />
  </Spacer>
);

const HoverExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; hoverable: true; }' is not ass... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; hoverable: true; }' is not ass... Remove this comment to see the full error message
    <PopoverContainer id="my-popover-1" hoverable />
  </Spacer>
);

const WithoutArrowExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover-2" displayArrow={false} />
  </Spacer>
);

const WithLabelAsTitleExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; labelAsTitle: true; }' is not ... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; labelAsTitle: true; }' is not ... Remove this comment to see the full error message
    <PopoverContainer id="my-popover" labelAsTitle />
  </Spacer>
);

const WithNoCloseButtonIconExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; labelAsTitle: true; closeButto... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; labelAsTitle: true; closeButto... Remove this comment to see the full error message
    <PopoverContainer id="my-popover" labelAsTitle closeButtonIcon={false} />
  </Spacer>
);

const OnTheSideExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; placement: string; }' is not a... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; placement: string; }' is not a... Remove this comment to see the full error message
    <PopoverContainer id="my-popover" placement="right" />
  </Spacer>
);

const InputTriggerExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover-1" inputTrigger />
  </Spacer>
);

const WithActionButtonExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; actionText: string; onAction: ... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; actionText: string; onAction: ... Remove this comment to see the full error message
    <PopoverContainer id="my-popover" actionText="Action" onAction={() => { }} />
  </Spacer>
);

const VisualExample = () => (
  <Spacer>
    // @ts-expect-error TS(2304) FIXME: Cannot find name 'id'.
    // @ts-expect-error TS(2322): Type '{ id: string; isOpen: true; }' is not assign... Remove this comment to see the full error message
    // @ts-expect-error TS(2322) FIXME: Type '{ id: string; isOpen: true; }' is not assign... Remove this comment to see the full error message
    <PopoverContainer id="my-popover-1" isOpen />
  </Spacer>
);

export {
  DefaultExample,
  WithCustomRenderTargetExample,
  HoverExample,
  WithoutArrowExample,
  WithLabelAsTitleExample,
  WithNoCloseButtonIconExample,
  OnTheSideExample,
  InputTriggerExample,
  WithActionButtonExample,
  VisualExample
};
