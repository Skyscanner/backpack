# Backpack Web Nx Adoption 方案分析报告

## 概述

本报告基于现有的 "Backpack Web: Nx Adoption One Pager" 文档，对比 Backpack 代码库实际情况，标注出文档中需要修改或更新的内容。

**报告范围**: 仅包含非 Optional 部分（排除 Dependency management、Vite adoption、Vitest adoption）

---

## 一、TL;DR 部分

### 原文档内容

> - Backpack Nx adoption
>   - Adopt Nx in Backpack-web to unlock dependency-aware, incremental builds and remote caching; streamline versioning/build/release to align with Production Standards
>   - Enforce clear module boundaries; and reduce multi-version bloat seen in production.
>   - This lays a clean foundation for later Vite/Vitest adoption without disrupting current consumers.
> - Blockers we must de-risk during further investigation:
>   - Import-path compatibility across TS/SCSS/icon mixins.
>   - Icon/Flare/Spinner code-gen & dynamic imports.
>   - External dependency conflicts (stale/abandoned libs; peer-dep mismatches)
> - 14 engineering weeks, 1 engineer (if we don't work on Dependency management, Vite and Vitest adoption)
>   - Only 60% confidence score in estimate without more investigation being done.
> - Value milestones
>   - Nx initialization
>   - Project structure confirmed and change
>   - Static checks & scripts via Nx
>   - Publishing with Nx
>   - ~~Dependency management compliance~~ (Optional)
>   - ~~Vite and Vitest adoption~~ (Optional)

### 需要修改的点

| 序号 | 原描述 | 建议修改 |
|-----|-------|---------|
| 1 | "14 engineering weeks" | **待重新评估** - 需要根据实际情况调整，特别是 Stories colocation 工作量可能被高估 |
| 2 | Value milestones 未包含 Stories colocation | **需要补充** - 原文档正文中有此 milestone 但 TL;DR 遗漏 |

---

## 二、Context 部分

### 原文档内容

> Backpack & Global Components live in separate repos **and Global Components has a direct dependency on Backpack**. When we ship **major releases**, we must first publish Backpack, then publish Global Components...
>
> Nx has already been selected as Skyscanner Web's strategic monorepo tooling...

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | Context 描述准确，背景信息正确 |

---

## 三、Current status/setup 部分

### 原文档内容

> **Repository layout**
> - **Two package.json manifests only** — a root-level `package.json` and a secondary `packages/package.json`. Individual components do not have their own `package.json`.
> - `packages/` — component folders (e.g. `bpk-component-button`) containing source, SCSS, tests.
> - `examples/` — hosts **all Storybook stories**; stories are not colocated with components.

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | "~130 component folders" (文档其他处提到 "~90") | **实际为 91 个组件目录** | 统一修改为 "约 91 个组件目录" |
| 2 | "`examples/` hosts **all** Storybook stories" | **只有约 32 个组件在 examples 下有 stories 文件** | 修改为 "约 32 个组件的 Storybook stories" |
| 3 | 未提及 postinstall hook | 存在 `"postinstall": "(cd packages && npm install)"` | 补充说明嵌套 npm install 机制 |
| 4 | 未提及两个 lock 文件 | 存在 `package-lock.json` 和 `packages/package-lock.json` | 补充说明两个 lock 文件的管理 |

### 原文档内容

> **Tooling & build flow**
> - `gulpfile.js` orchestrates code-generation tasks for `bpk-component-flare`, `bpk-component-icon`, and `bpk-component-spinner`.
> - Build scripts rely on **Gulp**, **Babel**, and custom Node utilities
> - Tests run via **Jest**; linting via ESLint, Stylelint, and Prettier.

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 未提及具体版本 | Gulp 5.0.0, Jest 30.2.0, TypeScript 5.9.2, Storybook 10.1.11 | 补充主要工具版本信息 |
| 2 | 未提及现有 Git hooks | 已有 Husky 9.1.3 + lint-staged 16.2.7 | 补充说明现有 Git hooks 配置 |
| 3 | 未提及 TypeScript 配置 | 存在 `tsconfig.json` (noEmit) 和 `tsconfig.declaration.json` | 补充 TypeScript 配置说明 |

### 原文档内容

> **CI & publishing**
> - **Versioning & release** are fully automated via **GitHub Actions**: on each release trigger, the CI workflow runs `npm publish` against the `dist/` output.

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | "on each release trigger" | 具体由 `on: release: types: [published]` 触发 | 明确说明是 GitHub Release 发布事件触发 |
| 2 | "runs `npm publish`" | 实际流程: `npm run transpile` → `cd dist` → `npm version $RELEASE_VERSION` → `npm publish` | 补充完整发布流程 |
| 3 | 未提及版本号来源 | 版本号从 GitHub Release tag name 获取 (`github.event.release.tag_name`) | 补充版本号获取方式 |

---

## 四、Considerations/Risks 部分

### 4.1 Adoption Approach & Scope

**原文档状态**: `No blockers`

> With ~90 Backpack packages, a "big-bang" cut-over would be high-risk...

### 需要修改的点

| 序号 | 原描述 | 建议修改 |
|-----|-------|---------|
| 1 | "~90 Backpack packages" | 修改为 "91 个组件" |

---

### 4.2 Project Structure & Module Boundaries

**原文档状态**: `No blockers`

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | 描述准确 |

---

### 4.3 Recreate Basic CLI via Nx Targets

**原文档状态**: `No blockers`

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | 描述准确 |

---

### 4.4 Build Failed after Leverage Nx Recommend Typescript Config

**原文档状态**: `No blockers` `Needs more investigation`

> When we enabled `composite: true` in global-components, all `.d.ts` outputs vanished...

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 从 GC 经验推测可能有问题 | Backpack 当前使用 `moduleResolution: "bundler"`，未使用 `composite`，配置较现代 | 降低此风险等级，但保留调查需求 |

**当前 tsconfig.json 配置**:
```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler",
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
```

---

### 4.5 External dependency cause build error

**原文档状态**: `blockers` `Needs more investigation`

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | 保持 blocker 状态，需要调查 |

---

### 4.6 Publishing with Nx and Build Target Folder Change

**原文档状态**: `No blockers`

> Our current release pipeline uses `npm publish` directly from the `dist/` folder. The new Production Standard mandates that all Web libraries use Nx to manage releases...

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 未详细说明当前版本管理方式 | 当前使用 GitHub Release 手动创建 + tag name 作为版本号 | 补充说明需要从 "手动 GitHub Release" 迁移到 "conventional commits + nx release" 的完整变更 |

---

### 4.7 Icon/Flare/Spinners Dynamic imports

**原文档状态**: `blockers` `Needs more investigation`

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | 保持 blocker 状态 |

---

### 4.8 Adjust Backpack Import Structure to Support Mono Repo Migration

**原文档状态**: `blockers` `Needs more investigation`

### 需要修改的点

| 序号 | 状态 | 说明 |
|-----|------|-----|
| - | ✅ 无需修改 | 保持 blocker 状态 |

---

## 五、Value Milestones 部分（非 Optional）

### 5.1 Nx Initialization

**原文档**: `effort: VL` `complexity: S` `Estimate: < 1 week`

> **How**:
> - Scaffold an empty Nx workspace, which will introduce an `nx.json` file
> - Set up TypeScript project references
> - Remove any custom caching of `node_modules` from CI workflow

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | "Remove any custom caching of `node_modules` from CI workflow" | 当前 CI 缓存路径为 `node_modules/` 和 `packages/node_modules/`，基于两个 lock 文件的 hash | 明确说明需要处理双重 node_modules 缓存的迁移 |

---

### 5.2 Project structure confirmation and change

**原文档**: `effort: L` `complexity: S` `Estimate: 2 weeks`

> **How**:
> - Produce a draft project-structure document
> - Execute folder reorganization via `nx workspace:move` or `git mv`
> - Update configs: GitHub Actions, Jest config, Storybook entries

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 未提及 packages/package-lock.json 处理 | 存在独立的 packages 下 lock 文件 | 补充说明如何处理/合并两个 lock 文件 |
| 2 | 未提及 postinstall hook | 存在嵌套 npm install 机制 | 补充说明如何移除此 workaround |

---

### 5.3 All Storybook stories are colocated with components

**原文档**: `effort: VL` `complexity: S` `Estimate: 1 week`

> **How**:
> - For each component, relocate its corresponding `.stories.tsx` into `libs/<component>/src/`
> - Adjust Storybook config
> - Validate storybook builds

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 假设所有组件都有 stories 需要迁移 | **只有约 32 个组件有 stories 文件** | 明确说明实际工作量：迁移 32 个 stories 文件，而非 91 个 |
| 2 | 未说明没有 stories 的组件处理方式 | 约 59 个组件没有 stories | 补充说明：无 stories 的组件无需处理，或考虑是否需要补充 stories |

**实际有 stories 的组件列表** (32 个):
```
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
```

---

### 5.4 Set up Components as Nx projects

**原文档**: `effort: VL` `complexity: S` `Estimate: 2 weeks`

> **How**:
> - Every component has its `project.json`
> - For every project: `tsconfig.json`, `tsconfig.(app|lib).json` and `tsconfig.spec.json` exist
> - All project references are kept in sync

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | "Every component has its `project.json`" | 需要为 91 个组件创建 project.json | 明确数量：91 个 project.json |
| 2 | 未说明是否可以自动生成 | Nx 支持自动推断项目配置 | 考虑使用 Nx 的项目推断功能减少手动配置 |

---

### 5.5 Converting Static Checks and Scripts to Nx

**原文档**: `effort: L` `complexity: S` `Estimate: 3 weeks`

> **How**:
> - Leverage appropriate Nx plugins and executors
> - Update GHA job to call `nx affected` or `nx run-many`
> - Deprecate legacy `npm` commands

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 未列出需要迁移的具体脚本 | 需要迁移的脚本包括: `lint:js`, `lint:scss`, `jest`, `typecheck`, `build`, `storybook` | 补充具体脚本清单 |
| 2 | 未提及现有 lint-staged 配置 | 已有 lint-staged 配置可能需要调整 | 补充 lint-staged 与 Nx 的整合方案 |

**需要迁移到 Nx 的脚本**:
| 脚本 | 当前命令 | Nx 目标 |
|-----|---------|--------|
| lint:js | `eslint . .storybook --ext .js,.jsx,.ts,.tsx` | `nx affected --target=lint` |
| lint:scss | `stylelint 'packages/**/*.scss'` | 整合到 lint target |
| jest | `TZ=Etc/UTC jest --coverage` | `nx affected --target=test` |
| typecheck | `tsc` | `nx affected --target=typecheck` |
| build | `run-s build:*` | `nx run-many --target=build` |
| storybook | `storybook dev -p 9001` | `nx storybook` |

---

### 5.6 Configure module boundaries

**原文档**: `effort: L` `complexity: S` `Estimate: 1 week`

> **How**:
> - Assign tags in each project
> - Modify `.eslintrc` to add `@nx/enforce-module-boundaries` rule

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | 未说明具体的 tag 分类方案 | Backpack 组件有明确分类（component, mixin, stylesheet, util） | 补充建议的 tag 分类方案 |

**建议的 Tag 分类**:
```
type: component | mixin | stylesheet | util | example
scope: public | internal
```

---

### 5.7 Publishing with Nx

**原文档**: `effort: M` `complexity: M` `Estimate: 4 weeks`

> **How**:
> - Extend `nx.json` and add a `release` target
> - Install and set up commitizen and husky (or CI PR checks) to enforce Conventional Commits
> - Create a GitHub Actions workflow that triggers `nx release`
> - Update production release workflow to call `nx release` instead of `npm publish`

### 需要修改的点

| 序号 | 原描述 | 实际情况 | 建议修改 |
|-----|-------|---------|---------|
| 1 | "Install and set up husky" | **Husky 9.1.3 已安装** | 修改为 "复用现有 Husky 配置，添加 commit-msg hook" |
| 2 | 未详细说明版本号迁移 | 当前从 GitHub Release tag 获取版本号 | 补充说明从 "手动 Release tag" 到 "conventional commits 自动版本" 的迁移策略 |
| 3 | 未说明 changelog 迁移 | 当前使用 release-drafter | 补充说明从 release-drafter 到 nx release changelog 的迁移 |
| 4 | 未提及单包发布特性 | Backpack 是单包发布 (`@skyscanner/backpack-web`) | 明确说明 nx release 配置为单包模式 |

**当前发布流程 vs 目标发布流程**:

| 步骤 | 当前流程 | 目标流程 (Nx) |
|-----|---------|-------------|
| 版本确定 | 手动创建 GitHub Release 并指定 tag | Conventional commits 自动计算 |
| Changelog | release-drafter 自动生成 draft | nx release 生成 |
| 触发方式 | GitHub Release publish 事件 | PR merge 或手动触发 nx release |
| 发布命令 | `npm publish` | `nx release publish` |

---

## 六、工时估算总结

### 原文档估算 (非 Optional)

| Milestone | 原估算 |
|-----------|-------|
| Nx initialization | < 1 week |
| Project structure confirmation and change | 2 weeks |
| All Storybook stories are colocated | 1 week |
| Set up Components as Nx projects | 2 weeks |
| Converting Static Checks and Scripts | 3 weeks |
| Configure module boundaries | 1 week |
| Publishing with Nx | 4 weeks |
| **总计** | **~14 weeks** |

### 建议调整

| Milestone | 原估算 | 建议调整 | 原因 |
|-----------|-------|---------|-----|
| Stories colocation | 1 week | **0.5 week** | 实际只有 32 个 stories，工作量减半 |
| Publishing with Nx | 4 weeks | **4-5 weeks** | 需要处理从 GitHub Release 到 conventional commits 的流程变更 |
| Project structure | 2 weeks | **2-3 weeks** | 需要处理双重 package-lock.json 合并 |

**调整后总估算**: ~14-15 weeks（与原估算基本一致，但分布有调整）

---

## 七、文档中遗漏的重要信息

### 7.1 现有工具链（需补充）

| 工具 | 版本 | 说明 |
|-----|-----|-----|
| Husky | 9.1.3 | 已配置，可复用 |
| lint-staged | 16.2.7 | 已配置，需整合 |
| TypeScript | 5.9.2 | 较新版本 |
| Jest | 30.2.0 | 最新版本 |
| Storybook | 10.1.11 | 较新版本 |
| Gulp | 5.0.0 | 代码生成用 |

### 7.2 CI 缓存配置（需补充）

当前 CI 缓存:
```yaml
path: |
  node_modules/
  packages/node_modules/
key: ${{ env.CACHE_NAME }}-${{ hashFiles('package-lock.json', 'packages/package-lock.json') }}
```

Nx 采用后需要:
- 移除 `packages/node_modules/` 路径
- 更新 cache key 计算方式
- 添加 Nx cache 配置

### 7.3 Spec-kit 集成（新增信息）

代码库近期已集成 Spec-kit framework (`.specify/` 目录)，可与 Nx adoption 工作协同。

---

## 八、总结

### 主要修正点

1. **数量修正**: 组件数量为 91 个，有 stories 的组件为 32 个
2. **工具链补充**: 已有 Husky、lint-staged 等工具可复用
3. **发布流程**: 需明确从 GitHub Release 手动流程到 conventional commits 自动流程的变更
4. **TypeScript**: 当前配置较现代，composite 问题风险降低
5. **双重 lock 文件**: 需要处理合并策略

### 保持不变的 Blockers

1. External dependency conflicts - 需要调查
2. Icon/Flare/Spinners Dynamic imports - 需要调查
3. Import path compatibility - 需要调查

---

## 九、Blockers 深入调查结论

基于对代码库的详细分析，以下是三个主要 blocker 的调查结论：

### 9.1 External Dependency Conflicts (外部依赖冲突)

**原文档状态**: `blockers` `Needs more investigation`

#### 调查结论: ⚠️ 中等风险，可解决

**发现的问题依赖**:

| 依赖 | 版本 | 问题 | 严重程度 |
|-----|------|------|---------|
| `normalize.css` | 4.2.0 (固定) | 2015 年版本，已过时 10 年 | 高 |
| `object-assign` | 4.1.1 | 2015 年版本，ES6 已原生支持 | 中 |
| `intersection-observer` | 0.12.2 | 2019 年版本，现代浏览器已原生支持 (>95%) | 中 |
| `react-table` | 7.8.0 | EOL，TanStack Table v8+ 已发布 | 高 |
| `react-autosuggest` | 9.4.3 | 2020 年后未维护，已有替代方案 (downshift) | 中 |
| `react-virtualized-auto-sizer` | 1.0.20 (固定) | 固定版本，不符合 semver 规范 | 低 |

**与 Nx 的潜在冲突**:

1. **Babel v7.28.x**: Nx 18+ 更推荐 SWC，但 Babel 仍可兼容
2. **Jest 30.2.0**: 版本较新，Nx Jest executor 通常测试 v28-29，可能需要额外配置
3. **React peer dependency 范围过宽**: `17.0.2 - 18.3.1` 跨主版本，Nx 期望更严格的版本边界

**结论**:
- **不是 hard blocker**，但建议在 Nx 采用前清理过时依赖
- 优先移除: `normalize.css` (升级到 10.x 或移除), `object-assign`, `intersection-observer`
- 计划升级: `react-table` → TanStack Table v8

---

### 9.2 Icon/Flare/Spinners Dynamic Imports (代码生成与动态导入)

**原文档状态**: `blockers` `Needs more investigation`

#### 调查结论: 🔴 高风险，需要专门处理

**代码生成机制分析**:

| 组件 | 源文件位置 | 生成文件位置 | 生成方式 |
|-----|----------|------------|---------|
| **Icon** | `node_modules/@skyscanner/bpk-svgs/dist/js/icons/` | `packages/bpk-component-icon/{sm,lg,xxxl}/` | 直接复制 |
| **Spinner** | `node_modules/@skyscanner/bpk-svgs/dist/js/spinners/` | `packages/bpk-component-spinner/src/spinners/` | 直接复制 |
| **Flare** | `packages/bpk-component-flare/src/svgs/*.svg` | `packages/bpk-component-flare/src/__generated__/js/` | SVG → React 转换 |

**关键问题**:

1. **生成文件被 gitignore**:
   ```
   /packages/bpk-component-icon/*/
   /packages/bpk-component-spinner/src/spinners
   /packages/bpk-component-flare/src/__generated__
   ```
   Nx 缓存需要显式配置这些输出目录

2. **外部依赖变更不触发缓存失效**:
   - Icon/Spinner 依赖 `@skyscanner/bpk-svgs` npm 包
   - 如果 npm 包内容变更但版本号相同，Nx 缓存不会失效

3. **Flare 原地修改源文件**:
   - `svgmin` 任务会修改 `src/svgs/*.svg` 文件（优化）
   - 然后生成 `__generated__/js/*.js`
   - Nx 可能无法正确追踪这种双重输出

4. **构建依赖链**:
   ```
   npm run build:gulp (代码生成)
       ↓
   npm run transpile (Babel 转译，依赖生成的文件)
       ↓
   npm run typecheck (TypeScript，依赖生成的文件)
   ```

**Nx 配置建议**:

```json
// Icon 组件 project.json
{
  "targets": {
    "generate": {
      "executor": "nx:run-commands",
      "command": "gulp generateIcons",
      "inputs": [
        "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/dist/js/icons/**/*"
      ],
      "outputs": [
        "{projectRoot}/sm",
        "{projectRoot}/lg",
        "{projectRoot}/xxxl"
      ]
    },
    "build": {
      "dependsOn": ["generate"]
    }
  }
}
```

**结论**:
- **是 blocker**，但有明确的解决路径
- 需要为每个代码生成组件配置显式的 inputs/outputs
- 需要确保 generate 任务在 build/test/typecheck 之前运行
- 建议将 `@skyscanner/bpk-svgs` 锁定为精确版本避免隐式变更

---

### 9.3 Import Path Compatibility (导入路径兼容性)

**原文档状态**: `blockers` `Needs more investigation`

#### 调查结论: 🔴 严重风险，需要大量重构

**发现的关键问题**:

#### 问题 1: 无路径别名配置

**当前 tsconfig.json**:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler"
    // 没有 paths 配置！
  }
}
```

所有 207+ 个组件间导入都使用相对路径:
```typescript
// 浅层组件
import { cssModules } from '../../bpk-react-utils';

// V2 嵌套组件 (多一层)
import { cssModules } from '../../../bpk-react-utils';
```

**影响**: 如果重组目录结构，所有相对路径都需要更新

#### 问题 2: SCSS @use 相对路径

发现 292+ 个 SCSS `@use` 语句:
```scss
// 浅层组件
@use '../../bpk-mixins/tokens';
@use '../../bpk-mixins/buttons';

// V2 嵌套组件
@use '../../../bpk-mixins/tokens';
```

**影响**: SCSS 没有类似 TypeScript paths 的别名机制，重构困难

#### 问题 3: 内部实现路径暴露

部分组件直接导入其他组件的 `src/` 内部文件:
```typescript
// packages/bpk-component-bottom-sheet/src/BpkBottomSheet.tsx
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
```

**影响**: 违反模块封装原则，Nx module boundaries 会报错

#### 问题 4: 组件深度不一致

| 类型 | 路径模式 | 导入其他组件 |
|-----|---------|------------|
| 简单组件 | `packages/bpk-component-*/src/` | `../../other-component` |
| V2 嵌套 | `packages/bpk-component-*/src/BpkComponent/` | `../../../other-component` |
| Icon 子目录 | `packages/bpk-component-icon/{sm,lg,xxxl}/` | 特殊处理 |

#### 问题 5: 消费者导入路径

消费者使用:
```typescript
import BpkButton from '@skyscanner/backpack-web/bpk-component-button';
```

如果改为 Nx 库命名空间 (`@bpk/button`)，需要:
- 提供迁移 codemod
- 或保持兼容的 re-export 层

**建议的解决方案**:

1. **添加 TypeScript 路径别名** (Nx 采用前):
   ```json
   // tsconfig.json
   {
     "compilerOptions": {
       "paths": {
         "@backpack/*": ["packages/*"],
         "@backpack/mixins/*": ["packages/bpk-mixins/*"]
       }
     }
   }
   ```

2. **重构内部 src 导入**:
   - 审计所有 `from '../../xxx/src/...'` 导入
   - 改为从包入口点 `index.ts` 导入

3. **统一组件目录深度**:
   - 所有组件保持一致的嵌套层级
   - 或使用路径别名屏蔽差异

4. **保持消费者兼容性**:
   - 使用 `exports` field 或 re-export 保持 `@skyscanner/backpack-web/bpk-component-*` 路径

**结论**:
- **是主要 blocker**，需要显著重构
- 建议在 Nx 采用前先添加路径别名
- 预计需要额外 **1-2 周** 专门处理导入路径问题

---

### 9.4 Blockers 总结

| Blocker | 严重程度 | 是否阻塞 | 解决方案 | 额外工时 |
|---------|---------|---------|---------|---------|
| External dependencies | 中 | 否 | 清理过时依赖 | 0.5-1 周 |
| Icon/Flare/Spinner codegen | 高 | 是 | 配置 Nx inputs/outputs | 1 周 |
| Import path compatibility | 严重 | 是 | 添加路径别名 + 重构 | 1-2 周 |

**建议的处理顺序**:

1. **Phase 0 (Nx 采用前)**:
   - 添加 TypeScript 路径别名
   - 审计并重构内部 src 导入
   - 清理过时依赖

2. **Phase 1 (Nx 初始化)**:
   - 配置代码生成任务的 inputs/outputs
   - 设置正确的任务依赖链

3. **Phase 2 (持续优化)**:
   - 统一组件目录结构
   - 配置 SCSS 导入别名（可能需要自定义预处理）

**修订后的工时估算**:

原估算 14 weeks + 额外 blocker 处理 2.5-4 weeks = **16.5-18 weeks**

---

## 十、基于其他项目经验的额外风险

以下风险来自 Skyscanner 其他项目（Banana、Hotels-website、Global Components）在 Nx adoption 过程中遇到的实际问题，**且对 Backpack 存在实际影响**。

### 10.1 ESLint Module Boundaries 规则失效

**来源**: Banana 团队实际遇到的问题

**问题描述**:
- Nx 的 `@nx/enforce-module-boundaries` ESLint 规则在某些配置下不能正常工作
- Git commit hook、CI 和 `nx lint` 命令行为不一致
- 根本原因：Nx 的 `target-project-locator` 模块在使用 npm workspaces + 单一 node_modules（single version policy）时，TypeScript 模块解析无法正确找到项目

**Backpack 影响**: 🟡 中等
- Backpack 当前使用嵌套的 `packages/node_modules`
- 迁移到 Nx 后可能改为单一 node_modules，需要注意此问题

**建议**:
- 使用 Nx 最新版本（包含 Banana 团队贡献的修复）
- 或者为每个项目定义 `exports` 字段

---

### 10.2 Storybook + Percy 视觉测试集成

**来源**: Global Components 迁移问题记录

**问题描述**:
- Nx 推荐使用 "One Storybook for All" 模式
- 但如果有 Percy 视觉测试，合并 Storybook 可能影响现有的测试流程
- Percy CLI 的 `--include` 过滤选项可能不按预期工作

**Backpack 影响**: 🟡 中等
- Backpack 使用 Percy 进行视觉测试
- 当前 stories 在 `examples/` 目录，需要迁移到组件旁边

**建议**:
- 在迁移 stories 时验证 Percy 测试仍能正常工作
- 可能需要调整 Percy 配置以适应新的 story 路径

---

### 10.3 缓存命中率问题

**来源**: Nx Cloud PoC 文档

**问题描述**:
- Hotels-website 虽然 Nx 采用成熟，但存在 "cache/dependency issues"
- 缓存命中/未命中和显式依赖检测有问题
- 代码生成依赖外部 npm 包时尤其明显

**Backpack 影响**: 🟡 中等
- Backpack 有 91 个组件，如果 inputs/outputs 配置不准确，缓存可能无效
- 代码生成依赖外部 `@skyscanner/bpk-svgs` npm 包

**建议**:
- 详细配置每个项目的 `inputs` 和 `outputs`
- 外部依赖应锁定精确版本
- 定期验证缓存命中率

---

### 10.4 pnpm 迁移协调

**来源**: Banana PNPM One Pager、Global Components 迁移文档

**问题描述**:
- Web Platform 战略要求所有项目使用 pnpm
- 迁移到 pnpm 需要与 Nx 采用协调

**Backpack 影响**: 🟡 中等
- 当前 Backpack 使用 npm
- 如果需要与 Banana monorepo 合并，需要先迁移到 pnpm

**建议**:
- 考虑在 Nx 采用的同时迁移到 pnpm
- 或者分阶段：先 Nx，后 pnpm
- 与 UXP 团队对齐迁移时间表

---

### 10.5 CI 缓存配置变更

**来源**: Web Foundations Migration Guide、Banana Q&A

**问题描述**:
- Nx 采用后可能需要移除自定义的 node_modules 缓存
- 可能影响 CI 时间

**Backpack 影响**: 🟡 中等
- Backpack 当前 CI 缓存两个 node_modules 目录
- 移除缓存可能增加 CI 时间

**建议**:
- 评估 Nx 远程缓存是否能补偿 node_modules 缓存的损失
- 考虑使用 Nx Cloud 进行分布式缓存

---

### 10.6 nx release vs npm publish 触发问题

**来源**: GC into Banana 问题记录

**问题描述**:
- 当点击 release 按钮时，如果没有代码变更，`nx affected` 会认为没有项目受影响
- 运行 `nx affected build` 会构建 nothing

**Backpack 影响**: 🔴 高
- Backpack 使用 GitHub Release 触发发布
- 如果使用 `nx affected`，可能无法正确触发构建

**建议**:
- 发布流程使用 `nx run-many` 而不是 `nx affected`
- 或者配置特定的 release 任务不使用 affected 检测

---

### 10.7 额外风险总结

| 风险 | 来源项目 | 风险等级 | 建议 |
|-----|---------|---------|------|
| ESLint module boundaries 失效 | Banana | 🟡 中 | 使用最新 Nx 版本 |
| Storybook + Percy 集成 | GC | 🟡 中 | 验证 Percy 测试 |
| 缓存命中率 | Hotels | 🟡 中 | 精确配置 inputs/outputs |
| pnpm 迁移协调 | 多项目 | 🟡 中 | 与团队对齐时间表 |
| CI 缓存变更 | Banana | 🟡 中 | 评估 Nx 缓存补偿 |
| nx release 触发问题 | GC | 🔴 高 | 使用 run-many 发布 |

---

### 10.8 最终工时估算调整

考虑额外风险后的工时估算：

| 类别 | 工时 |
|-----|------|
| 原方案估算 (非 Optional) | 14 weeks |
| Blocker 处理 | +2.5-4 weeks |
| 额外风险处理 | +1-2 weeks |
| **总计** | **17.5-20 weeks** |

**主要额外工时来源**:
- Percy 测试验证和调整: 0.5 week
- 发布流程调整 (nx release vs affected): 0.5 week
- CI 缓存策略优化: 0.5 week
- pnpm 迁移协调（如需要）: 0.5-1 week

---

*报告更新日期: 2026-01-26*
*基于 Backpack 代码库 commit: e52d54351*
*参考文档: Banana Nx Adoption, GC into Banana Problem Record, Nx Cloud PoC, Web Foundations Migration Guide*
