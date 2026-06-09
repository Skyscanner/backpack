# Changelog

## v1.4.0 (2026-03-02)
- Fixed index.ts template: use explicit `import ... + export default` instead of `export { default }` shorthand
- Simplified README template to match standard Backpack format (button/chip pattern)
- README now only includes: Installation + Usage + Props (removed Tracking, Accessibility, Design tokens, Features sections)
- Added "What NOT to include in README" guidance
- Removed README Tracking section from verification checklist

## v1.3.0 (2026-02-28)
- Added mandatory data-backpack-ds-component attribute requirement
- Updated TypeScript template to include getDataComponentAttribute usage
- Added README Tracking section template
- Added to verification checklist

## v1.2.0 (2026-02-28)
- Closed props interface by default: no className, no HTML element spread
- Updated TypeScript template to reflect lean props API
- Updated test/example templates to match
- Updated API Encapsulation notes section

## v1.1.0 (2026-02-12)
- Added mandatory full test suite acceptance criteria
- Enhanced verification phase with comprehensive debugging steps
- Added common acceptance failure patterns and solutions
- Clarified that 100% component coverage is required
- Added detailed lint failure troubleshooting
- Documented proper handling of generated directories in .eslintignore
- Added guidance for undefined Sass token errors
- Expanded verification checklist with accessibility requirements

## v1.0.0 (2026-02-12)
- Initial skill creation from BpkThinking component migration
- Complete workflow from external repo to Backpack standards
