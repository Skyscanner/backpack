#!/usr/bin/env bash
#
# Claude Code post-write hook for Backpack components.
# Runs after every Edit/Write to enforce Constitution rules and lint.
# Uses CLAUDE_FILE_PATH env var set by Claude Code.
#
# Output strategy: silent on success, concise on failure.
# Lint uses npm run lint:file:{js,scss} with the changed file path.

set -uo pipefail

FILE="${CLAUDE_FILE_PATH:-}"
[[ -z "$FILE" ]] && exit 0

# Only check source files in packages/ and examples/
[[ "$FILE" != */packages/* && "$FILE" != */examples/* ]] && exit 0
[[ ! "$FILE" =~ \.(tsx?|jsx?|scss)$ ]] && exit 0

# ── Check 1: License header ──────────────────────────────────────────
if ! head -5 "$FILE" | grep -q "Copyright 2016 Skyscanner"; then
  echo "BLOCK: Missing Apache 2.0 license header in $FILE"
  echo "Copy from any existing component file for the exact format."
  exit 1
fi

# ── Check 2: No @import in SCSS ──────────────────────────────────────
if [[ "$FILE" =~ \.scss$ ]]; then
  if grep -qn "^@import " "$FILE"; then
    echo "BLOCK: Found @import in $FILE — use @use instead."
    exit 1
  fi
fi

# ── Check 3: No className/style on new components ────────────────────
if [[ "$FILE" =~ /packages/bpk-component-.*/src/Bpk.*\.tsx$ ]]; then
  if ! git show main:"$(git ls-files --full-name "$FILE" 2>/dev/null)" &>/dev/null; then
    if grep -qn "className?:" "$FILE" || grep -qn "style?:" "$FILE"; then
      echo "WARNING: $FILE accepts className or style — Constitution XI forbids this on new components."
    fi
  fi
fi

# ── Check 4: Lint the changed file ───────────────────────────────────
# Uses npm run lint:file:{js,scss} -- <file>.
# Silent on success, concise summary on failure.

LINT_LOG=$(mktemp)
trap 'rm -f "$LINT_LOG"' EXIT

if [[ "$FILE" =~ \.(tsx?|jsx?)$ ]]; then
  LINT_CMD="npm run lint:file:js -- $FILE"
elif [[ "$FILE" =~ \.scss$ ]]; then
  LINT_CMD="npm run lint:file:scss -- $FILE"
else
  exit 0
fi

if $LINT_CMD > "$LINT_LOG" 2>&1; then
  exit 0
fi

# Failure — show concise summary
ERRORS=$(grep -cE "error|✖|×" "$LINT_LOG" 2>/dev/null || echo "?")
echo "LINT: $ERRORS error(s) in $(basename "$FILE")"
grep -E "^\s+\d+:\d+\s+error" "$LINT_LOG" | head -5
exit 1
