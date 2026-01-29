# 剩余实现文件清单

以下是剩余需要创建的文件。每个文件的完整代码已在 [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) 中提供。

## ✅ 已完成 (Phase 1-2)

1. ✅ CheckboxCardContext.tsx
2. ✅ BpkCheckboxCardRoot.tsx
3. ✅ BpkCheckboxCardControl.tsx
4. ✅ BpkCheckboxCardContent.tsx
5. ✅ BpkCheckboxCardStack.tsx
6. ✅ BpkCheckboxCardInline.tsx
7. ✅ BpkCheckboxCardIcon.tsx

## 🚧 待实现 Slot Components

### BpkCheckboxCardLabel.tsx
```tsx
// 参考 IMPLEMENTATION_PLAN_V2.md Phase 3, Section 3.2
// 关键特性:
// - 使用 labelId from context
// - 支持 lineClamp prop (default: 2)
// - 使用 bpk-heading-5 typography
```

### BpkCheckboxCardDescription.tsx
```tsx
// 参考 IMPLEMENTATION_PLAN_V2.md Phase 3
// 关键特性:
// - 使用 descriptionId from context
// - 支持 lineClamp prop (default: 3)
// - 使用 bpk-text typography
```

### BpkCheckboxCardPrice.tsx
```tsx
// 简单的 slot 组件
// 应用 bpk-heading-5 typography
```

### BpkCheckboxCardImage.tsx
```tsx
// 关键特性:
// - src, alt props
// - 支持 height prop
// - 支持 cover prop for object-fit
```

### BpkCheckboxCardIndicator.tsx
```tsx
// 关键特性:
// - 仅在 checked 时显示（通过 context）
// - 绝对定位在右上角
// - 可选的 children (自定义图标)
```

## 🎨 SCSS 样式更新

需要更新 `BpkCheckboxCard.module.scss` 添加：

1. **CSS Variables for Theming**
```scss
.bpk-checkbox-card-root {
  background-color: var(--bpk-checkbox-card-bg-default, tokens.$bpk-canvas-day);
  color: var(--bpk-checkbox-card-fg-default, tokens.$bpk-text-primary-day);
  // ... 所有颜色都用 CSS 变量
}
```

2. **新增所有组件样式类**
- .bpk-checkbox-card-root 及变体
- .bpk-checkbox-card-control (hidden)
- .bpk-checkbox-card-content 及修饰符
- .bpk-checkbox-card-stack 及修饰符
- .bpk-checkbox-card-inline 及修饰符
- .bpk-checkbox-card-icon 及 size 修饰符
- .bpk-checkbox-card-label (lineClamp 支持)
- .bpk-checkbox-card-description (lineClamp 支持)
- .bpk-checkbox-card-price
- .bpk-checkbox-card-image
- .bpk-checkbox-card-indicator

完整 SCSS 在 IMPLEMENTATION_PLAN_V2.md Phase 4

## 📦 主导出文件

### BpkCheckboxCard/index.ts
```tsx
// 导出所有子组件
// 使用 Object.assign 模式创建复合组件
export const BpkCheckboxCard = Object.assign(BpkCheckboxCardRoot, {
  Root: BpkCheckboxCardRoot,
  Control: BpkCheckboxCardControl,
  Content: BpkCheckboxCardContent,
  Icon: BpkCheckboxCardIcon,
  // ... 所有其他组件
});
```

## 🔄 Simple Wrapper

### BpkCheckboxCardSimple/BpkCheckboxCardSimple.tsx
```tsx
// 向后兼容的 Props API
// 内部使用新的 Compound Component API
// 接受旧的 props: label, icon, image, price, etc.
```

## 📚 下一步快速执行

由于剩余文件结构相似，可以：

1. **批量创建 Slot Components** (10分钟)
   - 复制 BpkCheckboxCardIcon.tsx 模板
   - 修改 props 和 className
   - 添加特定逻辑（如 Label 的 labelId）

2. **更新 SCSS** (15分钟)
   - 复制 IMPLEMENTATION_PLAN_V2.md 中的完整 SCSS
   - 粘贴到 BpkCheckboxCard.module.scss

3. **创建主导出** (5分钟)
   - 简单的 Object.assign 模式

4. **创建 Simple Wrapper** (10分钟)
   - 使用新 API 实现旧 API

5. **测试** (20分钟)
   - 创建简单的 Storybook 示例
   - 验证所有组件正常工作

**总计**: ~1小时完成所有剩余实现

---

## 🤖 自动化选项

如果你有权限运行脚本，可以使用以下命令批量生成：

```bash
# 创建所有剩余的 slot 组件
for component in Label Description Price Image Indicator; do
  cp BpkCheckboxCardIcon.tsx BpkCheckboxCard${component}.tsx
  # 然后手动编辑每个文件的特定逻辑
done
```

---

## 📖 实现参考

所有组件的完整代码和详细说明请参考：

- [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) - 完整实现计划
- [NEW_API_DESIGN.md](./NEW_API_DESIGN.md) - API 设计文档

每个组件的实现都遵循相同的模式，只需调整：
1. Props 类型
2. ClassName
3. 特定逻辑（如 Context hook, ARIA attributes）
