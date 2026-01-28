#!/usr/bin/env bash
# Migrate stories from examples/ to packages/
# M3: Storybook Colocation

set -e

echo "Starting story migration from examples/ to packages/..."

for dir in examples/bpk-*; do
  component=$(basename "$dir")
  target="packages/$component/src"

  if [ -d "$target" ]; then
    echo "Moving $component stories..."

    # Move story files
    [ -f "$dir/stories.tsx" ] && mv "$dir/stories.tsx" "$target/"
    [ -f "$dir/examples.tsx" ] && mv "$dir/examples.tsx" "$target/"

    # Move style files (both .scss and .css)
    for scss in "$dir"/*.module.scss "$dir"/*.module.css; do
      [ -f "$scss" ] && mv "$scss" "$target/"
    done
  else
    echo "WARNING: Target directory $target does not exist for $component"
  fi
done

echo "Migration complete!"
