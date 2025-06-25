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
// @ts-expect-error TS(2305) FIXME: Module '"react"' has no exported member 'Node'.
import type { Node } from 'react';

import BpkButton from '../../packages/bpk-component-button';
import BpkDialog, {
  HEADER_ICON_TYPES,
} from '../../packages/bpk-component-dialog';
import InfoIcon from '../../packages/bpk-component-icon/lg/information-circle';
import TickIcon from '../../packages/bpk-component-icon/lg/tick';
import TrashIcon from '../../packages/bpk-component-icon/lg/trash';
import BpkText, { TEXT_STYLES } from '../../packages/bpk-component-text';
import { cssModules, withDefaultProps } from '../../packages/bpk-react-utils';

import STYLES from './examples.module.scss';

const getClassName = cssModules(STYLES);

const Paragraph = withDefaultProps(BpkText, {
  textStyle: TEXT_STYLES.bodyDefault,
  tagName: 'p',
  className: getClassName('bpk-dialog-paragraph'),
});

type Props = {
  children: Node,
  dismissible: boolean,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  headerIcon: ?Node,
  // @ts-expect-error TS(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  initiallyOpen: ?boolean,
};

type State = {
  isOpen: boolean,
};

class DialogContainer extends Component<Props, State> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dismissible: PropTypes.bool,
  };

  static defaultProps = {
    dismissible: true,
    headerIcon: null,
  };

  constructor(props: Props) {
    // @ts-expect-error TS(2554) FIXME: Expected 1-2 arguments, but got 0.
    super();

    this.state = {
      isOpen: props.initiallyOpen || false,
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
    return (
      <div id="dialog-container">
        <div id="pagewrap">
          <BpkButton onClick={this.onOpen}>Open dialog</BpkButton>
        </div>
        {/* $FlowFixMe[cannot-spread-inexact] - inexact rest. See 'decisions/flowfixme.md'. */}
        <BpkDialog
          closeLabel="Close dialog"
          id="my-dialog"
          ariaLabel="example dialog to showcase component"
          className="my-classname"
          isOpen={this.state.isOpen}
          onClose={this.onClose}
          getApplicationElement={() => document.getElementById('pagewrap')}
          renderTarget={() => document.getElementById('dialog-container')}
          // @ts-expect-error TS(2783) FIXME: 'headerIcon' is specified more than once, so this ... Remove this comment to see the full error message
          headerIcon
          {...this.props}
        >
          {this.props.children}
          <BpkButton onClick={this.onClose}>Close</BpkButton>
        </BpkDialog>
      </div>
    );
  }
}

const DefaultExample = () => (
  <DialogContainer initiallyOpen>
    <Paragraph>
      This is a default dialog. You can put anything you want in here.
    </Paragraph>
  </DialogContainer>
);

const WithIconExample = () => (
  <div>
    <div>
      <span>Default Icon Dialog</span>
      <DialogContainer initiallyOpen headerIcon={<TickIcon />} dismissible={false}>
        <Paragraph>
          This is a default dialog with an icon. You can put anything you want
          in here.
        </Paragraph>
      </DialogContainer>
    </div>
    <br />
    <div>
      <span>Warning Icon Dialog</span>
      <DialogContainer
        headerIcon={<InfoIcon />}
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; headerIcon: Element; he... Remove this comment to see the full error message
        headerIconType={HEADER_ICON_TYPES.warning}
        dismissible={false}
      >
        <Paragraph>
          This is a warning dialog with an icon. You can put anything you want
          in here.
        </Paragraph>
      </DialogContainer>
    </div>
    <br />
    <div>
      <span>Destructive Icon Dialog</span>
      <DialogContainer
        headerIcon={<TrashIcon />}
        // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; headerIcon: Element; he... Remove this comment to see the full error message
        headerIconType={HEADER_ICON_TYPES.destructive}
        dismissible={false}
      >
        <Paragraph>
          This is a destructive dialog with an icon. You can put anything you
          want in here.
        </Paragraph>
      </DialogContainer>
    </div>
  </div>
);

const NotDismissibleExample = () => (
  <DialogContainer initiallyOpen dismissible={false}>
    <Paragraph>
      This is not dismissible. To close it you must bind the `onClose` function
      to a component inside the dialog, like the button below.
    </Paragraph>
  </DialogContainer>
);

const WithFlareExample = () => (
  // @ts-expect-error TS(2322) FIXME: Type '{ children: Element; initiallyOpen: true; fl... Remove this comment to see the full error message
  <DialogContainer initiallyOpen flare dismissible={false}>
    <Paragraph>
      This is a dialog with a flare view added as the header.
    </Paragraph>
  </DialogContainer>
);

export {
  DefaultExample,
  WithIconExample,
  NotDismissibleExample,
  WithFlareExample,
};
