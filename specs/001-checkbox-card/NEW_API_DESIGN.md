# BpkCheckboxCard 新 API 设计 - Ark UI 风格

**日期**: 2026-01-29
**状态**: 🎯 设计方案

---

## 🎨 设计目标

1. ✅ **更好的 Composable**: 采用 Ark UI 的 Compound Component 模式
2. ✅ **Token 驱动样式**: 所有样式由 Backpack design tokens 控制
3. ✅ **主题支持**: 通过 BpkThemeProvider 支持 light/dark/brand 主题
4. ✅ **Slot-based API**: 清晰的 slot 结构 (icon, image, text)
5. ✅ **无障碍**: 保持 WCAG 2.1 AA 标准
6. ✅ **向后兼容**: 提供简化的 Props API wrapper

---

## 📦 新 API 结构

### **Compound Component 模式**

```tsx
import { BpkCheckboxCard } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

// ✅ 新 API - Ark UI 风格
<BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content>
    <BpkCheckboxCard.Icon>
      <LandmarkIcon />
    </BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Content>
  <BpkCheckboxCard.Indicator>
    <TickIcon />
  </BpkCheckboxCard.Indicator>
</BpkCheckboxCard.Root>
```

---

## 🔧 组件 API 详细设计

### **1. BpkCheckboxCard.Root**

根容器，管理状态和 Context。

```tsx
type RootProps = {
  /** 是否选中 */
  checked?: boolean;
  /** 默认选中状态（非受控） */
  defaultChecked?: boolean;
  /** 选中状态变化回调 */
  onCheckedChange?: (checked: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否必填 */
  required?: boolean;
  /** 表单 name 属性 */
  name?: string;
  /** 表单 value 属性 */
  value?: string;
  /** 视觉变体 */
  variant?: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  /** 圆角样式 */
  radius?: 'square' | 'rounded';
  /** 自定义宽度 */
  width?: string | number;
  /** 自定义高度 */
  height?: string | number;
  /** 子元素 */
  children: ReactNode;
  /** ARIA label */
  'aria-label'?: string;
  /** ARIA labelledby */
  'aria-labelledby'?: string;
  /** ARIA describedby */
  'aria-describedby'?: string;
};

// 用法
<BpkCheckboxCard.Root
  checked={selected}
  onCheckedChange={setSelected}
  variant="onCanvasDefault"
  radius="rounded"
  disabled={false}
  name="location"
  value="city-centre"
>
  {/* children */}
</BpkCheckboxCard.Root>
```

---

### **2. BpkCheckboxCard.Control**

隐藏的 checkbox input 元素（headless）。

```tsx
type ControlProps = {
  /** 不接受子元素 */
  children?: never;
};

// 用法 - 自动从 Context 获取所有状态
<BpkCheckboxCard.Control />
```

**实现细节**:
- 自动获取 Root 的 `checked`, `disabled`, `name`, `value`
- 提供正确的 ARIA 属性
- 视觉隐藏但保持可访问性

---

### **3. BpkCheckboxCard.Content**

内容容器，支持布局模式。

```tsx
type ContentProps = {
  /** 布局方向 */
  orientation?: 'vertical' | 'horizontal';
  /** 对齐方式 */
  align?: 'start' | 'center' | 'end';
  /** 间距大小 */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** 子元素 */
  children: ReactNode;
};

// 用法
<BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
  <BpkCheckboxCard.Icon>{/* ... */}</BpkCheckboxCard.Icon>
  <BpkCheckboxCard.Label>Label</BpkCheckboxCard.Label>
  <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
</BpkCheckboxCard.Content>
```

---

### **4. BpkCheckboxCard.Icon** (Slot)

图标 slot。

```tsx
type IconProps = {
  /** Backpack icon 组件 */
  children: ReactElement;
  /** 图标大小 */
  size?: 'sm' | 'md' | 'lg';
};

// 用法
<BpkCheckboxCard.Icon size="md">
  <LandmarkIcon />
</BpkCheckboxCard.Icon>
```

---

### **5. BpkCheckboxCard.Image** (Slot)

图片 slot。

```tsx
type ImageProps = {
  /** 图片 URL */
  src: string;
  /** Alt 文本 */
  alt?: string;
  /** 图片高度 */
  height?: string | number;
  /** 是否覆盖容器 */
  cover?: boolean;
};

// 用法
<BpkCheckboxCard.Image
  src="https://example.com/car.png"
  alt="Car type"
  height={80}
  cover
/>
```

---

### **6. BpkCheckboxCard.Label** (Slot)

主标签 slot。

```tsx
type LabelProps = {
  /** 标签文本 */
  children: ReactNode;
  /** 最大行数（截断） */
  lineClamp?: number;
};

// 用法
<BpkCheckboxCard.Label lineClamp={2}>
  City Centre Location
</BpkCheckboxCard.Label>
```

---

### **7. BpkCheckboxCard.Description** (Slot)

描述文本 slot。

```tsx
type DescriptionProps = {
  /** 描述内容 */
  children: ReactNode;
  /** 最大行数（截断） */
  lineClamp?: number;
};

// 用法
<BpkCheckboxCard.Description lineClamp={3}>
  Central location with easy access to attractions
</BpkCheckboxCard.Description>
```

---

### **8. BpkCheckboxCard.Price** (Slot)

价格 slot。

```tsx
type PriceProps = {
  /** 价格内容（支持 BpkPrice 或纯文本） */
  children: ReactNode;
};

// 用法
<BpkCheckboxCard.Price>
  <BpkPrice price="85" currency="GBP" />
</BpkCheckboxCard.Price>

// 或纯文本
<BpkCheckboxCard.Price>from £85</BpkCheckboxCard.Price>
```

---

### **9. BpkCheckboxCard.Indicator**

选中指示器（仅在选中时显示）。

```tsx
type IndicatorProps = {
  /** 指示器图标 */
  children?: ReactElement;
  /** 是否始终显示（即使未选中） */
  forceMount?: boolean;
};

// 用法 - 自动在选中时显示
<BpkCheckboxCard.Indicator>
  <TickIcon />
</BpkCheckboxCard.Indicator>

// 或使用默认 tick icon
<BpkCheckboxCard.Indicator />
```

---

### **10. Layout Primitives (嵌套布局)**

支持自定义布局的原语组件。

```tsx
// Stack - 垂直布局
<BpkCheckboxCard.Stack gap="sm" align="start">
  <BpkCheckboxCard.Label>Label</BpkCheckboxCard.Label>
  <BpkCheckboxCard.Description>Description</BpkCheckboxCard.Description>
</BpkCheckboxCard.Stack>

// Inline - 水平布局
<BpkCheckboxCard.Inline gap="md" align="center">
  <BpkCheckboxCard.Icon><Icon /></BpkCheckboxCard.Icon>
  <BpkCheckboxCard.Label>Label</BpkCheckboxCard.Label>
</BpkCheckboxCard.Inline>
```

---

## 🌈 主题支持 (BpkThemeProvider)

### **主题 Tokens 结构**

```tsx
type CheckboxCardThemeTokens = {
  // 背景色
  background: {
    default: string;      // 默认背景
    hover: string;        // hover 背景
    checked: string;      // 选中背景
    disabled: string;     // 禁用背景
  };
  // 前景色（文本、图标）
  foreground: {
    default: string;      // 默认文本色
    secondary: string;    // 次要文本色（description）
    checked: string;      // 选中时文本色
    disabled: string;     // 禁用时文本色
  };
  // 边框
  border: {
    default: string;      // 默认边框色
    hover: string;        // hover 边框色
    checked: string;      // 选中边框色
  };
};
```

### **主题使用示例**

```tsx
import { BpkThemeProvider } from '@skyscanner/backpack-web/bpk-theme-provider';

// 1. 使用预设主题
<BpkThemeProvider theme="dark">
  <BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
    {/* 自动应用 dark theme tokens */}
  </BpkCheckboxCard.Root>
</BpkThemeProvider>

// 2. 自定义主题 tokens
const customTheme = {
  checkboxCard: {
    background: {
      default: '#FFFFFF',
      hover: '#F5F7FA',
      checked: '#0062E3',
      disabled: '#E5E7EB',
    },
    foreground: {
      default: '#161616',
      secondary: '#696E74',
      checked: '#FFFFFF',
      disabled: '#C1C7CF',
    },
    border: {
      default: '#C1C7CF',
      hover: '#696E74',
      checked: '#0062E3',
    },
  },
};

<BpkThemeProvider tokens={customTheme}>
  <BpkCheckboxCard.Root>{/* ... */}</BpkCheckboxCard.Root>
</BpkThemeProvider>

// 3. 使用 CSS 变量（最灵活）
<div style={{
  '--bpk-checkbox-card-bg-default': '#FFFFFF',
  '--bpk-checkbox-card-bg-checked': '#0062E3',
}}>
  <BpkCheckboxCard.Root>{/* ... */}</BpkCheckboxCard.Root>
</div>
```

### **预设主题定义**

```tsx
// Light Theme (default)
const lightTheme: CheckboxCardThemeTokens = {
  background: {
    default: tokens.$bpkCanvasDay,           // #FFFFFF
    hover: tokens.$bpkSurfaceLowContrastDay, // #F5F7FA
    checked: tokens.$bpkSurfaceContrastDay,  // #05203C
    disabled: tokens.$bpkSurfaceDefaultDay,  // #FFFFFF
  },
  foreground: {
    default: tokens.$bpkTextPrimaryDay,      // #161616
    secondary: tokens.$bpkTextSecondaryDay,  // #696E74
    checked: tokens.$bpkTextOnDarkDay,       // #FFFFFF
    disabled: tokens.$bpkTextDisabledDay,    // #C1C7CF
  },
  border: {
    default: tokens.$bpkLineDay,             // #C1C7CF
    hover: tokens.$bpkLineDay,               // #C1C7CF
    checked: 'transparent',
  },
};

// Dark Theme
const darkTheme: CheckboxCardThemeTokens = {
  background: {
    default: tokens.$bpkSurfaceTintDay,                      // rgba(255,255,255,0.1)
    hover: tokens.$bpkPrivateButtonSecondaryOnDarkPressedBackgroundDay, // #04182D
    checked: tokens.$bpkCoreAccentDay,                       // #0062E3
    disabled: tokens.$bpkSurfaceTintDay,
  },
  foreground: {
    default: tokens.$bpkTextOnDarkDay,       // #FFFFFF
    secondary: tokens.$bpkTextSecondaryDay,  // #C1C7CF
    checked: tokens.$bpkTextOnDarkDay,       // #FFFFFF
    disabled: tokens.$bpkTextDisabledDay,    // #696E74
  },
  border: {
    default: 'transparent',
    hover: 'transparent',
    checked: 'transparent',
  },
};

// Brand Theme (可选 - 用于营销页面)
const brandTheme: CheckboxCardThemeTokens = {
  background: {
    default: tokens.$bpkBrandPrimaryLight,   // 品牌浅色
    hover: tokens.$bpkBrandPrimary,          // 品牌主色
    checked: tokens.$bpkBrandPrimaryDark,    // 品牌深色
    disabled: tokens.$bpkCanvasContrastDay,
  },
  foreground: {
    default: tokens.$bpkTextPrimaryDay,
    secondary: tokens.$bpkTextSecondaryDay,
    checked: tokens.$bpkTextOnDarkDay,
    disabled: tokens.$bpkTextDisabledDay,
  },
  border: {
    default: tokens.$bpkBrandPrimary,
    hover: tokens.$bpkBrandPrimary,
    checked: 'transparent',
  },
};
```

---

## 📐 完整使用示例

### **示例 1: 简单用法 (垂直布局)**

```tsx
import { BpkCheckboxCard } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import LandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';

function HotelLocationSelector() {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      variant="onCanvasDefault"
      radius="rounded"
      name="location"
      value="city-centre"
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
        <BpkCheckboxCard.Icon>
          <LandmarkIcon />
        </BpkCheckboxCard.Icon>
        <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
        <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
      </BpkCheckboxCard.Content>
      <BpkCheckboxCard.Indicator />
    </BpkCheckboxCard.Root>
  );
}
```

---

### **示例 2: 水平布局 (横向卡片)**

```tsx
<BpkCheckboxCard.Root
  checked={selected}
  onCheckedChange={setSelected}
  width="auto"
  height="auto"
>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content orientation="horizontal" align="center" gap="md">
    <BpkCheckboxCard.Icon>
      <LandmarkIcon />
    </BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Content>
</BpkCheckboxCard.Root>
```

---

### **示例 3: 复杂布局 (嵌套 Stack/Inline)**

```tsx
<BpkCheckboxCard.Root
  checked={selected}
  onCheckedChange={setSelected}
  width={200}
>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content orientation="vertical" align="start" gap="sm">
    <BpkCheckboxCard.Inline gap="sm" align="center">
      <BpkCheckboxCard.Icon>
        <LandmarkIcon />
      </BpkCheckboxCard.Icon>
      <BpkCheckboxCard.Label lineClamp={1}>City Centre</BpkCheckboxCard.Label>
    </BpkCheckboxCard.Inline>

    <BpkCheckboxCard.Stack gap="xs" align="start">
      <BpkCheckboxCard.Description lineClamp={2}>
        Central location near main attractions
      </BpkCheckboxCard.Description>
      <BpkCheckboxCard.Price>from £85</BpkCheckboxCard.Price>
    </BpkCheckboxCard.Stack>
  </BpkCheckboxCard.Content>
  <BpkCheckboxCard.Indicator>
    <TickIcon />
  </BpkCheckboxCard.Indicator>
</BpkCheckboxCard.Root>
```

---

### **示例 4: 带图片 (Car Hire 场景)**

```tsx
<BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
    <BpkCheckboxCard.Image
      src="https://example.com/car.png"
      alt="Economy Car"
      height={80}
      cover
    />
    <BpkCheckboxCard.Label>Economy</BpkCheckboxCard.Label>
    <BpkCheckboxCard.Price>
      <BpkPrice price="74" currency="GBP" />
    </BpkCheckboxCard.Price>
  </BpkCheckboxCard.Content>
</BpkCheckboxCard.Root>
```

---

### **示例 5: Dark Theme**

```tsx
import { BpkThemeProvider } from '@skyscanner/backpack-web/bpk-theme-provider';

<BpkThemeProvider theme="dark">
  <div style={{ background: '#05203C', padding: '24px' }}>
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      variant="onSurfaceContrast"
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
        <BpkCheckboxCard.Icon>
          <LandmarkIcon />
        </BpkCheckboxCard.Icon>
        <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
        <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
      </BpkCheckboxCard.Content>
      <BpkCheckboxCard.Indicator />
    </BpkCheckboxCard.Root>
  </div>
</BpkThemeProvider>
```

---

## 🔌 向后兼容 Wrapper (可选)

为了不破坏现有代码，提供一个简化的 wrapper：

```tsx
// BpkCheckboxCardSimple.tsx - 向后兼容的 Props API
import { BpkCheckboxCard } from './BpkCheckboxCard';

type SimpleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  icon?: ReactElement;
  image?: string;
  price?: ReactNode;
  disabled?: boolean;
  variant?: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  radius?: 'square' | 'rounded';
  ariaLabel?: string;
};

export function BpkCheckboxCardSimple({
  checked,
  onChange,
  label,
  description,
  icon,
  image,
  price,
  disabled,
  variant,
  radius,
  ariaLabel,
}: SimpleProps) {
  return (
    <BpkCheckboxCard.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      variant={variant}
      radius={radius}
      aria-label={ariaLabel}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
        {icon && <BpkCheckboxCard.Icon>{icon}</BpkCheckboxCard.Icon>}
        {image && <BpkCheckboxCard.Image src={image} alt="" />}
        {(label || description) && (
          <BpkCheckboxCard.Stack gap="sm" align="center">
            {label && <BpkCheckboxCard.Label>{label}</BpkCheckboxCard.Label>}
            {description && (
              <BpkCheckboxCard.Description>{description}</BpkCheckboxCard.Description>
            )}
          </BpkCheckboxCard.Stack>
        )}
        {price && <BpkCheckboxCard.Price>{price}</BpkCheckboxCard.Price>}
      </BpkCheckboxCard.Content>
      <BpkCheckboxCard.Indicator />
    </BpkCheckboxCard.Root>
  );
}

// 使用方式
<BpkCheckboxCardSimple
  checked={selected}
  onChange={setSelected}
  label="City Centre"
  icon={<LandmarkIcon />}
  price="£85"
  variant="onCanvasDefault"
/>
```

---

## 🎨 样式实现 (CSS Modules + Tokens)

### **SCSS 结构**

```scss
// BpkCheckboxCard.module.scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';

.bpk-checkbox-card-root {
  position: relative;
  display: block;
  cursor: pointer;
  box-sizing: border-box;
  transition: all tokens.$bpk-duration-sm ease-in-out;

  // 使用 CSS 变量支持主题
  background-color: var(--bpk-checkbox-card-bg-default, tokens.$bpk-canvas-day);
  color: var(--bpk-checkbox-card-fg-default, tokens.$bpk-text-primary-day);
  border: calc(tokens.$bpk-one-pixel-rem * 1) solid
    var(--bpk-checkbox-card-border-default, tokens.$bpk-line-day);

  // Hover 状态
  &:not(&--disabled):not(&--checked) {
    @include utils.bpk-hover {
      background-color: var(--bpk-checkbox-card-bg-hover, tokens.$bpk-surface-low-contrast-day);
      border-color: var(--bpk-checkbox-card-border-hover, tokens.$bpk-line-day);
    }
  }

  // 选中状态
  &--checked {
    background-color: var(--bpk-checkbox-card-bg-checked, tokens.$bpk-surface-contrast-day);
    color: var(--bpk-checkbox-card-fg-checked, tokens.$bpk-text-on-dark-day);
    border-color: var(--bpk-checkbox-card-border-checked, transparent);
  }

  // 禁用状态
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(--bpk-checkbox-card-bg-disabled, tokens.$bpk-canvas-day);
    color: var(--bpk-checkbox-card-fg-disabled, tokens.$bpk-text-disabled-day);
  }

  // 圆角变体
  &--radius-square {
    border-radius: 0;
  }

  &--radius-rounded {
    border-radius: tokens.$bpk-border-radius-md;
  }
}

// Content 布局
.bpk-checkbox-card-content {
  display: flex;
  padding: tokens.bpk-spacing-md();

  &--vertical {
    flex-direction: column;
  }

  &--horizontal {
    flex-direction: row;
  }

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }

  &--gap-sm {
    gap: tokens.bpk-spacing-sm();
  }

  &--gap-md {
    gap: tokens.bpk-spacing-md();
  }

  &--gap-lg {
    gap: tokens.bpk-spacing-lg();
  }

  &--gap-xl {
    gap: tokens.bpk-spacing-xl();
  }
}

// Label
.bpk-checkbox-card-label {
  @include typography.bpk-heading-5();

  color: inherit; // 从 root 继承
  text-align: center;

  &[data-line-clamp="1"] {
    -webkit-line-clamp: 1;
  }

  &[data-line-clamp="2"] {
    -webkit-line-clamp: 2;
  }
}

// Description
.bpk-checkbox-card-description {
  @include typography.bpk-text();

  color: var(--bpk-checkbox-card-fg-secondary, tokens.$bpk-text-secondary-day);

  &[data-line-clamp="3"] {
    -webkit-line-clamp: 3;
  }
}

// Icon
.bpk-checkbox-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;

  color: inherit; // 从 root 继承
}

// Image
.bpk-checkbox-card-image {
  width: 100%;
  overflow: hidden;
  border-radius: tokens.$bpk-border-radius-sm;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &--cover {
    img {
      object-fit: cover;
    }
  }
}

// Price
.bpk-checkbox-card-price {
  @include typography.bpk-heading-5();

  color: inherit; // 从 root 继承
  text-align: center;
}

// Control (隐藏的 checkbox)
.bpk-checkbox-card-control {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
}

// Indicator
.bpk-checkbox-card-indicator {
  position: absolute;
  top: tokens.bpk-spacing-sm();
  right: tokens.bpk-spacing-sm();
  display: flex;
  align-items: center;
  justify-content: center;

  color: inherit; // 从 root 继承
}
```

---

## 🧩 Context 实现

```tsx
// CheckboxCardContext.tsx
import { createContext, useContext } from 'react';

type CheckboxCardContextValue = {
  checked: boolean;
  disabled: boolean;
  variant: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  radius: 'square' | 'rounded';
  name?: string;
  value?: string;
  onCheckedChange: (checked: boolean) => void;

  // 用于 ARIA
  labelId?: string;
  descriptionId?: string;
};

const CheckboxCardContext = createContext<CheckboxCardContextValue | null>(null);

export function useCheckboxCardContext() {
  const context = useContext(CheckboxCardContext);
  if (!context) {
    throw new Error('CheckboxCard components must be used within BpkCheckboxCard.Root');
  }
  return context;
}

export { CheckboxCardContext };
```

---

## 🚀 实现优先级

### **Phase 1: 核心功能** (Week 1)
- ✅ CheckboxCardContext 实现
- ✅ Root, Control, Content 组件
- ✅ Label, Icon, Price slots
- ✅ 基础样式 (CSS Modules + tokens)

### **Phase 2: 增强功能** (Week 2)
- ✅ Image, Description slots
- ✅ Indicator 组件
- ✅ Stack, Inline layout primitives
- ✅ 完整的 SCSS 样式

### **Phase 3: 主题支持** (Week 3)
- ✅ BpkThemeProvider 集成
- ✅ CSS 变量主题系统
- ✅ Light/Dark/Brand 预设主题
- ✅ 主题文档

### **Phase 4: 向后兼容** (Week 4)
- ✅ BpkCheckboxCardSimple wrapper
- ✅ 迁移指南
- ✅ Codemod 脚本
- ✅ Storybook 更新

---

## ✅ 优势对比

| 特性 | 旧 API (Props-based) | 新 API (Ark UI 风格) |
|------|---------------------|---------------------|
| **Composable** | 有限（固定结构） | ✅ 完全灵活 |
| **Slot-based** | ❌ 没有 slot 概念 | ✅ 清晰的 slot 结构 |
| **主题支持** | ❌ 仅 variant prop | ✅ 完整的主题系统 |
| **Layout** | 固定的 layout prop | ✅ Stack/Inline primitives |
| **类型安全** | ✅ TypeScript | ✅✅ 更强的类型推导 |
| **无障碍** | ✅ 基础 ARIA | ✅✅ 完整的 ARIA 支持 |
| **学习曲线** | ✅ 简单 | ⚠️ 稍高（但更强大） |
| **Bundle Size** | ✅ 较小 | ⚠️ 稍大（但可 tree-shake） |

---

## 📝 迁移指南 (旧 API → 新 API)

```tsx
// ❌ 旧 API
<BpkCheckboxCard
  checked={selected}
  onChange={setSelected}
  label="City Centre"
  icon={<LandmarkIcon />}
  price="£85"
  variant="onCanvasDefault"
/>

// ✅ 新 API
<BpkCheckboxCard.Root
  checked={selected}
  onCheckedChange={setSelected}
  variant="onCanvasDefault"
>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
    <BpkCheckboxCard.Icon>
      <LandmarkIcon />
    </BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Content>
  <BpkCheckboxCard.Indicator />
</BpkCheckboxCard.Root>

// 🔄 或使用 wrapper (零迁移成本)
<BpkCheckboxCardSimple
  checked={selected}
  onChange={setSelected}
  label="City Centre"
  icon={<LandmarkIcon />}
  price="£85"
  variant="onCanvasDefault"
/>
```

---

## 🎯 总结

**新 API 实现了所有目标**:

1. ✅ **更好的 Composable**: 采用 Ark UI 的 Compound Component 模式，完全灵活
2. ✅ **Token 驱动**: 所有样式由 Backpack tokens 控制，支持 CSS 变量
3. ✅ **主题支持**: 通过 BpkThemeProvider 支持 light/dark/brand 主题
4. ✅ **Slot-based API**: 清晰的 Icon, Image, Label, Description, Price slots
5. ✅ **向后兼容**: 提供 Simple wrapper，零迁移成本

**推荐实施策略**:
- 新项目：直接使用新 API (`BpkCheckboxCard.Root`)
- 现有项目：继续使用 wrapper (`BpkCheckboxCardSimple`)，逐步迁移
- 文档：同时提供两种 API 的示例，标注新 API 为推荐方式
