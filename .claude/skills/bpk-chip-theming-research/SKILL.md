---
name: bpk-chip-theming-research
description: |
  Backpack BpkChip 主题化改造的完整调研结果。Use when: (1) 为 bpk-component-chip
  添加 CSS 变量主题支持，(2) 需要了解 BpkButton 的 bpk-themeable-property 模式，
  (3) 遇到 box-shadow border 无法直接用 bpk-themeable-property 的问题，
  (4) 确认新增 CSS 变量命名和 fallback 值。
  Covers: _chips.scss 改造方案、box-shadow themeable 两行写法、
  17 个新 CSS 变量列表及 fallback、themeAttributes.ts 更新、快照更新流程。
author: Claude Code
version: 1.0.0
date: 2026-03-10
---

# BpkChip 主题化改造调研

## 问题

bpk-component-chip 的所有视觉属性（颜色、边框、border-radius、hover/active 状态）
均硬编码为 design token，消费方无法通过 CSS 变量进行主题覆盖，
与 BpkButton 的主题模式不一致。

## 背景 / 触发条件

- 需要为 BpkChip 添加全量主题支持（background、foreground、border、border-radius、交互状态）
- 参照 BpkButton 的实现模式对齐 API 风格
- 现有代码中只有 selected 状态有部分 CSS 变量（8 个）

## BpkButton 主题模式（参照对象）

位于 `packages/bpk-mixins/_buttons.scss`：

```scss
// 模式：每个可主题属性用 bpk-themeable-property mixin 包裹
@include utils.bpk-themeable-property(
  background-color,
  --bpk-button-primary-background-color,
  tokens.$bpk-private-button-primary-normal-background-day
);

// bpk-themeable-property 内部生成两行（浏览器 fallback）：
// background-color: $fallback;
// background-color: var(--var-name, $fallback);
```

`themeAttributes.ts` 用 camelCase 维护所有可主题变量名列表（去掉 `--bpk-` 前缀）。

## BpkChip 当前状态分析

所有样式集中在 `packages/bpk-mixins/_chips.scss` 的 `@mixin bpk-chip`。

### 硬编码问题清单

| 属性 | 位置 | 当前写法 |
|---|---|---|
| `border-radius` | mixin 顶部 | `tokens.$bpk-border-radius-xs * 2` |
| `background-color` | 各变体 | 直接写 token |
| `color` | 各变体 | 直接写 token |
| 边框 | 各变体 | `@include borders.bpk-border-sm(token)` |
| hover 边框 | 各变体 | `@include borders.bpk-border-sm(token)` |
| active 边框 | 各变体 | `@include borders.bpk-border-sm(token)` |

### 关键约束：box-shadow border 无法直接使用 bpk-themeable-property

`bpk-border-sm($color)` 内部实现：
```scss
// _borders.scss
@mixin _bpk-border($size, $color, $inset) {
  box-shadow: 0 0 0 $size $color #{$inset};
}
```

`bpk-themeable-property` 只能处理独立属性，无法嵌入 shorthand 值内部，
因此 box-shadow 边框必须手写两行 fallback 模式：

```scss
// ❌ 不能这样：bpk-themeable-property 无法处理 box-shadow 内嵌颜色
@include borders.bpk-border-sm(var(--my-var, $fallback)); // 不行

// ✅ 必须手写两行
box-shadow: 0 0 0 tokens.$bpk-border-size-sm tokens.$bpk-line-day inset;
box-shadow: 0 0 0 tokens.$bpk-border-size-sm var(--bpk-chip-default-border-color, tokens.$bpk-line-day) inset;
```

### on-image 特殊性

- `on-image` chip **无边框**，用 `bpk-box-shadow-sm` 投影（drop shadow）
- `bpk-box-shadow-sm` 不要动，和边框是不同用途
- 只需变量化 background-color、hover/active background

## 解决方案

### 新增 17 个 CSS 变量

**全局（1 个）：**

| 变量名 | Fallback |
|---|---|
| `--bpk-chip-border-radius` | `tokens.$bpk-border-radius-xs * 2`（0.5rem）|

**default 变体（5 个）：**

| 变量名 | Fallback |
|---|---|
| `--bpk-chip-default-background-color` | `transparent` |
| `--bpk-chip-default-text-color` | `tokens.$bpk-text-primary-day` |
| `--bpk-chip-default-border-color` | `tokens.$bpk-line-day` |
| `--bpk-chip-default-hover-border-color` | `tokens.$bpk-core-primary-day` |
| `--bpk-chip-default-active-border-color` | `tokens.$bpk-core-primary-day` |

**on-dark 变体（5 个）：**

| 变量名 | Fallback |
|---|---|
| `--bpk-chip-on-dark-background-color` | `transparent` |
| `--bpk-chip-on-dark-text-color` | `tokens.$bpk-text-on-dark-day` |
| `--bpk-chip-on-dark-border-color` | `tokens.$bpk-line-on-dark-day` |
| `--bpk-chip-on-dark-hover-border-color` | `tokens.$bpk-surface-default-day` |
| `--bpk-chip-on-dark-active-border-color` | `tokens.$bpk-surface-default-day` |

**on-image 变体（4 个）：**

| 变量名 | Fallback |
|---|---|
| `--bpk-chip-on-image-background-color` | `tokens.$bpk-surface-default-day` |
| `--bpk-chip-on-image-text-color` | `tokens.$bpk-text-primary-day` |
| `--bpk-chip-on-image-hover-background-color` | `tokens.$bpk-canvas-contrast-day` |
| `--bpk-chip-on-image-active-background-color` | `tokens.$bpk-canvas-contrast-day` |

**保留现有 8 个 selected 变量（向下兼容，命名不变）：**
- `--bpk-chip-default-selected-text-color`
- `--bpk-chip-default-selected-background-color`
- `--bpk-chip-on-dark-selected-text-color`
- `--bpk-chip-on-dark-selected-background-color`
- `--bpk-chip-on-image-selected-text-color`
- `--bpk-chip-on-image-selected-background-color`
- `--bpk-chip-on-image-selected-hover-background-color`
- `--bpk-chip-on-image-selected-active-background-color`

### _chips.scss 改造模式

```scss
@mixin bpk-chip {
  // border-radius 改为 themeable
  @include utils.bpk-themeable-property(
    border-radius,
    --bpk-chip-border-radius,
    tokens.$bpk-border-radius-xs * 2
  );

  &--default {
    @include utils.bpk-themeable-property(
      background-color, --bpk-chip-default-background-color, transparent
    );
    @include utils.bpk-themeable-property(
      color, --bpk-chip-default-text-color, tokens.$bpk-text-primary-day
    );

    // 边框：box-shadow 两行写法
    box-shadow: 0 0 0 tokens.$bpk-border-size-sm tokens.$bpk-line-day inset;
    box-shadow: 0 0 0 tokens.$bpk-border-size-sm var(--bpk-chip-default-border-color, tokens.$bpk-line-day) inset;

    @include utils.bpk-hover {
      box-shadow: 0 0 0 tokens.$bpk-border-size-sm tokens.$bpk-core-primary-day inset;
      box-shadow: 0 0 0 tokens.$bpk-border-size-sm var(--bpk-chip-default-hover-border-color, tokens.$bpk-core-primary-day) inset;
    }

    &:active:not(:disabled) {
      box-shadow: 0 0 0 tokens.$bpk-border-size-sm tokens.$bpk-core-primary-day inset;
      box-shadow: 0 0 0 tokens.$bpk-border-size-sm var(--bpk-chip-default-active-border-color, tokens.$bpk-core-primary-day) inset;
    }

    // selected border 保持 transparent 硬编码（有意为之的设计）
    &-selected {
      // 现有 selected 变量保持不变
      box-shadow: 0 0 0 tokens.$bpk-border-size-sm transparent inset;
    }
  }
  // on-dark、on-image 同理
}
```

### 需修改的文件

1. `packages/bpk-mixins/_chips.scss` — 核心样式改造
2. `packages/bpk-component-chip/src/themeAttributes.ts` — 追加 15 个新变量名
3. `packages/bpk-component-chip/src/__snapshots__/*.snap` — 删除后重新生成（4 个文件）
4. `examples/bpk-component-chip/examples.tsx` + `stories.tsx` — 新增 ThemedExample story

### Storybook 主题示例

```tsx
const ThemedExample = () => (
  <div style={{
    '--bpk-chip-border-radius': '1rem',
    '--bpk-chip-default-border-color': '#ff5a5f',
    '--bpk-chip-default-hover-border-color': '#d93025',
    '--bpk-chip-default-selected-background-color': '#ff5a5f',
  } as React.CSSProperties}>
    <StatefulSelectableChips type={CHIP_TYPES.default} />
  </div>
);
```

## 验证

改造完成后运行：
```bash
npm run jest packages/bpk-component-chip
npm run jest packages/bpk-component-chip-group
npm run lint
```

快照变化是预期的（每个可主题属性多一行 fallback），检查无视觉回归即可。

## 注意事项

- `bpk-border-sm()` 是 box-shadow，**不能**用 `bpk-themeable-property`，必须手写两行
- `on-image` 的 `bpk-box-shadow-sm` 是投影（不是边框），不要改动
- 现有 selected 变量名必须保持不变（向下兼容）
- selected 状态的 `border: transparent` 是设计意图（选中时背景取代边框），可保持硬编码
- `themeAttributes.ts` 的变量名格式：camelCase，去掉 `--bpk-` 前缀，例如 `--bpk-chip-border-radius` → `chipBorderRadius`
