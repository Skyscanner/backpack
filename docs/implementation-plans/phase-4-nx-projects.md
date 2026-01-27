# 阶段 4：配置 Nx 项目

**依赖于**：阶段 2
**可与阶段 3 并行**

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 决定配置方法 | 必需 | 选择最合适的方法（推荐脚本或推断）|
| 2. 创建 project.json 模板 | 必需 | 定义标准配置，确保一致性 |
| 3. 为组件创建 project.json | 必需 | 使 Nx 识别 91 个组件 |
| 4. 创建 TypeScript 配置 | 必需 | 每个项目需要独立的 TS 配置 |
| 5. 配置项目引用 | 必需 | 确保组件间依赖正确 |
| 6. 验证项目配置 | 必需 | 确认所有组件被 Nx 识别 |

## 步骤

### 1. 决定配置方法
- 选项 A：手动为每个组件创建 project.json
- 选项 B：使用 Nx 项目推断功能（推荐）
- 选项 C：使用脚本批量生成 project.json

### 2. 创建 project.json 模板
- 定义标准 targets（build、test、lint、typecheck）
- 定义 inputs 和 outputs
- 定义 dependencies（例如 ^build）

### 3. 为组件创建 project.json
- 使用脚本为 91 个组件批量创建
- 或手动创建（如果使用推断可以跳过）
- 对 Icon/Flare/Spinner 特殊处理（已在阶段 0.4 创建）

### 4. 创建 TypeScript 配置
- 为每个组件创建 tsconfig.json
- 创建 tsconfig.lib.json（编译配置）
- 创建 tsconfig.spec.json（测试配置）
- 使用脚本批量生成

### 5. 配置项目引用
- 在 tsconfig.base.json 中添加 paths 映射
- 或使用 Nx 自动推断
- 确保组件间引用正确

### 6. 验证项目配置
- 运行 nx show projects 查看所有项目
- 运行 nx graph 查看依赖图
- 检查是否所有 91 个组件都被识别

## 示例 project.json 结构

```json
{
  "name": "bpk-component-button",
  "sourceRoot": "packages/bpk-component-button/src",
  "projectType": "library",
  "targets": {
    "build": {
      "executor": "@nx/js:tsc",
      "outputs": ["{options.outputPath}"],
      "options": {
        "outputPath": "dist/packages/bpk-component-button",
        "tsConfig": "packages/bpk-component-button/tsconfig.lib.json"
      }
    },
    "test": {
      "executor": "@nx/jest:jest"
    },
    "lint": {
      "executor": "@nx/eslint:lint"
    }
  },
  "tags": ["type:component", "scope:public"]
}
```

## 交付物

- [ ] 91 个 project.json 文件（或推断配置）
- [ ] 273 个 TypeScript 配置文件（每个组件 3 个）
- [ ] 项目引用配置
- [ ] 批量生成脚本
