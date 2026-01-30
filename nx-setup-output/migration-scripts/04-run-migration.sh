#!/bin/bash
#
# Copyright 2024 Skyscanner
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

#
# 04-run-migration.sh
#
# Orchestrates the full Nx migration by running all scripts in sequence.
# Supports --dry-run mode to preview changes without applying them.
#
# Usage:
#   ./04-run-migration.sh [--dry-run]
#
# Options:
#   --dry-run    Preview all changes without modifying any files
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Parse arguments
DRY_RUN=""
if [[ "$1" == "--dry-run" ]]; then
    DRY_RUN="--dry-run"
    echo -e "${YELLOW}========================================${NC}"
    echo -e "${YELLOW}  Running in DRY-RUN mode${NC}"
    echo -e "${YELLOW}  No files will be modified${NC}"
    echo -e "${YELLOW}========================================${NC}"
    echo ""
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Nx Migration Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if analysis.json exists
ANALYSIS_PATH="$SCRIPT_DIR/../analysis.json"
if [[ ! -f "$ANALYSIS_PATH" ]]; then
    echo -e "${RED}Error: analysis.json not found at $ANALYSIS_PATH${NC}"
    echo "Please run the analysis step first."
    exit 1
fi

# Function to run a step
run_step() {
    local step_num=$1
    local script_name=$2
    local description=$3

    echo -e "${BLUE}----------------------------------------${NC}"
    echo -e "${BLUE}Step $step_num: $description${NC}"
    echo -e "${BLUE}----------------------------------------${NC}"
    echo ""

    local script_path="$SCRIPT_DIR/$script_name"

    if [[ ! -f "$script_path" ]]; then
        echo -e "${RED}Error: Script not found: $script_path${NC}"
        exit 1
    fi

    # Run the script
    node "$script_path" $DRY_RUN

    echo ""
}

# Run migration steps
run_step 1 "01-generate-project-json.js" "Generate project.json files"
run_step 2 "02-generate-tsconfigs.js" "Generate tsconfig.json files"
run_step 3 "03-update-nx-json.js" "Update nx.json configuration"

# Final summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Migration Complete${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

if [[ -n "$DRY_RUN" ]]; then
    echo -e "${YELLOW}This was a dry run. No files were modified.${NC}"
    echo -e "${YELLOW}Run without --dry-run to apply changes:${NC}"
    echo ""
    echo "    ./04-run-migration.sh"
    echo ""
else
    echo -e "${GREEN}All migration steps completed successfully!${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Review the generated files"
    echo "  2. Run 'nx graph' to visualize the project graph"
    echo "  3. Run 'nx run-many -t build' to test the build"
    echo ""
fi

# Verify Nx can see the projects
echo -e "${BLUE}Verifying Nx project graph...${NC}"
cd "$REPO_ROOT"

if command -v npx &> /dev/null; then
    PROJECT_COUNT=$(npx nx show projects 2>/dev/null | wc -l | tr -d ' ')
    if [[ "$PROJECT_COUNT" -gt 0 ]]; then
        echo -e "${GREEN}Nx can see $PROJECT_COUNT projects${NC}"
    else
        echo -e "${YELLOW}Warning: Nx found 0 projects. Please check the configuration.${NC}"
    fi
else
    echo -e "${YELLOW}npx not found - skipping verification${NC}"
fi

echo ""
echo -e "${GREEN}Done!${NC}"
