# 阶段 1：Nx 初始化

**依赖于**：阶段 0.4

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 安装 Nx | 必需 | 初始化 Nx 工作空间，解锁 affected 和缓存功能 |
| 2. 配置 nx.json | 必需 | 定义缓存策略、任务默认值和依赖图规则 |
| 3. 更新 .gitignore | 必需 | 避免将 Nx 缓存目录提交到 git |
| 4. 配置 TypeScript | 必需 | 确认 tsconfig 引用关系正确 |
| 5. 更新 CI 缓存 | 必需 | 添加 Nx 缓存，加速 CI 构建 |
| 6. 添加 Nx 脚本 | 必需 | 提供便捷的 Nx 命令别名 |
| 7. 创建迁移日志 | 必需 | 记录迁移过程以便追踪和回滚 |

## 步骤

### 1. 安装 Nx
- 安装 nx 和 @nx/workspace
- 运行 nx init

### 2. 配置 nx.json
- 创建 nx.json
- 配置 defaultBase 为 main
- 配置 namedInputs（default、production、sharedGlobals）
- 配置 targetDefaults（build、test、lint、typecheck）
- 配置 tasksRunnerOptions（缓存目录和可缓存操作）

### 3. 更新 .gitignore
- 添加 .nx/cache
- 添加 .nx/workspace-data

### 4. 配置 TypeScript
- 确认 tsconfig.base.json 存在（在阶段 0.2 中创建）
- 更新 tsconfig.json 引用 base

### 5. 更新 CI 缓存配置
- 查找所有 GitHub Actions 工作流
- 添加 Nx 缓存配置
- 保留现有的 node_modules 缓存
- 添加 .nx/cache 缓存

### 6. 添加 Nx 脚本
- 编辑 package.json
- 添加 nx、nx:graph、nx:affected、nx:reset、nx:show 脚本

### 7. 创建迁移日志
- 创建 docs/nx-migration-log.md
- 记录阶段 1 完成的操作

## 交付物

- [ ] nx.json 配置文件
- [ ] 更新的 .gitignore
- [ ] 更新的 CI 工作流
- [ ] Nx 辅助脚本
- [ ] 迁移日志
