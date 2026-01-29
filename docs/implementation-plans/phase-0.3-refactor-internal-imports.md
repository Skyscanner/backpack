# 阶段 0.3：重构内部 src 导入

**依赖于**：阶段 0.2

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 审计内部 src 导入 | 必需 | 识别所有违反模块封装的导入 |
| 2. 为组件添加导出 | 必需 | 提供公共导出接口以支持正确导入 |
| 3. 重构导入语句 | 必需 | 修复封装违规，使用包入口点 |
| 4. 添加 ESLint 规则 | 必需 | 防止未来的内部导入，Nx 模块边界会报错 |
| 5. 批量修复 | 必需 | 确保所有文件都已修复 |

## 当前问题

一些组件直接从其他组件导入内部 src 文件，违反了模块封装：
```typescript
// 错误示例
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
```

## 步骤

### 1. 审计内部 src 导入
- 使用 grep 查找所有 `from '../../xxx/src/...'` 模式
- 生成受影响文件列表
- 评估影响范围

### 2. 为组件添加导出
- 查找有内部导入的组件
- 在其 index.ts 中导出需要的常量/类型/函数
```typescript
// packages/bpk-component-text/src/index.ts
export { TEXT_STYLES } from './BpkText';
export { default } from './BpkText';
```

### 3. 重构导入语句
- 创建批量重构脚本
- 将内部 src 导入更改为包入口导入
```typescript
// 更改为
import { TEXT_STYLES } from '@backpack/bpk-component-text';
```

### 4. 添加 ESLint 规则
- 编辑 .eslintrc.json
- 添加 no-restricted-imports 规则
- 防止未来的内部 src 导入
```json
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": ["**/src/*"]
    }]
  }
}
```

### 5. 批量修复
- 运行重构脚本
- 手动检查关键文件
- 运行测试确保无破坏性

## 交付物

- [ ] 所有内部 src 导入已重构
- [ ] ESLint 规则已添加
- [ ] 组件导出已更新
