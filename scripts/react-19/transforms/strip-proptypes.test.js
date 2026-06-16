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
 * Standalone tests for the React 19 strip-proptypes jscodeshift transform.
 *
 * Run directly:  node scripts/react-19/transforms/strip-proptypes.test.js
 *
 * Uses node:test + node:assert so it doesn't need Jest. The transform isn't
 * part of the main jest project (this is one-shot migration tooling under
 * scripts/), so a self-contained runner keeps it reviewable without wiring
 * it into the package's jest config.
 *
 * Scope: Phase routing (TS-only behaviour for Phase A), Phase B skip-paths
 * and the stderr key annotations, and Phase C class-component reporting.
 *
 * The "happy path" Phase B output (rewriting `Foo.defaultProps = { x: 1 }`
 * into a destructure default `{ x = 1 }`) is intentionally NOT asserted
 * here. It depends on recast's printer behaviour for shorthand
 * ObjectPattern properties whose value is an AssignmentPattern, which
 * differs between recast 0.20.x (used during the original LOOM-2442
 * migration via types-react-codemod's bundled jscodeshift) and the
 * top-level jscodeshift's recast 0.23.x. The migration commit
 * (2173faf45) is the source of truth for the actual textual output.
 */

const assert = require('node:assert/strict');
const test = require('node:test');

const jscodeshift = require('jscodeshift');

const transform = require('./strip-proptypes');

function run(source, { parser = 'tsx', path = 'sample.tsx' } = {}) {
  const stderrChunks = [];
  const originalWrite = process.stderr.write.bind(process.stderr);
  process.stderr.write = (chunk) => {
    stderrChunks.push(typeof chunk === 'string' ? chunk : chunk.toString());
    return true;
  };
  let output;
  try {
    output = transform(
      { path, source },
      { jscodeshift: jscodeshift.withParser(parser), stats: () => {} },
      {},
    );
  } finally {
    process.stderr.write = originalWrite;
  }
  return { output, stderr: stderrChunks.join('') };
}

test('Phase A.1: removes Identifier.propTypes assignments in .tsx', () => {
  const input = `
import PropTypes from 'prop-types';

const Foo = ({ name }: { name: string }) => name;

Foo.propTypes = { name: PropTypes.string };

export default Foo;
`;
  const { output } = run(input);
  assert.ok(output, 'transform should report a change');
  assert.doesNotMatch(output, /\.propTypes\b/);
  assert.doesNotMatch(output, /from 'prop-types'/);
  assert.doesNotMatch(output, /\bPropTypes\b/);
});

test('Phase A.2: removes static propTypes class fields in .tsx', () => {
  const input = `
import PropTypes from 'prop-types';
import React from 'react';

class Foo extends React.Component {
  static propTypes = { name: PropTypes.string };
  render() { return null; }
}

export default Foo;
`;
  const { output } = run(input);
  assert.ok(output, 'transform should report a change');
  assert.doesNotMatch(output, /static propTypes/);
  assert.doesNotMatch(output, /from 'prop-types'/);
});

test('Phase A.3: leaves prop-types import in place when PropTypes is still referenced', () => {
  const input = `
import PropTypes from 'prop-types';

export const validator = PropTypes.string;
`;
  const { output, stderr } = run(input);
  assert.equal(output, null, 'no change expected — nothing to remove');
  assert.match(stderr, /PropTypes still referenced/);
});

test('Phase A: skipped on .js files (only TS/TSX)', () => {
  const input = `
import PropTypes from 'prop-types';

const Foo = ({ name }) => name;

Foo.propTypes = { name: PropTypes.string };

export default Foo;
`;
  const { output } = run(input, { path: 'sample.js', parser: 'babylon' });
  assert.equal(output, null, 'no change on .js — Phase A is TS/TSX only');
});

test('Phase B: merges defaultProps into destructure pattern', () => {
  const input = `
const Foo = ({ name }: { name?: string }) => name;
Foo.defaultProps = { name: 'hello' };
export default Foo;
`;
  const { output } = run(input);
  assert.ok(output, 'transform should report a change');
  assert.doesNotMatch(output, /\.defaultProps\b/);
});

test('Phase B skip: function uses props as Identifier with no top-level destructure', () => {
  const input = `
function Foo(props: { count?: number }) {
  return props.count;
}

Foo.defaultProps = { count: 5 };

export default Foo;
`;
  const { output, stderr } = run(input);
  assert.equal(output, null, 'transform leaves the file untouched');
  assert.match(stderr, /\[count\]/, 'skip log includes defaultProps keys');
  assert.match(stderr, /no top-level destructure of props/);
});

test('Phase B skip: declaration not found, log includes keys', () => {
  const input = `
Foo.defaultProps = { count: 5, label: 'x' };
`;
  const { output, stderr } = run(input);
  assert.equal(output, null);
  assert.match(stderr, /\[count, label\]/);
  assert.match(stderr, /declaration not found/);
});

test('Phase B skip: function with no params', () => {
  const input = `
const Foo = () => null;

Foo.defaultProps = { count: 5 };

export default Foo;
`;
  const { output, stderr } = run(input);
  assert.equal(output, null);
  assert.match(stderr, /\[count\]/);
  assert.match(stderr, /fn has no params/);
});

test('Phase B skip: arrow body is not a block (implicit return)', () => {
  const input = `
const Foo = (props: { count?: number }) => props.count;

Foo.defaultProps = { count: 5 };

export default Foo;
`;
  const { output, stderr } = run(input);
  assert.equal(output, null);
  assert.match(stderr, /\[count\]/);
  assert.match(stderr, /body is not a block/);
});

test('Phase C: reports class components with static defaultProps to stderr', () => {
  const input = `
import React from 'react';

class Foo extends React.Component {
  static defaultProps = { count: 5 };
  render() { return null; }
}

export default Foo;
`;
  const { output, stderr } = run(input);
  assert.equal(output, null, 'class defaultProps are NOT auto-migrated');
  assert.match(stderr, /class component static defaultProps/);
});

test('License header preserved when prop-types import is removed', () => {
  const input = `/*
 * Backpack license header.
 */
import PropTypes from 'prop-types';
import type { ReactNode } from 'react';

const Foo = ({ name }: { name: string }): ReactNode => name;

Foo.propTypes = { name: PropTypes.string };

export default Foo;
`;
  const { output } = run(input);
  assert.ok(output);
  assert.match(output, /Backpack license header/);
  assert.doesNotMatch(output, /from 'prop-types'/);
});

test('Returns null when the file has nothing to transform', () => {
  const input = `
const Foo = () => null;
export default Foo;
`;
  const { output } = run(input);
  assert.equal(output, null);
});
