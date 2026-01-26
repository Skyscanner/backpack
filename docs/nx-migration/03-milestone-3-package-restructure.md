# Milestone 3: 包结构重组与导入结构调整

**状态**: Not Started  
**估算**  
**信心度**: 60%  
**前置条件**: Milestone 1, 2 完成 + Sass 迁移完成

---

## 目标 (Goals)

1. **解决 Blocker 1: Import 结构不兼容**
2. **解决 Blocker 2: Icons/Flare/Spinner 动态导入**
3. **解决 Blocker 3: SCSS 相对路径和 unstable mixins**
4. **统一命名空间**: 确定最终的导入路径策略
5. **Storybook stories 共置**: 将 examples/ 移到组件内部
6. **准备向后兼容**: 提供 codemods 和 shim layers

**价值**: 解除 Nx 迁移的主要技术障碍,为 Libraries 提取做准备

---

## 前置条件 (Prerequisites)

### 必须完成
- [ ] Milestone 1, 2 已完成
- [ ] **Sass 迁移已完成** (unstable → stable mixins)
  - 所有 `@import` 转为 `@use/@forward`
  - 稳定入口: `@backpack/mixins/*`, `@backpack/tokens`
  - CI 阻止新的 unstable 导入
- [ ] Flare TS 采用完成 (JS → TS with .d.ts)
- [ ] Public surface manifest 存在

### 推荐完成
- [ ] Icons/SCSS 生成脚本准备 (dev + publish 双输出)
- [ ] Lint/CI guardrails 设置

---

## 核心决策 (Key Decisions)

在开始实施前,必须做出以下决策:

### Decision 1: 最终导入命名空间

**选项 A: 复用现有路径**
```typescript
// 保持不变
import Button from '@skyscanner/backpack-web/bpk-component-button';
```
✅ 零消费者变更  
❌ 技术债务延续

**选项 B: 新命名空间 (推荐调查后决定)**
```typescript
// 新路径
import Button from '@backpack/components/button';
import { tokens } from '@backpack/tokens';
```
✅ 清晰 API,符合 Nx 约定  
❌ 需要 codemod,有迁移窗口

**选项 C: 双表面策略**
- 内部: `@backpack/*` (Nx workspace)
- 外部: `@skyscanner/backpack-web/...` (NPM package)
✅ 最大灵活性  
❌ 维护复杂度

**推荐流程**:
1. Week 1: 技术调查 (复用路径的可行性)
2. Week 1: 与 PE + 消费团队对齐
3. Week 2: 文档化决策并锁定

---

## 任务清单 (Tasks)

### Phase 1: 命名空间策略确定 (Week 1-2)

#### Task 3.1: 导入路径技术调查



**调查内容**:
1. **复用现有路径的可行性**
   - Nx 是否支持 `@skyscanner/backpack-web/bpk-component-*` 格式
   - TypeScript paths 映射是否足够
   - 如何在 `package.json#exports` 中表达

2. **新路径的成本**
   - 需要修改的消费者数量 (Banana, Falcon, etc.)
   - Codemod 复杂度
   - 过渡期支持策略

3. **双表面的可行性**
   - 如何维护两套导入
   - 构建流程影响
   - 长期维护成本

**输出**: 技术可行性报告 + 推荐方案

#### Task 3.2: Stakeholder 对齐



**对齐内容**:
- [ ] Principal Engineers: 架构决策
- [ ] Banana/Falcon teams: 消费者影响
- [ ] Web Enablement: Nx 最佳实践
- [ ] Product: 迁移时间窗口

**输出**: 决策文档 (ARCHITECTURE_DECISIONS.md)

---

### Phase 2: Storybook Stories 共置 (Week 2-3)

#### Task 3.3: 将 examples/ 移到组件内



**步骤**:
1. 创建脚本批量移动:
   ```bash
   # scripts/move-stories.js
   // 将 examples/bpk-component-button/ 移到
   //     libs/button/src/button.stories.tsx
   ```

2. 更新 Storybook 配置:
   ```typescript
   // .storybook/main.ts
   export default {
     stories: ['../libs/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
   };
   ```

3. 验证所有 stories 可加载

**验收标准**:
- [ ] `examples/` 目录删除
- [ ] 所有 stories 在组件内部
- [ ] `npm run storybook` 正常工作
- [ ] 无遗漏或重复 stories

---

### Phase 3: Icons/Flare/Spinner 标准化 (Week 3-4)

#### Task 3.4: 使 Icons 路径可解析



**当前问题**:
```typescript
// 虚拟路径,webpack 动态生成
import LongArrowRight from '@skyscanner/backpack-web/bpk-component-icon/sm/long-arrow-right';
```

**解决方案**:
1. **确认生成文件已存在**:
   ```
   packages/bpk-component-icon/src-generated/sm/long-arrow-right.tsx
   ```

2. **配置 TypeScript paths**:
   ```json
   {
     "paths": {
       "@backpack/icons/*": ["libs/icons/src-generated/*"]
     }
   }
   ```

3. **Wrapper Nx target for generation**:
   ```json
   {
     "targets": {
       "generate-icons": {
         "executor": "nx:run-commands",
         "options": {
           "command": "gulp generateIcons"
         },
         "inputs": [
           "{projectRoot}/src/**/*.svg",
           "^node_modules/@skyscanner/bpk-svgs/**/*"
         ],
         "outputs": ["{projectRoot}/src-generated/**/*"]
       },
       "build": {
         "dependsOn": ["generate-icons", "^build"]
       }
     }
   }
   ```

4. **配置 package.json#exports** (publish):
   ```json
   {
     "exports": {
       "./icons/sm/*": "./dist/icons/sm/*.js",
       "./icons/lg/*": "./dist/icons/lg/*.js"
     }
   }
   ```

5. **测试**:
   ```bash
   nx generate-icons icon
   nx build icon
   # 检查 dist/ 是否有对应文件
   ```

**验收标准**:
- [ ] Icons 路径可静态解析
- [ ] IDE "Go to Definition" 工作
- [ ] Nx affected 能追踪 SVG 变更
- [ ] 构建产物包含所有 icons
- [ ] 消费者导入路径不变 (或有 codemod)

#### Task 3.5: 同样处理 Flare 和 Spinner



重复 Task 3.4 的步骤,应用到:
- `bpk-component-flare`
- `bpk-component-spinner`

---

### Phase 4: SCSS 导入标准化 (Week 4-5)

#### Task 3.6: 提供稳定 SCSS 入口

**前提**: Sass 迁移 (`@import` → `@use/@forward`) 已完成

**步骤**:
1. **创建 barrel 文件**:
   ```scss
   // libs/mixins/src/index.scss
   @forward './tokens';
   @forward './icons';
   @forward './utils';
   ```

2. **配置 TypeScript paths** (for Sass):
   ```json
   // 告诉 sass-loader 在哪里找
   {
     "sassOptions": {
       "loadPaths": ["libs"]
     }
   }
   ```

3. **提供向后兼容 shim**:
   ```scss
   // libs/unstable__bpk-mixins/tokens.scss
   @forward '../mixins/src/tokens';
   @deprecated Use @use '@backpack/mixins/tokens' instead;
   ```

4. **更新文档**:
   ```markdown
   // Migration guide
   Before: @use '../../unstable__bpk-mixins/tokens';
   After:  @use '@backpack/mixins/tokens';
   ```

**验收标准**:
- [ ] 所有 Backpack 内部 SCSS 使用稳定路径
- [ ] 提供向后兼容 shims (带 deprecation 警告)
- [ ] CI 阻止新的 unstable 导入
- [ ] 消费者有清晰的迁移指南

---

### Phase 5: TypeScript 类型完整性 (Week 5-6)

#### Task 3.7: 确保所有 public 导出有 .d.ts



**步骤**:
1. **创建清单**:
   ```json
   // scripts/public-api-manifest.json
   {
     "exports": [
       "@backpack/button",
       "@backpack/card",
       "@backpack/icons/sm/long-arrow-right",
       "@backpack/mixins/tokens"
     ]
   }
   ```

2. **CI 检查脚本**:
   ```javascript
   // scripts/check-types.js
   const manifest = require('./public-api-manifest.json');
   const fs = require('fs');

   manifest.exports.forEach(exp => {
     const dtsPath = resolvePath(exp) + '.d.ts';
     if (!fs.existsSync(dtsPath)) {
       throw new Error(`Missing .d.ts for ${exp}`);
     }
   });
   ```

3. **生成遗漏的 .d.ts**:
   - 对于 JS 组件: `tsc --emitDeclarationOnly`
   - 对于 SCSS: 创建 ambient declarations
     ```typescript
     // libs/mixins/src/tokens.scss.d.ts
     declare const styles: Record<string, string>;
     export default styles;
     ```

**验收标准**:
- [ ] Public API manifest 存在
- [ ] 所有导出有 .d.ts
- [ ] CI 检查强制执行
- [ ] 消费者无类型错误

---

## 风险与缓解 (Risks & Mitigation)

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| 命名空间决策延迟 | High | Week 1 设定deadline,PE 最终拍板 |
| Sass 迁移未完成 | High | 单独追踪 Sass 迁移进度,设为 blocker |
| Icons 生成时序问题 | Medium | Nx targets 显式建模依赖关系 |
| 消费者破坏性变更 | High | 提供 codemods + 向后兼容层 + 长迁移窗口 |
| SCSS 工具链不兼容 | Medium | 在多个 bundler (Webpack/Vite) 中测试 |

---

## 验收标准 (Acceptance Criteria)

### Must Have
- [ ] 导入命名空间决策文档化
- [ ] Icons/Flare/Spinner 可静态解析
- [ ] SCSS 使用稳定入口
- [ ] 所有 public 导出有 .d.ts
- [ ] Storybook stories 共置
- [ ] Nx affected 能追踪资产变更
- [ ] 消费者有迁移指南

### Should Have
- [ ] Codemods 可用
- [ ] 向后兼容 shim layers
- [ ] CI 阻止旧模式导入
- [ ] 性能无回退

### Nice to Have
- [ ] 自动化迁移脚本
- [ ] Linter 规则帮助迁移

---

## 交付产物 (Deliverables)

1. **决策文档**: `docs/nx-migration/ARCHITECTURE_DECISIONS.md`
2. **迁移指南**: `docs/nx-migration/MIGRATION_GUIDE.md`
3. **Public API Manifest**: `scripts/public-api-manifest.json`
4. **Codemods**: `scripts/codemods/` (如果适用)
5. **更新的构建脚本**: Nx targets for generation
6. **CI 检查**: Type completeness, no unstable imports

---

## 后续步骤 (Next Steps)

完成 Milestone 3 后,进入 [Milestone 4: Libraries 提取与模块边界](./04-milestone-4-libs-extraction.md)
