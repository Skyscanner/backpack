# 步骤 4：添加 ESLint 规则

## 目标
配置 ESLint 规则和 Nx 模块边界检查，防止未来的内部 src 导入。

## 为什么需要此步骤
- 在开发期间立即捕获违规导入
- 在 CI/CD 中强制执行规则
- 为团队建立清晰的导入标准
- 防止问题再次发生

## 前提条件
- 步骤 3 已完成，所有内部导入已重构
- 当前代码通过所有检查
- 确认没有剩余的内部导入

## 详细执行步骤

### 4.1 了解 Nx 模块边界

Nx 提供 `@nx/enforce-module-boundaries` 规则来控制包之间的依赖：

```json
// .eslintrc.json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "enforceBuildableLibDependency": true,
        "allow": [],
        "depConstraints": [
          {
            "sourceTag": "*",
            "onlyDependOnLibsWithTags": ["*"]
          }
        ]
      }
    ]
  }
}
```

### 4.2 配置 no-restricted-imports 规则

添加 ESLint 规则禁止内部 src 导入：

```json
// .eslintrc.json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["**/src/**"],
            "message": "不允许从其他包的内部 src 文件导入。请使用包的公共入口点，例如 '@backpack/bpk-component-text'。"
          },
          {
            "group": ["../**/bpk-component-*/src/**"],
            "message": "不要使用相对路径导入其他组件的 src 文件。使用包名导入，例如 '@backpack/bpk-component-text'。"
          },
          {
            "group": ["../../**/src/**"],
            "message": "不要使用相对路径导入内部 src 文件。"
          }
        ]
      }
    ]
  }
}
```

### 4.3 配置包特定的 ESLint

为每个包单独配置：

```json
// packages/bpk-component-text/.eslintrc.json
{
  "extends": ["../../.eslintrc.json"],
  "ignorePatterns": ["!**/*"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "no-restricted-imports": [
          "error",
          {
            "patterns": [
              {
                "group": ["@backpack/*/src/**"],
                "message": "不允许从其他包的内部 src 文件导入"
              }
            ]
          }
        ]
      }
    }
  ]
}
```

### 4.4 配置更细粒度的规则

```json
// .eslintrc.json
{
  "rules": {
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["**/src/**"],
            "message": "不允许导入内部 src 文件"
          }
        ],
        "paths": [
          {
            "name": ".",
            "importNames": ["InternalHelper"],
            "message": "InternalHelper 是内部实现，不应导出或导入"
          }
        ]
      }
    ]
  }
}
```

### 4.5 添加自定义 ESLint 规则

创建自定义规则以实现更精确的导入控制：

```javascript
// eslint-rules/no-internal-imports.js
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: '禁止从其他包的内部 src 文件导入',
      category: 'Best Practices',
      recommended: true
    },
    messages: {
      noInternalImport: '不允许从 "{{source}}" 导入。请使用包的公共入口点。',
      usePublicApi: '请从 "{{packageName}}" 导入，而不是其内部 src 文件。'
    },
    schema: []
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const importSource = node.source.value;

        // 检测内部 src 导入模式
        const internalSrcPattern = /(.*)\/src\/(.*)/;
        const relativeComponentPattern = /\.\.\/\.\.\/bpk-component-(\w+)\/src/;

        if (relativeComponentPattern.test(importSource)) {
          const match = importSource.match(relativeComponentPattern);
          const componentName = match[1];
          const packageName = `@backpack/bpk-component-${componentName}`;

          context.report({
            node: node.source,
            messageId: 'usePublicApi',
            data: {
              packageName
            }
          });
        } else if (internalSrcPattern.test(importSource)) {
          context.report({
            node: node.source,
            messageId: 'noInternalImport',
            data: {
              source: importSource
            }
          });
        }
      }
    };
  }
};
```

使用自定义规则：

```json
// .eslintrc.json
{
  "plugins": ["local"],
  "rules": {
    "local/no-internal-imports": "error"
  }
}
```

### 4.6 配置 TypeScript 路径别名限制

通过 `tsconfig.json` 限制导入路径：

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@backpack/*": ["packages/*/src/index.ts"],
      // 不允许直接访问 src 下的其他文件
    }
  }
}
```

### 4.7 添加 Nx 标签和约束

使用 Nx 项目标签控制依赖：

```json
// packages/bpk-component-text/project.json
{
  "name": "bpk-component-text",
  "tags": ["type:component", "scope:ui"]
}
```

```json
// .eslintrc.json
{
  "rules": {
    "@nx/enforce-module-boundaries": [
      "error",
      {
        "depConstraints": [
          {
            "sourceTag": "type:component",
            "onlyDependOnLibsWithTags": ["type:component", "type:util"],
            "bannedExternalImports": []
          }
        ]
      }
    ]
  }
}
```

### 4.8 配置 CI/CD 检查

```yaml
# .github/workflows/lint.yml
name: Lint

on: [push, pull_request]

jobs:
  eslint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npm run lint

      - name: Check for internal imports
        run: |
          if grep -r "from ['\"].*\\.\\./.*src/" packages/ --include="*.ts" --include="*.tsx"; then
            echo "❌ 发现内部 src 导入！"
            exit 1
          fi
          echo "✓ 没有内部 src 导入"
```

### 4.9 添加 pre-commit Hook

```bash
# .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo "🔍 检查 ESLint 规则..."

# 运行 ESLint
npm run lint --quiet

# 检查内部导入
if git diff --cached --name-only | grep -E '\.(ts|tsx)$' | xargs grep -l "from ['\"].*\\.\\./.*src/" 2>/dev/null; then
  echo "❌ 错误：发现内部 src 导入！"
  echo "请使用包的公共入口点，例如 '@backpack/bpk-component-text'"
  exit 1
fi

echo "✓ ESLint 检查通过"
```

安装 husky：

```bash
npm install --save-dev husky
npx husky install
npx husky add .husky/pre-commit "npm run lint-staged"
```

### 4.10 配置 lint-staged

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write",
      "bash -c 'if grep -l \"from [\\'\\\"].*\\.\\./.*src/\" \"$@\"; then echo \"错误：发现内部 src 导入\"; exit 1; fi' _"
    ]
  }
}
```

### 4.11 创建文档和指南

```markdown
// docs/import-guidelines.md
# 导入标准指南

## 正确的导入方法 ✅

### 导入 Backpack 组件
\```typescript
// ✅ 使用包名导入
import { BpkText } from '@backpack/bpk-component-text';
import { TEXT_STYLES } from '@backpack/bpk-component-text';
\```

### 导入类型
\```typescript
// ✅ 使用 type 关键字
import type { BpkTextProps } from '@backpack/bpk-component-text';
\```

### 导入本地文件
\```typescript
// ✅ 同一包内的相对导入
import { LocalHelper } from './LocalHelper';
import { utils } from '../utils';
\```

## 错误的导入方法 ❌

### 不要导入 src 内部文件
\```typescript
// ❌ 不要直接导入 src 文件
import { TEXT_STYLES } from '../../bpk-component-text/src/BpkText';
import { Helper } from '@backpack/bpk-component-text/src/utils';
\```

### 不要使用深层相对路径
\```typescript
// ❌ 避免跨包相对导入
import { something } from '../../../other-package/src/file';
\```

## 如果所需导入项不可用

1. 检查组件的 `index.ts` 是否导出了该项
2. 如果没有，提交 issue 或 PR 请求导出
3. 如果它是内部实现细节，考虑替代方案

## ESLint 规则

当违反导入标准时，ESLint 会报错：

\```
error  不要从内部 src 文件导入  no-restricted-imports
error  使用来自 "@backpack/bpk-component-text" 的公共 API  @nx/enforce-module-boundaries
\```

## 常见问题

### Q：为什么不能导入 src 文件？
A：这违反了模块封装原则。组件 src 是实现细节，应通过公共 API 访问。

### Q：如何确定可以导入什么？
A：只导入包的 index.ts 导出的内容。

### Q：遇到 ESLint 错误怎么办？
A：不要禁用规则！修改导入路径以使用公共 API。
\```

## 输出产物

- [ ] 更新的 `.eslintrc.json`
- [ ] 自定义 ESLint 规则（如果需要）
- [ ] CI/CD 配置文件
- [ ] Pre-commit hooks
- [ ] 导入标准文档
- [ ] 测试用例

## 验证清单

### 配置验证
- [ ] ESLint 规则已添加
- [ ] Nx 模块边界已配置
- [ ] 规则在所有包中生效
- [ ] 自定义规则测试通过

### 功能验证
- [ ] 违规导入触发错误
- [ ] 正确导入不触发错误
- [ ] CI/CD 检查正常工作
- [ ] Pre-commit hooks 正常工作

### 文档验证
- [ ] 导入指南已创建
- [ ] 团队已通知新规则
- [ ] README 已更新

## 常见问题

**Q：ESLint 规则太严格怎么办？**
A：规则应该严格以防止违规。对于特殊情况，使用 eslint-disable 注释并说明原因。

**Q：如何处理遗留代码？**
A：应该在步骤 3 中全部重构。如果发现遗留代码，立即修复。

**Q：规则会影响性能吗？**
A：ESLint 规则只在开发时运行，不影响运行时性能。

**Q：如何临时禁用规则？**
A：
```typescript
// eslint-disable-next-line no-restricted-imports -- 特殊原因
import { something } from '../../other/src/file';
```
但应避免这样做。

## 下一步

完成 ESLint 规则配置后，进入步骤 5：批量修复（确保所有文件符合新规则）
