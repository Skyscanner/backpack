import BpkInput from 'bpk-component-input';
import BpkPopover from 'bpk-component-popover';
import BpkCalendar, { CustomPropTypes } from 'bpk-component-calendar';
import React, { PropTypes, Component } from 'react';

import './bpk-datepicker.scss';

const KEYCODES = {
  ENTER: 13,
  SPACEBAR: 32,
};

const onKeyEvent = (keyCode, callback) => (e) => {
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
      date: this.props.initialSelectedDate,
    };

    this.onOpen = this.onOpen.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDateSelect = this.onDateSelect.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update when `isOpen` or `date` have changed
    if (nextState.isOpen !== this.state.isOpen) {
      return true;
    }
    if (nextState.date !== this.state.date) {
      return true;
    }
    return false;
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

  onDateSelect(dateObj) {
    this.setState({
      isOpen: false,
      date: dateObj,
    });
    if (this.props.onDateSelect) {
      this.props.onDateSelect(dateObj);
    }
  }

  render() {
    const {
      changeMonthLabel,
      DateComponent,
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
      ...rest
     } = this.props;

    // The following props are not used in render
    delete rest.initialSelectedDate;
    delete rest.onDateSelect;

    return (
      <BpkPopover
        target={
          <BpkInput
            id={id}
            name={`${id}_input`}
            value={formatDate(this.state.date)}
            onClick={this.onOpen}
            onFocus={this.onOpen}
            onKeyDown={onKeyEvent(KEYCODES.ENTER, this.onOpen)}
            onKeyUp={onKeyEvent(KEYCODES.SPACEBAR, this.onOpen)}
            className="bpk-datepicker__input"
            aria-live="assertive"
            aria-atomic="true"
            aria-label={formatDateFull(this.state.date)}
            {...inputProps}
          />
        }
        onClose={this.onClose}
        isOpen={this.state.isOpen}
        closeButtonText="Close"
        aria-label={popoverLabel}
        tabIndex="0"
        {...rest}
      >
        <BpkCalendar
          changeMonthLabel={changeMonthLabel}
          DateComponent={DateComponent}
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
          onDateSelect={this.onDateSelect}
          showWeekendSeparator={showWeekendSeparator}
          weekStartsOn={weekStartsOn}
        />
      </BpkPopover>
    );
  }
}

BpkDatepicker.propTypes = {
  // Required
  changeMonthLabel: PropTypes.string.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  popoverLabel: PropTypes.string.isRequired,
  // Optional
  DateComponent: PropTypes.func,
  dateModifiers: CustomPropTypes.DateModifiers,
  initialSelectedDate: PropTypes.instanceOf(Date),
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
  initialSelectedDate: BpkCalendar.defaultProps.initialSelectedDate,
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
