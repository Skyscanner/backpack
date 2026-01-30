# 阶段 0.2：添加 TypeScript 路径别名

**依赖于**：阶段 0.1

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 配置 TypeScript 路径别名 | 必需 | 为即将到来的目录重组做准备，避免修改 207+ 个文件 |
| 2. 转换 TS/JS 导入 | 必需 | 统一导入路径，解决组件深度不一致问题 |
| 3. 配置 SCSS 路径 | 必需 | 转换 292+ 个 SCSS 文件以支持别名导入 |
| 4. 配置 Jest | 必需 | 测试需要识别路径别名，否则测试失败 |
| 5. 配置 ESLint | 必需 | Lint 需要解析路径别名，否则报错 |
| 6. 配置 Babel | 必需 | 构建时将路径别名转换为实际路径 |

## 当前问题

- tsconfig.json 缺少 paths 配置
- 207+ 个 TypeScript/JavaScript 文件使用相对路径
- 292+ 个 SCSS 文件使用相对路径
- 组件目录深度不一致（`../../` vs `../../../`）

## 步骤

### 1. 配置 TypeScript 路径别名
- 编辑 tsconfig.base.json
- 添加 baseUrl 和 paths 配置
```json
{
  "baseUrl": ".",
  "paths": {
    "@backpack/*": ["packages/*"],
    "@backpack/mixins": ["packages/bpk-mixins"],
    "@backpack/mixins/*": ["packages/bpk-mixins/*"],
    "@backpack/react-utils": ["packages/bpk-react-utils"],
    "@backpack/tokens": ["packages/bpk-tokens"]
  }
}
```

### 2. 转换 TypeScript/JavaScript 导入
- 创建自动转换脚本
- 定义路径映射规则
- 批量转换文件中的导入语句
- 处理两种深度的相对路径（浅层组件和 V2 嵌套组件）

### 3. 配置 SCSS 路径
- 更新 packages/bpk-mixins/index.scss 添加转发规则
- 配置 sass-loader includePaths（如果使用 webpack）
- 创建 SCSS 导入转换脚本
- 批量转换 @use 语句

### 4. 配置 Jest
- 编辑 jest.config.js
- 添加 moduleNameMapper 配置
```javascript
{
  moduleNameMapper: {
    '^@backpack/(.*)$': '<rootDir>/packages/$1'
  }
}
```

### 5. 配置 ESLint
- 安装 eslint-import-resolver-typescript
- 编辑 .eslintrc.json
- 添加 import/resolver 配置

### 6. 配置 Babel
- 安装 babel-plugin-module-resolver
- 编辑 babel.config.js
- 添加 module-resolver 插件配置

## 交付物

- [ ] 更新的 tsconfig.base.json
- [ ] 转换脚本文件
- [ ] 所有文件使用路径别名
- [ ] 更新的构建工具配置
