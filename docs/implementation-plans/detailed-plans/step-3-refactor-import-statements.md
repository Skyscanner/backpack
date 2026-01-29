# 步骤 3：重构导入语句

## 目标
将所有内部 src 导入更改为使用包的公共入口点，修复封装违规。

## 为什么需要此步骤
- 修复违反模块封装的导入
- 使用步骤 2 中建立的公共 API
- 确保代码遵循最佳实践
- 为启用 ESLint 规则做准备

## 前提条件
- 步骤 1 审计已完成
- 步骤 2 导出已添加
- 所有必需项可以从包入口点导入

## 详细执行步骤

### 3.1 创建重构脚本

```javascript
// refactor-imports.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// 重构规则配置
const refactorRules = [
  {
    // bpk-component-text 内部导入
    pattern: /from ['"](.*)bpk-component-text\/src\/(.*)['"];?/g,
    replacement: "from '@backpack/bpk-component-text';",
    extractImports: true
  },
  {
    // 相对路径导入到其他组件的 src
    pattern: /from ['"]\.\.\/\.\.\/bpk-component-(\w+)\/src\/(.*)['"];?/g,
    replacement: (match, componentName) =>
      `from '@backpack/bpk-component-${componentName}';`
  }
];

// 重构单个文件
function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  refactorRules.forEach(rule => {
    if (content.match(rule.pattern)) {
      content = content.replace(rule.pattern, rule.replacement);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✓ 已重构：${filePath}`);
    return true;
  }

  return false;
}

// 批量重构
function refactorDirectory(dirPath) {
  const files = glob.sync(`${dirPath}/**/*.{ts,tsx}`, {
    ignore: ['**/node_modules/**', '**/dist/**']
  });

  let refactoredCount = 0;

  files.forEach(file => {
    if (refactorFile(file)) {
      refactoredCount++;
    }
  });

  console.log(`\n重构文件总数：${refactoredCount}`);
}

// 执行
refactorDirectory('./packages');
```

### 3.2 高级重构脚本 - 使用 AST

对于更复杂的场景，使用 AST 解析：

```javascript
// refactor-imports-ast.js
const fs = require('fs');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

function refactorImportsAST(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');

  // 将代码解析为 AST
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript', 'jsx']
  });

  let modified = false;

  // 遍历 AST
  traverse(ast, {
    ImportDeclaration(path) {
      const importSource = path.node.source.value;

      // 检测内部 src 导入
      const match = importSource.match(/\.\.\/\.\.\/bpk-component-(\w+)\/src\/.*/);

      if (match) {
        const componentName = match[1];
        const newSource = `@backpack/bpk-component-${componentName}`;

        // 修改导入源
        path.node.source = t.stringLiteral(newSource);
        modified = true;

        console.log(`  ${importSource} → ${newSource}`);
      }
    }
  });

  // 如果修改了，写回文件
  if (modified) {
    const output = generate(ast, {
      retainLines: true,
      compact: false
    }, code);

    fs.writeFileSync(filePath, output.code, 'utf8');
    console.log(`✓ 已重构：${filePath}`);
    return true;
  }

  return false;
}
```

### 3.3 按组件批量重构

不要一次重构所有文件，按组件分批：

```bash
# 第一批：text 组件相关
node refactor-imports.js --component=text

# 第二批：button 组件相关
node refactor-imports.js --component=button

# 继续其他组件...
```

批处理脚本：

```javascript
// refactor-by-component.js
const component = process.argv[2];

if (!component) {
  console.error('请指定组件名：node refactor-by-component.js <component>');
  process.exit(1);
}

// 只重构与指定组件相关的导入
const pattern = new RegExp(
  `from ['"](.*)bpk-component-${component}/src/(.*)['"];?`,
  'g'
);

// ... 使用 pattern 进行重构
```

### 3.4 手动重构复杂情况

某些复杂导入需要手动处理：

#### 场景 1：多项导入

```typescript
// 之前
import {
  TEXT_STYLES,
  type TextStyle,
  getTextClass
} from '../../bpk-component-text/src/BpkText';

// 之后
import {
  TEXT_STYLES,
  type TextStyle,
  getTextClass
} from '@backpack/bpk-component-text';
```

#### 场景 2：拆分导入

如果某些项未导出，需要拆分：

```typescript
// 之前
import {
  TEXT_STYLES,          // 已导出
  InternalHelper        // 未导出
} from '../../bpk-component-text/src/BpkText';

// 之后
import { TEXT_STYLES } from '@backpack/bpk-component-text';
// InternalHelper 需要在本地重新实现或找到替代方案
```

#### 场景 3：副作用导入

```typescript
// 之前
import '../../bpk-component-text/src/BpkText.scss';

// 之后
import '@backpack/bpk-component-text/src/BpkText.scss';
// 或如果样式包含在组件中
import '@backpack/bpk-component-text';
```

### 3.5 创建重构映射表

```typescript
// refactor-mapping.ts
export const REFACTOR_MAPPING = {
  // 旧路径 → 新路径
  '../../bpk-component-text/src/BpkText': '@backpack/bpk-component-text',
  '../../bpk-component-button/src/BpkButton': '@backpack/bpk-component-button',
  // ... 更多映射

  // 特殊情况
  '../../bpk-component-text/src/constants': {
    newPath: '@backpack/bpk-component-text',
    note: '常量现在从主入口导出'
  }
};
```

### 3.6 验证重构

每次重构后立即验证：

```javascript
// verify-refactor.js
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

async function verifyRefactor() {
  console.log('开始验证...\n');

  // 1. TypeScript 检查
  console.log('1. 运行 TypeScript 检查...');
  try {
    await execPromise('npm run type-check');
    console.log('✓ TypeScript 检查通过');
  } catch (error) {
    console.error('✗ TypeScript 检查失败');
    console.error(error.stdout);
    return false;
  }

  // 2. 构建检查
  console.log('\n2. 运行构建...');
  try {
    await execPromise('npm run build');
    console.log('✓ 构建成功');
  } catch (error) {
    console.error('✗ 构建失败');
    console.error(error.stdout);
    return false;
  }

  // 3. 测试检查
  console.log('\n3. 运行测试...');
  try {
    await execPromise('npm test');
    console.log('✓ 测试通过');
  } catch (error) {
    console.error('✗ 测试失败');
    console.error(error.stdout);
    return false;
  }

  // 4. 检查剩余的内部导入
  console.log('\n4. 检查剩余的内部导入...');
  try {
    const { stdout } = await execPromise(
      "grep -r \"from ['\\\"].*\\.\\./.*src/\" packages/ --include=\"*.ts\" --include=\"*.tsx\" || true"
    );

    if (stdout.trim()) {
      console.error('✗ 发现剩余的内部导入：');
      console.error(stdout);
      return false;
    } else {
      console.log('✓ 没有剩余的内部导入');
    }
  } catch (error) {
    console.error('检查失败：', error);
    return false;
  }

  console.log('\n✅ 所有验证通过！');
  return true;
}

verifyRefactor();
```

## 渐进式重构策略

### 策略 A：按组件重构

```bash
# 周一：text 组件
npm run refactor -- --component=text
npm run verify
git commit -am "refactor: 迁移 text 组件导入"

# 周二：button 组件
npm run refactor -- --component=button
npm run verify
git commit -am "refactor: 迁移 button 组件导入"

# 继续...
```

### 策略 B：按目录重构

```bash
# 先重构 packages 下的组件
npm run refactor -- --dir=packages/bpk-component-*
npm run verify

# 然后重构应用代码
npm run refactor -- --dir=packages/app
npm run verify
```

### 策略 C：按影响范围重构

```bash
# 先重构低风险文件（少量导入）
npm run refactor -- --risk=low
npm run verify

# 然后重构中等风险
npm run refactor -- --risk=medium
npm run verify

# 最后重构高风险文件（大量导入）
npm run refactor -- --risk=high
npm run verify
```

## 处理特殊情况

### 1. 循环依赖

如果重构后出现循环依赖：

```typescript
// 问题：A 导入 B，B 导入 A
// packages/A/src/index.ts
import { something } from '@backpack/B';

// packages/B/src/index.ts
import { other } from '@backpack/A';

// 解决方案：将共享代码提取到新包
// packages/shared/src/index.ts
export { something, other };
```

### 2. 类型导入优化

```typescript
// 之前
import { BpkTextProps } from '@backpack/bpk-component-text';

// 之后（仅类型导入）
import type { BpkTextProps } from '@backpack/bpk-component-text';
```

### 3. 保持导入顺序

```typescript
// 推荐的导入顺序
// 1. 外部依赖
import React from 'react';

// 2. Backpack 组件
import { BpkText } from '@backpack/bpk-component-text';
import { BpkButton } from '@backpack/bpk-component-button';

// 3. 本地导入
import { LocalComponent } from './LocalComponent';
import styles from './styles.scss';
```

## 输出产物

- [ ] 重构脚本（`refactor-imports.js`）
- [ ] AST 重构脚本（如果需要）
- [ ] 验证脚本（`verify-refactor.js`）
- [ ] 重构映射表
- [ ] 重构日志（哪些文件被修改）
- [ ] 问题列表（需要手动处理的情况）

## 验证清单

### 自动验证
- [ ] TypeScript 编译无错误
- [ ] 所有测试通过
- [ ] 构建成功
- [ ] 没有剩余的内部 src 导入
- [ ] ESLint 无错误

### 手动验证
- [ ] 抽查关键文件的导入
- [ ] 运行应用确保功能正常
- [ ] 检查 dev tools 中的导入路径
- [ ] Code review 重要变更

## 回滚计划

如果重构导致问题：

```bash
# 如果使用 git，回滚到重构前
git reset --hard HEAD~1

# 如果需要部分回滚
git checkout HEAD -- packages/specific-component/

# 如果已经推送，创建 revert commit
git revert <commit-hash>
```

## 常见问题

**Q：重构破坏了某些功能怎么办？**
A：立即回滚，检查未导出的依赖，补充导出后再重构。

**Q：动态导入如何处理？**
A：动态导入也应使用包路径：
```typescript
const module = await import('@backpack/bpk-component-text');
```

**Q：测试文件需要重构吗？**
A：是的，测试文件应遵循相同的导入规则。

**Q：重构会影响性能吗？**
A：不会，打包工具处理路径解析，运行时性能不受影响。

## 最佳实践

✅ **做：**
- 小批量重构
- 每次重构后立即验证
- 使用清晰的 commit 消息提交
- 保留重构日志
- 使用自动化脚本

❌ **不做：**
- 一次重构所有文件
- 跳过验证步骤
- 修改不相关的代码
- 忽略类型错误
- 手动修改大量文件

## 下一步

完成重构并通过验证后，进入步骤 4：添加 ESLint 规则
