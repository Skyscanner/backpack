import type { File } from "@babel/types";
import * as t from "@babel/types";

import {
  isBackpackComponent,
  isNonVisualReactComponentName,
} from "./jsx";

const isDesignSystemImport = (source: string) =>
  source.startsWith("@skyscanner/backpack-web");

export const collectImports = (
  ast: File,
  importedComponents: Set<string>,
  namespaceImports: Set<string>,
  nonVisualImports: Set<string>,
) => {
  ast.program.body.forEach((statement: t.Statement | t.ModuleDeclaration) => {
    if (!t.isImportDeclaration(statement)) {
      return;
    }

    const source = statement.source.value;
    const specifiers = statement.specifiers;

    if (isDesignSystemImport(source)) {
      specifiers.forEach((specifier) => {
        if (t.isImportDefaultSpecifier(specifier)) {
          importedComponents.add(specifier.local.name);
          return;
        }

        if (t.isImportNamespaceSpecifier(specifier)) {
          namespaceImports.add(specifier.local.name);
          return;
        }

        if (t.isImportSpecifier(specifier)) {
          const importedName = t.isIdentifier(specifier.imported)
            ? specifier.imported.name
            : specifier.imported.value;
          const localName = specifier.local.name;
          if (
            isBackpackComponent(importedName) ||
            isBackpackComponent(localName)
          ) {
            importedComponents.add(localName);
          }
        }
      });
    }

    if (source === "react" || source === "react-dom") {
      specifiers.forEach((specifier) => {
        if (!t.isImportSpecifier(specifier)) {
          return;
        }
        const importedName = t.isIdentifier(specifier.imported)
          ? specifier.imported.name
          : specifier.imported.value;
        if (isNonVisualReactComponentName(importedName)) {
          nonVisualImports.add(specifier.local.name);
        }
      });
    }
  });
};
