# Security

## Dependency Security

- **npm audit**: Run regularly to check for known vulnerabilities
- **Automated updates**: Dependabot/Renovate for dependency bumps
- **Lock file**: `package-lock.json` ensures deterministic, auditable installs
- **zizmor workflow**: `.github/workflows/zizmor.yml` performs security scanning on PRs and pushes

## Component Security

### XSS Prevention
- Components never use `dangerouslySetInnerHTML`
- User-provided content is rendered through React's built-in escaping
- Props that accept strings are treated as text content, not HTML

### Safe Defaults
- Interactive components use semantic HTML elements (`<button>`, `<a>`, `<input>`)
- No `eval()`, `Function()`, or dynamic code execution
- No inline event handlers from string props

### Content Security Policy (CSP)
- Components use CSS Modules (no inline styles by default)
- No `style` attributes generated dynamically from user input
- SVG icons are imported as React components, not injected HTML

## Supply Chain

- All packages published under `@skyscanner/` npm scope (organization-controlled)
- `npm publish` restricted to release workflow (not developer machines)
- Package provenance via GitHub Actions attestation
- `.npmrc` configured for the correct registry

## CI/CD Security

- GitHub Actions workflows use pinned action versions
- Secrets managed through GitHub repository settings
- PR checks prevent unauthorized code from merging
- Branch protection on main

## Reporting

Security vulnerabilities should be reported through Skyscanner's responsible disclosure process, not via public GitHub issues.
