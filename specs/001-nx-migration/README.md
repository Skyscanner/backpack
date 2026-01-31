# Backpack Nx Migration Documentation

**Status**: Ready for Implementation  
**Branch**: `001-nx-migration`  
**Last Updated**: 2026-01-26

## 📋 文档概览

本目录包含Backpack迁移到Nx的完整规划文档，包括需求规范、实施计划和5个详细的milestone计划。

## 🎯 迁移背景

Backpack设计系统目前是一个包含96个package的大型monorepo，使用自定义npm scripts管理构建、测试和开发流程。随着项目规模增长和团队扩大，当前方案面临以下挑战：

- **构建效率低下**: 无增量构建，每次都需要全量构建所有96个packages
- **CI时间过长**: 每次PR都运行全量测试和构建，浪费大量CI资源
- **缺乏缓存机制**: 重复构建相同代码无法利用缓存，开发体验欠佳
- **依赖关系不清晰**: 缺乏明确的package依赖图，影响变更分析
- **难以集成其他monorepo**: 需要与banana等Skyscanner内部monorepo集成，当前架构不支持

Skyscanner内部已有多个成功的Nx迁移案例（banana、falcon），证明Nx能够有效解决这些问题。

## 🎯 迁移目标和需求

### 核心目标
1. **零破坏性变更**: 所有现有功能保持不变，import路径不变，API不变
2. **构建性能提升**: 实现增量构建和智能缓存，显著提升构建速度
3. **CI效率优化**: 利用affected commands只测试变更相关的packages，减少CI时间>20%
4. **改善开发体验**: 保持HMR（热模块替换）、Storybook等开发工具的良好体验
5. **为集成做准备**: 为未来与banana monorepo集成打下基础

### 关键需求
- **构建系统**: 保持Webpack 5 + Babel 7 + Gulp 5编译流程
- **测试框架**: 保持Jest 30 + Testing Library + jest-axe
- **开发工具**: 保持Storybook 10 + HMR
- **代码质量**: 保持ESLint + Stylelint + Percy配置
- **包结构**: 保持packages/目录结构和包命名
- **性能基准**: 构建时间<110% baseline，缓存命中率>80%

详见 [spec.md](./spec.md) 获取完整的36个功能需求和19个非功能需求。

## 🏗️ 技术方案

### 核心架构决策

我们采用**增量迁移**策略，分5个milestone渐进式完成迁移：

**AD-001: 缓存策略** - 混合方式
- 先实现本地文件系统缓存（零成本、低风险）
- 迁移稳定后可选启用Nx Cloud分布式缓存

**AD-002: 包结构** - 保持现状
- 保留packages/目录和现有命名
- 不重组为libs/、apps/等Nx标准结构
- 最小化迁移复杂度和风险

**AD-003: Storybook集成** - 自定义集成
- 封装现有Storybook 10配置为Nx targets
- 不使用@nx/storybook plugin（避免配置冲突）
- 保持HMR和所有现有功能

### 技术栈

**Nx核心工具**:
- `nx` - 任务编排和缓存引擎
- `@nx/workspace` - 工作空间管理
- `@nx/js` - JavaScript/TypeScript构建支持
- `@nx/jest` - Jest集成和缓存
- `@nx/webpack` - Webpack构建集成

**保持不变的技术栈**:
- Webpack 5 (bundling)
- Babel 7 (transpilation)
- Gulp 5 (asset processing)
- Jest 30 (testing)
- Storybook 10 (component dev)
- ESLint + Stylelint (code quality)

### 关键实现机制

1. **项目配置**: 为每个package生成project.json，定义build/test/lint targets
2. **依赖图**: 自动从package.json分析依赖关系，构建dependency graph
3. **增量构建**: 只构建变更的packages及其dependents
4. **智能缓存**: 基于文件内容和配置的哈希值缓存构建结果
5. **Affected检测**: 基于git diff识别受影响的packages

详见 [plan.md](./plan.md) 获取完整的技术方案和架构决策。

## 🚧 主要Blockers和风险

### 已知技术挑战

1. **Webpack配置复杂性** (高风险)
   - Backpack使用深度定制的Webpack配置
   - 需要确保Nx能正确封装和执行现有配置
   - **缓解**: Milestone 1先用run-commands executor验证，不修改Webpack配置

2. **Jest配置迁移** (中风险)
   - 96个packages有独立jest配置
   - 需要与Nx的@nx/jest executor兼容
   - **缓解**: 保留per-package jest.config.js，使用@nx/jest包装

3. **Storybook HMR保留** (中风险)
   - Storybook 10的HMR必须继续工作
   - Nx封装不能破坏热更新体验
   - **缓解**: AD-003决定使用自定义集成而非@nx/storybook plugin

4. **缓存正确性** (高风险)
   - 缓存键值计算不当可能导致错误的缓存复用
   - 影响构建正确性和开发体验
   - **缓解**: 严格定义inputs/outputs，充分测试各种场景

5. **性能回退风险** (中风险)
   - Nx引入额外开销可能导致性能下降
   - 尤其是首次构建（无缓存时）
   - **缓解**: 设置性能基准<110% baseline，持续监控

### 组织和流程挑战

6. **团队学习曲线** (低-中风险)
   - 开发者需要学习Nx命令和概念
   - **缓解**: Milestone 5提供完整文档和培训

7. **CI/CD迁移协调** (中风险)
   - GitHub Actions需要更新
   - 可能影响release流程
   - **缓解**: Milestone 4保留回滚方案，渐进式启用

8. **与其他团队协调** (低风险)
   - 需要与banana团队对齐集成方案
   - **缓解**: 当前迁移独立进行，集成作为后续项目

详见各milestone文档的"Rollback Plan"部分了解每个阶段的风险缓解策略。

## 🗂️ 文档结构

```
specs/001-nx-migration/
├── README.md                    # 本文件 - 导航指南
├── spec.md                      # 需求规范（中英文）
├── plan.md                      # 总体实施计划
├── checklists/
│   └── requirements.md          # 需求质量检查清单
└── milestones/
    ├── milestone-1-nx-foundation.md        # M1: Nx基础搭建（2-3周）
    ├── milestone-2-testing-linting.md      # M2: 测试和Lint集成（2周）
    ├── milestone-3-dev-workflow.md         # M3: 开发流程和Storybook（1-2周）
    ├── milestone-4-cicd-caching.md         # M4: CI/CD和缓存（2周）
    └── milestone-5-optimization.md         # M5: 优化和文档（1周）
```

## 📖 快速开始

### 1. 阅读顺序

如果你是第一次了解这个迁移项目，建议按以下顺序阅读：

1. **[spec.md](./spec.md)** - 了解迁移背景、目标和需求
2. **[plan.md](./plan.md)** - 了解技术方案和总体milestone划分
3. **[milestone-1-nx-foundation.md](./milestones/milestone-1-nx-foundation.md)** - 详细的第一阶段实施计划
4. 后续milestone文档（按顺序）

### 2. 关键信息速查

**迁移目标**:
- 将Backpack的96个package从custom npm scripts迁移到Nx
- 保持所有现有功能，零breaking changes
- 实现构建缓存，提升开发和CI效率
- 为banana monorepo集成做准备

**时间估计**: 8-10周总计
- Milestone 1: 2-3周 （PoC/MVP）
- Milestone 2: 2周
- Milestone 3: 1-2周
- Milestone 4: 2周
- Milestone 5: 1周

**成功标准**:
- ✅ 所有96个packages成功构建
- ✅ 所有测试通过，覆盖率保持
- ✅ 构建时间不超过baseline的110%
- ✅ 缓存命中率>80%
- ✅ CI执行时间减少>20%

## 🎯 Milestone概览

### Milestone 1: Nx Foundation (PoC/MVP)
**目标**: 初始化Nx并建立基本构建编排  
**时长**: 2-3周  
**交付物**: Nx配置、所有package的project.json、基本缓存  
**详情**: [milestone-1-nx-foundation.md](./milestones/milestone-1-nx-foundation.md)

### Milestone 2: Testing & Linting Integration
**目标**: 集成Jest、ESLint、Stylelint和Percy  
**时长**: 2周  
**交付物**: 测试/lint缓存、affected commands  
**详情**: [milestone-2-testing-linting.md](./milestones/milestone-2-testing-linting.md)

### Milestone 3: Development Workflow & Storybook
**目标**: 集成Storybook并优化开发体验  
**时长**: 1-2周  
**交付物**: Storybook via Nx、HMR保留、开发者文档  
**详情**: [milestone-3-dev-workflow.md](./milestones/milestone-3-dev-workflow.md)

### Milestone 4: CI/CD & Distributed Caching
**目标**: 更新CI/CD pipeline，可选启用Nx Cloud  
**时长**: 2周  
**交付物**: GitHub Actions更新、分布式缓存、CI优化  
**详情**: [milestone-4-cicd-caching.md](./milestones/milestone-4-cicd-caching.md)

### Milestone 5: Optimization & Documentation
**目标**: 完善文档、团队培训、性能优化  
**时长**: 1周  
**交付物**: 完整文档、Nx generators（可选）、培训材料  
**详情**: [milestone-5-optimization.md](./milestones/milestone-5-optimization.md)

## 🔑 关键决策

文档中已解决的3个关键架构决策（基于增量迁移原则）：

### AD-001: Nx缓存策略
**决策**: 混合方式（先本地缓存，后Nx Cloud）  
**理由**: 降低初始复杂度，渐进式添加分布式缓存

### AD-002: 包结构组织
**决策**: 保持当前packages/目录结构  
**理由**: 最小化迁移复杂度，保留所有import路径

### AD-003: Storybook集成方式
**决策**: 自定义集成（封装现有配置为Nx targets）  
**理由**: Storybook 10已配置工作，降低迁移风险

## 📊 性能目标

| 指标 | 基准 | 目标 | 说明 |
|------|------|------|------|
| 全量构建时间 | [待测量] | <110% baseline | 不能明显变慢 |
| 缓存构建时间 | N/A | <5秒 | 缓存命中时 |
| 缓存命中率 | 0% | >80% | 重复构建时 |
| CI执行时间 | [待测量] | <80% baseline | 期望20%+提升 |
| 测试执行时间 | [待测量] | <110% baseline | 保持或略微提升 |

## 🚀 下一步行动

### 立即可以做的：

1. **审阅文档** - 阅读spec和plan，理解迁移范围
2. **获取澄清** - 如有疑问，在spec的"Open Questions"部分补充
3. **准备环境** - 确保本地有Node.js >=18.20.4和npm >=10.7.0
4. **建立基准** - 测量当前构建/测试时间作为baseline

### 准备开始Milestone 1:

1. **创建spike分支** - 用于实验和验证
2. **安装Nx** - `npm install -D nx@latest`
3. **测试单个package** - 选一个简单的包先集成
4. **验证构建输出** - 确保与现有输出一致

## 📞 获取帮助

- **Slack**: #backpack channel
- **文档问题**: 在spec.md的"Open Questions"部分添加
- **技术问题**: 参考各milestone的"Troubleshooting"部分
- **参考项目**: banana和falcon的Nx迁移（如可访问）

## 🔄 文档维护

本文档会随着迁移进展持续更新：

- **spec.md**: 如需求变更或澄清问题
- **plan.md**: 如架构决策调整
- **milestone文档**: 实施过程中的issues和resolutions
- **README.md**: 当文档结构变化时

---

**注意**: 这是一个全面的迁移计划，每个milestone都有详细的实施步骤、验证标准和回滚方案。建议循序渐进执行，每个milestone完成后进行充分验证再继续下一个。

**祝迁移顺利！** 🎉
