# 阶段 7：使用 Nx Release

**依赖于**：阶段 6

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 配置 nx release | 必需 | 启用 Nx 发布管理，支持 conventional commits |
| 2. 配置 conventional commits | 必需 | 自动计算版本号，符合生产标准 |
| 3. 配置 Husky hook | 必需 | 强制团队遵循 commit 规范 |
| 4. 迁移版本管理 | 必需 | 从手动标签到自动计算 |
| 5. 迁移 changelog | 必需 | 从 release-drafter 到 nx release |
| 6. 创建 GitHub Actions | 必需 | 自动化发布流程 |
| 7. 配置单包发布 | 必需 | Backpack 是单包，需要特殊配置 |
| 8. 测试发布流程 | 必需 | 在非生产环境验证，降低风险 |
| 9. 迁移生产发布 | 必需 | 切换到 nx release |
| 10. 更新文档 | 必需 | 团队了解新的 commit 和发布规范 |

## 当前发布流程

1. 手动创建 GitHub Release
2. GitHub Actions 监听 release.published 事件
3. 从 Release tag 获取版本号
4. npm run transpile → cd dist → npm version → npm publish

## 目标发布流程

1. 开发者提交（conventional commits）
2. PR 合并到 main
3. **手动创建 GitHub Release**（触发点，与现有流程一致）
4. GitHub Actions 触发：
   - 运行 `nx run-many --target=build --all`
   - 从 dist/ 发布到 npm（使用 publishConfig.directory）
   - 生成/更新 CHANGELOG.md
5. nx release 管理版本号和 changelog

## 步骤

### 1. 配置 nx release

**为什么**：启用 Nx release 管理版本和 changelog，使用 conventional commits 自动化。

**做什么**：
- 编辑 [nx.json](../../nx.json)
- 添加 release 配置

```json
{
  "release": {
    "projects": ["@skyscanner/backpack-web"],
    "version": {
      "conventionalCommits": true,
      "generatorOptions": {
        "currentVersionResolver": "git-tag"
      }
    },
    "changelog": {
      "workspaceChangelog": {
        "file": "CHANGELOG.md",
        "createRelease": false
      }
    }
  }
}
```

**配置说明**：
- `conventionalCommits: true` - 使用 conventional commits 计算版本
- `currentVersionResolver: "git-tag"` - 从 git tag 读取当前版本
- `file: "CHANGELOG.md"` - changelog 存储在根目录
- `createRelease: false` - 不自动创建 GitHub Release（保持手动触发）

### 2. 配置 conventional commits
- 安装 commitizen 和 @commitlint/cli
- 创建 commitlint.config.js
- 配置 commit-msg hook（复用现有 Husky 9.1.3）
- 添加 .husky/commit-msg 脚本

### 3. 配置 Husky commit-msg Hook
- 编辑 .husky/commit-msg
- 调用 commitlint 验证 commit message 格式
- 确保团队遵循 conventional commits

### 4. 迁移版本管理
- 从 GitHub Release tag → conventional commits 自动计算
- 保持现有触发方式：手动创建 GitHub Release 触发发布流程
- 版本号从 Release tag 获取（与现有流程一致）

**为什么保留手动触发**：
- 生产发布需要人工审核和决策
- 与当前团队流程一致，降低迁移风险
- 避免意外的自动发布

### 5. 迁移 Changelog 生成
- 从 release-drafter → nx release changelog
- 配置 changelog 模板使用 conventional commits
- Changelog 存储位置：根目录 `CHANGELOG.md`
- 每次发布时自动更新

### 6. 更新 GitHub Actions 发布流程

**为什么**：将现有手动发布流程迁移到 nx release，保持相同的触发方式（GitHub Release）。

**做什么**：
- 编辑 [.github/workflows/release.yml](../../.github/workflows/release.yml)
- 替换现有的构建和发布步骤

**关键更改**：
```yaml
# 旧流程（移除）：
# - run: npm run transpile
# - run: cd dist && npm version $RELEASE_VERSION && npm publish

# 新流程（添加）：
- name: Build all projects
  run: npx nx run-many --target=build --all  # 必须用 run-many，不能用 affected

- name: Generate changelog
  run: npx nx release changelog --version=${{ github.event.release.tag_name }}

- name: Publish to npm
  run: |
    cd dist
    npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

**重要**：使用 `nx run-many --all` 而非 `nx affected`，因为 GitHub Release 触发时可能没有代码变更。

### 7. 配置单包发布

**为什么**：Backpack 发布单一 npm 包（@skyscanner/backpack-web），不是 monorepo 多包发布。

**做什么**：
- 确认根 package.json 已包含发布配置（Phase 2 完成）：
```json
{
  "name": "@skyscanner/backpack-web",
  "version": "21.0.1",
  "publishConfig": {
    "directory": "./dist",
    "access": "public"
  }
}
```
- 验证 dist/ 输出包含所有必要文件（transpile 构建输出）
- 不需要为 91 个组件单独配置 nx release（它们合并在一个包中）

### 8. 测试发布流程

**为什么**：在生产环境切换前验证新流程，降低风险。

**做什么**：
- 在测试分支创建测试 GitHub Release（使用 pre-release 标记）
- 验证 GitHub Actions 工作流触发
- 验证构建流程（`nx run-many --target=build --all`）
- 使用 `--dry-run` 测试 changelog 生成：
```bash
npx nx release changelog --version=21.0.2 --dry-run
```
- 验证生成的 CHANGELOG.md 内容正确
- 验证 npm publish 流程（可发布到测试 registry 或使用 --dry-run）

### 9. 迁移生产发布

**为什么**：确保平滑过渡，准备回滚方案。

**做什么**：
- 备份当前 .github/workflows/release.yml（创建 release.yml.backup）
- 合并更新后的 release.yml 到 main 分支
- 执行首次使用 nx release 的生产发布：
  1. 创建 GitHub Release（如 v21.1.0）
  2. 监控 GitHub Actions 执行
  3. 验证 npm 包发布成功
  4. 验证 CHANGELOG.md 已生成/更新
- 如果失败，回滚到 release.yml.backup

### 10. 更新文档

**为什么**：团队需要了解新的 commit 规范和发布流程变更。

**做什么**：
- 更新 CONTRIBUTING.md：
  - 添加 conventional commits 规范说明
  - 列出常用 commit 类型（feat、fix、chore、docs 等）
  - 说明如何触发 commitlint 验证
- 更新发布文档：
  - 记录新的发布流程（手动创建 Release → GitHub Actions）
  - 说明版本号如何从 conventional commits 计算
  - 说明 CHANGELOG.md 自动生成机制
- 创建 troubleshooting 指南（常见问题和解决方案）

## 重要注意事项

### 使用 run-many 而不是 affected
因为 GitHub Release 触发可能没有代码变更，必须使用：
```bash
nx run-many --target=build --all
```
而不是：
```bash
nx affected --target=build  # ❌ 可能什么都不构建
```

## 交付物

- [ ] nx.json release 配置
- [ ] commitlint 配置
- [ ] Husky commit-msg hook
- [ ] 新的 GitHub Actions 工作流
- [ ] 测试发布验证通过
- [ ] 生产发布流程切换
- [ ] 更新的文档
