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

import type { ReactNode } from 'react';
import { Component, useState } from 'react';

import { FloatingPortal } from '@floating-ui/react';

import { withScrim } from '../../bpk-scrim-utils';

import BpkDrawerContent from './BpkDrawerContent';

const BpkScrimDrawerContent = withScrim(BpkDrawerContent);

export type Props = {
  id: string;
  children: ReactNode | string;
  isOpen: boolean;
  onClose: () => void;
  title: string;
  /**
   * **Note:** In order to "hide" your application from screen readers whilst the drawer is open you need to let it know what
   * the root element for your application is by returning it's DOM node via the function passed to the
   * `getApplicationElement` prop (see the example above). The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
  getApplicationElement: () => HTMLElement | null;
  renderTarget?: () => HTMLElement | HTMLElement | null;
  dialogRef?: (ref: HTMLElement | null | undefined) => void; // TODO - remove this in a later release as it is not being used. The dialogRef is injected in the withScrim HOC
  className?: string | null;
  contentClassName?: string | null;
  closeLabel?: string | null;
  closeText?: string | null;
  hideTitle?: boolean;
  [rest: string]: any;
};

type State = {
  isDrawerShown: boolean;
};

class BpkDrawer extends Component<Props, State> {
  static defaultProps = {
    renderTarget: () => null,
    className: null,
    contentClassName: null,
    closeLabel: null,
    closeText: null,
    hideTitle: false,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isDrawerShown: true,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps: Props) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({ isDrawerShown: true });
      window.addEventListener('keydown', this.handleKeyDown);
    } else {
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  onCloseAnimationComplete = () => {
    this.props.onClose();
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && this.props.onClose) {
      this.props.onClose();
    }
  };

  hide = () => {
    this.setState({ isDrawerShown: false });
  };

  render() {
    const { isOpen, onClose, renderTarget, ...rest } = this.props;

    const { isDrawerShown } = this.state;
    const renTarget = typeof renderTarget === 'function' ? renderTarget() : renderTarget 

    return (
      <>
        {isOpen && (
          <FloatingPortal root={renTarget}>
            <BpkScrimDrawerContent
              isDrawerShown={isDrawerShown}
              onClose={this.hide}
              onCloseAnimationComplete={this.onCloseAnimationComplete}
              {...rest}
            />
          </FloatingPortal>
        )}
      </>
    );
  }
}

export default BpkDrawer;
