# Security Considerations

As a UI component library published to npm and consumed by Skyscanner product teams, Backpack's security responsibilities focus on supply chain integrity, safe component APIs, and dependency hygiene.

---

## Dependency Security

### Automated updates
Dependency updates managed through Dependabot/Renovate. PRs go through the full CI pipeline before merging.

### npm audit
`npm ci` in CI respects `package-lock.json` exactly, preventing unexpected dependency resolution. Run `npm audit` locally for security reviews.

### Pinned GitHub Actions
All third-party GitHub Actions pinned to full commit SHAs (not mutable tags) to prevent supply chain attacks via tag mutation.

### Minimal workflow permissions
All workflows set `permissions: {}` at top level, granting only minimum necessary per job. `persist-credentials: false` on all checkout steps.

---

## GitHub Actions Security Scanning (zizmor)

`.github/workflows/zizmor.yml` runs on every push to `main` and every PR. Detects:
- Script injection via untrusted inputs
- Overly broad permissions
- Unpinned action references
- Unsafe use of `pull_request_target`

Findings uploaded as SARIF to GitHub security events.

---

## XSS Prevention

### `dangerouslySetInnerHTML` usage
One known use: `packages/bpk-component-breadcrumb/src/BpkBreadcrumb.tsx` — injects internally-generated JSON-LD structured data (no user input).

**Policy**: New components must not use `dangerouslySetInnerHTML` with externally-sourced content. If raw HTML injection is required, content must be sanitized and the usage reviewed.

### Safe prop design
Component APIs accept typed, structured data rather than raw HTML strings. Rich content is passed as `React.ReactNode`, which React renders safely without HTML injection risk.

---

## Content Security Policy (CSP) Compatibility

- No inline `<style>` tags or `eval`/`new Function` at runtime
- Styles applied via CSS Modules (hashed class names at build time) and pre-compiled SCSS
- Compatible with strict CSP policies prohibiting `unsafe-inline` and `unsafe-eval`
- SVG icons rendered as React components (not injected HTML)

---

## Supply Chain Security

### npm publishing
All packages under `@skyscanner/` npm scope. Publishing requires:
1. Full CI pipeline pass (tests, type checks, Percy)
2. GitHub Release publication (triggers `release.yml`)
3. Explicit approval of `Publishing` GitHub environment
4. Valid `NODE_AUTH_TOKEN` scoped to `@skyscanner/`

### Source transparency
Published as non-transpiled TypeScript/JSX source, transpiled by consumers. Declaration files (`.d.ts`) emitted separately. Consumers can inspect full source.

---

## Safe Defaults in Component APIs

- Interactive components use native HTML semantics (`<button>`, `<a>`, `<input>`) rather than `div` + `onClick`
- Components accepting `href` or URL-like props: consumers responsible for sanitizing user-supplied URLs
- `disabled` follows native HTML semantics, not just visual styling
- ARIA attributes applied as static, typed props — no unsanitized string interpolation

---

## Reporting

Security vulnerabilities should be reported through Skyscanner's responsible disclosure process, not via public GitHub issues.
