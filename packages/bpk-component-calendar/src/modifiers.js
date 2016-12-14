import isWithinRange from 'date-fns/is_within_range';
import isToday from 'date-fns/is_today';
import startOfToday from 'date-fns/start_of_today';
import addYears from 'date-fns/add_years';

export const todayModifier = isToday;
export const disabledModifier = day => !isWithinRange(day, startOfToday(), addYears(startOfToday(), 1));
