# 阶段 0.4：配置代码生成 inputs/outputs

**依赖于**：阶段 0.3

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 0. 锁定 bpk-svgs 版本 | 必需 | 防止外部包内容变更导致缓存失效问题 |
| 1. 配置 Icon 组件 | 必需 | 确保 Nx 跟踪 SVG 源文件变更，缓存失效正确 |
| 2. 配置 Spinner 组件 | 必需 | 与 Icon 相同，依赖外部 npm 包生成代码 |
| 3. 配置 Flare 组件 | 必需 | 跟踪双重输出（svgmin 就地修改 + 生成的文件）|
| 4. 创建 SVG 完整性检查 | 必需 | 检测外部 npm 包内容变更，触发缓存失效 |
| 5. 配置 Nx 全局输入 | 必需 | 将校验和添加到缓存计算，确保准确性 |
| 6. 创建验证脚本 | 必需 | 确保 generate → build 依赖链正确配置 |

## 受影响的组件

| 组件 | 源文件 | 生成位置 | 生成方法 |
|-----------|--------------|---------------------|-------------------|
| Icon | node_modules/@skyscanner/bpk-svgs/dist/js/icons/ | packages/bpk-component-icon/{sm,lg,xxxl}/ | 复制 |
| Spinner | node_modules/@skyscanner/bpk-svgs/dist/js/spinners/ | packages/bpk-component-spinner/src/spinners/ | 复制 |
| Flare | packages/bpk-component-flare/src/svgs/*.svg | packages/bpk-component-flare/src/__generated__/ | SVG→React |

## 问题

- 生成的文件被 gitignore
- 外部依赖变更不触发缓存失效
- Flare 就地修改源文件（svgmin）

## 步骤

### 0. 锁定 @skyscanner/bpk-svgs 版本
- 如果在 Phase 0.1 中未完成，现在执行
- 编辑 package.json（如果 Phase 2 已完成则在根目录，否则在 packages/）
- 将 `"@skyscanner/bpk-svgs": "^20.11.0"` 改为 `"@skyscanner/bpk-svgs": "20.11.0"`
- 删除 package-lock.json 并重新运行 npm install
- 验证 lock 文件中版本已锁定

### 1. 配置 Icon 组件
- 创建 packages/bpk-component-icon/project.json
- 添加 generate target
- 配置 inputs 指向 node_modules/@skyscanner/bpk-svgs
- 配置 outputs 为生成目录：sm/, lg/, xxxl/
- 配置 build 依赖于 generate（`dependsOn: ["generate"]`）

### 2. 配置 Spinner 组件
- 创建 packages/bpk-component-spinner/project.json
- 添加 generate target
- 配置 inputs 指向 node_modules/@skyscanner/bpk-svgs
- 配置 outputs 为 src/spinners/
- 配置 build 依赖于 generate

### 3. 配置 Flare 组件
- 创建 packages/bpk-component-flare/project.json
- 添加 svgmin target（优化 SVG，就地修改）
- 添加 generate target（依赖于 svgmin）
- 配置 inputs 为 src/svgs/*.svg 和模板文件
- 配置 outputs 为 src/__generated__/
- 配置 build 依赖于 generate

**注意**：这些 project.json 是正式配置，将在 Phase 4 中为所有组件创建类似配置。

### 4. 创建 SVG 完整性检查脚本
- 编写脚本计算 @skyscanner/bpk-svgs 目录的哈希
- 将哈希存储到 .svgs-checksum 文件
- 内容变更时更新校验和

### 5. 配置 Nx 全局输入
- 编辑 nx.json
- 添加包含 .svgs-checksum 的 namedInputs
- 确保代码生成任务包含此输入

### 6. 创建验证脚本
- 编写脚本验证代码生成依赖链
- 检查所有 generate targets 存在
- 检查 build 正确依赖于 generate

## 交付物

- [ ] @skyscanner/bpk-svgs 版本已锁定（无 ^ 前缀）
- [ ] 3 个组件的 project.json（Icon、Spinner、Flare）
- [ ] SVG 完整性检查脚本（.svgs-checksum）
- [ ] 验证脚本（验证 generate → build 依赖链）
- [ ] 更新的 nx.json（包含 namedInputs 配置）
- [ ] 代码生成测试通过（运行 generate targets）
