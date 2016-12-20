module.exports = {
  test(val) {
    return val && val instanceof Date;
  },
  print(val) {
    return val.toDateString();
  },
};
