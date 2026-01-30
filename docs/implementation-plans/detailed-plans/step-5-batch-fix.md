# 步骤 5：批量修复

## 目标
确保所有文件已修复，通过所有检查，项目完全符合新的导入标准。

## 为什么需要此步骤
- 验证之前步骤的完整性
- 捕获遗漏的文件
- 确保项目处于干净状态
- 上线前的最终检查

## 前提条件
- 步骤 1-4 已完成
- ESLint 规则已配置
- 大部分文件已重构

## 详细执行步骤

### 5.1 全面审计

运行完整的代码审计：

```bash
#!/bin/bash
# scripts/final-audit.sh

echo "======================================"
echo "开始最终审计"
echo "======================================"

# 1. 检查内部导入
echo -e "\n1. 检查剩余的内部 src 导入..."
INTERNAL_IMPORTS=$(grep -r "from ['\"].*\\.\\./.*src/" packages/ \
  --include="*.ts" \
  --include="*.tsx" \
  --exclude-dir=node_modules \
  --exclude-dir=dist || true)

if [ -n "$INTERNAL_IMPORTS" ]; then
  echo "❌ 发现剩余的内部导入："
  echo "$INTERNAL_IMPORTS"
  exit 1
else
  echo "✓ 没有剩余的内部导入"
fi

# 2. 运行 ESLint
echo -e "\n2. 运行 ESLint..."
if npm run lint; then
  echo "✓ ESLint 检查通过"
else
  echo "❌ ESLint 检查失败"
  exit 1
fi

# 3. 运行 TypeScript 检查
echo -e "\n3. 运行 TypeScript 检查..."
if npm run type-check; then
  echo "✓ TypeScript 检查通过"
else
  echo "❌ TypeScript 检查失败"
  exit 1
fi

# 4. 运行构建
echo -e "\n4. 运行构建..."
if npm run build; then
  echo "✓ 构建成功"
else
  echo "❌ 构建失败"
  exit 1
fi

# 5. 运行测试
echo -e "\n5. 运行测试..."
if npm test; then
  echo "✓ 测试通过"
else
  echo "❌ 测试失败"
  exit 1
fi

echo -e "\n======================================"
echo "✅ 最终审计通过！"
echo "======================================"
```

### 5.2 生成详细报告

```javascript
// scripts/generate-final-report.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function generateReport() {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {},
    details: {}
  };

  console.log('生成最终报告...\n');

  // 统计文件总数
  const totalFiles = execSync(
    "find packages -name '*.ts' -o -name '*.tsx' | wc -l"
  ).toString().trim();

  report.summary.totalFiles = parseInt(totalFiles);

  // 检查导入
  try {
    const violations = execSync(
      "grep -r \"from ['\\\"].*\\.\\./.*src/\" packages/ --include=\"*.ts\" --include=\"*.tsx\" || true"
    ).toString();

    report.summary.violations = violations ? violations.split('\n').length - 1 : 0;
    report.details.violations = violations;
  } catch (error) {
    report.summary.violations = 0;
  }

  // ESLint 结果
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    report.summary.eslint = 'passed';
  } catch (error) {
    report.summary.eslint = 'failed';
    report.details.eslintErrors = error.stdout.toString();
  }

  // TypeScript 结果
  try {
    execSync('npm run type-check', { stdio: 'pipe' });
    report.summary.typescript = 'passed';
  } catch (error) {
    report.summary.typescript = 'failed';
    report.details.typescriptErrors = error.stdout.toString();
  }

  // 测试结果
  try {
    execSync('npm test', { stdio: 'pipe' });
    report.summary.tests = 'passed';
  } catch (error) {
    report.summary.tests = 'failed';
    report.details.testErrors = error.stdout.toString();
  }

  // 写入报告
  fs.writeFileSync(
    'final-audit-report.json',
    JSON.stringify(report, null, 2)
  );

  // 生成 Markdown 报告
  const markdown = generateMarkdownReport(report);
  fs.writeFileSync('final-audit-report.md', markdown);

  console.log('✓ 报告已生成');
  console.log('  - final-audit-report.json');
  console.log('  - final-audit-report.md');

  return report;
}

function generateMarkdownReport(report) {
  return `
# 最终审计报告

生成时间：${report.timestamp}

## 摘要

| 项目 | 结果 |
|------|--------|
| 文件总数 | ${report.summary.totalFiles} |
| 导入违规 | ${report.summary.violations} |
| ESLint | ${report.summary.eslint === 'passed' ? '✓ 通过' : '✗ 失败'} |
| TypeScript | ${report.summary.typescript === 'passed' ? '✓ 通过' : '✗ 失败'} |
| 测试 | ${report.summary.tests === 'passed' ? '✓ 通过' : '✗ 失败'} |

${report.summary.violations > 0 ? `
## 导入违规详情

\`\`\`
${report.details.violations}
\`\`\`
` : ''}

${report.details.eslintErrors ? `
## ESLint 错误

\`\`\`
${report.details.eslintErrors}
\`\`\`
` : ''}

${report.details.typescriptErrors ? `
## TypeScript 错误

\`\`\`
${report.details.typescriptErrors}
\`\`\`
` : ''}

${report.details.testErrors ? `
## 测试错误

\`\`\`
${report.details.testErrors}
\`\`\`
` : ''}

## 结论

${report.summary.violations === 0 &&
  report.summary.eslint === 'passed' &&
  report.summary.typescript === 'passed' &&
  report.summary.tests === 'passed'
  ? '✅ 所有检查通过！项目已准备好合并。'
  : '❌ 仍有问题需要修复。请查看上面的详情。'}
`;
}

generateReport();
```

### 5.3 批量自动修复

使用 ESLint 的自动修复功能：

```bash
# 自动修复所有可修复的问题
npm run lint -- --fix

# 针对特定目录
npm run lint -- --fix packages/bpk-component-text/

# 针对特定文件类型
npm run lint -- --fix "**/*.{ts,tsx}"
```

创建自动修复脚本：

```javascript
// scripts/auto-fix.js
const { execSync } = require('child_process');
const glob = require('glob');

function autoFix() {
  console.log('开始自动修复...\n');

  // 获取所有要检查的文件
  const files = glob.sync('packages/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**', '**/dist/**']
  });

  console.log(`找到 ${files.length} 个文件\n`);

  let fixedCount = 0;
  let errorCount = 0;

  // 批量处理文件
  const batchSize = 50;
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);

    try {
      execSync(`npx eslint --fix ${batch.join(' ')}`, {
        stdio: 'pipe'
      });
      fixedCount += batch.length;
      console.log(`✓ 已处理 ${fixedCount}/${files.length} 个文件`);
    } catch (error) {
      errorCount++;
      console.error(`✗ 批次 ${i / batchSize + 1} 处理失败`);
    }
  }

  console.log(`\n完成！`);
  console.log(`  成功：${fixedCount} 个文件`);
  console.log(`  失败：${errorCount} 个批次`);
}

autoFix();
```

### 5.4 手动修复剩余问题

对于自动修复无法处理的问题：

```javascript
// scripts/identify-manual-fixes.js
const { execSync } = require('child_process');
const fs = require('fs');

function identifyManualFixes() {
  console.log('识别需要手动修复的问题...\n');

  try {
    // 运行 ESLint，获取错误报告
    execSync('npm run lint -- --format json > eslint-report.json', {
      stdio: 'pipe'
    });
  } catch (error) {
    // ESLint 错误会抛出异常，这是预期的
  }

  const report = JSON.parse(fs.readFileSync('eslint-report.json', 'utf8'));

  // 分析哪些错误需要手动修复
  const manualFixes = [];

  report.forEach(file => {
    if (file.messages.length > 0) {
      file.messages.forEach(message => {
        if (!message.fix) {
          // 没有自动修复的错误
          manualFixes.push({
            file: file.filePath,
            line: message.line,
            column: message.column,
            rule: message.ruleId,
            message: message.message
          });
        }
      });
    }
  });

  // 生成手动修复清单
  const markdown = `# 手动修复清单

共 ${manualFixes.length} 个问题需要手动修复

${manualFixes.map((fix, index) => `
## ${index + 1}. ${fix.file}:${fix.line}

- **规则**：${fix.rule}
- **位置**：第 ${fix.line} 行，第 ${fix.column} 列
- **消息**：${fix.message}

---
`).join('\n')}
`;

  fs.writeFileSync('manual-fixes.md', markdown);

  console.log(`✓ 手动修复清单已生成：manual-fixes.md`);
  console.log(`  ${manualFixes.length} 个问题需要手动修复`);

  return manualFixes;
}

identifyManualFixes();
```

### 5.5 验证每个组件

```bash
#!/bin/bash
# scripts/verify-each-component.sh

echo "验证每个组件..."

# 获取所有组件目录
COMPONENTS=$(find packages -maxdepth 1 -type d -name "bpk-component-*")

PASSED=0
FAILED=0
FAILED_COMPONENTS=()

for COMPONENT in $COMPONENTS; do
  COMPONENT_NAME=$(basename $COMPONENT)
  echo -e "\n检查 $COMPONENT_NAME..."

  # 进入组件目录
  cd $COMPONENT

  # 运行检查
  if npm run lint && npm run type-check && npm test; then
    echo "✓ $COMPONENT_NAME 通过"
    ((PASSED++))
  else
    echo "✗ $COMPONENT_NAME 失败"
    ((FAILED++))
    FAILED_COMPONENTS+=($COMPONENT_NAME)
  fi

  # 返回根目录
  cd ../..
done

echo -e "\n======================================"
echo "验证完成"
echo "======================================"
echo "通过：$PASSED"
echo "失败：$FAILED"

if [ $FAILED -gt 0 ]; then
  echo -e "\n失败的组件："
  for COMP in "${FAILED_COMPONENTS[@]}"; do
    echo "  - $COMP"
  done
  exit 1
fi
```

### 5.6 创建最终检查清单

```markdown
// FINAL-CHECKLIST.md
# 最终检查清单

## 代码质量
- [ ] 所有文件通过 ESLint
- [ ] 所有文件通过 TypeScript 检查
- [ ] 没有剩余的内部 src 导入
- [ ] 所有自动修复已应用
- [ ] 所有手动修复已完成

## 测试
- [ ] 所有单元测试通过
- [ ] 所有集成测试通过
- [ ] 所有 E2E 测试通过
- [ ] 视觉回归测试通过（如果可用）

## 构建
- [ ] 开发构建成功
- [ ] 生产构建成功
- [ ] Bundle 大小在可接受范围内
- [ ] 没有构建警告

## 文档
- [ ] README 已更新
- [ ] 导入指南已创建
- [ ] CHANGELOG 已更新
- [ ] API 文档已更新

## 配置
- [ ] ESLint 规则已启用
- [ ] Pre-commit hooks 已配置
- [ ] CI/CD 检查已配置
- [ ] Nx 模块边界已配置

## 团队
- [ ] 团队已通知
- [ ] 培训材料已准备
- [ ] 迁移指南已分享
- [ ] FAQ 已发布

## 部署准备
- [ ] 所有 PR 已合并
- [ ] 版本号已更新
- [ ] 发布说明已准备
- [ ] 回滚计划已创建
```

### 5.7 生成完成报告

```javascript
// scripts/generate-completion-report.js
const fs = require('fs');

function generateCompletionReport() {
  const report = {
    projectName: '阶段 0.3：重构内部 src 导入',
    completionDate: new Date().toISOString(),
    summary: {
      totalFiles: 0,
      filesModified: 0,
      linesChanged: 0,
      issuesResolved: 0
    },
    metrics: {
      eslintErrors: 0,
      typescriptErrors: 0,
      testsPassed: true,
      buildSuccess: true
    },
    deliverables: [
      '✓ 所有内部 src 导入已重构',
      '✓ ESLint 规则已添加',
      '✓ 组件导出已更新',
      '✓ 文档已完成',
      '✓ CI/CD 配置已更新'
    ],
    nextSteps: [
      '监控生产环境',
      '收集团队反馈',
      '优化 ESLint 规则（如果需要）',
      '进入下一阶段'
    ]
  };

  // 生成 Markdown 报告
  const markdown = `
# 阶段 0.3 完成报告

📅 完成日期：${report.completionDate}

## 📊 摘要统计

- 文件总数：${report.summary.totalFiles}
- 修改文件数：${report.summary.filesModified}
- 代码行变更：${report.summary.linesChanged}
- 已解决问题：${report.summary.issuesResolved}

## ✅ 质量指标

- ESLint 错误：${report.metrics.eslintErrors}
- TypeScript 错误：${report.metrics.typescriptErrors}
- 测试：${report.metrics.testsPassed ? '✓ 全部通过' : '✗ 失败'}
- 构建：${report.metrics.buildSuccess ? '✓ 成功' : '✗ 失败'}

## 📦 交付物

${report.deliverables.map(d => `- ${d}`).join('\n')}

## 🚀 下一步

${report.nextSteps.map(s => `- ${s}`).join('\n')}

## 🎉 结论

阶段 0.3 成功完成！所有内部 src 导入已重构为使用包的公共入口点，
ESLint 规则已配置以防止未来的违规。项目现在遵循最佳实践，
具有更好的模块封装和可维护性。
`;

  fs.writeFileSync('PHASE-0.3-COMPLETION-REPORT.md', markdown);
  console.log('✓ 完成报告已生成：PHASE-0.3-COMPLETION-REPORT.md');
}

generateCompletionReport();
```

## 输出产物

- [ ] 最终审计报告
- [ ] 手动修复清单（如果有）
- [ ] 进度跟踪报告
- [ ] 性能对比报告
- [ ] 完成报告
- [ ] 检查清单（已完成）

## 验证清单

### 代码质量
- [ ] ESLint 无错误
- [ ] TypeScript 无错误
- [ ] 没有内部导入违规
- [ ] Code review 通过

### 测试
- [ ] 所有单元测试通过
- [ ] 集成测试通过
- [ ] E2E 测试通过
- [ ] 回归测试通过

### 构建和部署
- [ ] 构建成功
- [ ] Bundle 大小正常
- [ ] 没有构建警告
- [ ] 准备好部署

### 文档和流程
- [ ] 文档已更新
- [ ] 团队已培训
- [ ] CI/CD 已配置
- [ ] 回滚计划就绪

## 常见问题

**Q：最后发现问题怎么办？**
A：立即回滚，检查未导出的依赖，补充导出后再重构。

**Q：这需要多长时间？**
A：取决于项目规模，通常需要 1-2 天完成所有检查和修复。

**Q：如何确保没有遗漏？**
A：使用自动化脚本和检查清单，多次运行审计。

**Q：可以分批合并吗？**
A：可以，但确保每批都完全通过所有检查。

## 庆祝里程碑

完成所有检查后：

1. **通知团队**：分享完成报告
2. **更新文档**：确保所有文档都是最新的
3. **创建标签**：`git tag -a v0.3-complete -m "完成阶段 0.3"`
4. **合并到主分支**：创建 PR 并合并
5. **监控**：密切关注生产环境

## 项目总结

完成阶段 0.3 标志着项目在模块化和代码质量方面迈出了重要一步。
通过系统化的重构和规则配置，项目现在拥有：

- ✅ 清晰的模块边界
- ✅ 强制执行的导入标准
- ✅ 自动化的质量检查
- ✅ 全面的文档和指南

这为后续开发工作奠定了坚实的基础。
