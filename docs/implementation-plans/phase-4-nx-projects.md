# 阶段 4：配置 Nx 项目

**依赖于**：阶段 2
**可与阶段 3 并行**

## 步骤概览

| 步骤 | 必需/可选 | 核心原因 |
|------|-------------------|-------------|
| 1. 配置 nx.json targetDefaults | 必需 | 集中管理所有组件的通用构建配置 |
| 2. 编写 project.json 生成脚本 | 必需 | 自动化为 91 个组件生成最小化配置 |
| 3. 批量生成 project.json | 必需 | 使 Nx 识别 91 个组件为独立项目 |
| 4. 批量创建 TypeScript 配置 | 必需 | 每个项目需要独立的 TS 配置 |
| 5. 验证项目配置 | 必需 | 确认所有组件被 Nx 识别 |

## 背景说明

**为什么不使用 Nx 项目推断（Project Inference）？**

Nx 项目推断要求每个项目目录下有独立的 package.json 文件，但 Backpack 当前使用单一 npm 包发布模式：
- 发布单一包：`@skyscanner/backpack-web`
- 所有 91 个组件都包含在同一个包中
- 每个组件目录下没有独立的 package.json

如果要使用项目推断，需要：
1. 拆分为 91 个独立 npm 包（如 `@skyscanner/bpk-component-button`）
2. 这是重大 Breaking Change，不在本次迁移范围内

因此采用**脚本批量生成 project.json** + **nx.json targetDefaults 统一配置**的混合模式。

---

## 步骤

### 1. 配置 nx.json targetDefaults

**为什么**：将所有组件的通用构建配置集中在 nx.json 中，避免在 91 个 project.json 中重复配置。

**做什么**：
- 编辑 [nx.json](../../nx.json)
- 添加 targetDefaults 定义通用 targets（build、test、lint、typecheck）
- 配置 inputs、outputs、cache、dependsOn

**示例配置**：
```json
{
  "targetDefaults": {
    "build": {
      "executor": "@nx/js:tsc",
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"],
      "outputs": ["{options.outputPath}"],
      "cache": true,
      "options": {
        "outputPath": "dist/{projectRoot}",
        "tsConfig": "{projectRoot}/tsconfig.lib.json"
      }
    },
    "test": {
      "executor": "@nx/jest:jest",
      "inputs": ["default", "^production", "{workspaceRoot}/jest.config.js"],
      "cache": true,
      "options": {
        "jestConfig": "{workspaceRoot}/jest.config.js",
        "testPathPattern": "{projectRoot}"
      }
    },
    "lint": {
      "executor": "@nx/eslint:lint",
      "inputs": ["default", "{workspaceRoot}/.eslintrc.json"],
      "cache": true
    },
    "typecheck": {
      "executor": "nx:run-commands",
      "inputs": ["default", "^production"],
      "cache": true,
      "options": {
        "command": "tsc --noEmit -p {projectRoot}/tsconfig.lib.json"
      }
    }
  }
}
```

---

### 2. 编写 project.json 生成脚本

**为什么**：自动化生成 91 个 project.json，确保配置一致性，避免手动重复劳动。

**做什么**：
- 创建 [scripts/generate-nx-projects.js](../../scripts/generate-nx-projects.js)
- 扫描 packages/ 目录，查找所有 bpk-component-*、bpk-mixins、bpk-react-utils、bpk-tokens 等包
- 为每个包生成最小化的 project.json（仅包含 name 和 $schema）
- 跳过已有 project.json 的组件（Icon、Flare、Spinner 在 Phase 0.4 已创建）

**脚本示例**：
```javascript
const fs = require('fs');
const path = require('path');

const packagesDir = path.join(__dirname, '../packages');
const packages = fs.readdirSync(packagesDir)
  .filter(dir => {
    const fullPath = path.join(packagesDir, dir);
    return fs.statSync(fullPath).isDirectory() &&
           (dir.startsWith('bpk-component-') ||
            dir.startsWith('bpk-mixins') ||
            dir.startsWith('bpk-react-utils') ||
            dir.startsWith('bpk-tokens'));
  });

let created = 0;
let skipped = 0;

packages.forEach(pkg => {
  const projectJsonPath = path.join(packagesDir, pkg, 'project.json');

  // 跳过已存在的 project.json（Icon/Flare/Spinner）
  if (fs.existsSync(projectJsonPath)) {
    console.log(`⏭️  Skipping ${pkg} (already has project.json)`);
    skipped++;
    return;
  }

  const projectJson = {
    name: pkg,
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    sourceRoot: `packages/${pkg}/src`,
    projectType: 'library',
    tags: ['type:library']
  };

  fs.writeFileSync(projectJsonPath, JSON.stringify(projectJson, null, 2) + '\n');
  console.log(`✅ Created project.json for ${pkg}`);
  created++;
});

console.log(`\n📊 Summary: Created ${created}, Skipped ${skipped}`);
```

---

### 3. 批量生成 project.json

**为什么**：执行脚本，为所有组件创建 project.json，使 Nx 能够识别它们。

**做什么**：
- 运行生成脚本
- 验证生成的文件数量
- 检查特殊组件（Icon/Flare/Spinner）未被覆盖

**执行命令**：
```bash
node scripts/generate-nx-projects.js

# 验证生成结果
find packages/ -name "project.json" | wc -l  # 应该 >= 91
```

---

### 4. 批量创建 TypeScript 配置

**为什么**：每个 Nx 项目需要独立的 TypeScript 配置文件用于编译和测试。

**做什么**：
- 扩展生成脚本，同时生成 3 个 TypeScript 配置文件：
  - `tsconfig.json` - 项目根配置
  - `tsconfig.lib.json` - 库编译配置
  - `tsconfig.spec.json` - 测试配置

**tsconfig.json 模板**：
```json
{
  "extends": "../../tsconfig.base.json",
  "references": [
    { "path": "./tsconfig.lib.json" },
    { "path": "./tsconfig.spec.json" }
  ],
  "files": [],
  "include": [],
  "compilerOptions": {
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

**tsconfig.lib.json 模板**：
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "declaration": true,
    "types": ["node"]
  },
  "include": ["src/**/*.ts", "src/**/*.tsx"],
  "exclude": [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.stories.ts",
    "src/**/*.stories.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}
```

**tsconfig.spec.json 模板**：
```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "types": ["jest", "node"]
  },
  "include": [
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",
    "src/**/*.d.ts"
  ]
}
```

**扩展脚本添加 TS 配置生成**：
```javascript
// 在生成 project.json 后添加：
const tsconfigFiles = {
  'tsconfig.json': { /* 上述模板 */ },
  'tsconfig.lib.json': { /* 上述模板 */ },
  'tsconfig.spec.json': { /* 上述模板 */ }
};

Object.entries(tsconfigFiles).forEach(([filename, content]) => {
  const filepath = path.join(packagesDir, pkg, filename);
  if (!fs.existsSync(filepath)) {
    fs.writeFileSync(filepath, JSON.stringify(content, null, 2) + '\n');
    console.log(`  ✅ Created ${filename}`);
  }
});
```

---

### 5. 验证项目配置

**为什么**：确认 Nx 正确识别了所有 91 个组件，依赖图生成成功。

**做什么**：
- 运行 Nx 命令验证项目识别
- 检查依赖图
- 运行测试构建

**验证命令**：
```bash
# 列出所有项目
nx show projects | wc -l  # 应该 >= 91

# 检查特定组件
nx show project bpk-component-button

# 生成依赖图
nx graph --file=dependency-graph.html

# 测试构建单个组件
nx build bpk-component-button

# 测试 affected 命令
nx affected --target=build --base=main
```

## 生成的 project.json 结构示例

**最小化配置**（通用组件）：
```json
{
  "name": "bpk-component-button",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/bpk-component-button/src",
  "projectType": "library",
  "tags": ["type:library"]
}
```
> **说明**：targets（build、test、lint）配置在 nx.json 的 targetDefaults 中统一定义，不需要在每个 project.json 中重复。

**特殊组件配置**（Icon/Flare/Spinner，Phase 0.4 已创建）：
```json
{
  "name": "bpk-component-icon",
  "$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/bpk-component-icon/src",
  "projectType": "library",
  "targets": {
    "generate": {
      "executor": "nx:run-commands",
      "inputs": [
        "{workspaceRoot}/node_modules/@skyscanner/bpk-svgs/dist/js/icons/**/*"
      ],
      "outputs": [
        "{projectRoot}/sm/",
        "{projectRoot}/lg/",
        "{projectRoot}/xxxl/"
      ],
      "options": {
        "command": "gulp icons",
        "cwd": "{workspaceRoot}"
      }
    }
  },
  "tags": ["type:library", "has-codegen"]
}
```

## 交付物

- [ ] 更新的 [nx.json](../../nx.json)（包含 targetDefaults 配置）
- [ ] 生成脚本 [scripts/generate-nx-projects.js](../../scripts/generate-nx-projects.js)
- [ ] 91 个 project.json 文件（所有组件都有）
- [ ] 273 个 TypeScript 配置文件（每个组件 3 个：tsconfig.json、tsconfig.lib.json、tsconfig.spec.json）
- [ ] 验证报告（nx show projects、nx graph）
