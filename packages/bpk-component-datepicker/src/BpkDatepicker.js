import BpkInput from 'bpk-component-input';
import BpkModal from 'bpk-component-modal';
import BpkPopover from 'bpk-component-popover';
import React, { PropTypes, Component } from 'react';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkCalendar, { CustomPropTypes } from 'bpk-component-calendar';

import './bpk-datepicker.scss';

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

class BpkDatepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.focusCanOpen = true;
  }

  onOpen() {
    this.setState({
      isOpen: true,
    });
  }

  onClose() {
    this.setState({
      isOpen: false,
    });
  }

  handleDateSelect(dateObj) {
    this.setState({
      isOpen: false,
    });
    if (this.props.onDateSelect) {
      this.props.onDateSelect(dateObj);
    }
  }

  handleTouchEnd(event) {
    // preventDefault fixes an issue on Android and iOS in which the popover closes immediately
    // because a touch event is registered on one of the dates.
    // We can only run preventDefault when the input is already focused - otherwise it would never set
    // focus on it, and when closing the modal/popover focus would return to the previously focused
    // element (which is annoying if it's an autosuggest or another datepicker, for example).
    if (document && event.target === document.activeElement) {
      event.preventDefault();
      this.onOpen();
    }
  }

  handleFocus() {
    if (this.focusCanOpen) {
      this.onOpen();
    }
  }

  handleBlur() {
    // If the input loses focus when the popover/modal is open, it should not open on a subsequent focus.
    // Fixes an issue with IE9.
    if (this.state.isOpen) {
      this.focusCanOpen = false;
    } else {
      this.focusCanOpen = true;
    }
  }

  render() {
    const {
      changeMonthLabel,
      closeButtonText,
      DateComponent,
      date,
      dateModifiers,
      daysOfWeek,
      formatDate,
      formatDateFull,
      formatMonth,
      getApplicationElement,
      id,
      inputProps,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      onMonthChange,
      showWeekendSeparator,
      title,
      weekStartsOn,
      hasTouchSupport,
      ...rest
    } = this.props;

    const {
      onClick,
      onFocus,
      onBlur,
      onTouchEnd,
      onKeyDown,
      onKeyUp,
      ...restInputProps
    } = inputProps;

    // The following props are not used in render
    delete rest.onDateSelect;

    const eventHandlers = {
      onClick: withEventHandler(this.onOpen, onClick),
      onKeyDown: withEventHandler(handleKeyEvent(KEYCODES.ENTER, this.onOpen), onKeyDown),
      onKeyUp: withEventHandler(handleKeyEvent(KEYCODES.SPACEBAR, this.onOpen), onKeyUp),
    };

    if (hasTouchSupport) {
      // Prevents the mobile keyboard from opening (iOS / Android)
      eventHandlers.readOnly = 'readOnly';
      eventHandlers.onTouchEnd = withEventHandler(this.handleTouchEnd, onTouchEnd);
    } else {
      eventHandlers.onFocus = withEventHandler(this.handleFocus, onFocus);
      eventHandlers.onBlur = withEventHandler(this.handleBlur, onBlur);
    }

    const inputComponent = (
      <BpkInput
        id={id}
        name={`${id}_input`}
        value={date ? formatDate(date) : ''}
        className="bpk-datepicker__input"
        aria-live="assertive"
        aria-atomic="true"
        aria-label={formatDateFull(date)}
        onChange={() => null}
        {...eventHandlers}
        {...restInputProps}
      />
    );

    const calendarComponent = (
      <BpkCalendar
        className="bpk-datepicker__calendar"
        changeMonthLabel={changeMonthLabel}
        DateComponent={DateComponent}
        date={date}
        dateModifiers={dateModifiers}
        daysOfWeek={daysOfWeek}
        formatDateFull={formatDateFull}
        formatMonth={formatMonth}
        id={`${id}-calendar`}
        initialSelectedDate={this.state.date}
        markOutsideDays={markOutsideDays}
        markToday={markToday}
        maxDate={maxDate}
        minDate={minDate}
        onDateSelect={this.handleDateSelect}
        onMonthChange={onMonthChange}
        showWeekendSeparator={showWeekendSeparator}
        weekStartsOn={weekStartsOn}
      />
    );

    return (
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {isMobile => (
          isMobile
            ? (
              <BpkModal
                id={`${id}-modal`}
                target={inputComponent}
                onClose={this.onClose}
                isOpen={this.state.isOpen}
                title={title}
                closeLabel={closeButtonText}
                getApplicationElement={getApplicationElement}
              >
                {calendarComponent}
              </BpkModal>
            )
            : (
              <BpkPopover
                id={`${id}-popover`}
                target={inputComponent}
                onClose={this.onClose}
                isOpen={this.state.isOpen}
                label={title}
                closeButtonText={closeButtonText}
                tabIndex={0}
                {...rest}
              >
                {calendarComponent}
              </BpkPopover>
            )
        )}
      </BpkBreakpoint>
    );
  }
}

BpkDatepicker.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  closeButtonText: PropTypes.string.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  getApplicationElement: PropTypes.func.isRequired,
  // Optional
  date: PropTypes.instanceOf(Date),
  DateComponent: PropTypes.func,
  dateModifiers: CustomPropTypes.DateModifiers,
  hasTouchSupport: PropTypes.bool,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  onMonthChange: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
};

BpkDatepicker.defaultProps = {
  date: null,
  DateComponent: BpkCalendar.defaultProps.DateComponent,
  dateModifiers: BpkCalendar.defaultProps.dateModifiers,
  hasTouchSupport: (typeof window !== 'undefined' && (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch)), // eslint-disable-line
  inputProps: {},
  markOutsideDays: BpkCalendar.defaultProps.markOutsideDays,
  markToday: BpkCalendar.defaultProps.markToday,
  maxDate: BpkCalendar.defaultProps.maxDate,
  minDate: BpkCalendar.defaultProps.minDate,
  onDateSelect: null,
  onMonthChange: null,
  showWeekendSeparator: BpkCalendar.defaultProps.showWeekendSeparator,
  weekStartsOn: BpkCalendar.defaultProps.weekStartsOn,
};

export default BpkDatepicker;
