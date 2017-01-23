import BpkInput from 'bpk-component-input';
import BpkPopover from 'bpk-component-popover';
import BpkCalendar, { CustomPropTypes } from 'bpk-component-calendar';
import React, { PropTypes, Component } from 'react';

import './bpk-datepicker.scss';

class BpkDatepicker extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
      date: new Date(),
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
      id,
      inputProps,
      daysOfWeek,
      changeMonthLabel,
      formatDate,
      formatDateFull,
      formatMonth,
      popoverLabel,
      weekStartsOn,
      ...rest
     } = this.props;

    return (
      <div>
        <span
          className="bpk-datepicker__input-description"
          aria-live="polite"
        >{ formatDateFull(this.state.date) }</span>
        <BpkPopover
          target={
            <BpkInput
              id={id}
              name={`${id}_input`}
              value={formatDate(this.state.date)}
              onClick={this.onOpen}
              onFocus={this.onOpen}
              className="bpk-datepicker__input"
              {...inputProps}
            />
          }
          onClose={this.onClose}
          isOpen={this.state.isOpen}
          closeButtonText="Close"
          title={popoverLabel}
          closeOnOutsideClickExceptTarget
          {...rest}
        >
          <BpkCalendar
            id={`${id}_calendar`}
            formatMonth={formatMonth}
            formatDateFull={formatDateFull}
            daysOfWeek={daysOfWeek}
            changeMonthLabel={changeMonthLabel}
            weekStartsOn={weekStartsOn}
            onDateSelect={this.onDateSelect}
            initialSelectedDate={this.state.date}
          />
        </BpkPopover>
      </div>
    );
  }
}

BpkDatepicker.propTypes = {
  id: PropTypes.string.isRequired,
  changeMonthLabel: PropTypes.string.isRequired,
  daysOfWeek: CustomPropTypes.DaysOfWeek.isRequired,
  formatDate: PropTypes.func.isRequired,
  formatDateFull: PropTypes.func.isRequired,
  formatMonth: PropTypes.func.isRequired,
  popoverLabel: PropTypes.string.isRequired,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  onDateSelect: PropTypes.func,
  weekStartsOn: PropTypes.number,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  DateComponent: PropTypes.func,
};

BpkDatepicker.defaultProps = {
  inputProps: {},
  onDateSelect: null,
};

export default BpkDatepicker;
