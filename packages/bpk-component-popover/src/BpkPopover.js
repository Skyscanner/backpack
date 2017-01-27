import React, { PropTypes } from 'react';
import BpkHeading from 'bpk-component-heading';
import { BpkButtonLink } from 'bpk-component-link';
import BpkCloseButton from 'bpk-component-close-button';

import './bpk-popover.scss';
import TransitionInitialMount from './../../bpk-component-modal/src/TransitionInitialMount';

const BpkPopover = (props) => {
  const {
    onClose,
    closeButtonText,
    children,
    className,
    padded,
    title,
    closeButtonIcon,
    fullScreenOnMobile,
    ...rest
  } = props;

  const classNames = ['bpk-popover'];
  const innerClassName = ['bpk-popover__inner'];
  const bodyClassNames = ['bpk-popover__body'];

  // outer classNames
  if (className) { classNames.push(className); }
  if (fullScreenOnMobile) { classNames.push('bpk-popover--full-screen-on-mobile'); }

  // inner classNames
  if (fullScreenOnMobile) { innerClassName.push('bpk-popover__inner--full-screen-on-mobile'); }

  // inner classNames
  if (padded) { bodyClassNames.push('bpk-popover__body--padded'); }

  return (
    <TransitionInitialMount classNamePrefix={'bpk-popover'} transitionTimeout={200}>
      <section
        tabIndex="-1"
        className={classNames.join(' ')}
        {...rest}
      >
        <span className="bpk-popover__arrow" role="presentation" />
        <div className={innerClassName.join(' ')}>
          {title && <header className="bpk-popover__header">
            <BpkHeading id="aria-label-heading" level="h4" bottomMargin={false}>
              {title}
            </BpkHeading>
            &nbsp;
            {closeButtonIcon
              ? <BpkCloseButton className="bpk-popover__close-button" label={closeButtonText} onClick={onClose} />
              : <BpkButtonLink onClick={onClose}>{closeButtonText}</BpkButtonLink>
            }
          </header>}
          <div className={bodyClassNames.join(' ')}>{children}</div>
          {!title && <footer className="bpk-popover__footer">
            <BpkButtonLink onClick={onClose}>{closeButtonText}</BpkButtonLink>
          </footer>}
        </div>
      </section>
    </TransitionInitialMount>
  );
};

BpkPopover.propTypes = {
  onClose: PropTypes.func.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
  title: PropTypes.string,
  closeButtonIcon: PropTypes.bool,
  fullScreenOnMobile: PropTypes.bool,
};

BpkPopover.defaultProps = {
  className: null,
  padded: true,
  title: null,
  closeButtonIcon: true,
  fullScreenOnMobile: false,
};

export default BpkPopover;
