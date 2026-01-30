# 步骤 2：为组件添加导出

## 目标
为有内部导入的组件的公共入口点（index.ts）添加必需的导出，建立适当的公共 API。

## 为什么需要此步骤
- 建立组件的公共 API 契约
- 允许其他包正确导入所需项
- 在提供必要访问的同时保持模块封装
- 为步骤 3 重构做准备

## 前提条件
- 步骤 1 审计报告已完成
- 清楚了解哪些组件需要导出哪些项

## 详细执行步骤

### 2.1 分析需要导出的项

从审计报告中提取信息：

```javascript
// analyze-exports.js
const auditReport = require('./audit-report.json');

// 按组件分组需要导出的项
const exportsNeeded = {};

auditReport.imports.forEach(entry => {
  const { component, importedItems } = entry;

  if (!exportsNeeded[component]) {
    exportsNeeded[component] = new Set();
  }

  importedItems.forEach(item => {
    exportsNeeded[component].add(item);
  });
});

// 生成导出清单
console.log('## 需要添加的导出\n');
Object.entries(exportsNeeded).forEach(([component, items]) => {
  console.log(`### ${component}`);
  console.log('需要导出的项：');
  items.forEach(item => console.log(`- ${item}`));
  console.log();
});
```

### 2.2 检查现有导出

对每个组件：

```bash
# 检查现有的 index.ts 或 index.js
cat packages/bpk-component-text/src/index.ts
```

记录：
- 当前导出
- 缺失的导出
- 导出格式和结构

### 2.3 添加导出 - 模式 A：直接导出

适用于简单的常量、类型、函数：

```typescript
// packages/bpk-component-text/src/index.ts

// 现有导出
export { default } from './BpkText';
export type { BpkTextProps } from './BpkText';

// 新导出
export { TEXT_STYLES } from './BpkText';
export type { TextStyle, TextWeight } from './BpkText';
```

### 2.4 添加导出 - 模式 B：重新导出

适用于从多个文件导出：

```typescript
// packages/bpk-component-text/src/index.ts

// 主组件
export { default } from './BpkText';

// 类型
export type {
  BpkTextProps,
  TextStyle,
  TextWeight
} from './BpkText';

// 常量
export {
  TEXT_STYLES,
  TEXT_WEIGHTS
} from './constants';

// 工具函数
export {
  getTextClass,
  isValidTextStyle
} from './utils';
```

### 2.5 添加导出 - 模式 C：命名空间导出

适用于大量相关导出：

```typescript
// packages/bpk-component-text/src/index.ts

// 默认导出主组件
export { default } from './BpkText';
export type { BpkTextProps } from './BpkText';

// 命名空间导出所有相关项
export * as TextConstants from './constants';
export * as TextTypes from './types';
export * as TextUtils from './utils';
```

### 2.6 更新组件的 package.json

确保 package.json 正确指向 index.ts：

```json
{
  "name": "@backpack/bpk-component-text",
  "version": "x.x.x",
  "main": "src/index.ts",
  "types": "src/index.ts",
  "exports": {
    ".": {
      "import": "./src/index.ts",
      "require": "./src/index.ts",
      "types": "./src/index.ts"
    }
  }
}
```

### 2.7 为每个组件创建 PR 清单

```markdown
## bpk-component-text

### 需要导出的项
- [ ] TEXT_STYLES（常量）
- [ ] TextStyle（类型）
- [ ] TextWeight（类型）

### 文件修改
- [ ] src/index.ts - 添加导出语句
- [ ] src/BpkText.tsx - 确保项已导出
- [ ] package.json - 验证入口点配置

### 验证
- [ ] 本地构建成功
- [ ] TypeScript 类型检查通过
- [ ] 可以从外部包正确导入
```

## 最佳实践

### 1. 导出命名约定

```typescript
// ✅ 良好实践
export { TEXT_STYLES } from './BpkText';
export type { BpkTextProps } from './BpkText';

// ❌ 避免
export * from './BpkText'; // 过于宽泛，暴露内部实现
```

### 2. 类型安全

```typescript
// 确保类型也被正确导出
export type {
  // 公共 Props 类型
  BpkTextProps,

  // 枚举/联合类型
  TextStyle,
  TextWeight,

  // 工具类型（如果需要）
  TextClassName
} from './BpkText';
```

### 3. 向后兼容

如果组件已在生产中，确保：
- 不破坏现有导出
- 只添加新导出
- 保持默认导出不变

```typescript
// 保持向后兼容
export { default } from './BpkText'; // 现有
export { default as BpkText } from './BpkText'; // 新别名

export type { BpkTextProps } from './BpkText'; // 现有
export { TEXT_STYLES } from './BpkText'; // 新
```

### 4. 文档注释

为公共导出添加 JSDoc：

```typescript
/**
 * 预定义的文本样式，用于一致的排版。
 * @example
 * import { TEXT_STYLES } from '@backpack/bpk-component-text';
 *
 * <BpkText textStyle={TEXT_STYLES.heading1}>标题</BpkText>
 */
export { TEXT_STYLES } from './BpkText';
```

## 验证步骤

### 1. 本地验证

```bash
# 在组件目录中运行构建
cd packages/bpk-component-text
npm run build

# 检查类型
npm run type-check

# 测试导入
node -e "const { TEXT_STYLES } = require('./src/index.ts'); console.log(TEXT_STYLES)"
```

### 2. 跨包验证

```bash
# 从另一个包测试导入
cd packages/bpk-component-heading
node -e "const { TEXT_STYLES } = require('@backpack/bpk-component-text'); console.log(TEXT_STYLES)"
```

### 3. TypeScript 验证

创建测试文件：

```typescript
// test-exports.ts
import {
  default as BpkText,
  TEXT_STYLES,
  type BpkTextProps,
  type TextStyle
} from '@backpack/bpk-component-text';

// 类型检查
const props: BpkTextProps = {
  children: '测试',
  textStyle: TEXT_STYLES.body
};

const style: TextStyle = 'heading1';

console.log('所有导出可用 ✓');
```

## 输出产物

- [ ] 每个组件更新的 index.ts
- [ ] 导出清单文档
- [ ] 验证测试脚本
- [ ] 变更日志（记录所有修改）

## 验证清单

- [ ] 所有必需项已导出
- [ ] 没有意外暴露内部实现细节
- [ ] TypeScript 类型检查通过
- [ ] 可以从其他包成功导入
- [ ] 向后兼容性保持
- [ ] 文档已更新

## 常见问题

**Q：如果某个内部项不应该公开怎么办？**
A：重构使用该项的代码以使用公共 API，或在组件内复制该逻辑。

**Q：如何决定应该导出什么？**
A：只导出步骤 1 审计确认需要的项，遵循最小暴露原则。

**Q：导出会影响 bundle 大小吗？**
A：只要不使用，tree-shaking 会移除未使用的导出。但确保导出有用。

**Q：组件测试需要更新吗？**
A：通常不需要，但运行测试确保没有破坏性变更。

## 注意事项

⚠️ **不要过度导出**
- 只导出明确需要的项
- 避免广泛导出如 `export *`
- 保护内部实现细节

⚠️ **保持 API 稳定**
- 不要轻易更改现有导出
- 考虑新导出的长期维护
- 使用语义化版本控制

⚠️ **类型安全**
- 确保类型导出完整
- 避免 `any` 类型泄漏
- 使用 `export type` 明确导出类型

## 下一步

完成所有组件的导出后，进入步骤 3：重构导入语句
