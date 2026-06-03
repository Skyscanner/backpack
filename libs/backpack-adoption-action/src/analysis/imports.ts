import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

import ts from "typescript";

import {
  isBackpackComponent,
  isNonVisualReactComponentName,
} from "./jsx";

export type CssModuleImport = {
  modulePath: string;
  filePath: string;
};

const isDesignSystemImport = (source: string) =>
  source.startsWith("@skyscanner/backpack-web");

const isCssModuleImport = (source: string) =>
  /\.(module\.)?(css|scss|sass|less)$/.test(source);

const resolveCssModulePath = (
  modulePath: string,
  sourceFilePath: string,
) => {
  const resolved = resolve(dirname(sourceFilePath), modulePath);
  const extensions = ["", ".css", ".scss", ".sass", ".less"];

  for (const extension of extensions) {
    const candidate = `${resolved}${extension}`;
    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return existsSync(resolved) ? resolved : null;
};

export const collectImports = (
  sourceFile: ts.SourceFile,
  filePath: string,
  importedComponents: Set<string>,
  namespaceImports: Set<string>,
  cssModuleImports: Map<string, CssModuleImport>,
  nonVisualImports: Set<string>,
) => {
  sourceFile.statements.forEach((statement) => {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier)
    ) {
      return;
    }

    const source = statement.moduleSpecifier.text;
    const importClause = statement.importClause;

    if (!importClause) {
      return;
    }

    if (isDesignSystemImport(source)) {
      if (importClause.name) {
        importedComponents.add(importClause.name.text);
      }

      const namedBindings = importClause.namedBindings;
      if (namedBindings && ts.isNamespaceImport(namedBindings)) {
        namespaceImports.add(namedBindings.name.text);
      } else if (namedBindings && ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          const importedName = element.propertyName?.text || element.name.text;
          const localName = element.name.text;
          if (
            isBackpackComponent(importedName) ||
            isBackpackComponent(localName)
          ) {
            importedComponents.add(localName);
          }
        });
      }
    }

    if (isCssModuleImport(source) && importClause.name) {
      const resolvedPath = resolveCssModulePath(source, filePath);
      if (resolvedPath) {
        cssModuleImports.set(importClause.name.text, {
          modulePath: source,
          filePath: resolvedPath,
        });
      }
    }

    if (source === "react" || source === "react-dom") {
      const namedBindings = importClause.namedBindings;
      if (namedBindings && ts.isNamedImports(namedBindings)) {
        namedBindings.elements.forEach((element) => {
          const importedName = element.propertyName?.text || element.name.text;
          if (isNonVisualReactComponentName(importedName)) {
            nonVisualImports.add(element.name.text);
          }
        });
      }
    }
  });
};
