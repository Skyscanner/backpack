/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2017 Skyscanner Ltd
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
import { BpkButtonLink } from 'bpk-component-link';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkCloseButton from 'bpk-component-close-button';
import { TransitionInitialMount, cssModules } from 'bpk-react-utils';

import STYLES from './bpk-modal-dialog.scss';
import { lockScroll, unlockScroll, storeScroll, restoreScroll } from './scroll-utils';

const getClassName = cssModules(STYLES);

class BpkModalDialog extends Component {
  constructor() {
    super();

    this.getDialogRef = this.getDialogRef.bind(this);
    this.onContentMouseDown = this.onContentMouseDown.bind(this);
    this.onContentMouseUp = this.onContentMouseUp.bind(this);
    this.onDocumentMove = this.onDocumentMove.bind(this);
    this.onOverlayMouseDown = this.onOverlayMouseDown.bind(this);
    this.onOverlayMouseUp = this.onOverlayMouseUp.bind(this);

    this.shouldClose = false;
  }

  componentDidMount() {
    const { isIphone, getApplicationElement } = this.props;
    const applicationElement = getApplicationElement();

    if (isIphone && applicationElement) {
      storeScroll();
      applicationElement.style.display = 'none';
    } else if (applicationElement) {
      lockScroll();
      applicationElement.setAttribute('aria-hidden', 'true');
    } else {
      lockScroll();
    }

    focusStore.storeFocus();
    if (this.dialogElement) {
      focusScope.scopeFocus(this.dialogElement);
    }
  }

  componentWillUnmount() {
    const { isIphone, getApplicationElement } = this.props;
    const applicationElement = getApplicationElement();

    if (isIphone && applicationElement) {
      applicationElement.style.display = '';
      restoreScroll();
    } else if (applicationElement) {
      unlockScroll();
      applicationElement.removeAttribute('aria-hidden');
    } else {
      unlockScroll();
    }

    focusScope.unscopeFocus();
    focusStore.restoreFocus();
  }

  onContentMouseDown(e) {
    e.stopPropagation();
    this.shouldClose = false;
  }

  onContentMouseUp() {
    this.shouldClose = false;
  }

  onOverlayMouseDown() {
    this.shouldClose = true;
  }

  onOverlayMouseUp() {
    if (this.shouldClose) {
      this.props.onClose();
    }
  }

  onDocumentMove() {
    this.shouldClose = false;
  }

  getDialogRef(ref) {
    this.dialogElement = ref;
  }

  renderDialog() {
    const dialogClassNames = [getClassName('bpk-modal__dialog')];

    if (this.props.wide) { dialogClassNames.push(getClassName('bpk-modal__dialog--wide')); }
    if (this.props.isIphone) { dialogClassNames.push(getClassName('bpk-modal__dialog--iphone-fix')); }
    if (this.props.className) { dialogClassNames.push(this.props.className); }

    const headingId = `bpk-modal-heading-${this.props.id}`;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <TransitionInitialMount
        appearClassName={getClassName('bpk-modal__dialog--appear')}
        appearActiveClassName={getClassName('bpk-modal__dialog--appear-active')}
        transitionTimeout={300}
      >
        <section
          id={this.props.id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={headingId}
          onTouchStart={this.onContentMouseDown}
          onTouchMove={this.onDocumentMove}
          onTouchEnd={this.onContentMouseUp}
          onMouseDown={this.onContentMouseDown}
          onMouseMove={this.onDocumentMove}
          onMouseUp={this.onContentMouseUp}
          className={dialogClassNames.join(' ')}
          ref={this.getDialogRef}
        >
          <header className={getClassName('bpk-modal__dialog-header')}>
            <h2 id={headingId} className={getClassName('bpk-modal__dialog-heading')}>
              {this.props.title}
            </h2>
            &nbsp;
            {this.props.closeText
              ? <BpkButtonLink onClick={this.props.onClose}>{this.props.closeText}</BpkButtonLink>
              : <BpkCloseButton
                className={getClassName('bpk-modal__dialog-close-button')}
                label={this.props.closeLabel}
                onClick={this.props.onClose}
              />
            }
          </header>
          <div className={getClassName('bpk-modal__dialog-content')}>
            {this.props.children}
          </div>
        </section>
      </TransitionInitialMount>
    );
    /* eslint-enable */
  }

  render() {
    const classNames = [getClassName('bpk-modal')];

    if (this.props.isIphone) { classNames.push(getClassName('bpk-modal--iphone-fix')); }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        className={classNames.join(' ')}
        onTouchStart={this.onOverlayMouseDown}
        onTouchMove={this.onDocumentMove}
        onTouchEnd={this.onOverlayMouseUp}
        onMouseDown={this.onOverlayMouseDown}
        onMouseMove={this.onDocumentMove}
        onMouseUp={this.onOverlayMouseUp}
      >
        {this.renderDialog()}
      </div>
    );
    /* eslint-enable */
  }
}

BpkModalDialog.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  getApplicationElement: PropTypes.func.isRequired,
  closeLabel: PropTypes.string,
  closeText: PropTypes.string,
  isIphone: PropTypes.bool,
  wide: PropTypes.bool,
};

BpkModalDialog.defaultProps = {
  className: null,
  closeLabel: null,
  closeText: null,
  isIphone: /iPhone/i.test(typeof window !== 'undefined' ? window.navigator.platform : ''),
  wide: false,
};

export default BpkModalDialog;
