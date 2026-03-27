# Backpack Design Token Audit Report

**Generated**: 2026-03-27  
**Source (code)**: `@skyscanner/bpk-foundations-web/tokens/base.default.scss`  
**Source (Figma)**: Backpack Foundations — Components, "Backpack" + "Dimensions" + "Dynamic Type" collections  

## Overall Summary

| Metric | Count |
|--------|-------|
| **Total tokens analysed** | **216** |
| Matched (name + value) | 87 |
| Name mismatch (values match) | 11 |
| Value mismatch | 18 |
| Missing in code | 49 |
| Missing in Figma | 3 |
| Figma only (no code needed) | 21 |
| Platform specific (iOS/Android) | 3 |
| New in Figma (not yet in code) | 5 |
| Deprecated | 1 |
| Code-only tokens (no Figma match) | 18 |

---

# Part 1: Color Tokens

**128 Figma color tokens** in the Backpack collection (Day/Night modes)

## Text

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Text/Primary | `$bpk-text-primary-day` | Yes | Yes | **Matched** |  |
| Text/Secondary | `$bpk-text-secondary-day` | Yes | Yes | **Matched** |  |
| Text/🚧 Hero | `$bpk-text-hero-day` | Yes | Yes | **Matched** |  |
| Text/Disabled | `$bpk-text-disabled-day` | Yes | Yes | **Matched** |  |
| Text/Disabled on Dark | `$bpk-text-disabled-on-dark-day` | Yes | Yes | **Matched** |  |
| Text/💀 DEPRECATED Link | `$bpk-text-link-day` | Yes | Yes | **Deprecated** | Deprecated in Figma |
| Text/Error | `$bpk-text-error-day` | Yes | Yes | **Matched** |  |
| Text/Success | `$bpk-text-success-day` | Yes | Yes | **Matched** |  |
| Text/On Dark | `$bpk-text-on-dark-day` | Yes | Yes | **Matched** |  |
| Text/On Light | `$bpk-text-on-light-day` | Yes | Yes | **Matched** |  |
| Text/Inverse | `$bpk-text-primary-inverse-day` | Yes | Yes | **Name Mismatch** | Name differs: Inverse vs primary-inverse |

## Core

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Core/Primary | `$bpk-core-primary-day` | Yes | Yes | **Matched** |  |
| Core/Accent | `$bpk-core-accent-day` | Yes | Yes | **Matched** |  |
| Core/Eco | `$bpk-core-eco-day` | Yes | Yes | **Matched** |  |

## Status

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Status/Success Spot | `$bpk-status-success-spot-day` | Yes | Yes | **Matched** |  |
| Status/Success Fill | `$bpk-status-success-fill-day` | Yes | Yes | **Matched** |  |
| Status/Warning Spot | `$bpk-status-warning-spot-day` | Yes | Yes | **Matched** |  |
| Status/Warning Fill | `$bpk-status-warning-fill-day` | Yes | Yes | **Matched** |  |
| Status/Danger Spot | `$bpk-status-danger-spot-day` | Yes | Yes | **Matched** |  |
| Status/Danger Fill | `$bpk-status-danger-fill-day` | Yes | Yes | **Matched** |  |

## Surface

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Surface/Default | `$bpk-surface-default-day` | Yes | Yes | **Matched** |  |
| Surface/Low Contrast | `$bpk-surface-low-contrast-day` | No | Yes | **Value Mismatch** |  |
| Surface/Elevated | `$bpk-surface-elevated-day` | Yes | Yes | **Matched** |  |
| Surface/Tint | `$bpk-surface-tint-day` | Yes | Yes | **Matched** |  |
| Surface/Subtle | `$bpk-surface-subtle-day` | Yes | Yes | **Matched** |  |
| Surface/Hero | `$bpk-surface-hero-day` | Yes | Yes | **Matched** |  |
| Surface/🚧 Promo | `—` | — | — | **Missing in Code** | No code token exists |
| Surface/Contrast | `$bpk-surface-contrast-day` | Yes | Yes | **Matched** |  |
| Surface/Highlight | `$bpk-surface-highlight-day` | Yes | Yes | **Matched** |  |

## Canvas

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Canvas/Default | `$bpk-canvas-day` | Yes | Yes | **Matched** | Code uses canvas-day/night (no "default") |
| Canvas/Contrast | `$bpk-canvas-contrast-day` | Yes | Yes | **Matched** |  |

## Line / Overlay / Scrim

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Other/Line | `$bpk-line-day` | Yes | No | **Value Mismatch** |  |
| Other/Line On Dark | `$bpk-line-on-dark-day` | Yes | No | **Value Mismatch** |  |
| Other/Scrim | `$bpk-scrim-day` | Yes | Yes | **Matched** |  |
| Other/Overlay | `$bpk-overlay-day` | Yes | Yes | **Matched** |  |
| Other/Shadow | `—` | — | — | **Figma Only** | Figma-only token (code uses composite box-shadow) |

## Button

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Button/Colour/fill-primary | `$bpk-private-button-primary-normal-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-pressed-primary-on-light | `$bpk-private-button-primary-on-light-pressed-background-day` | Yes | No | **Value Mismatch** | Name structure differs |
| Component/Button/Colour/fill-primary-on-light | `$bpk-private-button-primary-on-light-normal-background-day` | No | No | **Value Mismatch** | Name structure differs |
| Component/Button/Colour/fill-primary-on-dark | `$bpk-private-button-primary-on-dark-normal-background-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/fill-pressed-primary-on-dark | `$bpk-private-button-primary-on-dark-pressed-background-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/fill-secondary | `$bpk-private-button-secondary-normal-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-pressed-secondary | `$bpk-private-button-secondary-pressed-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-secondary-on-contrast | `—` | — | — | **Missing in Code** | No dedicated code token |
| Component/Button/Colour/fill-pressed-secondary-on-contrast | `—` | — | — | **Missing in Code** | No dedicated code token |
| Component/Button/Colour/fill-secondary-on-dark | `$bpk-private-button-secondary-on-dark-normal-background-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/fill-pressed-secondary-on-dark | `$bpk-private-button-secondary-on-dark-pressed-background-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/fill-featured | `$bpk-private-button-featured-normal-background-day` | Yes | No | **Value Mismatch** |  |
| Component/Button/Colour/fill-pressed-feature | `$bpk-private-button-featured-pressed-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-destructive | `$bpk-private-button-destructive-normal-background-day` | Yes | No | **Value Mismatch** |  |
| Component/Button/Colour/fill-pressed-destructive | `$bpk-private-button-destructive-pressed-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-disabled | `$bpk-private-button-disabled-background-day` | Yes | Yes | **Matched** |  |
| Component/Button/Colour/fill-disabled-secondary-on-dark | `$bpk-private-button-secondary-on-dark-disabled-background-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/fill-footer | `—` | — | — | **Missing in Code** | No code token (footer button) |
| Component/Button/Colour/fill-pressed-footer | `—` | — | — | **Missing in Code** | No code token (footer button) |
| Component/Button/Colour/text-secondary | `—` | — | — | **Missing in Code** | No dedicated code token |
| Component/Button/Colour/text-link-on-dark | `$bpk-private-button-link-on-dark-normal-foreground-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Button/Colour/text-feature | `—` | — | — | **Missing in Code** | No dedicated code token |
| Component/Button/Colour/text-footer | `—` | — | — | **Missing in Code** | No code token (footer button) |
| Component/Button/Colour/text-disruptive | `$bpk-private-button-destructive-normal-foreground-day` | Yes | Yes | **Name Mismatch** | Name differs: disruptive vs destructive |

## Chip

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Chip/Colour/stroke-off-canvas-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/stroke-hover-canvas-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/fill-hover-dismissible-canvas-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/stroke-hover-dismissible-canvas-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/fill-on-canvas-default | `$bpk-private-chip-on-dark-on-fill-day` | No | No | **Value Mismatch** | Name mismatch - different semantics |
| Component/Chip/Colour/fill-off-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/stroke-off-on-dark | `$bpk-private-chip-on-dark-pressed-stroke-day` | No | No | **Value Mismatch** | Possible match - verify |
| Component/Chip/Colour/fill-hover-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/fill-hover-dismissible-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/stroke-hover-dismissible-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/stroke-hover-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/fill-on-on-dark | `$bpk-private-chip-on-dark-on-background-day` | Yes | No | **Value Mismatch** | Name structure differs |
| Component/Chip/Colour/fill-hover-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/fill-hover-dismissible-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/disabled | `$bpk-private-chip-disabled-background-day` | Yes | Yes | **Matched** |  |
| Component/Chip/Colour/fill-off-on-canvas-contrast (new) | `—` | — | — | **New in Figma** | New Figma token - no code equivalent yet |
| Component/Chip/Colour/stroke-Off-on-canvas-contrast (new) | `—` | — | — | **New in Figma** | New Figma token - no code equivalent yet |
| Component/Chip/Colour/fill-hover-on-canvas-contrast (new) | `—` | — | — | **New in Figma** | New Figma token - no code equivalent yet |
| Component/Chip/Colour/stroke-hover-on-canvas-contrast (new) | `—` | — | — | **New in Figma** | New Figma token - no code equivalent yet |
| Component/Chip/Colour/fill-on-on-canvas-contrast (new) | `—` | — | — | **New in Figma** | New Figma token - no code equivalent yet |
| Component/Chip/Colour/text-on | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-on-contrast | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-hover-dismissible-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-hover-dismissible-on-contrast | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-icon-on-dismissible | `$bpk-private-chip-on-dark-on-dismiss-icon-day` | No | Yes | **Value Mismatch** | Approximate match |
| Component/Chip/Colour/text-icon-on-contrast-dismissible | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip/Colour/text-icon-on-image-dismissible | `—` | — | — | **Missing in Code** | No direct code equivalent |

## Chip Group

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Chip-group/Colour/stroke-icon-off-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/stroke-icon-off-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/fill-icon-off-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/stroke-icon-hover-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/stroke-icon-hover-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/fill-icon-hover-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/fill-icon-on-default | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/fill-icon-on-on-dark | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Chip-group/Colour/fill-icon-on-on-image | `—` | — | — | **Missing in Code** | No direct code equivalent |

## Badge

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Badge/Colour/fill-default | `$bpk-private-badge-background-normal-day` | Yes | Yes | **Name Mismatch** | Name structure differs |
| Component/Badge/Colour/fill-subtle | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Badge/Colour/fill-inverse | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Badge/Colour/fill-outline | `—` | — | — | **Missing in Code** | No direct code equivalent |
| Component/Badge/Colour/stroke-outline | `—` | — | — | **Missing in Code** | No direct code equivalent |

## Info Banner

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Info Banner/default | `$bpk-private-info-banner-default-day` | Yes | Yes | **Matched** |  |
| Component/Info Banner/on-contrast | `$bpk-private-info-banner-on-contrast-day` | Yes | Yes | **Matched** |  |

## Map

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Map/marker-viewed | `$bpk-private-map-marker-viewed-foreground-day` | Yes | Yes | **Matched** |  |
| Component/Map/previous-selection | `$bpk-private-map-previous-selection-day` | Yes | Yes | **Matched** |  |
| Component/Map/cluster-pin | `$bpk-private-map-cluster-pin-day` | Yes | Yes | **Matched** |  |
| Component/Map/cluster-pin-previous-selection | `$bpk-private-map-cluster-pin-previous-selection-day` | Yes | Yes | **Matched** |  |
| Component/Map/poi-pin | `$bpk-private-map-poi-pin-day` | Yes | Yes | **Matched** |  |

## Card Button

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Card Button/contained-fill | `$bpk-private-card-button-contained-fill-day` | Yes | No | **Value Mismatch** |  |

## Navigation Tabs

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Navigation Tabs/hover | `$bpk-private-navigation-tab-hover-day` | Yes | No | **Value Mismatch** |  |
| Component/Navigation Tabs/outline | `$bpk-private-navigation-tab-outline-day` | No | No | **Value Mismatch** |  |
| Component/Navigation Tabs/selected | `—` | — | — | **Figma Only** | Figma-only token |

## Segmented Control

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Segmented Control/surface-contrast-on | `$bpk-private-segmented-control-surface-contrast-on-day` | Yes | Yes | **Matched** |  |
| Component/Segmented Control/surface-contrast | `$bpk-private-segmented-control-surface-contrast-day` | Yes | Yes | **Matched** |  |
| Component/Segmented Control/canvas-default | `$bpk-private-segmented-control-canvas-default-day` | Yes | Yes | **Matched** |  |

## Rating Bar

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Rating Bar/Default | `$bpk-private-bar-track-default-day` | Yes | Yes | **Name Mismatch** | Name differs: Rating Bar vs bar-track |
| Component/Rating Bar/On Contrast | `$bpk-private-bar-track-on-contrast-day` | Yes | Yes | **Name Mismatch** | Name differs: Rating Bar vs bar-track |

## Shadow

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Shadow/XL/color | `—` | — | — | **Missing in Code** | Code uses composite box-shadow tokens |
| Component/Shadow/Large/color | `—` | — | — | **Missing in Code** | Code uses composite box-shadow tokens |
| Component/Shadow/Small/color | `—` | — | — | **Missing in Code** | Code uses composite box-shadow tokens |

## Skeleton

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Skeleton/on-dark | `—` | — | — | **Missing in Code** | Partial match - code has shimmer-start-end and shimmer-center |

## Other Component

| Figma Variable | Code Token (day) | Day Match | Night Match | Judgement | Notes |
|----------------|-------------------|-----------|-------------|-----------|-------|
| Component/Trip Advisor | `—` | — | — | **Figma Only** | Figma-only token |
| Component/iOS Tab-bar-fill | `—` | — | — | **Platform Specific** | iOS platform-specific |
| Component/Switch/ios-switch-on-contrast-off | `—` | — | — | **Platform Specific** | iOS platform-specific |
| Component/Date Selector/cheapest-month-highlight | `—` | — | — | **Figma Only** | Figma-only token |
| Component/Date Selector/flexible-date-card | `—` | — | — | **Figma Only** | Figma-only token |
| Component/Switch/Android-switch-on-contrast-off | `—` | — | — | **Platform Specific** | Android platform-specific |

## Code-Only Color Tokens

| Code Token | Day Value | Night Value |
|------------|-----------|-------------|
| `$bpk-private-info-banner-success-day/night` | `rgb(12, 131, 138)` | `rgb(98, 241, 198)` |
| `$bpk-private-info-banner-error-day/night` | `rgb(231, 8, 102)` | `rgb(255, 100, 156)` |
| `$bpk-private-info-banner-info-day/night` | `rgb(98, 105, 113)` | `rgb(189, 196, 203)` |
| `$bpk-private-info-banner-warning-day/night` | `rgb(245, 93, 66)` | `rgb(254, 235, 135)` |
| `$bpk-private-button-link-normal-foreground-day/night` | `rgb(0, 98, 227)` | `rgb(132, 233, 255)` |
| `$bpk-private-button-link-on-dark-disabled-foreground-day/night` | `rgba(255, 255, 255, 0.2)` | `rgba(255, 255, 255, 0.2)` |
| `$bpk-private-button-primary-on-light-disabled-foreground-day/night` | `rgba(0, 0, 0, 0.2)` | `rgba(255, 255, 255, 0.2)` |
| `$bpk-private-button-primary-on-dark-disabled-foreground-day/night` | `rgba(0, 0, 0, 0.2)` | `rgba(255, 255, 255, 0.2)` |
| `$bpk-private-button-link-pressed-foreground-day/night` | `rgb(2, 77, 175)` | `rgb(209, 247, 255)` |
| `$bpk-private-button-primary-on-light-disabled-background-day/night` | `rgb(224, 228, 233)` | `rgb(11, 18, 29)` |
| `$bpk-private-button-primary-pressed-background-day/night` | `rgb(21, 70, 121)` | `rgb(5, 65, 132)` |
| `$bpk-private-button-primary-on-dark-disabled-background-day/night` | `rgb(224, 228, 233)` | `rgb(11, 18, 29)` |
| `$bpk-private-button-link-on-dark-pressed-foreground-day/night` | `rgba(255, 255, 255, 0.5)` | `rgba(255, 255, 255, 0.5)` |
| `$bpk-private-button-secondary-on-dark-disabled-foreground-day/night` | `rgba(255, 255, 255, 0.2)` | `rgba(255, 255, 255, 0.2)` |
| `$bpk-private-skeleton-shimmer-start-end-day/night` | `rgba(255, 255, 255, 0)` | `rgba(0, 0, 0, 0)` |
| `$bpk-private-skeleton-shimmer-center-day/night` | `rgba(255, 255, 255, 0.6)` | `rgba(0, 0, 0, 0.2)` |
| `$bpk-private-sponsored-banner-background-day/night` | `rgb(239, 243, 248)` | `rgb(36, 51, 70)` |
| `$bpk-private-slider-selected-day/night` | `rgb(21, 70, 121)` | `—` |

## Color Value Mismatch Details

| Figma Variable | Mode | Figma Value | Code Value |
|----------------|------|-------------|------------|
| Surface/Low Contrast | Day | `rgb(247, 249, 251)` | `rgb(245, 247, 250)` |
| Other/Line | Night | `rgba(255, 255, 255, 0.2)` | `rgb(68, 80, 95)` |
| Other/Line On Dark | Night | `rgba(255, 255, 255, 0.2)` | `rgb(68, 80, 95)` |
| Component/Button/Colour/fill-pressed-primary-on-light | Night | `rgb(0, 43, 75)` | `rgb(5, 65, 132)` |
| Component/Button/Colour/fill-primary-on-light | Day | `rgb(255, 255, 255)` | `rgb(5, 32, 60)` |
| Component/Button/Colour/fill-primary-on-light | Night | `rgb(255, 255, 255)` | `rgb(2, 77, 175)` |
| Component/Button/Colour/fill-featured | Night | `rgb(209, 247, 255)` | `rgb(132, 233, 255)` |
| Component/Button/Colour/fill-destructive | Night | `rgb(224, 228, 233)` | `rgb(36, 51, 70)` |
| Component/Card Button/contained-fill | Night | `rgba(255, 255, 255, 0.1)` | `rgba(0, 0, 0, 0.8)` |
| Component/Navigation Tabs/hover | Night | `rgb(0, 43, 75)` | `rgb(209, 247, 255)` |
| Component/Navigation Tabs/outline | Day | `rgba(255, 255, 255, 0.2)` | `rgb(193, 199, 207)` |
| Component/Navigation Tabs/outline | Night | `rgba(255, 255, 255, 0.2)` | `rgb(255, 255, 255)` |
| Component/Chip/Colour/fill-on-canvas-default | Day | `rgb(5, 32, 60)` | `rgb(21, 70, 121)` |
| Component/Chip/Colour/fill-on-canvas-default | Night | `rgb(5, 65, 132)` | `rgb(2, 77, 175)` |
| Component/Chip/Colour/stroke-off-on-dark | Day | `rgba(255, 255, 255, 0.5)` | `rgb(255, 255, 255)` |
| Component/Chip/Colour/stroke-off-on-dark | Night | `rgba(255, 255, 255, 0.2)` | `rgb(5, 65, 132)` |
| Component/Chip/Colour/fill-on-on-dark | Night | `rgb(19, 29, 43)` | `rgb(5, 65, 132)` |
| Component/Chip/Colour/text-icon-on-dismissible | Day | `rgba(255, 255, 255, 0.5)` | `rgb(98, 105, 113)` |

---

# Part 2: Spacing Tokens

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Spacing/none | `bpk-spacing-none()` | 0px | 0 (0px) | **Matched** |  |
| Spacing/xxs | `—` | 1px | — | **Missing in Code** | Figma has finer granularity |
| Spacing/xs | `—` | 2px | — | **Missing in Code** | Figma has finer granularity |
| Spacing/sm | `bpk-spacing-sm()` | 4px | 0.25rem (4px) | **Matched** |  |
| Spacing/md | `bpk-spacing-md()` | 8px | 0.5rem (8px) | **Matched** |  |
| Spacing/base | `bpk-spacing-base()` | 16px | 1rem (16px) | **Matched** |  |
| Spacing/lg | `bpk-spacing-lg()` | 24px | 1.5rem (24px) | **Matched** |  |
| Spacing/xl | `bpk-spacing-xl()` | 32px | 2rem (32px) | **Matched** |  |
| Spacing/xxl | `bpk-spacing-xxl()` | 40px | 2.5rem (40px) | **Matched** |  |
| Spacing/xxxl | `bpk-spacing-xxxl()` | 64px | 4rem (64px) | **Matched** |  |
| Spacing/xxxxl | `bpk-spacing-xxxxl()` | 96px | 6rem (96px) | **Matched** |  |

# Part 3: Border Radius Tokens

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Radius/None | `—` | 0 | — | **Figma Only** | Explicit zero in Figma, not needed in code |
| Radius/xs | `$bpk-border-radius-xs` | 4px | 0.25rem | **Matched** |  |
| Radius/sm | `$bpk-border-radius-sm` | 8px | 0.5rem | **Matched** |  |
| Radius/md | `$bpk-border-radius-md` | 12px | 0.75rem | **Matched** |  |
| Radius/nav-tabs | `$bpk-border-radius-nav-tabs` | 18px | 1.125rem | **Matched** |  |
| Radius/lg | `$bpk-border-radius-lg` | 24px | 1.5rem | **Matched** |  |
| Radius/full | `$bpk-border-radius-full` | 100% | 100% | **Matched** |  |
| — | `$bpk-border-radius-xl` | — | 2.5rem (40px) | **Missing in Figma** | Code-only token |

# Part 4: Typography Tokens

## Font Families & Weights

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Typography/Family/Sans Serif | `$bpk-font-family-base` | Skyscanner Relative | Skyscanner Relative (+ fallbacks) | **Matched** | Code includes full fallback stack |
| Typography/Family/Serif | `$bpk-font-family-larken` | Larken | Larken (+ fallbacks) | **Matched** | Code includes full fallback stack |
| Typography/Style/Hero | `$bpk-font-weight-black` | 900 | 900 | **Matched** | Figma "Style" = code "weight" |
| Typography/Style/Headline | `$bpk-font-weight-bold` | 700 | 700 | **Matched** |  |
| Typography/Style/Subhead | `$bpk-font-weight-light` | 300 | 300 | **Matched** |  |
| Typography/Style/Body | `$bpk-font-weight-book` | 400 | 400 | **Matched** |  |
| Typography/Style/Label | `$bpk-font-weight-bold` | 700 | 700 | **Matched** | Label reuses bold weight |
| Typography/Kerning/Tight | `$bpk-letter-spacing-tight` | 0 | -0.02em | **Value Mismatch** | Figma shows 0, code uses -0.02em |
| Typography/Kerning/Default | `—` | 0 | — | **Matched** | Both use 0 (normal kerning) |
| Typography/Kerning/Loose | `—` | 0 | — | **Figma Only** | Figma has 0 value — placeholder? |
| — | `$bpk-letter-spacing-display` | — | -0.05em | **Missing in Figma** | Code-only |
| — | `$bpk-letter-spacing-hero` | — | -0.04em | **Missing in Figma** | Code-only |

## Font Sizes (Dynamic Type)

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Dynamic Type/Size/12 | `$bpk-font-size-xs` | 12px | 0.75rem (12.0px) | **Matched** |  |
| Dynamic Type/Size/14 | `$bpk-font-size-sm` | 14px | 0.875rem (14.0px) | **Matched** |  |
| Dynamic Type/Size/16 | `$bpk-font-size-base` | 16px | 1rem (16px) | **Matched** |  |
| Dynamic Type/Size/20 | `$bpk-font-size-lg` | 20px | 1.25rem (20.0px) | **Matched** |  |
| Dynamic Type/Size/24 | `$bpk-font-size-xl` | 24px | 1.5rem (24.0px) | **Matched** |  |
| Dynamic Type/Size/32 | `$bpk-font-size-xxl` | 32px | 2rem (32px) | **Matched** |  |
| Dynamic Type/Size/40 | `$bpk-font-size-xxxl` | 40px | 2.5rem (40.0px) | **Matched** |  |
| Dynamic Type/Size/48 | `$bpk-font-size-xxxxl` | 48px | 3rem (48px) | **Matched** |  |
| Dynamic Type/Size/64 | `$bpk-font-size-xxxxxl` | 64px | 4rem (64px) | **Matched** |  |
| Dynamic Type/Size/76 | `$bpk-font-size-6xl` | 76px | 4.75rem (76.0px) | **Matched** |  |
| Dynamic Type/Size/96 | `$bpk-font-size-7xl` | 96px | 6rem (96px) | **Matched** |  |
| Dynamic Type/Size/120 | `$bpk-font-size-8xl` | 120px | 7.5rem (120.0px) | **Matched** |  |
| Dynamic Type/Size/144 | `—` | 144px | — | **Figma Only** | Large display size, no web equivalent |
| Dynamic Type/Size/192 | `—` | 192px | — | **Figma Only** | Large display size, no web equivalent |
| Dynamic Type/Size/240 | `—` | 240px | — | **Figma Only** | Large display size, no web equivalent |

# Part 5: Shadow Tokens

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Component/Shadow/Small | `$bpk-box-shadow-sm` | `0px 1px 3px 0px rgba(22,22,22,0.25)` | `0px 1px 3px 0px rgba(37,32,31,.3)` | **Value Mismatch** | Color differs: Figma rgba(22,22,22,0.25) vs code rgba(37,32,31,*) |
| Component/Shadow/Large | `$bpk-box-shadow-lg` | `0px 4px 14px 0px rgba(22,22,22,0.25)` | `0px 4px 14px 0px rgba(37,32,31,.25)` | **Value Mismatch** | Color differs: Figma rgba(22,22,22,0.25) vs code rgba(37,32,31,*) |
| Component/Shadow/XL | `$bpk-box-shadow-xl` | `0px 12px 50px 0px rgba(22,22,22,0.25)` | `0px 12px 50px 0px rgba(37,32,31,.25)` | **Value Mismatch** | Color differs: Figma rgba(22,22,22,0.25) vs code rgba(37,32,31,*) |

# Part 6: Component Dimension Tokens

| Figma Variable | Code Token | Figma Value | Code Value | Judgement | Notes |
|----------------|------------|-------------|------------|-----------|-------|
| Component/Button/Dimension/Radius | `$bpk-button-border-radius` | 8px | 0.5rem (8px) | **Matched** |  |
| Component/Button/Dimension/min-height-default | `$bpk-button-height` | 36px | 2.25rem (36px) | **Matched** |  |
| Component/Button/Dimension/min-height-large | `$bpk-button-large-height` | 48px | 3rem (48px) | **Matched** |  |
| Component/Button/Dimension/padding-horizontal-default | `—` | 16px | — | **Missing in Code** | Hardcoded in component CSS |
| Component/Button/Dimension/padding-horizontal-large | `—` | 16px | — | **Missing in Code** | Hardcoded in component CSS |
| Component/Button/Typography/tmp-default-label | `$bpk-font-size-base` | 16px | 1rem (16px) | **Matched** | Figma "tmp" prefix suggests temporary |
| Component/Badge/Typography/tmp-badge-label | `$bpk-font-size-sm` | 14px | 0.875rem (14px) | **Matched** | Figma "tmp" prefix suggests temporary |
| Component/Chip/Dimension/radius | `$bpk-border-radius-sm` | 8px | 0.5rem (8px) | **Matched** |  |
| Component/Chip/Dimension/min-height-width | `—` | 32px | — | **Missing in Code** | Hardcoded in component CSS |
| Component/Chip-group/Dimensions/min-height | `—` | 36px | — | **Missing in Code** | Hardcoded in component CSS |

# Part 7: Heights (Figma Only)

These are sizing tokens in the Figma Dimensions collection with no standalone code equivalents.

| Figma Variable | Value | Notes |
|----------------|-------|-------|
| Heights/base | 16px | Used for component sizing in Figma |
| Heights/20 | 20px | Used for component sizing in Figma |
| Heights/24 | 24px | Used for component sizing in Figma |
| Heights/32 | 32px | Used for component sizing in Figma |
| Heights/36 | 36px | Used for component sizing in Figma |
| Heights/40 | 40px | Used for component sizing in Figma |
| Heights/44 | 44px | Used for component sizing in Figma |
| Heights/48 | 48px | Used for component sizing in Figma |
| Heights/52 | 52px | Used for component sizing in Figma |
| Heights/56 | 56px | Used for component sizing in Figma |
| Heights/64 | 64px | Used for component sizing in Figma |
