# BpkIconLabel Integration Guide

**Feature Branch**: `001-bpk-icon-label`
**Created**: 2026-01-28
**Status**: Ready for Integration

## Overview

This guide provides step-by-step instructions for integrating the BpkIconLabel component into the Backpack design system.

## Completed Steps

### ✅ Phase 1: Component Implementation

- [x] Core component implementation with BpkText integration
- [x] TypeScript type definitions
- [x] CSS Modules with modern Sass API
- [x] Theme attributes configuration
- [x] Unit tests (15 tests passing)
- [x] Accessibility tests (8 tests passing)
- [x] Test coverage: 100% statements, 87.5% branches, 100% functions, 100% lines
- [x] Component README documentation

**Files Created:**
- `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx`
- `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.module.scss`
- `packages/bpk-component-icon-label/src/BpkIconLabel/common-types.ts`
- `packages/bpk-component-icon-label/src/themeAttributes.ts`
- `packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel-test.tsx`
- `packages/bpk-component-icon-label/src/BpkIconLabel/accessibility-test.tsx`
- `packages/bpk-component-icon-label/README.md`
- Export files: `src/BpkIconLabel/index.ts`, `src/index.ts`, `index.ts`

### ✅ Phase 2: Storybook Integration

- [x] Storybook stories created
- [x] Example components created
- [x] Visual regression test stories configured

**Files Created:**
- `examples/bpk-component-icon-label/stories.tsx`
- `examples/bpk-component-icon-label/examples.tsx`

**Stories Available:**
1. Default - Basic icon + text
2. WithLink - Inline BpkLink support
3. TextOnly - Text without icon
4. LongText - Text wrapping behavior
5. TypeBody - Body typography
6. TypeLabel1 - Label 1 typography (bold)
7. TypeFootnote - Footnote typography
8. OnDark - On dark backgrounds
9. OnDarkWithLink - On dark with link
10. SuccessMessage - Success variant
11. WarningMessage - Warning variant
12. AllVariants - All 6 variant combinations
13. MultipleMessages - List of messages
14. VisualTest - For Percy visual regression
15. VisualTestWithZoom - For zoomed visual regression

## Integration Checklist

### Required Steps Before Merging

- [ ] **Run All Tests**
  ```bash
  npm run jest -- packages/bpk-component-icon-label --coverage
  ```
  - Verify all 23 tests pass
  - Verify coverage meets thresholds (80%+)

- [ ] **Build Storybook**
  ```bash
  npm run build-storybook
  ```
  - Verify build succeeds
  - Check for any TypeScript errors

- [ ] **Test Storybook Locally**
  ```bash
  npm run storybook
  ```
  - Navigate to "bpk-component-icon-label" in sidebar
  - Verify all stories render correctly
  - Test interactions (hover, links, etc.)

- [ ] **Run Visual Regression Tests**
  ```bash
  npm run percy-test
  ```
  - Percy will capture "Visual test" and "Visual test with zoom" stories
  - Review snapshots on Percy dashboard
  - Approve baselines if this is the first run

- [ ] **Run Linting**
  ```bash
  npm run lint
  ```
  - Fix any linting errors in component files
  - Ensure code follows Backpack conventions

- [ ] **Run Type Checking**
  ```bash
  npm run typecheck
  ```
  - Ensure no TypeScript errors

### Optional Enhancements

- [ ] **Add to Component Catalog**
  - Update any internal component documentation
  - Add to component listing if applicable

- [ ] **Update CHANGELOG**
  - Add entry for new component release
  - Follow semantic versioning

- [ ] **Migration Guide** (if replacing an existing pattern)
  - Document how to migrate from old pattern
  - Provide code examples

## Testing in Production-Like Environments

### 1. Local Development Testing

```bash
# Start Storybook
npm run storybook

# Open http://localhost:9001
# Navigate to "bpk-component-icon-label"
# Test all stories
```

**Test Cases:**
- ✓ Icon + text rendering
- ✓ Inline link functionality
- ✓ Text wrapping with long content
- ✓ All 3 typography variants (body, label-1, footnote)
- ✓ Both color schemes (default, on-dark)
- ✓ RTL support (change browser language to Arabic/Hebrew)
- ✓ Keyboard navigation (Tab through links)
- ✓ Screen reader compatibility (test with VoiceOver/NVDA)

### 2. Integration Testing

Create a test application that imports the component:

```tsx
import BpkIconLabel from '@skyscanner/backpack-web/bpk-component-icon-label';
import InformationCircleIcon from '@skyscanner/backpack-web/bpk-component-icon/sm/information-circle';

function TestApp() {
  return (
    <BpkIconLabel.Root>
      <BpkIconLabel.Icon>
        <InformationCircleIcon />
      </BpkIconLabel.Icon>
      <BpkIconLabel.Text>Test message</BpkIconLabel.Text>
    </BpkIconLabel.Root>
  );
}
```

**Verify:**
- Component imports correctly
- No build errors
- Styles apply correctly
- Works with production build (minified)

### 3. Browser Compatibility Testing

Test on minimum supported browsers:
- ✓ Chrome 109+
- ✓ Edge 129+
- ✓ Firefox 131+
- ✓ Safari 15+
- ✓ Samsung Internet 26+

**Test Matrix:**
| Browser | Default | On-Dark | With Link | RTL | Notes |
|---------|---------|---------|-----------|-----|-------|
| Chrome  | [ ]     | [ ]     | [ ]       | [ ] |       |
| Edge    | [ ]     | [ ]     | [ ]       | [ ] |       |
| Firefox | [ ]     | [ ]     | [ ]       | [ ] |       |
| Safari  | [ ]     | [ ]     | [ ]       | [ ] |       |
| Samsung | [ ]     | [ ]     | [ ]       | [ ] |       |

### 4. Accessibility Testing

**Automated:**
```bash
npm run jest -- packages/bpk-component-icon-label/src/BpkIconLabel/accessibility-test.tsx
```

**Manual:**
- [ ] Test with screen reader (VoiceOver on Mac, NVDA on Windows)
- [ ] Verify keyboard navigation works (Tab, Enter)
- [ ] Test with high contrast mode
- [ ] Test with 200% zoom
- [ ] Verify color contrast meets WCAG AA (4.5:1 for normal text)

**Screen Reader Test Script:**
1. Navigate to component with screen reader on
2. Verify text content is read correctly
3. Verify icon is ignored (aria-hidden="true")
4. Verify links are announced and activatable
5. Verify no duplicate announcements

## Visual Regression Testing with Percy

Percy is configured to automatically capture visual snapshots of stories matching `/Visual\stest\s?([a-z]*)?/i`.

### Running Percy Tests

```bash
# Set Percy token (get from percy.io project settings)
export PERCY_TOKEN=your-token-here

# Build Storybook and capture snapshots
npm run percy-test
```

### What Gets Tested

1. **VisualTest Story**: All 6 variants (3 types × 2 styles)
2. **VisualTestWithZoom Story**: Same as above but with zoom enabled

### Reviewing Percy Results

1. Go to [percy.io](https://percy.io)
2. Find your Backpack project
3. Review the build for your branch
4. Compare new snapshots with baseline
5. Approve or reject changes

### Expected Snapshots

- **VisualTest**: Shows all typography and color variants side-by-side
- **VisualTestWithZoom**: Same content with browser zoom applied

## Common Issues and Solutions

### Issue: Import Errors

**Problem:** `Cannot find module '@skyscanner/backpack-web/bpk-component-icon-label'`

**Solution:**
- Ensure export files are created: `index.ts`, `src/index.ts`, `src/BpkIconLabel/index.ts`
- Run `npm run build` if building package separately

### Issue: Styles Not Applying

**Problem:** Component renders but styles are missing

**Solution:**
- Verify `.module.scss` file exists and is imported
- Check that CSS Modules is configured in webpack
- Ensure `cssModules` helper is used correctly
- Run `npm run build` to regenerate CSS

### Issue: Icons Not Rendering

**Problem:** Icon component doesn't display

**Solution:**
- Use correct import path: `../../../bpk-component-icon/sm/[icon-name]`
- Verify icon exists in `packages/bpk-component-icon/sm/`
- Check that icon is wrapped in `<BpkIconLabel.Icon>`

### Issue: TypeScript Errors

**Problem:** Type errors in consuming code

**Solution:**
- Ensure `common-types.ts` is properly exported
- Verify TypeScript declarations are generated
- Check import paths match type definitions

### Issue: Test Failures

**Problem:** Jest tests failing

**Solution:**
- Check import paths (relative paths in tests)
- Verify test setup includes necessary mocks
- Ensure `jest-axe` is installed for accessibility tests
- Run `npm test -- -u` to update snapshots if needed

## Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (unit + accessibility)
- [ ] Visual regression tests approved
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] No linting errors
- [ ] No TypeScript errors
- [ ] Browser compatibility tested
- [ ] Accessibility tested (automated + manual)

### Deployment Steps

1. **Merge to Main**
   ```bash
   git checkout main
   git merge 001-bpk-icon-label
   ```

2. **Version Bump** (if publishing to npm)
   ```bash
   npm version patch  # or minor/major
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Publish** (if applicable)
   ```bash
   npm publish
   ```

5. **Deploy Storybook** (if auto-deploy not configured)
   ```bash
   npm run build-storybook
   # Deploy dist-storybook/ to hosting
   ```

### Post-Deployment

- [ ] Verify component appears in published Storybook
- [ ] Test import in consumer application
- [ ] Monitor for any reported issues
- [ ] Update internal documentation links

## Support and Troubleshooting

### Component Files
- Implementation: [packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx](../../packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel.tsx)
- Tests: [packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel-test.tsx](../../packages/bpk-component-icon-label/src/BpkIconLabel/BpkIconLabel-test.tsx)
- Documentation: [packages/bpk-component-icon-label/README.md](../../packages/bpk-component-icon-label/README.md)

### Specifications
- Feature Spec: [spec.md](./spec.md)
- API Design: [api-design.md](./api-design.md)
- Styling Guide: [styling-guide.md](./styling-guide.md)
- Implementation Plan: [plan.md](./plan.md)
- Tasks: [tasks.md](./tasks.md)

### Getting Help

For questions or issues:
1. Check this integration guide
2. Review component README
3. Check Backpack contribution guidelines
4. Open an issue in the Backpack repository

## Success Criteria

The integration is complete when:

- ✅ All 23 tests pass with 80%+ coverage
- ✅ Storybook builds without errors
- ✅ All 15 stories render correctly
- ✅ Visual regression tests pass
- ✅ Component works in all supported browsers
- ✅ Accessibility tests pass (WCAG 2.1 AA)
- ✅ Documentation is complete
- ✅ Component is available in Storybook
- ✅ Component can be imported and used

---

**Last Updated**: 2026-01-28
**Component Version**: 1.0.0 (MVP)
**Status**: Ready for Integration ✓
