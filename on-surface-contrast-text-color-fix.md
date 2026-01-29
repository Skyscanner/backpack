# On Surface Contrast 文字颜色修复

## 问题发现

根据Figma规范，**On Surface Contrast variant**的文字在所有状态下都应该是**白色**（`#FFF` / `Text-On-Dark`），因为：
- 它被设计为在深色背景上使用
- 背景色是半透明白色 `rgba(255,255,255,0.1)`
- 需要在深色背景上有良好的对比度

## Figma规范

### On Surface Contrast 所有状态的文字样式：

| 状态 | 背景色 | 文字颜色 |
|------|--------|----------|
| **Default** | `rgba(255,255,255,0.1)` | `#FFF` (Text-On-Dark) ✅ |
| **Hover** | `#04182D` | `#FFF` (Text-On-Dark) ✅ |
| **Selected** | `#0062E3` (accent blue) | `#FFF` (Text-On-Dark) ✅ |

### 文字属性（所有状态相同）：
```css
color: var(--Text-On-Dark, #FFF);
text-align: center;
font-family: var(--Typography-Family-Sans-Serif, "Skyscanner Relative");
font-size: var(--Size-base, 1rem);
font-weight: var(--Typography-Style-Headline, 700);
line-height: 125%; /* 1.25rem */
letter-spacing: var(--Typography-Kerning-Loose, 0);
```

## 修复前的问题

### ❌ 错误实现：

```scss
// Label和Price使用默认颜色
&__label {
  color: tokens.$bpk-text-primary-day; // ❌ 深色文字 #161616
}

&__price {
  color: tokens.$bpk-text-primary-day; // ❌ 深色文字 #161616
}

// 只有在checked状态才变白色
&--checked {
  .bpk-checkbox-card__label,
  .bpk-checkbox-card__price {
    color: tokens.$bpk-text-on-dark-day; // ✅ 白色
  }
}
```

**结果**：
- Default和Hover状态：深色文字在半透明白色背景上 → ❌ 对比度差，看不清
- Selected状态：白色文字 → ✅ 正确

## 修复后的实现

### ✅ 正确实现：

```scss
// On Surface Contrast variant
&--on-surface-contrast {
  background-color: tokens.$bpk-surface-tint-day; // rgba(255,255,255,0.1)
  border: none;

  // ✅ 所有状态下都使用白色文字
  .bpk-checkbox-card__label,
  .bpk-checkbox-card__description,
  .bpk-checkbox-card__price {
    color: tokens.$bpk-text-on-dark-day; // White text per Figma
  }

  .bpk-checkbox-card__icon {
    color: tokens.$bpk-text-on-dark-day; // White icon per Figma
  }

  // Hover state
  &:not(.bpk-checkbox-card--disabled):not(.bpk-checkbox-card--checked) {
    @include utils.bpk-hover {
      background-color: tokens.$bpk-private-button-secondary-on-dark-pressed-background-day;
    }
  }
}
```

## CSS优先级说明

### 为什么要在`&--on-surface-contrast`内部设置文字颜色？

CSS的优先级规则：

```scss
// 低优先级：通用规则
.bpk-checkbox-card__label {
  color: tokens.$bpk-text-primary-day; // 深色
}

// 高优先级：variant特定规则
.bpk-checkbox-card--on-surface-contrast .bpk-checkbox-card__label {
  color: tokens.$bpk-text-on-dark-day; // 白色 ✅ 这个会覆盖上面的
}

// 最高优先级：checked状态
.bpk-checkbox-card--checked .bpk-checkbox-card__label {
  color: tokens.$bpk-text-on-dark-day; // 白色
}
```

对于On Surface Contrast：
- Default状态：使用variant规则（白色）✅
- Hover状态：使用variant规则（白色）✅
- Selected状态：使用checked规则（白色）✅

## 对比总结

### Canvas Variants (onCanvasDefault, onCanvasContrast)

| 状态 | 背景色 | 文字颜色 |
|------|--------|----------|
| Default | 白色 | 深色 `#161616` |
| Hover | 白色/浅灰 | 深色 `#161616` |
| Selected | 深蓝 `#05203C` | 白色 `#FFF` |

### Surface Contrast Variant (onSurfaceContrast)

| 状态 | 背景色 | 文字颜色 |
|------|--------|----------|
| Default | 半透明白色 `rgba(255,255,255,0.1)` | 白色 `#FFF` ✅ |
| Hover | 深蓝 `#04182D` | 白色 `#FFF` ✅ |
| Selected | 蓝色 `#0062E3` | 白色 `#FFF` ✅ |

## 完整的Typography规范对比

| 属性 | Figma | 修复后实现 | 状态 |
|------|-------|-----------|------|
| **font-size** | `1rem` | `1rem` | ✅ |
| **font-weight** | `700` | `700` | ✅ |
| **line-height** | `125%` (1.25) | `1.25` | ✅ |
| **letter-spacing** | `0` | `0` | ✅ |
| **text-align** | `center` | `center` | ✅ |
| **color (On Surface Contrast Default)** | `#FFF` | `#FFF` | ✅ **已修复** |
| **color (On Surface Contrast Hover)** | `#FFF` | `#FFF` | ✅ **已修复** |
| **color (On Surface Contrast Selected)** | `#FFF` | `#FFF` | ✅ 之前就正确 |

## 验证步骤

1. 等待Storybook重新编译
2. 访问 http://localhost:9002
3. 导航到 `bpk-component-checkbox-card` → `On Surface Contrast`
4. 检查深色背景上的卡片：
   - ✅ Default状态：白色文字（之前是深色，现在修复为白色）
   - ✅ Hover状态：白色文字（之前是深色，现在修复为白色）
   - ✅ Selected状态：白色文字（之前已正确）

## 关键要点

**On Surface Contrast是特殊的**：
- 它是唯一一个设计为在深色背景上使用的variant
- 它的文字在所有状态下都必须是白色
- Canvas variants的文字只在selected状态才是白色

这个修复确保了On Surface Contrast variant在所有状态下都有正确的对比度和可读性！
