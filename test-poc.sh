#!/bin/bash

echo "=== Testing Milestone 1 PoC ==="
echo ""

echo "1. Nx Installation Check:"
npx nx --version
echo ""

echo "2. Show Projects:"
npx nx show projects
echo ""

echo "3. Show Project Details (button):"
npx nx show project bpk-component-button | head -5
echo ""

echo "4. Test Existing Scripts:"
echo "   - npm run typecheck..."
npm run typecheck 2>&1 | tail -5
echo ""

echo "=== All Tests Complete ==="
echo ""
echo "✅ PoC is working if you see:"
echo "   - Nx version displayed"
echo "   - 4 projects listed (button, icon, mixins, backpack)"
echo "   - Project details shown"
echo "   - Typecheck completed"
