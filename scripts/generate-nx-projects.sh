#!/usr/bin/env bash
# Generate project.json files for all packages
# M4: Components as Nx Projects

set -e

TEMPLATE_DIR="scripts/templates"
PACKAGES_DIR="packages"

echo "Generating Nx project configurations..."

count=0
for pkg in "$PACKAGES_DIR"/bpk-*; do
  if [ -d "$pkg" ]; then
    pkg_name=$(basename "$pkg")
    project_file="$pkg/project.json"

    if [ ! -f "$project_file" ]; then
      echo "Creating project.json for $pkg_name..."

      # Replace template placeholders
      sed "s/{{PACKAGE_NAME}}/$pkg_name/g" "$TEMPLATE_DIR/project.json.template" > "$project_file"
      ((count++))
    else
      echo "Skipping $pkg_name (project.json already exists)"
    fi
  fi
done

echo ""
echo "Generation complete!"
echo "Projects created: $count"
echo "Total project.json files: $(find packages -name "project.json" | wc -l | tr -d ' ')"
