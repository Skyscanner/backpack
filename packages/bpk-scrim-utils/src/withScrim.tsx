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

// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import focusScope from 'a11y-focus-scope';
// @ts-expect-error Untyped import. See `decisions/imports-ts-suppressions.md`.
import focusStore from 'a11y-focus-store';
import type { ComponentType, RefObject } from 'react';
import { Component } from 'react';

import {
  cssModules,
  isDeviceIpad,
  isDeviceIphone,
  wrapDisplayName,
} from '../../bpk-react-utils';

import BpkScrim from './BpkScrim';
import {
  fixBody,
  lockScroll,
  restoreScroll,
  storeScroll,
  unfixBody,
  unlockScroll,
} from './scroll-utils';
import STYLES from './bpk-scrim-content.module.scss';

const getClassName = cssModules(STYLES);

type BaseProps = {
  onClose?: () => void | null;
  isIphone?: boolean;
  isIpad?: boolean;
  [rest: string]: any;
};

type HOCProps = {
  getApplicationElement: () => HTMLElement | null;
  containerClassName?: string;
  closeOnScrimClick?: boolean;
};

type Props = HOCProps & BaseProps;

const withScrim = <P extends BaseProps>(
  WrappedComponent: ComponentType<P> | string,
) => {
  class WithScrim extends Component<P & Props> {
    dialogElement?: RefObject<HTMLElement>;

    public static displayName: string;

    static defaultProps = {
      onClose: null,
      isIphone: isDeviceIphone(),
      isIpad: isDeviceIpad(),
      containerClassName: null,
      closeOnScrimClick: true,
    };

    componentDidMount() {
      const { getApplicationElement, isIpad, isIphone } = this.props;
      const applicationElement = getApplicationElement();

      // iPhones need to have the application element hidden
      // and scrolling stored to prevent some weird display
      // issues from happening.
      if (isIphone && applicationElement) {
        storeScroll();
        applicationElement.style.display = 'none';
      } else {
        // The method used for `lockScroll` does not prevent scrolling on iPad.
        // On iPad we instead set `position: fixed` on `body` to prevent scrolling
        // and resolve virtual keyboard issues.
        if (isIpad) {
          storeScroll();
          fixBody();
        } else {
          lockScroll();
        }
        if (applicationElement) {
          applicationElement.setAttribute('aria-hidden', 'true');
        }
      }

      focusStore.storeFocus();
      if (this.dialogElement) {
        focusScope.scopeFocus(this.dialogElement);
      }
    }

    componentWillUnmount() {
      const { getApplicationElement, isIpad, isIphone } = this.props;
      const applicationElement = getApplicationElement();

      if (isIphone && applicationElement) {
        applicationElement.style.display = '';
        restoreScroll();
      } else {
        if (isIpad) {
          unfixBody();
          restoreScroll();
        } else {
          unlockScroll();
        }
        if (applicationElement) {
          applicationElement.removeAttribute('aria-hidden');
        }
      }

      focusScope.unscopeFocus();
      focusStore.restoreFocus();
    }

    dialogRef = (ref: RefObject<HTMLElement>) => {
      this.dialogElement = ref;
    };

    render() {
      const {
        closeOnScrimClick,
        containerClassName,
        getApplicationElement,
        isIpad,
        isIphone,
        onClose,
        ...rest
      } = this.props;

      const classNames = [getClassName('bpk-scrim-content')];

      if (containerClassName) {
        classNames.push(containerClassName);
      }

      return (
        <div className={classNames.join(' ')}>
          <BpkScrim onClose={closeOnScrimClick ? onClose : undefined} />
          <WrappedComponent
            {...(rest as P)}
            isIphone={isIphone}
            isIpad={isIpad}
            dialogRef={this.dialogRef}
            onClose={onClose}
          />
        </div>
      );
    }
  }

  WithScrim.displayName = wrapDisplayName(WrappedComponent, 'withScrim');

  return WithScrim;
};

export default withScrim;
