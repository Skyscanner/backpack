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
import * as t from "@babel/types";

import { expressionName } from "./jsx";

export type ClassNameInfo = {
  hasOverride: boolean;
};

const NO_OVERRIDE: ClassNameInfo = { hasOverride: false };
const OVERRIDE: ClassNameInfo = { hasOverride: true };

const callExpressionHasArguments = (callExpression: t.CallExpression) =>
  callExpression.arguments.some((argument) => !t.isSpreadElement(argument));

export const extractClassNameInfo = (
  attributes: Array<t.JSXAttribute | t.JSXSpreadAttribute>,
): ClassNameInfo => {
  const classNameAttribute = attributes.find(
    (attribute): attribute is t.JSXAttribute =>
      t.isJSXAttribute(attribute) &&
      t.isJSXIdentifier(attribute.name) &&
      attribute.name.name === "className",
  );

  if (!classNameAttribute) {
    return NO_OVERRIDE;
  }

  const value = classNameAttribute.value;
  if (value === null || value === undefined) {
    return OVERRIDE;
  }

  if (t.isStringLiteral(value)) {
    return OVERRIDE;
  }

  if (!t.isJSXExpressionContainer(value) || t.isJSXEmptyExpression(value.expression)) {
    return OVERRIDE;
  }

  const expression = value.expression;

  if (t.isCallExpression(expression)) {
    const callee = expression.callee;
    const functionName = t.isExpression(callee) ? expressionName(callee) : null;
    if (functionName === "cls" || functionName === "classNames") {
      return callExpressionHasArguments(expression) ? OVERRIDE : NO_OVERRIDE;
    }
  }

  return OVERRIDE;
};