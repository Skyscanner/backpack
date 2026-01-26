# Milestone 1: Nx 初始化与项目结构确认

**状态**: Not Started
**估算**
**信心度**: 80%
**前置条件**: 无

---

## 目标 (Goals)

1. **建立 Nx workspace**: 创建 `nx.json` 和必要的配置文件
2. **确定目标项目结构**: 与 PE 和相关团队对齐最终的项目组织方式
3. **TypeScript 项目引用**: 设置 TypeScript project references
4. **初步验证**: 确保基本的 Nx 命令可以运行
5. **Blocker 调查**: 调查和验证已知的技术 blockers

**价值**: 为整个迁移奠定基础,无需移动代码即可开始使用 Nx 的基础功能

---

## 前置条件 (Prerequisites)

### 必须完成
- [ ] Node.js >= 18.20.4
- [ ] npm >= 10.7.0
- [ ] 确保 git working directory 干净 (无未提交的更改: `git status` 应该是 clean)
- [ ] 创建feature branch: `feature/nx-migration-milestone-1`

**说明**: 
- 运行 `git status` 应该显示 "nothing to commit, working tree clean"
- 如果有未提交的更改，先 commit 或 stash
- 这样做是为了：
  - 方便回滚 Nx 初始化的更改
  - 清晰地看到 Nx 添加了哪些文件
  - 避免将 Nx 配置与其他工作混在一起

### 推荐完成 (但非阻塞)
- [ ] Sass 迁移 (unstable → stable mixins) - 可节省后续时间
- [ ] Flare TS 采用 - 可节省后续时间
- [ ] Public surface manifest - 可节省后续时间

---

## 任务清单 (Tasks)

### Task 1.1: Nx 安装和初始化


**负责人**: TBD

#### 步骤:

1. **安装 Nx**
   ```bash
   npm install -D nx @nx/workspace@latest
   ```

2. **初始化 Nx workspace**
   ```bash
   npx nx init
   ```

   这会创建:
   - `nx.json` - Nx workspace 配置
   - `.nxignore` - 忽略特定文件/目录

3. **配置 `nx.json`**

   初始配置示例:
   ```json
   {
     "$schema": "./node_modules/nx/schemas/nx-schema.json",
     "affected": {
       "defaultBase": "main"
     },
     "tasksRunnerOptions": {
       "default": {
         "runner": "nx/tasks-runners/default",
         "options": {
           "cacheableOperations": ["build", "lint", "test", "typecheck"]
         }
       }
     },
     "namedInputs": {
       "default": ["{projectRoot}/**/*"],
       "production": [
         "default",
         "!{projectRoot}/**/*.spec.ts",
         "!{projectRoot}/**/*.test.ts",
         "!{projectRoot}/**/test-utils/**/*"
       ]
     },
     "targetDefaults": {
       "build": {
         "dependsOn": ["^build"],
         "inputs": ["production", "^production"],
         "cache": true
       },
       "lint": {
         "inputs": ["default", "{workspaceRoot}/.eslintrc", "{workspaceRoot}/.eslintignore"],
         "cache": true
       },
       "test": {
         "inputs": ["default", "^production"],
         "cache": true
       }
     }
   }
   ```

4. **验证安装**
   ```bash
   npx nx --version
   npx nx list  # 列出可用插件
   ```

#### 验收标准:
- [ ] `nx.json` 文件存在且配置正确
- [ ] `nx --version` 显示版本号
- [ ] `nx list` 显示已安装的插件
- [ ] `.nxignore` 配置合理 (如 `dist/`, `node_modules/`)

#### 潜在问题:
- **npm 权限**: 确保有权限安装包
- **版本冲突**: 某些依赖可能与 Nx 要求的版本冲突

---

### Task 1.2: 项目结构调研与决策


**负责人**: TBD + PE

#### 步骤:

1. **分析当前结构**

   当前 Backpack 结构:
   ```
   packages/
   ├── bpk-component-button/
   ├── bpk-component-card/
   ├── ... (~90 components)
   ├── bpk-mixins/
   ├── bpk-stylesheets/
   ├── bpk-theming/
   ├── bpk-react-utils/
   └── package.json (shared)
   ```

2. **研究参考项目**

   - **Global Components**: 已完成 Nx,可参考其结构
   - **Banana**: 已完成 Nx,参考 libs 组织
   - **Falcon**: 正在进行,可能有新见解

3. **提出候选方案**

   **Option A: 扁平化库结构**
   ```
   libs/
   ├── button/
   ├── card/
   ├── icon/
   ├── ... (~90 libraries)
   ├── mixins/
   ├── stylesheets/
   ├── tokens/
   └── react-utils/
   ```

   **Option B: 分层结构**
   ```
   libs/
   ├── components/
   │   ├── button/
   │   ├── card/
   │   └── ...
   ├── foundation/
   │   ├── mixins/
   │   ├── tokens/
   │   └── stylesheets/
   ├── utilities/
   │   ├── react-utils/
   │   └── theming/
   └── assets/
       ├── icons/
       ├── flare/
       └── spinners/
   ```

   **Option C: 按类型和领域分层**
   ```
   libs/
   ├── ui/          # 纯 UI 组件
   │   ├── button/
   │   └── card/
   ├── media/       # 图形和动画
   │   ├── icon/
   │   ├── flare/
   │   └── spinner/
   ├── layout/      # 布局组件
   │   ├── grid/
   │   └── breakpoint/
   ├── form/        # 表单相关
   │   ├── input/
   │   └── select/
   ├── foundation/  # 基础设施
   │   ├── mixins/
   │   ├── tokens/
   │   └── stylesheets/
   └── utils/
       └── react-utils/
   ```

4. **评估各方案**

   | 方案 | 优点 | 缺点 | 推荐度 |
   |------|------|------|--------|
   | Option A | 简单,迁移容易,Nx affected 粒度细 | 扁平,缺乏组织 | ⭐⭐⭐ |
   | Option B | 清晰分层,易导航 | 层次深,路径长 | ⭐⭐⭐⭐ |
   | Option C | 最符合领域模型,可扩展 | 分类复杂,初期工作量大 | ⭐⭐⭐⭐⭐ |

5. **与团队对齐**

   - [ ] 与 Principal Engineers 讨论
   - [ ] 与 Web Enablement 对齐
   - [ ] 与 Backpack 贡献者沟通
   - [ ] 与消费团队 (Banana, Falcon) 确认兼容性

6. **决策并文档化**

   创建 `docs/nx-migration/ARCHITECTURE.md`:
   - 选择的方案
   - 决策理由
   - 项目分组规则
   - 命名约定
   - 模块边界规则

#### 验收标准:
- [ ] 有明确的目标结构文档
- [ ] 所有 stakeholders 已对齐
- [ ] 有清晰的迁移路径
- [ ] 文档包含项目分类规则和命名约定

#### 潜在问题:
- **意见分歧**: 不同团队可能有不同偏好
- **遗留兼容性**: 现有消费者可能依赖特定结构
- **扩展性**: 结构需要支持未来增长

---

### Task 1.3: 创建初始项目配置


**负责人**: TBD

#### 步骤:

1. **为现有组件创建 `project.json`**

   使用脚本批量生成:
   ```bash
   # scripts/generate-project-configs.js
   const fs = require('fs');
   const path = require('path');

   const packagesDir = path.join(__dirname, '../packages');
   const components = fs.readdirSync(packagesDir)
     .filter(name => name.startsWith('bpk-component-'));

   components.forEach(component => {
     const projectJson = {
       name: component,
       $schema: '../../node_modules/nx/schemas/project-schema.json',
       sourceRoot: `packages/${component}/src`,
       projectType: 'library',
       tags: ['type:component'],
       targets: {}
     };

     const projectJsonPath = path.join(packagesDir, component, 'project.json');
     fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2));
   });
   ```

   运行:
   ```bash
   node scripts/generate-project-configs.js
   ```

2. **为特殊包创建配置**

   手动为以下包创建 `project.json`:
   - `bpk-mixins` → `libs/mixins/project.json`
   - `bpk-stylesheets` → `libs/stylesheets/project.json`
   - `bpk-theming` → `libs/theming/project.json`
   - `bpk-react-utils` → `libs/react-utils/project.json`

   示例 (`libs/mixins/project.json`):
   ```json
   {
     "name": "mixins",
     "$schema": "../../node_modules/nx/schemas/project-schema.json",
     "sourceRoot": "libs/mixins/src",
     "projectType": "library",
     "tags": ["type:foundation", "scope:styles"],
     "targets": {}
   }
   ```

3. **配置 TypeScript path mapping**

   更新根 `tsconfig.json`:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@backpack/button": ["libs/button/src/index.ts"],
         "@backpack/card": ["libs/card/src/index.ts"],
         "@backpack/mixins/*": ["libs/mixins/src/*"],
         "@backpack/react-utils": ["libs/react-utils/src/index.ts"]
       }
     }
   }
   ```

4. **验证项目识别**
   ```bash
   nx show projects
   # 应该列出所有项目

   nx graph
   # 打开浏览器显示依赖图
   ```

#### 验收标准:
- [ ] 所有组件有 `project.json`
- [ ] `nx show projects` 列出所有项目
- [ ] `nx graph` 显示依赖图 (可能还不完整)
- [ ] TypeScript path mapping 配置正确

#### 潜在问题:
- **项目命名**: 确保与 Nx 约定一致,避免特殊字符
- **路径冲突**: 确保 paths 不与 node_modules 冲突
- **项目数量**: 90+ 项目可能导致 Nx 性能问题 (需监控)

---

### Task 1.4: TypeScript 项目引用设置


**负责人**: TBD

#### 步骤:

1. **为每个项目创建 `tsconfig.json`**

   组件示例 (`libs/button/tsconfig.json`):
   ```json
   {
     "extends": "../../tsconfig.base.json",
     "compilerOptions": {
       "outDir": "../../dist/out-tsc/button",
       "rootDir": "src"
     },
     "files": [],
     "include": ["src/**/*.ts", "src/**/*.tsx"],
     "references": []  // 将在后续填充
   }
   ```

2. **创建项目特定的 `tsconfig.lib.json`**

   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "module": "commonjs",
       "declaration": true,
       "declarationMap": true,
       "composite": false  // ⚠️ 注意: composite 可能导致 .d.ts 问题
     },
     "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
   }
   ```

3. **创建测试配置 `tsconfig.spec.json`**

   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "outDir": "../../dist/out-tsc/button-spec",
       "types": ["jest", "node"]
     },
     "include": [
       "src/**/*.test.ts",
       "src/**/*.spec.ts",
       "src/**/*.test.tsx",
       "src/**/*.spec.tsx"
     ]
   }
   ```

4. **设置项目引用 (references)**

   对于有依赖的项目,添加 references:
   ```json
   {
     "references": [
       { "path": "../mixins" },
       { "path": "../react-utils" }
     ]
   }
   ```

5. **更新根 `tsconfig.json`**

   ```json
   {
     "files": [],
     "references": [
       { "path": "./libs/button" },
       { "path": "./libs/card" },
       // ... 所有项目
     ]
   }
   ```

6. **测试构建**
   ```bash
   tsc --build
   tsc --build --dry --verbose
   ```

#### 验收标准:
- [ ] 所有项目有 `tsconfig.json`, `tsconfig.lib.json`, `tsconfig.spec.json`
- [ ] 项目 references 正确设置
- [ ] `tsc --build` 成功运行
- [ ] 无类型错误 (或与之前一致)

#### 潜在问题:
- **Composite 问题**: 如果启用 `composite: true`,可能遇到 `.d.ts` 不生成的问题
  - **调查**: 参考 Global Components 的经验
  - **缓解**: 初期可能需要 `composite: false`
- **循环依赖**: 可能暴露现有的循环依赖问题
- **路径解析**: 确保 IDE 和 tsc 使用相同的路径解析

---

### Task 1.5: Blocker 调查 - Composite TypeScript 配置


**负责人**: TBD

#### 背景:

Global Components 迁移时发现,启用 `composite: true` 后,所有 `.d.ts` 和 `.d.ts.map` 文件消失,导致下游项目无法使用类型。这是 Backpack 必须解决的 blocker。

#### 调查步骤:

1. **复现问题**

   在一个小组件上测试:
   ```json
   // tsconfig.lib.json
   {
     "compilerOptions": {
       "composite": true,
       "declaration": true
     }
   }
   ```

   构建后检查 dist:
   ```bash
   ls -la dist/libs/button
   # 是否有 .d.ts 文件?
   ```

2. **检查 Babel vs TypeScript 冲突**

   Backpack 使用 Babel 转译,TypeScript 只做类型检查:
   ```json
   // babel.config.js
   module.exports = {
     presets: [
       '@babel/preset-typescript'
     ]
   };
   ```

   问题可能是: Babel 输出 JS,但 TypeScript composite 期望自己生成 .d.ts

3. **尝试解决方案**

   **方案 A: 使用 tsc 生成 .d.ts**
   ```json
   {
     "compilerOptions": {
       "emitDeclarationOnly": true,
       "declaration": true,
       "composite": true
     }
   }
   ```

   单独运行 tsc 生成类型:
   ```bash
   tsc --build --emitDeclarationOnly
   ```

   **方案 B: 禁用 composite**
   ```json
   {
     "compilerOptions": {
       "composite": false,
       "declaration": true
     }
   }
   ```

   但这可能影响 Nx 的依赖追踪

   **方案 C: 使用 @nx/js:tsc**
   ```json
   {
     "targets": {
       "build": {
         "executor": "@nx/js:tsc",
         "options": {
           "outputPath": "dist/libs/button",
           "main": "libs/button/src/index.ts",
           "tsConfig": "libs/button/tsconfig.lib.json"
         }
       }
     }
   }
   ```

4. **测试下游消费**

   创建测试项目:
   ```typescript
   // test-consumer/src/test.ts
   import Button from '@backpack/button';
   // Button 类型是否可用?
   ```

5. **文档化结论**

   创建 `docs/nx-migration/TYPESCRIPT_COMPOSITE_INVESTIGATION.md`:
   - 问题描述
   - 根本原因
   - 测试的方案
   - 推荐方案
   - 实施步骤

#### 验收标准:
- [ ] 问题根因明确
- [ ] 有可行的解决方案
- [ ] 解决方案已测试验证
- [ ] 文档化结论和方案
- [ ] 不影响现有构建流程

#### 潜在输出:
- 方案: 使用 `emitDeclarationOnly` + Babel 转译
- 或: 推迟 composite 到 Vite 迁移时解决
- 或: 使用 Nx 的 TypeScript 构建器替代 Babel

---

### Task 1.6: Blocker 调查 - 外部依赖冲突


**负责人**: TBD

#### 背景:

Backpack 依赖一些长期未维护的库,Nx 及其插件可能引入 peer dependency 冲突。

#### 调查步骤:

1. **审计当前依赖**

   ```bash
   npm list --depth=0
   npm outdated
   npm audit
   ```

   重点关注:
   - 标记为 deprecated 的包
   - 版本过旧的包 (如 <2 年未更新)
   - 有已知安全问题的包

2. **检查 Nx 插件依赖**

   ```bash
   npm info @nx/workspace peerDependencies
   npm info @nx/react peerDependencies
   npm info @nx/eslint peerDependencies
   ```

3. **测试安装**

   在新分支尝试安装 Nx 插件:
   ```bash
   npm install -D @nx/workspace @nx/react @nx/eslint @nx/jest
   ```

   记录所有警告和错误

4. **识别冲突**

   常见问题:
   - ESLint 版本冲突
   - TypeScript 版本不兼容
   - Jest 版本冲突
   - React 版本不匹配

5. **解决方案**

   对于每个冲突:
   - **选项 A**: 升级依赖到兼容版本
   - **选项 B**: 使用 npm overrides (npm 8.3+)
     ```json
     {
       "overrides": {
         "eslint": "^8.0.0"
       }
     }
     ```
   - **选项 C**: 使用 resolutions (yarn) 或 pnpm overrides
   - **选项 D**: 替换不兼容的库

6. **文档化**

   创建 `docs/nx-migration/DEPENDENCY_AUDIT.md`:
   - 所有发现的冲突
   - 采取的解决方案
   - 升级的包列表
   - 潜在风险

#### 验收标准:
- [ ] 完整的依赖审计报告
- [ ] 所有 Nx 插件可安装无错误
- [ ] `npm install` 成功
- [ ] 无 breaking changes 影响现有功能
- [ ] 文档化所有变更

#### 潜在问题:
- **Breaking changes**: 升级可能引入破坏性变更
- **类型不兼容**: 新版本可能改变类型定义
- **测试失败**: 新依赖可能导致测试失败

---

### Task 1.7: 更新文档


**负责人**: TBD

#### 步骤:

1. **更新 README.md**

   添加 Nx 相关内容:
   ```markdown
   ## Getting Started with Nx

   Backpack uses Nx for efficient builds and caching.

   ### Basic Commands

   ```bash
   # Show all projects
   nx show projects

   # View dependency graph
   nx graph

   # Run a target for a project
   nx <target> <project>

   # Run for all projects
   nx run-many --target=<target> --all

   # Run only for affected projects
   nx affected --target=<target>
   ```

   ### Project Structure

   (链接到 ARCHITECTURE.md)
   ```

2. **创建 `docs/nx-migration/ARCHITECTURE.md`**

   内容包括:
   - 项目组织结构
   - 命名约定
   - 模块边界规则
   - Tags 定义

3. **更新 CONTRIBUTING.md**

   添加:
   - 如何创建新组件 (使用 Nx generators)
   - 如何运行测试 (使用 Nx)
   - 依赖管理最佳实践

4. **创建 FAQ**

   `docs/nx-migration/FAQ.md`:
   - Nx 是什么?
   - 为什么要迁移到 Nx?
   - 我的开发工作流会改变吗?
   - 如何查看依赖图?
   - 如何调试 Nx 缓存问题?

#### 验收标准:
- [ ] README.md 包含 Nx 命令
- [ ] ARCHITECTURE.md 存在且完整
- [ ] CONTRIBUTING.md 更新
- [ ] FAQ.md 回答常见问题
- [ ] 所有文档 review 通过

---

## 验收标准 (Milestone Acceptance Criteria)

### 必须满足 (Must Have)
- [ ] `nx.json` 存在且配置正确
- [ ] 所有组件有 `project.json`
- [ ] `nx show projects` 列出所有项目
- [ ] `nx graph` 显示项目依赖图
- [ ] TypeScript 项目引用配置正确
- [ ] Composite TypeScript 问题有明确解决方案
- [ ] 外部依赖冲突已解决
- [ ] 项目结构决策文档化并对齐
- [ ] 文档更新完成

### 应该满足 (Should Have)
- [ ] 基本的 Nx 命令可运行 (即使 targets 还是空的)
- [ ] CI/CD 管道无破坏
- [ ] 性能基准 baseline 记录

### 可以不满足 (Nice to Have)
- [ ] Nx generators 配置 (创建新组件的脚手架)
- [ ] Nx Console VSCode 插件配置
- [ ] 预提交 hook 集成 Nx affected

---

## 风险与缓解 (Risks & Mitigation)

| 风险 | 影响 | 可能性 | 缓解措施 |
|------|------|--------|----------|
| Composite TypeScript 问题无解 | High | Medium | 推迟到 Vite 迁移或使用 emitDeclarationOnly |
| 外部依赖无法解决 | High | Low | 寻找替代库或使用 overrides 强制版本 |
| 项目结构决策延迟 | Medium | Medium | 设定决策 deadline,必要时由 PE 拍板 |
| Stakeholder 不对齐 | Medium | Low | 提前沟通,提供多个方案让团队选择 |
| 90+ 项目导致 Nx 性能问题 | Medium | Low | 监控性能,必要时优化或分批迁移 |

---

## 回滚计划 (Rollback Plan)

Milestone 1 的变更相对安全,因为:
- 只添加配置文件,不修改现有代码
- 不影响现有构建流程
- 不影响消费者

**如果需要回滚**:
1. 删除 Nx 相关文件:
   - `nx.json`
   - `project.json` (所有)
   - TypeScript 项目引用配置
2. 卸载 Nx 包:
   ```bash
   npm uninstall nx @nx/workspace
   ```
3. 恢复原始文档

**回滚触发条件**:
- 无法解决技术 blocker
- 团队决定推迟迁移
- 发现根本性架构问题

---

## 交付产物 (Deliverables)

1. **代码变更**:
   - `nx.json`
   - `project.json` (每个项目)
   - `tsconfig.json` (更新的)
   - TypeScript 项目引用配置

2. **文档**:
   - `docs/nx-migration/ARCHITECTURE.md`
   - `docs/nx-migration/TYPESCRIPT_COMPOSITE_INVESTIGATION.md`
   - `docs/nx-migration/DEPENDENCY_AUDIT.md`
   - `docs/nx-migration/FAQ.md`
   - 更新的 README.md 和 CONTRIBUTING.md

3. **报告**:
   - Blocker 调查结论
   - 项目结构决策记录
   - Stakeholder 对齐会议记录

---

## 后续步骤 (Next Steps)

完成 Milestone 1 后:
1. **Review & 演示**: 向团队展示 Nx workspace 和依赖图
2. **培训**: 简短的 Nx 命令培训 (可选)
3. **开始 Milestone 2**: [静态检查迁移到 Nx](./02-milestone-2-static-checks.md)

---

## 参考资料 (References)

- [Nx: Getting Started](https://nx.dev/getting-started/intro)
- [Nx: Project Configuration](https://nx.dev/reference/project-configuration)
- [TypeScript Project References](https://www.typescriptlang.org/docs/handbook/project-references.html)
- [Global Components Nx Migration](https://github.com/Skyscanner/global-components) (参考实际代码)
- [Banana Nx Adoption One Pager](https://skyscanner.atlassian.net/wiki/spaces/UP1/pages/1353404332)
- [TypeScript Monorepo Production Standard](https://skyscanner.atlassian.net/wiki/spaces/WEAV/pages/1388484149)
