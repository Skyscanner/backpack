# 阶段 2：项目结构确认和变更

**依赖于**：阶段 1

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 设计目标结构 | 必需 | 与团队对齐，避免未来返工 |
| 2. 合并 package.json | 必需 | 符合 Nx 单一 package.json 标准 |
| 3. 移除 postinstall hook | 必需 | 不再需要嵌套安装，简化流程 |
| 4. 合并 package-lock.json | 必需 | 单一依赖树，避免版本不一致 |
| 5. 执行目录重组 | 可选 | 取决于步骤 1 的设计决策 |
| 6. 更新配置文件 | 必需 | 配置文件需要指向新的目录结构 |
| 7. 更新导入路径 | 可选 | 如果目录重组则必需，否则依赖阶段 0.2 的别名 |

## 当前问题

- 根目录和 packages/ 目录各有 package.json 和 package-lock.json
- postinstall hook：`(cd packages && npm install)`
- 91 个组件目录需要考虑是否重组

## 步骤

### 1. 设计目标结构
- 与 PE 和 Web Enablement 团队对齐
- 决定是否保持当前 packages/ 布局
- 或采用新的分类结构（例如 libs/components、libs/mixins、libs/utils）
- 创建项目结构草案文档

### 2. 合并 package.json
- 将 packages/package.json 的 dependencies 移至根 package.json
- 将 packages/package.json 的 devDependencies 移至根 devDependencies
- 保留 packages/package.json 的元数据（name、version 等）用于发布
- 或完全移除 packages/package.json（取决于发布策略）

### 3. 移除 postinstall Hook
- 从根 package.json 删除 postinstall 脚本
- 验证只需在根目录运行 npm install

### 4. 合并 package-lock.json
- 删除 packages/package-lock.json
- 删除根 package-lock.json
- 运行 npm install 重新生成单一锁文件

### 5. 执行目录重组（如果需要）
- 根据设计文档使用 git mv 移动目录
- 或使用 nx workspace:move（Nx 提供的工具）
- 保持 git 历史

### 6. 更新配置文件
- 更新 Jest 配置中的路径
- 更新 Storybook 配置中的路径
- 更新 ESLint/Prettier 配置
- 更新 GitHub Actions 中的路径引用

### 7. 更新导入路径（如果目录有重大变更）
- 运行 TypeScript 编译查找错误
- 使用批量替换工具修复导入
- 或依赖阶段 0.2 的路径别名（推荐）

## 交付物

- [ ] 项目结构草案文档
- [ ] 单一 package.json
- [ ] 单一 package-lock.json
- [ ] 更新的配置文件
- [ ] 重组后的目录结构
