# Baseline Performance Metrics

**Date**: 2026-01-27
**Branch**: impl/phase1-setup
**Purpose**: Establish performance baseline before Nx migration

## Build Performance

### Full Build
**Command**: `npm run build`

This command runs the following steps sequentially:
1. `build:copy-normal_css` - Copy CSS files
2. `build:gulp` - Run Gulp tasks
3. `build:sass` - Compile Sass to CSS
4. `build:stylesheets` - Build stylesheets package

**Baseline Time**: [To be measured]
- Recommended measurement: Run 3 times and take average
- Measurement command: `time npm run build`

### Individual Build Steps
- `build:gulp`: [To be measured]
- `build:sass`: [To be measured]
- `build:stylesheets`: [To be measured]

## Test Performance

### Full Test Suite
**Command**: `npm test`

This command runs:
1. `lint` - ESLint and Stylelint
2. `check-react-versions` - Verify React versions
3. `check-bpk-dependencies` - Verify Backpack dependencies
4. `jest` - Run all Jest tests with coverage

**Baseline Time**: [To be measured]
- Measurement command: `time npm test`

### Jest Only
**Command**: `npm run jest`
**Baseline Time**: [To be measured]

### Jest Coverage Thresholds
Current thresholds from package.json:
- Branches: 70%
- Functions: 75%
- Lines: 75%
- Statements: 75%

## Lint Performance

### Full Linting
**Command**: `npm run lint`

Includes:
1. `lint:js` - ESLint on .js, .jsx, .ts, .tsx files
2. `lint:scss` - Stylelint on .scss files

**Baseline Time**: [To be measured]
- Measurement command: `time npm run lint`

### Individual Lint Steps
- `lint:js`: [To be measured]
- `lint:scss`: [To be measured]

## Storybook Performance

### Storybook Start
**Command**: `npm run storybook`
**Startup Time**: [To be measured]

### Storybook Build
**Command**: `npm run storybook:dist`
**Build Time**: [To be measured]

## System Information

**Node Version**: >=18.20.4 (from package.json engines)
**npm Version**: >=10.7.0 (from package.json engines)
**Package Count**: 96 packages in `packages/` directory
**Build Orchestration**: npm-run-all (run-s for sequential)

## Notes

- All times should be measured on clean build (no cache)
- Measurements should be taken 3 times and averaged
- System should be under minimal load during measurement
- These metrics will be compared against Nx build times after migration

## Next Steps

After Nx installation:
1. Measure Nx build times for comparison
2. Calculate performance delta (target: <110% of baseline)
3. Verify cache effectiveness (target: <5s with cache)
4. Measure affected command performance
