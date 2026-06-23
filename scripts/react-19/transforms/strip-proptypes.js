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

/*
 * Strip prop-types and migrate function-component defaultProps for React 19.
 *
 * Phase A (TS/TSX files only):
 *   - Remove top-level `<Identifier>.propTypes = { ... }` ExpressionStatements.
 *   - Remove `static propTypes = { ... }` ClassProperty fields.
 *   - Remove `import PropTypes from 'prop-types'` IF no remaining references.
 *
 *   Skipped for .js/.jsx because the project's eslint config requires either
 *   prop-types or types for prop validation, and most .js components rely on
 *   prop-types. React 19 ignores propTypes silently on all components, so
 *   leaving them in place doesn't break anything; the .js cleanup happens
 *   later as part of the TS migration.
 *
 * Phase B (all files):
 *   - Find `<Identifier>.defaultProps = <ObjectExpression>` ExpressionStatements
 *     where <Identifier> resolves to a function declaration / arrow function /
 *     function expression at the top level, AND the function's first parameter
 *     destructures `props` either inline or via `const { ... } = props` at the
 *     top of the body.
 *   - Merge each defaultProps key into the destructure as `key = value`. If the
 *     key isn't in the destructure already, append it.
 *   - Remove the .defaultProps assignment.
 *   - If the function uses `(props: Props)` and accesses props as `props.X`
 *     without a top-level destructure, SKIP — leave for manual review.
 *
 * Phase C (all files):
 *   - Class components with `static defaultProps`: SKIP and report. Class
 *     `defaultProps` still apply in React 19 (only function-component
 *     `defaultProps` are ignored); migration is for consistency/future-
 *     proofing — convert to a functional component or destructure-with-
 *     defaults inside render().
 */

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);
  let changed = false;
  const skips = [];

  const runPhaseA = /\.(ts|tsx)$/.test(file.path);

  if (runPhaseA) {
    // Phase A.1: remove `<Identifier>.propTypes = { ... }` ExpressionStatements.
    root
      .find(j.ExpressionStatement, {
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            property: { name: 'propTypes' },
          },
        },
      })
      .forEach((path) => {
        const {left} = path.node.expression;
        if (left.object.type !== 'Identifier') return;
        j(path).remove();
        changed = true;
      });

    // Phase A.2: remove `static propTypes = { ... }` class fields.
    root
      .find(j.ClassProperty, {
        static: true,
        key: { name: 'propTypes' },
      })
      .forEach((path) => {
        j(path).remove();
        changed = true;
      });
  }

  // Phase B: function-component defaultProps → destructure defaults.
  root
    .find(j.ExpressionStatement, {
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          property: { name: 'defaultProps' },
        },
        right: { type: 'ObjectExpression' },
      },
    })
    .forEach((path) => {
      const expr = path.node.expression;
      const {left} = expr;
      if (left.object.type !== 'Identifier') return;
      const componentName = left.object.name;
      const defaultsObj = expr.right;
      const defaultsKeys = defaultsObj.properties
        .map((p) => (p.key && (p.key.name ?? p.key.value)) || '?')
        .join(', ');

      const decls = root
        .find(j.VariableDeclarator, { id: { name: componentName } })
        .filter((p) => {
          const {init} = p.node;
          return (
            init &&
            (init.type === 'ArrowFunctionExpression' ||
              init.type === 'FunctionExpression')
          );
        });

      const fnDecls = root.find(j.FunctionDeclaration, {
        id: { name: componentName },
      });

      let fnPath = null;
      if (decls.size() === 1) fnPath = decls.get();
      else if (fnDecls.size() === 1) fnPath = fnDecls.get();

      if (!fnPath) {
        skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — declaration not found or ambiguous`);
        return;
      }

      const fnNode = fnPath.node.init || fnPath.node;
      const {params} = fnNode;
      if (!params || params.length === 0) {
        skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — fn has no params`);
        return;
      }

      const firstParam = params[0];
      let destructurePattern = null;

      if (firstParam.type === 'ObjectPattern') {
        destructurePattern = firstParam;
      } else if (
        firstParam.type === 'AssignmentPattern' &&
        firstParam.left.type === 'ObjectPattern'
      ) {
        destructurePattern = firstParam.left;
      } else if (firstParam.type === 'Identifier') {
        const paramName = firstParam.name;
        const {body} = fnNode;
        if (!body || body.type !== 'BlockStatement') {
          skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — body is not a block`);
          return;
        }
        const firstStmt = body.body.find(
          (s) =>
            s.type === 'VariableDeclaration' &&
            s.declarations.length === 1 &&
            s.declarations[0].id.type === 'ObjectPattern' &&
            s.declarations[0].init &&
            s.declarations[0].init.type === 'Identifier' &&
            s.declarations[0].init.name === paramName,
        );
        if (!firstStmt) {
          skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — no top-level destructure of ${paramName}`);
          return;
        }
        destructurePattern = firstStmt.declarations[0].id;
      } else {
        skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — unhandled first param type ${firstParam.type}`);
        return;
      }

      for (const prop of defaultsObj.properties) {
        if (prop.type !== 'Property' && prop.type !== 'ObjectProperty') {
          skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — non-Property entry, skipped`);
          return;
        }
        if (prop.computed) {
          skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — computed key, skipped`);
          return;
        }
        if (prop.key.type !== 'Identifier' && prop.key.type !== 'Literal' && prop.key.type !== 'StringLiteral') {
          skips.push(`${file.path}: defaultProps for "${componentName}" [${defaultsKeys}] — non-identifier key`);
          return;
        }
        const keyName =
          prop.key.type === 'Identifier' ? prop.key.name : prop.key.value;

        const existing = destructurePattern.properties.find((p) => {
          if (p.type !== 'Property' && p.type !== 'ObjectProperty') return false;
          if (p.computed) return false;
          const k = p.key.type === 'Identifier' ? p.key.name : p.key.value;
          return k === keyName;
        });

        if (existing) {
          if (existing.value.type === 'AssignmentPattern') {
            // Keep existing default; don't override.
          } else {
            existing.value = j.assignmentPattern(existing.value, prop.value);
            changed = true;
          }
        } else {
          const newProp = j.property.from({
            kind: 'init',
            key: j.identifier(keyName),
            value: j.assignmentPattern(j.identifier(keyName), prop.value),
            shorthand: true,
          });
          destructurePattern.properties.push(newProp);
          changed = true;
        }
      }

      j(path).remove();
      changed = true;
    });

  if (runPhaseA) {
    // Phase A.3: strip `import PropTypes from 'prop-types'` if no remaining
    // references after A.1/A.2. Done after Phase B so any defaultProps merges
    // that referenced PropTypes have run first. Re-attach leading comments
    // (license header) to the next sibling so they aren't lost with the import.
    root
      .find(j.ImportDeclaration, { source: { value: 'prop-types' } })
      .forEach((path) => {
        const localName = path.node.specifiers
          .map((s) => s.local && s.local.name)
          .filter(Boolean)[0];
        if (!localName) {
          j(path).remove();
          changed = true;
          return;
        }
        const remainingRefs = root
          .find(j.Identifier, { name: localName })
          .filter((p) => {
            if (
              p.parent.node.type === 'ImportDefaultSpecifier' ||
              p.parent.node.type === 'ImportSpecifier' ||
              p.parent.node.type === 'ImportNamespaceSpecifier'
            ) {
              return false;
            }
            return true;
          });
        if (remainingRefs.size() > 0) {
          skips.push(`${file.path}: PropTypes still referenced — leaving import in place`);
          return;
        }
        const parent = path.parent.node;
        const siblings = parent.body || parent.program?.body;
        if (siblings) {
          const idx = siblings.indexOf(path.node);
          const next = siblings[idx + 1];
          if (next && path.node.comments && path.node.comments.length > 0) {
            const leading = path.node.comments.filter((c) => c.leading);
            next.comments = (next.comments || []).concat(leading);
          }
        }
        j(path).remove();
        changed = true;
      });
  }

  // Phase C: report class components with `static defaultProps`.
  root
    .find(j.ClassProperty, { static: true, key: { name: 'defaultProps' } })
    .forEach(() => {
      skips.push(`${file.path}: class component static defaultProps — manual migration`);
    });

  if (skips.length > 0) {
    process.stderr.write(`${skips.map((s) => `[skip] ${s}`).join('\n')  }\n`);
  }

  return changed ? root.toSource({ quote: 'single' }) : null;
};

// Parser is selected via the `--parser` CLI flag. Run twice: once with
// --parser=tsx for .ts/.tsx, once with --parser=babylon for .js/.jsx.
