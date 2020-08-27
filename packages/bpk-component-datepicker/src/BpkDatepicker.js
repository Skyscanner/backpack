/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016-2020 Skyscanner Ltd
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

/* @flow strict */

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

export type Props = {
  changeMonthLabel: string,
  closeButtonText: string,
  daysOfWeek: CustomPropTypes.DaysOfWeek,
  formatDate: Function,
  formatDateFull: Function,
  formatMonth: Function,
  id: string,
  title: string,
  getApplicationElement: Function,
  weekStartsOn: number,
  calendarComponent: typeof BpkCalendar,
  date: ?Date,
  dateModifiers: CustomPropTypes.DateModifiers,
  inputProps: Object,
  markOutsideDays: boolean,
  markToday: boolean,
  maxDate: Date,
  minDate: Date,
  onDateSelect: ?Function,
  onMonthChange: ?Function,
  showWeekendSeparator: boolean,
  initiallyFocusedDate: ?Date,
  renderTarget: ?Function,
  isOpen: boolean,
  valid: ?boolean,
};

type State = {
  isOpen: boolean,
};

class BpkDatepicker extends Component<Props, State> {
  static defaultProps = {
    calendarComponent: BpkCalendar,
    date: null,
    dateModifiers: BpkCalendar.defaultProps.dateModifiers,
    inputProps: {},
    markOutsideDays: BpkCalendar.defaultProps.markOutsideDays,
    markToday: BpkCalendar.defaultProps.markToday,
    maxDate: BpkCalendar.defaultProps.maxDate,
    minDate: BpkCalendar.defaultProps.minDate,
    onDateSelect: null,
    onMonthChange: null,
    showWeekendSeparator: BpkCalendar.defaultProps.showWeekendSeparator,
    initiallyFocusedDate: null,
    renderTarget: null,
    isOpen: false,
    valid: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
  }

  onOpen = () => {
    this.setState({
      isOpen: true,
    });
  };

  onClose = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleDateSelect = (dateObj: any) => {
    this.setState({
      isOpen: false,
    });
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
    // $FlowFixMe - see above.
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
            // $FlowFixMe - inexact rest. See 'decisions/flowfixme.md'.
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
  onMonthChange: PropTypes.func,
  showWeekendSeparator: PropTypes.bool,
  initiallyFocusedDate: PropTypes.instanceOf(Date),
  renderTarget: PropTypes.func,
  isOpen: PropTypes.bool,
  valid: PropTypes.bool,
};

export default BpkDatepicker;
