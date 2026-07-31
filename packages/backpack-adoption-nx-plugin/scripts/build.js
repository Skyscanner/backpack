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
const { cpSync, mkdirSync, rmSync } = require("node:fs");
const { join } = require("node:path");

const { buildSync } = require("esbuild");

const packageRoot = join(__dirname, "..");
const distRoot = join(packageRoot, "dist");

rmSync(distRoot, { force: true, recursive: true });
mkdirSync(distRoot, { recursive: true });

const bundle = (entryPoint, outputPath) => {
  buildSync({
    bundle: true,
    entryPoints: [join(packageRoot, entryPoint)],
    external: ["@nx/devkit"],
    format: "cjs",
    outfile: join(distRoot, outputPath),
    platform: "node",
    sourcemap: true,
    target: "node20",
  });
};

bundle("src/index.ts", "index.js");
bundle("src/executors/analyze/executor.ts", "executors/analyze/executor.js");
bundle("src/executors/report/executor.ts", "executors/report/executor.js");

for (const executor of ["analyze", "report"]) {
  const destination = join(distRoot, "executors", executor);
  mkdirSync(destination, { recursive: true });
  cpSync(
    join(packageRoot, "src", "executors", executor, "schema.json"),
    join(destination, "schema.json"),
  );
}
