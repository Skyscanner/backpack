# Backpack Nx 迁移总览文档

## 文档版本
- **创建日期**: 2026-01-26
- **状态**: Draft
- **负责团队**: Clover Squad
- **相关 Epic**: [UP-341](https://skyscanner.atlassian.net/browse/UP-341)

## 目录
- [00-summary.md](./00-summary.md) - 本文档
- [01-milestone-1-nx-initialization.md](./01-milestone-1-nx-initialization.md) - Milestone 1: Nx 初始化
- [02-milestone-2-static-checks.md](./02-milestone-2-static-checks.md) - Milestone 2: 静态检查迁移
- [03-milestone-3-package-restructure.md](./03-milestone-3-package-restructure.md) - Milestone 3: 包结构重组
- [04-milestone-4-libs-extraction.md](./04-milestone-4-libs-extraction.md) - Milestone 4: Libraries 提取
- [05-milestone-5-optimization.md](./05-milestone-5-optimization.md) - Milestone 5: 优化与增强

---

## 1. 迁移背景 (Migration Background)

### 1.1 战略背景

**Skyscanner Web 前端战略**: Web Foundations
- Nx 已被选为 Skyscanner Web 的战略性 monorepo 工具
- 通过一套迭代、可扩展的工具链显著加速开发速度
- 已在 Hotels Website、Legal Pages、Banana、Falcon 等项目成功实施
- Global Components 已完成 Nx 迁移

**Backpack 的定位**:
- Backpack 是 Skyscanner 的设计系统，提供 90+ 组件包
- Global Components 直接依赖 Backpack
- 当前发布流程需要先发布 Backpack，再发布 Global Components
- 导致版本升级窗口长、多版本共存问题严重

### 1.2 迁移目标

**最终愿景**: 将 Backpack 迁移到 Nx，并最终整合进 Banana monorepo

**直接收益**:
1. **增量构建和缓存**: 只重建变更的内容
2. **依赖感知**: 精确的依赖图分析
3. **统一版本管理**: 消除多版本共存导致的 JS/CSS 膨胀
4. **改进发布流程** (可选): 可考虑基于 conventional commits 的版本管理
5. **模块边界强制**: 清晰的架构约束

**长期收益**:
- 为未来的 Vite/Vitest 迁移奠定基础
- 支持 Backpack 整合进更大的 monorepo (如 Banana)
- 改善开发体验和 CI 时间
- 符合 Skyscanner Production Standards

### 1.3 参考项目

已完成 Nx 迁移的项目:
- **Banana**: [Design Review](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1362971958)
- **Falcon**: [Design Review](https://skyscanner.atlassian.net/wiki/spaces/WOM/pages/1418986155)
- **Hotels Website**: [Design Review](https://skyscanner.atlassian.net/wiki/spaces/BD/pages/1199737490)
- **Legal Pages**: [Design Review](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1140306191)
- **Global Components**: 已完成，可参考实际代码

---

## 2. 当前代码现状 (Current State Analysis)

### 2.1 仓库结构

```
backpack/
├── .github/              # CI/CD workflows
├── .storybook/           # Storybook 配置
├── packages/             # ~90 个组件包
│   ├── bpk-component-button/
│   ├── bpk-component-card/
│   ├── bpk-mixins/
│   ├── bpk-stylesheets/
│   └── package.json      # 共享的 package.json (所有组件共用)
├── examples/             # 93 个 Storybook stories (未与组件共置)
├── scripts/              # 构建和工具脚本
├── gulpfile.js/          # Gulp 构建任务
├── babel.config.js       # Babel 配置
├── package.json          # 根 package.json
└── tsconfig.json         # TypeScript 配置
```

**关键特征**:
- **双 package.json 结构**: 根 `package.json` + `packages/package.json`
- `packages/package.json` 作为所有组件的共享清单
- 组件本身**没有独立的** `package.json`
- Stories 存放在独立的 `examples/` 目录，未与组件共置

### 2.2 构建系统

**工具链**:
- **Gulp**: 编排代码生成任务 (icons, flare, spinner)
- **Babel**: 转译 (v7.28.3)
- **Webpack**: Storybook 和开发环境 (v5.103.0)
- **Sass**: 使用 `sass-embedded` (Dart Sass)
- **Jest**: 单元测试 (v30.2.0)

**构建流程**:
```bash
npm run build
  → build:copy-normal_css
  → build:gulp (generateIcons, generateFlare, generateSpinners)
  → build:sass
  → build:stylesheets
```

**代码生成**:
- Icons, Flare, Spinner 通过 Gulp 从 SVG 生成 React 组件
- 生成路径: `packages/<component>/src/generated/js/`
- 依赖外部包: `@skyscanner/bpk-svgs`

### 2.3 依赖管理

**包管理器**: npm (不使用 workspaces)
- Node: >=18.20.4
- npm: >=10.7.0

**依赖声明**:
- **所有** production dependencies 在 `packages/package.json`
- 根 `package.json` 只有 devDependencies
- **不符合** TypeScript Monorepo Production Standard

**Peer Dependencies**:
- React: 17.0.2 - 18.3.1
- React DOM: 17.0.2 - 18.3.1
- sass: ^1 (可选)

### 2.4 发布与消费

**发布模式**:
- 单一 umbrella package: `@skyscanner/backpack-web`
- 通过 GitHub Actions 自动发布到 npm
- 构建产物输出到 `dist/` 目录

**消费模式**:
```typescript
// TypeScript 导入
import Button from '@skyscanner/backpack-web/bpk-component-button';

// SCSS 导入 (相对路径, unstable)
@use '../unstable__bpk-mixins/tokens';
@use '../unstable__bpk-mixins/icons';
```

**问题**:
- Icons 使用虚拟路径 (webpack 代码生成驱动)
- SCSS 使用相对路径和 `unstable__` 前缀
- 没有统一的命名空间

### 2.5 测试

**Jest 配置**:
```json
{
  "testEnvironment": "jsdom",
  "testRegex": "packages/.*-test\\.[jt]sx?$",
  "coverageThreshold": {
    "global": {
      "branches": 70,
      "functions": 75,
      "lines": 75,
      "statements": 75
    }
  }
}
```

**测试库**:
- @testing-library/react
- @testing-library/jest-dom
- jest-axe (可访问性测试)

### 2.6 CI/CD

**GitHub Actions Workflows**:
1. **main.yml**: 主分支构建和部署
2. **pr.yml**: PR 检查和预览部署
3. **release.yml**: NPM 发布
4. **label-check.yml**: PR 标签验证

**CI 任务**:
- Linting (ESLint, Stylelint)
- Type checking (TypeScript)
- Unit tests (Jest)
- Accessibility tests (jest-axe)
- Visual regression (Percy)
- Storybook 构建和部署

---

## 3. Blockers 与风险 (Blockers & Risks)

### 3.1 Critical Blockers

#### **Blocker 1: Import 结构不兼容**
- **问题**: 多个导入根 (TS: `@skyscanner/backpack-web/...`, SCSS: `../unstable__...`)
- **影响**: 无法实现 "root-only" 迁移，Nx 项目映射困难
- **相关组件**: 所有组件、mixins、stylesheets
- **解决方案**: 见 Milestone 3

#### **Blocker 2: Icons/Flare/Spinner 动态导入**
- **问题**: 虚拟路径通过 webpack/codegen 驱动，非真实文件树
- **影响**: IDE/TS/Nx 无法静态解析，缓存不可靠
- **相关**: bpk-component-icon, bpk-component-flare, bpk-component-spinner
- **解决方案**: 见 Milestone 3 & 4

#### **Blocker 3: SCSS 相对路径和 unstable mixins**
- **问题**: 使用相对路径 (`../unstable__bpk-mixins/*`)
- **影响**: 跨 repo 边界脆弱，bundler 不一致
- **前置条件**: 完成 Sass 迁移 (`@import` → `@use/@forward`)
- **解决方案**: 见 Milestone 3

#### **Blocker 4: 依赖管理不符合标准**
- **问题**: 所有依赖在 `packages/package.json`，根 `package.json` 无 production deps
- **影响**: 不符合 TypeScript Monorepo Production Standard
- **解决方案**: 见 Milestone 4

### 3.2 需要调查的事项 (Needs Investigation)

| 事项 | 优先级 | 预计影响 | 调查阶段 |
|------|--------|----------|----------|
| Nx Composite TypeScript 配置导致 .d.ts 消失 | High | Build failure | Milestone 1 |
| 外部依赖版本冲突 (stale/abandoned libs) | High | CI blocking | Milestone 1 |
| Vite/Vitest 迁移可行性 | Medium | 可选优化 | Milestone 5 |
| Nx Cloud 收益评估 | Low | 可选优化 | Milestone 5 |
| RSC/SSR boundary 处理 | Medium | 未来兼容性 | Milestone 4 |

### 3.3 风险矩阵

| 风险 | 影响 | 可能性 | 缓解措施 |
|------|------|--------|----------|
| 消费者导入路径破坏 | High | Medium | Codemods + 向后兼容层 |
| CI/CD 管道失败 | High | Medium | 影子发布验证 |
| TypeScript 类型覆盖不完整 | Medium | High | 生成 .d.ts + CI 检查 |
| 外部依赖冲突 | Medium | Medium | 依赖审计 + 版本锁定 |
| 代码生成时序不确定 | Medium | High | Nx targets + inputs/outputs |
| PNPM 兼容性问题 | Low | Low | 推迟到 Milestone 5 |

---

## 4. 迁移方案 (Migration Approach)

### 4.1 总体原则

1. **增量迁移**: 分阶段推进,每个阶段可独立交付价值
2. **向后兼容**: 保持现有消费者的导入路径不变 (至少在过渡期)
3. **双轨验证**: 新旧构建并行运行直到完全切换
4. **自动化优先**: 提供 codemods 和脚本减少手动工作
5. **Production Standards 对齐**: 遵循 Skyscanner 的 TypeScript Monorepo 标准

### 4.2 技术方案

#### **方案 A: 渐进式迁移 (推荐)**
- **阶段 1**: Nx 初始化,不改变现有结构
- **阶段 2**: 静态检查工具迁移到 Nx
- **阶段 3**: 调整导入结构和项目边界
- **阶段 4**: 提取共享库和强制模块边界
- **阶段 5**: 优化和增强 (Vite/Vitest, PNPM)

**优点**: 风险低,每步可验证,容易回滚
**缺点**: 总周期较长

#### **方案 B: 快速切换**
- 直接重构到目标结构,一次性完成

**优点**: 快速完成
**缺点**: 风险高,难以回滚,消费者影响大

**决策**: 采用方案 A (渐进式迁移)

### 4.3 命名空间策略

考虑的选项:

1. **选项 1: 复用现有路径** (`@skyscanner/backpack-web/...`)
   - ✅ 零消费者变更
   - ❌ 保留遗留别名和路径问题

2. **选项 2: 重新定义** (`@backpack/*`)
   - ✅ 清晰的 API 表面
   - ❌ 需要 codemod 和文档更新

3. **选项 3: 双表面策略**
   - 内部使用 `@backpack/*` (Nx)
   - 外部保持 `@skyscanner/backpack-web/...` (NPM)
   - ✅ 最佳灵活性
   - ❌ 维护复杂度高

**推荐**: 在 Phase 0 (Import Structure Adjustment) 中详细调查后决定。
初步倾向**选项 3** (双表面) 或**选项 1** (复用) + 技术债务计划。

---

## 5. Milestones 总览

### Milestone 1: Nx 初始化与项目结构确认

**价值**: 建立 Nx workspace,确定目标结构

### Milestone 2: 静态检查迁移到 Nx

**价值**: TypeScript, ESLint, Stylelint 通过 Nx 执行，启用 nx affected

### Milestone 3: 包结构重组与导入结构调整

**价值**: 统一命名空间,解决 Icons/SCSS blockers

### Milestone 4: Libraries 提取与模块边界

**价值**: 依赖管理标准化,发布流程改进 (Nx 化为可选项)

### Milestone 5: 优化与增强 (可选)

**价值**: Vite/Vitest, PNPM, Nx Cloud, 性能优化

---

## 6. 已移除时间估算

根据要求，本文档不包含具体的工时和人员估算。

## 7. 成功指标 (Success Criteria)

### 7.1 技术指标

- [ ] Nx workspace 初始化完成 (`nx.json` 存在)
- [ ] 所有静态检查通过 Nx 执行 (ESLint, Stylelint, TypeScript)
- [ ] `nx affected` 能准确识别受影响的项目
- [ ] 所有组件有独立的 `project.json`
- [ ] 依赖图准确且可视化 (`nx graph`)
- [ ] 发布流程改进 (是否使用 nx release 待定)
- [ ] Conventional commits 强制执行
- [ ] 所有 public 导出有 `.d.ts` 类型定义
- [ ] SCSS 使用 `@use/@forward`，无 `@import`
- [ ] 模块边界通过 `@nx/enforce-module-boundaries` 强制执行
- [ ] CI 时间减少 (baseline: TBD)

### 7.2 业务指标

- [ ] 消费者无需代码变更 (或仅需运行 codemod)
- [ ] NPM 发布无中断
- [ ] 版本管理流程明确 (自动化程度待定)
- [ ] 文档和迁移指南完整
- [ ] 无遗留 blocker 或技术债务

### 7.3 开发体验指标

- [ ] 本地构建时间改善
- [ ] IDE 导入解析正确
- [ ] Storybook 正常工作
- [ ] 单元测试覆盖率保持或提高
- [ ] 贡献者文档更新

---

## 8. 前置准备工作 (Pre-work)

以下工作可以**在 Nx 迁移开始前独立进行**,可节省一定时间:

### 8.1 Sass 迁移 (unstable → stable mixins)
- [ ] 引入稳定入口 (`@backpack/mixins/*`, `@backpack/tokens`)
- [ ] 为历史路径提供 `@forward` shims
- [ ] 开始 `@import` → `@use` 迁移
- [ ] 添加 Stylelint/CI 规则

**负责**: Design System / Frontend Infrastructure


### 8.2 Flare TS 采用 (JS → TS with .d.ts)
- [ ] 将 Flare 转换为 TypeScript
- [ ] 或生成等效的 `.d.ts`
- [ ] 确保 `package.json#exports` + `.d.ts` 一致

**负责**: Clover Squad


### 8.3 Public Surface Manifest & 类型一致性
- [ ] 创建 public subpaths 的机器可读清单 (TS + SCSS)
- [ ] CI 检查每个入口在 exports 中存在且有 `.d.ts`
- [ ] 设置 `sideEffects: false`

**负责**: Clover Squad


### 8.4 Lint/CI Guardrails
- [ ] 阻止 `/src`, `internal/`, `unstable__*/`, 相对 SCSS
- [ ] Case/duplicate-export 检查
- [ ] 标记虚拟/聚合导入 (如 `all.tsx`)

**负责**: Clover Squad


### 8.5 Icons/SCSS 生成脚本
- [ ] 单一生成器,双输出: `src-generated/**` (dev) 和 `dist/**` (publish)
- [ ] 使本地 build/test 依赖生成
- [ ] 保持结构同构

**负责**: Clover Squad


---

## 9. 待澄清问题 (Open Questions)

### 9.1 技术问题

| 问题 | 优先级 | 决策时间点 | 决策者 |
|------|--------|-----------|--------|
| 最终导入命名空间策略? | High | Milestone 1 | PE + Clover |
| Icons 是否完全移除 `all.tsx` 聚合器? | Medium | Milestone 3 | Clover |
| Vite/Vitest 是否在 Milestone 5 包含? | Low | Milestone 4 | Clover + PE |
| Nx Cloud 是否启用? | Low | Milestone 5 | Clover + DevEx |
| PNPM 切换时机? | Medium | Milestone 5 | Clover + PE |
| RSC/SSR 边界如何处理? | Medium | Milestone 4 | Clover + PE |

### 9.2 组织问题

| 问题 | 优先级 | 决策时间点 | 决策者 |
|------|--------|-----------|--------|
| 哪些团队需要提前通知? | High | Kickoff | Clover PM |
| 消费者迁移窗口期多长? | High | Milestone 3 | PE + Product |
| 是否需要 RFC 流程? | Medium | Kickoff | PE |
| 发布策略 (major vs minor)? | High | Milestone 4 | PE + Product |

---

## 10. 依赖与协调 (Dependencies & Coordination)

### 10.1 团队依赖

- **Clover Squad**: 主要执行团队
- **Principal Engineers**: 架构指导和决策
- **Web Enablement**: Nx 最佳实践支持
- **Banana/Falcon Teams**: 消费者反馈和测试
- **Design System Users**: 迁移验证

### 10.2 技术依赖

- **Global Components Nx 迁移**: 已完成,可参考
- **Banana Nx 迁移**: 已完成,可参考
- **Falcon Nx 迁移**: 进行中,可协调
- **TypeScript Monorepo Production Standard**: 需遵循

### 10.3 沟通计划

1. **Kickoff Meeting**: 对齐目标和方案
2. **Weekly Sync**: 进度更新和阻塞解决
3. **Milestone Demo**: 每个 milestone 完成后演示
4. **RFC (如需要)**: 重大架构变更前
5. **Migration Guide**: Milestone 3 后发布
6. **Retrospective**: 整体迁移完成后

---

## 11. 风险缓解措施 (Risk Mitigation)

### 11.1 技术风险缓解

| 风险 | 缓解措施 |
|------|----------|
| 消费者破坏 | 影子发布 + Codemods + 向后兼容层 |
| CI 失败 | 双轨构建 + 金丝雀发布 |
| 类型不完整 | CI 检查 + 自动生成 .d.ts |
| 依赖冲突 | 审计 + 版本锁定 + 测试矩阵 |
| 生成时序 | Nx targets + 显式 inputs/outputs |

### 11.2 回滚计划

- **Milestone 1-2**: 可随时回滚,无外部影响
- **Milestone 3**: 提供向后兼容层,渐进式迁移
- **Milestone 4**: Feature flags + 金丝雀发布
- **Milestone 5**: 可选功能,可独立回滚

---

## 12. 参考资料 (References)

### 12.1 Confluence 文档

- [Backpack Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Backpack Import Structure Adjustment](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1434524189)
- [Banana Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1353404332)
- [Banana Design Review](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1362971958)
- [Falcon Nx Design Review](https://skyscanner.atlassian.net/wiki/spaces/WOM/pages/1418986155)
- [Hotels Website Design Review](https://skyscanner.atlassian.net/wiki/spaces/BD/pages/1199737490)
- [Web Foundations Strategy](https://skyscanner.atlassian.net/wiki/spaces/SWORG/pages/1095290743)
- [TypeScript Monorepo Production Standard](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)

### 12.2 代码示例

- [Global Components Repository](https://github.com/Skyscanner/global-components) (已完成 Nx)
- [Banana Repository](https://github.com/Skyscanner/banana) (已完成 Nx)
- [Falcon Repository](https://github.com/Skyscanner/falcon) (Nx 进行中)

### 12.3 外部文档

- [Nx Official Documentation](https://nx.dev/)
- [Nx: Adding to Existing Project](https://nx.dev/recipes/adopting-nx/adding-to-existing-project)
- [Nx: Enforce Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Nx: Project Linking with TypeScript](https://nx.dev/concepts/typescript-project-linking)

---

## 13. 附录 (Appendix)

### 13.1 术语表

| 术语 | 定义 |
|------|------|
| Nx | 适用于 monorepos 的构建系统 |
| Affected | Nx 命令,仅对受影响的项目运行任务 |
| Project Graph | 项目之间依赖关系的可视化图 |
| Executor | Nx 中执行任务的插件 |
| Target | Nx 项目中可执行的命令 (如 build, test) |
| Implicit Dependencies | 非代码导入的依赖关系 |
| Module Boundaries | 通过 ESLint 强制的导入约束 |
| Composite | TypeScript 项目引用特性 |
| Conventional Commits | 结构化提交消息规范 |

### 13.2 文件结构变更对比

**当前结构 (Before)**:
```
backpack/
├── packages/
│   ├── bpk-component-button/
│   ├── bpk-component-card/
│   └── package.json (共享)
├── examples/
└── package.json (root)
```

**目标结构 (After - 简化示意)**:
```
backpack/
├── libs/
│   ├── components/
│   │   ├── button/
│   │   └── card/
│   ├── mixins/
│   ├── icons/
│   └── tokens/
├── packages/
│   └── backpack-web/ (umbrella package)
├── nx.json
└── package.json (root, 包含所有 deps)
```

### 13.3 更新日志

| 日期 | 变更 | 作者 |
|------|------|------|
| 2026-01-26 | 初始版本 | Claude Code |

---

**下一步**: 阅读 [Milestone 1: Nx 初始化](./01-milestone-1-nx-initialization.md)

---

## 附录 A: 重要待决策事项

### 发布流程决策

**决策点**: Milestone 3 完成后

**选项**:

1. **保留现有流程** (推荐先期)
   - 继续使用 GitHub Actions + `npm publish`
   - 最小变更，风险最低
   - 适合快速完成 Core Milestones

2. **迁移到 nx release**
   - 符合 Production Standards 推荐
   - 自动版本管理和 changelog 生成
   - 需要额外工作和调研
   - 可推迟到 Milestone 5 或后续迭代

**需要考虑的因素**:
- 团队对 Conventional Commits 的采纳程度
- 当前发布流程的痛点
- 是否有自动化版本管理的需求
- 与 Global Components 的协调

**建议**: 
- Milestone 4 专注于依赖管理和模块边界
- 发布流程改进可作为独立的后续工作
- 如果现有流程工作良好，保持现状是合理选择

