# Contributing to Backpack

You want to help us enable Skyscanner to create beautiful, coherent products at scale? That's awesome! :heart:

## Table of contents

* [Prerequisites](#prerequisites)
* [Getting started](#getting-started)
* [Adding a new component](#adding-a-new-component)
* [Experimental changes](#experimental-changes)
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

**All Backpack components are written in Typescript or are being gradually migrated to Typescript.**

As we're in the process of migrating all Backpack components to Typescript, we kindly request that engineers contributing changes to an existing component also migrate the respective component.

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

**All new components should be written in Typescript.**

Use `bpk-component-boilerplate` to create a new skeleton React component. Once this is created, use existing components for code style inspiration.

We use [CSS Modules](https://github.com/css-modules/css-modules) along with [BEM](http://getbem.com/) to prevent collisions and accidental overwrites in CSS.

Our current supported React version is 17.0.2, please be mindful when using React features that may not yet be supported.

When creating (S)CSS files, follow the CSS Module naming convention by using the `.module.(s)css` extension.

### Documentation

See our design system documentation at [skyscanner.design](https://www.skyscanner.design).

## Experimental changes

Want to run A/B experiments on features that entail changes to Backpack components? Continue reading below 👇

<details>
<summary>When is a component change considered experimental?</summary>

If the component or change you want to contribute to Backpack is not stable and it depends on the results of an experiment then it is considered experimental.

</details>

<details>
<summary>What do you need to do to mark a component or part of a component as experimental?</summary>

This will depend on what kind of change you are contributing.

**Patch and minor changes**

For patch and minor changes, you should use JSDoc annotations. JSDoc is a widely used and supported tool in the JavaScript ecosystem that allows developers to document their code. JSDoc comments will be visible in most IDEs.

**Major**

For major changes, you should create a new experimental V2 component. If the experiment is successful, the old component should be deprecated.

The new component should be added in the same folder as the original component, further nested inside a folder which follows the `Bpk{ComponentName}V2` naming. For example, the full path for a new component `BpkButtonV2` should be `packages/bpk-component-button/src/BpkButtonV2/BpkButton.tsx`. The 2 components will then be exported in the `index.(js|ts)` file of `bpk-component-button`.

Any follow-up changes to experimental components will not be considered breaking.
</details>

<details>
<summary>When should documentation be created and published?</summary>

Each Bpk component has a corresponding README file which contains information about the component such as usage examples and API documentation. Our components' full documentation is at [skyscanner.design](https://www.skyscanner.design). New experimental components should have a README file, but don’t need to be published to [skyscanner.design](https://www.skyscanner.design). Make sure the README file reflects the component is experimental! When an experiment has run and is considered successful and so the change is stable, documentation can be published.

For changes to existing components, make sure the API documentation is updated to indicate if something is experimental.

Major changes will often require a migration guide. If an experiment is considered succesful, you should add a migration guide within the docs folder located in the respective component folder.
</details>

<details>
<summary>How long does experimentation code live in Backpack?</summary>

Experimentation code should be cleaned up at most 2 weeks after an experiment has completed. In the case of a successful experiment, annotations should be removed and documentation should be published. In the case of an unsuccessful experiment, the code should be removed altogether.
</details>

<details>
<summary>Examples</summary>

Here’s an end-to-end example on how to add an experimental prop to a Bpk component:

1. Reach out to Koala with the proposed change
2. Contribute code changes. Make sure the API table is updated too!
```typescript
type Props = {
	text: string,
	color: string,
	/**
   * @experimental This prop is experimental and subject to change.
	 * Use with caution.
   */
	sparkles?: boolean
}
const BpkText = ({text, color, sparkles}: Props) => {
    ...
}
```
3. Released by Koala
4. Adopt changes in project
5. Run experiment
    - if experiment is successful, publish documentation (only Koala members) and remove experimental code.
    - if experiment is unsuccessful and further iterations are needed, repeat from step 2. Otherwise, remove experimental code. That’s all!
</details>

## How to

<details>
<summary>Create a pull request to Backpack</summary>

For anything non-trivial, we strongly recommend speaking to somebody from Backpack squad before starting work on a PR. This lets us pass on any advice or knowledge we already have about the work you're proposing. It might even be something we're already working on. After this, follow the steps below.

1. If you are not a Skyscanner employee, [fork the repository](https://github.com/Skyscanner/backpack/fork). If you are a Skyscanner employee, please follow the "Engineering Contribution" guide in the Backpack space in Confluence to get push rights to this repository.
2. Create a new branch.
3. Make your changes.
4. Commit and push your new branch.
5. Submit a [pull request](https://github.com/Skyscanner/backpack/pulls). When submitting a PR ensure you add the correct label to your PR.
    * major, A breaking change (visual or API contract changes)
    * minor, A non-breaking change or a new component
    * patch, A fixed bug or updates to documentation
    * skip-changelog, The change you made should not end up in the release changelog
6. Notify someone in Backpack squad or drop a note in #backpack.

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
<summary>Contribute breaking changes</summary>

Anytime a change could break existing applications it's considered a breaking change. To make upgrading Backpack easier for consumers, breaking changes should follow a deprecation cycle.

In most cases, it is recommended to create a V2 component and provide a migration guide. If your breaking change either
- requires consumers to make multiple modifications to their code to adopt the changes (e.g. renaming or removing multiple props of an API), OR
- involves a significant alteration of the structure or API of a component in a way that keeping both APIs within one component may make the code unreadable (e.g. rewriting a component to reduce the number of files from 20 to 5)
then you should contribute your changes as a separate V2 component.

Once the old component has been removed from the codebase and is no longer in use, the Koala team will run automated scripts to make the new component the default.

If your breaking change doesn't require consumers to make many modifications or its usages are limited (around 10-20 usages across Skyscanner web repositories), and keeping both versions in one component doesn't affect the readability of it, you will not need to create a separate component.

If you are unsure of the impact or scale of your change, reach out to Koala team and we will help you!

</details>

<details>
<summary>Publish packages (Backpack squad members only)</summary>

- Publish the latest draft on the [releases pages](https://github.com/Skyscanner/backpack/releases)
- Ensure CI runs the release workflow successfully
- Once released verify the artifacts are available

</details>

## And finally..

If you have any questions at all, don't hesitate to get in touch. We love to talk all things Backpack and we look forward to seeing your contribution!
