# 规格质量检查清单：BpkInput V2 (Flexible Composable API)

**目的**: 在进入计划阶段前验证规格的完整性和质量
**创建时间**: 2026-01-29
**更新时间**: 2026-01-29
**功能**: [spec.md](../spec.md)

## 内容质量

- [x] 无实现细节（语言、框架、API）
- [x] 专注于用户价值和业务需求
- [x] 为非技术利益相关者编写
- [x] 所有必填部分已完成

## 需求完整性

- [x] 没有 [NEEDS CLARIFICATION] 标记
- [x] 需求可测试且明确
- [x] 成功标准可衡量
- [x] 成功标准与技术无关（无实现细节）
- [x] 所有验收场景已定义
- [x] 已识别边界情况
- [x] 范围界限清晰
- [x] 已识别依赖和假设

## 功能就绪性

- [x] 所有功能需求都有明确的验收标准
- [x] 用户场景涵盖主要流程
- [x] 功能满足成功标准中定义的可衡量结果
- [x] 规格中没有泄露实现细节

## 注意事项

**设计变更说明**:

本 spec 已完全重写，从固定的 StartElement/EndElement 设计变更为灵活的 composable API：

**旧设计** (已废弃):
- 明确的 StartElement 和 EndElement 组件
- 固定的位置角色

**新设计** (当前 - 2026-01-29):
- 只有一种 `InputAdornment` 组件（不区分 start/end），主要用于放置图标或文字
- 可以灵活组合任意数量的 InputAdornment 和 Input
- Root 上定义 `gap` 属性控制间隔
- InputAdornment 归属逻辑自动判断
- 支持 docked input group 场景

**关键决策**:

1. **命名规范** (2026-01-29):
   - 组件名：`InputAdornment`（替代 Element）
   - 主要用途：放置图标（icon）或文字
   - Props 类型：`BpkInputProps`（Input 组件的 props，替代 BpkInputInputProps）
   - 使用语法：`<BpkInput.InputAdornment>icon/text</BpkInput.InputAdornment>`

2. **InputAdornment 归属逻辑**:
   - InputAdornment 在 Input 前 → start
   - InputAdornment 在 Input 后 → end
   - 多个连续 InputAdornment → 归属于最近的 Input
   - 实现方式：React Children API 遍历

3. **Gap 控制** (更新 - 2026-01-30):
   - 通过 Root 的 `gap` 属性统一控制
   - **设计变更**: 从绝对定位改为 Flexbox 布局
   - gap 直接作为 flexbox 的 gap 属性使用
   - 不需要动态计算 text-indent 和 padding
   - InputAdornment、Input 作为同级 flex 子元素
   - input-container 有统一的边框（而非 Input 元素）
   - 焦点和验证状态样式应用在 container 上

4. **Docked Input Group 支持** (更新 - 2026-01-29):
   - Root 可以包含多个 Input
   - **移除手动 docked props**（dockedFirst/Middle/Last）
   - 边框样式自动检测：
     - 单个 Input：普通边框（四角圆角）
     - 2 个 Input：第一个（左圆角+右平边），最后一个（左平边+右圆角）
     - 3+ 个 Input：第一个（左圆角+右平边），中间（两侧平边），最后（左平边+右圆角）
   - InputAdornment 归属于相邻的 Input，不影响其他 Input

5. **版本策略**:
   - 新组件放在独立的 BpkInputV2 文件夹
   - 原有 BpkInput 保持不变
   - 不是 breaking change，用户可选择迁移

6. **Large 属性提升** (更新 - 2026-01-29):
   - large 属性从 Input 移至 Root 层级
   - Root 的 large 属性应用于所有子 Input 和 InputAdornment
   - 确保整个 Input group 尺寸一致

7. **验证图标实现方式** (更新 - 2026-01-29):
   - valid/invalid 图标使用 InputAdornment 实现
   - 不使用原有的 CSS 背景图片方式
   - 清除按钮也使用 InputAdornment 实现
   - 系统自动插入的 InputAdornment 与用户提供的共存

8. **代码质量标准** (更新 - 2026-01-29):
   - 必须通过 ESLint 检查，无错误或警告
   - 必须通过 Stylelint 检查，无错误或警告
   - 必须通过 TypeScript 类型检查，无编译错误

9. **响应式文本溢出处理** (更新 - 2026-01-29):
   - 小尺寸设备上文本溢出使用 ellipsis 截断
   - 使用 `text-overflow: ellipsis` 和 `overflow: hidden`
   - 确保文本不会换行或造成布局问题

**状态**: ✅ 所有检查项已通过，新设计的规格已就绪

**下一步**: 可以使用 `/speckit.plan` 生成实现计划
