import React from 'react';
import PropTypes from 'prop-types';

import './bpk-input.scss';

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const handleKeyEvent = (keyCode, callback) => (e) => {
  if (e.keyCode === keyCode) {
    e.preventDefault();
    callback();
  }
};

const withEventHandler = (fn, eventHandler) => (e) => {
  fn(e);
  if (eventHandler) {
    eventHandler(e);
  }
};

const withOpenEvents = (InputComponent) => {
  class PopoverInput extends React.Component {
    constructor(props) {
      super(props);

      this.handleTouchEnd = this.handleTouchEnd.bind(this);
      this.handleFocus = this.handleFocus.bind(this);
      this.handleBlur = this.handleBlur.bind(this);
      this.focusCanOpen = true;
    }

    handleTouchEnd(event) {
      // preventDefault fixes an issue on Android and iOS in which the popover closes immediately
      // because a touch event is registered on one of the dates.
      // We can only run preventDefault when the input is already focused - otherwise it would never set
      // focus on it, and when closing the modal/popover focus would return to the previously focused
      // element (which is annoying if it's an autosuggest or another datepicker, for example).
      if (document && event.target === document.activeElement) {
        event.preventDefault();
        if (this.props.onOpen) {
          this.props.onOpen();
        }
      }
    }

    handleFocus() {
      if (this.focusCanOpen && this.props.onOpen) {
        this.props.onOpen();
      }
    }

    handleBlur() {
      // If the input loses focus when the target is open, it should not open on a subsequent focus.
      // Fixes an issue with IE9.
      if (this.props.isOpen) {
        this.focusCanOpen = false;
      } else {
        this.focusCanOpen = true;
      }
    }

    render() {
      const {
        className,
        hasTouchSupport,
        onClick,
        onFocus,
        onBlur,
        onTouchEnd,
        onKeyDown,
        onKeyUp,
        onOpen,
        ...rest
      } = this.props;

      delete rest.isOpen;

      const classNames = ['bpk-input--with-input-state'];
      if (className) { classNames.push(className); }

      const eventHandlers = {
        onClick: withEventHandler(onOpen, onClick),
        onKeyDown: withEventHandler(handleKeyEvent(KEYCODES.ENTER, onOpen), onKeyDown),
        onKeyUp: withEventHandler(handleKeyEvent(KEYCODES.SPACEBAR, onOpen), onKeyUp),
      };

      if (hasTouchSupport) {
        // Prevents the mobile keyboard from opening (iOS / Android)
        eventHandlers.readOnly = 'readOnly';
        eventHandlers.onTouchEnd = withEventHandler(this.handleTouchEnd, onTouchEnd);
      } else {
        eventHandlers.onFocus = withEventHandler(this.handleFocus, onFocus);
        eventHandlers.onBlur = withEventHandler(this.handleBlur, onBlur);
      }

      return (
        <InputComponent
          className={classNames.join(' ')}
          {...eventHandlers}
          {...rest}
        />
      );
    }
  }

  PopoverInput.propTypes = {
    // Custom props
    isOpen: PropTypes.bool,
    hasTouchSupport: PropTypes.bool,
    onOpen: PropTypes.func,
    // Input props
    className: PropTypes.string,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onTouchEnd: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
  };

  PopoverInput.defaultProps = {
    // Custom props
    isOpen: false,
    hasTouchSupport: (typeof window !== 'undefined' && (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)), // eslint-disable-line
    onOpen: null,
    // Input props
    className: null,
    onClick: null,
    onFocus: null,
    onBlur: null,
    onTouchEnd: null,
    onKeyDown: null,
    onKeyUp: null,
  };

  const inputDisplayName = InputComponent.displayName || InputComponent.name || 'Input';
  PopoverInput.displayName = `withOpenEvents(${inputDisplayName})`;

  return PopoverInput;
};

export default withOpenEvents;
