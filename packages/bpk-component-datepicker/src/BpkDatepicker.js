/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2021 Skyscanner Ltd
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

import BpkInput, { withOpenEvents } from 'bpk-component-input';
import BpkModal from 'bpk-component-modal';
import BpkPopover from 'bpk-component-popover';
import { cssModules } from 'bpk-react-utils';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import BpkBreakpoint, { BREAKPOINTS } from 'bpk-component-breakpoint';
import BpkCalendar, { CustomPropTypes } from 'bpk-component-calendar';

import STYLES from './BpkDatepicker.scss';

const getClassName = cssModules(STYLES);

const Input = withOpenEvents(BpkInput);

class BpkDatepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen && prevState.isOpen !== isOpen) {
      if (isOpen) {
        this.onOpen();
      } else {
        this.onClose();
      }
    }
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
    if (this.props.onOpenChange) {
      this.props.onOpenChange(true);
    }
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
    if (this.props.onOpenChange) {
      this.props.onOpenChange(false);
    }
  };

  handleDateSelect = dateObj => {
    this.onClose();
    if (this.props.onDateSelect) {
      this.props.onDateSelect(dateObj);
    }
  };

  render() {
    const {
      changeMonthLabel,
      calendarComponent: Calendar,
      closeButtonText,
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
      initiallyFocusedDate,
      renderTarget,
      valid,
      ...rest
    } = this.props;

    const dateLabel = date ? formatDateFull(date) : '';

    // The following props are not used in render
    delete rest.onDateSelect;
    delete rest.onOpenChange;
    delete rest.isOpen;

    const inputComponent = (
      <Input
        id={id}
        name={`${id}_input`}
        value={date ? formatDate(date) : ''}
        className={getClassName('bpk-datepicker__input')}
        aria-live="assertive"
        aria-atomic="true"
        aria-label={dateLabel}
        onChange={() => null}
        onOpen={this.onOpen}
        isOpen={this.state.isOpen}
        readOnly
        valid={valid}
        {...inputProps}
      />
    );

    const calendarProps = {
      id: `${id}-calendar`,
      className: getClassName('bpk-datepicker__calendar'),
      changeMonthLabel,
      date,
      dateModifiers,
      daysOfWeek,
      formatDateFull,
      formatMonth,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      onDateSelect: this.handleDateSelect,
      onMonthChange,
      showWeekendSeparator,
      weekStartsOn,
      initiallyFocusedDate,
    };

    const calendar = <Calendar {...calendarProps} />;

    return (
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {isMobile =>
          isMobile ? (
            <BpkModal
              id={`${id}-modal`}
              target={inputComponent}
              renderTarget={renderTarget}
              onClose={this.onClose}
              isOpen={this.state.isOpen}
              title={title}
              closeLabel={closeButtonText}
              getApplicationElement={getApplicationElement}
            >
              {calendar}
            </BpkModal>
          ) : (
            <BpkPopover
              id={`${id}-popover`}
              target={inputComponent}
              renderTarget={renderTarget}
              onClose={this.onClose}
              isOpen={this.state.isOpen}
              label={title}
              closeButtonText={closeButtonText}
              tabIndex={0}
              {...rest}
            >
              {calendar}
            </BpkPopover>
          )
        }
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
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  calendarComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  date: PropTypes.instanceOf(Date),
  dateModifiers: CustomPropTypes.DateModifiers,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  onOpenChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  initiallyFocusedDate: PropTypes.instanceOf(Date),
  renderTarget: PropTypes.func,
  isOpen: PropTypes.bool,
  valid: PropTypes.bool,
};

BpkDatepicker.defaultProps = {
  calendarComponent: BpkCalendar,
  date: null,
  dateModifiers: BpkCalendar.defaultProps.dateModifiers,
  inputProps: {},
  markOutsideDays: BpkCalendar.defaultProps.markOutsideDays,
  markToday: BpkCalendar.defaultProps.markToday,
  maxDate: BpkCalendar.defaultProps.maxDate,
  minDate: BpkCalendar.defaultProps.minDate,
  onDateSelect: null,
  onOpenChange: null,
  onMonthChange: null,
  showWeekendSeparator: BpkCalendar.defaultProps.showWeekendSeparator,
  initiallyFocusedDate: null,
  renderTarget: null,
  isOpen: false,
  valid: null,
};

export default BpkDatepicker;
