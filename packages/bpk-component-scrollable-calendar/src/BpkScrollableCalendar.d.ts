/// <reference types="react" />
declare const _default: {
    new (props: Omit<{
        changeMonthLabel?: string | null | undefined;
        daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
        formatDateFull: (date: Date) => string | Date;
        formatMonth: (date: Date) => string | Date;
        id: string;
        maxDate: Date;
        minDate: Date;
        month: Date;
        nextMonthLabel?: string | null | undefined;
        previousMonthLabel?: string | null | undefined;
        weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
        className?: string | null | undefined;
        dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
        fixedWidth?: boolean | undefined;
        focusedDate?: Date | null | undefined;
        markOutsideDays?: boolean | undefined;
        markToday?: boolean | undefined;
        onMonthChange?: ((event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void) | null | undefined;
        onDateClick?: ((date: Date) => void) | null | undefined;
        onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
        preventKeyboardFocus?: boolean | undefined;
        selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
        gridClassName?: string | null | undefined;
        weekDayKey?: string | undefined;
        navProps?: {} | null | undefined;
        headerProps?: {} | null | undefined;
        gridProps?: {} | null | undefined;
        dateProps?: {} | null | undefined;
    } & {
        fixedWidth?: boolean | undefined;
        maxDate?: Date | undefined;
        minDate?: Date | undefined;
        onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
        onMonthChange?: ((event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void) | null | undefined;
        selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
        initiallyFocusedDate?: Date | null | undefined;
        markToday?: boolean | undefined;
        markOutsideDays?: boolean | undefined;
    }, keyof {
        onDateClick: ((date: Date) => void) | null;
        onDateKeyDown: ((event: KeyboardEvent) => void) | null;
        month: Date;
        minDate: Date;
        maxDate: Date;
    }> & {
        [rest: string]: any;
    }): {
        UNSAFE_componentWillReceiveProps(nextProps: Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }): void;
        handleDateFocus: (event: UIEvent, { date, source }: {
            date: Date;
            source: string;
        }) => void;
        handleDateSelect: (date: Date) => void;
        handleMonthChange: (event: UIEvent, { month, source }: {
            month: Date;
            source: string;
        }) => void;
        handleDateKeyDown: (event: KeyboardEvent) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends keyof {
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>(state: {
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        } | ((prevState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>, props: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>) => {
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        } | Pick<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }, K> | null) | Pick<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callback?: (() => void) | undefined): void;
        readonly props: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }> & Readonly<{
            children?: import("react").ReactNode;
        }>;
        state: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>;
        refs: {
            [key: string]: import("react").ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, nextState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: import("react").ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, prevState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>): any;
        componentDidUpdate?(prevProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, prevState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, nextState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<Omit<{
            changeMonthLabel?: string | null | undefined;
            daysOfWeek: import("../../bpk-component-calendar").DaysOfWeek;
            formatDateFull: (date: Date) => string | Date;
            formatMonth: (date: Date) => string | Date;
            id: string;
            maxDate: Date;
            minDate: Date;
            month: Date;
            nextMonthLabel?: string | null | undefined;
            previousMonthLabel?: string | null | undefined;
            weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
            className?: string | null | undefined;
            dateModifiers?: import("../../bpk-component-calendar/src/custom-proptypes").DateModifiers | undefined;
            fixedWidth?: boolean | undefined;
            focusedDate?: Date | null | undefined;
            markOutsideDays?: boolean | undefined;
            markToday?: boolean | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            onDateClick?: ((date: Date) => void) | null | undefined;
            onDateKeyDown?: ((event: KeyboardEvent) => void) | null | undefined;
            preventKeyboardFocus?: boolean | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            gridClassName?: string | null | undefined;
            weekDayKey?: string | undefined;
            navProps?: {} | null | undefined;
            headerProps?: {} | null | undefined;
            gridProps?: {} | null | undefined;
            dateProps?: {} | null | undefined;
        } & {
            fixedWidth?: boolean | undefined;
            maxDate?: Date | undefined;
            minDate?: Date | undefined;
            onDateSelect?: ((date: Date, newDate?: Date | undefined) => void) | null | undefined;
            onMonthChange?: ((event: UIEvent, { month, source }: {
                month: Date;
                source: string;
            }) => void) | null | undefined;
            selectionConfiguration?: import("../../bpk-component-calendar").SelectionConfiguration | undefined;
            initiallyFocusedDate?: Date | null | undefined;
            markToday?: boolean | undefined;
            markOutsideDays?: boolean | undefined;
        }, keyof {
            onDateClick: ((date: Date) => void) | null;
            onDateKeyDown: ((event: KeyboardEvent) => void) | null;
            month: Date;
            minDate: Date;
            maxDate: Date;
        }> & {
            [rest: string]: any;
        }>, nextState: Readonly<{
            preventKeyboardFocus: boolean;
            focusedDate: Date;
        }>, nextContext: any): void;
    };
    defaultProps: {
        fixedWidth: boolean;
        maxDate: Date;
        minDate: Date;
        onDateSelect: null;
        onMonthChange: null;
        selectionConfiguration: {
            type: "single";
            date: null;
        };
        initiallyFocusedDate: null;
        markToday: boolean;
        markOutsideDays: boolean;
    };
    contextType?: import("react").Context<any> | undefined;
};
export default _default;
