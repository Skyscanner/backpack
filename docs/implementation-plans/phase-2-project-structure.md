# 阶段 2：项目结构确认和变更

**依赖于**：阶段 1

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 合并 package.json | 必需 | 符合 Nx 单一 package.json 标准 |
| 2. 完全移除 packages/package.json | 必需 | 使用 nx release 统一管理版本和发布 |
| 3. 移除 postinstall hook | 必需 | 不再需要嵌套安装，简化流程 |
| 4. 合并 package-lock.json | 必需 | 单一依赖树，避免版本不一致 |
| 5. 更新配置文件路径 | 必需 | 配置文件需要指向合并后的结构 |

## 当前问题

- 根目录和 packages/ 目录各有 package.json 和 package-lock.json
- postinstall hook：`(cd packages && npm install)`
- 91 个组件目录需要考虑是否重组

## 背景说明

**为什么完全移除 packages/package.json？**

当前结构：
- 根 package.json（private: true，dev 依赖）
- packages/package.json（@skyscanner/backpack-web，runtime 依赖）
- 发布时复制 packages/package.json 到 dist/

采用 Nx 后：
- 单一根 package.json（包含所有依赖）
- 使用 `nx release` 自动管理版本和发布
- 通过 `publishConfig.directory: "./dist"` 从 dist/ 发布
- 不需要维护两个 package.json

**为什么保持 packages/ 目录布局？**

- 避免大规模目录重组（91个组件）
- 保持 git 历史清晰
- 与现有团队习惯一致
- Nx 支持任意目录结构

---

## 步骤

### 1. 合并 package.json

**为什么**：Nx 要求单一 package.json，集中管理所有依赖。

**做什么**：
- 将 packages/package.json 的 `dependencies` 合并到根 package.json 的 `dependencies`
- 将 packages/package.json 的 `devDependencies` 合并到根 package.json 的 `devDependencies`
- 将 packages/package.json 的 `peerDependencies` 合并到根 package.json 的 `peerDependencies`
- 保留 packages/package.json 的元数据（name、version、description）暂时不动（下一步删除）

**注意**：不要遗漏 scripts、engines 等其他字段。

---

### 2. 完全移除 packages/package.json

**为什么**：使用 `nx release` 统一管理版本和发布，不再需要双 package.json 结构。

**做什么**：
- 在根 package.json 中配置发布信息：
```json
{
  "name": "@skyscanner/backpack-web",
  "version": "21.0.1",
  "description": "Skyscanner's Design System Backpack",
  "publishConfig": {
    "directory": "./dist",
    "access": "public"
  }
}
```
- 删除 packages/package.json
- 删除 packages/package-lock.json
- 删除根 package.json 中的 `"transpile:copy-package-json"` 脚本（不再需要复制）

---

### 3. 移除 postinstall Hook

**为什么**：单一 package.json 后，不需要嵌套 npm install。

**做什么**：
- 从根 package.json 删除 `"postinstall": "(cd packages && npm install)"` 脚本
- 验证只需在根目录运行 `npm install` 即可安装所有依赖

---

### 4. 合并 package-lock.json

**为什么**：单一依赖树，确保依赖版本一致，避免版本冲突。

**做什么**：
- 删除 packages/package-lock.json（如果存在）
- 删除根 package-lock.json
- 运行 `npm install` 重新生成单一锁文件
- 验证所有依赖正确安装

---

### 5. 更新配置文件路径

**为什么**：部分配置文件可能引用了 packages/package.json，需要更新。

**做什么**：
- 检查并更新以下配置文件（如果有引用）：
  - Jest 配置中的路径
  - Storybook 配置中的路径
  - ESLint/Prettier 配置
  - GitHub Actions 中的路径引用（特别是 release.yml）
  - Babel 配置
  - Gulp 配置

**不需要更新导入路径**：因为阶段 0.2 已配置路径别名（@backpack/*），所有组件导入已经使用别名。

## 交付物

- [ ] 单一根 package.json（包含所有依赖和发布配置）
- [ ] packages/package.json 已删除
- [ ] 单一 package-lock.json
- [ ] postinstall hook 已移除
- [ ] 更新的配置文件（Jest、Storybook、GitHub Actions 等）
- [ ] 验证 `npm install` 在根目录正常工作
