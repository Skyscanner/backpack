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
3. nx release（自动计算版本号）
4. 生成 CHANGELOG.md
5. 创建 git tag
6. nx release publish（发布到 npm）

## 步骤

### 1. 配置 nx release
- 编辑 nx.json
- 添加 release 配置
```json
{
  "release": {
    "projects": ["@skyscanner/backpack-web"],
    "version": {
      "conventionalCommits": true
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github"
      }
    }
  }
}
```

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
- 从 GitHub Release tag → conventional commits 计算
- 决定是否保留手动 Release 作为触发点
- 或完全自动化（PR 合并触发）

### 5. 迁移 Changelog 生成
- 从 release-drafter → nx release changelog
- 配置 changelog 模板
- 决定 changelog 存储位置

### 6. 创建 GitHub Actions 发布流程
- 创建新工作流或更新现有
- 使用 nx run-many 而不是 nx affected（重要）
- 确保 Release 触发能正确构建所有项目
```yaml
- name: Build all
  run: npx nx run-many --target=build --all

- name: Publish
  run: npx nx release publish
```

### 7. 配置单包发布
- Backpack 是单包发布（@skyscanner/backpack-web）
- 配置 nx release 为单包模式
- 确保 dist/ 输出结构正确

### 8. 创建测试发布流程
- 在非生产分支测试 nx release
- 验证版本号计算正确
- 验证 changelog 生成正确
- 验证 git tag 创建正确
- 使用 --dry-run 模式测试

### 9. 迁移生产发布
- 备份当前发布流程
- 切换到新的 GitHub Actions 工作流
- 执行首次 nx release
- 监控发布流程

### 10. 更新文档
- 更新 CONTRIBUTING.md
- 记录新的 commit 规范
- 记录发布流程变更

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
