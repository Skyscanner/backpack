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
// Verbatim port of buildVisualComponentRegistry / checkBodyForVisualJSX from
// Skyscanner/ds-analyser src/analyzer.js.
import { readFileSync } from "node:fs";

import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";

import {
  PARSER_PLUGINS,
  getJSXElementName,
  isBackpackComponent,
  isRawHTMLElement,
} from "./jsx-helpers";

const traverse = (
  (_traverse as unknown as { default?: typeof _traverse }).default ?? _traverse
) as typeof _traverse;

function checkBodyForVisualJSX(
  path: any,
  componentName: string,
  visualComponents: Set<string>,
): void {
  let bodyPath: any;
  if (path.isFunctionDeclaration()) {
    bodyPath = path.get("body");
  } else if (path.isVariableDeclarator()) {
    const init = path.get("init");
    if (init.isArrowFunctionExpression() || init.isFunctionExpression()) {
      bodyPath = init.get("body");
    } else if (init.isCallExpression()) {
      for (const arg of init.get("arguments")) {
        if (arg.isArrowFunctionExpression() || arg.isFunctionExpression()) {
          bodyPath = arg.get("body");
          break;
        }
      }
    }
  }
  if (!bodyPath) return;

  let hasVisualJSX = false;
  bodyPath.traverse({
    FunctionDeclaration(p: any) {
      p.skip();
    },
    FunctionExpression(p: any) {
      p.skip();
    },
    ArrowFunctionExpression(p: any) {
      p.skip();
    },
    ClassDeclaration(p: any) {
      p.skip();
    },
    ClassExpression(p: any) {
      p.skip();
    },
    JSXOpeningElement(innerPath: any) {
      const name = getJSXElementName(innerPath.node.name);
      if (name && (isRawHTMLElement(name) || isBackpackComponent(name))) {
        hasVisualJSX = true;
        innerPath.stop();
      }
    },
  });
  if (hasVisualJSX) {
    visualComponents.add(componentName);
  }
}

export function buildVisualComponentRegistry(files: string[]): Set<string> {
  const visualComponents = new Set<string>();

  for (const filePath of files) {
    try {
      const content = readFileSync(filePath, "utf-8");
      const ast = parse(content, {
        sourceType: "module",
        plugins: PARSER_PLUGINS as any,
      });

      traverse(ast, {
        FunctionDeclaration(path: any) {
          const name = path.node.id?.name;
          if (name && /^[A-Z]/.test(name)) {
            checkBodyForVisualJSX(path, name, visualComponents);
          }
        },
        VariableDeclarator(path: any) {
          const name = path.node.id?.name;
          if (!name || !/^[A-Z]/.test(name)) return;

          const init = path.node.init;
          if (!init) return;

          if (
            init.type === "ArrowFunctionExpression" ||
            init.type === "FunctionExpression"
          ) {
            checkBodyForVisualJSX(path, name, visualComponents);
          }
          if (init.type === "CallExpression") {
            const callee = init.callee;
            const isForwardRef =
              (callee.type === "MemberExpression" &&
                callee.property?.name === "forwardRef") ||
              (callee.type === "Identifier" && callee.name === "forwardRef");
            if (isForwardRef) {
              checkBodyForVisualJSX(path, name, visualComponents);
            }
          }
        },
      });
    } catch {
      // Skip files that fail to parse.
    }
  }

  return visualComponents;
}
