# 文字居中对齐修复说明

## 问题分析

从Storybook截图中看到的问题：
1. ❌ 文字没有水平居中对齐（左对齐）
2. ❌ Line-height没有变紧凑（仍然是1.5rem而不是1.25）

## 根本原因

第一次修复时只在label和price元素上添加了`text-align: center`，但是：

1. **Flex容器问题**：父容器`&__text`使用`display: flex; flex-direction: column;`，但没有设置`align-items: center`
2. **宽度问题**：Label和Price元素没有设置`width: 100%`，导致文字无法居中
3. **显示模式冲突**：`display: -webkit-box`与`text-align: center`的组合需要明确的宽度才能正常工作

## 修复方案

### 1. 在父容器上添加居中对齐

```scss
// Text wrapper
&__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center; // ✅ 新增：水平居中所有子元素
  gap: tokens.bpk-spacing-sm();
}
```

### 2. 给Label和Price设置完整宽度

```scss
// Label text
&__label {
  font-size: tokens.$bpk-font-size-base; // 1rem
  line-height: 1.25; // ✅ 125% per Figma (紧凑的行高)
  font-weight: tokens.$bpk-font-weight-bold; // 700
  letter-spacing: 0;
  text-align: center; // 文本居中
  width: 100%; // ✅ 新增：确保文本可以在整个宽度内居中
  color: tokens.$bpk-text-primary-day;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}

// Price container
&__price {
  flex-shrink: 0;
  font-size: tokens.$bpk-font-size-base; // 1rem
  line-height: 1.25; // ✅ 125% per Figma (紧凑的行高)
  font-weight: tokens.$bpk-font-weight-bold; // 700
  letter-spacing: 0;
  text-align: center; // 文本居中
  width: 100%; // ✅ 新增：确保文本可以在整个宽度内居中
  color: tokens.$bpk-text-primary-day;
}
```

## 预期效果

修复后应该看到：

### ✅ 文字水平居中
- "Default" / "Checked" 标签在卡片中居中
- "£100" 价格在卡片中居中

### ✅ 紧凑的行高
- Line-height从1.5rem → 1.25（125%）
- 文字垂直间距更紧凑，看起来更像标题而不是正文

## CSS层叠原理

```
┌─────────────────────────────────┐
│  &__content (flex container)    │
│  justify-content: center        │
│                                 │
│  ┌───────────────────────────┐ │
│  │ &__text (flex column)     │ │
│  │ align-items: center ✅    │ │ ← 这个使子元素水平居中
│  │                           │ │
│  │ ┌───────────────────────┐ │ │
│  │ │ &__label              │ │ │
│  │ │ width: 100% ✅        │ │ │ ← 这个让text-align生效
│  │ │ text-align: center ✅ │ │ │ ← 这个让文本在box内居中
│  │ │ line-height: 1.25 ✅  │ │ │ ← 这个让行高紧凑
│  │ └───────────────────────┘ │ │
│  │                           │ │
│  │ ┌───────────────────────┐ │ │
│  │ │ &__price              │ │ │
│  │ │ width: 100% ✅        │ │ │
│  │ │ text-align: center ✅ │ │ │
│  │ │ line-height: 1.25 ✅  │ │ │
│  │ └───────────────────────┘ │ │
│  └───────────────────────────┘ │
└─────────────────────────────────┘
```

## 验证步骤

1. 等待Storybook编译完成（约1-2分钟）
2. 刷新浏览器页面 http://localhost:9002
3. 查看任一variant story：
   - On Canvas Default
   - On Canvas Contrast
   - On Surface Contrast
4. 确认：
   - ✅ 文字水平居中
   - ✅ 行高更紧凑（125%）
   - ✅ 所有状态（Default, Hover, Selected）都正确显示

## 技术要点

**为什么需要三个属性配合？**

1. `align-items: center` on `&__text` (flex容器)
   - 使子元素（label, price）在flex容器中水平居中

2. `width: 100%` on `&__label` 和 `&__price`
   - 让元素占满父容器宽度
   - 为`text-align: center`提供作用空间

3. `text-align: center` on `&__label` 和 `&__price`
   - 让文本内容在元素内部居中
   - 配合`display: -webkit-box`使多行文本也居中

这三个属性缺一不可，才能实现完美的居中效果！
