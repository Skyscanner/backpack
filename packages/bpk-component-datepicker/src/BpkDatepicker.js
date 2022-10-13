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

import PropTypes from 'prop-types';
import React, { Component } from 'react';

import BpkInput, { withOpenEvents } from '../../bpk-component-input';
import BpkModal from '../../bpk-component-modal';
import BpkPopover from '../../bpk-component-popover';
import { cssModules, deprecated } from '../../bpk-react-utils';
import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import {
  composeCalendar,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  BpkCalendarDate,
  withCalendarState,
  CustomPropTypes,
  CALENDAR_SELECTION_TYPE,
  DateUtils,
  BpkCalendarNav,
} from '../../bpk-component-calendar';

import STYLES from './BpkDatepicker.module.scss';

const getClassName = cssModules(STYLES);

const Input = withOpenEvents(BpkInput);

const DefaultCalendar = withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    BpkCalendarDate,
  ),
);

class BpkDatepicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.isOpen,
    };
    this.inputRef = React.createRef();
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

  /**
   * Gets the correct label for the input field to be supplied to the aria-label
   * @param {Object} selectionConfiguration current selection configuration
   * @param {Function} formatDateFull function supplied to format date
   * @returns {String} date string
   */
  getLabel = (selectionConfiguration, formatDateFull) => {
    if (
      selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single &&
      selectionConfiguration.date
    ) {
      return formatDateFull(selectionConfiguration.date);
    }
    if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range) {
      if (selectionConfiguration.startDate && !selectionConfiguration.endDate) {
        return formatDateFull(selectionConfiguration.startDate);
      }
      if (selectionConfiguration.startDate && selectionConfiguration.endDate) {
        return `${formatDateFull(
          selectionConfiguration.startDate,
        )} - ${formatDateFull(selectionConfiguration.endDate)}`;
      }
    }
    return '';
  };

  /**
   * Gets the correct value for the input field
   * @param {Object} selectionConfiguration current selection configuration
   * @param {Function} formatDate function supplied to format date
   * @returns {String} date value
   */
  getValue = (selectionConfiguration, formatDate) => {
    if (
      selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single &&
      selectionConfiguration.date
    ) {
      return formatDate(selectionConfiguration.date);
    }
    if (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range) {
      if (selectionConfiguration.startDate && !selectionConfiguration.endDate) {
        return formatDate(selectionConfiguration.startDate);
      }
      if (selectionConfiguration.startDate && selectionConfiguration.endDate) {
        return `${formatDate(selectionConfiguration.startDate)} - ${formatDate(
          selectionConfiguration.endDate,
        )}`;
      }
    }
    return '';
  };

  handleDateSelect = (startDate, endDate = null) => {
    const { maxDate, minDate, onClose, onDateSelect, selectionConfiguration } =
      this.props;

    // When the calendar is a single date we always want to close it when a date is selected
    // or if its a range calendar we only want to close the calendar when a range is selected.
    // If a custom onClose function is provided then we don't want to run the internal version.
    if (
      (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.single ||
        (selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range &&
          endDate)) &&
      !onClose
    ) {
      this.onClose();
    }

    if (onDateSelect) {
      const newStartDate = DateUtils.dateToBoundaries(
        startDate,
        DateUtils.startOfDay(minDate),
        DateUtils.startOfDay(maxDate),
      );
      const newEndDate = DateUtils.dateToBoundaries(
        endDate,
        DateUtils.startOfDay(minDate),
        DateUtils.startOfDay(maxDate),
      );

      if (
        selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range &&
        selectionConfiguration.startDate &&
        !selectionConfiguration.endDate &&
        (DateUtils.isAfter(newEndDate, selectionConfiguration.startDate) ||
          DateUtils.isSameDay(newEndDate, selectionConfiguration.startDate))
      ) {
        onDateSelect(selectionConfiguration.startDate, newEndDate);
      } else {
        onDateSelect(newStartDate);
      }
    }
  };

  render() {
    const {
      calendarComponent: Calendar,
      changeMonthLabel,
      closeButtonText,
      dateModifiers,
      daysOfWeek,
      fixedWidth,
      formatDate,
      formatDateFull,
      formatMonth,
      getApplicationElement,
      id,
      initiallyFocusedDate,
      inputComponent,
      inputProps,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      nextMonthLabel,
      onMonthChange,
      previousMonthLabel,
      renderTarget,
      selectionConfiguration,
      title,
      valid,
      weekStartsOn,
      ...rest
    } = this.props;

    // The following props are not used in render
    delete rest.onDateSelect;
    delete rest.onOpenChange;
    delete rest.isOpen;

    const input = inputComponent || (
      <div
        className={getClassName('bpk-datepicker__input')}
        ref={this.inputRef}
      >
        <Input
          id={id}
          name={`${id}_input`}
          value={this.getValue(selectionConfiguration, formatDate)}
          aria-live="assertive"
          aria-atomic="true"
          aria-label={this.getLabel(selectionConfiguration, formatDateFull)}
          onChange={() => null}
          onOpen={this.onOpen}
          isOpen={this.state.isOpen}
          valid={valid}
          {...inputProps}
        />
      </div>
    );

    const calendarProps = {
      id: `${id}-calendar`,
      className: getClassName('bpk-datepicker__calendar'),
      changeMonthLabel,
      dateModifiers,
      daysOfWeek,
      formatDateFull,
      formatMonth,
      markOutsideDays,
      markToday,
      maxDate,
      minDate,
      nextMonthLabel,
      onDateSelect: this.handleDateSelect,
      onMonthChange,
      previousMonthLabel,
      weekStartsOn,
      initiallyFocusedDate,
      selectionConfiguration,
    };

    return (
      <BpkBreakpoint query={BREAKPOINTS.MOBILE}>
        {(isMobile) =>
          isMobile ? (
            <>
              {input}
              <BpkModal
                id={`${id}-modal`}
                renderTarget={renderTarget}
                onClose={this.props.onClose || this.onClose}
                isOpen={this.state.isOpen}
                title={title}
                closeLabel={closeButtonText}
                getApplicationElement={getApplicationElement}
              >
                <Calendar {...calendarProps} fixedWidth={false} />
              </BpkModal>
            </>
          ) : (
            <BpkPopover
              id={`${id}-popover`}
              target={input}
              renderTarget={renderTarget}
              onClose={this.props.onClose || this.onClose}
              isOpen={this.state.isOpen}
              label={title}
              closeButtonText={closeButtonText}
              tabIndex={0}
              {...rest}
            >
              <Calendar {...calendarProps} fixedWidth={fixedWidth} />
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
  nextMonthLabel: PropTypes.string.isRequired,
  previousMonthLabel: PropTypes.string.isRequired,
  weekStartsOn: PropTypes.number.isRequired,
  // Optional
  calendarComponent: PropTypes.elementType,
  inputComponent: PropTypes.elementType,
  date: deprecated(
    PropTypes.instanceOf(Date),
    'Use selectionConfiguration to set date',
  ),
  dateModifiers: CustomPropTypes.DateModifiers,
  fixedWidth: PropTypes.bool,
  inputProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  markOutsideDays: PropTypes.bool,
  markToday: PropTypes.bool,
  maxDate: PropTypes.instanceOf(Date),
  minDate: PropTypes.instanceOf(Date),
  onDateSelect: PropTypes.func,
  onOpenChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  selectionConfiguration: CustomPropTypes.SelectionConfiguration,
  // eslint-disable-next-line react/require-default-props
  showWeekendSeparator: deprecated(
    PropTypes.bool,
    'The showWeekendSeparator prop in Week is now deprecated as no longer part of the calendar, so is no longer required',
  ),
  initiallyFocusedDate: PropTypes.instanceOf(Date),
  renderTarget: PropTypes.func,
  isOpen: PropTypes.bool,
  valid: PropTypes.bool,
  // Disabling this as if we set a default property for this value it causes the internal onClose function to stop working for default setup
  // eslint-disable-next-line react/require-default-props
  onClose: PropTypes.func,
};

BpkDatepicker.defaultProps = {
  calendarComponent: DefaultCalendar,
  inputComponent: null,
  date: null,
  dateModifiers: DefaultCalendar.defaultProps.dateModifiers,
  inputProps: {},
  fixedWidth: true,
  markOutsideDays: DefaultCalendar.defaultProps.markOutsideDays,
  markToday: DefaultCalendar.defaultProps.markToday,
  maxDate: DefaultCalendar.defaultProps.maxDate,
  minDate: DefaultCalendar.defaultProps.minDate,
  nextMonthLabel: null,
  onDateSelect: null,
  onOpenChange: null,
  onMonthChange: null,
  previousMonthLabel: null,
  selectionConfiguration: { type: CALENDAR_SELECTION_TYPE.single, date: null },
  initiallyFocusedDate: null,
  renderTarget: null,
  isOpen: false,
  valid: null,
};

export default BpkDatepicker;
