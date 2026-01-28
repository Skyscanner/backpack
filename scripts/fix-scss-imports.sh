#!/usr/bin/env bash
# Fix SCSS import paths in moved story style files
# M3: Storybook Colocation

set -e

echo "Fixing SCSS import paths in story style files..."

for scss in packages/*/src/*Story.module.scss packages/*/src/*Story.module.css; do
  if [ -f "$scss" ]; then
    echo "Fixing: $scss"
    # Update paths from ../../../packages/X to ./X or ../bpk-mixins
    sed -i '' "s|../../../packages/|../|g" "$scss"
  fi
done

# Also fix any example.module.scss files
for scss in packages/*/src/examples.module.scss packages/*/src/examples.module.css; do
  if [ -f "$scss" ]; then
    echo "Fixing: $scss"
    sed -i '' "s|../../../packages/|../|g" "$scss"
  fi
done

echo "SCSS import path fixes complete!"
