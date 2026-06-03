import { readFileSync } from "node:fs";

import ts from "typescript";

import {
  expressionName,
  isBackpackComponent,
  isRawHtmlElement,
  sourceFileFor,
  tagNameText,
} from "./jsx";

const hasVisualJsx = (node: ts.Node): boolean => {
  let found = false;

  const visit = (child: ts.Node) => {
    if (found) {
      return;
    }

    if (
      child !== node &&
      (ts.isFunctionDeclaration(child) ||
        ts.isFunctionExpression(child) ||
        ts.isArrowFunction(child) ||
        ts.isClassDeclaration(child) ||
        ts.isClassExpression(child))
    ) {
      return;
    }

    if (ts.isJsxOpeningElement(child) || ts.isJsxSelfClosingElement(child)) {
      const name = tagNameText(child.tagName);
      if (isRawHtmlElement(name) || isBackpackComponent(name)) {
        found = true;
        return;
      }
    }

    ts.forEachChild(child, visit);
  };

  ts.forEachChild(node, visit);

  return found;
};

export const buildVisualComponentRegistry = (files: string[]) => {
  const registry = new Set<string>();

  files.forEach((filePath) => {
    try {
      const content = readFileSync(filePath, "utf8");
      const sourceFile = sourceFileFor(filePath, content);

      const visit = (node: ts.Node) => {
        if (
          ts.isFunctionDeclaration(node) &&
          node.name &&
          /^[A-Z]/.test(node.name.text) &&
          hasVisualJsx(node.body || node)
        ) {
          registry.add(node.name.text);
        }

        if (
          ts.isVariableDeclaration(node) &&
          ts.isIdentifier(node.name) &&
          /^[A-Z]/.test(node.name.text) &&
          node.initializer
        ) {
          const initializer = node.initializer;

          if (
            (ts.isArrowFunction(initializer) ||
              ts.isFunctionExpression(initializer)) &&
            hasVisualJsx(initializer.body)
          ) {
            registry.add(node.name.text);
          }

          if (ts.isCallExpression(initializer)) {
            const functionName = expressionName(initializer.expression);
            const isForwardRef = functionName === "forwardRef";
            const callback = initializer.arguments.find(
              (argument) =>
                ts.isArrowFunction(argument) || ts.isFunctionExpression(argument),
            );

            if (isForwardRef && callback && hasVisualJsx(callback)) {
              registry.add(node.name.text);
            }
          }
        }

        ts.forEachChild(node, visit);
      };

      visit(sourceFile);
    } catch {
      // Parse errors are recorded during the main analysis pass.
    }
  });

  return registry;
};
