import React, { PropTypes } from 'react';
import './bpk-button.scss';

const BpkButton = (props) => {
  const classNames = ['bpk-button'];

  if (props.secondary) { classNames.push('bpk-button--secondary'); }
  if (props.destructive) { classNames.push('bpk-button--destructive'); }
  if (props.selected) { classNames.push('bpk-button--selected'); }
  if (props.large) { classNames.push('bpk-button--large'); }
  if (props.link) { classNames.push('bpk-button--link'); }
  if (props.iconOnly) {
    if (props.large) {
      classNames.push('bpk-button--large-icon-only');
    } else {
      classNames.push('bpk-button--icon-only');
    }
  }
  if (props.className) { classNames.push(props.className); }

  const className = classNames.join(' ');

  if (props.href) {
    return (
      <a
        href={props.href}
        className={className}
        onClick={props.onClick}
      >
        {props.children}
      </a>
    );
  }

  return (
    <button
      type={props.submit ? 'submit' : 'button'}
      disabled={props.disabled}
      className={className}
      onClick={props.onClick ? () => {
        // Due to React bug in Chrome, the onClick event fires even if the button is disabled.
        // Pull request is being worked on (as of 2016-12-22): https://github.com/facebook/react/pull/8329
        if (!props.disabled) {
          props.onClick(...arguments);
        }
      } : null}
    >
      {props.children}
    </button>
  );
};

BpkButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
  secondary: PropTypes.bool,
  selected: PropTypes.bool,
  destructive: PropTypes.bool,
  large: PropTypes.bool,
  link: PropTypes.bool,
  iconOnly: PropTypes.bool,
  onClick: PropTypes.func,
};

BpkButton.defaultProps = {
  href: null,
  className: null,
  disabled: false,
  submit: false,
  secondary: false,
  selected: false,
  destructive: false,
  large: false,
  link: false,
  iconOnly: false,
  onClick: null,
};

export default BpkButton;
