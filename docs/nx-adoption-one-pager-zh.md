# Backpack Web: Nx 采用方案

JPD 链接: https://skyscanner.atlassian.net/browse/UP-341

## 摘要

- Backpack Nx 采用
  - 在 Backpack-web 中采用 Nx，解锁依赖感知的增量构建和远程缓存；简化版本管理/构建/发布流程，以符合生产标准
  - 强制执行清晰的模块边界；减少生产环境中常见的多版本膨胀问题
  - 为后续 Vite/Vitest 采用奠定干净的基础，同时不影响当前消费者

- 在进一步调查中需要降低风险的阻塞项：
  - TS/SCSS/icon mixins 的导入路径兼容性
  - Icon/Flare/Spinner 代码生成和动态导入
  - 外部依赖冲突（过时/废弃的库；peer-dep 不匹配）

- 26 工程周，1 名工程师（如果不做依赖管理、Vite 和 Vitest 采用，则为 14 工程周，1 名工程师）
  - 在没有更多调查的情况下，估算置信度仅为 60%。计划中的发现工作将使估算更加准确

- 价值里程碑
  - Nx 初始化
  - 项目结构确认和变更
  - 通过 Nx 运行静态检查和脚本
  - 使用 Nx 发布
  - 依赖管理合规
  - Vite 和 Vitest 采用（可选，可在下一阶段完成）

## 资源

- Web Foundations Stages 1 and 2 – Migration Guide: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1364203601
- Production Standard: TypeScript Monorepos: https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149
- Nx: Adding to Existing Project: https://nx.dev/recipes/adopting-nx/adding-to-existing-project
- Nx: Enforce Module Boundaries: https://nx.dev/features/enforce-module-boundaries#enforce-module-boundaries

## 背景

Backpack 和 Global Components 位于不同的代码库中，**Global Components 直接依赖于 Backpack**。当我们发布**主要版本**时，必须先发布 Backpack，_然后_发布 Global Components。作为两个库的所有者，这种顺序是强制性的——但对于同时依赖 Backpack 和 Global Components 的消费者来说，只有在 GC 的匹配主要版本发布后才能进行主要升级——这延长了升级窗口并加剧了对破坏性变更的担忧。

Nx 已被选为 Skyscanner Web 的战略性 monorepo 工具，提供迭代式、可扩展的工具链，以显著加速所有 Web 项目的开发速度。

该工具直接解决了我们当前工作流程中的关键痛点：当与当前的可选手动升级流程配合使用时，多个版本的 Backpack 经常在生产环境中共存——导致 JS 包膨胀和 CSS 重复。通过将 Backpack 和相关项目统一到单个 Nx 工作区中，我们可以简化版本管理、构建和发布，同时启用跨项目依赖跟踪、增量构建和自动化发布流程来消除这些问题。

## 当前状态/设置

Backpack-web 是一个以组件为中心的代码库——所有 Web 组件、SCSS 样式和图标源文件都位于这一个 Git 仓库中。但是，它仍然按 NPM 包组织，而不是 Nx 工作区。

### 仓库布局

- **仅有两个 package.json 清单** — 根级 `package.json` 和次级 `packages/package.json`。`packages/package.json` 作为约 130 个组件文件夹的**共享清单**，在构建期间被复制到 `dist/`，以便编译产物具有正确的元数据。**单个组件没有自己的 `package.json`。**
- `packages/` — 组件文件夹（如 `bpk-component-button`）包含源代码、SCSS、测试。
- `examples/` — 托管**所有 Storybook stories**；stories 不与组件放在一起。
- `.storybook/`、`scripts/` 和 `examples/` 提供本地文档、自动化助手（包大小守护、变更日志、翻译）和演示应用。

### 工具和构建流程

- `gulpfile.js` 协调一小组**代码生成任务**，用于 `bpk-component-flare`、`bpk-component-icon` 和 `bpk-component-spinner`。这些任务扫描每个组件（或外部 `bpk-svgs` 包）中的原始 SVG 资源——确保设计师可以添加新图标/加载器而无需手写代码。
- 构建脚本依赖 **Gulp**、**Babel** 和自定义 Node 工具
- 测试通过 **Jest** 运行；代码检查通过 ESLint、Stylelint 和 Prettier，都在仓库根目录配置。

### CI 和发布

- **版本管理和发布**通过 **GitHub Actions** 完全自动化：在每次发布触发时，CI 工作流对 `dist/` 输出运行 `npm publish`，将单一伞包 `@skyscanner/backpack-web` 推送到 npm 注册表。单个组件**不会**单独发布。

### 消费模式

- 产品团队通过编译路径导入组件，如 `@skyscanner/backpack-web/bpk-component-button`。
- SCSS mixins 和图标导入是路径敏感的，在发布时生成，因此任何导入路径重构都需要代码迁移工具或别名。

当前 Backpack Web 文件夹结构（参见原文档图片）

## 考虑因素/风险

### 采用方法和范围

`无阻塞项`

Nx 的模块化设计让我们可以一次启用一个功能——因此我们可以先从项目配置（ESLint、TS 路径）开始，然后再触及任何组件。但是，对于约 90 个 Backpack 包，"大爆炸"式切换风险较高，而过于缓慢的逐组件推出可能会拖延数月。我们需要在速度和稳定性之间找到适当的平衡。

### 项目结构和模块边界

`无阻塞项`

我们必须定义目标项目层次结构。在任何代码移动之前，我们需要与 PE 和其他推动 monorepo 工作的团队密切合作，迭代并对齐结构。与结构对齐可以帮助我们强制执行清晰的模块边界，为增量构建和缓存启用精确的依赖图分析，并通过将相关功能（如 UI、共享工具）分组到范围明确的库中来提高代码可发现性和复用性。

### 通过 Nx Targets 重建基本 CLI

`无阻塞项`

目前，我们的 GitHub Actions 工作流通过 `npm run ...` 调用大多数任务，在 Nx 初始化后，我们可以将 CI 配置更新为 `nx run-many` / `nx affected` 以利用 Nx 增量构建和缓存。

我们必须确保工作流产生相同的产物和日志，以便：
- 消费者看不到发布包或导入路径的任何差异
- 贡献者的本地和 CI 开发工作流保持无缝

### 使用 Nx 推荐的 TypeScript 配置后构建失败

`无阻塞项` `需要更多调查`

当我们在 global-components 中启用 `composite: true`（根据 Nx 建议的 TS 项目引用所需）时，所有 `.d.ts` 和 `.d.ts.map` 输出——类型声明消失了。如果我们禁用 `composite`，下游项目会报错 `referenced project xxx must have setting composite: true`。我们怀疑是 Babel 转译和构建期间 TypeScript 发射过程之间的冲突。需要检查 Backpack Web 采用中是否有类似问题。

### 外部依赖导致构建错误

`阻塞项` `需要更多调查`

Backpack 依赖几个长期存在的第三方库——其中一些已不再积极维护。引入 Nx 及其插件（每个都有自己的 peer dependencies）可能会暴露版本不匹配或安装错误，阻塞 CI 和本地设置。

### 使用 Nx 发布和构建目标文件夹变更

`无阻塞项`

我们当前的发布流水线直接从 `dist/` 文件夹使用 `npm publish`。新的[生产标准](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1391953611/Production+Standard+npm+library+releases#Guidance)要求**所有 Web 库使用 Nx 管理发布**（不能直接使用包管理器发布），并依赖**约定式提交**，版本存储在 git 标签中，变更日志在 GitHub Releases 中。切换到 `nx release` 带来配置错误的风险——缺失标签、损坏的变更日志生成或未发布的产物——可能延迟消费者升级或导致版本漂移。

目前，构建产物平铺输出到 `dist/` 根目录。[TypeScript monorepos 的生产标准](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149/Production+Standard+TypeScript+Monorepos#:~:text=Public%20libraries%20must%20be%20put%20inside%20packages%20folder)要求每个公共库位于其自己的文件夹下（如 `packages/@skyscanner/backpack-web/...`）以支持清晰的包边界。未能重组输出**将破坏消费者安装和导入** Backpack 组件的能力，也可能与未来 Nx 工具的期望冲突。

### Icon/Flare/Spinners 动态导入

`阻塞项` `需要更多调查`

Icon/Flare/Spinners 组件使用 Gulp 任务在构建时从原始 SVG 生成 React 包装器（和 SCSS 助手）到相应的组件文件夹（如 `packages/<component>/src/generated/js/`）。

如果 Nx 的缓存不知道代码生成必须在编译之前运行，它可能返回比当前源或 SVG 资源更旧的缓存构建输出。这可能导致生成文件和源代码之间的不匹配，造成意外的构建或运行时错误。

### 调整 Backpack 导入结构以支持 Mono Repo 迁移

`阻塞项` `需要更多调查`

消费者目前依赖统一的导入路径（`@skyscanner/backpack-web/...`）和生成的 SCSS mixin 导入（`@use '../../unstable__bpk-mixins/tokens'`）。将每个组件拆分为其自己的 Nx 库命名空间（如 `@bpk/button`）可能不可避免地破坏这些模式，除非我们提供清晰的路径映射或重构策略。

### 依赖管理

`无阻塞项` `需要更多调查`

所有生产依赖仅在 `packages/package.json` 中声明，由所有 Backpack 组件共享，根 `package.json` 中没有依赖。这与 TypeScript Monorepo 生产标准相矛盾，该标准要求：

> - 所有生产依赖**必须**列在根 `package.json` 的 `dependencies` 字段中
> - 所有项目的生产依赖**必须**列在其自己的 `package.json` 文件的 `dependencies` 字段中

### Vite 和 Vitest 采用（可选，可在下一阶段完成）

`无阻塞项` `需要更多调查`

从 Webpack → Vite 和 Jest → Vitest 的迁移可以解锁更快的冷构建、热重载和测试反馈，这可以帮助我们实现 [Web Foundation 第 2 阶段](https://skyscanner.atlassian.net/wiki/spaces/SWORG/pages/1095290743/Frontend+Strategy+Phase+1+-+Web+Foundations#Stage-2.-Lean-App)——但需要对齐我们的构建/测试配置并验证一致性。

目前，我们的构建依赖 `gulpfile.js` 进行代码生成（SVG → React 包装器）和资源编排，然后 Babel 进行转译。换用 Vite 意味着：
- 将那些 Gulp 任务重新实现为 Vite 插件、预构建钩子或 Nx 执行器。
- 潜在的功能差距（如没有直接的 SVG-to-JS 加载器）需要自定义插件工作。
- 输出差异（缺失文件）可能破坏消费者或 CI 的风险。
- 重写脚本、更新配置和重新培训贡献者的工作量。

## 价值里程碑

### Nx 初始化

`工作量: 很小` `复杂度: 小` `估算: < 1 周`

**为什么**：
- 通过创建 Nx 工作区来启动迁移，解锁 affected 命令、依赖图和缓存。
- 使仓库与 Nx 最佳实践对齐，以便团队可以在不移动代码的情况下开始验证。

**如何做**：参见 Migration Guide Phase 1
- 搭建一个空的 Nx 工作区，这将引入 `nx.json` 文件
- 设置 TypeScript 项目引用
- 从 CI 工作流中移除任何 `node_modules` 的自定义缓存

### 项目结构确认和变更

`工作量: 大` `复杂度: 小` `估算: 2 周`

**为什么**：
- 预先建立明确的层次结构是整个迁移的关键。它解锁 Nx 的依赖图、增量构建和缓存优势，防止后续临时的文件夹移动，并通过为每个团队提供代码应该存放位置的单一事实来源来减少合并冲突压力。

**如何做**：
- 生成一份**项目结构草案文档**，将当前组件文件夹映射到新的项目结构布局（可以考虑是否应该重组单个组件内部的文件夹结构）
- 新的**项目结构**应与 PE 和 Web Enablement 对齐
- 根据最终方案，通过 `nx workspace:move` 或 `git mv` 执行文件夹重组，然后更新包括但不限于 CI、Jest 和 Storybook 配置以指向新位置。
- **更新配置**：调整 GitHub Actions、Jest 配置、Storybook 入口和任何相对导入以指向新位置。

### 所有 Storybook stories 与组件放在一起

`工作量: 很小` `复杂度: 小` `估算: 1 周`

**为什么**：
- 将 stories 与其组件放在一起确保文档和示例与源代码并排，提高开发者的可发现性并减少上下文切换。
- 通过消除单独的 `examples/` 文件夹并利用 Nx 的隐式项目根来简化迁移。

**如何做**：
- 对于每个组件，将其对应的 `.stories.tsx` 移到 `libs/<component>/src/` 中，与实现放在一起。
- 调整 `main.js` 中的 Storybook 配置，从每个组件的目录加载 stories。
- 验证 Storybook 构建，确保每个组件 story 在新项目布局下正确编译和渲染。

### 将组件设置为 Nx 项目

`工作量: 很小` `复杂度: 小` `估算: 2 周`

**为什么**：
- Nx 分析文件系统以检测项目。一旦我们将组件设置为 Nx 项目，我们可以使用 `nx affected` 只关注变更的项目而不是整个仓库
- 更细粒度的项目改善**计算缓存**，产生精确的**依赖图**和更清晰的所有权。

**如何做**：
- 每个组件都有其 `project.json`。
- 对于仓库中的每个项目，存在 `tsconfig.json`、`tsconfig.(app|lib).json` 和 `tsconfig.spec.json`。
- 所有项目引用保持同步。

### 将静态检查和脚本转换为 Nx

`工作量: 大` `复杂度: 小` `估算: 3 周`

**为什么**：
- 保证所有验证和自动化任务——**类型检查、单元测试、ESLint、Stylelint 验证、Storybook** 和任何自定义脚本等——通过 Nx 的任务编排器运行。
- 解锁这些步骤的增量执行，减少 CI 时间并为开发者提供更快的本地反馈。

**如何做**：
- 利用适当的 Nx 插件和执行器来运行和声明 Linting、Testing、TypeCheck、Storybook 等目标。
- 更新 GHA 任务以调用 `nx affected` 或 `nx run-many`，并弃用遗留的 `npm` 命令
- 如需要则更新 README/文档

### 配置模块边界

`工作量: 大` `复杂度: 小` `估算: 1 周`

**为什么**：
- 按域或业务上下文强制执行清晰的分离，应该为我们提供更好的隔离和可维护性
- 定义哪些模块可以依赖哪些模块，可以帮助 Nx 产生准确的依赖图，实现更快的增量构建和更可靠的缓存。

**如何做**：
- 在每个项目中分配标签
- 修改根 lint 配置 `.eslintrc`，将依赖规则添加到 `@nx/enforce-module-boundaries` ESLint 规则 https://nx.dev/features/enforce-module-boundaries#enforce-module-boundaries

### 使用 Nx 发布

`工作量: 中` `复杂度: 中` `估算: 4 周`

**为什么**：
- 与要求 Nx 管理发布、约定式提交版本管理和 GitHub 托管变更日志的生产标准对齐，确保所有 Web 库的一致性和透明度
- 利用 Nx 内置的发布执行器在单个可审计的命令中自动化标签创建、版本管理和包发布。

**如何做**：
- 扩展 `nx.json` 并使用 Nx release 执行器添加 `release` 目标。
- 安装并设置 commitizen 和 husky（或 CI PR 检查）以强制执行约定式提交。
- 创建一个 GitHub Actions 工作流，在非关键分支上触发 `nx release`，为影子发布运行验证标签创建和变更日志生成。
- 验证通过后，更新生产发布工作流以调用 `nx release` 而不是 `npm publish`。

### 依赖管理（可选，可在下一阶段完成）

`工作量: 中` `复杂度: 中` `估算: 4 周`

**为什么**：
- 通过仅声明实际使用的依赖，为每个 Nx 库准备独立版本和发布。
- 符合生产标准的要求，避免在激活 `@nx/dependency-checks` 时 CI 失败。

**如何做**：
- 审计导入：脚本提取每个组件的运行时导入以导出其真实的依赖列表。
- 移至根目录：将所有共享依赖合并到根 `package.json` 的 `dependencies`（和 `devDependencies`）下，从 `packages/package.json` 中移除它们。
- 仅为根目录配置 Dependabot，并将 `@nx/dependency-checks` 添加到每个库的 ESLint 规则。
- 在影子流水线中运行 npm ci、`nx dep-graph` 和 `nx affected:lint` 以确保没有缺失或冲突的版本。

### Vite 采用（可选，可在下一阶段完成）

`工作量: 中` `复杂度: 中` `估算: 6 周`

**为什么**：
- 现代化我们的构建工具链以获得更快的冷构建，改善开发体验并减少 CI 时间。
- 在单一 ESM 原生配置下整合脚本，消除 Gulp + 多个自定义脚本的维护负担。

**如何做**：
- Vitest 设置，添加带有必要插件的 `vite.config.ts`（`@vitejs/plugin-react`、SCSS 支持、SVG 加载器）。
- 将 CJS 转换为 ESM
- 添加一个 GitHub Actions 任务，为试点项目同时运行 `gulp build` 和 `vite build`；比较产物和日志。
- 一致性验证通过后，将所有其他库的构建目标迁移到 Vite，移除 Gulp 任务，并更新文档。

### Vitest 采用（可选，可在下一阶段完成）

`工作量: 大` `复杂度: 小` `估算: 2 周`

**为什么**：
- Vite 自带其测试框架 Vitest，它快速、零配置且与 Jest 完全兼容。

**如何做**：
- Vitest 设置，添加 `vitest.config.ts` 和依赖（如 `vitest`）。
- 通过 `vitest run` 而不是 `jest` 运行测试，确保覆盖率计算正确

---

*原文档来源: Confluence - Backpack Web: Nx Adoption One Pager*
*页面 ID: 1430062432*
*创建日期: 2025-08-12*
