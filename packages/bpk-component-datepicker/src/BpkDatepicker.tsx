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
// @ts-nocheck

import { createRef, Component } from 'react';
import type { ReactElement, RefObject } from 'react';

import BpkBreakpoint, { BREAKPOINTS } from '../../bpk-component-breakpoint';
import {
  composeCalendar,
  BpkCalendarGridHeader,
  BpkCalendarGrid,
  BpkCalendarDate,
  withCalendarState,
  CALENDAR_SELECTION_TYPE,
  DateUtils,
  BpkCalendarNav,
} from '../../bpk-component-calendar';
import BpkInput, { withOpenEvents } from '../../bpk-component-input';
import BpkModal from '../../bpk-component-modal';
import BpkPopover from '../../bpk-component-popover';
import { setNativeValue } from '../../bpk-react-utils';

import type {
  DaysOfWeek,
  ReactComponent,
  SelectionConfiguration,
} from '../../bpk-component-calendar';


const Input = withOpenEvents(BpkInput);

const DefaultCalendar = withCalendarState(
  composeCalendar(
    BpkCalendarNav,
    BpkCalendarGridHeader,
    BpkCalendarGrid,
    BpkCalendarDate,
  ),
);

type Props = {
  // Required
  changeMonthLabel: string;
  closeButtonText: string;
  daysOfWeek: DaysOfWeek;
  formatDate: (date: Date) => string;
  formatDateFull: (date: Date) => string;
  formatMonth: (date: Date) => string;
  id: string;
  title: string;
  /**
   * Because this component uses a modal on mobile viewports, you need to let it know what
   * the root element of your application is by returning its DOM node via this prop
   * This is to "hide" your application from screen readers whilst the datepicker is open.
   * The "pagewrap" element id is a convention we use internally at Skyscanner. In most cases it should "just work".
   */
  getApplicationElement: () => HTMLElement | null;
  nextMonthLabel: string;
  previousMonthLabel: string;
  weekStartsOn: number;
  // Optional
  calendarComponent: ReactComponent;
  /**
   * By default BpkInput. If passed, it should be a DOM node with a ref attached to it.
   */
  inputComponent: ReactElement | null;
  dateModifiers?: {};
  fixedWidth?: boolean;
  inputProps?: {};
  markOutsideDays?: boolean;
  markToday?: boolean;
  maxDate?: Date;
  minDate?: Date;
  onDateSelect?: ((date: Date, newDate?: Date) => void) | null;
  onMonthChange?:
    | ((
        event: UIEvent,
        { month, source }: { month: Date; source: string },
      ) => void)
    | null;
  onOpenChange?: (arg0: boolean) => void | null;
  selectionConfiguration?: SelectionConfiguration;
  initiallyFocusedDate?: Date;
  renderTarget?: null | HTMLElement | (() => null | HTMLElement);
  isOpen?: boolean;
  valid?: boolean;
  // Disabling this as if we set a default property for this value it causes the internal onClose function to stop working for default setup

  onClose?: () => void;
};

type State = {
  isOpen: boolean;
};

class BpkDatepicker extends Component<Props, State> {
  inputRef: (ref:HTMLInputElement) => void;

  elementRef?: HTMLInputElement;

  focusRef?: RefObject<HTMLInputElement>;

  static defaultProps = {
    calendarComponent: DefaultCalendar,
    inputComponent: null,
    dateModifiers: {},
    inputProps: {},
    fixedWidth: true,
    markOutsideDays: true,
    markToday: DefaultCalendar.defaultProps.markToday,
    maxDate: DefaultCalendar.defaultProps.maxDate,
    minDate: DefaultCalendar.defaultProps.minDate,
    nextMonthLabel: null,
    onDateSelect: null,
    onOpenChange: null,
    onMonthChange: null,
    previousMonthLabel: null,
    selectionConfiguration: {
      type: CALENDAR_SELECTION_TYPE.single,
      date: null,
    },
    initiallyFocusedDate: null,
    renderTarget: null,
    isOpen: false,
    valid: null,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      isOpen: props.isOpen!,
    };
    this.focusRef = createRef();
    this.inputRef = (ref) => {
      this.elementRef = ref
    }
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
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
  getLabel = (
    selectionConfiguration: SelectionConfiguration,
    formatDateFull: (date: Date) => string,
  ) => {
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
  getValue = (
    selectionConfiguration: SelectionConfiguration,
    formatDate: (date: Date) => string,
  ) => {
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

  handleDateSelect = (startDate: Date, endDate: Date | null = null) => {
    const { maxDate, minDate, onClose, onDateSelect, selectionConfiguration } =
      this.props;

    // When the calendar is a single date we always want to close it when a date is selected
    // or if its a range calendar we only want to close the calendar when a range is selected.
    // If a custom onClose function is provided then we don't want to run the internal version.
    if (
      selectionConfiguration &&
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
        DateUtils.startOfDay(minDate!),
        DateUtils.startOfDay(maxDate!),
      );
      const newEndDate = DateUtils.dateToBoundaries(
        endDate,
        DateUtils.startOfDay(minDate!),
        DateUtils.startOfDay(maxDate!),
      );

      if (
        selectionConfiguration &&
        selectionConfiguration.type === CALENDAR_SELECTION_TYPE.range &&
        selectionConfiguration.startDate &&
        !selectionConfiguration.endDate &&
        (DateUtils.isAfter(newEndDate, selectionConfiguration.startDate) ||
          DateUtils.isSameDay(newEndDate, selectionConfiguration.startDate))
      ) {
        onDateSelect(selectionConfiguration.startDate, newEndDate);
        this.elementRef && setNativeValue(this.elementRef, this.props.formatDate(newEndDate));
      } else {
        this.elementRef && setNativeValue(this.elementRef, this.props.formatDate(newStartDate));
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
      <div ref={this.focusRef} >
        <Input
          inputRef={this.inputRef}
          id={id}
          name={`${id}_input`}
          value={this.getValue(selectionConfiguration!, formatDate)}
          aria-live="polite"
          aria-atomic="true"
          aria-label={this.getLabel(selectionConfiguration!, formatDateFull)}
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
        {(isMobile: boolean) =>
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
              onClose={this.props.onClose || this.onClose}
              isOpen={this.state.isOpen}
              label={title}
              closeButtonText={closeButtonText}
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

export default BpkDatepicker;
