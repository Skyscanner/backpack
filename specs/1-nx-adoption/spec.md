# Migration Specification: Backpack Nx Adoption

**Branch**: `WOODPECKER-4021`
**Created**: 2026-01-27
**Status**: Draft
**Input**: User description: "迁移 backpack 到 banana 仓库，第一步：让 backpack 适应 Nx"
**Reference**: [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)

## Clarifications

### Session 2026-01-27

- Q: Nx 发布流程迁移 (Milestone 7) 是否纳入本阶段范围？ → A: 纳入范围，作为本阶段最后一个 milestone
- Q: Storybook Stories 迁移 (Milestone 3) 的优先级？ → A: 提升为必做，作为独立 Phase 排在组件 Nx 项目设置之前
- Q: 组件 Nx 项目的设置方式？ → A: 使用 Nx 插件项目推断功能，仅在需要时覆盖配置
- Q: Nx 发布流程的版本管理策略？ → A: 保持单一包 `@skyscanner/backpack-web` 发布，版本统一管理
- Q: 迁移过程中的兼容性验证策略？ → A: 在每个 milestone 完成后，在 banana 仓库验证 backpack 集成

## Background & Context

Backpack-web 是 Skyscanner 的设计系统组件库，目前作为独立仓库使用 npm 包管理。最终目标是将其迁移到 banana (Nx monorepo) 中。本规格说明描述第一阶段：在 backpack 仓库内部完成 Nx 适配工作。

### 当前状态

- **仓库结构**：约 90 个组件包在 `packages/` 目录下，使用共享的 `packages/package.json`
- **构建工具**：Gulp + Babel，部分组件 (icon, flare, spinner) 使用 Gulp 任务生成代码
- **测试**：Jest，Storybook 单独存放在 `examples/` 目录
- **发布**：通过 GitHub Actions 将 `dist/` 发布到 npm

### 目标状态

- Backpack 仓库内部完成 Nx 初始化和基本配置
- 所有静态检查和脚本可通过 Nx targets 运行
- 保持现有消费者的导入路径不变
- 为后续迁移到 banana monorepo 做好准备

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Nx 初始化与基础设施 (Priority: P1)

作为 Backpack 维护者，我希望仓库能够被 Nx 识别和管理，以便利用 Nx 的依赖图分析和缓存功能。

**Why this priority**: 这是所有后续工作的基础，没有 Nx 初始化，其他功能都无法实现。

**Independent Test**: 可以通过运行 `nx graph` 命令验证 Nx 是否正确识别项目结构。

**Acceptance Scenarios**:

1. **Given** 仓库已初始化 Nx，**When** 运行 `nx graph`，**Then** 能够显示项目依赖关系图
2. **Given** Nx 配置完成，**When** 查看 `nx.json`，**Then** 包含基本的 Nx 配置（缓存、targets 定义等）
3. **Given** TypeScript 项目引用已配置，**When** 运行类型检查，**Then** 能正确识别跨项目类型依赖

---

### User Story 2 - 静态检查迁移到 Nx (Priority: P2)

作为 Backpack 开发者，我希望所有静态检查（lint、typecheck、test）能够通过 Nx 运行，以便利用增量执行和缓存加速 CI。

**Why this priority**: 静态检查迁移是验证 Nx 工作正常的关键步骤，也是 CI 优化的基础。

**Independent Test**: 可以通过运行 `nx affected:lint` 和 `nx affected:test` 验证增量执行功能。

**Acceptance Scenarios**:

1. **Given** ESLint 已配置为 Nx target，**When** 运行 `nx lint`，**Then** 执行 lint 检查并输出结果
2. **Given** Jest 已配置为 Nx target，**When** 运行 `nx test`，**Then** 执行测试并输出结果
3. **Given** TypeCheck 已配置为 Nx target，**When** 运行 `nx typecheck`，**Then** 执行类型检查并输出结果
4. **Given** 只修改了部分文件，**When** 运行 `nx affected:test`，**Then** 只测试受影响的项目

---

### User Story 3 - 保持消费者兼容性 (Priority: P1)

作为 Backpack 消费者，我希望在 Nx 适配后，现有的导入路径和使用方式保持不变，无需修改任何代码。

**Why this priority**: 兼容性是迁移的硬性要求，任何破坏性变更都会影响大量下游项目。

**Independent Test**: 可以在测试项目中验证所有现有导入路径是否正常工作。

**Acceptance Scenarios**:

1. **Given** Nx 适配完成，**When** 使用 `@skyscanner/backpack-web/bpk-component-button` 导入，**Then** 正常工作
2. **Given** Nx 适配完成，**When** 使用 SCSS mixin 导入路径，**Then** 正常工作
3. **Given** 发布新版本，**When** 消费者升级，**Then** 无需修改任何代码

---

### User Story 4 - Storybook Stories 与组件同位置 (Priority: P1)

作为 Backpack 开发者，我希望 Storybook stories 与组件代码放在同一目录下，以便提高代码可发现性和维护效率。

**Why this priority**: 这是 Milestone 3 的核心目标，且是 M4（组件作为 Nx 项目）的前置条件。

**Independent Test**: 可以通过检查每个组件目录下是否包含对应的 `.stories.tsx` 文件验证。

**Acceptance Scenarios**:

1. **Given** 组件 `bpk-component-button`，**When** 查看其目录，**Then** 包含 `BpkButton.stories.tsx`
2. **Given** Storybook 配置已更新，**When** 运行 `nx storybook`，**Then** 能正确加载所有组件目录下的 stories
3. **Given** Stories 已迁移，**When** 查看 `examples/` 目录，**Then** 不再包含组件 stories（仅保留示例应用）

---

### Edge Cases

- 代码生成任务 (icon/flare/spinner) 与 Nx 缓存的协调：需要确保 SVG 变更能触发重新生成
- 外部依赖版本冲突：某些长期未维护的依赖可能与 Nx 插件产生冲突
- TypeScript `composite: true` 配置可能导致 `.d.ts` 文件生成问题
- 循环依赖可能导致 Nx 依赖图分析失败

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 仓库 MUST 包含有效的 `nx.json` 配置文件
- **FR-002**: 所有组件 MUST 被 Nx 识别为独立项目（通过项目推断功能，仅在需要时使用 `project.json` 覆盖）
- **FR-003**: `nx lint` 命令 MUST 执行 ESLint 检查
- **FR-004**: `nx test` 命令 MUST 执行 Jest 测试
- **FR-005**: `nx typecheck` 命令 MUST 执行 TypeScript 类型检查
- **FR-006**: `nx affected` 命令 MUST 只处理受变更影响的项目
- **FR-007**: Nx 缓存 MUST 对重复执行的任务生效
- **FR-008**: Nx 发布流程 MUST 替代现有的 npm publish 流程（Milestone 7）
- **FR-009**: 所有现有的消费者导入路径 MUST 保持兼容
- **FR-010**: 代码生成任务 (gulp) MUST 能与 Nx 构建流程协调
- **FR-011**: 发布 MUST 保持单一包 `@skyscanner/backpack-web`，版本统一管理
- **FR-012**: 发布 MUST 使用 Conventional Commits 并自动生成 changelog
- **FR-013**: 每个 milestone 完成后 MUST 在 banana 仓库验证 backpack 集成兼容性

### Non-Functional Requirements

- **NFR-001**: Nx 初始化 MUST 不增加超过 5% 的 CI 运行时间（缓存预热后）
- **NFR-002**: 本地开发体验 MUST 与迁移前保持一致
- **NFR-003**: 错误信息 MUST 清晰指示问题来源
- **NFR-004**: 配置 MUST 有文档说明，便于团队理解

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `nx graph` 能够显示所有 ~90 个组件的依赖关系图
- **SC-002**: `nx affected:lint --base=main` 在只修改一个组件时，只 lint 受影响的项目
- **SC-003**: `nx affected:test --base=main` 在只修改一个组件时，只测试受影响的项目
- **SC-004**: 相同输入的任务第二次执行时，Nx 缓存命中率达到 100%
- **SC-005**: 现有的 `@skyscanner/backpack-web/*` 导入路径在消费项目中正常工作
- **SC-006**: CI 流水线使用 `nx affected` 后，平均构建时间减少（需要基准数据）
- **SC-007**: 所有现有测试在 Nx 环境下通过
- **SC-008**: Storybook 在 Nx 环境下正常启动和构建
- **SC-009**: 每个 milestone 完成后，banana 仓库能正常构建和运行测试
- **SC-010**: `nx release` 产生的发布产物与现有 npm publish 格式兼容

## Known Risks & Blockers

### Blockers (需要调研解决)

| 风险项 | 描述 | 影响 | 缓解措施 |
|--------|------|------|----------|
| 外部依赖冲突 | 长期未维护的第三方库可能与 Nx 插件冲突 | 阻塞安装和构建 | 提前审计依赖，必要时更新或替换 |
| Icon/Flare/Spinner 代码生成 | Gulp 任务生成的代码需要与 Nx 缓存协调 | 缓存失效导致错误 | 将 SVG 文件作为缓存输入 |
| 导入路径兼容性 | TS/SCSS/icon mixin 的导入路径可能需要调整 | 破坏消费者代码 | 使用 path mapping 或别名保持兼容 |

### Non-Blockers (可后续解决)

| 风险项 | 描述 | 影响 | 处理方式 |
|--------|------|------|----------|
| TypeScript composite 配置 | 可能影响 `.d.ts` 生成 | 类型声明缺失 | 调研解决方案，必要时禁用 composite |
| Vite/Vitest 迁移 | 现代构建工具迁移 | 不影响本阶段 | 作为可选的后续阶段 |
| 依赖管理标准化 | Production Standard 要求调整依赖声明位置 | 不影响本阶段 | 作为可选的后续阶段 |

## Implementation Milestones

基于 Confluence 文档，建议分阶段实施：

### Phase 1: Nx 初始化 (预估 < 1 周)

- 创建 `nx.json` 配置
- 设置 TypeScript 项目引用
- 验证基本的 `nx graph` 功能

### Phase 2: 项目结构确认与调整 (预估 2 周)

- 确定目标项目结构（与 PE 和 web-enablement 团队对齐）
- 调整必要的配置文件

### Phase 3: Storybook Stories 同位置迁移 (预估 1 周)

- 将所有 `.stories.tsx` 从 `examples/` 迁移到对应组件目录
- 更新 Storybook 配置从组件目录加载 stories
- 验证所有 stories 正确编译和渲染

### Phase 4: 组件作为 Nx 项目 (预估 2 周)

**目标**: 让每个组件都成为一个独立的 Nx project，便于精细化依赖与增量构建。

- 配置 Nx 插件启用项目推断功能
- 定义项目推断规则（基于 `packages/` 目录结构）
- 仅为需要特殊配置的组件创建 `project.json`
- 配置 `tsconfig.json`、`tsconfig.lib.json`、`tsconfig.spec.json`
- 同步所有项目引用
- 验证 `nx show projects` 显示所有 ~90 个组件
- 验证 `nx graph` 正确显示组件间依赖关系

### Phase 5: 静态检查迁移 (预估 3 周)

- 配置 ESLint 作为 Nx target
- 配置 Jest 作为 Nx target
- 配置 TypeCheck 作为 Nx target
- 配置 Storybook 作为 Nx target
- 更新 CI 使用 `nx affected`

### Phase 6: 模块边界配置 (预估 1 周)

- 为项目分配 tags
- 配置 `@nx/enforce-module-boundaries` ESLint 规则

### Phase 7: Nx 发布流程迁移 (预估 4 周)

- 配置 `nx release` 替代现有 npm publish
- 保持单一包 `@skyscanner/backpack-web` 发布策略
- 设置 Conventional Commits 和 changelog 自动生成
- 更新 GitHub Actions 发布工作流
- 验证发布产物与现有格式兼容

### 可选阶段（本次不包含）

- Dependency management 标准化
- Vite/Vitest 迁移

## Assumptions

1. **迁移发布流程**：本阶段将使用 `nx release` 替代现有的 npm publish 流程
2. **不改变导入路径**：所有现有的消费者导入路径必须保持兼容
3. **不包含 Vite/Vitest**：构建工具迁移作为可选的后续阶段
4. **在当前仓库完成**：所有工作在 backpack 仓库进行，不涉及 banana 仓库
5. **保持 Gulp 任务**：代码生成任务保持 Gulp 实现，与 Nx 协调
6. **banana 仓库验证**：每个 milestone 完成后在 banana 仓库验证兼容性

## Dependencies

- **Nx** (v21+): Monorepo 管理工具
- **@nx/js**: JavaScript/TypeScript 项目支持
- **@nx/eslint**: ESLint 集成
- **@nx/jest**: Jest 测试集成
- **@nx/storybook**: Storybook 集成

## References

- [Backpack Web: Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Nx: Adding to Existing Project](https://nx.dev/recipes/adopting-nx/adding-to-existing-project)
- [Nx: Enforce Module Boundaries](https://nx.dev/features/enforce-module-boundaries)
- [Production Standard: TypeScript Monorepos](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
- [Production Standard: npm library releases](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1391953611)
