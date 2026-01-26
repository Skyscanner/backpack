# Backpack Nx 迁移文档

> **状态**: Draft
> **创建日期**: 2026-01-26
> **维护团队**: Clover Squad

---

## 📚 文档索引

### 核心文档
1. **[00-summary.md](./00-summary.md)** - 开始这里! 📍
   - 迁移背景、目标、当前状态
   - Blockers 和风险分析
   - Milestones 总览
   - 成功指标和时间估算

### Milestone 详细文档

2. **[01-milestone-1-nx-initialization.md](./01-milestone-1-nx-initialization.md)**
   - 🎯 Nx workspace 初始化
   - ⏱️ 信心度 80%
   - 🔑 关键产出: nx.json, 项目结构决策, TypeScript 配置

3. **[02-milestone-2-static-checks.md](./02-milestone-2-static-checks.md)**
   - 🎯 ESLint, Stylelint, TypeScript 迁移到 Nx
   - ⏱️ 信心度 75%
   - 🔑 关键产出: Nx targets, CI 集成, nx affected

4. **[03-milestone-3-package-restructure.md](./03-milestone-3-package-restructure.md)**
   - 🎯 解决 3 个主要 Blockers (导入结构, Icons, SCSS)
   - ⏱️ 信心度 60%
   - 🔑 关键产出: 统一命名空间, 可解析路径, 向后兼容

5. **[04-milestone-4-libs-extraction.md](./04-milestone-4-libs-extraction.md)**
   - 🎯 依赖管理, 模块边界, Nx 发布流程
   - ⏱️ 信心度 60%
   - 🔑 关键产出: Production Standards 合规, 模块边界, 发布流程明确

6. **[05-milestone-5-optimization.md](./05-milestone-5-optimization.md)** (可选)
   - 🎯 PNPM, Vite/Vitest, Nx Cloud, 持续优化
   - ⏱️ 信心度 40%
   - 🔑 关键产出: 性能提升, 现代工具链

### 辅助文档

7. **[CHANGELOG.md](./CHANGELOG.md)** - 文档变更历史

---

## 🚀 快速开始

### 对于项目管理者
1. 阅读 [00-summary.md](./00-summary.md) 了解全局
2. Review Milestones 总览和时间估算
3. 识别需要对齐的 stakeholders
4. 安排 Kickoff 会议

### 对于工程师
1. 阅读 [00-summary.md](./00-summary.md) 第 2 节 (当前代码现状)
2. 查看 [01-milestone-1-nx-initialization.md](./01-milestone-1-nx-initialization.md) 了解第一步
3. 检查前置条件和准备工作
4. 开始技术调研

### 对于 Principal Engineers
1. Review 架构决策部分 (在各 Milestone 中)
2. 评估风险和缓解措施
3. 提供技术指导和方向
4. 参与关键决策点的讨论

---

## 📊 项目概览

### 时间线

```
Core Milestones (必须):
├─ M1: Nx 初始化         ████░░░░░░░░░░░░░
├─ M2: 静态检查          ██████░░░░░░░░░░░
├─ M3: 包结构重组        ████████████░░░░░
└─ M4: Libraries 提取    ████████░░░░░░░░░

Optional:
└─ M5: 优化与增强        ████████████████░

总计:
- Core only: 时间待定
- 含优化: 时间待定
```

### 关键里程碑

| Milestone | 关键交付 | 状态 |
|-----------|---------|------|
| M1 | Nx workspace, 项目结构决策 | 📝 规划中 |
| M2 | Nx targets, nx affected 启用 | 📝 规划中 |
| M3 | 统一命名空间, Blockers 解决 | 📝 规划中 |
| M4 | Production Standards 合规 | 📝 规划中 |
| M5 | 性能优化, 现代工具链 | 📝 可选 |

### Critical Blockers

| Blocker | 影响 | 解决在 | 状态 |
|---------|------|--------|------|
| Import 结构不兼容 | High | M3 | 🔴 待解决 |
| Icons 动态导入 | High | M3 | 🔴 待解决 |
| SCSS 相对路径 | High | M3 + 前置 Sass 迁移 | 🔴 待解决 |
| 依赖管理不合规 | Medium | M4 | 🔴 待解决 |

---

## 🎯 成功指标

### 技术指标
- ✅ Nx workspace 建立
- ✅ `nx affected` 准确识别变更
- ✅ 依赖图完整且准确
- ✅ 模块边界自动强制
- ✅ 发布流程自动化
- ✅ CI 时间减少 >30%

### 业务指标
- ✅ 消费者零破坏 (或仅需 codemod)
- ✅ 开发体验改善
- ✅ 符合 Production Standards
- ✅ 为 monorepo 整合做好准备

---

## 🔗 重要链接

### Confluence
- [Backpack Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1430062432)
- [Backpack Import Structure Adjustment](https://skyscanner.atlassian.net/wiki/spaces/Clover/pages/1434524189)
- [Banana Design Review](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1362971958)
- [Web Foundations Strategy](https://skyscanner.atlassian.net/wiki/spaces/SWORG/pages/1095290743)

### GitHub
- [Global Components](https://github.com/Skyscanner/global-components) - Nx 已完成
- [Banana](https://github.com/Skyscanner/banana) - Nx 已完成
- [Falcon](https://github.com/Skyscanner/falcon) - Nx 进行中

### 外部文档
- [Nx Official Docs](https://nx.dev/)
- [Nx: Adding to Existing Project](https://nx.dev/recipes/adopting-nx/adding-to-existing-project)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)

---

## 📋 前置准备工作

以下工作可在 Nx 迁移前独立进行,可节省一定时间:

- [ ] **Sass 迁移** (unstable → stable mixins)
- [ ] **Flare TS 采用** (JS → TS with .d.ts)
- [ ] **Public Surface Manifest**
- [ ] **Lint/CI Guardrails**
- [ ] **Icons/SCSS 生成脚本**

详见各 Milestone 文档的前置条件部分。

---

## 🤝 如何贡献

1. **提出问题**: 在文档中标记 `[需要澄清]` 或创建 Issue
2. **更新文档**: 随着迁移进展,更新相关章节
3. **分享经验**: 在 CHANGELOG.md 中记录实际遇到的问题和解决方案
4. **Review**: 定期 review 文档与实际的偏差

---

## 📞 联系方式

- **Slack**: [#clover-squad](https://skyscanner.slack.com/archives/...)
- **负责团队**: Clover Squad
- **Principal Engineers**: TBD
- **JPD**: [UP-341](https://skyscanner.atlassian.net/browse/UP-341)

---

## 📝 文档状态

- **当前版本**: v0.1 (Draft)
- **最后更新**: 2026-01-26
- **下次 Review**: TBD
- **状态**: 等待团队 Review 和对齐

---

## 🙏 致谢

本文档基于以下项目的经验:
- **Banana** - Nx 迁移 (Shuttle/Woodpecker Squads)
- **Falcon** - Nx 迁移 (Wombat Squad)
- **Global Components** - Nx 迁移 (Clover Squad)
- **Hotels Website** - Nx 迁移 (BD Squad)
- **Web Enablement Team** - Nx 最佳实践和指导

特别感谢 AI 工具 (Claude Code) 协助文档编写。

---

**准备好了吗? 从 [00-summary.md](./00-summary.md) 开始吧! 🚀**
