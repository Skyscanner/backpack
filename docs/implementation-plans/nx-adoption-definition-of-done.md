# Nx Adoption - Definition of Done (DOD)

**文档版本**: 1.0
**创建日期**: 2026-01-28
**基于**: Skyscanner Backpack Nx Adoption Analysis Report

---

## 概述

本文档定义了 Backpack 项目完成 Nx adoption 的验收标准。所有条目均从**结果和可验证性**角度描述，而非实现细节。

---

## 1️⃣ 工作区初始化完成 (Workspace Initialized)

### 验收标准

- ✅ `nx.json` 配置文件存在并正确配置
- ✅ 所有 CI workflows 不再使用自定义 `node_modules` 缓存
- ✅ 嵌套的 `packages/package.json` 和 `packages/package-lock.json` 已移除
- ✅ TypeScript 项目引用 (project references) 配置完成

### 验证方法

```bash
# 检查 nx.json 存在
ls nx.json

# 检查嵌套包文件已移除
test ! -f packages/package.json && echo "PASS" || echo "FAIL"
test ! -f packages/package-lock.json && echo "PASS" || echo "FAIL"

# 检查 CI 配置不再缓存嵌套 node_modules
grep -r "packages/node_modules" .github/workflows/ && echo "FAIL" || echo "PASS"
```

---

## 2️⃣ 项目结构标准化 (Project Structure Standardized)

### 验收标准

- ✅ 保持 `packages/` 目录结构，所有组件仍在 `packages/bpk-component-*`
- ✅ `packages/package.json` 已完全移除（依赖已合并到根 package.json）
- ✅ 只存在一个 `package-lock.json` 文件（在根目录）
- ✅ `postinstall` hook 中的嵌套 npm install 已移除
- ✅ Storybook、Jest、GitHub Actions 配置已更新（如有路径依赖）

### 验证方法

```bash
# 检查 packages/package.json 已移除
test ! -f packages/package.json && echo "PASS" || echo "FAIL"

# 检查只有一个 lock 文件
find . -name "package-lock.json" | wc -l  # 应该输出 1

# 检查嵌套 lock 文件已移除
test ! -f packages/package-lock.json && echo "PASS" || echo "FAIL"

# 检查 postinstall 不包含嵌套 install
grep -q "cd packages && npm install" package.json && echo "FAIL" || echo "PASS"

# 检查组件仍在 packages 目录下
ls packages/ | grep "bpk-component-" | wc -l  # 应该等于组件数量（91）
```

---

## 3️⃣ Stories 文件就近放置 (Stories Colocation)

### 验收标准

- ✅ 所有 32 个组件的 `.stories.tsx` 文件已从 `examples/` 迁移到 `packages/bpk-component-*/src/` 目录
- ✅ Storybook 配置已更新，可正确发现和加载迁移后的 stories
- ✅ Storybook 在本地和 CI 中均可正常构建和运行

### 验证方法

```bash
# 检查 examples 目录不再有 stories 文件
find examples/ -name "*.stories.tsx" | wc -l  # 应该输出 0

# 检查组件 src 目录下有 stories
find packages/*/src/ -name "*.stories.tsx" | wc -l  # 应该输出 32

# 运行 Storybook
nx storybook
```

---

## 4️⃣ 组件作为 Nx 项目 (Components as Nx Projects)

### 验收标准

- ✅ 每个组件（91 个）都有自己的 `project.json` 配置文件
- ✅ 每个组件有对应的 TypeScript 配置：
  - `tsconfig.json`
  - `tsconfig.lib.json`
  - `tsconfig.spec.json`
- ✅ 所有项目引用在 Nx 依赖图中正确显示（`nx graph` 可视化成功）

### 验证方法

```bash
# 检查 project.json 数量
find packages/ -name "project.json" | wc -l  # 应该 >= 91

# 检查每个项目有 TypeScript 配置
for dir in packages/bpk-*/; do
  test -f "$dir/tsconfig.json" || echo "Missing tsconfig.json in $dir"
  test -f "$dir/tsconfig.lib.json" || echo "Missing tsconfig.lib.json in $dir"
  test -f "$dir/tsconfig.spec.json" || echo "Missing tsconfig.spec.json in $dir"
done

# 生成依赖图
nx graph --file=dependency-graph.html
```

---

## 5️⃣ 静态检查和脚本迁移 (Static Checks via Nx)

### 验收标准

- ✅ 所有 npm scripts 已迁移为 Nx targets：
  - `lint:js` → `nx affected --target=lint`
  - `lint:scss` → 整合到 lint target
  - `jest` → `nx affected --target=test`
  - `typecheck` → `nx affected --target=typecheck`
  - `build` → `nx affected --target=build`
  - `storybook` → `nx storybook`
- ✅ CI workflows 使用 `nx affected` 或 `nx run-many` 命令
- ✅ lint-staged 配置已更新以支持 Nx 命令
- ✅ 遗留的 `npm run` 命令已废弃或移除

### 验证方法

```bash
# 检查 CI 使用 Nx 命令
grep "nx affected" .github/workflows/*.yml

# 运行各个 target
nx affected --target=lint --base=main
nx affected --target=test --base=main
nx affected --target=build --base=main
nx run-many --target=typecheck

# 检查 lint-staged 配置
cat .lintstagedrc.js  # 应该包含 nx 命令
```

---

## 6️⃣ 模块边界强制执行 (Module Boundaries Enforced)

### 验收标准

- ✅ 每个 `project.json` 中定义了正确的 tags（如 `type:component`, `type:mixin`, `type:util`, `scope:public`）
- ✅ ESLint 配置中启用了 `@nx/enforce-module-boundaries` 规则
- ✅ 所有违反模块边界的导入已修复（不直接导入 `src/` 内部文件，应从包入口点导入）
- ✅ `nx lint` 在 CI 中运行且无模块边界错误

### 验证方法

```bash
# 检查 ESLint 配置包含 module boundaries 规则
grep -r "@nx/enforce-module-boundaries" .eslintrc*

# 运行 lint 检查（应该无错误）
nx run-many --target=lint --all

# 检查 project.json 中有 tags
find packages/ -name "project.json" -exec grep -L "tags" {} \;  # 应该无输出

# 确认没有直接导入 src 内部文件
grep -r "from.*\/src\/" packages/ --include="*.ts" --include="*.tsx" && echo "FAIL: Found internal src imports" || echo "PASS"
```

---

## 7️⃣ 发布流程标准化 (Publishing via Nx)

### 验收标准

- ✅ `nx.json` 中配置了 `release` target
- ✅ 代码库使用 Conventional Commits（已配置 commitizen 和 commit-msg hook）
- ✅ GitHub Actions workflow 使用 `nx release` 替代手动 `npm publish`
- ✅ 版本号由 Conventional Commits 自动计算（不再依赖手动 GitHub Release tag）
- ✅ CHANGELOG 由 `nx release` 自动生成（不再使用 release-drafter）
- ✅ 发布流程使用 `nx run-many` 而非 `nx affected`（避免无变更时无法触发问题）

### 验证方法

```bash
# 检查 nx.json 有 release 配置
grep -q "release" nx.json && echo "PASS" || echo "FAIL"

# 检查 commit-msg hook
test -f .husky/commit-msg && echo "PASS" || echo "FAIL"

# 测试发布预览（dry-run）
nx release --dry-run

# 检查 CI workflow 使用 nx release
grep "nx release" .github/workflows/release.yml
```

---

## 8️⃣ 代码生成任务集成 (Code Generation Tasks)

### 验收标准

- ✅ Icon、Flare、Spinner 的代码生成任务已配置为 Nx targets
- ✅ 每个代码生成任务有明确的 `inputs` 和 `outputs` 配置
- ✅ `build` target 正确依赖 `generate` target（`dependsOn: ["generate"]`）
- ✅ 生成的文件被 Nx 缓存正确处理

### 验证方法

```bash
# 检查代码生成项目有 generate target
nx show project bpk-component-icon --web | grep "generate"
nx show project bpk-component-flare --web | grep "generate"
nx show project bpk-component-spinner --web | grep "generate"

# 运行代码生成
nx run bpk-component-icon:generate
nx run bpk-component-flare:generate
nx run bpk-component-spinner:generate

# 验证 build 依赖 generate
nx show project bpk-component-icon --web | grep "dependsOn" -A 5
```

---

## 9️⃣ 导入路径兼容性 (Import Path Compatibility)

### 验收标准

- ✅ TypeScript `tsconfig.base.json` 中配置了路径别名 `@backpack/*` 指向 `packages/*`（在 Phase 0.2 完成）
- ✅ 所有内部 `src/` 导入已重构为从包入口点导入（在 Phase 0.3 完成）
- ✅ 消费者导入路径保持兼容（`@skyscanner/backpack-web/bpk-component-*` 仍有效）
- ✅ SCSS `@use` 相对路径已更新（如需要）

### 验证方法

```bash
# 检查 tsconfig.base.json 有 paths 配置
grep -A 5 "paths" tsconfig.base.json | grep "@backpack" && echo "PASS" || echo "FAIL"

# 确认没有 src 内部导入
grep -r "from.*\/src\/" packages/ --include="*.ts" --include="*.tsx" && echo "FAIL: Found internal src imports" || echo "PASS"

# 检查消费者兼容性（构建后检查 dist）
nx build bpk-component-button
ls dist/@skyscanner/backpack-web/bpk-component-button  # 应该存在
```

---

## 🔟 依赖清理 (Dependencies Cleaned)

### 验收标准

- ✅ 过时依赖已移除或升级（在 Phase 0.1 完成）：
  - `normalize.css` → 升级到 10.x 或替代方案
  - `object-assign` → 移除（ES6 原生支持）
  - `intersection-observer` → 移除（现代浏览器原生支持）
- ✅ `@skyscanner/bpk-svgs` 锁定为精确版本（避免隐式变更导致缓存问题，在 Phase 0.4 完成）
- ✅ React peer dependency 版本范围已审查

### 验证方法

```bash
# 检查过时依赖已移除
! grep -q "\"object-assign\"" package.json && echo "PASS: object-assign removed" || echo "FAIL"
! grep -q "\"intersection-observer\"" package.json && echo "PASS: intersection-observer removed" || echo "FAIL"

# 检查 normalize.css 版本
grep "normalize.css" package.json  # 应该是 ^10.x 或更高

# 检查 bpk-svgs 是精确版本（无 ^ 或 ~ 前缀）
grep "@skyscanner/bpk-svgs" package.json | grep -qv "[\^~]" && echo "PASS: exact version" || echo "FAIL: not exact"
```

---

## 1️⃣1️⃣ CI/CD 验证通过 (CI/CD Validation)

### 验收标准

- ✅ 所有 CI checks 使用 Nx 命令成功运行
- ✅ Nx 缓存在 CI 中正常工作（本地或远程缓存）
- ✅ Percy 视觉测试与新的 story 路径兼容
- ✅ 发布流程在 staging 环境成功测试
- ✅ `nx graph` 显示正确的项目依赖关系（无循环依赖）

### 验证方法

```bash
# 检查 CI 配置
cat .github/workflows/ci.yml  # 应该使用 nx affected

# 生成依赖图检查循环依赖
nx graph --file=graph.json
# 手动检查 graph.json 是否有循环

# 运行 Percy（如果配置）
nx run storybook:percy
```

---

## 1️⃣2️⃣ 文档和培训 (Documentation & Training)

### 验收标准

- ✅ 更新开发者文档，说明如何使用 Nx 命令
- ✅ README 中的命令已更新（`npm run test` → `nx test`）
- ✅ 团队成员完成 Nx 基础培训
- ✅ 迁移指南已发布给消费者（如有 breaking changes）

### 验证方法

```bash
# 检查 README 包含 Nx 命令
grep -q "nx test" README.md && echo "PASS" || echo "FAIL"
grep -q "nx build" README.md && echo "PASS" || echo "FAIL"

# 检查是否有迁移指南
test -f docs/MIGRATION.md && echo "PASS" || echo "WARN: Optional"
```

---

## 1️⃣3️⃣ 性能基准达标 (Performance Benchmarks)

### 验收标准

- ✅ CI 构建时间不超过迁移前基准（或有明确改进计划）
- ✅ Nx 缓存命中率 > 50%（生产环境稳定后）
- ✅ 增量构建正常工作（`nx affected` 只构建变更的项目）

### 验证方法

```bash
# 记录构建时间
time nx run-many --target=build --all

# 测试增量构建（修改一个文件后）
touch libs/bpk-component-button/src/BpkButton.tsx
nx affected:build --base=HEAD~1  # 应该只构建少数项目

# 查看缓存统计（如果使用 Nx Cloud）
nx reset
nx run-many --target=build --all
nx run-many --target=build --all  # 第二次应该全部命中缓存
```

---

## 1️⃣4️⃣ 风险缓解验证 (Risk Mitigation Verified)

### 验收标准

- ✅ ESLint module boundaries 规则在 Git hooks、CI 和命令行中行为一致
- ✅ 无 `nx release` vs `nx affected` 触发问题（发布流程使用 `run-many`）
- ✅ 外部依赖冲突已解决（Babel、Jest 版本与 Nx executor 兼容）

### 验证方法

```bash
# 测试 Git hook
echo "test" >> libs/bpk-component-button/src/BpkButton.tsx
git add .
git commit -m "test: verify hooks"  # 应该运行 lint

# 测试发布流程（dry-run）
nx release --dry-run  # 不应该因为 "no affected" 而跳过

# 检查 Nx executor 版本兼容性
nx report  # 查看版本信息
```

---

## 总结 Summary

### 关键成功指标 (Key Success Criteria)

1. ✅ **100% 脚本迁移** - 所有构建/测试/lint 命令使用 Nx
2. ✅ **零模块边界违规** - ESLint 检查通过
3. ✅ **自动化版本管理** - 不再手动创建 GitHub Release
4. ✅ **缓存正常工作** - CI 时间优化或持平
5. ✅ **消费者兼容** - 现有项目无需修改即可使用新版本

### 最终验收测试 (Final Acceptance Test)

运行以下命令全部成功即表示 Nx adoption 完成：

```bash
# 1. 验证目录结构
ls packages/ | grep "bpk-component-" | wc -l  # 应输出 91
test ! -f packages/package.json && echo "✓ packages/package.json removed"
test ! -f packages/package-lock.json && echo "✓ packages/package-lock.json removed"

# 2. 验证 Nx 配置
test -f nx.json && echo "✓ nx.json exists"
nx graph --file=dependency-graph.html && echo "✓ dependency graph generated"

# 3. 增量测试
nx affected:test --base=main

# 4. 增量构建
nx affected:build --base=main

# 5. 发布预览（使用 run-many 而非 affected）
nx release --dry-run

# 6. 全量 lint（检查模块边界）
nx run-many --target=lint --all

# 7. 类型检查
nx run-many --target=typecheck --all

# 8. Storybook 运行
nx storybook

# 9. Percy 测试（如适用）
nx run storybook:percy

# 10. 验证 stories 已迁移
find packages/*/src/ -name "*.stories.tsx" | wc -l  # 应输出 32
find examples/ -name "*.stories.tsx" | wc -l  # 应输出 0
```

### 完成标准 (Completion Criteria)

- 🎯 **所有 14 个 DOD 类别**的验收标准全部通过
- 🎯 **所有验证命令**成功执行无错误
- 🎯 **CI/CD pipeline** 使用 Nx 命令并全部通过
- 🎯 **至少一次成功发布**使用 `nx release` 完成

---

## 参考文档

- [Nx Adoption Analysis Report](../nx-adoption-analysis-report.md)
- [Phase 1: Nx Initialization](./phase-1-nx-initialization.md)
- [Phase 2: Project Structure](./phase-2-project-structure.md)
- [Phase 7: Nx Release](./phase-7-nx-release.md)

---

**文档维护者**: Backpack Core Team
**最后更新**: 2026-01-28
**状态**: Draft
