# BpkCheckboxCard V2 - 最终实现状态

**更新时间**: 2026-01-29
**状态**: ✅ 核心架构完成，剩余 5 个 slot 组件 + SCSS + 集成

---

## ✅ 已完成 (8/13 核心文件)

### 架构层 (100% 完成)
1. ✅ **CheckboxCardContext.tsx** - Context + useCheckboxCardContext hook
2. ✅ **BpkCheckboxCardRoot.tsx** - 根容器，状态管理，Context Provider

### 核心组件 (100% 完成)
3. ✅ **BpkCheckboxCardControl.tsx** - 隐藏的 checkbox input
4. ✅ **BpkCheckboxCardContent.tsx** - 布局容器

### Layout Primitives (100% 完成)
5. ✅ **BpkCheckboxCardStack.tsx** - 垂直布局
6. ✅ **BpkCheckboxCardInline.tsx** - 水平布局

### Slot Components (2/6 完成)
7. ✅ **BpkCheckboxCardIcon.tsx** - Icon slot
8. ✅ **BpkCheckboxCardLabel.tsx** - Label slot (with lineClamp)

---

## 🚧 剩余任务 (5个文件 + 集成)

### Slot Components (4个文件)
- [ ] **BpkCheckboxCardDescription.tsx** - 类似 Label，lineClamp=3，使用 descriptionId
- [ ] **BpkCheckboxCardPrice.tsx** - 简单组件，bpk-heading-5
- [ ] **BpkCheckboxCardImage.tsx** - src, alt, height, cover props
- [ ] **BpkCheckboxCardIndicator.tsx** - 仅在 checked 时显示，绝对定位

### 样式文件 (1个文件)
- [ ] **更新 BpkCheckboxCard.module.scss**
  - 添加 CSS 变量主题支持
  - 添加所有新组件的样式类
  - 完整代码在 IMPLEMENTATION_PLAN_V2.md Phase 4

### 集成文件 (2个文件)
- [ ] **BpkCheckboxCard/index.ts** - 主导出，Object.assign 模式
- [ ] **BpkCheckboxCardSimple.tsx** - 向后兼容 wrapper

### 测试 & 文档
- [ ] 更新 Storybook 示例展示新 API
- [ ] 添加单元测试
- [ ] 更新 README.md

---

## 📦 快速完成指南

### Step 1: 完成剩余 Slot Components (15分钟)

**BpkCheckboxCardDescription.tsx** (复制 Label，改3处):
```tsx
// 1. 改 Props 名称
export type BpkCheckboxCardDescriptionProps

// 2. 改 default lineClamp
lineClamp = 3

// 3. 改 Context hook
const { descriptionId } = useCheckboxCardContext();
// id={descriptionId}
```

**BpkCheckboxCardPrice.tsx** (最简单):
```tsx
// 无需 Context
// 只需 className='bpk-checkbox-card-price'
export function BpkCheckboxCardPrice({ children }: { children: ReactNode }) {
  return <div className={getClassName('bpk-checkbox-card-price')}>{children}</div>;
}
```

**BpkCheckboxCardImage.tsx**:
```tsx
type ImageProps = {
  src: string;
  alt?: string;
  height?: string | number;
  cover?: boolean;
};
// <img> 标签，object-fit 根据 cover prop
```

**BpkCheckboxCardIndicator.tsx**:
```tsx
// 使用 Context 的 checked 状态
const { checked } = useCheckboxCardContext();
if (!checked && !forceMount) return null;
// 绝对定位 absolute top right
```

### Step 2: 更新 SCSS (10分钟)

直接复制 [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) Phase 4 中的完整 SCSS 代码到 `BpkCheckboxCard.module.scss`。

关键变化：
- 添加 CSS 变量：`var(--bpk-checkbox-card-bg-default, fallback)`
- 所有新的 BEM 类名（-root, -control, -content, -stack, -inline, -icon, etc.)

### Step 3: 创建主导出 (5分钟)

```tsx
// packages/bpk-component-checkbox-card/src/BpkCheckboxCard/index.ts
import { BpkCheckboxCardRoot } from './BpkCheckboxCardRoot';
import { BpkCheckboxCardControl } from './BpkCheckboxCardControl';
// ... import all others

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

// Re-export types
export * from './common-types';
export type { BpkCheckboxCardRootProps } from './BpkCheckboxCardRoot';
// ... all other prop types
```

### Step 4: 创建 Simple Wrapper (10分钟)

```tsx
// BpkCheckboxCardSimple/BpkCheckboxCardSimple.tsx
import { BpkCheckboxCard } from '../BpkCheckboxCard';

type SimpleProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  icon?: ReactElement;
  image?: string;
  price?: ReactNode;
  disabled?: boolean;
  variant?: CheckboxCardVariant;
  radius?: CheckboxCardRadius;
  ariaLabel?: string;
};

export function BpkCheckboxCardSimple(props: SimpleProps) {
  return (
    <BpkCheckboxCard.Root
      checked={props.checked}
      onCheckedChange={props.onChange}
      disabled={props.disabled}
      variant={props.variant}
      radius={props.radius}
      aria-label={props.ariaLabel}
    >
      <BpkCheckboxCard.Control />
      <BpkCheckboxCard.Content orientation="vertical" align="center" gap="md">
        {props.icon && <BpkCheckboxCard.Icon>{props.icon}</BpkCheckboxCard.Icon>}
        {props.image && <BpkCheckboxCard.Image src={props.image} />}
        {(props.label || props.description) && (
          <BpkCheckboxCard.Stack gap="sm">
            {props.label && <BpkCheckboxCard.Label>{props.label}</BpkCheckboxCard.Label>}
            {props.description && (
              <BpkCheckboxCard.Description>{props.description}</BpkCheckboxCard.Description>
            )}
          </BpkCheckboxCard.Stack>
        )}
        {props.price && <BpkCheckboxCard.Price>{props.price}</BpkCheckboxCard.Price>}
      </BpkCheckboxCard.Content>
      <BpkCheckboxCard.Indicator />
    </BpkCheckboxCard.Root>
  );
}
```

### Step 5: 更新 Package 导出 (2分钟)

```tsx
// packages/bpk-component-checkbox-card/src/index.ts
export { default, BpkCheckboxCard } from './BpkCheckboxCard';
export { BpkCheckboxCardSimple } from './BpkCheckboxCardSimple/BpkCheckboxCardSimple';
export * from './BpkCheckboxCard/common-types';
```

---

## 🎯 测试验证

创建简单的 Storybook 示例：

```tsx
// examples/bpk-component-checkbox-card/new-api-examples.tsx
import { BpkCheckboxCard } from '../../packages/bpk-component-checkbox-card';
import LandmarkIcon from '@skyscanner/backpack-web/bpk-component-icon/lg/landmark';

export const NewAPIExample = () => {
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
};
```

---

## 📊 进度总结

| 类别 | 完成 | 总计 | 百分比 |
|------|------|------|--------|
| 架构层 | 2 | 2 | 100% ✅ |
| 核心组件 | 2 | 2 | 100% ✅ |
| Layout Primitives | 2 | 2 | 100% ✅ |
| Slot Components | 2 | 6 | 33% 🚧 |
| 样式文件 | 0 | 1 | 0% ⏳ |
| 集成文件 | 0 | 2 | 0% ⏳ |
| **总计** | **8** | **15** | **53%** |

**预计剩余时间**: 45-60 分钟

---

## 🚀 下一步行动

1. **立即执行**: 按照 Step 1-5 完成剩余实现
2. **参考文档**: 所有代码示例在 [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md)
3. **API 设计**: 完整 API 文档在 [NEW_API_DESIGN.md](./NEW_API_DESIGN.md)

**核心架构已完成，剩余工作都是重复性实现，预计1小时内可完成全部。**
