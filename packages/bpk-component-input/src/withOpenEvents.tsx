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

import { Component } from 'react';
import type {
  ComponentType,
  ReactElement,
  UIEvent,
  ComponentProps,
} from 'react';

import { wrapDisplayName } from '../../bpk-react-utils';

const KEYCODES = {
  ENTER: 'Enter',
  SPACEBAR: 'Space',
} as const;

export type WithOpenEventsProps = {
  /**
   * It is important you pass the `isOpen` prop, as it is necessary to work around an IE bug.
   */
  isOpen?: boolean;
  /**
   * The onOpen callback is called on the following events:
   * click
   * focus
   * touchend
   * keydown (Enter key)
   * keyup (Space key)
   * You can still attach custom handlers for these events as they will still be called. All other key events are prevented.
   */
  onOpen?: () => void;
  hasTouchSupport?: boolean;
};

type EventHandlers = {
  onClick?: (event: UIEvent) => void;
  onFocus?: (event: UIEvent) => void;
  onBlur?: (event: UIEvent) => void;
  onTouchEnd?: (event: UIEvent) => void;
  onKeyDown?: (event: UIEvent) => void;
  onKeyUp?: (event: UIEvent) => void;
  readOnly?: string;
  'aria-readonly'?: boolean;
};

type InputProps = ComponentProps<'input'> &
  Omit<EventHandlers, 'readOnly' | 'aria-readonly'>;

const handleKeyEvent = (callback?: () => void) => (e: KeyboardEvent) => {
  if (e.code === KEYCODES.ENTER || e.code === KEYCODES.SPACEBAR) {
    if (callback) {
      callback();
    }
  }
};

const withEventHandler =
  (fn?: (e: UIEvent) => void, eventHandler?: (e: UIEvent) => void) =>
  (e: UIEvent) => {
    if (fn) {
      fn(e);
    }
    if (eventHandler) {
      eventHandler(e);
    }
  };

const withOpenEvents = <P extends object>(WithOpenEventsInputComponent: ComponentType<P>) => {
  class WithOpenEvents extends Component<P & InputProps & WithOpenEventsProps> {
    public static displayName: string;

    focusCanOpen: boolean;

    static defaultProps = {
      // Custom props
      isOpen: false,
      hasTouchSupport: !!(
        typeof window !== 'undefined' && 'ontouchstart' in window
      ),
      onOpen: null,
      // Input props
      onClick: null,
      onFocus: null,
      onBlur: null,
      onTouchEnd: null,
      onKeyDown: null,
      onKeyUp: null,
    };

    constructor(props: P & WithOpenEventsProps & InputProps) {
      super(props);

      this.focusCanOpen = true;
    }

    handleTouchEnd = (event: UIEvent) => {
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
    };

    handleFocus = () => {
      if (this.focusCanOpen && this.props.onOpen) {
        this.props.onOpen();
      }
    };

    handleBlur = () => {
      // If the input loses focus when the target is open, it should not open on a subsequent focus.
      // Fixes an issue with IE9.
      if (this.props.isOpen) {
        this.focusCanOpen = false;
      } else {
        this.focusCanOpen = true;
      }
    };

    render(): ReactElement {
      const {
        className,
        hasTouchSupport,
        isOpen,
        onBlur,
        onClick,
        onFocus,
        onKeyDown,
        onKeyUp,
        onOpen,
        onTouchEnd,
        ...rest
      } = this.props;

      const eventHandlers: EventHandlers = {
        onClick: withEventHandler(onOpen, onClick),
        // @ts-expect-error for some reason the type KeyboardEvent was not being recognized as
        // a valid type to UIEvent even though it is a valid subtype type of UIEvent
        onKeyDown: withEventHandler(handleKeyEvent(onOpen), onKeyDown),
      };

      if (hasTouchSupport) {
        // Prevents the mobile keyboard from opening (iOS / Android), while not announcing it as 'read only' to a screen reader
        eventHandlers.readOnly = 'readOnly';
        eventHandlers['aria-readonly'] = false;

        eventHandlers.onTouchEnd = withEventHandler(
          this.handleTouchEnd,
          onTouchEnd,
        );
      }

      // Needed on desktop to allow the intended behaviour of opening on focus
      // Needed on mobile as some Android devices do not trigger onClick or onTouch when TalkBack is active but do trigger onFocus
      eventHandlers.onFocus = withEventHandler(this.handleFocus, onFocus);
      eventHandlers.onBlur = withEventHandler(this.handleBlur, onBlur);

      return (
          <WithOpenEventsInputComponent
            className={className}
            {...eventHandlers}
            {...(rest as P)}
            data-openable // This allows for conditional styling within BpkInput
          />
      );
    }
  }

  WithOpenEvents.displayName = wrapDisplayName(
    WithOpenEventsInputComponent,
    'withOpenEvents',
  );

  return WithOpenEvents;
};

export default withOpenEvents;
