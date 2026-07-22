# Quality Assurance Checklist

Before delivering generated code, verify every check below. Fix failures before presenting output.

## Checklist

```json
{
  "checks": [
    {
      "id": "first-prompt-only",
      "assert": "Built only what the prompt asked; no unrequested scope added"
    },
    {
      "id": "component-supremacy",
      "assert": [
        "All buttons use BpkButton (or BpkLink as=\"button\" for a non-navigating action styled as a link)",
        "All text inputs use BpkInput, BpkTextarea, or BpkSelect as appropriate",
        "All headings/body copy use BpkText with a textStyle — no raw <h1>-<h6>/<p>/<span>",
        "All icons use a bpk-component-icon import — no inline <svg>",
        "No raw HTML elements where a Backpack component exists",
        "No shadcn or other non-Backpack component library used"
      ]
    },
    {
      "id": "typography-supremacy",
      "assert": [
        "All text uses a TEXT_STYLES value from foundations/typography.md via BpkText",
        "No arbitrary font-size/weight/line-height set directly",
        "No generic utility size classes (text-sm, text-base, etc.)",
        "BpkText's removed bold/weight props are not used — weight comes only from textStyle"
      ]
    },
    {
      "id": "token-usage",
      "assert": [
        "All color comes from a component's variant/color prop or a *_COLORS token — no hardcoded hex",
        "All spacing comes from BpkSpacing (TSX) or a bpk-spacing-*() SCSS function — no hardcoded px/rem",
        "All corner radius comes from the component itself — no manual border-radius override"
      ]
    },
    {
      "id": "composition-fidelity",
      "assert": [
        "Required page chrome present (see overview.md default page structure)",
        "Page-level patterns follow composition/{pattern}.md order where a matching pattern exists"
      ]
    },
    {
      "id": "content-standards",
      "assert": [
        "All user-facing strings checked against content-and-terminology.md",
        "No forbidden terms remain",
        "Every icon-only control has a short, unique accessibility label in the {verb} {unique name} form"
      ]
    },
    {
      "id": "a11y",
      "assert": [
        "Focus states are the component's own built-in focus ring — never suppressed or overridden",
        "Every BpkInput/BpkTextarea/BpkSelect is paired with a BpkLabel (or wrapped in BpkFieldset) — none are label-less",
        "BpkModalV3.Title is present (visually hidden via BpkVisuallyHidden if there's no visible heading)",
        "BpkTooltip always has an ariaLabel; BpkPopover always has a label",
        "Keyboard navigation is coherent — no custom component bypasses a Backpack component's built-in keyboard handling"
      ]
    },
    {
      "id": "imports",
      "assert": [
        "Components imported from @skyscanner/backpack-web/bpk-component-{name} — never a package's internal /src path",
        "Styles imported once via @skyscanner/backpack-web/bpk-stylesheets at the app root",
        "App root wrapped in BpkProvider (from bpk-component-layout)",
        "No imports from an underlying non-Backpack package (e.g. raw @ark-ui/react, @chakra-ui/react, @floating-ui/react) when a Backpack component already wraps it"
      ]
    }
  ]
}
```

## Rules

- This checklist runs **silently before** output is shown to the user.
- Any failed assert must be fixed, not flagged for the user to resolve.
