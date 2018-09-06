/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2018 Skyscanner Ltd
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

import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { cssModules, wrapDisplayName } from 'bpk-react-utils';

import BpkScrim from './BpkScrim';
import {
  fixBody,
  lockScroll,
  restoreScroll,
  storeScroll,
  unfixBody,
  unlockScroll,
} from './scroll-utils';

import STYLES from './bpk-scrim-content.css';
import { onClosePropType } from './customPropTypes';

const getClassName = cssModules(STYLES);

const withScrim = WrappedComponent => {
  class WithScrim extends Component {
    static propTypes = {
      getApplicationElement: PropTypes.func.isRequired,
      onClose: onClosePropType,
      dark: PropTypes.bool,
      isIphone: PropTypes.bool,
      isIpad: PropTypes.bool,
      containerClassName: PropTypes.string,
      closeOnScrimClick: PropTypes.bool,
    };

    static defaultProps = {
      dark: false,
      onClose: null,
      isIphone: /iPhone/i.test(
        typeof window !== 'undefined' ? window.navigator.platform : '',
      ),
      isIpad: /iPad/i.test(
        typeof window !== 'undefined' ? window.navigator.platform : '',
      ),
      containerClassName: null,
      closeOnScrimClick: true,
    };

    componentDidMount() {
      const { isIphone, isIpad, getApplicationElement } = this.props;
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
      const { isIpad, isIphone, getApplicationElement } = this.props;
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

    dialogRef = ref => {
      this.dialogElement = ref;
    };

    render() {
      const {
        getApplicationElement,
        onClose,
        isIphone,
        isIpad,
        containerClassName,
        closeOnScrimClick,
        dark,
        ...rest
      } = this.props;

      const classNames = [getClassName('bpk-scrim-content')];

      if (containerClassName) {
        classNames.push(containerClassName);
      }

      return (
        <div className={classNames.join(' ')}>
          <BpkScrim onClose={closeOnScrimClick ? onClose : null} dark={dark} />
          <WrappedComponent
            {...rest}
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
