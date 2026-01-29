# Backpack Nx 采用 - 价值里程碑确认

**基于文档**: `docs/nx-adoption-one-pager-zh.md`
**分析报告**: `docs/nx-adoption-analysis-report.md`
**确认日期**: 2026-01-26

---

## 摘要对比

| 原文档描述 | 实际情况 | 确认状态 |
|----------|---------|---------|
| 26 工程周（含可选）| 分析报告显示 22.5-24 周（含风险处理）| ✅ 合理 |
| 14 工程周（不含可选）| 核心必须里程碑约 13 周 + 风险处理 | ✅ 基本吻合 |
| 置信度 60% | 分析报告提供详细风险评估 | ⚠️ 需要 Phase 0 降低风险 |

---

## 价值里程碑分类

### 1️⃣ 必须完成的里程碑（核心 MVP）

以下里程碑是 Nx 采用的核心，必须完成才能实现基本价值：

| # | 里程碑 | 工作量 | 复杂度 | 估算 | 状态 |
|---|-------|--------|--------|------|------|
| 1 | **Nx 初始化** | 很小 | 小 | < 1 周 | ✅ 保留 |
| 2 | **项目结构确认和变更** | 大 | 小 | 2 周 | ✅ 保留 |
| 3 | **所有 Storybook stories 与组件放在一起** | 很小 | 小 | 1 周 | ✅ 保留 |
| 4 | **将组件设置为 Nx 项目** | 很小 | 小 | 2 周 | ✅ 保留 |
| 5 | **将静态检查和脚本转换为 Nx** | 大 | 小 | 3 周 | ✅ 保留 |
| 6 | **配置模块边界** | 大 | 小 | 1 周 | ✅ 保留 |
| 7 | **使用 Nx 发布** | 中 | 中 | 4 周 | ✅ 保留 |

**核心里程碑总计**: ~13 周

---

### 2️⃣ 可选的里程碑（下一阶段完成）

以下里程碑不是 Nx 采用的核心目标，可以在后续阶段完成：

| # | 里程碑 | 工作量 | 复杂度 | 估算 | 决策 |
|---|-------|--------|--------|------|------|
| 8 | **依赖管理** | 中 | 中 | 4 周 | ❌ 删除（可选） |
| 9 | **Vite 采用** | 中 | 中 | 6 周 | ❌ 删除（可选） |
| 10 | **Vitest 采用** | 大 | 小 | 2 周 | ❌ 删除（可选） |

**可选里程碑总计**: ~12 周（不包含在本次 Nx 采用范围内）

---

### 3️⃣ 基于分析报告新增的必要步骤（Phase 0）

根据 `docs/nx-adoption-analysis-report.md` 第九节和第十节的发现，建议在核心里程碑之前增加 **Phase 0: 风险降低**：

| # | 新增步骤 | 工作量 | 复杂度 | 估算 | 理由 |
|---|---------|--------|--------|------|------|
| 0.1 | **清理外部依赖** | 小 | 小 | 0.5-1 周 | 处理过时依赖（normalize.css, object-assign 等）|
| 0.2 | **添加 TypeScript 路径别名** | 中 | 小 | 1 周 | 解决 207+ 个相对路径导入问题 |
| 0.3 | **重构内部 src 导入** | 中 | 小 | 1 周 | 修复违反模块封装的导入 |
| 0.4 | **配置代码生成 inputs/outputs** | 小 | 中 | 1 周 | Icon/Flare/Spinner 代码生成 Nx 配置 |

**Phase 0 总计**: 3.5-4 周

---

## 最终确认的里程碑（删除可选后）

### 完整执行顺序

```
Phase 0: 风险降低（3.5-4 周）
  ├─ 0.1 清理外部依赖
  ├─ 0.2 添加 TypeScript 路径别名
  ├─ 0.3 重构内部 src 导入
  └─ 0.4 配置代码生成 inputs/outputs

Phase 1: Nx 初始化（< 1 周）
  └─ 搭建 Nx 工作区、配置 nx.json、更新 CI 缓存

Phase 2: 项目结构确认和变更（2 周）
  └─ 设计结构、合并 package.json、移除 postinstall

Phase 3: Stories 迁移（1 周）
  └─ 将 32 个 stories 移至组件目录

Phase 4: 配置 Nx 项目（2 周）
  └─ 为 91 个组件创建 project.json

Phase 5: 转换静态检查和脚本（3 周）
  └─ 迁移 lint/test/typecheck 到 Nx targets

Phase 6: 配置模块边界（1 周）
  └─ 设置 tags 和 enforce-module-boundaries 规则

Phase 7: 使用 Nx 发布（4 周）
  └─ 配置 nx release、conventional commits、GitHub workflow
```

**总计**: 16.5-17 周

---

## 对比分析

| 版本 | 核心工时 | 风险处理 | 总计 | 备注 |
|-----|---------|---------|------|------|
| **原 One Pager (不含可选)** | 14 周 | - | 14 周 | 置信度 60% |
| **分析报告发现** | 14 周 | 2.5-4 周 | 16.5-18 周 | 包含 Blocker 处理 |
| **最终确认（删除可选）** | 13 周 | 3.5-4 周 | 16.5-17 周 | Phase 0 提前降低风险 |

**结论**:
- ✅ 核心里程碑保持不变（7 个必须完成）
- ❌ 删除 3 个可选里程碑（依赖管理、Vite、Vitest）
- ➕ 新增 Phase 0 风险降低（4 个步骤）
- 📊 总工时从原估算 14 周调整为 16.5-17 周（增加风险处理）

---

## 详细里程碑说明

### Phase 0: 风险降低（新增）

#### 0.1 清理外部依赖
**工作量**: 小 | **估算**: 0.5-1 周

**必须处理的依赖**:
```json
{
  "dependencies": {
    "normalize.css": "4.2.0",      // 升级到 10.x 或移除
    "object-assign": "4.1.1",      // 移除（ES6 原生支持）
    "intersection-observer": "0.12.2", // 移除（浏览器原生支持）
    "react-table": "7.8.0"         // 升级到 @tanstack/react-table v8
  }
}
```

#### 0.2 添加 TypeScript 路径别名
**工作量**: 中 | **估算**: 1 周

在 `tsconfig.base.json` 添加：
```json
{
  "compilerOptions": {
    "paths": {
      "@backpack/*": ["packages/*"],
      "@backpack/mixins/*": ["packages/bpk-mixins/*"]
    }
  }
}
```

**影响**: 解决 207+ 个组件间相对路径导入问题

#### 0.3 重构内部 src 导入
**工作量**: 中 | **估算**: 1 周

修复类似这样的导入：
```typescript
// 错误：直接导入内部实现
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';

// 正确：从包入口点导入
import { TEXT_STYLES } from '../../bpk-component-text';
```

**工具**: 提供自动化脚本 `scripts/fix-internal-imports.sh`

#### 0.4 配置代码生成 inputs/outputs
**工作量**: 小 | **估算**: 1 周

为以下组件配置 Nx 代码生成任务：
- `bpk-component-icon` (依赖 @skyscanner/bpk-svgs)
- `bpk-component-spinner` (依赖 @skyscanner/bpk-svgs)
- `bpk-component-flare` (SVG → React 转换)

---

### Phase 1: Nx 初始化
**工作量**: 很小 | **估算**: < 1 周

参见详细文档: `docs/nx-adoption-phase-1-initialization.md`

**交付物**:
- [x] `nx.json` 配置文件
- [x] `tsconfig.base.json` 基础配置
- [x] 更新 `.gitignore`
- [x] 更新 CI 工作流缓存配置
- [x] Nx 辅助 scripts

---

### Phase 2: 项目结构确认和变更
**工作量**: 大 | **估算**: 2 周

**关键任务**:
1. 设计目标项目结构（与 PE/Web Enablement 对齐）
2. 合并双重 package.json（移除 `packages/package.json`）
3. 移除 postinstall hook: `(cd packages && npm install)`
4. 合并两个 package-lock.json
5. 执行目录重组（`nx workspace:move` 或 `git mv`）

**实际数量修正** (来自分析报告):
- ~~"约 130 个组件"~~ → **91 个组件**

---

### Phase 3: Stories 迁移
**工作量**: 很小 | **估算**: 1 周

**实际数量修正** (来自分析报告):
- ~~"所有组件的 stories"~~ → **只有 32 个组件有 stories**

**工作量降低**: 从预期的 91 个减少到实际 32 个

**交付物**:
- 迁移 32 个 `.stories.tsx` 文件到组件目录
- 更新 Storybook 配置指向新路径
- 验证 Percy 视觉测试仍正常工作

---

### Phase 4: 配置 Nx 项目
**工作量**: 很小 | **估算**: 2 周

**交付物**:
- 91 个 `project.json` 文件
- 每个组件的 `tsconfig.json`、`tsconfig.lib.json`、`tsconfig.spec.json`
- 项目引用同步

**建议**: 使用 Nx 项目推断功能减少手动配置

---

### Phase 5: 转换静态检查和脚本
**工作量**: 大 | **估算**: 3 周

**需要迁移的脚本**:
| 当前脚本 | Nx Target | 备注 |
|---------|-----------|------|
| `lint:js` | `nx affected --target=lint` | ESLint |
| `lint:scss` | 整合到 lint target | Stylelint |
| `jest` | `nx affected --target=test` | Jest 30.2.0 |
| `typecheck` | `nx affected --target=typecheck` | TypeScript |
| `build` | `nx run-many --target=build` | Babel + Gulp |
| `storybook` | `nx storybook` | Storybook 10.1.11 |

**整合**: 调整现有 lint-staged 配置与 Nx 整合

---

### Phase 6: 配置模块边界
**工作量**: 大 | **估算**: 1 周

**建议的 Tag 分类**:
```typescript
{
  "tags": [
    "type:component",    // UI 组件
    "type:mixin",        // SCSS mixins
    "type:stylesheet",   // 纯样式
    "type:util",         // 工具函数
    "scope:public",      // 公开 API
    "scope:internal"     // 内部使用
  ]
}
```

**规则示例**:
```json
{
  "sourceTag": "type:component",
  "onlyDependOnLibsWithTags": [
    "type:component",
    "type:util",
    "type:mixin"
  ]
}
```

---

### Phase 7: 使用 Nx 发布
**工作量**: 中 | **估算**: 4 周

**当前发布流程**:
```
手动创建 GitHub Release
  ↓
GitHub Actions 监听 release.published 事件
  ↓
从 Release tag 获取版本号
  ↓
npm run transpile → cd dist → npm version → npm publish
```

**目标发布流程**:
```
开发者 commit (conventional commits)
  ↓
PR merge 到 main
  ↓
nx release (自动计算版本号)
  ↓
生成 CHANGELOG.md
  ↓
创建 git tag
  ↓
nx release publish (发布到 npm)
```

**关键变更**:
1. 从 "手动 GitHub Release" → "conventional commits 自动版本"
2. 从 `npm publish` → `nx release publish`
3. 从 release-drafter → nx release changelog
4. 复用现有 Husky 9.1.3，添加 commit-msg hook

**重要**: 使用 `nx run-many` 而非 `nx affected` 确保 Release 触发时能正确构建

---

## 删除的可选里程碑说明

### ❌ 依赖管理（可选，下一阶段）
**原估算**: 4 周

**为什么删除**:
- 不是 Nx 采用的核心价值
- 可以在 Nx 采用完成后单独进行
- 生产标准要求，但不阻塞 Nx 基本功能

**何时做**:
- Nx 采用完成并稳定运行后
- 作为独立项目进行依赖审计和重组

---

### ❌ Vite 采用（可选，下一阶段）
**原估算**: 6 周

**为什么删除**:
- 属于构建工具现代化，不是 Nx 采用的必要条件
- Nx 可以与 Babel/Gulp 配合工作
- 需要大量重构（Gulp → Vite 插件）

**何时做**:
- Web Foundation Stage 2
- 作为独立的构建工具升级项目

---

### ❌ Vitest 采用（可选，下一阶段）
**原估算**: 2 周

**为什么删除**:
- 依赖于 Vite 采用
- 当前 Jest 30.2.0 已经是最新版本，工作正常
- Nx 完全支持 Jest

**何时做**:
- Vite 采用完成后
- 作为测试框架升级的一部分

---

## 风险与依赖关系

### Phase 0 必须先完成的原因

| 风险 | 如果不提前处理的影响 | Phase 0 如何解决 |
|-----|-------------------|----------------|
| **导入路径问题** | 目录重组后所有相对路径失效 | 提前添加路径别名，使用绝对路径 |
| **代码生成缓存失效** | Nx 缓存不识别 SVG 依赖 | 提前配置 inputs/outputs |
| **模块边界违规** | ESLint 规则会报数百个错误 | 提前修复内部 src 导入 |
| **外部依赖冲突** | Nx 插件与旧依赖版本不兼容 | 提前清理过时依赖 |

### 里程碑依赖图

```
Phase 0 (风险降低)
  ↓
Phase 1 (Nx 初始化)
  ↓
Phase 2 (项目结构)
  ↓
Phase 3 (Stories) ← 可与 Phase 4 并行
Phase 4 (Nx 项目) ← 可与 Phase 3 并行
  ↓
Phase 5 (静态检查)
  ↓
Phase 6 (模块边界)
  ↓
Phase 7 (Nx 发布)
```

---

## 成功标准

### 完成标准

- [ ] 所有核心里程碑（Phase 0-7）完成
- [ ] 所有 CI 检查通过
- [ ] Nx 缓存命中率 > 70%
- [ ] 消费者导入路径不变（向后兼容）
- [ ] 发布流程迁移到 nx release
- [ ] 文档更新（README、Contributing Guide）

### 质量标准

- [ ] 无破坏性变更（对外 API 保持兼容）
- [ ] CI 时间减少 > 20%（通过 Nx affected 和缓存）
- [ ] 本地构建时间减少 > 30%（通过 Nx 缓存）
- [ ] 依赖图清晰（无循环依赖）
- [ ] 所有测试通过率 100%

---

## 工时分配建议

基于 **1 名工程师全职投入**：

| Phase | 估算 | 建议周数分配 | 累计周数 |
|-------|------|------------|---------|
| Phase 0 | 3.5-4 周 | 4 周 | 第 1-4 周 |
| Phase 1 | < 1 周 | 1 周 | 第 5 周 |
| Phase 2 | 2 周 | 2 周 | 第 6-7 周 |
| Phase 3 | 1 周 | 0.5 周 | 第 8 周（前半）|
| Phase 4 | 2 周 | 2 周 | 第 8-9 周 |
| Phase 5 | 3 周 | 3 周 | 第 10-12 周 |
| Phase 6 | 1 周 | 1 周 | 第 13 周 |
| Phase 7 | 4 周 | 4 周 | 第 14-17 周 |
| **总计** | **16.5-17 周** | **17 周** | **~4.25 个月** |

**缓冲时间**: 建议预留 10-15% (2-3 周) 用于意外问题处理

**实际项目周期**: **19-20 周（约 5 个月）**

---

## 附录：完整清单

### 必须完成的里程碑（7 个核心 + 4 个 Phase 0）

✅ **Phase 0: 风险降低**
- [ ] 0.1 清理外部依赖
- [ ] 0.2 添加 TypeScript 路径别名
- [ ] 0.3 重构内部 src 导入
- [ ] 0.4 配置代码生成 inputs/outputs

✅ **Phase 1: Nx 初始化**
- [ ] 1.1 安装 Nx 和配置 nx.json
- [ ] 1.2 创建 tsconfig.base.json
- [ ] 1.3 更新 .gitignore 和 CI 缓存

✅ **Phase 2: 项目结构确认和变更**
- [ ] 2.1 设计目标结构
- [ ] 2.2 合并双重 package.json
- [ ] 2.3 移除 postinstall hook
- [ ] 2.4 执行目录重组

✅ **Phase 3: Stories 迁移**
- [ ] 3.1 迁移 32 个 stories 文件
- [ ] 3.2 更新 Storybook 配置
- [ ] 3.3 验证 Percy 测试

✅ **Phase 4: 配置 Nx 项目**
- [ ] 4.1 为 91 个组件创建 project.json
- [ ] 4.2 创建 TypeScript 配置文件
- [ ] 4.3 同步项目引用

✅ **Phase 5: 转换静态检查和脚本**
- [ ] 5.1 配置 Nx 插件和执行器
- [ ] 5.2 更新 GitHub Actions
- [ ] 5.3 整合 lint-staged

✅ **Phase 6: 配置模块边界**
- [ ] 6.1 为项目分配 tags
- [ ] 6.2 配置 enforce-module-boundaries 规则
- [ ] 6.3 修复违规导入

✅ **Phase 7: 使用 Nx 发布**
- [ ] 7.1 配置 nx release
- [ ] 7.2 配置 conventional commits
- [ ] 7.3 更新 GitHub Actions 发布流程
- [ ] 7.4 验证发布流程

### 删除的可选里程碑（3 个）

❌ **依赖管理** - 延后到下一阶段
❌ **Vite 采用** - 延后到下一阶段
❌ **Vitest 采用** - 延后到下一阶段

---

**文档版本**: 1.0
**创建日期**: 2026-01-26
**基于文档**:
- `docs/nx-adoption-one-pager-zh.md`
- `docs/nx-adoption-analysis-report.md`
**确认人**: Backpack Team
