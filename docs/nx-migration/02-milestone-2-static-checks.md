# Milestone 2: 静态检查迁移到 Nx

**状态**: Not Started
**估算**
**信心度**: 75%
**前置条件**: Milestone 1 完成

---

## 目标 (Goals)

1. **ESLint 通过 Nx 执行**: 使用 `@nx/eslint` 插件
2. **Stylelint 通过 Nx 执行**: 配置 Stylelint 为 Nx target
3. **TypeScript 类型检查通过 Nx**: 使用 `tsc` 作为 Nx executor
4. **启用 `nx affected`**: 只对受影响的项目运行检查
5. **CI 集成**: 更新 GitHub Actions 使用 Nx 命令

**价值**:
- 本地缓存加速重复检查
- CI 时间减少 (只检查受影响的项目)
- 为后续 Nx 功能铺路

---

## 任务清单 (Tasks)

### Task 2.1: 迁移 ESLint 到 Nx



#### 步骤:

1. **安装 Nx ESLint 插件**
   ```bash
   npm install -D @nx/eslint-plugin @nx/eslint
   ```

2. **为每个项目添加 lint target**

   在每个组件的 `project.json` 中添加:
   ```json
   {
     "targets": {
       "lint": {
         "executor": "@nx/eslint:lint",
         "outputs": ["{options.outputFile}"],
         "options": {
           "lintFilePatterns": ["libs/components/button/**/*.{ts,tsx,js,jsx}"]
         }
       }
     }
   }
   ```

3. **更新根 `.eslintrc`**

   添加 Nx 特定规则:
   ```json
   {
     "plugins": ["@nx"],
     "overrides": [
       {
         "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
         "rules": {
           "@nx/enforce-module-boundaries": ["error", {
             "allow": [],
             "depConstraints": []
           }]
         }
       }
     ]
   }
   ```

4. **测试本地执行**
   ```bash
   # 单个项目
   nx lint button

   # 所有项目
   nx run-many --target=lint --all

   # 只受影响的项目
   nx affected --target=lint
   ```

5. **验证缓存**

   运行两次相同命令,第二次应该使用缓存:
   ```bash
   nx lint button
   # [local cache]
   ```

#### 验收标准:
- [ ] 所有组件有 `lint` target
- [ ] `nx lint <project>` 成功运行
- [ ] `nx affected --target=lint` 正确识别受影响项目
- [ ] 本地缓存工作
- [ ] ESLint 输出与之前一致

#### 潜在问题:
- **路径解析**: 确保 `lintFilePatterns` 正确
- **配置继承**: 验证项目级配置继承根配置
- **插件兼容性**: 某些 ESLint 插件可能需要更新

---

### Task 2.2: 迁移 Stylelint 到 Nx



#### 步骤:

1. **安装 Nx Stylelint 插件** (社区插件)
   ```bash
   npm install -D nx-stylelint
   ```

2. **为 SCSS 组件添加 stylelint target**

   ```json
   {
     "targets": {
       "stylelint": {
         "executor": "nx-stylelint:lint",
         "outputs": ["{options.outputFile}"],
         "options": {
           "lintFilePatterns": ["libs/components/button/**/*.scss"],
           "config": ".stylelintrc.json"
         }
       }
     }
   }
   ```

3. **为共享 SCSS (mixins, stylesheets) 添加特殊配置**

   `libs/mixins/project.json`:
   ```json
   {
     "targets": {
       "stylelint": {
         "executor": "nx-stylelint:lint",
         "options": {
           "lintFilePatterns": ["libs/mixins/**/*.scss"]
         }
       }
     }
   }
   ```

4. **测试执行**
   ```bash
   nx run-many --target=stylelint --all
   nx affected --target=stylelint
   ```

#### 验收标准:
- [ ] 所有 SCSS 组件有 `stylelint` target
- [ ] `nx affected --target=stylelint` 工作
- [ ] Stylelint 输出与之前一致
- [ ] 缓存工作

#### 潜在问题:
- **Glob 模式**: 确保匹配所有 SCSS 文件
- **配置路径**: 相对路径可能需要调整
- **自定义规则**: 验证 `@skyscanner/stylelint-config-skyscanner` 兼容

---

### Task 2.3: 迁移 TypeScript 类型检查到 Nx



#### 步骤:

1. **为每个项目添加 typecheck target**

   ```json
   {
     "targets": {
       "typecheck": {
         "executor": "nx:run-commands",
         "options": {
           "command": "tsc --noEmit --project libs/components/button/tsconfig.json"
         }
       }
     }
   }
   ```

   或使用 `@nx/js`:
   ```json
   {
     "targets": {
       "typecheck": {
         "executor": "@nx/js:tsc",
         "outputs": [],
         "options": {
           "tsConfig": "libs/components/button/tsconfig.json",
           "noEmit": true
         }
       }
     }
   }
   ```

2. **设置依赖关系**

   对于有 project references 的项目:
   ```json
   {
     "targets": {
       "typecheck": {
         "dependsOn": ["^typecheck"]
       }
     }
   }
   ```

3. **测试类型检查**
   ```bash
   nx run-many --target=typecheck --all
   nx affected --target=typecheck
   ```

#### 验收标准:
- [ ] 所有 TypeScript 项目有 `typecheck` target
- [ ] `nx affected --target=typecheck` 正确工作
- [ ] 类型错误与之前一致
- [ ] Project references 依赖正确

#### 潜在问题:
- **Composite 配置**: 如果启用 `composite: true`,可能遇到 `.d.ts` 生成问题 (见 Blocker 调查)
- **路径映射**: 确保 `tsconfig.json` 中的 paths 正确
- **Incremental builds**: 可能需要配置 `tsBuildInfoFile`

---

### Task 2.4: 更新根级脚本



#### 步骤:

1. **更新 `package.json` 脚本**

   Before:
   ```json
   {
     "scripts": {
       "lint": "npm run lint:js && npm run lint:scss",
       "lint:js": "eslint . --ext .js,.jsx,.ts,.tsx",
       "lint:scss": "stylelint 'packages/**/*.scss'",
       "typecheck": "tsc"
     }
   }
   ```

   After:
   ```json
   {
     "scripts": {
       "lint": "nx run-many --target=lint --all",
       "lint:affected": "nx affected --target=lint",
       "lint:js": "nx run-many --target=lint --all",
       "lint:scss": "nx run-many --target=stylelint --all",
       "typecheck": "nx run-many --target=typecheck --all",
       "typecheck:affected": "nx affected --target=typecheck"
     }
   }
   ```

2. **添加便捷脚本**
   ```json
   {
     "scripts": {
       "affected": "nx affected",
       "affected:graph": "nx affected:graph"
     }
   }
   ```

#### 验收标准:
- [ ] `npm run lint` 工作
- [ ] `npm run typecheck` 工作
- [ ] 新脚本与旧行为一致

---

### Task 2.5: 更新 CI/CD 管道



#### 步骤:

1. **更新 GitHub Actions - PR workflow**

   `.github/workflows/pr.yml`:
   ```yaml
   name: PR Checks

   on:
     pull_request:
       branches: [main]

   jobs:
     lint-and-typecheck:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
           with:
             fetch-depth: 0  # 需要完整历史用于 nx affected

         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'

         - run: npm ci

         # 设置 Nx 基准 (base)
         - run: npx nx-set-shas@latest

         # 只检查受影响的项目
         - run: nx affected --target=lint --parallel=3
         - run: nx affected --target=stylelint --parallel=3
         - run: nx affected --target=typecheck --parallel=3
   ```

2. **更新主分支 workflow**

   `.github/workflows/main.yml`:
   ```yaml
   jobs:
     lint-and-typecheck:
       steps:
         # ... checkout, setup ...

         # 主分支检查所有项目
         - run: nx run-many --target=lint --all --parallel=3
         - run: nx run-many --target=stylelint --all --parallel=3
         - run: nx run-many --target=typecheck --all --parallel=3
   ```

3. **配置 Nx Cloud (可选)**

   如果启用 Nx Cloud:
   ```yaml
   - run: npx nx-cloud start-ci-run
   - run: nx affected --target=lint
   # Nx Cloud 自动上传缓存和结果
   ```

4. **移除旧的 CI cache 逻辑**

   删除手动 node_modules 缓存 (Nx 会处理)

#### 验收标准:
- [ ] PR 检查只运行受影响的项目
- [ ] 主分支检查运行所有项目
- [ ] CI 时间有明显改善 (记录 baseline vs new)
- [ ] 所有检查通过

#### 潜在问题:
- **fetch-depth**: 必须设置为 0 才能让 `nx affected` 正确工作
- **Base 计算**: `nx-set-shas` 可能需要根据分支策略调整
- **并行度**: 根据 CI runner 调整 `--parallel` 参数

---

### Task 2.6: 性能基准测试



#### 步骤:

1. **记录迁移前的 baseline**

   ```bash
   # 本地 (冷启动)
   time npm run lint
   time npm run typecheck

   # CI
   # 记录 PR 平均检查时间
   ```

2. **迁移后测试**

   ```bash
   # 本地 (冷启动)
   time nx run-many --target=lint --all
   time nx run-many --target=typecheck --all

   # 本地 (热启动,使用缓存)
   time nx run-many --target=lint --all

   # Affected
   # 修改单个文件后
   time nx affected --target=lint
   ```

3. **CI 时间对比**

   - PR 全量检查时间
   - PR affected 检查时间
   - 缓存命中率

4. **文档化结果**

   创建 `docs/nx-migration/PERFORMANCE.md` 记录:
   - Before/After 对比
   - 不同场景的收益
   - 预期的长期收益

#### 验收标准:
- [ ] 有明确的性能数据
- [ ] 热启动明显快于冷启动
- [ ] Affected 明显快于全量检查
- [ ] CI 时间有改善或持平 (不应变慢)

---

## 风险与缓解 (Risks & Mitigation)

| 风险 | 影响 | 可能性 | 缓解措施 |
|------|------|--------|----------|
| ESLint 插件不兼容 | High | Low | 提前测试常用插件,准备降级方案 |
| CI 配置错误导致检查遗漏 | High | Medium | 双轨运行一段时间,对比结果 |
| 性能没有改善 | Medium | Low | 调整 Nx 配置,优化 cache 策略 |
| TypeScript composite 问题 | High | Medium | 调查 Global Components 经验,准备替代方案 |
| 贡献者不熟悉 Nx 命令 | Low | High | 更新文档,保留 npm scripts 别名 |

---

## 验收标准 (Acceptance Criteria)

### 功能验收
- [ ] 所有项目有 `lint`, `stylelint`, `typecheck` targets
- [ ] `nx run-many --target=<target> --all` 成功运行
- [ ] `nx affected --target=<target>` 正确识别受影响项目
- [ ] 本地缓存工作,第二次运行使用缓存
- [ ] CI/CD 集成 Nx 命令
- [ ] 所有检查输出与之前一致 (无新增错误)

### 性能验收
- [ ] 本地热启动比冷启动快 >50%
- [ ] Affected 检查比全量检查快 >70% (修改单个文件场景)
- [ ] CI 时间改善或持平
- [ ] 有性能基准文档

### 文档验收
- [ ] 更新 CONTRIBUTING.md 说明 Nx 命令
- [ ] 更新 README.md 的开发指南
- [ ] 性能基准文档存在
- [ ] 常见问题 FAQ

---

## 回滚计划 (Rollback Plan)

如果 Milestone 2 遇到严重问题:

1. **短期回滚** 
   - 恢复 `package.json` 中的原始脚本
   - CI 使用旧的 npm run 命令
   - Nx 配置保留但不使用

2. **中期调查** ((时间待定))
   - 定位问题根因
   - 与 Web Enablement 团队协作
   - 测试修复方案

3. **长期替代**
   - 考虑分阶段启用 (先 ESLint,后 Stylelint/TypeScript)
   - 或推迟到更多调查完成后

**回滚触发条件**:
- CI 时间显著增加 (>30%)
- 频繁的假阳性/假阴性
- 严重影响开发体验 (如缓存不工作)

---

## 后续步骤 (Next Steps)

完成 Milestone 2 后,进入 [Milestone 3: 包结构重组与导入结构调整](./03-milestone-3-package-restructure.md)

---

## 参考资料 (References)

- [Nx ESLint Plugin](https://nx.dev/nx-api/eslint-plugin)
- [Nx: Run Tasks](https://nx.dev/features/run-tasks)
- [Nx: Affected](https://nx.dev/ci/features/affected)
- [nx-stylelint Plugin](https://www.npmjs.com/package/nx-stylelint)
- [Banana Static Checks Migration](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1362971958) (参考 Stage 2.1)
- [Hotels Website Stage 1](https://skyscanner.atlassian.net/wiki/spaces/BD/pages/1275827279)
