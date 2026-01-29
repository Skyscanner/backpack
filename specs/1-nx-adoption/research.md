# Research: Backpack Nx Adoption

**Date**: 2026-01-27
**Objective**: 调研 Nx 适配的技术细节和潜在问题

## 1. Nx 初始化方式调研

### 决策: 使用 `nx init --integrated=false`

**原因**:
- `--integrated=false` 模式更轻量，不强制改变现有项目结构
- 允许渐进式迁移，每个 milestone 独立可验证
- 与 banana 仓库的 Nx 配置风格一致

**备选方案**:
- `nx init --integrated=true`: 会强制重构项目结构，风险太高
- 手动创建 `nx.json`: 可行但缺少自动生成的最佳实践配置

**参考**: [Nx: Adding to Existing Project](https://nx.dev/recipes/adopting-nx/adding-to-existing-project)

---

## 2. 项目推断 vs 显式 project.json

### 决策: 使用项目推断 (Project Inference)

**原因**:
- 约 90 个组件，每个创建 `project.json` 维护成本高
- Nx 21+ 的项目推断功能成熟稳定
- 只为特殊组件 (icon, flare, spinner) 创建显式配置

**配置方式**:
```json
// nx.json
{
  "plugins": [
    {
      "plugin": "@nx/js",
      "options": {
        "libraryRoot": "packages"
      }
    }
  ]
}
```

**需要显式 project.json 的组件**:
- `bpk-component-icon`: 有代码生成任务
- `bpk-component-flare`: 有代码生成任务
- `bpk-component-spinner`: 有代码生成任务

**参考**: [Nx: Inferred Tasks](https://nx.dev/concepts/inferred-tasks)

---

## 3. 代码生成任务与 Nx 缓存协调

### 决策: 配置 SVG 文件作为缓存输入

**问题**: Gulp 任务从 SVG 生成 React 组件，Nx 需要知道何时重新生成

**解决方案**:
```json
// packages/bpk-component-icon/project.json
{
  "targets": {
    "generate": {
      "executor": "nx:run-commands",
      "options": {
        "command": "gulp icons"
      },
      "inputs": [
        "{projectRoot}/src/**/*.svg",
        "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/**/*.svg"
      ],
      "outputs": ["{projectRoot}/src/generated/"]
    },
    "build": {
      "dependsOn": ["generate"]
    }
  }
}
```

**关键点**:
- `inputs` 包含所有 SVG 源文件
- `outputs` 指定生成目录
- `build` 依赖 `generate`，确保正确顺序

---

## 4. Storybook 迁移策略

### 决策: 批量迁移脚本 + 手动验证

**当前结构**:
```
examples/
├── bpk-component-button/
│   ├── stories.tsx
│   └── examples.tsx
├── bpk-component-card/
│   ├── stories.tsx
│   └── examples.tsx
└── ...
```

**目标结构**:
```
packages/bpk-component-button/
└── src/
    └── BpkButton/
        ├── BpkButton.tsx
        ├── BpkButton.stories.tsx  # 从 examples/ 迁移
        └── ...
```

**迁移脚本逻辑**:
```bash
#!/bin/bash
for dir in examples/bpk-component-*; do
    component=$(basename "$dir" | sed 's/bpk-component-//')
    src_dir="packages/bpk-component-${component}/src"

    # 找到组件子目录
    if [ -d "$src_dir/Bpk${component^}" ]; then
        mv "$dir/stories.tsx" "$src_dir/Bpk${component^}/"
    fi
done
```

**Storybook 配置更新**:
```javascript
// .storybook/main.js
module.exports = {
  stories: [
    '../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
};
```

---

## 5. Banana 仓库 Nx 配置参考

### 关键发现

**banana/nx.json 结构**:
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "plugins": [
    "@nx/storybook/plugin",
    "@nx/eslint/plugin",
    "@nx/cypress/plugin",
    "nx-stylelint/plugin",
    "@nx/js/typescript",
    "@nx/jest/plugin"
  ],
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"]
    }
  }
}
```

**可复用模式**:
- 插件配置方式
- 缓存策略
- 依赖关系配置

**差异点**:
- banana 使用 pnpm，backpack 使用 npm
- banana 是应用仓库，backpack 是库仓库
- banana 有多个 apps，backpack 只有 packages

---

## 6. 依赖审计结果

### 需要关注的依赖

| 依赖 | 当前版本 | 问题 | 建议 |
|------|---------|------|------|
| (待审计) | - | - | 运行 `npm outdated` 确认 |

### Nx 插件兼容性

| 插件 | 目标版本 | 与现有依赖兼容性 |
|------|---------|----------------|
| `@nx/js` | ^21.2.2 | 待验证 |
| `@nx/eslint` | ^21.2.2 | 待验证 |
| `@nx/jest` | ^21.2.2 | 待验证 (Jest 30) |
| `@nx/storybook` | ^21.2.2 | 待验证 (Storybook 10) |

**Action**: M1 开始前运行完整的依赖兼容性测试

---

## 7. TypeScript 项目引用配置

### 决策: 启用 composite 但监控 .d.ts 生成

**潜在问题**:
- Global Components 迁移时遇到 `composite: true` 导致 `.d.ts` 消失
- 怀疑与 Babel 转译冲突

**缓解策略**:
1. 先在单个组件测试 composite 配置
2. 如果 .d.ts 有问题，考虑：
   - 禁用 composite
   - 调整 Babel 配置
   - 使用 tsc 生成类型声明

**测试命令**:
```bash
# 测试类型声明生成
npx tsc --project packages/bpk-component-button/tsconfig.json --emitDeclarationOnly
ls packages/bpk-component-button/dist/*.d.ts
```

---

## 8. Nx Release 配置研究

### 单一包发布策略

**配置**:
```json
// nx.json
{
  "release": {
    "projects": ["@skyscanner/backpack-web"],
    "projectsRelationship": "fixed",
    "version": {
      "conventionalCommits": true,
      "generatorOptions": {
        "currentVersionResolver": "git-tag"
      }
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github",
        "file": "CHANGELOG.md"
      }
    }
  }
}
```

**关键点**:
- `projectsRelationship: "fixed"` 确保单一版本
- `conventionalCommits: true` 启用语义化版本
- `createRelease: "github"` 自动创建 GitHub Release

**现有发布流程对比**:
| 项目 | 现有 | Nx Release |
|------|------|------------|
| 版本确定 | PR labels | Conventional Commits |
| Changelog | Release Drafter | nx release changelog |
| npm publish | 直接调用 | nx release publish |
| Git tag | 手动/自动 | nx release |

---

## 9. 模块边界策略

### Tag 分类方案

```
scope:foundation  - 基础包 (bpk-mixins, bpk-react-utils, bpk-theming)
scope:component   - UI 组件 (bpk-component-*)
scope:example     - 示例 (examples/*)

type:style        - 样式相关
type:util         - 工具函数
type:ui           - UI 组件
```

### 依赖规则

```
scope:component → scope:foundation ✅
scope:component → scope:component  ✅ (组合组件)
scope:foundation → scope:component ❌
scope:example → scope:component   ✅
scope:example → scope:foundation  ✅
```

---

## 10. 风险总结

| 风险 | 可能性 | 影响 | 缓解状态 |
|------|--------|------|----------|
| 外部依赖冲突 | 中 | 高 | 待 M1 前审计 |
| 代码生成缓存失效 | 低 | 中 | 有解决方案 |
| TypeScript composite 问题 | 中 | 中 | 有备选方案 |
| Storybook 迁移遗漏 | 低 | 低 | 脚本 + 验证 |
| 导入路径不兼容 | 低 | 高 | banana 验证 |

## Next Steps

1. ✅ 完成 research.md
2. ⏳ 创建 plan.md (已完成)
3. ⏳ 运行 `/speckit.tasks` 生成详细任务列表
4. ⏳ M1 前进行依赖审计
5. ⏳ M1 前在分支上进行 Nx init POC
