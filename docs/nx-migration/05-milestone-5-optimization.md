# Milestone 5: 优化与增强 (可选)

**状态**: Not Started  
**估算**  
**信心度**: 40%  
**前置条件**: Milestone 4 完成  
**性质**: 可选 - 可以推迟到后续迭代

---

## 目标 (Goals)

1. **PNPM 迁移**: 更快的依赖安装
2. **Vite 采用**: 更快的构建速度
3. **Vitest 采用**: 更快的测试运行
4. **Nx Cloud**: 远程缓存和分布式执行
5. **持续优化**: 进一步拆分库,优化 affected 策略

**价值**: 
- 显著提升开发体验
- 减少 CI 时间
- 符合 Web Foundations Stage 3
- 为未来扩展做准备

---

## 前置条件 (Prerequisites)

- [ ] Milestone 1-4 全部完成
- [ ] 核心 Nx 功能稳定运行
- [ ] 无遗留 P0/P1 技术债务

---

## 子 Milestones

### 5.1: PNPM 迁移 (可选)

#### 背景
PNPM 比 npm 更快,更节省磁盘空间,是 Web Foundations 推荐的包管理器。

#### Blocker 调查
Banana 发现 PNPM 与 npm local paths 不兼容。Backpack 需要先验证:
- 是否使用 local paths?
- 如果是,是否已在 Milestone 3/4 移除?

#### 步骤 (如果无 blocker)
1. **安装 PNPM**:
   ```bash
   npm install -g pnpm
   ```

2. **转换 lockfile**:
   ```bash
   rm package-lock.json
   pnpm import  # 从 package-lock.json 导入
   # 或直接
   pnpm install
   ```

3. **更新 CI**:
   ```yaml
   - uses: pnpm/action-setup@v2
     with:
       version: 8
   - uses: actions/setup-node@v3
     with:
       cache: 'pnpm'
   - run: pnpm install --frozen-lockfile
   ```

4. **测试所有工作流**:
   - 本地开发
   - CI build
   - 发布流程

#### 验收标准
- [ ] `pnpm-lock.yaml` 替代 `package-lock.json`
- [ ] 安装时间减少 >30%
- [ ] 所有 npm scripts 通过 pnpm 运行
- [ ] CI 使用 pnpm

#### 风险
- Workspace 配置可能需要调整
- 某些脚本可能依赖 npm 特性
- Monorepo hoisting 行为可能不同

---

### 5.2: Vite 采用 (可选)

#### 背景
Vite 提供更快的冷启动和 HMR。Web Foundations Stage 3 推荐使用 Vite。

#### 范围
- Storybook 迁移到 Vite
- 组件构建使用 @nx/vite
- 可选: 测试环境迁移到 Vitest

#### 步骤

**Phase 1: Storybook Vite ((时间待定))**
1. 升级 Storybook 到支持 Vite 的版本
2. 替换 `@storybook/react-webpack5` 为 `@storybook/react-vite`
3. 创建 `vite.config.ts`
4. 迁移 webpack 特定配置到 Vite 插件
5. 测试所有 stories 加载

**Phase 2: 组件构建 Vite ((时间待定))**
1. 安装 `@nx/vite`
2. 为 pilot 组件配置 build target:
   ```json
   {
     "targets": {
       "build": {
         "executor": "@nx/vite:build",
         "options": {
           "outputPath": "dist/libs/button",
           "main": "libs/button/src/index.ts",
           "configFile": "libs/button/vite.config.ts"
         }
       }
     }
   }
   ```
3. 创建 Vite 配置:
   ```typescript
   // libs/button/vite.config.ts
   import { defineConfig } from 'vite';
   import react from '@vitejs/plugin-react';
   import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

   export default defineConfig({
     plugins: [
       react(),
       nxViteTsPaths(),
     ],
     build: {
       lib: {
         entry: 'src/index.ts',
         name: 'Button',
         fileName: 'index',
         formats: ['es', 'cjs']
       },
       rollupOptions: {
         external: ['react', 'react-dom']
       }
     }
   });
   ```
4. 对比 Vite vs Babel/Webpack 输出
5. 逐步迁移所有组件

**Phase 3: 移除 Gulp/Webpack ((时间待定))**
1. 迁移代码生成 (Icons/Flare/Spinner) 到 Vite 插件或独立脚本
2. 删除 `gulpfile.js`
3. 移除 Webpack 依赖
4. 更新文档

#### 验收标准
- [ ] Storybook 使用 Vite
- [ ] 所有组件通过 Vite 构建
- [ ] 构建时间减少 >40%
- [ ] HMR 工作正常
- [ ] 构建产物与之前等效
- [ ] 消费者无感知变化

#### 风险
- Vite 插件生态可能缺少某些 Webpack loader
- SVG 处理可能需要自定义插件
- SCSS 处理可能需要额外配置
- 代码生成任务需要重构

---

### 5.3: Vitest 采用 (可选)

#### 背景
Vitest 与 Vite 天然集成,比 Jest 更快。

#### 步骤
1. **安装 Vitest**:
   ```bash
   pnpm add -D vitest @vitest/ui
   ```

2. **创建 Vitest 配置**:
   ```typescript
   // vitest.config.ts
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'jsdom',
       setupFiles: ['./scripts/vitest/setup.ts'],
       coverage: {
         provider: 'v8',
         reporter: ['text', 'json', 'html']
       }
     }
   });
   ```

3. **迁移测试 setup**:
   ```typescript
   // scripts/vitest/setup.ts
   import '@testing-library/jest-dom/vitest';
   import 'jest-axe/vitest';
   ```

4. **逐步迁移测试**:
   - Pilot: 选择 1-2 个组件
   - 更新 imports (`jest` → `vitest`)
   - 验证所有断言工作
   - 批量迁移其余组件

5. **更新 Nx targets**:
   ```json
   {
     "targets": {
       "test": {
         "executor": "@nx/vite:test",
         "options": {
           "config": "vitest.config.ts"
         }
       }
     }
   }
   ```

#### 验收标准
- [ ] 所有测试迁移到 Vitest
- [ ] 测试运行时间减少 >30%
- [ ] 覆盖率报告正常
- [ ] `nx test button` 工作
- [ ] `nx affected --target=test` 工作

#### 风险
- 某些 Jest 插件可能不兼容
- Mock 语法可能需要调整
- Snapshot 格式可能不同

---

### 5.4: Nx Cloud (可选)

#### 背景
Nx Cloud 提供:
- 远程缓存: 团队成员共享构建缓存
- 分布式任务执行: CI 并行运行任务
- 任务可视化和分析

#### 步骤
1. **注册 Nx Cloud**:
   ```bash
   npx nx connect-to-nx-cloud
   ```

2. **配置访问令牌**:
   - 在 CI 设置 `NX_CLOUD_ACCESS_TOKEN`

3. **启用 DTE (Distributed Task Execution)**:
   ```yaml
   # .github/workflows/pr.yml
   - run: npx nx-cloud start-ci-run
   - run: npx nx-cloud start-agent
   - run: nx affected --target=test --parallel=3
   ```

4. **监控和优化**:
   - 查看 Nx Cloud dashboard
   - 分析缓存命中率
   - 识别慢任务

#### 验收标准
- [ ] Nx Cloud 连接成功
- [ ] 远程缓存工作
- [ ] CI 时间进一步减少
- [ ] Dashboard 显示执行统计

#### 成本考虑
- Nx Cloud 有免费层 (500 小时/月)
- 付费计划根据使用量
- 需要与管理层对齐预算

---

### 5.5: 持续优化 (可选, 持续进行)

#### 库拆分
**目标**: 更细粒度的 affected 计算

**候选**:
- 将大组件拆分为子库
  - 例: `bpk-component-datepicker` 可能拆分为 `datepicker-core`, `datepicker-range`, `datepicker-utils`
- 提取共享逻辑到 utils
  - 例: `bpk-react-utils` 拆分为 `hooks`, `hocs`, `utilities`

**权衡**:
- ✅ 更精准的 affected
- ✅ 更清晰的依赖图
- ❌ 更多项目维护
- ❌ 导入路径更长

#### CI 优化
- **并行度调优**: 根据 runner 调整 `--parallel`
- **Agents**: 使用 Nx Cloud agents 加速
- **缓存策略**: 优化 `inputs` 定义,减少缓存失效

#### 依赖图清理
- 识别和移除循环依赖
- 减少跨层依赖
- 定期审查依赖健康度

---

## 成功指标 (Success Metrics)

| 指标 | Baseline (M4) | Target (M5) |
|------|---------------|-------------|
| 本地冷启动时间 | TBD | -40% |
| 本地热启动时间 | TBD | -60% |
| Storybook 启动 | TBD | <30s |
| 单元测试总时间 | TBD | -30% |
| CI PR 检查时间 | TBD | -50% |
| npm install 时间 | TBD | -30% (with PNPM) |
| 缓存命中率 | TBD | >80% (with Nx Cloud) |

---

## 优先级排序

如果资源有限,推荐顺序:

1. **PNPM 迁移**: 低风险,高收益,快速实施
2. **Nx Cloud**: 无需代码变更,立即收益
3. **Vite for Storybook**: 改善开发体验
4. **Vitest**: 可推迟到测试框架升级时
5. **Vite for 构建**: 需要较多工作,但长期收益大

---

## 回滚计划

Milestone 5 的所有子项都是增量的,可独立回滚:
- **PNPM**: 删除 `pnpm-lock.yaml`,恢复 `package-lock.json`
- **Vite**: 保留 Webpack 配置,切换回旧 executor
- **Vitest**: 恢复 Jest 配置
- **Nx Cloud**: 断开连接,删除令牌

---

## 交付产物 (Deliverables)

- [ ] 迁移指南 (PNPM, Vite, Vitest)
- [ ] 性能基准报告
- [ ] 更新的构建配置
- [ ] CI/CD 优化文档
- [ ] 成本分析 (Nx Cloud)

---

## 结语

完成 Milestone 5 后,Backpack 将拥有:
- ✅ 现代化的构建工具链
- ✅ 极致的开发体验
- ✅ 高效的 CI/CD
- ✅ 可扩展的架构
- ✅ 符合 Skyscanner Production Standards

🎉 **恭喜! Backpack Nx 迁移完成!**

---

**下一阶段**: 准备 Backpack 整合进更大的 monorepo (如 Banana)
