# 阶段 5：转换静态检查和脚本

**依赖于**：阶段 4

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 安装 Nx 插件 | 必需 | 提供 lint/test/storybook executors |
| 2. 配置 lint target | 必需 | 集成 ESLint 和 Stylelint，启用缓存 |
| 3. 配置 test target | 必需 | Jest 通过 Nx 运行，支持 affected 和缓存 |
| 4. 配置 typecheck target | 必需 | TypeScript 检查通过 Nx，支持增量检查 |
| 5. 配置 build target | 必需 | 通过 Nx 构建，支持依赖链和缓存 |
| 6. 配置 storybook target | 必需 | Storybook 通过 Nx 运行 |
| 7. 更新 GitHub Actions | 必需 | CI 使用 nx affected，显著减少 CI 时间 |
| 8. 集成 lint-staged | 必需 | Git hooks 使用 nx affected |
| 9. 更新 package.json 脚本 | 必需 | 保持向后兼容，渐进式迁移 |

## 需要迁移的脚本

| 当前脚本 | Nx Target | Nx 命令 |
|---------------|-----------|------------|
| lint:js | lint | nx affected --target=lint |
| lint:scss | lint | 集成到 lint target |
| jest | test | nx affected --target=test |
| typecheck | typecheck | nx affected --target=typecheck |
| build | build | nx run-many --target=build |
| storybook | storybook | nx storybook |

## 步骤

### 1. 安装 Nx 插件
- @nx/jest（测试）
- @nx/eslint（linting）
- @nx/storybook（文档）
- 其他需要的插件

### 2. 配置 lint Target
- 在 project.json 或 nx.json targetDefaults 中配置 lint
- 集成 ESLint 和 Stylelint
- 配置 executor 为 @nx/eslint:lint
- 设置 inputs 和 cache

### 3. 配置 test Target
- 在 project.json 或 nx.json targetDefaults 中配置 test
- 配置 executor 为 @nx/jest:jest
- 设置 inputs 和 cache
- 确保 TZ=Etc/UTC 和 coverage 参数

### 4. 配置 typecheck Target
- 配置 executor 为 @nx/js:tsc 或自定义命令
- 设置 inputs 和 cache

### 5. 配置 build Target
- 根据构建工具（Babel/Gulp）配置 executor
- 设置依赖链（dependsOn: ["^build", "generate"]）
- 确保代码生成在构建前执行
- 设置 inputs、outputs 和 cache

### 6. 配置 storybook Target
- 使用 @nx/storybook:storybook executor
- 配置 dev 和 build 模式

### 7. 更新 GitHub Actions
- 将 npm run test 改为 nx affected --target=test
- 将 npm run lint:js 改为 nx affected --target=lint
- 将 npm run build 改为 nx run-many --target=build --all
- 使用 nx affected 减少 CI 时间

### 8. 集成 lint-staged
- 编辑 .husky 和 lint-staged 配置
- 使用 nx affected 命令
- 或保留现有 lint-staged，渐进式迁移

### 9. 更新 package.json 脚本
- 保留现有脚本作为别名
- 指向对应的 nx 命令
- 保持向后兼容

## 交付物

- [ ] 所有 target 配置完成
- [ ] GitHub Actions 已更新
- [ ] lint-staged 配置已集成
- [ ] package.json 脚本已更新
