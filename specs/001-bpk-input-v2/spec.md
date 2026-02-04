# 组件规格：BpkInput V2 (Flexible Composable API)

**Package Branch**: `001-bpk-input-v2`
**Created**: 2026-01-29
**Updated**: 2026-01-29
**Status**: 草稿
**Input**: 使用 Ark UI 的 composable 设计理念重构 bpk-component-input，支持灵活组合的 InputAdornment 和 Input，自动判断 InputAdornment 归属

## 设计概述

新的 V2 设计采用完全灵活的 composable API：
- 只有一种 `InputAdornment` 组件（不区分 start/end），主要用于放置图标或文字
- 可以任意组合 InputAdornment 和 Input
- InputAdornment 自动判断归属于相邻的 Input
- Root 上定义 `gap` 属性统一控制元素间隔
- 支持 docked input group 场景

**设计示例**:
```typescript
// 单个 input 带前后元素
<BpkInput.Root gap="0.5rem">
  <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
  <BpkInput.Input id="price" value="100" />
  <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
</BpkInput.Root>

// Docked input group (自动检测边框样式，large 在 Root 层级)
<BpkInput.Root gap="0.5rem" large>
  <BpkInput.InputAdornment>icon1</BpkInput.InputAdornment>
  <BpkInput.Input id="from" value="Ec" valid />
  <BpkInput.InputAdornment>icon2</BpkInput.InputAdornment>
  <BpkInput.Input id="to" value="Edinb" valid={false} />
  <BpkInput.Input id="depart" value="Edinb" />
  <BpkInput.Input id="return" value="Edinb" />
</BpkInput.Root>
```

## Clarifications

### Session 2026-01-29

- Q: 当 valid 和 clearWhileEditing 同时存在时，图标展示逻辑是什么？ → A: 保持现有的图标展示逻辑不变，参考 examples.js 第 176-185 行：不在编辑状态显示 valid 图标，在编辑状态显示 clearable 按钮。具体逻辑应参考原有 input 代码实现。
- Q: InputAdornment 与 Input 内容的间距如何实现？ → A: 间距通过 Root 的 `gap` 属性统一控制，动态计算每个 Input 的 text-indent 和 padding，确保输入内容与相邻 InputAdornment 保持指定间距。
- Q: InputAdornment 如何归属于 Input？ → A: 自动判断逻辑：InputAdornment 在 Input 前面归属为 start，在 Input 后面归属为 end。当多个连续 InputAdornment 存在时，每个归属于最近的 Input。
- Q: 组件命名规范是什么？ → A: 统一命名为 InputAdornment（替代 Element），主要用于放置 icon 或文字。Input 组件的 Props 类型命名为 BpkInputProps（而非 BpkInputInputProps）。
- Q: 多个 Input 的 docking 行为如何检测？ → A: Root 中的所有 Input 自动 docked 在一起，无论它们之间是否有 InputAdornment。InputAdornment 始终渲染在其归属的 Input 内部，不影响 Input 之间的拼接。
- Q: dockedFirst/Middle/Last props 如何处理？ → A: 完全移除这些 props。通过自动检测 Input 在 Root 中的位置来应用对应的边框样式（单个、首个、中间、末尾）。这是一个 breaking change。
- Q: 单个 Input 的边框样式是什么？ → A: 单个 Input 使用普通边框（非 docking 样式），四个角都是圆角。只有 2 个或更多 Input 时才应用 docking 边框样式。
- Q: 版本策略如何处理 breaking change？ → A: 创建新的独立组件放在 BpkInputV2 文件夹中，原有 BpkInput 保持不变。这样不是 breaking change，用户可以选择继续使用旧组件或迁移到新组件。
- Q: 多个 Input 的边框连接逻辑是什么？ → A: 2 个 Input：第一个左圆角+右平边，最后一个左平边+右圆角。3+ 个 Input：第一个（左圆角，右平边），中间（两侧平边），最后（左平边，右圆角）。这与现有的 docked 行为保持一致。
- Q: large 属性应该在哪里定义？ → A: large 属性应该提升到 Root 层级，因为 large 样式会应用于 Root 内的所有 Input，确保尺寸一致。
- Q: valid/invalid 图标如何实现？ → A: 使用 InputAdornment 实现 valid/invalid 图标，而不是使用原有的 CSS 背景图片方式。这样图标与用户提供的 InputAdornment 使用相同的机制。
- Q: 代码质量标准是什么？ → A: 必须保证 ESLint 和 Stylelint 无错误，且没有 TypeScript 编译错误。所有代码必须通过 lint 检查和类型检查。
- Q: 小尺寸设备上文本溢出如何处理？ → A: 当 Input 长度不够时，文本应该被截断（text-overflow: ellipsis），如用户提供的截图所示。确保在响应式场景下文本正确显示。
- Q: End InputAdornment 的定位方式是什么？ → A: End InputAdornments 必须绝对定位在 input 的右边缘（LTR）或左边缘（RTL），始终与 input 元素视觉上相连。当有多个 end adornments 时（如用户的 endAdornment + valid icon + clear button），排列顺序为：[用户 endAdornment] [valid icon] [clear button]，全部定位在 input 右侧。
- Q: Start InputAdornment 的定位方式是什么？ → A: Start InputAdornments 必须绝对定位在 input 的左边缘（LTR）或右边缘（RTL），始终与 input 元素视觉上相连，与 end InputAdornments 的定位方式保持一致。

## Constitution Check

*门禁：必须在实现开始前通过。*

- [x] **Component-First Architecture**: 组件将放在 `packages/bpk-component-input/src/BpkInputV2/`
- [x] **Naming Conventions**: 组件名遵循 PascalCase (BpkInput)
- [x] **License Headers**: 所有源文件将包含 Apache 2.0 许可证头
- [x] **Modern Sass**: 将使用 `@use` 语法和来自 `bpk-mixins` 的细粒度导入
- [x] **Accessibility-First**: 将包含 `accessibility-test.tsx`
- [x] **TypeScript**: 将使用 TypeScript 编写并包含适当的类型
- [x] **Test Coverage**: 将达到 70% 分支、75% 函数/行/语句覆盖率
- [x] **Documentation**: 将包含 README.md、Storybook 故事、JSDoc 注释
- [x] **Versioning**: MINOR（次版本 - 添加新功能但保持向后兼容）

## 用户场景与测试 *(必填)*

### 用户故事 1 - 基础灵活组合 (优先级: P1)

开发者需要使用灵活的 composable API 创建带有前后元素的输入框，InputAdornment 自动判断归属。

**为什么是这个优先级**: 这是核心功能，验证灵活组合的可行性。

**独立测试**: 渲染 `<BpkInput.Root><InputAdornment /><Input /><InputAdornment /></BpkInput.Root>` 并验证元素归属和间距。

**验收场景**:

1. **Given** 一个 InputAdornment 在 Input 前，**When** 渲染时，**Then** InputAdornment 作为 Input 的 startInputAdornment，绝对定位在 input 左边缘（LTR），输入内容左侧有正确间距
2. **Given** 一个 InputAdornment 在 Input 后，**When** 渲染时，**Then** InputAdornment 作为 Input 的 endInputAdornment，绝对定位在 input 右边缘（LTR），输入内容右侧有正确间距
3. **Given** Input 前后都有 InputAdornment，**When** 渲染时，**Then** 两个 InputAdornment 分别作为 start（左边缘）和 end（右边缘），均绝对定位，输入内容两侧都有正确间距
4. **Given** RTL 模式，**When** 渲染带 startInputAdornment 的 Input，**Then** startInputAdornment 绝对定位在 input 右边缘

---

### 用户故事 2 - 动态 Gap 控制 (优先级: P1)

开发者需要通过 Root 的 `gap` 属性统一控制所有元素之间的间距。

**为什么是这个优先级**: Gap 控制是新 API 的核心特性。

**独立测试**: 设置不同的 gap 值并验证动态计算的 text-indent 和 padding。

**验收场景**:

1. **Given** gap="0.5rem"，**When** 渲染时，**Then** Input 的 text-indent 和 padding 动态计算为 InputAdornment 宽度 + 0.5rem
2. **Given** gap="1rem"，**When** 渲染时，**Then** Input 的间距动态调整为 InputAdornment 宽度 + 1rem
3. **Given** 未设置 gap，**When** 渲染时，**Then** 使用默认值 0.5rem

---

### 用户故事 3 - Docked Input Group with Auto Border Detection (优先级: P1)

开发者需要创建 docked input group（多个 input 连在一起），边框样式自动根据 Input 位置检测，每个 input 可以有独立的前后元素。

**为什么是这个优先级**: 自动边框检测简化了 API，无需手动指定 docked props。

**独立测试**: 渲染多个 Input，验证边框样式自动检测和元素归属。

**验收场景**:

1. **Given** Root 中有 2 个 Input，**When** 渲染时，**Then** 第一个 Input 左圆角+右平边，第二个 Input 左平边+右圆角
2. **Given** Root 中有 3+ 个 Input，**When** 渲染时，**Then** 第一个（左圆角+右平边），中间（两侧平边），最后（左平边+右圆角）
3. **Given** docked group 中某个 Input 前后有 InputAdornment，**When** 渲染时，**Then** InputAdornment 只归属于该 Input，不影响其他 Input
4. **Given** 连续两个 InputAdornment 在两个 Input 之间，**When** 渲染时，**Then** 第一个 InputAdornment 归属于前一个 Input 的 end，第二个归属于后一个 Input 的 start

---

### 用户故事 4 - Valid/Invalid 状态与 InputAdornment 共存 (优先级: P1)

开发者需要在有 InputAdornment 的情况下使用 valid/invalid 状态，系统图标与用户 InputAdornment 正确共存。

**为什么是这个优先级**: 验证状态是表单输入的核心功能。

**独立测试**: 设置 valid 属性并验证图标和 InputAdornment 的显示。

**验收场景**:

1. **Given** Input 有 endInputAdornment 且 valid=true，**When** 渲染时，**Then** 显示顺序为 [用户 InputAdornment] [valid 图标]，全部绝对定位在 input 右边缘（LTR）
2. **Given** Input 有 endInputAdornment 且 valid=false，**When** 渲染时，**Then** 显示顺序为 [用户 InputAdornment] [invalid 图标]，全部绝对定位在 input 右边缘（LTR）
3. **Given** Input 有 endInputAdornment 且 clearButtonMode='whileEditing'，**When** 未聚焦时，**Then** 显示 [用户 InputAdornment] [valid 图标]；聚焦时显示 [用户 InputAdornment] [清除按钮]，全部位于 input 右边缘（LTR）
4. **Given** RTL 模式，**When** 渲染带 endInputAdornment 的 Input，**Then** 所有 end InputAdornments 绝对定位在 input 左边缘

---

### 用户故事 5 - Large 尺寸支持 (优先级: P2)

开发者需要使用大尺寸的输入框，通过 Root 的 large 属性控制所有子组件的尺寸。

**为什么是这个优先级**: 尺寸变体增强了组件的灵活性。

**独立测试**: 在 Root 上设置 large 属性并验证所有元素的尺寸。

**验收场景**:

1. **Given** Root 设置 large=true，**When** 渲染时，**Then** Root 内的所有 Input 和 InputAdornment 使用大尺寸样式
2. **Given** Root 设置 large=false 或未设置，**When** 渲染时，**Then** 所有元素使用默认尺寸

---

### 用户故事 6 - RTL 支持 (优先级: P2)

组件必须在 RTL 模式下正确镜像所有元素位置。

**为什么是这个优先级**: 国际化是 Backpack 的核心需求。

**独立测试**: 在 RTL 模式下渲染并验证元素位置。

**验收场景**:

1. **Given** RTL 模式，**When** 渲染时，**Then** InputAdornment 和 Input 的位置镜像翻转
2. **Given** RTL 模式下的 docked group，**When** 渲染时，**Then** 整个 group 镜像翻转但逻辑顺序保持

---

### 边界情况

- 当 Root 中只有一个 Input 时会发生什么？ → 使用普通边框（四角圆角），不应用 docked 样式
- 当 Root 中有多个连续的 InputAdornment 没有 Input 时会发生什么？ → 第一个 InputAdornment 无归属（警告），其余归属于最近的 Input
- 当 InputAdornment 内容宽度变化时会发生什么？ → 使用 ResizeObserver 监听，动态重新计算 text-indent/padding
- 当 gap 值为 0 时会发生什么？ → InputAdornment 和 Input 内容无间距，紧密排列
- 当某个 Input 被禁用（disabled）时会发生什么？ → Input 和相邻 InputAdornment 都显示禁用样式
- 当 Root 设置了 large 属性时会发生什么？ → 所有子 Input 和 InputAdornment 都使用大尺寸样式，无需在每个 Input 上单独设置
- RTL 模式下 InputAdornment 归属逻辑如何？ → 归属逻辑保持不变（基于 DOM 顺序），但视觉位置镜像：start 在右侧，end 在左侧。End InputAdornments 必须绝对定位在 input 左边缘（RTL）
- 当 Input 宽度不足以显示完整文本时会发生什么？ → 文本使用 ellipsis 截断，确保在小尺寸设备上正确显示而不会换行或溢出

## 需求 *(必填)*

### 功能需求

- **FR-001**: 组件必须支持灵活的 composable API 结构：`<BpkInput.Root><BpkInput.InputAdornment /><BpkInput.Input /><BpkInput.InputAdornment /></BpkInput.Root>`
- **FR-002**: 组件必须只提供一种 InputAdornment 组件（不区分 StartInputAdornment 和 EndInputAdornment），归属由位置自动判断
- **FR-003**: InputAdornment 归属逻辑：在 Input 前面的 InputAdornment 归属为 startInputAdornment（绝对定位在 input 左边缘 LTR / 右边缘 RTL），在 Input 后面的 InputAdornment 归属为 endInputAdornment（绝对定位在 input 右边缘 LTR / 左边缘 RTL）
- **FR-004**: 当多个连续 InputAdornment 存在时，每个 InputAdornment 归属于最近的 Input：前面的归属于前一个 Input 的 end，后面的归属于后一个 Input 的 start
- **FR-005**: Root 必须支持 `gap` 属性，控制 InputAdornment 与 Input 内容之间的间距（默认 "0.5rem"）
- **FR-006**: gap 间距通过动态计算 Input 的 text-indent 和 padding 实现，而非固定的 CSS 间距
- **FR-007**: 组件必须保持现有所有功能：valid/invalid 状态、clearable 等
- **FR-007a**: Root 必须支持 `large` 属性，应用于所有子 Input 和 InputAdornment，确保尺寸一致
- **FR-008**: 验证状态图标（valid/invalid）必须使用 InputAdornment 实现，自动插入到 Input 的 end 位置
- **FR-009**: 清除按钮必须使用 InputAdornment 实现，自动插入到 Input 的 end 位置
- **FR-010**: 系统自动插入的 InputAdornment（valid/invalid 图标、清除按钮）必须与用户提供的 InputAdornment 共存，排列顺序：[用户 InputAdornment] [验证图标] [清除按钮]。所有 end InputAdornments 必须绝对定位在 input 元素的右边缘（LTR）或左边缘（RTL），确保视觉上始终紧贴 input
- **FR-011**: Root 必须支持包含多个 Input（docked input group），每个 Input 可以有独立的前后 InputAdornment
- **FR-012**: 组件必须支持所有原有的 HTML input 属性（通过 Input 组件传递）
- **FR-013**: 组件必须完全支持 RTL（从右到左）语言，InputAdornment 和 Input 位置正确镜像
- **FR-014**: 当 valid/invalid 和 clearButtonMode 同时存在时，必须保持原有的图标优先级逻辑（clearable 覆盖 validity）
- **FR-015**: 组件必须动态测量 InputAdornment 的宽度，并相应调整相邻 Input 的 text-indent 和 padding
- **FR-016**: InputAdornment 宽度变化时（如响应式、内容变化），必须触发重新计算
- **FR-017**: 组件导出必须保持为 BpkInput 命名空间（即使实现在 BpkInputV2 目录下）
- **FR-018**: 原有的单组件 BpkInput API 必须保持不变，继续可用
- **FR-019**: 边框样式必须根据 Root 中 Input 的数量和位置自动检测：单个 Input 使用普通边框；2+ 个 Input 自动应用 docked 样式（首个、中间、末尾）
- **FR-020**: 不提供手动 docked props（dockedFirst/Middle/Last），完全依赖自动检测

### 组件 API *(包含 props/types)*

#### BpkInput.Root Props

- **`gap`** (string, 可选, 默认: "0.5rem"): InputAdornment 与 Input 内容之间的间距（支持 CSS 长度单位）
- **`large`** (boolean, 可选, 默认: false): 是否使用大尺寸，应用于 Root 内的所有 Input
- **`className`** (string, 可选): 额外的 CSS 类名
- **`children`** (ReactNode, 必需): 子组件（可以是任意组合的 Input 和 InputAdornment）

**注意**: Root 接受应用于所有子组件的共享属性（gap、large）。Input 特定的属性（id、name、value 等）在各自的 Input 组件上设置。

#### BpkInput.Input Props

- **`id`** (string, 必需): input 元素的 id 属性
- **`name`** (string, 必需): input 元素的 name 属性
- **`value`** (string | number, 必需): input 元素的 value 属性
- **`type`** (string, 可选, 默认: "text"): 输入类型 - "text", "email", "number", "password", "tel"
- **`valid`** (boolean | null, 可选, 默认: null): 验证状态 - true（自动添加 valid 图标 InputAdornment）、false（自动添加 invalid 图标 InputAdornment）、null（无图标）
- **`clearButtonMode`** ('never' | 'whileEditing' | 'always', 可选, 默认: 'never'): 清除按钮显示模式
- **`clearButtonLabel`** (string, 条件必需): 清除按钮的 aria-label（当 clearButtonMode 不为 'never' 时必需）
- **`onClear`** (function, 条件必需): 清除按钮点击回调（当 clearButtonMode 不为 'never' 时必需）
- **`inputRef`** (function, 可选): input 元素的 ref 回调
- **`className`** (string, 可选): 额外的 CSS 类名
- **所有其他 HTML input 属性** (可选): placeholder、disabled、readOnly、onChange 等

**注意**: 边框样式自动检测，无需手动指定 docked props：
- 单个 Input：普通边框（四角圆角）
- 2 个 Input：第一个（左圆角+右平边），最后一个（左平边+右圆角）
- 3+ 个 Input：第一个（左圆角+右平边），中间（两侧平边），最后（左平边+右圆角）

#### BpkInput.InputAdornment Props

- **`children`** (ReactNode, 必需): 要显示的内容（文本、图标等）
- **`className`** (string, 可选): 额外的 CSS 类名

**TypeScript 类型示例**:
```typescript
type BpkInputRootProps = {
  gap?: string;
  large?: boolean;
  className?: string;
  children: ReactNode;
};

type BpkInputProps = {
  id: string;
  name: string;
  value: string | number;
  type?: 'text' | 'email' | 'number' | 'password' | 'tel';
  valid?: boolean | null;
  clearButtonMode?: 'never' | 'whileEditing' | 'always';
  clearButtonLabel?: string;
  onClear?: (e?: SyntheticEvent<HTMLButtonElement>) => void;
  inputRef?: (ref: HTMLInputElement) => void;
  className?: string;
} & Omit<ComponentProps<'input'>, 'id' | 'name' | 'value' | 'type'>;

type BpkInputAdornmentProps = {
  children: ReactNode;
  className?: string;
};
```

### 非功能需求

- **NFR-001**: 组件必须支持键盘访问（tab、enter、space）
- **NFR-002**: 组件必须与屏幕阅读器兼容（正确的 ARIA 属性）
- **NFR-003**: 组件必须支持 RTL 语言
- **NFR-004**: 组件必须符合 WCAG 2.1 Level AA 标准
- **NFR-005**: 组件必须在所有支持的浏览器上正确渲染（Chrome 109+, Edge 129+, Firefox 131+, Safari 15+, Samsung 26+）
- **NFR-006**: 组件必须对所有尺寸使用 `rem` 单位（不使用 `px` 或 `em`）
- **NFR-007**: 动态测量 InputAdornment 宽度必须高效执行，使用 ResizeObserver 监听变化
- **NFR-008**: InputAdornment 归属判断必须在组件挂载和更新时自动执行，无需用户手动配置
- **NFR-009**: 所有代码必须通过 ESLint 检查，无错误或警告
- **NFR-010**: 所有样式代码必须通过 Stylelint 检查，无错误或警告
- **NFR-011**: 所有 TypeScript 代码必须通过类型检查，无编译错误

### 样式需求

- **STY-001**: 所有样式必须使用 CSS Modules (`.module.scss`)
- **STY-002**: 样式必须使用现代 Sass API 的 `@use` 语法
- **STY-003**: 导入必须是来自 `bpk-mixins` 子模块的细粒度导入
- **STY-004**: 所有间距必须使用设计 tokens（例如 `tokens.bpk-spacing-md()`）
- **STY-005**: 所有颜色必须使用设计 tokens（例如 `tokens.$bpk-color-white`）
- **STY-006**: 类名必须遵循 BEM 命名规范，使用 `bpk-` 前缀（例如 `bpk-input--variant`）
- **STY-007**: InputAdornment 与 Input 内容之间的间距通过动态计算实现：
  - startInputAdornment 存在时：InputAdornment 绝对定位在 input 左边缘（LTR）/右边缘（RTL），`input.style.textIndent = InputAdornment 宽度 + gap`
  - endInputAdornment 存在时：InputAdornment 绝对定位在 input 右边缘（LTR）/左边缘（RTL），`input.style.paddingRight (LTR) = 所有 end InputAdornments 总宽度 + gap`
  - 这确保用户输入的文本与 InputAdornment 保持正确间距，且 end InputAdornments 始终紧贴 input 右侧（LTR）
- **STY-008**: 验证图标必须使用 InputAdornment 实现，包含图标元素，自动插入到 Input 的 end 位置
- **STY-009**: 清除按钮必须使用 InputAdornment 实现，包含 button 元素，自动插入到 Input 的 end 位置
- **STY-010**: 当 clearable 和 validity 同时存在时，两个 InputAdornment 按顺序渲染：[验证图标] [清除按钮]
- **STY-011**: 组件必须保持与现有 BpkInput 相同的视觉外观
- **STY-012**: 在 RTL 模式下，所有元素位置必须正确镜像：start InputAdornments 在右侧，end InputAdornments 在左侧
- **STY-013**: InputAdornment 必须使用绝对定位（position: absolute）放置在 input 元素内，垂直居中对齐
- **STY-016**: 所有 InputAdornments 必须使用绝对定位：start InputAdornments 定位在 input 左边缘（LTR）/ 右边缘（RTL），end InputAdornments 定位在 input 右边缘（LTR）/ 左边缘（RTL）。当有多个 adornments 时，它们按顺序排列在对应的边缘
- **STY-014**: large 样式通过 Root 的 large 属性控制，应用于所有子 Input 和 InputAdornment
- **STY-015**: Input 文本溢出时必须使用 `text-overflow: ellipsis` 和 `overflow: hidden`，确保在小尺寸设备上文本被正确截断

## 成功标准 *(必填)*

### 可衡量的结果

- **SC-001**: 组件在所有 InputAdornment 和 Input 组合下正确渲染
- **SC-002**: InputAdornment 自动归属逻辑在所有场景下正确工作
- **SC-003**: gap 属性正确控制所有 InputAdornment 与 Input 的间距
- **SC-004**: 所有可访问性测试通过 jest-axe
- **SC-005**: 视觉回归测试在 Percy 中通过（如果适用）
- **SC-006**: 测试覆盖率达到阈值（70% 分支、75% 函数/行/语句）
- **SC-007**: TypeScript 编译无错误
- **SC-008**: ESLint 检查通过，无错误或警告
- **SC-009**: Stylelint 检查通过，无错误或警告
- **SC-010**: Storybook 故事展示所有变体和状态（包括 docked group）
- **SC-011**: README 文档完整并包含新 API 的使用示例
- **SC-012**: 组件在所有支持的浏览器中正常工作
- **SC-013**: RTL 支持经过测试和验证
- **SC-014**: ResizeObserver 正确监听 InputAdornment 宽度变化并触发重新计算

## 设计与视觉规格

**Figma**: 见用户提供的截图（显示 docked input group，第一个输入框带绿色勾，第二个带红色叉）

**要实现的视觉状态**:
- 默认/静止状态
- 悬停状态
- 焦点状态（键盘导航）
- 激活/按下状态
- 禁用状态
- Valid 状态（带验证图标）
- Invalid 状态（带错误图标）
- 带 InputAdornment 的状态
- Docked group 状态
- Clearable 状态（显示清除按钮）
- Large 尺寸状态

**响应式行为**:
- 移动设备 (<= 768px): 完整宽度，适应小屏幕，文本溢出时使用 ellipsis 截断
- 平板 (769px - 1023px): 适应中等屏幕
- 桌面 (>= 1024px): 标准尺寸
- **文本溢出处理**: 当 Input 宽度不足时，文本使用 `text-overflow: ellipsis` 截断，确保在小尺寸设备上正确显示（如用户提供的截图）

**RTL 支持**:
- InputAdornment 和 Input 在 RTL 模式下应镜像位置
- 验证图标和清除按钮的位置应镜像
- 所有间距和对齐应正确适配

## 依赖与相关组件

**内部依赖**（其他 Backpack 组件）:
- 使用 `bpk-component-icon` 的 `withButtonAlignment` HOC
- 使用 `bpk-component-icon` 的 close-circle 图标（清除按钮）
- 使用 `bpk-react-utils` 的 `cssModules`

**外部依赖**（npm 包）:
- React 18+
- 无其他额外依赖

**设计 Token 依赖**:
- `@skyscanner/bpk-foundations-web` 用于设计 tokens
- `bpk-mixins` 用于 Sass 工具

## 测试策略

### 单元测试 (`BpkInputV2-test.tsx`)
- 测试所有 InputAdornment 和 Input 组合
- 测试 InputAdornment 自动归属逻辑（前、后、多个连续）
- 测试 gap 属性的动态计算
- 测试事件处理器（onChange、onClear 等）
- 测试条件渲染（验证图标、清除按钮）
- 测试 docked input group
- 测试边界情况（空值、无 InputAdornment、多个连续 InputAdornment）
- 每个变体的快照测试
- 测试动态 text-indent 和 padding 计算
- 测试 ResizeObserver 监听 InputAdornment 宽度变化

### 可访问性测试 (`accessibility-test.tsx`)
- 使用 jest-axe 进行自动化检查
- 测试键盘导航（在多个 Input 之间切换）
- 测试屏幕阅读器支持
- 测试 ARIA 属性
- 测试焦点管理
- 测试 clearButtonLabel 的正确应用

### 视觉回归测试（通过 Storybook 的 Percy）
- 测试所有视觉变体
- 测试所有交互状态
- 测试 docked group 场景
- 测试响应式断点
- 测试 RTL 模式
- ⚠️ 如果组件使用图像，不要测试（根据 `decisions/visual-tests.md` 在 CI 上不稳定）

## 文档需求

### README.md
- 组件描述（<100 词，英式英语散文）
- 新 API 的使用示例和代码片段
- Props 表格和描述
- InputAdornment 归属逻辑的详细说明
- gap 属性的使用说明
- Docked input group 的示例
- 浏览器支持信息
- 链接到 Storybook
- **重要**: 明确说明 InputAdornment 主要用于放置图标（icon）或文字，建议保持简洁
- **重要**: 说明所有内容需要垂直居中对齐
- **重要**: 说明 InputAdornment 归属的自动判断规则
- **重要**: 说明 InputAdornment 的使用语法：`<BpkInput.InputAdornment>icon/text</BpkInput.InputAdornment>`

### Storybook (`examples/bpk-component-input-v2/stories.tsx`)
- 默认故事展示基本用法
- 带 InputAdornment 的单个 Input 故事
- Docked input group 故事
- 不同 gap 值的故事
- 每个变体/尺寸组合的故事
- 交互状态的故事（hover、focus、active）
- 禁用状态的故事
- 边界情况的故事（多个连续 InputAdornment、无 InputAdornment 等）
- Valid/Invalid 状态 + InputAdornment 的组合故事
- Clearable + InputAdornment 的组合故事
- RTL 模式的故事
- 添加 a11y addon 进行可访问性检查
- 必须使用 TypeScript 编写

### JSDoc/TSDoc 注释
- 组件描述
- 所有 props 都有类型和描述的文档
- InputAdornment 归属逻辑的详细说明
- gap 计算机制的说明
- JSDoc 中的示例（在有帮助的地方）

## 迁移与版本控制

**版本类型**: MINOR（次版本）

**理由**: 虽然添加了新的 composable API，但原有的单组件实现保留在原位置，不影响现有用户。这是添加新功能（新的灵活 API 方式），而不是破坏性变更。用户可以选择继续使用旧 API 或迁移到新 API。

**新增功能**:
- 新增灵活的 composable API 结构
- 新增统一的 InputAdornment 组件（自动判断归属）
- 新增 gap 属性控制间距
- 支持任意组合 InputAdornment 和 Input
- 自动边框检测（无需手动 docked props）
- 原有单组件 API 保持不变，继续可用

**新增功能说明**:
```typescript
// 原有 API（继续可用，无需迁移）
<BpkInput
  id="input"
  name="input"
  value={value}
  onChange={onChange}
  placeholder="输入文本"
/>

// 新 API：单个 input 带元素
<BpkInput.Root gap="0.5rem">
  <BpkInput.InputAdornment>$</BpkInput.InputAdornment>
  <BpkInput.Input
    id="price"
    name="price"
    value={value}
    onChange={onChange}
  />
  <BpkInput.InputAdornment>USD</BpkInput.InputAdornment>
</BpkInput.Root>

// 新 API：Docked input group (边框自动检测，large 在 Root 层级)
<BpkInput.Root gap="0.5rem" large>
  <BpkInput.InputAdornment>Ec</BpkInput.InputAdornment>
  <BpkInput.Input
    id="from"
    name="from"
    value="Edinburgh"
    valid
  />
  <BpkInput.InputAdornment>icon</BpkInput.InputAdornment>
  <BpkInput.Input
    id="to"
    name="to"
    value="London"
    valid={false}
  />
  <BpkInput.Input
    id="depart"
    name="depart"
    value="2024-01-15"
  />
  <BpkInput.Input
    id="return"
    name="return"
    value="2024-01-16"
  />
</BpkInput.Root>
```

## 实现说明

**文件结构**:
```
packages/bpk-component-input/
├── README.md
├── index.ts                                    # 同时导出原有 BpkInput 和新的 composable API
└── src/
    ├── BpkInput.tsx                            # 原有实现（保留，继续使用）
    ├── BpkInput.module.scss                    # 原有样式
    ├── common-types.ts                         # 原有类型
    └── BpkInputV2/                             # 新增目录
        ├── BpkInputRoot.tsx                    # Root 组件
        ├── BpkInput.tsx                   # Input 子组件
        ├── BpkInputAdornment.tsx                 # InputAdornment 子组件（统一）
        ├── BpkInputContext.tsx                 # Context for sharing gap and measuring
        ├── useInputAdornmentAttribution.ts            # Hook for auto InputAdornment attribution logic
        ├── useGapCalculation.ts                # Hook for dynamic gap calculation
        ├── useBorderDetection.ts               # Hook for automatic border style detection
        ├── index.tsx                           # 组合导出
        ├── BpkInputV2.module.scss              # 新样式
        ├── BpkInputV2-test.tsx                 # 单元测试
        ├── accessibility-test.tsx              # 可访问性测试
        ├── common-types.ts                     # V2 类型定义
        └── __snapshots__/

examples/bpk-component-input-v2/                # 新增目录
├── stories.tsx                                 # TypeScript Storybook 故事
├── stories-utils.tsx                           # 故事工具（如果需要）
└── examples.module.scss                        # 示例样式
```

**导出策略**:
```typescript
// packages/bpk-component-input/index.ts
export { default } from './src/BpkInput';  // 原有导出
export * from './src/BpkInputV2';          // 新增 composable API 导出
```

**关键实现原则**:
1. 遵循 Backpack constitution 原则
2. 所有代码使用 TypeScript
3. 使用 `@use` 语法的现代 Sass
4. 使用 jest-axe 确保可访问性
5. 达到测试覆盖率要求
6. 使用英式英语散文、美式英语代码记录
7. 所有尺寸使用 `rem` 单位
8. 支持 RTL 语言
9. 使用 React Context 在 Root 和子组件之间共享 gap 和测量数据
10. 参考 Ark UI 的 composable 设计模式
11. 使用 ResizeObserver 监听 InputAdornment 宽度变化
12. InputAdornment 归属逻辑通过 React Children API 实现自动判断
13. 边框样式通过 React Children API 自动检测 Input 数量和位置

## 开放问题

_所有问题已解决：_

- [x] ~~Q1: 是否需要保留旧的单组件 API？~~ → **已解决**: 保留原组件代码在原位置不受影响，V2 实现放在 `BpkInputV2/` 子目录
- [x] ~~Q2: InputAdornment 如何区分 start 和 end？~~ → **已解决**: 不区分，通过位置自动判断归属
- [x] ~~Q3: InputAdornment 归属逻辑如何实现？~~ → **已解决**: 使用 React Children API 遍历子元素，根据位置关系自动判断
- [x] ~~Q4: gap 如何实现？~~ → **已解决**: 通过 Root 的 gap 属性 + 动态计算 text-indent/padding
- [x] ~~Q5: 如何支持 docked input group？~~ → **已解决**: 通过自动边框检测实现。Root 中的所有 Input 自动 docked，边框样式根据 Input 数量和位置自动应用（无需手动 docked props）

## 参考

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **Architecture Decisions**: `decisions/` 目录
- **Component Examples**: `packages/` 中的其他组件
- **Design Tokens**: `@skyscanner/bpk-foundations-web`
- **Sass Mixins**: `packages/bpk-mixins/`
- **Ark UI Documentation**: https://ark-ui.com/ （参考 composable 设计模式）
- **用户提供的设计截图**: 显示 docked input group 示例
