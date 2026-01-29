# Technical Design: Nx Configuration

**Date**: 2026-01-27
**Purpose**: 详细的 Nx 配置设计和示例代码

## 1. nx.json 完整配置

```json
{
  "$schema": "./node_modules/nx/schemas/nx-schema.json",
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": [
      "default",
      "!{projectRoot}/**/?(*.)+(spec|test).[jt]s?(x)?(.snap)",
      "!{projectRoot}/**/*.stories.@(js|jsx|ts|tsx)",
      "!{projectRoot}/.eslintrc.json"
    ],
    "sharedGlobals": [
      "{workspaceRoot}/babel.config.js",
      "{workspaceRoot}/tsconfig.json",
      "{workspaceRoot}/jest.config.js"
    ]
  },
  "plugins": [
    {
      "plugin": "@nx/js",
      "options": {
        "analyzeSourceFiles": true,
        "analyzePackageJson": true
      }
    },
    {
      "plugin": "@nx/eslint/plugin",
      "options": {
        "targetName": "lint"
      }
    },
    {
      "plugin": "@nx/jest/plugin",
      "options": {
        "targetName": "test"
      }
    },
    {
      "plugin": "@nx/storybook/plugin",
      "options": {
        "serveTargetName": "storybook",
        "buildTargetName": "build-storybook"
      }
    },
    {
      "plugin": "nx-stylelint/plugin",
      "options": {
        "targetName": "stylelint"
      }
    }
  ],
  "targetDefaults": {
    "build": {
      "cache": true,
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    },
    "test": {
      "cache": true,
      "inputs": ["default", "^production", "{workspaceRoot}/jest.preset.js"]
    },
    "lint": {
      "cache": true,
      "inputs": [
        "default",
        "{workspaceRoot}/.eslintrc.json",
        "{workspaceRoot}/.eslintignore"
      ]
    },
    "stylelint": {
      "cache": true,
      "inputs": [
        "{projectRoot}/**/*.scss",
        "{workspaceRoot}/.stylelintrc"
      ]
    }
  },
  "defaultBase": "main",
  "workspaceLayout": {
    "libsDir": "packages"
  },
  "release": {
    "projects": ["@skyscanner/backpack-web"],
    "projectsRelationship": "fixed",
    "version": {
      "conventionalCommits": true,
      "generatorOptions": {
        "currentVersionResolver": "git-tag",
        "specifierSource": "conventional-commits"
      }
    },
    "changelog": {
      "workspaceChangelog": {
        "createRelease": "github",
        "file": "CHANGELOG.md",
        "renderOptions": {
          "authors": true,
          "commitReferences": true,
          "versionTitleDate": true
        }
      }
    },
    "git": {
      "commit": true,
      "commitMessage": "chore(release): publish {version}",
      "tag": true,
      "tagMessage": "v{version}"
    }
  }
}
```

## 2. 项目推断规则

Nx 将基于以下规则自动识别项目：

### 识别条件
- 目录位于 `packages/` 下
- 包含 `index.ts` 或 `src/index.ts`
- 包含 `tsconfig.json` (可选，将被创建)

### 自动推断的 Targets

| Target | 触发条件 | 命令 |
|--------|---------|------|
| `build` | 存在 TypeScript 文件 | 根据 tsconfig 配置 |
| `test` | 存在 `jest.config.js` 或测试文件 | `jest` |
| `lint` | 存在 `.eslintrc.json` 或继承根配置 | `eslint` |
| `stylelint` | 存在 `.scss` 文件 | `stylelint` |
| `storybook` | 存在 `.stories.tsx` 文件 | `storybook dev` |

## 3. 代码生成组件的 project.json

### bpk-component-icon/project.json

```json
{
  "name": "bpk-component-icon",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/bpk-component-icon/src",
  "projectType": "library",
  "tags": ["scope:component", "type:ui", "has:codegen"],
  "targets": {
    "generate-icons": {
      "executor": "nx:run-commands",
      "options": {
        "command": "gulp icons",
        "cwd": "{workspaceRoot}"
      },
      "inputs": [
        "{projectRoot}/src/**/*.svg",
        "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/**/*.svg",
        "{workspaceRoot}/gulpfile.js"
      ],
      "outputs": [
        "{projectRoot}/src/generated/"
      ],
      "cache": true
    },
    "build": {
      "dependsOn": ["generate-icons"]
    }
  }
}
```

### bpk-component-spinner/project.json

```json
{
  "name": "bpk-component-spinner",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/bpk-component-spinner/src",
  "projectType": "library",
  "tags": ["scope:component", "type:ui", "has:codegen"],
  "targets": {
    "generate-spinners": {
      "executor": "nx:run-commands",
      "options": {
        "command": "gulp spinners",
        "cwd": "{workspaceRoot}"
      },
      "inputs": [
        "{projectRoot}/src/**/*.svg",
        "{workspaceRoot}/gulpfile.js"
      ],
      "outputs": [
        "{projectRoot}/src/generated/"
      ],
      "cache": true
    },
    "build": {
      "dependsOn": ["generate-spinners"]
    }
  }
}
```

## 4. TypeScript 配置

### tsconfig.base.json (新增)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "strict": true,
    "noImplicitAny": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@skyscanner/backpack-web/*": ["packages/*/src"]
    }
  }
}
```

### 组件 tsconfig.json 模板

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.tsx"]
}
```

### tsconfig.spec.json 模板

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist-test",
    "types": ["jest", "node", "@testing-library/jest-dom"]
  },
  "include": [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}
```

## 5. ESLint 模块边界配置

### .eslintrc.json (根目录更新)

```json
{
  "root": true,
  "extends": ["@skyscanner/eslint-config-skyscanner"],
  "plugins": ["@nx"],
  "overrides": [
    {
      "files": ["*.ts", "*.tsx", "*.js", "*.jsx"],
      "rules": {
        "@nx/enforce-module-boundaries": [
          "error",
          {
            "enforceBuildableLibDependency": true,
            "allow": [],
            "depConstraints": [
              {
                "sourceTag": "scope:component",
                "onlyDependOnLibsWithTags": [
                  "scope:foundation",
                  "scope:component"
                ]
              },
              {
                "sourceTag": "scope:foundation",
                "onlyDependOnLibsWithTags": ["scope:foundation"]
              },
              {
                "sourceTag": "scope:example",
                "onlyDependOnLibsWithTags": [
                  "scope:component",
                  "scope:foundation"
                ]
              }
            ]
          }
        ]
      }
    }
  ]
}
```

## 6. CI/CD 配置更新

### .github/workflows/ci.yml

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  NX_CLOUD_ACCESS_TOKEN: ${{ secrets.NX_CLOUD_ACCESS_TOKEN }}

jobs:
  main:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.20.4'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Set Nx SHAs
        uses: nrwl/nx-set-shas@v4

      - name: Lint affected
        run: npx nx affected -t lint --parallel=3

      - name: Test affected
        run: npx nx affected -t test --parallel=3 --coverage

      - name: Build affected
        run: npx nx affected -t build --parallel=3

      - name: Typecheck affected
        run: npx nx affected -t typecheck --parallel=3
```

### .github/workflows/release.yml

```yaml
name: Release

on:
  workflow_dispatch:
    inputs:
      version:
        description: 'Version type (major, minor, patch)'
        required: true
        type: choice
        options:
          - patch
          - minor
          - major

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      id-token: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18.20.4'
          registry-url: 'https://registry.npmjs.org'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Configure Git
        run: |
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"

      - name: Version and Changelog
        run: npx nx release --skip-publish

      - name: Build
        run: npm run build

      - name: Publish
        run: npx nx release publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}

      - name: Push changes
        run: git push --follow-tags
```

## 7. Commitlint 配置

### commitlint.config.js

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // Bug 修复
        'docs',     // 文档更新
        'style',    // 代码格式
        'refactor', // 重构
        'perf',     // 性能优化
        'test',     // 测试
        'build',    // 构建系统
        'ci',       // CI 配置
        'chore',    // 其他
        'revert',   // 回滚
      ],
    ],
    'scope-enum': [
      2,
      'always',
      [
        'button',
        'card',
        'icon',
        'spinner',
        'mixins',
        'utils',
        'theming',
        'storybook',
        'deps',
        'release',
        // ... 其他组件
      ],
    ],
  },
};
```

### .husky/commit-msg

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no -- commitlint --edit ${1}
```

## 8. Storybook 配置更新

### .storybook/main.ts

```typescript
import type { StorybookConfig } from '@storybook/react-webpack5';

const config: StorybookConfig = {
  stories: [
    // 从组件目录加载 stories
    '../packages/**/src/**/*.stories.@(js|jsx|ts|tsx)',
    // 保留示例应用 (如果有)
    '../examples/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
```

## 9. 验证命令列表

```bash
# Nx 基础验证
nx --version                    # 确认 Nx 安装
nx show projects                # 列出所有项目
nx graph                        # 可视化依赖图

# 单项目命令
nx lint bpk-component-button
nx test bpk-component-button
nx build bpk-component-button

# 受影响项目命令
nx affected -t lint --base=main
nx affected -t test --base=main
nx affected -t build --base=main

# 缓存验证
nx reset                        # 清除缓存
nx lint bpk-component-button    # 第一次运行
nx lint bpk-component-button    # 第二次应该命中缓存

# 发布验证
nx release --dry-run           # 预览发布
nx release version --dry-run   # 预览版本变更
nx release changelog --dry-run # 预览 changelog
```
