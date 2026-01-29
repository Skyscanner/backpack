# BpkCheckboxCard V2 Implementation Status

**最后更新**: 2026-01-29
**当前状态**: 🚧 Phase 1 进行中

---

## ✅ 已完成

### Phase 1: Context & Core Components (进行中)

1. **✅ spec.md 更新**
   - 添加了 FR-024 至 FR-030 新需求
   - 包含 Ark UI 模式、主题支持、WCAG 2.2 AA等

2. **✅ 设计文档**
   - [NEW_API_DESIGN.md](./NEW_API_DESIGN.md) - 完整的新 API 设计
   - [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) - 详细实现计划

3. **✅ CheckboxCardContext.tsx**
   - 创建 Context 类型定义
   - useCheckboxCardContext hook
   - 完整的 TypeScript 类型

4. **✅ BpkCheckboxCardRoot.tsx**
   - 根容器组件
   - 受控/非受控状态管理
   - Context Provider
   - 完整的 JSDoc 文档

---

## 🚧 进行中

### BpkCheckboxCardControl
需要实现隐藏的 checkbox input 元素

---

## 📋 待办事项

### Phase 1 剩余任务
- [ ] BpkCheckboxCardControl.tsx
- [ ] BpkCheckboxCardContent.tsx

### Phase 2: Layout Primitives
- [ ] BpkCheckboxCardStack.tsx
- [ ] BpkCheckboxCardInline.tsx

### Phase 3: Slot Components
- [ ] BpkCheckboxCardIcon.tsx
- [ ] BpkCheckboxCardImage.tsx
- [ ] BpkCheckboxCardLabel.tsx
- [ ] BpkCheckboxCardDescription.tsx
- [ ] BpkCheckboxCardPrice.tsx
- [ ] BpkCheckboxCardIndicator.tsx

### Phase 4: Styles & Theming
- [ ] 更新 BpkCheckboxCard.module.scss
  - CSS 变量支持
  - Backpack tokens
  - 所有组件样式

### Phase 5: Integration
- [ ] 主导出文件 (BpkCheckboxCard/index.ts)
- [ ] BpkCheckboxCardSimple wrapper
- [ ] 更新 Storybook 示例
- [ ] 测试文件

---

## 📝 下一步操作

```bash
# 1. 继续实现 Phase 1
# 创建 BpkCheckboxCardControl.tsx
# 创建 BpkCheckboxCardContent.tsx

# 2. 实现 Phase 2 Layout Primitives
# 创建 Stack 和 Inline 组件

# 3. 实现 Phase 3 Slot Components
# 创建所有 slot 组件

# 4. 更新样式文件
# 添加 CSS 变量支持

# 5. 创建主导出
# 组装所有组件

# 6. 创建 Simple wrapper
# 向后兼容

# 7. 更新 Storybook
# 新 API 示例
```

---

## 🎯 关键决策

1. **架构**: 采用 Ark UI Compound Component 模式
2. **主题**: 通过 CSS 变量 + Backpack tokens
3. **兼容性**: 保留 BpkCheckboxCardSimple 作为旧 API wrapper
4. **无障碍**: 升级到 WCAG 2.2 AA
5. **文件结构**: 每个子组件独立文件

---

## 📦 新旧 API 对比

### ✅ 新 API (推荐)
```tsx
<BpkCheckboxCard.Root checked={selected} onCheckedChange={setSelected}>
  <BpkCheckboxCard.Control />
  <BpkCheckboxCard.Content orientation="vertical">
    <BpkCheckboxCard.Icon><LandmarkIcon /></BpkCheckboxCard.Icon>
    <BpkCheckboxCard.Label>City Centre</BpkCheckboxCard.Label>
    <BpkCheckboxCard.Price>£85</BpkCheckboxCard.Price>
  </BpkCheckboxCard.Content>
</BpkCheckboxCard.Root>
```

### 🔄 旧 API (通过 Simple wrapper 支持)
```tsx
<BpkCheckboxCardSimple
  checked={selected}
  onChange={setSelected}
  label="City Centre"
  icon={<LandmarkIcon />}
  price="£85"
/>
```

---

## 📚 相关文档

- [spec.md](./spec.md) - 功能需求规格
- [NEW_API_DESIGN.md](./NEW_API_DESIGN.md) - 新 API 设计
- [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md) - 实现计划
- [BUG_FIXES.md](./BUG_FIXES.md) - 已修复的问题
- [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) - 旧版实现记录

---

**实施说明**:
由于回复长度限制，完整实现已分阶段提供。所有设计文档和部分核心代码已创建。继续实现剩余组件请参考 [IMPLEMENTATION_PLAN_V2.md](./IMPLEMENTATION_PLAN_V2.md)。
