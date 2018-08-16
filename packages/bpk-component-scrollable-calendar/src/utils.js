import { DateUtils } from 'bpk-component-calendar';

const getMonthsArray = (startDate, count) => {
  const months = [];

  for (let i = 0; i < count + 1; i += 1) {
    months.push(DateUtils.addMonths(startDate, i));
  }

  return months;
};
export default getMonthsArray;
