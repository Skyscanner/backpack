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
import { readFileSync } from "node:fs";

import _traverse from "@babel/traverse";
import type { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

import {
  expressionName,
  isBackpackComponent,
  isRawHtmlElement,
  parseSourceFile,
  tagNameText,
} from "./jsx";

const traverse = (
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse
) as typeof _traverse;

const containsVisualJsx = (
  fnPath: NodePath<
    | t.FunctionDeclaration
    | t.FunctionExpression
    | t.ArrowFunctionExpression
  >,
): boolean => {
  let found = false;

  fnPath.traverse({
    Function(innerPath) {
      if (innerPath.node !== fnPath.node) {
        innerPath.skip();
      }
    },
    ClassDeclaration(innerPath) {
      innerPath.skip();
    },
    ClassExpression(innerPath) {
      innerPath.skip();
    },
    JSXOpeningElement(innerPath) {
      const name = tagNameText(innerPath.node.name);
      if (isRawHtmlElement(name) || isBackpackComponent(name)) {
        found = true;
        innerPath.stop();
      }
    },
  });

  return found;
};

export const buildVisualComponentRegistry = (files: string[]) => {
  const registry = new Set<string>();

  files.forEach((filePath) => {
    try {
      const content = readFileSync(filePath, "utf8");
      const ast = parseSourceFile(content);

      traverse(ast, {
        FunctionDeclaration(path) {
          const id = path.node.id;
          if (!id || !/^[A-Z]/.test(id.name)) {
            return;
          }
          if (containsVisualJsx(path)) {
            registry.add(id.name);
          }
        },
        VariableDeclarator(path) {
          const id = path.node.id;
          if (!t.isIdentifier(id) || !/^[A-Z]/.test(id.name)) {
            return;
          }

          const init = path.node.init;
          if (!init) {
            return;
          }

          if (
            t.isArrowFunctionExpression(init) ||
            t.isFunctionExpression(init)
          ) {
            const initPath = path.get("init") as NodePath<
              t.ArrowFunctionExpression | t.FunctionExpression
            >;
            if (containsVisualJsx(initPath)) {
              registry.add(id.name);
            }
            return;
          }

          if (t.isCallExpression(init)) {
            const callee = init.callee;
            const fnName = t.isExpression(callee) ? expressionName(callee) : null;
            const isForwardRef = fnName === "forwardRef";
            if (!isForwardRef) {
              return;
            }

            const callbackIndex = init.arguments.findIndex(
              (arg) => t.isArrowFunctionExpression(arg) || t.isFunctionExpression(arg),
            );
            if (callbackIndex === -1) {
              return;
            }

            const callbackPath = path.get(
              `init.arguments.${callbackIndex}`,
            ) as NodePath<t.ArrowFunctionExpression | t.FunctionExpression>;
            if (containsVisualJsx(callbackPath)) {
              registry.add(id.name);
            }
          }
        },
      });
    } catch {
      // Parse errors are recorded during the main analysis pass.
    }
  });

  return registry;
};