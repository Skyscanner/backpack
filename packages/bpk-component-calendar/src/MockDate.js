/*
  This is a mock for the native Date type. It is necessary for snapshot testing, as otherwise Dates are
  serialised in a timezone-specific zone and may break the build. The mock should implement any methods that are used
  directly by BpkCalendar or indirectly by date-fns. It can be extended if needed.
*/

export default NativeDate => class MockDate {
  constructor(dt) {
    this.nativeDate = new NativeDate(dt);
    return this;
  }

  setDate(...args) {
    return this.nativeDate.setDate(...args);
  }

  setHours(...args) {
    return this.nativeDate.setHours(...args);
  }

  toISOString() {
    return this.nativeDate.toISOString();
  }

  toDateString() {
    return this.nativeDate.toDateString();
  }

  toJSON() {
    return this.nativeDate.valueOf();
  }
};
