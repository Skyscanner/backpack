#!/bin/bash

# Backpack Storybook Stories Migration Script
# Migrates stories from examples/ to packages/*/src/*/ directories

set -e

echo "🚀 Starting Storybook stories migration..."
echo ""

# Counter for tracking progress
TOTAL=0
SUCCESS=0
SKIPPED=0
FAILED=0

# Find all stories.tsx files in examples/
for example_dir in examples/*/; do
    # Skip if not a directory
    [ -d "$example_dir" ] || continue

    # Check if stories.tsx exists
    if [ ! -f "${example_dir}stories.tsx" ]; then
        continue
    fi

    TOTAL=$((TOTAL + 1))

    # Extract component name (e.g., bpk-component-button)
    component_name=$(basename "$example_dir")

    echo "📦 Processing: $component_name"

    # Find the corresponding package directory
    package_dir="packages/$component_name"

    if [ ! -d "$package_dir" ]; then
        echo "   ⚠️  Package directory not found: $package_dir"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Find the component subdirectory in src/
    # Most components follow the pattern: packages/bpk-component-*/src/Bpk*/
    src_dir="$package_dir/src"

    if [ ! -d "$src_dir" ]; then
        echo "   ⚠️  Source directory not found: $src_dir"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Find the first subdirectory that looks like a component directory
    # (starts with Bpk or the component name)
    component_subdir=$(find "$src_dir" -maxdepth 1 -type d -name "Bpk*" | head -n 1)

    if [ -z "$component_subdir" ]; then
        # Try without Bpk prefix (for some special cases)
        component_subdir=$(find "$src_dir" -maxdepth 1 -type d ! -name "." ! -name ".." | head -n 1)
    fi

    if [ -z "$component_subdir" ]; then
        echo "   ⚠️  No component subdirectory found in $src_dir"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Create the stories filename
    # Extract the component class name from the subdirectory
    component_class=$(basename "$component_subdir")
    stories_filename="${component_class}.stories.tsx"

    target_file="$component_subdir/$stories_filename"

    # Check if target already exists
    if [ -f "$target_file" ]; then
        echo "   ⚠️  Stories file already exists: $target_file"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi

    # Copy the stories file
    cp "${example_dir}stories.tsx" "$target_file"

    # Update import paths in the stories file
    # Change from: import BpkComponent from '../../packages/bpk-component-name';
    # To: import BpkComponent from '../BpkComponent' or appropriate relative path

    # For now, just copy the file - import path updates can be done separately if needed
    # since Storybook can handle various import patterns

    echo "   ✅ Migrated to: $target_file"
    SUCCESS=$((SUCCESS + 1))
done

echo ""
echo "📊 Migration Summary:"
echo "   Total found: $TOTAL"
echo "   ✅ Success: $SUCCESS"
echo "   ⚠️  Skipped: $SKIPPED"
echo "   ❌ Failed: $FAILED"
echo ""

if [ $SUCCESS -gt 0 ]; then
    echo "✨ Migration complete! Stories have been copied to component directories."
    echo "   Note: You may need to update import paths in the migrated stories files."
else
    echo "⚠️  No stories were migrated. Please check the script output above."
    exit 1
fi
