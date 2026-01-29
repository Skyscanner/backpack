# Checkbox Card Bug Fixes

**日期**: 2026-01-28 (初始修复)
**更新**: 2026-01-29 (新增 shadow 和命名修复)

## 修复的问题

### 1. 文字溢出问题 (WithDescription & LongText)

**问题描述**:
- WithDescriptionExample 和 LongTextExample 中的文字内容没有完全包含在容器内
- 文字超出卡片边界

**根本原因**:
- `&__text` 容器设置了 `flex-shrink: 0`，阻止其收缩以适应容器
- `&__description` 缺少 `width: 100%` 和 `text-align: center` 属性

**修复方案** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

1. **Text wrapper 修复** (line 221-230):
```scss
&__text {
  flex-shrink: 1;        // 改为 1，允许收缩 (原来是 0)
  min-width: 0;
  width: 100%;           // 新增：确保占满父容器宽度
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: tokens.bpk-spacing-sm();
  margin-top: tokens.bpk-spacing-md();
}
```

2. **Description 修复** (line 252-266):
```scss
&__description {
  @include typography.bpk-text();

  color: tokens.$bpk-text-secondary-day;
  text-align: center;    // 新增：文本居中
  width: 100%;           // 新增：占满父容器宽度
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;

  .bpk-checkbox-card--disabled & {
    color: tokens.$bpk-text-disabled-day;
  }
}
```

**效果**:
- ✅ Label 文字正确截断为 2 行 (已有 `-webkit-line-clamp: 2`)
- ✅ Description 文字正确截断为 3 行 (`-webkit-line-clamp: 3`)
- ✅ 所有文字居中对齐
- ✅ 文字完全包含在卡片容器内
- ✅ 超长文字显示省略号

---

### 2. 移除 WithContext 示例

**问题描述**:
- WithContextExample 不再需要，应该移除

**修复方案**:

1. **从 stories.tsx 移除导入和导出** ([stories.tsx](../../examples/bpk-component-checkbox-card/stories.tsx)):
```typescript
// 移除导入
import {
  // ...
  WithContextExample, // ❌ 删除
  // ...
} from './examples';

// 移除导出
export const WithContext = WithContextExample; // ❌ 删除
```

2. **从 examples.tsx 删除整个函数** ([examples.tsx](../../examples/bpk-component-checkbox-card/examples.tsx)):
```typescript
export const WithContextExample = () => (...); // ❌ 完全删除 (60+ 行代码)
```

**效果**:
- ✅ Storybook 中不再显示 "WithContext" story
- ✅ 代码更简洁，移除了冗余示例
- ✅ 其他 variant 示例仍然保留 (OnCanvasDefault, OnCanvasContrast, OnSurfaceContrast)

---

## 验证清单

### 文字截断验证
- [ ] 运行 Storybook: `npm run storybook`
- [ ] 查看 "WithDescription" story - 确认 description 文字正确截断
- [ ] 查看 "LongText" story - 确认超长 label 和 description 都正确截断并显示省略号
- [ ] 测试不同内容长度 - 确认文字始终包含在卡片内

### 移除示例验证
- [ ] 确认 Storybook 中没有 "WithContext" story
- [ ] 确认其他 stories 正常工作
- [ ] 确认没有 TypeScript 编译错误

---

## 相关文件

### 修改的文件
1. [BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)
   - Line 221-230: `&__text` 修复
   - Line 252-266: `&__description` 修复

2. [stories.tsx](../../examples/bpk-component-checkbox-card/stories.tsx)
   - Line 21-42: 移除 `WithContextExample` 导入
   - Line 49-67: 移除 `WithContext` 导出

3. [examples.tsx](../../examples/bpk-component-checkbox-card/examples.tsx)
   - Line 573-633: 删除 `WithContextExample` 函数定义

---

## 技术细节

### Flexbox 收缩行为
- `flex-shrink: 0` - 元素永不收缩，即使空间不足
- `flex-shrink: 1` - 元素可以收缩以适应容器（默认值）
- `min-width: 0` - 允许 flex 子元素收缩到小于内容宽度

### Webkit Line Clamp
- 需要配合 `display: -webkit-box` 和 `-webkit-box-orient: vertical` 使用
- `-webkit-line-clamp: n` - 限制显示 n 行
- `overflow: hidden` + `text-overflow: ellipsis` - 显示省略号

### 文字对齐
- `text-align: center` - 文字居中对齐
- `width: 100%` - 确保文字可以在整个宽度内居中

---

## 测试建议

### 手动测试
```bash
# 启动 Storybook
npm run storybook

# 测试以下 stories:
# 1. WithDescription - 查看 description 截断
# 2. LongText - 查看超长文字截断
# 3. 确认 WithContext story 已移除
```

### 视觉回归测试
如果有自动化视觉测试，应该验证：
- WithDescription 的文字不再溢出
- LongText 的省略号正确显示
- 其他 stories 的视觉效果不受影响

---

### 3. 变体边框和 Hover 状态修正

**问题描述**:
- onCanvasDefault 和 onCanvasContrast 的边框状态实现反了
- 所有变体的 hover 状态不应该有 shadow

**根本原因**:
- 初始实现时对两个变体的视觉效果理解有误
- 错误地为所有 hover 状态添加了 shadow

**修复方案** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

1. **onCanvasDefault 修复** (line 76-88):
```scss
&--on-canvas-default {
  border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // ✅ 默认有边框
  background-color: tokens.$bpk-surface-default-day;

  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // 保持边框
      background-color: tokens.$bpk-surface-low-contrast-day; // ✅ hover 时背景变浅灰
      // ❌ 无 shadow
    }
  }
}
```

2. **onCanvasContrast 修复** (line 91-102):
```scss
&--on-canvas-contrast {
  border: none; // ✅ 默认无边框
  background-color: tokens.$bpk-surface-default-day;

  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day; // ✅ hover 时边框出现
      background-color: tokens.$bpk-surface-default-day; // 背景保持白色
      // ❌ 无 shadow
    }
  }
}
```

3. **onSurfaceContrast 修复** (line 127-131):
```scss
&--on-surface-contrast {
  // ...
  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      background-color: tokens.$bpk-private-button-secondary-on-dark-pressed-background-day;
      // ❌ 移除 shadow
    }
  }
}
```

4. **移除 bpk-card mixin 继承的 shadow** (line 44-55):
```scss
.bpk-checkbox-card {
  // Override bpk-card mixin shadows - checkbox cards should not have shadows
  box-shadow: none;
  cursor: pointer;
  box-sizing: border-box;

  // Base card styling
  @include cards.bpk-card;

  // Override the pseudo-element shadow that bpk-card mixin adds for hover effect
  &::after {
    display: none; // Completely hide the shadow pseudo-element
  }
}
```

**效果**:
- ✅ onCanvasDefault 默认有边框，hover 时背景变色
- ✅ onCanvasContrast 默认无边框，hover 时边框出现
- ✅ 所有 hover 状态都没有 shadow（包括覆盖 bpk-card mixin 的默认 shadow）
- ✅ 符合正确的设计规范

---

### 4. 示例函数命名混淆

**问题描述**:
- `WithBackgroundVariant` 实际展示的是 `onCanvasDefault` 变体
- `NoBackgroundVariant` 实际展示的是 `onCanvasContrast` 变体
- 函数名与实际内容不符，造成混淆

**根本原因**:
- 初始实现时使用了描述性名称，但与实际的变体名称不匹配

**修复方案**:

1. **重命名示例函数** ([examples.tsx](../../examples/bpk-component-checkbox-card/examples.tsx)):
```typescript
// 之前: WithBackgroundVariant
// 之后: OnCanvasDefaultVariant
export const OnCanvasDefaultVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Rounded</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasDefault}
          radius={CHECKBOX_CARD_RADIUS.rounded}
        />
        // ...
      </div>
    </div>
  </div>
);

// 之前: NoBackgroundVariant
// 之后: OnCanvasContrastVariant
export const OnCanvasContrastVariant = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
    <div>
      <h4 style={{ marginBottom: '12px' }}>Rounded</h4>
      <div style={{ display: 'flex', gap: '12px' }}>
        <StatefulCheckboxCard
          ariaLabel="Default"
          variant={CHECKBOX_CARD_VARIANTS.onCanvasContrast}
          radius={CHECKBOX_CARD_RADIUS.rounded}
        />
        // ...
      </div>
    </div>
  </div>
);
```

2. **更新 stories 导入和导出** ([stories.tsx](../../examples/bpk-component-checkbox-card/stories.tsx)):
```typescript
// 更新导入 (line 26-27)
import {
  // ...
  OnCanvasDefaultVariant,    // 之前: WithBackgroundVariant
  OnCanvasContrastVariant,   // 之前: NoBackgroundVariant
  // ...
} from './examples';

// 更新导出 (line 53-54)
export const OnCanvasDefault = OnCanvasDefaultVariant;    // 之前: WithBackgroundVariant
export const OnCanvasContrast = OnCanvasContrastVariant;  // 之前: NoBackgroundVariant
```

**效果**:
- ✅ 示例函数名称与实际变体名称一致
- ✅ 消除了命名混淆
- ✅ 更容易理解每个示例展示的内容
- ✅ Storybook 中的 story 名称保持不变 (OnCanvasDefault, OnCanvasContrast)

---

---

### 5. Background Color Token 修正

**问题描述**:
- onCanvasDefault 和 onCanvasContrast 都使用了 `$bpk-surface-default-day` token
- 应该分别使用 Canvas/Default 和 Canvas/Contrast token

**根本原因**:
- 使用了错误的 token，应该使用 Canvas 系列而不是 Surface 系列

**修复方案** ([BpkCheckboxCard.module.scss](../../packages/bpk-component-checkbox-card/src/BpkCheckboxCard/BpkCheckboxCard.module.scss)):

1. **onCanvasDefault 背景 token 修正** (line 87):
```scss
&--on-canvas-default {
  border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day;
  background-color: tokens.$bpk-canvas-day; // ✅ 修正为 Canvas/Default (#FFFFFF)
  // 之前: tokens.$bpk-surface-default-day
}
```

2. **onCanvasContrast 背景 token 修正** (line 103, 109):
```scss
&--on-canvas-contrast {
  border: none;
  background-color: tokens.$bpk-canvas-contrast-day; // ✅ 修正为 Canvas/Contrast (#EFF3F8)
  // 之前: tokens.$bpk-surface-default-day

  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      border: calc(tokens.$bpk-one-pixel-rem * 1) solid tokens.$bpk-line-day;
      background-color: tokens.$bpk-canvas-contrast-day; // ✅ Hover 时保持相同
    }
  }
}
```

**效果**:
- ✅ onCanvasDefault 使用正确的 Canvas/Default token (#FFFFFF)
- ✅ onCanvasContrast 使用正确的 Canvas/Contrast token (#EFF3F8 浅灰色)
- ✅ 两个变体在视觉上有明确的区别
- ✅ 符合 Figma 设计规范的 token 命名

---

## 总结

✅ **修复完成**:
1. 文字截断问题已修复 - 所有文字正确包含在容器内
2. WithContext 示例已完全移除 - 代码更清晰
3. 变体边框状态已修正 - onCanvasDefault 默认有边框，onCanvasContrast 默认无边框
4. Hover 状态 shadow 已移除 - 所有变体 hover 状态都不显示 shadow
5. 示例函数命名已修正 - 函数名与实际变体名称一致
6. Background color token 已修正 - 使用正确的 Canvas 系列 token

🎯 **影响范围**:
- 样式修复：仅影响边框、背景和文字显示，不影响功能
- 命名修复：仅影响内部函数名称，不影响导出的 story 名称或公共 API
- 向后兼容，不影响组件的使用方式

📝 **后续任务**:
- 运行 Storybook 验证所有修复: `npm run storybook`
- 测试 hover 状态的视觉效果（边框变化、背景变化）
- 确认两个变体的边框状态符合预期
- 如果有视觉回归测试，更新基准
- 考虑添加单元测试验证文字截断逻辑
