# 阶段 0.1：清理外部依赖

## 目标

清理过时和废弃的外部依赖，防止与 Nx 产生版本冲突。

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 审计当前依赖 | 必需 | 识别所有有问题依赖的位置和影响范围 |
| 2. 升级 normalize.css | 必需 | 10 年前的版本与 Nx 的现代工具链不兼容 |
| 3. 移除 object-assign | 必需 | ES6 原生支持，polyfill 冗余且与工具链假设冲突 |
| 4. 移除 intersection-observer | 必需 | >95% 原生浏览器支持，Nx 不处理 polyfills |
| 5. 升级 react-table | 可选 | v7 已 EOL 但不阻塞 Nx，可标记为技术债务 |
| 6. 锁定 @skyscanner/bpk-svgs | 必需 | 防止隐式内容变更使 Nx 缓存失效 |
| 7. 收紧 React peer dependency | 必需 | 跨主版本违反 semver，Nx 依赖检查会报错 |
| 8. 清理未使用的依赖 | 必需 | Nx 依赖分析检测并警告未使用的依赖 |
| 9. 重新生成锁文件 | 必需 | 确保依赖一致性，为 Nx 缓存提供准确的哈希 |

## 步骤

### 1. 审计当前依赖

**为什么**：全面了解依赖状态，识别所有有问题依赖的位置和影响范围，为后续清理提供数据支持。

**做什么**：
- 生成依赖报告脚本
- 使用 depcheck 查找未使用的依赖
- 使用 npm outdated 查看过时的依赖

---

### 2. 升级 normalize.css

**为什么**：当前版本 4.2.0 发布于 2015 年，已过时 10 年。Nx 及其插件依赖现代工具链，旧版本可能与新构建工具不兼容（例如 PostCSS、现代 CSS 特性）。

**做什么**：
- 查找所有引用位置
- 升级到 10.x 或替换为 modern-normalize
- 更新所有 import/require 语句
- 测试 Storybook 样式

---

### 3. 移除 object-assign

**为什么**：ES6 (2015) 已经有原生 Object.assign 支持，所有现代浏览器和 Node.js 版本都支持。保留 polyfill 增加 bundle 大小，且与现代工具链（Babel、TypeScript）的假设不一致。

**做什么**：
- 查找直接使用位置
- 检查是否为间接依赖
- 卸载依赖
- 在代码中替换为原生 Object.assign

---

### 4. 移除 intersection-observer

**为什么**：现代浏览器原生支持率超过 95%。保留 polyfill 增加 bundle 大小，且 Nx 的现代构建配置默认不处理 polyfills，可能导致构建错误或运行时问题。

**做什么**：
- 查找使用位置
- 确认浏览器支持需求（.browserslistrc）
- 卸载 polyfill
- 从代码中移除 polyfill 导入

---

### 5. 升级 react-table

**为什么**：v7 已 EOL（生命周期结束），存在安全风险和 bug。TanStack Table v8 是官方继任者，更好地集成现代 React（hooks、TypeScript）。Nx 插件和工具链期望积极维护的依赖。

**做什么**：
- 查找使用 react-table 的组件
- 卸载 react-table
- 安装 @tanstack/react-table
- 按照官方迁移指南更新代码
  - 更新导入
  - 更新 hook 使用
  - 更新 JSX 渲染逻辑

---

### 6. 锁定 @skyscanner/bpk-svgs

**为什么**：Icon/Spinner 组件依赖此包进行代码生成。如果使用 semver 范围（^），包内容可能在版本号不变的情况下更新（例如 npm registry 覆盖），导致 Nx 缓存遗漏变更并生成旧代码。锁定确切版本确保缓存一致性。

**做什么**：
- 编辑 packages/package.json
- 将 `"@skyscanner/bpk-svgs": "^17.8.3"` 改为 `"@skyscanner/bpk-svgs": "17.8.3"`
- 重新安装依赖

---

### 7. 收紧 React peer dependency

**为什么**：当前范围 `17.0.2 - 18.3.1` 跨越主版本，违反 semver 规范，可能导致消费者安装不兼容的 React 版本。Nx 的依赖检查工具期望严格的 peer dependency 定义，宽范围会导致警告或错误。

**做什么**：
- 编辑 packages/package.json
- 将 `"react": "17.0.2 - 18.3.1"` 改为 `"react": "^18.0.0"`
- 或使用 `"^17.0.0 || ^18.0.0"` 如果需要支持 React 17

---

### 8. 清理未使用的依赖

**为什么**：未使用的依赖增加安装时间、bundle 大小和安全风险。Nx 的依赖分析工具检测未使用的依赖并报告警告。清理提高 npm install 速度和 Nx 依赖图准确性。

**做什么**：
- 根据 depcheck 结果移除未使用的包

---

### 9. 重新生成锁文件

**为什么**：之前的依赖变更（升级、移除、版本锁定）导致依赖树变化。重新生成锁文件确保：
- 依赖版本一致性
- 移除旧依赖的残留
- CI 和本地环境使用相同的依赖版本
- 为后续 Nx 缓存提供准确的输入哈希

**做什么**：
- 删除旧的 package-lock.json
- 运行 npm install 重新生成

## 交付物

- [ ] 更新的 packages/package.json
- [ ] 依赖审计报告
- [ ] 迁移日志文件
