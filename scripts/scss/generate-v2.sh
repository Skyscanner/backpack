set -e

printf "🧽 Wiping packages/bpk-mixins-next...\n"

if [ -d packages/bpk-mixins-next ]; then
    rm -rf packages/bpk-mixins-next
fi

printf "✅  Done! \n \n"

printf "📋 Copying mixins to new location...\n"

cp -r packages/bpk-mixins packages/bpk-mixins-next

rm packages/bpk-mixins-next/src/_bonds.scss

cp scripts/scss/_bonds.template.scss packages/bpk-mixins-next/src/_bonds.scss

printf "✅  Done! \n \n"

printf "⚙️ Running sass-migrator...\n"


# Migrate all other files to new syntax
printf "👉 Applying new module resolution...\n"

sass-migrator --load-path=node_modules module packages/bpk-mixins-next/src/**/*.scss

printf "👉 Applying new division rules...\n"

sass-migrator --load-path=node_modules division packages/bpk-mixins-next/src/**/*.scss

printf "👉 Forwarding everything...\n"

# Migrate _index.scss to new syntax
sass-migrator --load-path=node_modules module --forward=all packages/bpk-mixins-next/_index.scss

printf "✅  New mixins generated. Import them from bpk-mixins-next using '@use' notation \n"
