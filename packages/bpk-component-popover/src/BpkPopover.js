import PropTypes from 'prop-types';
import React from 'react';
import { BpkButtonLink } from 'bpk-component-link';
import BpkCloseButton from 'bpk-component-close-button';
import { TransitionInitialMount } from 'bpk-react-utils';

import './bpk-popover.scss';
import { ARROW_ID } from './constants';

const BpkPopover = (props) => {
  const {
    id,
    onClose,
    label,
    closeButtonText,
    children,
    className,
    padded,
    labelAsTitle,
    closeButtonIcon,
    ...rest
  } = props;

  const classNames = ['bpk-popover'];
  const bodyClassNames = ['bpk-popover__body'];

  // outer classNames
  if (className) { classNames.push(className); }

  // inner classNames
  if (padded) { bodyClassNames.push('bpk-popover__body--padded'); }

  const labelId = `bpk-popover-label-${id}`;

  return (
    <TransitionInitialMount classNamePrefix={'bpk-popover'} transitionTimeout={200}>
      <section
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={labelId}
        className={classNames.join(' ')}
        {...rest}
      >
        <span id={ARROW_ID} className="bpk-popover__arrow" role="presentation" />
        <div className="bpk-popover__inner">
          {labelAsTitle
            ? (
              <header className="bpk-popover__header">
                <h2 id={labelId} className="bpk-popover__heading">{label}</h2>
                &nbsp;
                {closeButtonIcon
                  ? <BpkCloseButton className="bpk-popover__close-button" label={closeButtonText} onClick={onClose} />
                  : <BpkButtonLink onClick={onClose}>{closeButtonText}</BpkButtonLink>
                }
              </header>
            ) : (
              <span id={labelId} className="bpk-popover__label">{label}</span>
            )
          }
          <div className={bodyClassNames.join(' ')}>{children}</div>
          {!labelAsTitle && (
            <footer className="bpk-popover__footer">
              <BpkButtonLink onClick={onClose}>{closeButtonText}</BpkButtonLink>
            </footer>
          )}
        </div>
      </section>
    </TransitionInitialMount>
  );
};

BpkPopover.propTypes = {
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  padded: PropTypes.bool,
  labelAsTitle: PropTypes.bool,
  closeButtonIcon: PropTypes.bool,
};

BpkPopover.defaultProps = {
  className: null,
  padded: true,
  labelAsTitle: false,
  closeButtonIcon: true,
};

export default BpkPopover;
