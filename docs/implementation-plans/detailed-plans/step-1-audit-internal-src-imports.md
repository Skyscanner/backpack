# 步骤 1：审计内部 src 导入

## 目标
识别所有违反模块封装的内部 src 导入，并生成受影响文件的完整列表。

## 为什么需要此步骤
- 了解问题的规模和范围
- 识别哪些组件被错误导入
- 为后续步骤提供数据支持
- 估算工作量

## 详细执行步骤

### 1.1 搜索所有内部 src 导入模式

```bash
# 搜索相对路径导入到 src
grep -r "from ['\"].*\\.\\./.*src/" packages/ --include="*.ts" --include="*.tsx" > audit-results-relative.txt

# 搜索其他可能的导入模式
grep -r "import.*from.*bpk-.*src" packages/ --include="*.ts" --include="*.tsx" > audit-results-package.txt
```

### 1.2 分析结果

创建分析脚本 `analyze-imports.js`：

```javascript
const fs = require('fs');
const path = require('path');

// 读取审计结果
const results = fs.readFileSync('audit-results-relative.txt', 'utf8').split('\n');

// 分析的数据结构
const analysis = {
  totalFiles: new Set(),
  importedComponents: new Map(),
  importedItems: new Map()
};

results.forEach(line => {
  if (!line.trim()) return;

  // 解析文件路径和导入语句
  const [filePath, content] = line.split(':');
  analysis.totalFiles.add(filePath);

  // 提取导入的组件和项
  const match = content.match(/from ['"](.+)['"]/)
  if (match) {
    const importPath = match[1];
    const component = importPath.match(/bpk-component-(\w+)/)?.[1];
    if (component) {
      if (!analysis.importedComponents.has(component)) {
        analysis.importedComponents.set(component, []);
      }
      analysis.importedComponents.get(component).push(filePath);
    }
  }
});

// 生成报告
console.log('## 审计报告\n');
console.log(`受影响文件总数：${analysis.totalFiles.size}\n`);
console.log('### 有内部导入的组件：\n');

analysis.importedComponents.forEach((files, component) => {
  console.log(`- **${component}**：${files.length} 个文件导入`);
});
```

### 1.3 生成详细报告

创建 `audit-report.md`：

```markdown
# 内部 src 导入审计报告

生成时间：[日期]

## 摘要
- 受影响文件总数：[数量]
- 涉及组件数：[数量]
- 需修复的导入语句：[数量]

## 详细列表

### 按被导入组件分类

#### bpk-component-text
- 导入文件数量：X
- 常用导入项：
  - TEXT_STYLES
  - [其他项]
- 需要在 index.ts 中导出的项：[列表]

#### bpk-component-[name]
...

### 按导入文件分类

#### packages/xxx/src/file.tsx
- 导入来源：[组件名称]
- 导入项：[列表]
- 修复建议：[具体建议]
```

### 1.4 评估优先级

根据审计结果，按以下标准确定优先级：

1. **高优先级**：
   - 被多个文件导入的组件
   - 公共常量/类型导入
   - 核心组件

2. **中优先级**：
   - 被 2-5 个文件导入的组件
   - 工具函数/辅助类型

3. **低优先级**：
   - 单个文件导入
   - 测试文件中的导入

## 输出产物

- [ ] `audit-results-relative.txt` - 原始搜索结果
- [ ] `audit-results-package.txt` - 额外搜索结果
- [ ] `audit-report.md` - 结构化报告
- [ ] `priority-list.md` - 优先级列表
- [ ] Excel/CSV 表格（可选）包含所有数据

## 验证清单

- [ ] 所有可能的导入模式已搜索
- [ ] 所有受影响组件已识别
- [ ] 所有受影响文件已统计
- [ ] 完整审计报告已生成
- [ ] 修复优先级已评估
- [ ] 审计结果已与团队分享

## 预计时间

- 搜索和数据收集：30 分钟
- 分析和生成报告：1-2 小时
- 团队评审：30 分钟

## 常见问题

**Q：测试文件需要检查吗？**
A：是的，测试文件也应遵循模块封装原则。

**Q：node_modules 需要检查吗？**
A：不需要，只检查 packages/ 目录下的源代码。

**Q：类型导入如何处理？**
A：类型导入也应通过公共入口点，确保类型被正确导出。

## 下一步

完成审计后，使用报告数据进入步骤 2：为组件添加导出
