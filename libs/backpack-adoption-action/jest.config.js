module.exports = {
  rootDir: __dirname,
  transform: {
    '^.+\\.[jt]s$': ['babel-jest', { rootMode: 'upward' }],
  },
  testEnvironment: 'node',
  testRegex: 'src/.*-test\\.ts$',
  verbose: true,
};
