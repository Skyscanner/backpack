# 阶段 6：配置模块边界

**依赖于**：阶段 5

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 规划标签分类 | 必需 | 定义组件类型和访问范围，建立分类标准 |
| 2. 为项目分配标签 | 必需 | 标记 91 个项目，Nx 依赖此识别依赖规则 |
| 3. 配置模块边界规则 | 必需 | 强制依赖约束，防止不合理的跨模块引用 |
| 4. 修复违规导入 | 必需 | 清理现有违规，使代码符合规则 |
| 5. 添加 ESLint 插件 | 必需 | 启用模块边界检查 |
| 6. 创建文档 | 必需 | 团队了解规则，未来新组件遵循标准 |

## 标签分类方案

```
type:component    - UI 组件
type:mixin        - SCSS mixins
type:stylesheet   - 纯样式
type:util         - 工具函数
scope:public      - 公共 API
scope:internal    - 内部使用
```

## 步骤

### 1. 规划标签分类
- 审查 91 个组件的类型
- 确定哪些是 component、mixin、stylesheet、util
- 确定哪些是公共 API（对外发布）
- 确定哪些是内部使用（仅内部使用）

### 2. 为项目分配标签
- 编辑每个 project.json
- 添加 tags 数组
```json
{
  "tags": ["type:component", "scope:public"]
}
```
- 使用脚本批量添加

### 3. 配置模块边界规则
- 编辑 .eslintrc.json
- 添加/更新 @nx/enforce-module-boundaries 规则
```json
{
  "rules": {
    "@nx/enforce-module-boundaries": ["error", {
      "depConstraints": [
        {
          "sourceTag": "type:component",
          "onlyDependOnLibsWithTags": [
            "type:component",
            "type:util",
            "type:mixin"
          ]
        },
        {
          "sourceTag": "type:util",
          "onlyDependOnLibsWithTags": ["type:util"]
        }
      ]
    }]
  }
}
```

### 4. 修复违规导入
- 运行 nx affected --target=lint
- 查看模块边界违规错误
- 修复不符合规则的导入
- 或调整标签和规则

### 5. 添加 ESLint 插件配置
- 确保 @nx/eslint-plugin 已安装
- 在 .eslintrc.json 中配置 plugins 和 extends

### 6. 创建文档
- 记录标签分类标准
- 记录依赖规则
- 为团队提供指南

## 示例规则

```json
{
  "depConstraints": [
    {
      "sourceTag": "type:component",
      "onlyDependOnLibsWithTags": [
        "type:component",
        "type:util",
        "type:mixin",
        "type:stylesheet"
      ]
    },
    {
      "sourceTag": "type:mixin",
      "onlyDependOnLibsWithTags": [
        "type:mixin",
        "type:stylesheet"
      ]
    },
    {
      "sourceTag": "type:util",
      "onlyDependOnLibsWithTags": [
        "type:util"
      ]
    },
    {
      "sourceTag": "scope:internal",
      "notDependOnLibsWithTags": [
        "scope:public"
      ]
    }
  ]
}
```

## 交付物

- [ ] 91 个项目的标签配置
- [ ] ESLint 模块边界规则
- [ ] 所有违规导入已修复
- [ ] 标签分类文档
