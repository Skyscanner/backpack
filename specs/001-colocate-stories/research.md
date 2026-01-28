# Storybook Stories Colocation 研究报告

## 执行摘要

本研究对 Backpack 仓库中的 Storybook stories 现状进行了全面审计，为 stories 从集中式 `examples/` 目录迁移到与组件代码共存（colocation）做准备。研究发现 Backpack 当前有 91 个独立的 examples 目录，包含 91 个 story 文件，使用混合的 JavaScript/TypeScript 文件格式，并依赖共享工具和 CSS modules。

## 1. examples/ 目录审计

### 1.1 总体统计

- **目录总数**: 94 个目录（包括 91 个组件目录 + 3 个特殊目录）
- **Story 文件总数**: 91 个
- **Examples 实现文件**: 86 个

### 1.2 文件类型分布

| 文件类型 | 数量 | 说明 |
|---------|------|------|
| `.js` | 115 | JavaScript 文件 |
| `.tsx` | 79 | TypeScript + JSX 文件 |
| `.scss` | 45 | Sass 样式文件 |
| `.css` | 45 | 编译后的 CSS 文件（从 SCSS 生成） |
| `.ts` | 8 | TypeScript 文件 |
| `.json` | 1 | 数据文件（barchart 示例数据） |
| `.md` | 1 | README 文档 |
| `.snap` | 1 | Jest 快照文件 |

### 1.3 Story 文件格式分布

- `stories.js`: 50 个（55%）
- `stories.tsx`: 32 个（35%）
- `stories.ts`: 8 个（9%）
- `stories.utils.tsx`: 1 个（特殊情况：bpk-scrim-utils）

### 1.4 目录结构模式

#### 模式 A：基础模式（最常见）
```
bpk-component-button/
├── stories.tsx
├── examples.tsx
├── BpkButtonStory.module.scss
└── BpkButtonStory.module.css
```

#### 模式 B：包含工具文件
```
bpk-component-calendar/
├── stories.js
├── examples.js
├── examples-components.js
├── stories-utils.tsx
└── test-utils.js
```

#### 模式 C：简单模式（无样式）
```
bpk-component-text/
├── stories.js
├── examples.js
├── examples.module.scss
└── examples.module.css
```

### 1.5 特殊目录

1. **bpk-storybook-utils**: 共享的 Storybook 工具
   - 提供 `BpkDarkExampleWrapper` 组件
   - 提供 `action` 辅助函数
   - 被 30 个组件使用
   - 包含自己的测试和快照

2. **bpk-scrim-utils**: 特殊的工具组件
   - 有自己的 stories

3. **bpk-stylesheets-fonts**: 字体样式展示
   - 仅有 story 文件，无 examples

### 1.6 CSS Modules 使用情况

- **SCSS 文件**: 44 个
- **CSS 文件**: 44 个（与 SCSS 一一对应，编译生成）
- **命名模式**:
  - `examples.module.scss` / `examples.module.css`
  - `[ComponentName]Story.module.scss` / `[ComponentName]Story.module.css`

## 2. 导入模式分析

### 2.1 组件导入模式

所有 story 文件都使用相对路径从 `packages/` 目录导入组件：

```typescript
// 模式 1: 从包的 index 导入（最常见）
import BpkButton from '../../packages/bpk-component-button';

// 模式 2: 从特定源文件导入
import BpkText from '../../packages/bpk-component-text/src/BpkText';

// 模式 3: 导入子组件
import BpkCalendarDateComponent from '../../packages/bpk-component-calendar/src/BpkCalendarDate';
import BpkCalendarGridComponent from '../../packages/bpk-component-calendar/src/BpkCalendarGrid';
```

### 2.2 共享工具导入

```typescript
// 从 bpk-storybook-utils 导入
import {
  action,
  BpkDarkExampleWrapper,
} from '../bpk-storybook-utils';

// 从其他包导入实用工具
import { cssModules } from '../../packages/bpk-react-utils';
import FaceHappyIconSm from '../../packages/bpk-component-icon/sm/face--happy';
```

### 2.3 本地文件导入

```typescript
// 导入 examples
import {
  PrimaryExample,
  SecondaryExample,
  // ...
} from './examples';

// 导入 CSS Modules
import STYLES from './BpkButtonStory.module.scss';

// 导入本地工具
import { BpkCalendarContainerMock } from './stories-utils';
```

### 2.4 外部依赖

- React hooks (`useState`, `useEffect` 等)
- 测试数据（如 `./data.json`）
- 类型定义 (`type`, `interface`)

## 3. 文件内容模式

### 3.1 典型的 stories.tsx 结构

```typescript
// 1. License 头部
/* Backpack License ... */

// 2. 导入组件和类型
import BpkButton from '../../packages/bpk-component-button';

// 3. 导入 examples
import {
  PrimaryExample,
  SecondaryExample,
} from './examples';

// 4. 默认导出（Storybook 元数据）
export default {
  title: 'bpk-component-button',
  component: BpkButton,
};

// 5. 导出各个 stories
export const BpkButtonPrimary = () => <PrimaryExample />;
export const BpkButtonSecondary = () => <SecondaryExample />;

// 6. Visual test stories（用于 Percy）
export const VisualTest = () => <MixedExample />;
export const VisualTestWithZoom = {
  render: VisualTest,
  args: {
    zoomEnabled: true,
  },
};
```

### 3.2 典型的 examples.tsx 结构

```typescript
// 1. License 头部

// 2. 导入依赖
import BpkButton from '../../packages/bpk-component-button';
import { cssModules } from '../../packages/bpk-react-utils';
import { action, BpkDarkExampleWrapper } from '../bpk-storybook-utils';
import STYLES from './BpkButtonStory.module.scss';

// 3. 初始化工具
const getClassName = cssModules(STYLES);

// 4. 定义和导出 examples
export const PrimaryExample = (props: any) => (
  <BpkButton onClick={action('Button clicked')} {...props}>
    Button
  </BpkButton>
);

export const SecondaryExample = (props: any) => (
  // ...
);
```

### 3.3 Visual Test 模式

发现了多种 Percy visual test 命名模式：

```typescript
// 模式 1: 简单函数导出
export const VisualTest = () => <MixedExample />;

// 模式 2: 带 zoom 变体
export const VisualTestWithZoom = {
  render: VisualTest,
  args: { zoomEnabled: true },
};

// 模式 3: 使用 bind
export const VisualTestWithZoom = VisualTest.bind({});
VisualTestWithZoom.args = { zoomEnabled: true };

// 模式 4: 特殊的 iframe 包装器（用于 modal）
export const VisualTestDefault = {
  render: () => <>{visualWrapper('bpk-component-modal--default')}</>,
  parameters: {
    layout: 'fullscreen',
    percy: { waitForTimeout: 10000 },
  },
};
```

## 4. Banana Colocation 模式

### 4.1 Banana 的 Story 文件位置

Banana 已采用 colocation 模式，stories 文件与组件代码共存：

```
banana/
├── apps/webapp/src/
│   ├── acorn/components/PackagesBanner/
│   │   └── PackagesBanner.stories.tsx
│   ├── banana/components/
│   │   └── [component]/[Component].stories.tsx
└── libs/shared/universal/features/components/src/
    ├── GoneWrong/
    │   └── GoneWrong.stories.tsx
    └── PriceAlertSuccessModal/
        └── PriceAlertSuccessModal.stories.tsx
```

### 4.2 Banana 命名约定

- **文件名**: `[ComponentName].stories.tsx`
- **位置**: 与组件文件在同一目录
- **格式**: 统一使用 `.tsx` (TypeScript + JSX)

### 4.3 Banana Storybook 配置

来自 `/apps/storybook-host/.storybook/main.js`:

```javascript
const config = {
  stories: [
    '../../webapp/src/banana/components/**/*.stories.tsx',
    '../../webapp/src/banana/screens/**/*.stories.tsx',
    '../../webapp/src/acorn/components/**/*.stories.tsx',
    '../../webapp/src/acorn/screens/**/*.stories.tsx',
    '../../../libs/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-a11y', '@storybook/addon-links', 'storybook-addon-rtl'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: ['../../../libs/shared/universal/utils-frontend/src/assets'],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
};
```

**关键特点**:
- 使用 glob 模式 `**/*.stories.tsx` 递归查找
- 支持多个应用和库目录
- 统一的 `.tsx` 扩展名

### 4.4 Banana Story 示例

```typescript
// PackagesBanner.stories.tsx
import type { ReactElement } from 'react';
import { Provider } from 'react-redux';
import { makeMockAcornStore } from '@web-platform/shared-acorn-redux/src/tests/testUtils/makeMockAcornStore';
import PackagesBanner from './PackagesBanner';

const withProvider = (story: () => ReactElement<typeof PackagesBanner>) => (
  <Provider store={testStore}>{story()}</Provider>
);

export default {
  title: 'Acorn/components/PackagesBanner',
  decorators: [withProvider],
};

export const PackagesBannerStories = () => <PackagesBanner />;
```

**特点**:
- Story 和组件在同一目录
- 使用分层的 title (`Acorn/components/PackagesBanner`)
- 装饰器直接在 story 文件中定义

## 5. 当前 Storybook 配置

### 5.1 主配置文件

文件: `/Users/viktoryang/skyscanner/backpack/.storybook/main.ts`

```typescript
const config: StorybookConfig = {
  stories: [
    '../examples/**/stories.@(ts|tsx|js|jsx)',  // 硬编码的 examples/ 路径
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-webpack5-compiler-babel'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    defaultName: 'Documentation'
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldIncludePropTagMap: true,
      propFilter: (prop) => {
        const isHTMLElementProp =
            prop.parent?.fileName.includes("node_modules") ?? false
        return !isHTMLElementProp
      },
    },
  },
};
```

**关键点**:
- Stories 路径硬编码为 `../examples/**/stories.@(ts|tsx|js|jsx)`
- 支持多种文件扩展名
- 使用 Webpack 5 + Babel
- 配置了 TypeScript docgen

### 5.2 支持的文件扩展名

当前配置支持: `.ts`, `.tsx`, `.js`, `.jsx`

## 6. CI 工作流分析

### 6.1 Storybook 构建流程

从 `.github/workflows/pr.yml`:

```yaml
Create-Build-Cache:
  steps:
    - name: Upload dist-storybook to Cache
      uses: actions/cache@9255dc7a253b0ccc959486e2bca901246202afeb
      with:
        path: |
          dist-storybook/
        key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**', 'examples/**') }}

    - name: Create build cache
      if: ${{ steps.storybook-dist-cache.outputs.cache-hit != 'true' }}
      run: |
        npm run build
        npm run storybook:dist
```

**硬编码的 examples/ 路径**:
- 缓存键包含: `hashFiles('packages/**', 'examples/**')`
- 需要更新为包含新的 stories 位置

### 6.2 Percy Visual Tests

从 `.github/workflows/_build.yml`:

```yaml
PercyTests:
  steps:
    - name: Restore Cache
      uses: actions/cache/restore@9255dc7a253b0ccc959486e2bca901246202afeb
      with:
        path: dist-storybook/
        key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**', 'examples/**') }}

    - name: Percy Test
      run: npm run percy-test
      env:
        PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

从 `package.json`:

```json
{
  "scripts": {
    "percy-test": "percy storybook ./dist-storybook -i '/Visual\\stest\\s?([a-z]*)?/i'"
  }
}
```

**Percy 配置特点**:
- 使用正则表达式过滤: `/Visual\stest\s?([a-z]*)?/i`
- 匹配以 "Visual test" 开头的 story 名称
- 运行在已构建的 `dist-storybook` 目录上
- 不依赖源文件路径

### 6.3 Storybook 部署

```yaml
StorybookDeploy:
  steps:
    - name: Restore Cache
      with:
        path: dist-storybook/
        key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**', 'examples/**') }}
```

**需要更新的地方**:
- 缓存键中的 `examples/**` 路径

## 7. 共享工具分析

### 7.1 bpk-storybook-utils

**位置**: `examples/bpk-storybook-utils/`

**导出内容**:
```javascript
export { action, BpkDarkExampleWrapper };
```

**使用统计**:
- 被 30 个组件的 examples 文件使用
- 主要用于暗色主题示例和交互 action

**文件结构**:
```
bpk-storybook-utils/
├── index.js
├── README.md
└── src/
    ├── BpkDarkExampleWrapper.js
    ├── BpkDarkExampleWrapper.module.scss
    ├── BpkDarkExampleWrapper.module.css
    ├── BpkDarkExampleWrapper-test.js
    ├── BpkStorybookUtils.js
    ├── BpkStorybookUtils-test.js
    ├── accessibility-test.js
    └── __snapshots__/
        └── BpkDarkExampleWrapper-test.js.snap
```

### 7.2 组件级 stories-utils

发现 12 个组件有自己的 `stories-utils` 文件：

1. bpk-component-calendar/stories-utils.tsx
2. bpk-component-description-list/stories-utils.js
3. bpk-component-input/stories-utils.tsx
4. bpk-component-star-rating/stories-utils.js
5. bpk-component-banner-alert/stories-utils.tsx
6. bpk-component-map/stories-utils.js
7. bpk-component-accordion/stories-utils.tsx
8. bpk-component-info-banner/stories-utils.tsx
9. bpk-component-infinite-scroll/stories-utils.js
10. bpk-component-scrollable-calendar/stories-utils.tsx
11. bpk-scrim-utils/stories.utils.tsx
12. bpk-component-calendar/test-utils.js

**这些文件通常包含**:
- Mock 组件和 HOC
- 测试辅助函数
- 特定于组件的装饰器

### 7.3 其他共享依赖

```typescript
// React Utils
import { cssModules } from '../../packages/bpk-react-utils';

// Icons
import SmallLongArrowRightIcon from '../../packages/bpk-component-icon/sm/long-arrow-right';

// Other components used in examples
import BpkText from '../../packages/bpk-component-text';
```

## 8. 非标准模式和例外

### 8.1 特殊文件

1. **bpk-component-barchart/data.json**
   - 包含图表示例数据
   - 需要随 stories 一起迁移

2. **bpk-storybook-utils/README.md**
   - 文档文件
   - 需要保留或迁移到合适位置

3. **Jest 快照文件**
   - `bpk-storybook-utils/src/__snapshots__/BpkDarkExampleWrapper-test.js.snap`
   - 可能需要更新路径

### 8.2 复杂的 Visual Test 设置

某些组件有特殊的 visual test 配置：

**Modal 组件** 使用 iframe 包装器:
```typescript
const visualWrapper = (id: string, zoomEnabled: boolean = false) => (
  <div style={{ height: '640px', width: '100%' }}>
    <iframe
      title={`Embedded Storybook ${id}`}
      src={`/iframe.html?id=${id}&viewMode=story&args=zoomEnabled:${zoomEnabled}`}
      // ...
    />
  </div>
);
```

**包含 Percy 参数**:
```typescript
export const VisualTestDefault = {
  render: () => <>{/* ... */}</>,
  parameters: {
    layout: 'fullscreen',
    percy: {
      waitForTimeout: 10000,
    },
  },
};
```

### 8.3 子组件导出

某些 stories 导出子组件信息：

```typescript
export default {
  title: 'bpk-component-calendar',
  component: BpkCalendarGridComponent,
  subcomponents: {
    BpkCalendarNav: BpkCalendarNavComponent,
    BpkCalendarGridHeader: BpkCalendarGridHeaderComponent,
    BpkCalendarDate: BpkCalendarDateComponent,
    BpkCalendarContainer: BpkCalendarContainerMock
  },
};
```

## 9. 迁移注意事项

### 9.1 主要挑战

1. **导入路径调整**
   - 从 `../../packages/bpk-component-x` 调整到相对于新位置
   - bpk-storybook-utils 的导入路径需要更新

2. **CSS Modules 位置**
   - 44 个组件有专用的样式文件
   - 需要与 stories 一起迁移

3. **共享工具处理**
   - bpk-storybook-utils 需要移到公共位置
   - 或者转换为包内部导入

4. **CI 缓存键更新**
   - `.github/workflows/pr.yml`
   - `.github/workflows/_build.yml`
   - 将 `examples/**` 改为 `packages/**/*.stories.*`

5. **文件格式混合**
   - 50 个 `.js` 文件
   - 32 个 `.tsx` 文件
   - 8 个 `.ts` 文件
   - 需要决定是否统一格式

### 9.2 Percy Visual Tests

**好消息**: Percy 配置不需要改动
- 使用 story 名称过滤 (`/Visual\stest\s?([a-z]*)?/i`)
- 不依赖文件路径
- 在构建后的 dist-storybook 上运行

### 9.3 Storybook 配置更新

需要更新的位置：

1. **`.storybook/main.ts`**
   ```typescript
   // 从:
   stories: ['../examples/**/stories.@(ts|tsx|js|jsx)']

   // 改为:
   stories: ['../packages/**/src/**/*.stories.@(ts|tsx|js|jsx)']
   ```

2. **缓存键** (2 处):
   ```yaml
   # 从:
   key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**', 'examples/**') }}

   # 改为:
   key: ${{ env.BUILD_CACHE_NAME }}-${{ hashFiles('packages/**/*.stories.*', 'packages/**') }}
   ```

### 9.4 建议的迁移目标结构

参考 Banana 模式，建议结构：

```
packages/bpk-component-button/
├── src/
│   ├── BpkButton.tsx
│   ├── BpkButton.module.scss
│   ├── BpkButton.module.css
│   ├── BpkButton.test.tsx
│   └── BpkButton.stories.tsx          # 新增
├── examples/                           # 可选：保留或移除
│   ├── ButtonExamples.tsx
│   └── ButtonStory.module.scss
└── package.json
```

或者完全整合：

```
packages/bpk-component-button/
├── src/
│   ├── BpkButton.tsx
│   ├── BpkButton.module.scss
│   ├── BpkButton.module.css
│   ├── BpkButton.test.tsx
│   ├── BpkButton.stories.tsx
│   └── BpkButtonExamples.tsx          # 之前的 examples.tsx
└── package.json
```

### 9.5 Examples vs Stories 决策

当前有两种文件：
- **stories.tsx**: Storybook 元数据和导出
- **examples.tsx**: 实际的示例组件

**选项 1**: 保持分离
- stories 移到 `src/[Component].stories.tsx`
- examples 移到 `src/[Component]Examples.tsx`
- 优点：清晰的关注点分离
- 缺点：更多文件

**选项 2**: 合并
- 将 examples 内联到 stories 文件中
- 优点：更少的文件
- 缺点：可能导致大文件，难以维护

**建议**: 保持分离（选项 1），与当前模式一致

## 10. 总结

### 10.1 当前状态

- **91 个组件** 的 stories 集中在 `examples/` 目录
- **混合格式**: JS (55%), TSX (35%), TS (9%)
- **44 个组件** 使用 CSS Modules
- **30 个组件** 依赖共享的 bpk-storybook-utils
- **12 个组件** 有自己的 stories-utils

### 10.2 Banana 模式优势

- Stories 与组件代码共存，更好的内聚性
- 更容易发现和维护 stories
- 使用 glob 模式 `**/*.stories.tsx` 自动发现
- 统一的文件格式（全部 `.tsx`）

### 10.3 关键迁移任务

1. 更新 Storybook 配置的 stories glob 模式
2. 移动 story 文件到各组件包的 `src/` 目录
3. 调整所有导入路径
4. 处理共享的 bpk-storybook-utils
5. 迁移 CSS Modules 和其他资源文件
6. 更新 CI 工作流的缓存键
7. 验证 Percy visual tests 仍然正常工作
8. 更新文档和贡献指南

### 10.4 风险评估

| 风险 | 级别 | 缓解措施 |
|------|------|---------|
| 导入路径错误 | 高 | 使用自动化脚本和 linting |
| Percy tests 中断 | 低 | Percy 使用 story 名称，不依赖路径 |
| CI 缓存失效 | 中 | 测试新的缓存键配置 |
| 共享工具破坏 | 中 | 先迁移 bpk-storybook-utils |
| 团队混淆 | 低 | 提供清晰的文档和示例 |

### 10.5 成功标准

- ✅ 所有 stories 正常加载和渲染
- ✅ Percy visual tests 通过
- ✅ CI/CD pipeline 正常工作
- ✅ Storybook 构建和部署成功
- ✅ 没有 import 错误
- ✅ CSS 样式正确应用
- ✅ 文档已更新

## 11. 下一步行动

1. **原型验证**: 选择 2-3 个组件进行试点迁移
2. **工具开发**: 创建自动化迁移脚本
3. **文档编写**: 准备迁移指南和团队培训材料
4. **逐步迁移**: 批量迁移组件，每批验证测试
5. **清理**: 迁移完成后删除旧的 `examples/` 目录

---

**报告生成时间**: 2026-01-27
**报告作者**: Claude Code
**审计对象**: Backpack 仓库 (branch: WOODPECKER-4040)
