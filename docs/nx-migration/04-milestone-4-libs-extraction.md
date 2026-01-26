# Milestone 4: Libraries 提取与模块边界

**状态**: Not Started  
**估算**  
**信心度**: 60%  
**前置条件**: Milestone 3 完成

---

## 重要说明

**关于发布流程**: 是否采用 `nx release` 尚未最终决定。Milestone 4 中的 Phase 3 (发布流程改进) 为**可选项**。团队可以选择：
- **选项 A**: 保持现有的 GitHub Actions + npm publish 流程
- **选项 B**: 迁移到 nx release (需要更多调研和对齐)

建议在 Milestone 3 完成后再做最终决策。

---

## 目标 (Goals)

1. **解决 Blocker 4: 依赖管理标准化**
2. **配置模块边界**: 使用 `@nx/enforce-module-boundaries`
3. **发布流程改进** (可选): 可考虑采用 `nx release`，但保留现有流程也可
4. **Conventional Commits**: 强制执行规范化提交消息
5. **依赖审计**: 所有 deps 移到根 package.json
6. **Library Tags**: 定义和应用项目 tags

**价值**: 符合 Production Standards,发布流程改进,清晰的架构约束

---

## 前置条件 (Prerequisites)

- [ ] Milestone 3 完成 (导入结构已标准化)
- [ ] 所有项目有 `project.json`
- [ ] TypeScript paths 配置正确
- [ ] Nx affected 能准确识别变更

---

## 任务清单 (Tasks)

### Phase 1: 依赖管理标准化 (Week 1-2)

#### Task 4.1: 依赖审计与重组



**当前状态**:
```json
// 根 package.json - 只有 devDependencies
{
  "devDependencies": {
    "webpack": "^5.0.0",
    "@nx/workspace": "^18.0.0"
  }
}

// packages/package.json - 所有 production deps
{
  "dependencies": {
    "react": "^18.0.0",
    "@floating-ui/react": "^0.24.0"
  }
}
```

**目标状态** (符合 Production Standard):
```json
// 根 package.json - 所有 deps
{
  "dependencies": {
    "react": "^18.0.0",
    "@floating-ui/react": "^0.24.0"
  },
  "devDependencies": {
    "webpack": "^5.0.0",
    "@nx/workspace": "^18.0.0"
  }
}

// libs/button/package.json - 声明使用的 deps
{
  "dependencies": {
    "react": "^18.0.0",
    "@floating-ui/react": "^0.24.0"
  }
}
```

**步骤**:
1. **分析每个组件的实际依赖**:
   ```bash
   npx depcheck libs/button
   # 识别真正使用的 dependencies
   ```

2. **创建迁移脚本**:
   ```javascript
   // scripts/migrate-dependencies.js
   // 1. 将 packages/package.json deps 移到根
   // 2. 为每个组件创建最小 package.json
   // 3. 只包含该组件实际使用的 deps
   ```

3. **执行迁移**:
   ```bash
   node scripts/migrate-dependencies.js
   npm install  # 重新安装
   ```

4. **验证**:
   ```bash
   nx run-many --target=build --all
   # 确保所有组件仍能构建
   ```

**验收标准**:
- [ ] 根 package.json 包含所有 dependencies
- [ ] 每个库有自己的 package.json (声明使用的 deps)
- [ ] `packages/package.json` 删除或仅作为元数据
- [ ] 所有构建通过

#### Task 4.2: 配置 @nx/dependency-checks



**步骤**:
1. **在根 .eslintrc 添加规则**:
   ```json
   {
     "overrides": [
       {
         "files": ["**/package.json"],
         "parser": "jsonc-eslint-parser",
         "rules": {
           "@nx/dependency-checks": [
             "error",
             {
               "buildTargets": ["build"],
               "checkMissingDependencies": true,
               "checkObsoleteDependencies": true,
               "checkVersionMismatches": true
             }
           ]
         }
       }
     ]
   }
   ```

2. **运行检查**:
   ```bash
   nx run-many --target=lint --all
   # 会报告 missing/obsolete/mismatched deps
   ```

3. **修复所有问题**

**验收标准**:
- [ ] `@nx/dependency-checks` 规则启用
- [ ] Lint 通过,无依赖问题
- [ ] CI 强制执行

---

### Phase 2: 模块边界配置 (Week 2-3)

#### Task 4.3: 定义项目 Tags



**Tag 维度设计**:

| 维度 | Tags | 说明 |
|------|------|------|
| **类型** | `type:component`, `type:foundation`, `type:util`, `type:asset` | 项目类型 |
| **领域** | `domain:ui`, `domain:layout`, `domain:form`, `domain:media` | 业务领域 |
| **环境** | `env:browser`, `env:node`, `env:universal` | 运行环境 |
| **可见性** | `scope:public`, `scope:internal`, `scope:private` | 访问范围 |

**应用 Tags**:
```json
// libs/button/project.json
{
  "tags": [
    "type:component",
    "domain:ui",
    "env:browser",
    "scope:public"
  ]
}

// libs/mixins/project.json
{
  "tags": [
    "type:foundation",
    "domain:styles",
    "env:universal",
    "scope:public"
  ]
}
```

#### Task 4.4: 配置依赖约束



**在根 .eslintrc 配置规则**:
```json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "type:component",
            "onlyDependOnLibsWithTags": [
              "type:component",
              "type:foundation",
              "type:util",
              "type:asset"
            ]
          },
          {
            "sourceTag": "type:foundation",
            "onlyDependOnLibsWithTags": [
              "type:foundation",
              "type:util"
            ]
          },
          {
            "sourceTag": "type:util",
            "onlyDependOnLibsWithTags": ["type:util"]
          },
          {
            "sourceTag": "env:browser",
            "onlyDependOnLibsWithTags": [
              "env:browser",
              "env:universal"
            ]
          },
          {
            "sourceTag": "env:universal",
            "onlyDependOnLibsWithTags": ["env:universal"]
          },
          {
            "sourceTag": "scope:private",
            "onlyDependOnLibsWithTags": ["scope:private"]
          }
        ]
      }
    ]
  }
}
```

**测试约束**:
```bash
# 故意违反约束,验证会被阻止
# 如: 让 foundation 依赖 component
nx lint mixins
# 应该报错
```

**验收标准**:
- [ ] 所有项目有合适的 tags
- [ ] 依赖约束规则配置
- [ ] Lint 强制执行约束
- [ ] 文档说明 tag 含义和规则

---

### Phase 3: 发布流程改进 (可选) (Week 3-4)

#### Task 4.5: 配置 Conventional Commits



**步骤**:
1. **安装工具**:
   ```bash
   npm install -D @commitlint/cli @commitlint/config-conventional
   npm install -D husky
   ```

2. **配置 commitlint**:
   ```javascript
   // commitlint.config.js
   module.exports = {
     extends: ['@commitlint/config-conventional'],
     rules: {
       'type-enum': [
         2,
         'always',
         ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
       ]
     }
   };
   ```

3. **设置 husky hook**:
   ```bash
   npx husky init
   echo "npx commitlint --edit \$1" > .husky/commit-msg
   ```

4. **测试**:
   ```bash
   git commit -m "invalid message"
   # 应该被拒绝

   git commit -m "feat: add new button variant"
   # 应该成功
   ```

**验收标准**:
- [ ] Conventional commits 强制执行
- [ ] 提交消息格式正确
- [ ] CI 验证提交历史

#### Task 4.6: 发布流程改进 (可选 - 如果决定采用 nx release)

> **⚠️ 决策待定**: 本任务仅在团队决定采用 nx release 时执行。
> 如果决定保留现有发布流程，可跳过此任务。



**步骤**:
1. **配置 nx.json**:
   ```json
   {
     "release": {
       "projects": ["libs/*"],
       "projectsRelationship": "independent",
       "changelog": {
         "workspaceChangelog": {
           "createRelease": "github",
           "file": "{workspaceRoot}/CHANGELOG.md"
         },
         "projectChangelogs": true
       },
       "version": {
         "conventionalCommits": true,
         "generatorOptions": {
           "packageRoot": "dist/{projectRoot}",
           "currentVersionResolver": "git-tag"
         }
       }
     }
   }
   ```

2. **更新 build target 输出**:
   ```json
   // libs/button/project.json
   {
     "targets": {
       "build": {
         "outputs": ["{options.outputPath}"],
         "options": {
           "outputPath": "dist/libs/button",
           "main": "libs/button/src/index.ts",
           "tsConfig": "libs/button/tsconfig.lib.json",
           "packageJson": "libs/button/package.json"
         }
       }
     }
   }
   ```

3. **测试影子发布** (dry-run):
   ```bash
   nx release --dry-run
   # 检查版本计算
   # 检查 changelog 生成
   ```

4. **更新 GitHub Actions**:
   ```yaml
   # .github/workflows/release.yml
   name: Release

   on:
     push:
       tags:
         - 'v*'

   jobs:
     release:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
           with:
             fetch-depth: 0

         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             registry-url: 'https://registry.npmjs.org'

         - run: npm ci
         - run: nx run-many --target=build --all
         - run: nx release publish
           env:
             NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
             GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
   ```

**验收标准**:
- [ ] 发布流程决策明确 (是否使用 nx release)
- [ ] Dry-run 测试通过
- [ ] Changelog 自动生成
- [ ] GitHub Releases 创建
- [ ] NPM 发布成功
- [ ] 版本号遵循 semver + conventional commits

---

## 风险与缓解 (Risks & Mitigation)

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 依赖迁移破坏构建 | High | 影子安装测试,逐个组件验证 |
| 模块边界规则过严 | Medium | 允许临时例外,逐步收紧 |
| 发布流程失败 | High | 充分 dry-run 测试,保留旧流程备用 |
| 版本计算错误 | High | 手动验证前几次发布 |
| Changelog 噪音多 | Low | 配置过滤规则,忽略 chore commits |

---

## 验收标准 (Acceptance Criteria)

### Must Have
- [ ] 所有 production deps 在根 package.json
- [ ] 每个库声明自己的 dependencies
- [ ] `@nx/dependency-checks` 强制执行
- [ ] 所有项目有 tags
- [ ] `@nx/enforce-module-boundaries` 强制执行
- [ ] Conventional commits 强制执行
- [ ] 发布流程配置完成 (根据决策)
- [ ] 发布到 NPM 成功

### Should Have
- [ ] Changelog 自动生成
- [ ] GitHub Releases 自动创建
- [ ] 文档说明发布流程

### Nice to Have
- [ ] 版本预览 (在 PR 中显示将要发布的版本)
- [ ] 自动化 breaking change 检测

---

## 交付产物 (Deliverables)

1. **更新的依赖结构**: 根 + 每个库的 package.json
2. **Tag 定义文档**: `docs/nx-migration/TAGS_AND_BOUNDARIES.md`
3. **发布指南**: `docs/nx-migration/RELEASE_GUIDE.md`
4. **配置文件**: `commitlint.config.js`, 更新的 `nx.json`
5. **CI workflows**: 更新的 `.github/workflows/release.yml`

---

## 后续步骤 (Next Steps)

完成 Milestone 4 后,Nx 核心功能已全部就绪!

可选地进入 [Milestone 5: 优化与增强](./05-milestone-5-optimization.md) 进行进一步优化。
