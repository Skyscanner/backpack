# Contributing to Backpack

You want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! :heart:

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting started](#getting-started)
* [Adding a new component](#adding-a-new-component)
* [How to](#how-to)

## Prerequisites

### Licence

By contributing your code, you agree to license your contribution under the terms of the [APLv2](./LICENSE).

All files are released with the Apache 2.0 licence.

If you are adding a new file it should have a header comment containing licence information from the following file: [license](./license.txt).

### Decisions

Conventions and squad decisions are kept in the [decisions folder](/decisions). We recommend familiarising yourself with these.

### Installing Node

Backpack is developed using Node, using the following versions:

* `LTS/Gallium` (Node ^16.13.0)
* `^8.1.0` (npm)

This is enforced using a pre-install hook that calls out to [ensure-node-env](https://github.com/Skyscanner/ensure-node-env).

If you use [nvm](https://github.com/creationix/nvm) or [nave](https://github.com/isaacs/nave) to manage your Node environment, Backpack has built-in support for these. Just run `nvm use` or `nave auto` to install the correct Node version.

To install npm, use `npm install --global npm@^8.1.0`.

### Android, iOS and React Native

Backpack also supports React Native, plus native Android and iOS.

They can be found at [backpack-android](https://github.com/skyscanner/backpack-android) and [backpack-ios](https://github.com/skyscanner/backpack-ios) and [backpack-react-native](https://github.com/skyscanner/backpack-react-native)

### Code style

Backpack uses a combination of [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to enforce coding styles. ESLint runs as a pre-commit hook, so it isn't possible to commit code that causes ESLint to fail.

We recommend that you install [a plugin to your editor](https://eslint.org/docs/user-guide/integrations#editors) to run ESLint automatically, which will then show you any errors inline. You can even enable an option to fix ESLint errors automatically upon saving.

## Getting started

### Getting the code

You should pull code down using the following command

```
git clone https://github.com/YOUR_USERNAME/Backpack.git
```

### Install dependencies

Run `npm install` to install dependencies from npm.

### Build the code

Backpack's code depends on some things that must be built first, such as icon fonts, SVGs and tokens.

Use `npm run build` to do this.

### Run the development environment

We use [Storybook](https://storybook.js.org/) for our development environment. Run `npm start` to start the Storybook server, then go to [http://localhost:9001](http://localhost:9001) in a web browser to view it.

## Adding icons

If you want to add icons, please discuss them with us first.

Once they're signed off, you can [raise a request](https://bit.ly/backpack-request) and attach the SVG files. If you're feeling heroic and want to make the PR yourself, just copy the correctly named SVG files to the `lg` and `sm` directories in [`@skyscanner/bpk-svgs/src/icons/`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-svgs/src/icons/) and then run `npm run build`.

## Adding a new component

If you want to add a new component, we will need the following:

- Design (Figma file)
- Associated tokens
- Sass mixin(s)
- React component
- Stories
- Tests
- Documentation (Including main `README.md`)

### Design

Figma is the preferred format for non-technical folks. We’d appreciate if you could provide an exact match of your component in Figma format together with folders for each state e.g. disabled, expanded etc.

### Tokens

Any visual CSS parameters of the component, such as *color, margins, paddings* etc. should not live as magic numbers in the component code, but as **tokens** in the [`@skyscanner/bpk-foundations-web`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-foundations-web) package.

Tokens are defined in the `src/base` directory (with the exception of product-specific tokens, which are in other subdirectories). Tokens come in two layers: In `aliases.json`, all base tokens are defined with concrete values, such as colours, numbers and sizes. The other files then map those aliases to tokens for specific elements.

> You should probably not touch `aliases.json`, as our colour palette or grid rarely changes.

### Sass mixins

All Sass mixins are defined in the [`bpk-mixins`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-mixins) package. The package also exposes the Sass variables from the [`@skyscanner/bpk-foundations-web`](https://github.com/Skyscanner/backpack-foundations/tree/main/packages/bpk-foundations-web) package.

If you add a new file of mixins, for example for a new *atom*, make sure you add the file to the imports in `_index.scss`.

### React component

Use `bpk-component-boilerplate` to create a new skeleton React component. Once this is created, use existing components for code style inspiration.

We use [CSS Modules](https://github.com/css-modules/css-modules) along with [BEM](http://getbem.com/) to prevent collisions and accidental overwrites in CSS.

Our current supported React version is 17.0.2, please be mindful when using React features that may not yet be supported.

When creating (S)CSS files, follow the CSS Module naming convention by using the `.module.(s)css` extension.

### Documentation

See our design system documentation at [skyscanner.design](https://www.skyscanner.design).

## How to

<details>
<summary>Create a pull request to Backpack</summary>

For anything non-trivial, we strongly recommend speaking to somebody from Backpack squad before starting work on a PR. This lets us pass on any advice or knowledge we already have about the work you're proposing. It might even be something we're already working on. After this, follow the steps below.

1. If you are not a Skyscanner employee, [fork the repository](https://github.com/Skyscanner/backpack/fork). If you are a Skyscanner employee, please follow the "Engineering Contribution" guide in the Backpack space in Confluence to get push rights to this repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your new branch.
5. Submit a [pull request](https://github.com/Skyscanner/backpack/pulls).
6. Notify someone in Backpack squad or drop a note in #backpack.

Don't forget to update [`UNRELEASED.md`](UNRELEASED.md) for any user-facing changes.

Bear in mind that small, incremental pull requests are likely to be reviewed faster.

</details>

<details>
<summary>Run tests</summary>

`npm test` will pick up any files that end in `-test.js`, so you don't need to do anything to make Jest pick them up.

You can also run the tests in 'watch mode', which means the process will continually run and run tests every time files change. Use `npm run jest:watch` to do this.

There are also visual regression tests, powered by [Storyshots](https://www.npmjs.com/package/@storybook/addon-storyshots) and [jest-image-snapshot](https://www.npmjs.com/package/jest-image-snapshot). Use `npm run jest:visual` to run these. They rely on the `dist-storybook` folder being populated with a pre-built Storybook first, which can be generated with `npm run storybook:dist`.

Visual regression tests run on all Storybook stories titled _'Visual test'_.

</details>

<details>
<summary>Run linters manually</summary>

* `npm run lint` to lint both JS and SCSS.
* `npm run lint:js` to lint JS.
* `npm run lint:js:fix` to lint and try to automatically fix any errors.
* `npm run lint:scss` to lint SCSS.

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Update the [unreleased changelog](/UNRELEASED.md) with every package that has changed, separating out `BRAKING`, `ADDED` and `FIXED` changes. See `CHANGELOG_FORMAT.md` for tips.
  - Some useful commands for determining "what's changed?":
    - `git log --pretty=format:"* %s (%h)" $(git describe --tags --abbrev=0)...HEAD`
- Make sure you are an owner of the npm packages (speak to a member of the Backpack squad).
- **Run `npm run release`**. Do not run `npm publish`.
- You’ll be asked to specify a new version. Options are *patch*, *minor* or *major*. These should directly align to the entries you put in the [unreleased changelog](/unreleased.md) in step 1.
- Move entries from [unreleased.md](/unreleased.md) to the [changelog](/changelog.md). Update the package versions for the new changes, and group them under a title with today’s date and a brief summary of what has changed.
- Commit and push to main.

When a component is released for the first time on npm, remember to add the component to the Skyscanner organisation through the [npm UI](https://www.npmjs.com/settings/skyscanner/teams/team/backpack/access).

</details>

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
