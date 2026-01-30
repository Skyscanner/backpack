#!/usr/bin/env node
/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 * Licensed under the Apache License, Version 2.0
 *
 * Generate Nx project configuration files for all Backpack packages.
 * This script creates project.json and tsconfig files for each package.
 */

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

const PACKAGES_DIR = path.join(__dirname, '../../packages');
const DRY_RUN = process.argv.includes('--dry-run');

// Special cases that need custom configuration
const SPECIAL_CASES = {
  'bpk-mixins': {
    sourceRoot: 'packages/bpk-mixins', // No /src subdirectory
    skipTsConfig: true, // Sass-only package
  },
  'bpk-stylesheets': {
    targets: {
      build: {
        executor: 'nx:run-commands',
        options: {
          command: 'node build.js',
          cwd: 'packages/bpk-stylesheets',
        },
        outputs: ['{projectRoot}/dist'],
      },
    },
  },
};

function generateProjectJson(pkgName) {
  const special = SPECIAL_CASES[pkgName] || {};

  const config = {
    $schema: '../../node_modules/nx/schemas/project-schema.json',
    name: pkgName,
    projectType: 'library',
    sourceRoot: special.sourceRoot || `packages/${pkgName}/src`,
    tags: ['scope:backpack'],
  };

  if (special.targets) {
    config.targets = special.targets;
  }

  return config;
}

function generateTsConfig() {
  return {
    extends: '../../tsconfig.base.json',
    compilerOptions: {
      outDir: 'dist',
      rootDir: 'src',
    },
    include: ['src/**/*', 'index.ts'],
    exclude: ['node_modules', 'dist'],
    references: [],
  };
}

function generateTsConfigLib() {
  return {
    extends: './tsconfig.json',
    compilerOptions: {
      declaration: true,
      types: ['node'],
    },
    exclude: [
      '**/*-test.ts',
      '**/*-test.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
      '**/*.stories.tsx',
      '**/*.figma.tsx',
    ],
  };
}

function generateTsConfigSpec() {
  return {
    extends: './tsconfig.json',
    compilerOptions: {
      types: ['jest', 'node'],
    },
    include: [
      '**/*-test.ts',
      '**/*-test.tsx',
      '**/*.test.ts',
      '**/*.test.tsx',
    ],
  };
}

function writeJsonFile(filePath, content) {
  if (DRY_RUN) {
    console.log(`[DRY-RUN] Would write: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2).concat('\n'));
}

function main() {
  console.log(DRY_RUN ? '[DRY-RUN MODE]' : '[LIVE MODE]');
  console.log(`Scanning packages in: ${PACKAGES_DIR}\n`);

  const packages = fs
    .readdirSync(PACKAGES_DIR)
    .filter((name) => {
      const pkgPath = path.join(PACKAGES_DIR, name);
      const stat = fs.statSync(pkgPath);
      return stat.isDirectory() && name.startsWith('bpk-');
    })
    .sort();

  console.log(`Found ${packages.length} packages to configure\n`);

  let projectJsonCount = 0;
  let tsConfigCount = 0;
  let skippedTsConfig = 0;

  packages.forEach((pkg) => {
    const pkgDir = path.join(PACKAGES_DIR, pkg);
    const special = SPECIAL_CASES[pkg] || {};

    // Generate project.json
    const projectJsonPath = path.join(pkgDir, 'project.json');
    const projectJson = generateProjectJson(pkg);
    writeJsonFile(projectJsonPath, projectJson);
    projectJsonCount += 1;

    // Generate tsconfig files (unless Sass-only)
    if (!special.skipTsConfig) {
      writeJsonFile(path.join(pkgDir, 'tsconfig.json'), generateTsConfig());
      writeJsonFile(
        path.join(pkgDir, 'tsconfig.lib.json'),
        generateTsConfigLib(),
      );
      writeJsonFile(
        path.join(pkgDir, 'tsconfig.spec.json'),
        generateTsConfigSpec(),
      );
      tsConfigCount += 3;
    } else {
      skippedTsConfig += 1;
    }

    console.log(
      `✓ ${pkg}${special.skipTsConfig ? ' (Sass-only, skipped tsconfig)' : ''}${special.targets ? ' (custom targets)' : ''}`,
    );
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log('Summary:');
  console.log(`  project.json files: ${projectJsonCount}`);
  console.log(`  tsconfig files: ${tsConfigCount} (3 per TypeScript package)`);
  console.log(`  Skipped tsconfig: ${skippedTsConfig} packages (Sass-only)`);
  console.log('='.repeat(50));

  if (!DRY_RUN) {
    console.log('\nNext steps:');
    console.log('1. Run: npx nx show projects | wc -l');
    console.log('2. Run: npx nx graph');
    console.log('3. Run: npm run typecheck');
  }
}

main();
