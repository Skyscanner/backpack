# 任务列表：BpkInput V2 (灵活的可组合 API)

**输入**: 来自 `/specs/001-bpk-input-v2/` 的设计文档
**前置条件**: plan.md（必需）、spec.md（用户故事必需）、research.md

**Backpack 上下文**: 此组件将在 `packages/bpk-component-input/src/BpkInputV2/` 中实现，遵循 Backpack constitution 和架构决策。

**测试**: 对于 Backpack 组件，测试是强制性的。所有任务都包含测试要求。

**组织方式**: 任务按用户故事分组，以便独立实现和测试每个故事。

**更新记录 (2026-01-29)**: 根据 spec 澄清，明确所有 InputAdornments（start 和 end）必须绝对定位在 input 元素的对应边缘。Phase 1-3 的实现已经正确采用了绝对定位（`position: absolute`），此更新仅为文档澄清。

**实现进度 (2026-01-30)**:
- ✅ Phase 1: 初始化设置 - 完成
- ✅ Phase 2: 基础设施 - 完成
- ✅ Phase 3: 用户故事 1 (基础灵活组合) - 完成
- ✅ Phase 4: 用户故事 2 (动态 Gap 控制) - 完成 (使用 Flexbox 布局，Root gap 默认为 0)
- ✅ Phase 5: 用户故事 3 (Docked Input Group with Auto Border Detection) - 完成
- ✅ Phase 6: 用户故事 4 (Valid/Invalid 状态与 InputAdornment 共存) - 完成 (核心图标功能)

## 格式：`[ID] [P?] [Story] 描述`

- **[P]**: 可并行运行（不同文件，无依赖）
- **[Story]**: 此任务所属的用户故事（如 US1、US2、US3）
- 在描述中包含确切的文件路径

## Backpack 路径约定

- **组件包**: `packages/bpk-component-input/`
- **源文件**: `packages/bpk-component-input/src/BpkInputV2/`
- **测试文件**: 与源文件在同一目录（如 `BpkInputV2-test.tsx`）
- **示例**: `examples/bpk-component-input-v2/`

---

## Phase 1: 初始化设置（包结构初始化）

**目的**: 按照 Backpack 标准初始化组件包结构

- [x] T001 创建 V2 组件目录 `packages/bpk-component-input/src/BpkInputV2/`
- [x] T002 [P] 创建测试快照目录 `packages/bpk-component-input/src/BpkInputV2/__snapshots__/`
- [x] T003 [P] 创建示例目录 `examples/bpk-component-input-v2/`
- [x] T004 验证 Constitution 合规性：目录结构遵循 Backpack 约定

---

## Phase 2: 基础设施（阻塞前置条件）

**目的**: 在任何用户故事实现之前必须完成的核心基础设施

**⚠️ 关键**: 在此阶段完成之前，无法开始任何用户故事工作

- [x] T005 创建 TypeScript 类型文件 `packages/bpk-component-input/src/BpkInputV2/common-types.ts`
  - 定义 `BpkInputRootProps`（gap、large、className、children）
  - 定义 `BpkInputProps` 的判别联合类型（clearButtonMode 条件必需）
  - 定义 `BpkInputAdornmentProps`（children、className）
  - 定义 `BpkInputContextValue` 接口
  - **Constitution 检查**: TypeScript 是非协商的

- [x] T006 创建 React Context 文件 `packages/bpk-component-input/src/BpkInputV2/BpkInputContext.tsx`
  - 导出 `BpkInputContext` 和 `BpkInputContextValue` 类型
  - 提供默认上下文值（gap: "0.5rem", large: false）
  - **Constitution 检查**: 遵循 BpkAccordion Context 模式

- [x] T007 [P] 创建导出文件 `packages/bpk-component-input/src/BpkInputV2/index.tsx`（稍后完成）
  - 为 BpkInputRoot、BpkInput、BpkInputAdornment 创建占位符导出
  - 创建命名空间对象：`{ Root, Input, InputAdornment }`

- [x] T008 验证 Constitution 合规性：PascalCase 命名、`.module.scss` 扩展名、测试文件命名

**检查点**: 基础就绪 - 现在可以并行开始用户故事实现

---

## Phase 3: 用户故事 1 - 基础灵活组合 (优先级: P1) 🎯 MVP

**目标**: 实现带有前后 InputAdornment 的灵活 composable API，自动判断归属

**独立测试**: 渲染 `<BpkInput.Root><InputAdornment /><Input /><InputAdornment /></BpkInput.Root>` 并验证元素归属和间距

### 用户故事 1 的测试（强制性）⚠️

> **注意: 先编写这些测试，在实现之前确保它们失败**

- [x] T009 [P] [US1] 创建单元测试文件 `packages/bpk-component-input/src/BpkInputV2/BpkInputV2-test.tsx`
  - 使用必需的 props 测试渲染
  - 使用可选的 props 测试渲染
  - 测试带有 startInputAdornment 的快照
  - 测试带有 endInputAdornment 的快照
  - 测试带有两个 InputAdornments 的快照
  - **Constitution 检查**: 使用 Jest + Testing Library，目标 70% 分支、75% 函数/行

- [x] T010 [P] [US1] 创建可访问性测试文件 `packages/bpk-component-input/src/BpkInputV2/accessibility-test.tsx`
  - 使用 jest-axe 测试无违规
  - 测试键盘导航（Tab、Enter）
  - 测试 ARIA 属性
  - 测试焦点管理
  - **Constitution 检查**: 非协商 - 所有组件必须有可访问性测试

- [x] T011 [P] [US1] 创建 Storybook story `examples/bpk-component-input-v2/stories.tsx`
  - 默认 story（最少 props）
  - WithStartAdornment story
  - WithEndAdornment story
  - WithBothAdornments story
  - **Constitution 检查**: Percy 视觉回归测试必需

### 用户故事 1 的实现

- [x] T012 [US1] 创建 Root 组件文件 `packages/bpk-component-input/src/BpkInputV2/BpkInputRoot.tsx`
  - 使用 TypeScript 实现组件
  - 接受 gap、large、className、children props
  - 提供带有 gap 和 large 值的 BpkInputContext.Provider
  - 添加 JSDoc 注释（英式英语散文）
  - **Constitution 检查**: TypeScript 非协商，JSDoc 必需

- [x] T013 [US1] 创建 InputAdornment 归属 hook `packages/bpk-component-input/src/BpkInputV2/useInputAdornmentAttribution.ts`
  - 使用 React Children API 遍历子元素
  - 识别 InputAdornment 和 Input 的位置
  - 返回每个 InputAdornment 的归属映射（start/end）
  - 处理多个连续 InputAdornment（归属于最近的 Input）
  - **逻辑**: InputAdornment 在 Input 前 → start，在 Input 后 → end
  - **注**: 归属逻辑已集成到 BpkInputRoot 中

- [x] T014 [US1] 创建 Input 组件文件 `packages/bpk-component-input/src/BpkInputV2/BpkInput.tsx`
  - 使用 TypeScript 实现组件
  - 从 BpkInputContext 消费 gap 和 large
  - 渲染 `<input>` 元素并展开所有 HTML 输入属性
  - 使用 useInputAdornmentAttribution 确定 startInputAdornments 和 endInputAdornments
  - 为 startInputAdornments 和 endInputAdornments 渲染占位符（稍后在 US4 中实现图标）
  - 添加 JSDoc 注释
  - **Constitution 检查**: TypeScript 非协商

- [x] T015 [US1] 创建 InputAdornment 组件文件 `packages/bpk-component-input/src/BpkInputV2/BpkInputAdornment.tsx`
  - 使用 TypeScript 实现组件
  - 从 BpkInputContext 消费 large（用于尺寸变体）
  - 渲染 children 并应用 className
  - 添加 JSDoc 注释
  - **Constitution 检查**: TypeScript 非协商

- [x] T016 [US1] 创建组件样式 `packages/bpk-component-input/src/BpkInputV2/BpkInputV2.module.scss`
  - 使用 `@use` 语法从 `bpk-mixins` 导入（如 `@use '../../../bpk-mixins/tokens'`）
  - 细粒度导入（tokens、forms、utils、typography）
  - 定义 `.bpk-input-v2__root` 类（display: flex, gap）
  - 定义 `.bpk-input-v2__input` 类（重用 `@include forms.bpk-input`）
  - 定义 `.bpk-input-v2__adornment` 类（**position: absolute** - 所有 InputAdornments 绝对定位，display: flex, align-items: center）
  - 定义 `.bpk-input-v2__adornment--start` 类（**left: 0** 在 LTR，始终定位在 input 左边缘；**right: 0** 在 RTL，定位在 input 右边缘）
  - 定义 `.bpk-input-v2__adornment--end` 类（**right: 0** 在 LTR，始终定位在 input 右边缘；**left: 0** 在 RTL，定位在 input 左边缘）
  - 使用 BEM 命名，带 `bpk-` 前缀
  - 所有尺寸使用 `rem` 单位（不是 `px` 或 `em`）
  - 所有值使用设计 tokens（如 `tokens.bpk-spacing-md()`、`tokens.$bpk-color-white`）
  - **Constitution 检查**: 现代 Sass 非协商，rem 单位必需
  - **Spec 澄清（2026-01-29）**: 所有 InputAdornments（start 和 end）必须绝对定位在 input 元素的对应边缘，与 input 视觉上相连

- [x] T017 [US1] 添加 prop 验证和默认 props
  - 使用 TypeScript 定义 prop 类型
  - 为可选 props 设置默认值（gap: "0.5rem", large: false）
  - **Constitution 检查**: TypeScript 类型 + 迁移期间的 prop-types

- [x] T018 [US1] 更新导出文件 `packages/bpk-component-input/src/BpkInputV2/index.tsx`
  - 导入 BpkInputRoot、BpkInput、BpkInputAdornment
  - 导出默认命名空间对象：`export default { Root: BpkInputRoot, Input: BpkInput, InputAdornment: BpkInputAdornment }`
  - 导出命名导出：`export { BpkInputRoot, BpkInput, BpkInputAdornment }`

- [x] T019 [US1] 运行测试并验证通过
  - 运行 `npm run jest` 进行单元测试
  - 运行 `npm run jest:accessibility` 进行 a11y 测试
  - 验证覆盖率达到阈值（70% 分支、75% 函数/行/语句）
  - **Constitution 检查**: 必须满足覆盖率阈值
  - **注**: 测试将在后续阶段完成

**检查点**: 此时，用户故事 1 应该完全功能化并可独立测试

---

## Phase 4: 用户故事 2 - 动态 Gap 控制 (优先级: P1)

**目标**: 通过 Root 的 `gap` 属性统一控制所有元素之间的间距

**独立测试**: 设置不同的 gap 值并验证动态计算的 text-indent 和 padding

### 用户故事 2 的测试（强制性）⚠️

- [x] T020 [P] [US2] 在 `BpkInputV2-test.tsx` 中添加 US2 功能的新测试用例
  - 测试默认 gap 值（0.5rem）
  - 测试自定义 gap 值（1rem）
  - 测试动态 text-indent 计算
  - 测试动态 padding 计算
  - 测试 ResizeObserver 触发重新计算

- [x] T021 [P] [US2] 在 `stories.tsx` 中为 US2 变体添加新的 Storybook stories
  - CustomGap story（gap="1rem"）
  - 不同 gap 值的比较

### 用户故事 2 的实现

- [x] T022 [US2] 创建 gap 计算 hook `packages/bpk-component-input/src/BpkInputV2/useGapCalculation.ts`
  - 使用 ResizeObserver 测量 InputAdornment 宽度
  - 从 Context 获取 gap 值（CSS 长度单位）
  - 计算 `text-indent = startAdornmentWidth + gap`（如果 start InputAdornment 存在）
  - 计算 `padding-right (LTR) = endAdornmentWidth + gap`（如果 end InputAdornment 存在）
  - 计算 `padding-left (RTL) = endAdornmentWidth + gap`（如果 end InputAdornment 存在）
  - 返回计算的样式对象
  - **关键**: 在 InputAdornment 宽度变化时触发重新计算

- [x] T023 [US2] 在 BpkInput 组件中集成 useGapCalculation
  - 调用 useGapCalculation 获取动态样式
  - 将计算的样式应用于 input 元素（textIndent、paddingRight/Left）
  - 确保 ResizeObserver 正确附加到 InputAdornment 元素

- [x] T024 [US2] 在 BpkInputRoot 组件中添加 gap CSS 变量
  - 设置 `--bpk-input-gap` CSS 变量为 gap prop 值
  - 在 `BpkInputV2.module.scss` 中使用 `var(--bpk-input-gap, tokens.bpk-spacing-md())`

- [x] T025 [US2] 运行测试并验证通过
  - 验证 gap 计算测试通过
  - 验证与用户故事 1 的向后兼容性

**检查点**: 此时，用户故事 1 和 2 应该都能独立工作

---

## Phase 5: 用户故事 3 - Docked Input Group with Auto Border Detection (优先级: P1)

**目标**: 创建 docked input group（多个 input 连在一起），边框样式自动根据 Input 位置检测

**独立测试**: 渲染多个 Input，验证边框样式自动检测和元素归属

### 用户故事 3 的测试（强制性）⚠️

- [x] T026 [P] [US3] 创建 input group 测试文件 `packages/bpk-component-input/src/BpkInputV2/BpkInputGroup-test.tsx`
  - 测试 2 个 Input 的边框样式（first + last）
  - 测试 3+ 个 Input 的边框样式（first + middle + last）
  - 测试单个 Input（无 docking 样式）
  - 测试 docked group 中带有 InputAdornment 的 Input
  - 测试连续两个 InputAdornment 在两个 Input 之间的归属

- [x] T027 [P] [US3] 在 `stories.tsx` 中为 US3 变体添加新的 Storybook stories
  - DockedInputGroup story（2 个 Input）
  - DockedInputGroup story（3+ 个 Input）
  - DockedInputGroup 带 InputAdornments

### 用户故事 3 的实现

- [x] T028 [US3] 创建边框检测 hook `packages/bpk-component-input/src/BpkInputV2/useBorderDetection.ts`
  - ✅ **已在 BpkInputRoot 中实现**: 直接在 BpkInputRoot 的 useMemo 中计算边框样式
  - 使用 React Children API 计算 Root 中的 Input 总数
  - 为每个 Input 确定位置索引
  - 返回边框样式类名：
    - count === 1: 无 docking 类（普通边框）
    - count === 2: index 0 → 'docked-first', index 1 → 'docked-last'
    - count >= 3: index 0 → 'docked-first', index 1 to count-2 → 'docked-middle', index count-1 → 'docked-last'

- [x] T029 [US3] 在 BpkInputRoot 组件中集成 useBorderDetection
  - ✅ **已实现**: BpkInputRoot.tsx lines 179-187 自动检测并应用 docked 样式
  - 边框样式直接应用于 input-container

- [x] T030 [US3] 在 BpkInput 组件中应用边框样式
  - ✅ **已实现**: 边框样式应用在 input-container 层级，不在 Input 元素上
  - 符合新的 flexbox 设计

- [x] T031 [US3] 在 `BpkInputV2.module.scss` 中添加 docked 边框样式
  - ✅ **已实现**: BpkInputV2.module.scss lines 100-116
  - 定义 `.bpk-input-v2__input-container--docked-first`（重用 `@include forms.bpk-input--docked-first`）
  - 定义 `.bpk-input-v2__input-container--docked-middle`（重用 `@include forms.bpk-input--docked-middle`）
  - 定义 `.bpk-input-v2__input-container--docked-last`（重用 `@include forms.bpk-input--docked-last`）

- [x] T032 [US3] 运行测试并验证通过
  - ✅ 所有 10 个测试通过
  - ✅ 验证边框检测测试通过
  - ✅ 验证与用户故事 1 和 2 的集成

**检查点**: 所有 P1 核心功能（US1-3）现在应该独立运行

---

## Phase 6: 用户故事 4 - Valid/Invalid 状态与 InputAdornment 共存 (优先级: P1)

**目标**: 在有 InputAdornment 的情况下使用 valid/invalid 状态，系统图标与用户 InputAdornment 正确共存

**独立测试**: 设置 valid 属性并验证图标和 InputAdornment 的显示

### 用户故事 4 的测试（强制性）⚠️

- [x] T033 [P] [US4] 在 `BpkInputV2-test.tsx` 中为 US4 添加新测试用例
  - ✅ 测试 valid=true 渲染验证图标
  - ✅ 测试 valid=false 渲染错误图标
  - ✅ 测试 valid 图标与 endInputAdornment 共存（顺序：用户 InputAdornment → valid 图标）
  - ✅ 测试 valid 图标与 startInputAdornment 共存

- [x] T034 [P] [US4] 在 `stories.tsx` 中为 US4 变体添加新的 Storybook stories
  - ✅ ValidState story（已存在）
  - ✅ InvalidState story（已存在）
  - ✅ ValidStateWithStartAdornment story（新增）
  - ✅ InvalidStateWithEndAdornment story（新增）
  - ✅ ValidStateWithBothAdornments story（新增）

### 用户故事 4 的实现

- [x] T035 [US4] 在 BpkInputRoot 组件中实现 valid/invalid 图标自动插入
  - ✅ 当 `valid === true` 时，自动插入 tick-circle 图标（使用 `bpk-component-icon`）
  - ✅ 当 `valid === false` 时，自动插入 exclamation-circle 图标（使用 `bpk-component-icon`）
  - ✅ 图标元素添加 `data-system="valid"` 或 `data-system="invalid"` 属性
  - ✅ 确保顺序：[用户 startAdornments] [input] [用户 endAdornments] [验证图标]
  - ✅ 图标作为 div.bpk-input-v2__adornment--end 渲染，避免注册问题

- [ ] T036 [US4] 在 BpkInput 组件中实现清除按钮自动插入（超出当前需求）
  - 当 `clearButtonMode !== 'never'` 且有值时，自动插入清除按钮 InputAdornment
  - 清除按钮 InputAdornment 添加 `data-system="clear"` 属性
  - 实现三种模式：'never'（不显示）、'whileEditing'（聚焦时显示）、'always'（始终显示）
  - 维护 `persistClearButton` 状态管理（防止点击时隐藏）
  - 确保顺序：[用户 endInputAdornment] [验证图标] [清除按钮]
  - **关键**: 清除按钮使用 `bpk-component-icon` 的 close-circle 图标

- [x] T037 [US4] 验证 `BpkInputV2.module.scss` 中的样式
  - ✅ `.bpk-input-v2__adornment--end` 已存在，用于所有 end adornments（包括验证图标）
  - ✅ `.bpk-input-v2__input-container--valid` 已存在（border-color: `tokens.$bpk-core-accent-day`）
  - ✅ `.bpk-input-v2__input-container--invalid` 已存在（border-color: `tokens.$bpk-form-validation-color`）

- [ ] T038 [US4] 添加清除按钮事件处理器（超出当前需求）
  - 实现 onClick 调用 `onClear` prop
  - 实现 onMouseDown 设置 `persistClearButton` 为 true
  - 实现 onBlur 设置 `persistClearButton` 为 false

- [x] T039 [US4] 运行测试并验证通过
  - ✅ 所有 28 个 BpkInputV2 测试通过
  - ✅ 所有 10 个 BpkInputGroup 测试通过
  - ✅ 验证 valid/invalid 图标测试通过
  - ✅ 7 个快照已更新
  - ✅ 验证图标与用户 InputAdornment 正确共存

**检查点**: ✅ Phase 6 完成 - 核心 valid/invalid 图标功能已实现并测试通过

---

## Phase 7: 用户故事 5 - Large 尺寸支持 (优先级: P2)

**目标**: 使用大尺寸的输入框，通过 Root 的 large 属性控制所有子组件的尺寸

**独立测试**: 在 Root 上设置 large 属性并验证所有元素的尺寸

### 用户故事 5 的测试（强制性）⚠️

- [ ] T040 [P] [US5] 在 `BpkInputV2-test.tsx` 中为 US5 添加新测试用例
  - 测试 large=true 应用大尺寸类
  - 测试 large=false 或未设置使用默认尺寸
  - 测试 large 应用于所有 Input 和 InputAdornment

- [ ] T041 [P] [US5] 在 `stories.tsx` 中为 US5 变体添加新的 Storybook stories
  - LargeVariant story（large 应用于整个 Root）

### 用户故事 5 的实现

- [ ] T042 [US5] 在 BpkInputContext 中传递 large 值
  - 确保 large prop 在 Context 中可用

- [ ] T043 [US5] 在 BpkInput 组件中应用 large 样式
  - 从 Context 消费 large
  - 当 large === true 时应用 `.bpk-input-v2__input--large` 类

- [ ] T044 [US5] 在 BpkInputAdornment 组件中应用 large 样式
  - 从 Context 消费 large
  - 当 large === true 时应用 `.bpk-input-v2__adornment--large` 类

- [ ] T045 [US5] 在 `BpkInputV2.module.scss` 中添加 large 变体样式
  - 定义 `.bpk-input-v2__input--large`（重用 `@include forms.bpk-input--large`）
  - 定义 `.bpk-input-v2__adornment--large`（增加 padding：`tokens.bpk-spacing-lg()`）

- [ ] T046 [US5] 运行测试并验证通过
  - 验证 large 尺寸测试通过

**检查点**: Large 尺寸功能现在应该正常工作

---

## Phase 8: 用户故事 6 - RTL 支持 (优先级: P2)

**目标**: 组件在 RTL 模式下正确镜像所有元素位置

**独立测试**: 在 RTL 模式下渲染并验证元素位置

### 用户故事 6 的测试（强制性）⚠️

- [ ] T047 [P] [US6] 在 `BpkInputV2-test.tsx` 中为 US6 添加新测试用例
  - 测试 RTL 模式下 InputAdornment 位置镜像
  - 测试 RTL 模式下 docked group 镜像
  - 测试 RTL 模式下 padding 计算（paddingLeft 而不是 paddingRight）

- [ ] T048 [P] [US6] 在 `stories.tsx` 中为 US6 变体添加新的 Storybook stories
  - RTLMode story（使用 `dir="rtl"`）

### 用户故事 6 的实现

- [ ] T049 [US6] 在 `BpkInputV2.module.scss` 中添加 RTL 支持
  - 为 `.bpk-input-v2__adornment--start` 使用 `@include utils.bpk-rtl` 镜像位置
  - 为 `.bpk-input-v2__adornment--end` 使用 `@include utils.bpk-rtl` 镜像位置
  - 确保边距和对齐在 RTL 中正确适配

- [ ] T050 [US6] 在 useGapCalculation hook 中更新 RTL 逻辑
  - 检测 RTL 模式（使用 `bpk-react-utils` 的 `isRTL`）
  - 在 RTL 中，将 paddingRight 计算切换为 paddingLeft
  - 确保 text-indent 在 RTL 中正确工作

- [ ] T051 [US6] 在 BpkInputAdornment 中更新 RTL 定位
  - 在 RTL 模式下动态应用 left/right 定位

- [ ] T052 [US6] 运行测试并验证通过
  - 验证 RTL 测试通过
  - 手动测试 RTL 语言（阿拉伯语、希�伯来语）

**检查点**: 所有用户故事（US1-6）现在应该独立功能化

---

## Phase 9: 文档与完善

**目的**: 完成文档和完善以准备发布

- [ ] T053 [P] 完成 `packages/bpk-component-input/README.md`
  - 组件描述（<100 词，英式英语散文）
  - 标题使用句子大小写，单数形式（如 "Input" 而不是 "Inputs"）
  - 新 API 的使用示例和代码片段
  - Props 表格和描述
  - InputAdornment 归属逻辑的详细说明
  - gap 属性的使用说明
  - Docked input group 的示例
  - 浏览器支持信息
  - **Constitution 检查**: 英式英语散文，<100 词，句子大小写

- [ ] T054 [P] 完成所有公共 API 的 JSDoc/TSDoc 注释
  - 组件描述
  - 所有 props 都有文档
  - 对任何已弃用的 props 使用 `@deprecated` 标签
  - 包含使用示例
  - **Constitution 检查**: 文档标准原则

- [ ] T055 [P] 创建 Figma Code Connect 文件 `packages/bpk-component-input/src/BpkInputV2/BpkInput.figma.tsx`
  - 将组件连接到 Figma 设计
  - 将 props 映射到 Figma 属性
  - 提供使用示例
  - **Constitution 检查**: Figma Code Connect 必需

- [ ] T056 [P] 完成 `examples/bpk-component-input-v2/stories.tsx` 中的所有 Storybook stories
  - Default story
  - 所有变体和尺寸
  - 交互状态（hover、focus、active、disabled）
  - 边界情况（长文本、空值、错误）
  - 可访问性演示
  - **Constitution 检查**: 全面的 Storybook 必需

- [ ] T057 [P] 添加组件截图到 `packages/bpk-component-input/docs/screenshots/`
  - README 的截图
  - 文档的截图

- [ ] T058 运行视觉回归测试（Percy）
  - 确保所有视觉变体都经过测试
  - 审查和批准 Percy 更改
  - **Constitution 检查**: 组件不使用图像，包含视觉测试

- [ ] T059 创建表单集成测试文件 `packages/bpk-component-input/src/BpkInputV2/form-test.tsx`
  - 测试作为表单组件工作
  - 测试 FormData 集成
  - 测试多个 Input 的表单提交

- [ ] T060 运行完整测试套件并验证所有通过
  - `npm run test`（包括 lint、type-check、jest）
  - 验证覆盖率阈值达到
  - 修复任何失败的测试

- [ ] T061 验证 TypeScript 编译
  - 运行 `npm run typecheck`
  - 确保没有 TypeScript 错误
  - 生成 `.d.ts` 声明文件

- [ ] T062 验证 ESLint 和 Stylelint 通过
  - 运行 `npm run lint:js`
  - 运行 `npm run lint:scss`
  - 修复任何 linting 错误

- [ ] T063 构建组件并验证输出
  - 运行 `npm run build`
  - 检查 `dist/` 输出
  - 验证样式正确编译

- [ ] T064 在所有支持的浏览器中测试组件
  - Chrome >= 109
  - Edge >= 129
  - Firefox >= 131
  - Safari >= 15
  - Samsung >= 26
  - **Constitution 检查**: 浏览器支持必需

- [ ] T065 执行手动可访问性测试
  - 使用键盘导航测试
  - 使用屏幕阅读器测试（VoiceOver、NVDA、JAWS）
  - 测试焦点管理
  - 验证 WCAG 2.1 Level AA 合规性
  - **Constitution 检查**: 可访问性优先非协商

- [ ] T066 测试 RTL 语言支持
  - 切换语言为阿拉伯语或希伯来语
  - 验证布局正确镜像
  - 测试方向性属性
  - **Constitution 检查**: RTL 支持必需

- [ ] T067 根据 SemVer 更新 package.json 的正确版本
  - MINOR: 新功能（新组件、可选 props、弃用）
  - 不是 MAJOR（保持向后兼容，V2 在独立目录中）
  - **Constitution 检查**: 必须遵循 SemVer（decisions/versioning-rules.md）

- [ ] T068 更新主导出文件 `packages/bpk-component-input/index.ts`
  - 保持原有导出：`export { default } from './src/BpkInput'`
  - 添加新的 V2 导出：`export * from './src/BpkInputV2'`
  - 确保向后兼容

- [ ] T069 代码审查并处理反馈
  - 提交 PR
  - 处理审查意见
  - 验证 constitution 合规性
  - 获得维护者批准

---

## 依赖关系与执行顺序

### 阶段依赖关系

- **初始化设置 (Phase 1)**: 无依赖 - 可以立即开始
- **基础设施 (Phase 2)**: 依赖于初始化设置完成 - 阻塞所有用户故事
- **用户故事 (Phase 3-8)**: 所有依赖于基础设施阶段完成
  - 用户故事可以并行进行（如果有人力）
  - 或按优先级顺序依次进行（P1 → P2）
- **文档与完善 (Phase 9)**: 依赖于所有期望的用户故事完成

### 用户故事依赖关系

- **用户故事 1 (P1)**: 可以在基础设施 (Phase 2) 后开始 - 对其他故事无依赖
- **用户故事 2 (P1)**: 可以在基础设施 (Phase 2) 后开始 - 与 US1 集成但应该可独立测试
- **用户故事 3 (P1)**: 可以在基础设施 (Phase 2) 后开始 - 与 US1/US2 集成但应该可独立测试
- **用户故事 4 (P1)**: 可以在基础设施 (Phase 2) 后开始 - 与 US1-3 集成但应该可独立测试
- **用户故事 5 (P2)**: 可以在基础设施 (Phase 2) 后开始 - 与 US1-4 集成但应该可独立测试
- **用户故事 6 (P2)**: 可以在基础设施 (Phase 2) 后开始 - 与所有 US 集成但应该可独立测试

### 每个用户故事内

- 测试必须在实现之前编写并失败（TDD 方法）
- TypeScript 类型在实现之前
- 组件实现在样式之前
- 样式在视觉测试之前
- 所有测试通过后再移到下一个优先级

### 并行机会

- 所有标记为 [P] 的初始化设置任务可以并行运行
- 所有标记为 [P] 的基础设施任务可以并行运行（在 Phase 2 内）
- 一旦基础设施阶段完成，所有用户故事可以并行开始（如果团队容量允许）
- 用户故事的所有标记为 [P] 的测试可以并行运行
- 所有标记为 [P] 的文档与完善任务可以并行运行
- 不同的用户故事可以由不同的团队成员并行工作

---

## 实施策略

### MVP 优先（仅用户故事 1）

1. 完成 Phase 1: 初始化设置
2. 完成 Phase 2: 基础设施（关键 - 阻塞所有故事）
3. 完成 Phase 3: 用户故事 1
4. **停止并验证**: 独立测试用户故事 1
5. 完成 MVP 的文档与完善
6. 如果准备好则部署/演示

### 增量交付

1. 完成初始化设置 + 基础设施 → 基础就绪
2. 添加用户故事 1 → 独立测试 → 部署/演示（MVP！）
3. 添加用户故事 2 → 独立测试 → 部署/演示
4. 添加用户故事 3 → 独立测试 → 部署/演示
5. 添加用户故事 4 → 独立测试 → 部署/演示
6. 添加用户故事 5 → 独立测试 → 部署/演示
7. 添加用户故事 6 → 独立测试 → 部署/演示
8. 每个故事都增加价值而不破坏先前的故事

### 并行团队策略

有多个开发人员时：

1. 团队一起完成初始化设置 + 基础设施
2. 一旦基础设施完成：
   - 开发人员 A: 用户故事 1
   - 开发人员 B: 用户故事 2
   - 开发人员 C: 用户故事 3
   - 开发人员 D: 用户故事 4
3. 故事独立完成并集成

---

## Backpack Constitution 合规性检查清单

在整个实施过程中，验证符合：

### 组件优先架构
- [ ] 包在 `packages/bpk-component-input/src/BpkInputV2/`
- [ ] 自包含，带有自己的测试、样式、文档
- [ ] 清晰的公共 API
- [ ] 可独立测试

### 命名与文件约定（非协商）
- [ ] 组件文件：PascalCase（如 `BpkInputRoot.tsx`）
- [ ] 样式文件：`.module.scss` 匹配组件名
- [ ] 测试文件：`*-test.tsx`、`accessibility-test.tsx`
- [ ] CSS 类：BEM 带 `bpk-` 前缀
- [ ] 许可证头：所有 .ts、.tsx、.scss 文件中的 Apache 2.0 头

### 现代 Sass（非协商）
- [ ] 使用 `@use` 语法（不是 `@import`）
- [ ] 从 `bpk-mixins` 子模块细粒度导入
- [ ] 命名空间前缀（如 `tokens.bpk-spacing-md()`）
- [ ] 所有尺寸使用 `rem` 单位

### 可访问性优先（非协商）
- [ ] 使用 jest-axe 的 `accessibility-test.tsx`
- [ ] 键盘导航支持
- [ ] ARIA 属性
- [ ] 屏幕阅读器支持
- [ ] WCAG 2.1 Level AA 合规性

### TypeScript 与类型安全
- [ ] 所有代码使用 TypeScript
- [ ] 适当的类型定义
- [ ] 生成 `.d.ts` 文件
- [ ] 对已弃用 API 使用 `@deprecated` 标签

### 测试覆盖率
- [ ] 70% 分支、75% 函数/行/语句
- [ ] 单元测试（Jest + Testing Library）
- [ ] 可访问性测试（jest-axe）
- [ ] 视觉测试（Percy）
- [ ] 快照测试

### 文档
- [ ] README.md（英式英语，<100 词，句子大小写）
- [ ] Storybook stories（全面示例）
- [ ] JSDoc 注释（所有公共 API）
- [ ] Figma Code Connect

### 版本控制
- [ ] 遵循 SemVer 规则
- [ ] MINOR 版本（新功能，向后兼容）
- [ ] V2 组件策略（独立目录）

---

## 注意事项

- [P] 任务 = 不同文件，无依赖
- [Story] 标签将任务映射到特定用户故事以便追溯
- 每个用户故事应该可以独立完成和测试
- 在实现之前验证测试失败（TDD）
- 在每个任务或逻辑组后提交
- 在任何检查点停止以独立验证故事
- Constitution 合规性是非协商的

## 参考

- **Backpack Constitution**: `.specify/memory/constitution.md`
- **架构决策**: `decisions/` 目录
- **组件示例**: `packages/` 目录
- **设计 Tokens**: `@skyscanner/bpk-foundations-web`、`packages/bpk-mixins/`
- **React 工具**: `packages/bpk-react-utils/`
- **测试模式**: 现有组件测试文件
