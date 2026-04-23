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

import type { ComponentType } from 'react';
import { Component } from 'react';

import {
  cssModules,
  isDeviceIpad,
  isDeviceIphone,
  wrapDisplayName,
} from '../../bpk-react-utils';

import BpkScrim from './BpkScrim';
import focusScope from './focusScope';
import focusStore from './focusStore';
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

export type Props = {
  /**
   * The `pagewrap` element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
  getApplicationElement: () => HTMLElement | null;
  /**
   * This is required unless `closeOnScrimClick` is false. It should be set as the `onClick` action on a button or a link.
   */
  onClose?: () => void | null;
  /**
   * Can be used to apply iPhone only styles or behaviour, as it has different scrolling behaviour
   */
  isIphone?: boolean;
  isIpad?: boolean;
  /**
   * It can be used to apply styles to the full-screen container into which the enriched component is inserted (e.g. `display: flex` or `display: grid`)
   */
  containerClassName?: string;
  closeOnScrimClick?: boolean;
  [rest: string]: any;
};

const withScrim = <P extends object>(
  WrappedComponent: ComponentType<P> | string,
) => {
  class WithScrim extends Component<Props & Omit<P, 'dialogRef'>> {
    dialogElement?: HTMLElement | null | undefined;

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

      /**
       * iPhones & iPads need to have a fixed body and scrolling stored to prevent some iOS
       * specific issues occuring. iOS Safari does not prevent scrolling on the underlying
       * content — without these fixes users can scroll below a modal or dialog that uses
       * withScrim. See: https://markus.oberlehner.net/blog/simple-solution-to-prevent-body-scrolling-on-ios/
       *
       * The most dangerous of the fixes below is fixBody — it applies changes to the <body>
       * style and has the potential to override any custom styles already applied. The
       * assumption here is that no one internally is making these changes to body.
       *
       * These must run synchronously (not inside requestAnimationFrame) so the body is
       * locked before the first paint, otherwise a visible scroll-jump occurs on open.
       * componentWillUnmount has a corresponding set of calls that undo these changes.
       */
      if (isIphone || isIpad) {
        storeScroll();
        fixBody();
      }
      lockScroll();

      if (applicationElement) {
        applicationElement.setAttribute('aria-hidden', 'true');
      }
      focusStore.storeFocus();
      if (this.dialogElement) {
        focusScope.scopeFocus(this.dialogElement);
      }
    }

    componentWillUnmount() {
      const { getApplicationElement, isIpad, isIphone } = this.props;
      const applicationElement = getApplicationElement();

      if (isIphone || isIpad) {
        // unfixBody before restoreScroll: restoring scroll while body is still fixed
        // prevents a second visual jump on close.
        unfixBody();
        restoreScroll();
      }
      unlockScroll();

      if (applicationElement) {
        applicationElement.removeAttribute('aria-hidden');
      }

      focusScope.unscopeFocus();
      focusStore.restoreFocus();
    }

    dialogRef = (ref: HTMLElement | null | undefined) => {
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
