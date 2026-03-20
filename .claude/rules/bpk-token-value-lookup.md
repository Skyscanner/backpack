# BPK Token Usage Rules

**NO FABRICATION**: Never guess or invent a token name. The authoritative sources are:
- **SCSS**: `node_modules/@skyscanner/bpk-foundations-web/tokens/base.default.scss`
- **TSX**: `node_modules/@skyscanner/bpk-foundations-web/tokens/base.es6.d.ts`

If these files do not exist, stop and ask the user to run `npm install` first.

If a token name cannot be confirmed in those files, use the hardcoded value as-is.

---

## Naming convention (SCSS ↔ TSX)

Strip `$bpk-` prefix, camelCase the result:
- `$bpk-core-accent-day` → `coreAccentDay`
- `$bpk-text-primary-day` → `textPrimaryDay`

---

## How to look up a token

**SCSS** — search `base.default.scss`. Each entry shows the group and value:
```scss
/// @group core-colors
$bpk-core-accent-day: rgb(0, 98, 227) !default;
```

**TSX** — search `base.es6.d.ts`. Individual exports and grouped exports are both available:
```typescript
export declare const coreAccentDay = "rgb(0, 98, 227)" as const;
export declare const coreColors = { coreAccentDay, ... };
```

---

## TSX usage pattern

```typescript
import { coreAccentDay, textPrimaryDay, borderRadiusSm } from '@skyscanner/bpk-foundations-web/tokens/base.es6';

const style: CSSProperties = {
  backgroundColor: coreAccentDay,
  color: textPrimaryDay,
  borderRadius: borderRadiusSm,
};
```

---

## Common mistakes

- ❌ `tokens.$bpk-spacing-base` — spacing is a **function**: `tokens.bpk-spacing-base()`
- ❌ `tokens.bpk-border-radius-md()` — border radius is a **variable**: `tokens.$bpk-border-radius-md`
- ❌ `import { spacingBase }` — spacing scale does not exist in base.es6; SCSS only
- ❌ replacing `padding: 12px` with `tokens.bpk-spacing-base()` — `bpk-spacing-base()` is `16px`, not `12px`; `12px` has no matching token, leave it as-is; only replace if the values match exactly
