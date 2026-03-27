# Core Beliefs

These principles guide every decision in the Backpack design system.

## 1. Consistency Over Flexibility

Backpack exists to create a consistent user experience across all Skyscanner products. Components intentionally limit customization (restricted `className` and `style` props) to prevent visual divergence. When consumers need something different, the answer is a new component variant — not an escape hatch.

## 2. Accessibility is Non-Negotiable

Every component must meet **WCAG 2.2 AA** standards. This is enforced through:
- Automated `jest-axe` tests on every component
- Keyboard navigation support as a requirement
- Screen reader compatibility
- Color contrast validation
- An accessibility Definition of Done (DoD) in [CONTRIBUTING.md](../../CONTRIBUTING.md)

Accessibility is not a feature — it's a baseline.

## 3. Design-Development Alignment

Components should look and behave identically to their Figma designs. Figma Code Connect (`.figma.tsx` files) maps components directly to design specs, ensuring:
- Designers and developers share the same source of truth
- Prop names align with Figma variant names where possible
- Visual regression testing (Percy) catches unintended drift

## 4. Performance by Default

Bundle size matters. The architecture supports this through:
- Individual package imports (tree shaking by design)
- No unnecessary runtime dependencies
- rem-based sizing (see `decisions/sizing-in-rem.md`)
- Lightweight components with minimal abstraction layers

## 5. Internationalization Built In

All components support:
- RTL (right-to-left) languages
- Text expansion across locales
- Semantic HTML that adapts to language direction
- No hardcoded text or locale-specific assumptions

## 6. Backwards Compatibility

Breaking changes follow a predictable path:
- **3-month deprecation window** minimum before removal
- **Future API** pattern: opt-in breaking changes via `V{number}` prefix
- **Quarterly major releases** for coordinated breaking changes
- Clear migration guides for version upgrades

See `decisions/deprecated-api.md` and `decisions/future-api.md` for details.

## 7. Developer Experience

Good DX drives adoption:
- TypeScript strict mode for type safety and autocompletion
- Consistent prop naming across components (`size`, `variant`, `disabled`)
- Comprehensive Storybook stories for exploration
- Clear component READMEs with usage examples
- Automated code quality via ESLint, Stylelint, and Prettier
