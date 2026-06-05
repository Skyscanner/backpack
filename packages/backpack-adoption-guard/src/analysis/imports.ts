/*
 * Backpack - Skyscanner's Design System
 *
 * Copyright 2016 Skyscanner Ltd
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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