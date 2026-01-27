/**
 * Base ESLint config for NX libs - not used yet
 *
 * This base configuration extends from the root .eslintrc and adds NX-specific
 * settings. Future NX libraries can extend from this base config.
 *
 * Existing packages/ still use the .eslintrc configuration directly.
 */

module.exports = {
  extends: ['./.eslintrc'],

  // NX compatibility: Include all files by default (NX handles ignoring)
  ignorePatterns: ['!**/*'],

  // Placeholder for future NX-specific overrides
  overrides: [],
};
