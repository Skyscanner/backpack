# BpkCheckboxCard V2 Implementation Plan - Ark UI Architecture

**日期**: 2026-01-29
**状态**: 🚀 Ready for Implementation

---

## 🎯 核心目标

基于新需求重新设计并实现 BpkCheckboxCard：

1. ✅ **Ark UI Compound Component Pattern** - 采用 Root/Control/Content/Slots 架构
2. ✅ **BpkThemeProvider Integration** - 支持 light/dark/brand 主题
3. ✅ **Design Token Driven** - 所有样式由 Backpack tokens 控制
4. ✅ **Slot-based API** - 清晰的 Icon/Image/Label/Description/Price slots
5. ✅ **WCAG 2.2 AA** - 升级无障碍支持
6. ✅ **向后兼容** - 保留现有 Simple API 作为 wrapper

---

## 📦 新架构设计

### **三层架构**

```
1. Context Layer (CheckboxCardContext)
   ↓
2. Compound Components (Root, Control, Content, Slots)
   ↓
3. Styled Layer (CSS Modules + Backpack Tokens)
```

### **核心组件**

```tsx
BpkCheckboxCard.Root          // 根容器 + Context Provider
BpkCheckboxCard.Control        // 隐藏的 <input type="checkbox">
BpkCheckboxCard.Content        // 内容容器 (支持 orientation/align/gap)
BpkCheckboxCard.Icon           // Icon slot
BpkCheckboxCard.Image          // Image slot
BpkCheckboxCard.Label          // Label slot
BpkCheckboxCard.Description    // Description slot
BpkCheckboxCard.Price          // Price slot
BpkCheckboxCard.Indicator      // 选中指示器
BpkCheckboxCard.Stack          // 垂直布局 primitive
BpkCheckboxCard.Inline         // 水平布局 primitive
```

---

## 📂 文件结构

```
packages/bpk-component-checkbox-card/
├── src/
│   ├── BpkCheckboxCard/
│   │   ├── BpkCheckboxCard.tsx              // 主导出 (所有子组件)
│   │   ├── BpkCheckboxCardRoot.tsx          // Root 组件
│   │   ├── BpkCheckboxCardControl.tsx       // Control 组件
│   │   ├── BpkCheckboxCardContent.tsx       // Content 容器
│   │   ├── BpkCheckboxCardIcon.tsx          // Icon slot
│   │   ├── BpkCheckboxCardImage.tsx         // Image slot
│   │   ├── BpkCheckboxCardLabel.tsx         // Label slot
│   │   ├── BpkCheckboxCardDescription.tsx   // Description slot
│   │   ├── BpkCheckboxCardPrice.tsx         // Price slot
│   │   ├── BpkCheckboxCardIndicator.tsx     // Indicator
│   │   ├── BpkCheckboxCardStack.tsx         // Stack primitive
│   │   ├── BpkCheckboxCardInline.tsx        // Inline primitive
│   │   ├── CheckboxCardContext.tsx          // Context definition
│   │   ├── BpkCheckboxCard.module.scss      // Styles (tokens-based)
│   │   ├── common-types.ts                  // TypeScript types
│   │   └── accessibility-test.tsx           // 无障碍测试
│   ├── BpkCheckboxCardSimple/               // 向后兼容 wrapper
│   │   ├── BpkCheckboxCardSimple.tsx        // Props-based API
│   │   └── BpkCheckboxCardSimple.test.tsx
│   └── index.ts                             // Package entry point
├── examples/
│   ├── examples.tsx                         // 17+ Storybook 示例
│   └── stories.tsx                          // Storybook 配置
└── package.json
```

---

## 🔧 实现阶段

### **Phase 1: Context & Core Components** (Day 1-2)

#### 1.1 CheckboxCardContext

```tsx
// CheckboxCardContext.tsx
import { createContext, useContext, useState, useId } from 'react';

type CheckboxCardContextValue = {
  // 状态
  checked: boolean;
  disabled: boolean;

  // 变体
  variant: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  radius: 'square' | 'rounded';

  // 表单属性
  name?: string;
  value?: string;

  // 回调
  onCheckedChange: (checked: boolean) => void;

  // ARIA IDs
  labelId: string;
  descriptionId: string;
  controlId: string;
};

const CheckboxCardContext = createContext<CheckboxCardContextValue | null>(null);

export function useCheckboxCardContext() {
  const context = useContext(CheckboxCardContext);
  if (!context) {
    throw new Error(
      'CheckboxCard compound components must be used within BpkCheckboxCard.Root'
    );
  }
  return context;
}

export { CheckboxCardContext };
```

#### 1.2 BpkCheckboxCardRoot

```tsx
// BpkCheckboxCardRoot.tsx
import type { ReactNode } from 'react';
import { useState, useId, useCallback } from 'react';
import { cssModules } from '../../../bpk-react-utils';
import { CheckboxCardContext } from './CheckboxCardContext';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

type RootProps = {
  // 必填
  children: ReactNode;

  // 状态控制 (受控/非受控)
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;

  // 可选属性
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;

  // 视觉变体
  variant?: 'onCanvasDefault' | 'onCanvasContrast' | 'onSurfaceContrast';
  radius?: 'square' | 'rounded';

  // 自定义尺寸
  width?: string | number;
  height?: string | number;

  // ARIA
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

export function BpkCheckboxCardRoot({
  children,
  checked: controlledChecked,
  defaultChecked = false,
  onCheckedChange,
  disabled = false,
  required = false,
  name,
  value,
  variant = 'onCanvasDefault',
  radius = 'rounded',
  width,
  height,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}: RootProps) {
  // 受控/非受控状态管理
  const isControlled = controlledChecked !== undefined;
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = isControlled ? controlledChecked : internalChecked;

  // 生成唯一 IDs
  const labelId = useId();
  const descriptionId = useId();
  const controlId = useId();

  // 状态切换处理
  const handleCheckedChange = useCallback(
    (newChecked: boolean) => {
      if (!disabled) {
        if (!isControlled) {
          setInternalChecked(newChecked);
        }
        onCheckedChange?.(newChecked);
      }
    },
    [disabled, isControlled, onCheckedChange]
  );

  // 样式类名
  const rootClassName = getClassName(
    'bpk-checkbox-card-root',
    `bpk-checkbox-card-root--${variant}`,
    `bpk-checkbox-card-root--radius-${radius}`,
    checked && 'bpk-checkbox-card-root--checked',
    disabled && 'bpk-checkbox-card-root--disabled'
  );

  // 自定义尺寸样式
  const customStyles: React.CSSProperties = {};
  if (width !== undefined) {
    customStyles.width = typeof width === 'number' ? `${width}px` : width;
  }
  if (height !== undefined) {
    customStyles.height = typeof height === 'number' ? `${height}px` : height;
  }

  // Context 值
  const contextValue = {
    checked,
    disabled,
    variant,
    radius,
    name,
    value,
    onCheckedChange: handleCheckedChange,
    labelId,
    descriptionId,
    controlId,
  };

  return (
    <CheckboxCardContext.Provider value={contextValue}>
      <div
        className={rootClassName}
        style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        data-checked={checked || undefined}
        data-disabled={disabled || undefined}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-describedby={ariaDescribedby}
      >
        {children}
      </div>
    </CheckboxCardContext.Provider>
  );
}
```

#### 1.3 BpkCheckboxCardControl

```tsx
// BpkCheckboxCardControl.tsx
import { useCheckboxCardContext } from './CheckboxCardContext';
import { cssModules } from '../../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

export function BpkCheckboxCardControl() {
  const {
    checked,
    disabled,
    name,
    value,
    onCheckedChange,
    controlId,
    labelId,
    descriptionId,
  } = useCheckboxCardContext();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange(event.target.checked);
  };

  const className = getClassName('bpk-checkbox-card-control');

  return (
    <input
      id={controlId}
      type="checkbox"
      className={className}
      checked={checked}
      disabled={disabled}
      name={name}
      value={value}
      onChange={handleChange}
      aria-checked={checked}
      aria-disabled={disabled}
      aria-labelledby={labelId}
      aria-describedby={descriptionId}
    />
  );
}
```

---

### **Phase 2: Content & Layout Primitives** (Day 2-3)

#### 2.1 BpkCheckboxCardContent

```tsx
// BpkCheckboxCardContent.tsx
import type { ReactNode } from 'react';
import { cssModules } from '../../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

type ContentProps = {
  children: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  align?: 'start' | 'center' | 'end';
  gap?: 'sm' | 'md' | 'lg' | 'xl';
};

export function BpkCheckboxCardContent({
  children,
  orientation = 'vertical',
  align = 'center',
  gap = 'md',
}: ContentProps) {
  const className = getClassName(
    'bpk-checkbox-card-content',
    `bpk-checkbox-card-content--${orientation}`,
    `bpk-checkbox-card-content--align-${align}`,
    `bpk-checkbox-card-content--gap-${gap}`
  );

  return <div className={className}>{children}</div>;
}
```

#### 2.2 Layout Primitives (Stack & Inline)

```tsx
// BpkCheckboxCardStack.tsx
import type { ReactNode } from 'react';
import { cssModules } from '../../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

type StackProps = {
  children: ReactNode;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'start' | 'center' | 'end';
};

export function BpkCheckboxCardStack({
  children,
  gap = 'md',
  align = 'center',
}: StackProps) {
  const className = getClassName(
    'bpk-checkbox-card-stack',
    `bpk-checkbox-card-stack--gap-${gap}`,
    `bpk-checkbox-card-stack--align-${align}`
  );

  return <div className={className}>{children}</div>;
}

// BpkCheckboxCardInline.tsx - 同样的结构，只是 className 不同
```

---

### **Phase 3: Slot Components** (Day 3-4)

#### 3.1 Icon Slot

```tsx
// BpkCheckboxCardIcon.tsx
import type { ReactElement } from 'react';
import { cssModules } from '../../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

type IconProps = {
  children: ReactElement;
  size?: 'sm' | 'md' | 'lg';
};

export function BpkCheckboxCardIcon({ children, size = 'md' }: IconProps) {
  const className = getClassName(
    'bpk-checkbox-card-icon',
    `bpk-checkbox-card-icon--size-${size}`
  );

  return <div className={className}>{children}</div>;
}
```

#### 3.2 Label Slot

```tsx
// BpkCheckboxCardLabel.tsx
import type { ReactNode } from 'react';
import { useCheckboxCardContext } from './CheckboxCardContext';
import { cssModules } from '../../../bpk-react-utils';
import STYLES from './BpkCheckboxCard.module.scss';

const getClassName = cssModules(STYLES);

type LabelProps = {
  children: ReactNode;
  lineClamp?: number;
};

export function BpkCheckboxCardLabel({ children, lineClamp = 2 }: LabelProps) {
  const { labelId } = useCheckboxCardContext();
  const className = getClassName('bpk-checkbox-card-label');

  return (
    <span
      id={labelId}
      className={className}
      data-line-clamp={lineClamp}
      style={{
        WebkitLineClamp: lineClamp,
      }}
    >
      {children}
    </span>
  );
}
```

#### 3.3 其他 Slots (Image, Description, Price)

类似结构，详见 NEW_API_DESIGN.md

---

### **Phase 4: Theming Support** (Day 4-5)

#### 4.1 SCSS with CSS Variables

```scss
// BpkCheckboxCard.module.scss
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/utils';
@use '../../bpk-mixins/typography';

.bpk-checkbox-card-root {
  position: relative;
  display: block;
  cursor: pointer;
  box-sizing: border-box;
  transition: all tokens.$bpk-duration-sm ease-in-out;

  // CSS 变量支持主题
  background-color: var(
    --bpk-checkbox-card-bg-default,
    tokens.$bpk-canvas-day
  );
  color: var(
    --bpk-checkbox-card-fg-default,
    tokens.$bpk-text-primary-day
  );
  border: calc(tokens.$bpk-one-pixel-rem * 1) solid
    var(--bpk-checkbox-card-border-default, tokens.$bpk-line-day);

  // Hover 状态
  &:not(&--disabled):not(&--checked) {
    @include utils.bpk-hover {
      background-color: var(
        --bpk-checkbox-card-bg-hover,
        tokens.$bpk-surface-low-contrast-day
      );
      border-color: var(
        --bpk-checkbox-card-border-hover,
        tokens.$bpk-line-day
      );
    }
  }

  // 选中状态
  &--checked {
    background-color: var(
      --bpk-checkbox-card-bg-checked,
      tokens.$bpk-surface-contrast-day
    );
    color: var(
      --bpk-checkbox-card-fg-checked,
      tokens.$bpk-text-on-dark-day
    );
    border-color: var(
      --bpk-checkbox-card-border-checked,
      transparent
    );
  }

  // 禁用状态
  &--disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: var(
      --bpk-checkbox-card-bg-disabled,
      tokens.$bpk-canvas-day
    );
    color: var(
      --bpk-checkbox-card-fg-disabled,
      tokens.$bpk-text-disabled-day
    );
  }

  // 变体
  &--on-canvas-default {
    // 使用默认 CSS 变量值
  }

  &--on-canvas-contrast {
    --bpk-checkbox-card-bg-default: #{tokens.$bpk-canvas-contrast-day};
    --bpk-checkbox-card-border-default: transparent;
  }

  &--on-surface-contrast {
    --bpk-checkbox-card-bg-default: #{tokens.$bpk-surface-tint-day};
    --bpk-checkbox-card-fg-default: #{tokens.$bpk-text-on-dark-day};
    --bpk-checkbox-card-bg-hover: #{tokens.$bpk-private-button-secondary-on-dark-pressed-background-day};
    --bpk-checkbox-card-bg-checked: #{tokens.$bpk-core-accent-day};
    --bpk-checkbox-card-border-default: transparent;
  }

  // 圆角
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

  color: inherit;
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

// Description
.bpk-checkbox-card-description {
  @include typography.bpk-text();

  color: var(
    --bpk-checkbox-card-fg-secondary,
    tokens.$bpk-text-secondary-day
  );
  text-align: center;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  .bpk-checkbox-card-root--checked & {
    color: inherit;
  }
}

// Icon
.bpk-checkbox-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;

  &--size-sm {
    font-size: tokens.bpk-icon-size-sm();
  }

  &--size-md {
    font-size: tokens.bpk-icon-size-md();
  }

  &--size-lg {
    font-size: tokens.bpk-icon-size-lg();
  }
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
}

// Price
.bpk-checkbox-card-price {
  @include typography.bpk-heading-5();

  color: inherit;
  text-align: center;
}

// Control (隐藏)
.bpk-checkbox-card-control {
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  pointer-events: none;
  clip: rect(0, 0, 0, 0);
}

// Indicator
.bpk-checkbox-card-indicator {
  position: absolute;
  top: tokens.bpk-spacing-sm();
  right: tokens.bpk-spacing-sm();
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

// Stack primitive
.bpk-checkbox-card-stack {
  display: flex;
  flex-direction: column;

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

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }
}

// Inline primitive
.bpk-checkbox-card-inline {
  display: flex;
  flex-direction: row;

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

  &--align-start {
    align-items: flex-start;
  }

  &--align-center {
    align-items: center;
  }

  &--align-end {
    align-items: flex-end;
  }
}
```

---

### **Phase 5: 主导出 & Simple Wrapper** (Day 5)

#### 5.1 主导出

```tsx
// BpkCheckboxCard.tsx
import { BpkCheckboxCardRoot } from './BpkCheckboxCardRoot';
import { BpkCheckboxCardControl } from './BpkCheckboxCardControl';
import { BpkCheckboxCardContent } from './BpkCheckboxCardContent';
import { BpkCheckboxCardIcon } from './BpkCheckboxCardIcon';
import { BpkCheckboxCardImage } from './BpkCheckboxCardImage';
import { BpkCheckboxCardLabel } from './BpkCheckboxCardLabel';
import { BpkCheckboxCardDescription } from './BpkCheckboxCardDescription';
import { BpkCheckboxCardPrice } from './BpkCheckboxCardPrice';
import { BpkCheckboxCardIndicator } from './BpkCheckboxCardIndicator';
import { BpkCheckboxCardStack } from './BpkCheckboxCardStack';
import { BpkCheckboxCardInline } from './BpkCheckboxCardInline';

export const BpkCheckboxCard = Object.assign(BpkCheckboxCardRoot, {
  Root: BpkCheckboxCardRoot,
  Control: BpkCheckboxCardControl,
  Content: BpkCheckboxCardContent,
  Icon: BpkCheckboxCardIcon,
  Image: BpkCheckboxCardImage,
  Label: BpkCheckboxCardLabel,
  Description: BpkCheckboxCardDescription,
  Price: BpkCheckboxCardPrice,
  Indicator: BpkCheckboxCardIndicator,
  Stack: BpkCheckboxCardStack,
  Inline: BpkCheckboxCardInline,
});

export default BpkCheckboxCard;
```

#### 5.2 Simple Wrapper (向后兼容)

```tsx
// BpkCheckboxCardSimple.tsx
import type { ReactElement, ReactNode } from 'react';
import { BpkCheckboxCard } from '../BpkCheckboxCard/BpkCheckboxCard';

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
  name?: string;
  value?: string;
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
  name,
  value,
}: SimpleProps) {
  return (
    <BpkCheckboxCard.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      variant={variant}
      radius={radius}
      name={name}
      value={value}
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
```

---

## 🎯 使用示例

### **新 API (推荐)**

```tsx
import { BpkCheckboxCard } from '@skyscanner/backpack-web/bpk-component-checkbox-card';
import LandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';

function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <BpkCheckboxCard.Root
      checked={selected}
      onCheckedChange={setSelected}
      variant="onCanvasDefault"
      radius="rounded"
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

### **Simple API (向后兼容)**

```tsx
import { BpkCheckboxCardSimple } from '@skyscanner/backpack-web/bpk-component-checkbox-card';

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

## ✅ 验收标准

### 功能要求
- [ ] Root/Control/Content/Slots 所有组件正常工作
- [ ] Context 正确传递状态
- [ ] 受控/非受控模式都支持
- [ ] 所有 ARIA 属性正确设置
- [ ] Keyboard navigation (Tab, Space, Enter) 正常工作

### 主题支持
- [ ] 支持 light/dark/brand 主题
- [ ] CSS 变量正确应用
- [ ] 所有样式由 Backpack tokens 控制

### 无障碍
- [ ] WCAG 2.2 AA 合规
- [ ] Screen reader 测试通过
- [ ] Keyboard-only 导航测试通过

### 向后兼容
- [ ] Simple wrapper API 与旧 API 行为一致
- [ ] 现有代码无需修改即可运行

---

## 📝 下一步

1. **开始实现 Phase 1** - Context & Core Components
2. **创建 Storybook 示例** - 展示新 API 用法
3. **编写测试** - 单元测试 + 无障碍测试
4. **文档更新** - README + Migration Guide
