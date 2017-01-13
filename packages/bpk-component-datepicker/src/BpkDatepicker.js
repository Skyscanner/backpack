import BpkInput from 'bpk-component-input';
import BpkPopover from 'bpk-component-popover';
import BpkCalendar from 'bpk-component-calendar';
import React, { PropTypes, Component } from 'react';

import './bpk-datepicker.scss';

export const weekDays = [
  {
    name: 'Sunday',
    nameAbbr: 'Sun',
    index: 0,
    isWeekend: true,
  },
  {
    name: 'Monday',
    nameAbbr: 'Mon',
    index: 1,
    isWeekend: false,
  },
  {
    name: 'Tuesday',
    nameAbbr: 'Tue',
    index: 2,
    isWeekend: false,
  },
  {
    name: 'Wednesday',
    nameAbbr: 'Wed',
    index: 3,
    isWeekend: false,
  },
  {
    name: 'Thursday',
    nameAbbr: 'Thu',
    index: 4,
    isWeekend: false,
  },
  {
    name: 'Friday',
    nameAbbr: 'Fri',
    index: 5,
    isWeekend: false,
  },
  {
    name: 'Saturday',
    nameAbbr: 'Sat',
    index: 6,
    isWeekend: true,
  },
];

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
  }

  render() {
    const { inputProps, ...rest } = this.props;

    return (
      <BpkPopover
        target={
          <BpkInput
            value={this.state.date.toString()}
            onClick={this.onOpen}
            {...inputProps}
          />
        }
        onClose={this.onClose}
        isOpen={this.state.isOpen}
        {...rest}
      >
        <BpkCalendar
          id="TODO"
          formatMonth={dateObj => dateObj.toString()}
          formatDateFull={dateObj => dateObj.toString()}
          daysOfWeek={weekDays}
          changeMonthLabel="TODO"
          onDateSelect={this.onDateSelect}
        />
      </BpkPopover>
    );
  }
}

BpkDatepicker.propTypes = {
  inputProps: PropTypes.object,
};

BpkDatepicker.defaultProps = {
  inputProps: {},
};

export default BpkDatepicker;
