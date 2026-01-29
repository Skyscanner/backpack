#!/usr/bin/env bash
# Add lint, test, and typecheck targets to all project.json files
# M5: Static Checks via Nx

set -e

PACKAGES_DIR="packages"

echo "Adding Nx targets to all projects..."

count=0
for pkg in "$PACKAGES_DIR"/bpk-*; do
  if [ -d "$pkg" ]; then
    pkg_name=$(basename "$pkg")
    project_file="$pkg/project.json"

    if [ -f "$project_file" ]; then
      echo "Updating targets for $pkg_name..."

      # Create the new project.json with targets
      cat > "$project_file" << EOF
{
  "name": "$pkg_name",
  "\$schema": "../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "packages/$pkg_name/src",
  "projectType": "library",
  "tags": ["scope:component", "type:lib"],
  "targets": {
    "lint": {
      "executor": "@nx/eslint:lint",
      "options": {
        "lintFilePatterns": ["packages/$pkg_name/**/*.{ts,tsx,js,jsx}"]
      }
    },
    "test": {
      "executor": "nx:run-commands",
      "options": {
        "command": "npx jest packages/$pkg_name --passWithNoTests"
      }
    }
  }
}
EOF
      ((count++))
    fi
  fi
done

echo ""
echo "Update complete!"
echo "Projects updated: $count"
