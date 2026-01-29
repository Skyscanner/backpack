# 阶段 3：Stories 迁移

**依赖于**：阶段 2
**可与阶段 4 并行**

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 审计现有 stories | 必需 | 确认实际需要迁移的文件数量（32 个）|
| 2. 迁移 stories 文件 | 必需 | Stories 与组件同位，遵循 Nx 最佳实践 |
| 3. 更新 Storybook 配置 | 必需 | 指向新的 stories 路径 |
| 4. 更新 Percy 配置 | 必需 | 视觉测试需要在新位置找到 stories |
| 5. 清理 examples/ 目录 | 必需 | 移除旧的 stories 文件 |

## 实际情况

- 只有 32 个组件有 stories（不是 91 个）
- 约 59 个组件没有 stories

## 有 Stories 的组件

bpk-component-accordion, bpk-component-aria-live, bpk-component-autosuggestV2,
bpk-component-blockquote, bpk-component-breadcrumb, bpk-component-bubble,
bpk-component-button, bpk-component-card-button, bpk-component-checkbox,
bpk-component-chip, bpk-component-code, bpk-component-datatable,
bpk-component-fieldset, bpk-component-floating-notification,
bpk-component-journey-arrow, bpk-component-label, bpk-component-link,
bpk-component-modal, bpk-component-modal-v2, bpk-component-navigation-tab-group,
bpk-component-overlay, bpk-component-page-indicator, bpk-component-panel,
bpk-component-price-range, bpk-component-segmented-control, bpk-component-snippet,
bpk-component-switch, bpk-component-textarea, bpk-component-theme-toggle,
bpk-component-tooltip, bpk-scrim-utils, bpk-stylesheets-fonts

## 步骤

### 1. 审计现有 Stories
- 列出 examples/ 目录中的所有 stories 文件
- 确认对应的组件目录
- 创建迁移映射表

### 2. 迁移 Stories 文件
- 使用 git mv 将每个 .stories.tsx 移动到对应组件的 src/ 目录
- 保持文件名不变
- 更新文件中的导入路径（如果需要）

### 3. 更新 Storybook 配置
- 编辑 .storybook/main.ts
- 修改 stories 数组指向新路径
```typescript
stories: [
  '../packages/**/src/**/*.stories.tsx'
]
```

### 4. 更新 Percy 配置
- 编辑 .percy.yml
- 更新 stories 路径匹配规则
```yaml
static:
  include:
    - "packages/**/src/**/*.stories.tsx"
```

### 5. 清理 examples/ 目录
- 删除已迁移的 stories 文件
- 保留其他必要文件（如果有）
- 考虑是否完全移除 examples/ 目录

## 交付物

- [ ] 32 个 stories 文件已迁移
- [ ] 更新的 Storybook 配置
- [ ] 更新的 Percy 配置
- [ ] 清理后的 examples/ 目录
