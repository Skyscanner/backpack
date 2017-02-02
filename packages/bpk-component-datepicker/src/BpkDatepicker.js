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

class BpkDatepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
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
      id,
      inputProps,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      popoverLabel,
      showWeekendSeparator,
      weekStartsOn,
      getApplicationElement,
      ...rest
     } = this.props;

    // The following props are not used in render
    delete rest.onDateSelect;

    const inputComponent = (
      <BpkInput
        id={id}
        name={`${id}_input`}
        value={date ? formatDate(date) : ''}
        onClick={this.onOpen}
        onFocus={this.onOpen}
        onTouchEnd={(e) => {
          // preventDefault fixes an issue on Android and iOS in which the popover closes immediately
          // because a touch event is registered on one of the dates.
          e.preventDefault();
          this.onOpen();
        }}
        onKeyDown={handleKeyEvent(KEYCODES.ENTER, this.onOpen)}
        onKeyUp={handleKeyEvent(KEYCODES.SPACEBAR, this.onOpen)}
        className="bpk-datepicker__input"
        aria-live="assertive"
        aria-atomic="true"
        aria-label={formatDateFull(date)}
        onChange={() => null}
        {...inputProps}
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
        enableSelection
        formatDateFull={formatDateFull}
        formatMonth={formatMonth}
        id={`${id}_calendar`}
        initialSelectedDate={this.state.date}
        markOutsideDays={markOutsideDays}
        markToday={markToday}
        maxDate={maxDate}
        minDate={minDate}
        onDateSelect={this.handleDateSelect}
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
                target={inputComponent}
                onClose={this.onClose}
                isOpen={this.state.isOpen}
                title={popoverLabel}
                closeLabel={closeButtonText}
                getApplicationElement={getApplicationElement}
              >
                {calendarComponent}
              </BpkModal>
            )
            : (
              <BpkPopover
                target={inputComponent}
                onClose={this.onClose}
                isOpen={this.state.isOpen}
                closeButtonText={closeButtonText}
                aria-label={popoverLabel}
                tabIndex="0"
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
  date: PropTypes.instanceOf(Date).isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  popoverLabel: PropTypes.string.isRequired,
  getApplicationElement: PropTypes.func.isRequired,
  // Optional
  DateComponent: PropTypes.func,
  dateModifiers: CustomPropTypes.DateModifiers,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  weekStartsOn: PropTypes.number,
};

BpkDatepicker.defaultProps = {
  DateComponent: BpkCalendar.defaultProps.DateComponent,
  dateModifiers: BpkCalendar.defaultProps.dateModifiers,
  inputProps: {},
  markOutsideDays: BpkCalendar.defaultProps.markOutsideDays,
  markToday: BpkCalendar.defaultProps.markToday,
  maxDate: BpkCalendar.defaultProps.maxDate,
  minDate: BpkCalendar.defaultProps.minDate,
  onDateSelect: null,
  showWeekendSeparator: BpkCalendar.defaultProps.showWeekendSeparator,
  weekStartsOn: BpkCalendar.defaultProps.weekStartsOn,
};

export default BpkDatepicker;
