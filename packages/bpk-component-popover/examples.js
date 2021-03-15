/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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
import React, { Component, type Node } from 'react';
import { cssModules, withDefaultProps } from 'bpk-react-utils';
import BpkButton from 'bpk-component-button';
import BpkText from 'bpk-component-text';
import BpkContentContainer from 'bpk-component-content-container';
import BpkInput, { withOpenEvents } from 'bpk-component-input';

import STYLES from './examples.scss';

import BpkPopover, {
  bpkPopoverPortalPropTypes,
  bpkPopoverPortalDefaultProps,
  type BpkPopoverProps as PopoverProps,
} from './index';

const EnhancedInput = withOpenEvents(BpkInput);

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: 'base',
  tagName: 'p',
  className: getClassName('bpk-popover-paragraph'),
});

type IgnoredPopoverProps = {
  children: Node,
  closeButtonText: string,
  isOpen: boolean,
  label: string,
  onClose: (event: SyntheticEvent<>, props: { source: string }) => mixed,
  target: (() => ?HTMLElement) | Node,
};

type Props = {
  ...$Diff<PopoverProps, IgnoredPopoverProps>,
  id: string,
  changeProps: boolean,
  targetFunction: ?() => ?HTMLElement,
  closeProgrammatically: boolean,
  input?: boolean,
};

type State = {
  isOpen: boolean,
  changedTarget: ?() => ?HTMLElement,
};

class PopoverContainer extends Component<Props, State> {
  static propTypes = {
    ...bpkPopoverPortalPropTypes,
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    changeProps: PropTypes.bool,
    targetFunction: PropTypes.func,
    closeProgrammatically: PropTypes.bool,
  };

  static defaultProps = {
    ...bpkPopoverPortalDefaultProps,
    className: null,
    changeProps: false,
    targetFunction: null,
    closeProgrammatically: false,
  };

  constructor() {
    super();

    this.state = {
      isOpen: false,
      changedTarget: null,
    };
  }

  openPopover = () => {
    this.setState({
      isOpen: true,
    });
    if (this.props.closeProgrammatically) {
      setTimeout(() => {
        this.closePopover();
      }, 2000);
    }
  };

  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  };

  changeTarget = () => {
    const changedTarget = (): ?HTMLElement =>
      document.getElementById('reposition-alt-target');

    this.setState({ changedTarget });
  };

  render() {
    const { targetFunction, changeProps, id, input, ...rest } = this.props;
    let target = null;
    let openButton = <BpkButton onClick={this.openPopover}> Open </BpkButton>;
    let inputComponent = (
      <EnhancedInput
        id="input"
        name="input"
        value="Open"
        isOpen={this.state.isOpen}
        onOpen={this.openPopover}
        onChange={() => null}
      />
    );

    if (targetFunction != null) {
      target = targetFunction;
    } else if (this.state.changedTarget) {
      target = this.state.changedTarget;
    } else if (input) {
      target = inputComponent;
      inputComponent = null;
    } else {
      target = openButton;
      openButton = null;
    }

    const renderTarget: ?Function = (): ?HTMLElement =>
      document.getElementById('popover-container');

    return (
      <div id="popover-container">
        {!input && openButton}
        {input && inputComponent}

        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkPopover
          closeButtonText="Close"
          id={`my-popover-${id}`}
          isOpen={this.state.isOpen}
          label="My popover"
          onClose={this.closePopover}
          renderTarget={renderTarget}
          target={target}
          {...rest}
        >
          <BpkContentContainer>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              pulvinar leo in gravida varius. Mauris eget euismod mi. Ut
              vulputate ex nec consequat sollicitudin. Pellentesque pulvinar ac
              dolor vel hendrerit. Maecenas sed felis justo. Proin at tellus in
              urna molestie blandit. Duis posuere urna nec finibus imperdiet.
            </Paragraph>
            {changeProps ? (
              <Paragraph>
                <BpkButton onClick={this.changeTarget}>Change target</BpkButton>
              </Paragraph>
            ) : null}
          </BpkContentContainer>
        </BpkPopover>
      </div>
    );
  }
}

const Spacer = () => <div className={getClassName('bpk-popover-spacer')} />;

const DefaultExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover-1" />
  </Spacer>
);

const WithLabelAsTitleExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover" labelAsTitle />
  </Spacer>
);

const AlongsideInputExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover" labelAsTitle />
    <input name="input" />
  </Spacer>
);

const CloseProgrammaticallyExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover" labelAsTitle closeProgrammatically />
  </Spacer>
);

const WithLabelAsTitleAndTextCloseButtonExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover" labelAsTitle closeButtonIcon={false} />
  </Spacer>
);

const OnTheSideExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover" placement="right" />
  </Spacer>
);

const AttachToExternalExample = () => (
  <Spacer>
    <div id="attachElement">Pop over attached here</div>
    <p>&nbsp; </p>
    <PopoverContainer
      id="my-popover"
      targetFunction={() => document.getElementById('attachElement')}
    />
  </Spacer>
);

const NoRenderWhenNoExternalElementExample = () => (
  <Spacer>
    <div id="attachElement">Popover does not open</div>
    <p>&nbsp; </p>
    <PopoverContainer
      id="my-popover"
      targetFunction={() => document.getElementById('doesNotExist')}
    />
  </Spacer>
);

const RepositioningExample = () => (
  // This story demonstrates the popover repositioning itself when props change (including children).
  <Spacer>
    <Paragraph id="reposition-alt-target" style={{ float: 'right' }}>
      Different target
    </Paragraph>
    <PopoverContainer id="my-popover" changeProps />
  </Spacer>
);

const PopperModifiersExample = () => (
  <Spacer>
    <PopoverContainer
      id="my-popover"
      popperModifiers={{
        flip: { enabled: false },
      }}
    />
  </Spacer>
);

const InputTriggerExample = () => (
  <Spacer>
    <PopoverContainer id="my-popover-1" input />
  </Spacer>
);

export {
  DefaultExample,
  WithLabelAsTitleExample,
  AlongsideInputExample,
  CloseProgrammaticallyExample,
  WithLabelAsTitleAndTextCloseButtonExample,
  OnTheSideExample,
  AttachToExternalExample,
  NoRenderWhenNoExternalElementExample,
  RepositioningExample,
  PopperModifiersExample,
  InputTriggerExample,
};
