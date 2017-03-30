import focusScope from 'a11y-focus-scope';
import focusStore from 'a11y-focus-store';
import BpkHeading from 'bpk-component-heading';
import { BpkButtonLink } from 'bpk-component-link';
import React, { PropTypes, Component } from 'react';
import BpkCloseButton from 'bpk-component-close-button';
import { TransitionInitialMount } from 'bpk-react-utils';

import './bpk-modal.scss';
import { lockScroll, unlockScroll, storeScroll, restoreScroll } from './scroll-utils';

const stopPropagation = (e) => {
  e.stopPropagation();
};

class BpkModalDialog extends Component {
  constructor() {
    super();

    this.onClose = this.onClose.bind(this);
    this.getDialogRef = this.getDialogRef.bind(this);
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

  onClose(e) {
    stopPropagation(e);
    this.props.onClose();
  }

  getDialogRef(ref) {
    this.dialogElement = ref;
  }

  renderDialog() {
    const dialogClassName = 'bpk-modal__dialog';
    const dialogClassNames = [dialogClassName];

    if (this.props.wide) { dialogClassNames.push('bpk-modal__dialog--wide'); }
    if (this.props.isIphone) { dialogClassNames.push('bpk-modal__dialog--iphone-fix'); }
    if (this.props.className) { dialogClassNames.push(this.props.className); }

    const headingId = `bpk-modal-heading-${this.props.id}`;

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <TransitionInitialMount classNamePrefix={dialogClassName} transitionTimeout={300}>
        <section
          id={this.props.id}
          tabIndex="-1"
          role="dialog"
          aria-labelledby={headingId}
          onClick={stopPropagation}
          className={dialogClassNames.join(' ')}
          ref={this.getDialogRef}
        >
          <header className="bpk-modal__dialog-header">
            <BpkHeading id={headingId} level="h4" bottomMargin={false}>
              {this.props.title}
            </BpkHeading>
            &nbsp;
            {this.props.closeText
              ? <BpkButtonLink onClick={this.onClose}>{this.props.closeText}</BpkButtonLink>
              : <BpkCloseButton
                className="bpk-modal__dialog-close-button"
                label={this.props.closeLabel}
                onClick={this.onClose}
              />
            }
          </header>
          <div className="bpk-modal__dialog-content">
            {this.props.children}
          </div>
        </section>
      </TransitionInitialMount>
    );
    /* eslint-enable */
  }

  render() {
    const classNames = ['bpk-modal'];

    if (this.props.isIphone) { classNames.push('bpk-modal--iphone-fix'); }

    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div className={classNames.join(' ')} onClick={this.onClose}>
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
