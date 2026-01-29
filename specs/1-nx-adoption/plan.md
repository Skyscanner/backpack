# Implementation Plan: Backpack Nx Adoption

**Branch**: `WOODPECKER-4021` | **Date**: 2026-01-27 | **Spec**: [spec.md](./spec.md)
**Epic**: [WOODPECKER-4025](https://skyscanner.atlassian.net/browse/WOODPECKER-4025)

## Summary

将 Backpack-web 仓库适配 Nx monorepo 工具，通过 7 个 milestone 完成：Nx 初始化、项目结构调整、Storybook 迁移、组件 Nx 项目设置、静态检查迁移、模块边界配置、Nx 发布流程。保持消费者导入路径兼容，使用项目推断功能管理 ~90 个组件，保持单一包 `@skyscanner/backpack-web` 发布策略。

## Technical Context

| 项目 | 当前状态 | 目标状态 |
|------|---------|---------|
| **Monorepo 工具** | 无 | Nx v21+ |
| **包管理器** | npm 10.7.0+ | npm（保持不变） |
| **构建工具** | Gulp + Babel | Gulp + Babel + Nx orchestration |
| **测试** | Jest 30 | Jest 30 via @nx/jest |
| **Lint** | ESLint + Stylelint | ESLint + Stylelint via @nx/eslint |
| **Storybook** | v10.1.11 (独立 `examples/`) | v10.1.11 (与组件同位置) |
| **发布** | npm publish via GitHub Actions | nx release via GitHub Actions |
| **项目配置** | 无 | 项目推断 (非显式 project.json) |

**目标 Nx 版本**: v21.2.2+ (与 banana 仓库一致)

**Nx 插件计划**:
- `@nx/js` - TypeScript/JavaScript 支持
- `@nx/eslint` - ESLint 集成
- `@nx/jest` - Jest 测试集成
- `@nx/storybook` - Storybook 集成
- `nx-stylelint` - Stylelint 集成

## Constitution Check (Infrastructure Migration)

*GATE: 基础设施迁移需要确保不破坏现有规范*

### 兼容性检查

- [x] **导入路径兼容**: `@skyscanner/backpack-web/*` 路径保持不变
- [x] **发布产物兼容**: npm 包结构与现有格式一致
- [x] **构建产物兼容**: `dist/` 输出内容不变
- [x] **SCSS 导入兼容**: mixin 导入路径保持不变
- [x] **测试兼容**: 现有测试无需修改即可在 Nx 环境运行
- [x] **CI/CD 兼容**: GitHub Actions 可平滑迁移到 Nx 命令

### 非破坏性约束

- [x] **不改变代码**: 组件代码、测试代码、样式代码不需要修改
- [x] **不改变依赖**: 不引入破坏性的依赖变更
- [x] **不改变版本策略**: 保持单一包发布，版本统一管理
- [x] **保持 Gulp 任务**: 代码生成任务 (icon/flare/spinner) 继续使用 Gulp

## Phase 0: Research & Discovery

### 研究任务

1. **Nx 初始化最佳实践**
   - 调研 `npx nx@latest init` 对现有仓库的影响
   - 确认 npm (非 pnpm) 环境下的 Nx 配置
   - 了解项目推断 (project inference) 配置方式

2. **现有构建流程分析**
   - 审计 `gulpfile.js` 中的所有任务
   - 理解代码生成任务的依赖关系
   - 确定哪些任务需要与 Nx 缓存协调

3. **依赖冲突调研**
   - 检查 `package.json` 中长期未更新的依赖
   - 测试 Nx 插件与现有依赖的兼容性
   - 制定依赖更新或替换计划

4. **Banana 仓库参考**
   - 分析 banana 仓库的 `nx.json` 配置
   - 学习项目推断规则的配置方式
   - 了解 CI/CD 中 Nx 命令的使用模式

5. **Storybook 迁移模式**
   - 调研 stories 与组件同位置的最佳实践
   - 确定 Storybook 配置的调整方案
   - 规划 ~90 个组件的 stories 迁移脚本

**Deliverable**: `research.md`

## Phase 1: Milestone 详细设计

### Milestone 1: Nx 初始化

**目标**: 在不破坏现有功能的前提下初始化 Nx

**技术方案**:

1. **初始化 Nx**
```bash
npx nx@latest init --integrated=false
```
- 选择 `--integrated=false` 保持轻量级设置
- 生成 `nx.json` 基础配置

2. **nx.json 配置**
```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"]
    },
    "test": {
      "cache": true
    },
    "lint": {
      "cache": true
    }
  },
  "defaultBase": "main",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "sharedGlobals": [
      "{workspaceRoot}/babel.config.js",
      "{workspaceRoot}/tsconfig.json"
    ]
  }
}
```

3. **验证点**
- `nx graph` 显示项目结构
- 现有 `npm run build` 继续工作
- 现有 `npm test` 继续工作

---

### Milestone 2: 项目结构确认与调整

**目标**: 确定项目结构并配置 Nx 识别

**技术方案**:

1. **项目结构决策**
```
backpack/
├── packages/                    # Nx 识别为项目根目录
│   ├── bpk-component-button/    # 每个组件作为独立 Nx 项目
│   ├── bpk-component-card/
│   ├── bpk-mixins/
│   └── ...
├── examples/                    # Storybook (M3 后迁移)
├── scripts/                     # 构建脚本
├── nx.json                      # Nx 配置
└── package.json                 # 根配置
```

2. **项目推断配置** (nx.json)
```json
{
  "plugins": [
    {
      "plugin": "@nx/js",
      "options": {
        "inferProjects": true
      }
    }
  ],
  "workspaceLayout": {
    "libsDir": "packages"
  }
}
```

3. **验证点**
- `nx show projects` 显示所有 ~90 个组件
- `nx graph` 显示正确的依赖关系

---

### Milestone 3: Storybook Stories 同位置迁移

**目标**: 将 stories 从 `examples/` 迁移到各组件目录

**技术方案**:

1. **目标结构**
```
packages/bpk-component-button/
├── src/
│   ├── BpkButton/
│   │   ├── BpkButton.tsx
│   │   ├── BpkButton.module.scss
│   │   ├── BpkButton-test.tsx
│   │   ├── BpkButton.stories.tsx      # 新增
│   │   └── accessibility-test.tsx
│   └── index.ts
└── README.md
```

2. **迁移脚本** (伪代码)
```bash
# 遍历 examples/bpk-component-*/
for dir in examples/bpk-component-*; do
  component_name=$(basename $dir)
  # 移动 stories.tsx 到对应组件目录
  mv "$dir/stories.tsx" "packages/$component_name/src/*/stories.tsx"
done
```

3. **Storybook 配置更新** (.storybook/main.js)
```javascript
module.exports = {
  stories: [
    '../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  // ... 其他配置
};
```

4. **验证点**
- `npm run storybook` 正常启动
- 所有组件的 stories 正确加载
- `examples/` 目录不再包含组件 stories

---

### Milestone 4: 组件作为 Nx 项目

**目标**: 让每个组件都成为一个独立的 Nx project，便于精细化依赖与增量构建。

**价值**:
- `nx affected` 可以精确识别受影响的组件，只构建/测试必要的部分
- `nx graph` 可视化组件间依赖关系，便于理解和维护
- 为每个组件启用独立的缓存，提升 CI/CD 效率

**技术方案**:

1. **项目推断配置** (nx.json)
```json
{
  "plugins": [
    {
      "plugin": "@nx/js",
      "options": {
        "libraryRoot": "packages/{projectName}",
        "buildTargetName": "build",
        "testTargetName": "test"
      }
    }
  ]
}
```

2. **TypeScript 项目引用**
```json
// tsconfig.json
{
  "compilerOptions": {
    "composite": true,
    "declaration": true,
    "declarationMap": true
  },
  "references": [
    { "path": "./packages/bpk-component-button" },
    { "path": "./packages/bpk-component-card" }
    // ... 其他组件
  ]
}
```

3. **特殊组件的 project.json** (仅需要覆盖默认配置的组件)
```json
// packages/bpk-component-icon/project.json
{
  "name": "bpk-component-icon",
  "targets": {
    "generate": {
      "executor": "nx:run-commands",
      "options": {
        "command": "gulp icons"
      },
      "inputs": ["{projectRoot}/src/**/*.svg"],
      "outputs": ["{projectRoot}/src/generated/"]
    }
  }
}
```

4. **验证点**
- `nx show projects` 显示所有 ~90 个组件
- `nx graph` 显示正确的组件间依赖关系
- `nx run bpk-component-button:build` 工作正常
- 修改单个组件后，`nx affected:test` 只测试该组件及其依赖方

---

### Milestone 5: 静态检查迁移

**目标**: 将 lint、test、typecheck 迁移到 Nx targets

**技术方案**:

1. **安装 Nx 插件**
```bash
npm install -D @nx/eslint @nx/jest nx-stylelint
```

2. **配置 ESLint target** (nx.json)
```json
{
  "plugins": [
    {
      "plugin": "@nx/eslint/plugin",
      "options": {
        "targetName": "lint"
      }
    }
  ]
}
```

3. **配置 Jest target** (nx.json)
```json
{
  "plugins": [
    {
      "plugin": "@nx/jest/plugin",
      "options": {
        "targetName": "test"
      }
    }
  ]
}
```

4. **配置 Storybook target** (nx.json)
```json
{
  "plugins": [
    {
      "plugin": "@nx/storybook/plugin",
      "options": {
        "serveTargetName": "storybook",
        "buildTargetName": "build-storybook"
      }
    }
  ]
}
```

5. **更新 CI 工作流** (.github/workflows/ci.yml)
```yaml
jobs:
  lint:
    steps:
      - run: npx nx affected -t lint --base=origin/main

  test:
    steps:
      - run: npx nx affected -t test --base=origin/main

  typecheck:
    steps:
      - run: npx nx affected -t typecheck --base=origin/main
```

6. **验证点**
- `nx lint` 执行所有 lint
- `nx affected:test --base=main` 只测试受影响项目
- CI 使用 Nx 命令并正确缓存

---

### Milestone 6: 模块边界配置

**目标**: 配置 Nx 模块边界规则防止非法依赖

**技术方案**:

1. **项目 tags 配置**
```json
// packages/bpk-component-button/project.json (如果需要)
{
  "tags": ["scope:component", "type:ui"]
}

// packages/bpk-mixins/project.json
{
  "tags": ["scope:foundation", "type:style"]
}

// packages/bpk-react-utils/project.json
{
  "tags": ["scope:foundation", "type:util"]
}
```

2. **ESLint 模块边界规则** (.eslintrc.json)
```json
{
  "plugins": ["@nx"],
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "scope:component",
            "onlyDependOnLibsWithTags": ["scope:foundation", "scope:component"]
          },
          {
            "sourceTag": "scope:foundation",
            "onlyDependOnLibsWithTags": ["scope:foundation"]
          }
        ]
      }
    ]
  }
}
```

3. **验证点**
- `nx lint` 检测非法依赖
- 组件不能依赖其他组件的内部实现
- foundation 包不能依赖 component 包

---

### Milestone 7: Nx 发布流程迁移

**目标**: 使用 `nx release` 替代现有 npm publish

**技术方案**:

1. **配置 nx release** (nx.json)
```json
{
  "release": {
    "projects": ["@skyscanner/backpack-web"],
    "projectsRelationship": "fixed",
    "version": {
      "conventionalCommits": true
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      }
    },
    "git": {
      "commit": true,
      "tag": true
    }
  }
}
```

2. **Conventional Commits 配置**
```bash
npm install -D @commitlint/cli @commitlint/config-conventional husky
```

```javascript
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
};
```

3. **更新发布工作流** (.github/workflows/release.yml)
```yaml
jobs:
  release:
    steps:
      - name: Version and Changelog
        run: npx nx release --skip-publish

      - name: Build
        run: npm run build

      - name: Publish
        run: npx nx release publish
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

4. **验证点**
- `nx release --dry-run` 显示正确的版本变更
- changelog 自动生成
- npm 包发布成功
- GitHub release 创建成功

## Phase 2: Banana 仓库验证策略

每个 milestone 完成后，在 banana 仓库验证：

```bash
# 1. 在 backpack 仓库构建
cd backpack
npm run build

# 2. 链接到 banana 仓库
cd ../banana
npm link ../backpack

# 3. 运行 banana 测试
pnpm test
pnpm build:webapp

# 4. 验证导入路径
# 检查所有 @skyscanner/backpack-web/* 导入是否正常工作
```

## Dependencies

### 新增依赖

| 包名 | 用途 | 版本 |
|------|------|------|
| `nx` | Nx CLI | ^21.2.2 |
| `@nx/js` | JS/TS 支持 | ^21.2.2 |
| `@nx/eslint` | ESLint 集成 | ^21.2.2 |
| `@nx/jest` | Jest 集成 | ^21.2.2 |
| `@nx/storybook` | Storybook 集成 | ^21.2.2 |
| `nx-stylelint` | Stylelint 集成 | ^18.0.0 |
| `@commitlint/cli` | Commit lint | ^19.0.0 |
| `@commitlint/config-conventional` | Commit 规范 | ^19.0.0 |

### 保留依赖 (不变)

- `gulp` - 代码生成任务
- `babel` - 转译
- `jest` - 测试
- `eslint` - Lint
- `stylelint` - Style lint
- `storybook` - 文档

## Risk Mitigation

### 外部依赖冲突

**风险**: 长期未维护的依赖可能与 Nx 插件冲突

**缓解**:
1. 在 M1 前进行依赖审计
2. 使用 `npm audit` 和 `npm outdated`
3. 必要时更新或替换问题依赖

### 代码生成缓存

**风险**: SVG 变更后 Nx 缓存可能返回过期的生成代码

**缓解**:
1. 配置 SVG 文件作为生成任务的输入
2. 在 project.json 中明确定义 inputs/outputs
3. 测试缓存行为确保正确失效

### 导入路径兼容性

**风险**: TypeScript/SCSS 导入路径可能在 Nx 环境下出问题

**缓解**:
1. 使用 tsconfig paths 保持兼容
2. 在 banana 仓库测试所有导入模式
3. 必要时添加别名配置

## Release Checklist

每个 Milestone 完成前：

- [ ] 所有现有测试通过
- [ ] `nx graph` 显示正确结构
- [ ] 在 banana 仓库验证集成
- [ ] 更新相关文档
- [ ] 代码审查通过

## Notes

### 关键决策

1. **使用项目推断而非显式 project.json**: 减少 ~90 个配置文件的维护负担
2. **保持单一包发布**: 与现有消费者体验一致
3. **保留 Gulp 任务**: 代码生成逻辑成熟稳定，无需迁移
4. **npm 而非 pnpm**: 减少迁移风险，后续迁移到 banana 时再统一

### 后续阶段 (不在本次范围)

- Dependency management 标准化
- Vite/Vitest 迁移
- 完全迁移到 banana monorepo

## References

- [Nx: Adding to Existing Project](https://nx.dev/recipes/adopting-nx/adding-to-existing-project)
- [Nx: Project Inference](https://nx.dev/concepts/inferred-tasks)
- [Nx: Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Nx: Release](https://nx.dev/features/manage-releases)
- [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Production Standard: TypeScript Monorepos](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
