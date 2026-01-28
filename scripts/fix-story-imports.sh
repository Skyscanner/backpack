#!/usr/bin/env bash
# Fix import paths in moved story files
# M3: Storybook Colocation

set -e

echo "Fixing import paths in stories.tsx files..."

for story in packages/*/src/stories.tsx; do
  if [ -f "$story" ]; then
    echo "Fixing: $story"
    # Replace ../../packages/bpk-component-X with ../index
    sed -i '' "s|from '../../packages/bpk-[^']*'|from '../index'|g" "$story"
    # Also handle double-quoted imports
    sed -i '' 's|from "../../packages/bpk-[^"]*"|from "../index"|g' "$story"
  fi
done

echo "Fixing import paths in examples.tsx files..."

for example in packages/*/src/examples.tsx; do
  if [ -f "$example" ]; then
    echo "Fixing: $example"
    # Replace ../../packages/bpk-component-X with ../index
    sed -i '' "s|from '../../packages/bpk-[^']*'|from '../index'|g" "$example"
    # Also handle double-quoted imports
    sed -i '' 's|from "../../packages/bpk-[^"]*"|from "../index"|g' "$example"
  fi
done

echo "Import path fixes complete!"
