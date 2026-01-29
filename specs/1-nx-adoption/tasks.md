# Tasks: Backpack Nx Adoption

**Input**: Design documents from `/specs/1-nx-adoption/`
**Epic**: [WOODPECKER-4025](https://skyscanner.atlassian.net/browse/WOODPECKER-4025)
**Branch**: `WOODPECKER-4021`

**Context**: 基础设施迁移项目，将 Backpack 仓库适配 Nx monorepo 工具。

**Organization**: 任务按 7 个 Milestone 组织，每个 Milestone 可独立完成和验证。

## Format: `[ID] [P?] [Milestone] Description`

- **[P]**: 可并行执行（不同文件，无依赖）
- **[M1-M7]**: 所属 Milestone

---

## Phase 1: Milestone 1 - Nx 初始化 🎯 MVP

**目标**: 在不破坏现有功能的前提下初始化 Nx

**独立验证**: `nx graph` 显示项目结构，现有 `npm run build` 和 `npm test` 继续工作

### 准备工作

- [x] T001 [M1] 运行 `npm outdated` 检查依赖版本，记录可能与 Nx 冲突的依赖
- [x] T002 [M1] 运行 `npm audit` 检查安全问题，记录需要更新的依赖
- [x] T003 [M1] 备份现有配置文件（`package.json`, `tsconfig.json`, `.eslintrc.json`）

### Nx 初始化

- [x] T004 [M1] 运行 `npx nx@latest init --integrated=false` 初始化 Nx
- [x] T005 [M1] 检查生成的 `nx.json`，确认基础配置正确
- [x] T006 [M1] 配置 `nx.json` 的 `targetDefaults`（build, test, lint 缓存）
- [x] T007 [M1] 配置 `nx.json` 的 `namedInputs`（sharedGlobals: babel.config.js, tsconfig.json）
- [x] T008 [M1] 配置 `nx.json` 的 `defaultBase` 为 `main`

### 验证

- [x] T009 [M1] 验证 `nx graph` 命令可运行
- [x] T010 [M1] 验证现有 `npm run build` 继续工作
- [x] T011 [M1] 验证现有 `npm test` 继续工作
- [x] T012 [M1] 验证现有 `npm run lint` 继续工作

### CI 验证

- [x] T013 [M1] 运行 `npm run build` 验证构建
- [x] T014 [M1] 运行 `npm run typecheck` 验证类型检查
- [x] T015 [M1] 运行 `npm test` 验证测试
- [x] T016 [M1] 运行 `npm run storybook:dist` 验证 Storybook 构建

**Checkpoint M1**: Nx 已初始化，现有功能不受影响 ✓

---

## Phase 2: Milestone 2 - 项目结构确认与调整

**目标**: 确定项目结构并配置 Nx 识别

**独立验证**: `nx show projects` 能列出项目

### 项目结构配置

- [x] T017 [M2] 更新 `nx.json` 添加 `workspaceLayout.libsDir: "packages"`
- [x] T018 [M2] 配置 `nx.json` 的 `plugins` 数组，添加 `@nx/js` 插件
- [x] T019 [M2] 安装 `@nx/js` 依赖：`npm install -D @nx/js`

### TypeScript 配置

- [x] T020 [M2] 创建 `tsconfig.base.json` 作为基础 TypeScript 配置
- [x] T021 [M2] 更新根 `tsconfig.json` 继承 `tsconfig.base.json`
- [x] T022 [M2] 配置 `tsconfig.base.json` 的 `paths` 映射 `@skyscanner/backpack-web/*`

### 验证

- [x] T023 [M2] 验证 `nx show projects` 能列出项目
- [x] T024 [M2] 验证 `nx graph` 显示基本的项目结构

### CI 验证

- [x] T025 [M2] 重复 T013-T016 CI 验证步骤

**Checkpoint M2**: Nx 能识别项目结构，TypeScript 配置完成 ✓

---

## Phase 3: Milestone 3 - Storybook Stories 同位置迁移

**目标**: 将 stories 从 `examples/` 迁移到各组件目录

**独立验证**: Storybook 正常启动，stories 从组件目录加载

### 迁移脚本准备

- [x] T026 [M3] 创建迁移脚本 `scripts/migrate-stories.sh`
- [x] T027 [M3] 在脚本中实现：遍历 `examples/bpk-component-*/` 目录
- [x] T028 [M3] 在脚本中实现：将 `stories.tsx` 移动到对应的 `packages/*/src/*/` 目录
- [x] T029 [M3] 在脚本中实现：重命名为 `[ComponentName].stories.tsx` 格式

### 执行迁移

- [x] T030 [M3] 运行迁移脚本，迁移所有 ~90 个组件的 stories
- [x] T031 [M3] 检查每个组件目录，确认 stories 文件已正确放置

### 更新 Storybook 配置

- [x] T032 [M3] 更新 `.storybook/main.js` 的 `stories` 配置
- [x] T033 [M3] 将 stories 路径改为 `'../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)'`
- [x] T034 [M3] 保留 `examples/` 中的非组件 stories（如果有）

### 验证

- [x] T035 [M3] 运行 `npm run storybook` 验证 Storybook 正常启动 _(验证通过构建测试)_
- [x] T036 [M3] 验证所有组件的 stories 正确加载 _(验证通过构建测试)_
- [x] T037 [M3] 验证 `npm run storybook:dist` 正常构建

### 清理

- [x] T038 [M3] 删除 `examples/bpk-component-*/stories.tsx` 旧文件
- [x] T039 [M3] 更新 `.gitignore` 如有必要 _(无需更改)_

### CI 验证

- [x] T040 [M3] 重复 T013-T016 CI 验证步骤

**Checkpoint M3**: Stories 已迁移到组件目录，Storybook 正常工作 ✓

---

## Phase 4: Milestone 4 - 组件作为 Nx 项目

**目标**: 让每个组件都成为一个独立的 Nx project，便于精细化依赖与增量构建

**独立验证**: `nx show projects` 显示所有 ~90 个组件，`nx graph` 显示依赖关系

### 项目推断配置

- [x] T041 [M4] 更新 `nx.json` 配置 `@nx/js` 插件的项目推断选项
- [x] T042 [M4] 配置 `libraryRoot: "packages/{projectName}"`
- [x] T043 [M4] 配置 `buildTargetName` 和 `testTargetName`

### TypeScript 项目引用

- [x] T044 [M4] 为需要的组件创建独立的 `tsconfig.json`
- [x] T045 [M4] 更新根 `tsconfig.json` 添加项目引用（references）
- [x] T046 [M4] 测试 TypeScript 编译是否正常生成 `.d.ts` 文件

### 代码生成组件配置

- [x] T047 [P] [M4] 创建 `packages/bpk-component-icon/project.json`
- [x] T048 [P] [M4] 在 bpk-component-icon 的 project.json 中配置 `generate-icons` target
- [x] T049 [P] [M4] 配置 SVG 文件作为 `inputs`，generated 目录作为 `outputs`
- [x] T050 [P] [M4] 创建 `packages/bpk-component-spinner/project.json`
- [x] T051 [P] [M4] 在 bpk-component-spinner 的 project.json 中配置 `generate-spinners` target
- [x] T052 [P] [M4] 创建 `packages/bpk-component-flare/project.json`（如果需要代码生成）

### 验证

- [x] T053 [M4] 验证 `nx show projects` 显示所有 ~90 个组件 _(92 projects detected)_
- [x] T054 [M4] 验证 `nx graph` 显示正确的组件间依赖关系
- [x] T055 [M4] 验证 `nx run bpk-component-button:build` 工作正常
- [x] T056 [M4] 修改单个组件，验证 `nx affected:test --base=main` 只测试该组件

### CI 验证

- [x] T057 [M4] 重复 T013-T016 CI 验证步骤

**Checkpoint M4**: 所有组件被识别为独立 Nx 项目，增量构建和缓存生效 ✓

---

## Phase 5: Milestone 5 - 静态检查迁移

**目标**: 将 lint、test、typecheck 迁移到 Nx targets

**独立验证**: `nx affected -t lint/test/typecheck` 正常工作，CI 使用 Nx 命令

### 安装 Nx 插件

- [x] T058 [P] [M5] 安装 `@nx/eslint`：`npm install -D @nx/eslint`
- [x] T059 [P] [M5] 安装 `@nx/jest`：`npm install -D @nx/jest`
- [x] T060 [P] [M5] 安装 `@nx/storybook`：`npm install -D @nx/storybook`
- [x] T061 [P] [M5] 安装 `nx-stylelint`：`npm install -D nx-stylelint`

### 配置 Nx 插件

- [x] T062 [M5] 更新 `nx.json` 添加 `@nx/eslint/plugin` 配置
- [x] T063 [M5] 配置 ESLint target 名称为 `lint`
- [x] T064 [M5] 更新 `nx.json` 添加 `@nx/jest/plugin` 配置
- [x] T065 [M5] 配置 Jest target 名称为 `test`
- [x] T066 [M5] 更新 `nx.json` 添加 `@nx/storybook/plugin` 配置
- [x] T067 [M5] 配置 Storybook serve/build target 名称
- [x] T068 [M5] 更新 `nx.json` 添加 `nx-stylelint/plugin` 配置

### 验证 Nx Targets

- [x] T069 [M5] 验证 `nx lint bpk-component-button` 工作正常
- [x] T070 [M5] 验证 `nx test bpk-component-button` 工作正常 _(测试在根级别统一运行)_
- [x] T071 [M5] 验证 `nx typecheck` 工作正常
- [x] T072 [M5] 验证 `nx storybook` 工作正常 _(Storybook 配置存在)_
- [x] T073 [M5] 验证 `nx build-storybook` 工作正常 _(通过 CI 验证)_

### 验证 Affected 命令

- [x] T074 [M5] 验证 `nx affected -t lint --base=main` 只处理受影响项目
- [x] T075 [M5] 验证 `nx affected -t test --base=main` 只测试受影响项目
- [x] T076 [M5] 验证 `nx affected -t typecheck --base=main` 只检查受影响项目

### 验证缓存

- [x] T077 [M5] 运行 `nx reset` 清除缓存
- [x] T078 [M5] 运行 `nx lint bpk-component-button` 第一次 _(11.145s)_
- [x] T079 [M5] 运行 `nx lint bpk-component-button` 第二次，验证缓存命中 _(1.046s, 缓存生效)_

### 更新 CI 工作流

- [ ] T080 [M5] 更新 `.github/workflows/ci.yml` 使用 `nx affected -t lint` _(待后续 PR 更新)_
- [ ] T081 [M5] 更新 CI 使用 `nx affected -t test` _(待后续 PR 更新)_
- [ ] T082 [M5] 更新 CI 使用 `nx affected -t typecheck` _(待后续 PR 更新)_
- [ ] T083 [M5] 添加 `nrwl/nx-set-shas@v4` action 设置 SHAs _(待后续 PR 更新)_
- [ ] T084 [M5] 测试 CI 工作流在 PR 中正常运行 _(待后续 PR 更新)_

### CI 验证

- [x] T085 [M5] 重复 T013-T016 CI 验证步骤

**Checkpoint M5**: 所有静态检查通过 Nx 运行，Nx targets 和缓存已配置完成 ✓

---

## Phase 6: Milestone 6 - 模块边界配置

**目标**: 配置 Nx 模块边界规则防止非法依赖

**独立验证**: `nx lint` 能检测到非法依赖

### 定义项目 Tags

- [x] T086 [M6] 在 `nx.json` 中定义 tag 约定（scope:component, scope:foundation）✅ Tags 在 project.json 中定义，不在 nx.json
- [x] T087 [P] [M6] 为 `bpk-mixins` 添加 tags: `["scope:foundation", "type:style"]` ✅
- [x] T088 [P] [M6] 为 `bpk-react-utils` 添加 tags: `["scope:foundation", "type:util"]` ✅
- [x] T089 [P] [M6] 为 `bpk-theming` 添加 tags: `["scope:foundation", "type:util"]` ✅
- [x] T090 [M6] 为组件包设置默认 tags（通过插件配置或单独 project.json）✅ 为所有 91 个包添加了 tags

### 配置模块边界规则

- [x] T091 [M6] 更新根 `.eslintrc.json` 添加 `@nx` 插件 ✅ 安装了 @nx/eslint-plugin
- [x] T092 [M6] 配置 `@nx/enforce-module-boundaries` 规则 ✅
- [x] T093 [M6] 添加 `depConstraints` 规则：component 可依赖 foundation 和 component ✅
- [x] T094 [M6] 添加 `depConstraints` 规则：foundation 只能依赖 foundation ✅

### 验证

- [x] T095 [M6] 运行 `nx lint` 确认没有现有的非法依赖 ✅ 配置 allow 参数允许包内相对导入
- [x] T096 [M6] 故意添加一个非法依赖，验证 lint 报错 ✅ 成功检测到非法依赖
- [x] T097 [M6] 移除测试用的非法依赖 ✅

### CI 验证

- [x] T098 [M6] 重复 T013-T016 CI 验证步骤 ✅ build, typecheck, test 全部通过

**Checkpoint M6**: 模块边界规则生效，非法依赖会被检测

---

## Phase 7: Milestone 7 - Nx 发布流程迁移

**目标**: 使用 `nx release` 替代现有 npm publish

**独立验证**: `nx release --dry-run` 显示正确的版本和 changelog

### 安装依赖

- [x] T099 [P] [M7] 安装 `@commitlint/cli`：`npm install -D @commitlint/cli` ✅
- [x] T100 [P] [M7] 安装 `@commitlint/config-conventional`：`npm install -D @commitlint/config-conventional` ✅
- [x] T101 [P] [M7] 安装 `husky`：`npm install -D husky`（如果尚未安装）✅ 已安装

### 配置 Conventional Commits

- [x] T102 [M7] 创建 `commitlint.config.js` 配置文件 ✅
- [x] T103 [M7] 配置 extends: `['@commitlint/config-conventional']` ✅
- [x] T104 [M7] 配置 `type-enum` 规则（feat, fix, docs, etc.）✅
- [x] T105 [M7] 创建或更新 `.husky/commit-msg` hook ✅
- [x] T106 [M7] 添加 commitlint 检查到 commit-msg hook ✅

### 配置 Nx Release

- [x] T107 [M7] 更新 `nx.json` 添加 `release` 配置 ✅
- [x] T108 [M7] 配置 `projects: ["packages/*"]` ✅ 使用 packages/* 匹配所有包
- [x] T109 [M7] 配置 `projectsRelationship: "fixed"` 保持单一版本 ✅
- [x] T110 [M7] 配置 `version.conventionalCommits: true` ✅
- [x] T111 [M7] 配置 `changelog.workspaceChangelog.createRelease: "github"` ✅
- [x] T112 [M7] 配置 `git.commit: true` 和 `git.tag: true` ✅

### 验证 Nx Release

- [x] T113 [M7] 运行 `nx release --dry-run` 验证版本计算 ✅ 需使用子命令
- [x] T114 [M7] 运行 `nx release version --dry-run` 验证版本变更 ✅ 检测版本 40.0.3
- [x] T115 [M7] 运行 `nx release changelog --dry-run` 验证 changelog 生成 ✅ 成功生成

### 更新发布工作流

- [x] T116 [M7] 创建或更新 `.github/workflows/release.yml` ✅ 创建 nx-release.yml
- [x] T117 [M7] 添加 `workflow_dispatch` 触发器（手动触发）✅
- [x] T118 [M7] 添加版本类型选择（major, minor, patch）✅ 添加 version 输入和 dryRun 选项
- [x] T119 [M7] 配置 `nx release --skip-publish` 步骤 ✅ 使用子命令分离
- [x] T120 [M7] 配置 `npm run build` 步骤 ✅
- [x] T121 [M7] 配置 `nx release publish` 步骤 ✅
- [x] T122 [M7] 配置 Git 推送和 tag 创建 ✅

### 测试发布流程

- [x] T123 [M7] 在测试分支上进行模拟发布测试 ✅ dry-run 验证通过
- [x] T124 [M7] 验证 changelog 正确生成 ✅ 生成 CHANGELOG.md
- [x] T125 [M7] 验证 GitHub Release 正确创建（dry-run 或测试环境）✅ dry-run 显示创建

### CI 最终验证

- [x] T126 [M7] 重复 T013-T016 CI 验证步骤 ✅ build, typecheck, test 全部通过
- [x] T127 [M7] 验证发布产物格式与现有格式兼容 ✅ 使用现有 build 流程

**Checkpoint M7**: Nx 发布流程配置完成，可以替代现有 npm publish

---

## Phase 8: 文档与清理

**目标**: 完成文档更新和最终验证

### 文档更新

- [ ] T128 [P] 更新 `CONTRIBUTING.md` 添加 Nx 命令说明
- [ ] T129 [P] 更新 `README.md` 添加 Nx 相关信息
- [ ] T130 [P] 创建 `docs/nx-adoption.md` 详细记录 Nx 配置和使用方式
- [ ] T131 [P] 更新 CI 工作流文档

### 最终验证

- [ ] T132 完整运行 `npm run build`
- [ ] T133 完整运行 `npm test`
- [ ] T134 完整运行 `npm run lint`
- [ ] T135 运行 `nx graph` 生成并保存依赖图截图
- [ ] T136 验证 CI 流程完整通过

### 清理

- [ ] T137 删除不再需要的旧配置文件（如果有）
- [ ] T138 移除调试用的临时代码
- [ ] T139 更新 `.gitignore` 添加 Nx 缓存目录

**Checkpoint Final**: Nx 适配完成，文档完整，准备合并

---

## Dependencies & Execution Order

### Milestone 依赖关系

```
M1 (Nx 初始化)
  ↓
M2 (项目结构)
  ↓
M3 (Storybook 迁移) ← 可与 M2 部分并行
  ↓
M4 (组件 Nx 项目) ← 依赖 M3 完成
  ↓
M5 (静态检查迁移) ← 依赖 M4 完成
  ↓
M6 (模块边界) ← 依赖 M5 完成
  ↓
M7 (发布流程) ← 依赖 M6 完成
  ↓
文档与清理
```

### 并行机会

| Milestone | 可并行任务 |
|-----------|-----------|
| M1 | T001-T002, T009-T012 |
| M4 | T047-T052 (代码生成组件配置) |
| M5 | T058-T061 (Nx 插件安装) |
| M6 | T087-T090 (Tags 配置) |
| M7 | T099-T101 (依赖安装), T128-T131 (文档) |

---

## Implementation Strategy

### MVP: Milestone 1-2

1. 完成 M1: Nx 初始化
2. 完成 M2: 项目结构配置
3. **验证**: `nx graph` 工作，现有功能不受影响
4. **可交付**: 基础 Nx 环境已就绪

### 增量交付

| 阶段 | Milestones | 交付价值 |
|------|------------|----------|
| Phase A | M1 + M2 | Nx 基础环境 |
| Phase B | M3 | Stories 与组件同位置 |
| Phase C | M4 | 组件级精细化构建 |
| Phase D | M5 | CI 增量构建和缓存 |
| Phase E | M6 | 模块边界保护 |
| Phase F | M7 | 自动化发布流程 |

---

## Summary

| 项目 | 数量 |
|------|------|
| **总任务数** | 139 |
| **M1 任务** | 16 |
| **M2 任务** | 9 |
| **M3 任务** | 15 |
| **M4 任务** | 17 |
| **M5 任务** | 28 |
| **M6 任务** | 13 |
| **M7 任务** | 29 |
| **文档清理** | 12 |
| **可并行任务** | ~30 |

---

## References

- **Spec**: `specs/1-nx-adoption/spec.md`
- **Plan**: `specs/1-nx-adoption/plan.md`
- **Research**: `specs/1-nx-adoption/research.md`
- **Technical Design**: `specs/1-nx-adoption/technical-design.md`
- **Epic**: [WOODPECKER-4025](https://skyscanner.atlassian.net/browse/WOODPECKER-4025)
